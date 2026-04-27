/**
 * Geocode properties from properties.json using Nominatim (OpenStreetMap).
 * Free, no API key required. Rate-limited to 1 req/sec per Nominatim ToS.
 *
 * Usage:  node scripts/geocode-properties.mjs
 * Output: scripts/properties-geocoded.json
 *
 * Full documentation: docs/geocode-properties-guide.md
 *   — how to switch to Google Geocoding API
 *   — how to add new cities to the address parser
 *   — output format and incremental run behaviour
 */

import { readFileSync, writeFileSync, existsSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __dir = dirname(fileURLToPath(import.meta.url))
const INPUT = join(__dir, "properties.json")
const OUTPUT = join(__dir, "properties-geocoded.json")

// Known city names that appear concatenated with street names in the source data.
// Order matters: longer/more specific names first to avoid partial matches.
const KNOWN_CITIES = [
    "Horn Lake",
    "Olive Branch",
    "West Memphis",
    "St. Louis",
    "St Louis",
    "Collierville",
    "Germantown",
    "Millington",
    "Murfreesboro",
    "Kansas City",
    "Somerville",
    "Brownsville",
    "Bartlett",
    "Cordova",
    "Lakeland",
    "Arlington",
    "Covington",
    "Hernando",
    "Southaven",
    "Bessemer",
    "Knoxville",
    "Decatur",
    "Drummond",
    "Burlison",
    "Memphis",
    "Jackson",
    "Marion",
    "Tipton",
    "Munford",
    "Pinson",
    "Eads",
]

// Build a regex that detects the city and separates the street from it.
// Addresses look like: "1234 SomeStreetNameCityName, STATE"
const CITY_RE = new RegExp(
    "^(.*?)(" + KNOWN_CITIES.map((c) => c.replace(".", "\\.")).join("|") + ")(, (?:TN|MS|AR|MO|KY|AL|KS))$"
)

/**
 * Parse a raw address string into { street, city, state }.
 * Falls back to passing the full string as-is if no city is detected.
 */
function parseAddress(raw) {
    const m = raw.match(CITY_RE)
    if (!m) return { street: raw, city: null, state: null }
    const street = m[1].trim().replace(/,\s*$/, "")
    const city = m[2].trim()
    const state = m[3].replace(", ", "").trim()
    return { street, city, state }
}

/** Rate-limited fetch: 1 request per second */
function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms))
}

/**
 * Query Nominatim for a single address.
 * Returns { lat, lng } or null on failure.
 */
async function geocode(address, zip) {
    const { street, city, state } = parseAddress(address)

    let url
    if (city && state) {
        const params = new URLSearchParams({
            street,
            city,
            state,
            postalcode: zip,
            country: "US",
            format: "json",
            limit: "1",
        })
        url = `https://nominatim.openstreetmap.org/search?${params}`
    } else {
        // Fallback: free-form query
        const params = new URLSearchParams({
            q: address + (zip ? " " + zip : ""),
            format: "json",
            limit: "1",
        })
        url = `https://nominatim.openstreetmap.org/search?${params}`
    }

    const res = await fetch(url, {
        headers: {
            "User-Agent": "SpencerBuysHouses-geocoder/1.0 (contact@spencerbuyshouses.com)",
            "Accept-Language": "en-US",
        },
    })

    if (!res.ok) {
        console.warn(`  HTTP ${res.status} for: ${address}`)
        return null
    }

    const json = await res.json()
    if (!json.length) {
        // Retry with free-form if structured query returned nothing
        if (city && state) {
            const params2 = new URLSearchParams({
                q: `${street}, ${city}, ${state} ${zip}`,
                format: "json",
                limit: "1",
            })
            await sleep(1100)
            const res2 = await fetch(
                `https://nominatim.openstreetmap.org/search?${params2}`,
                {
                    headers: {
                        "User-Agent": "SpencerBuysHouses-geocoder/1.0 (contact@spencerbuyshouses.com)",
                        "Accept-Language": "en-US",
                    },
                }
            )
            const json2 = await res2.json()
            if (!json2.length) return null
            return { lat: parseFloat(json2[0].lat), lng: parseFloat(json2[0].lon) }
        }
        return null
    }

    return { lat: parseFloat(json[0].lat), lng: parseFloat(json[0].lon) }
}

async function main() {
    const rawData = JSON.parse(readFileSync(INPUT, "utf8"))

    // Load existing output to allow resuming interrupted runs
    let existing = {}
    if (existsSync(OUTPUT)) {
        existing = JSON.parse(readFileSync(OUTPUT, "utf8"))
    }

    const result = {}
    const failed = []
    let processed = 0
    let skipped = 0
    let total = 0

    // Count total
    for (const entries of Object.values(rawData)) total += entries.length

    console.log(`\nGeocoding ${total} addresses via Nominatim…\n`)

    for (const [groupKey, entries] of Object.entries(rawData)) {
        result[groupKey] = []

        for (const entry of entries) {
            const existingGroup = existing[groupKey] || []
            const alreadyDone = existingGroup.find(
                (e) => e.address === entry.address && e.lat != null
            )

            if (alreadyDone) {
                result[groupKey].push(alreadyDone)
                skipped++
                continue
            }

            processed++
            const coords = await geocode(entry.address, entry.zip)

            if (coords) {
                result[groupKey].push({ ...entry, lat: coords.lat, lng: coords.lng })
                process.stdout.write(
                    `[${processed + skipped}/${total}] ✓  ${entry.address}\n`
                )
            } else {
                result[groupKey].push({ ...entry, lat: null, lng: null })
                failed.push(entry.address)
                process.stdout.write(
                    `[${processed + skipped}/${total}] ✗  ${entry.address}\n`
                )
            }

            // Save progress after every address in case of interruption
            writeFileSync(OUTPUT, JSON.stringify(result, null, 2))

            await sleep(1100) // Nominatim: max 1 req/sec
        }
    }

    console.log(`\n─── Done ───────────────────────────────────────`)
    console.log(`  Geocoded:  ${processed - failed.length}`)
    console.log(`  Skipped (cached): ${skipped}`)
    console.log(`  Failed:    ${failed.length}`)
    if (failed.length) {
        console.log("\nFailed addresses:")
        failed.forEach((a) => console.log("  •", a))
    }
    console.log(`\nOutput: ${OUTPUT}`)
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})
