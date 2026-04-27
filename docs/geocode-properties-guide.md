# Geocoding Script — `scripts/geocode-properties.mjs`

## Table of Contents

1. [Overview](#1-overview)
2. [Usage](#2-usage)
3. [Output Format](#3-output-format)
4. [Current Provider: Nominatim (OpenStreetMap)](#4-current-provider-nominatim-openstreetmap)
5. [Switching to Google Geocoding API](#5-switching-to-google-geocoding-api)
6. [Adding New Cities to the Address Parser](#6-adding-new-cities-to-the-address-parser)
7. [PropertiesMap Component](#7-propertiesmap-component)

---

## 1. Overview

The script reads `scripts/properties.json`, calls a geocoding API for each address to obtain latitude/longitude, and writes the result to `scripts/properties-geocoded.json`.

That output file is read at **build time** by `app/properties-we-bought/page.tsx` (via `readFileSync`) and passed as props to the `PropertiesMap` client component, which renders an interactive Leaflet map.

```
scripts/properties.json
        │
        ▼
geocode-properties.mjs  (run once, or when properties change)
        │
        ▼
scripts/properties-geocoded.json
        │
        ▼  (build time, readFileSync)
app/properties-we-bought/page.tsx
        │
        ▼
components/sections/properties-map.tsx  (react-leaflet, client-side)
```

---

## 2. Usage

Run from the project root:

```bash
node scripts/geocode-properties.mjs
```

No environment variables required when using the default Nominatim provider.

### Incremental runs (safe to interrupt and resume)

The script saves progress to `properties-geocoded.json` after **every single address**. If interrupted, just run it again — entries that already have a non-null `lat` value are skipped automatically.

### Re-geocode everything from scratch

```bash
rm scripts/properties-geocoded.json
node scripts/geocode-properties.mjs
```

### Retry only failed entries

Entries where `lat` is `null` are **not skipped**, so simply re-running the script retries all failures:

```bash
node scripts/geocode-properties.mjs
```

---

## 3. Output Format

`properties-geocoded.json` mirrors the structure of `properties.json` exactly, with two extra fields per entry:

```json
{
  "North Memphis / Raleigh 38127": [
    {
      "address": "2134 SlocumMemphis, TN",
      "zip": "38127",
      "lat": 35.2031,
      "lng": -90.0187
    },
    {
      "address": "686 DeltaMemphis, TN",
      "zip": "38109",
      "lat": null,
      "lng": null
    }
  ]
}
```

Entries that could not be geocoded get `lat: null, lng: null` and are excluded from the map.

### Current results (April 2026)

| Total addresses | Geocoded | Failed |
|---|---|---|
| 498 | 417 (83.7%) | 81 (16.3%) |

Most failures are newer subdivisions in Cordova and Millington that have limited OpenStreetMap coverage, plus a handful of malformed addresses (e.g. multi-address entries like `"5277 Flowering Peach D / 5221 Flowering Peach Dr / ..."`).

---

## 4. Current Provider: Nominatim (OpenStreetMap)

| Property | Value |
|---|---|
| Cost | Free, always |
| API key | Not required |
| Rate limit | 1 request/second (enforced by the script) |
| Time for 498 addresses | ≈ 9 minutes |
| US coverage | Good for established streets; lower for new subdivisions |
| Terms of Service | Must include a `User-Agent` header identifying your app — already set |

The script uses **structured queries** (street + city + state + postalcode) as the primary strategy, and falls back to a **free-form query** if the structured one returns no results.

---

## 5. Switching to Google Geocoding API

Google Geocoding covers virtually all US addresses and resolves most of the 81 failures. The free tier includes **$200/month credit ≈ 40,000 requests**, so geocoding 498 addresses costs nothing.

### Step 1 — Set the environment variable

Add to your `.env.local` (already used by `app/api/geocode/route.ts`):

```
GOOGLE_MAPS_SERVER_KEY=your_api_key_here
```

### Step 2 — Replace the `geocode()` function body

Open `scripts/geocode-properties.mjs` and replace the entire body of the `geocode()` function with:

```js
async function geocode(address, zip) {
    const { street, city, state } = parseAddress(address)

    const query = street && city
        ? `${street}, ${city}, ${state} ${zip}`
        : `${address} ${zip}`

    const params = new URLSearchParams({
        address: query,
        key: process.env.GOOGLE_MAPS_SERVER_KEY,
    })

    const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?${params}`
    )
    const json = await res.json()

    if (json.status !== "OK" || !json.results.length) return null

    const loc = json.results[0].geometry.location
    return { lat: loc.lat, lng: loc.lng }
}
```

### Step 3 — Reduce the rate limit delay

Google supports far higher throughput. Change the sleep at the bottom of the loop from:

```js
await sleep(1100)   // Nominatim: max 1 req/sec
```

to:

```js
await sleep(50)     // Google: ~20 req/sec is safe
```

This reduces the total runtime for 498 addresses from ~9 minutes to ~25 seconds.

### Step 4 — Load the env file

The script runs outside Next.js, so `.env.local` is not loaded automatically. Either:

- **Option A** — prefix the command:
  ```bash
  GOOGLE_MAPS_SERVER_KEY=your_key node scripts/geocode-properties.mjs
  ```

- **Option B** — add `dotenv` loading at the top of the script (already installed as a dependency):
  ```js
  import { config } from "dotenv"
  config({ path: ".env.local" })
  ```

---

## 6. Adding New Cities to the Address Parser

Addresses in `properties.json` have a formatting bug: the city name is concatenated directly with the street name with no separator:

```
"2134 SlocumMemphis, TN"   ← street: "2134 Slocum", city: "Memphis"
```

The `KNOWN_CITIES` array at the top of the script is the list of city names the parser uses to find the split point.

**If new properties appear in a city not currently in the list**, add it:

```js
const KNOWN_CITIES = [
    "Horn Lake",      // ← multi-word names FIRST (longest match wins)
    "Olive Branch",
    "West Memphis",
    // ...
    "Memphis",        // ← single-word names LAST
    "Jackson",
]
```

> **Order matters**: always put longer / multi-word city names before shorter ones.  
> `"West Memphis"` must appear before `"Memphis"`, otherwise `"West Memphis"` would be split as street=`"West "` + city=`"Memphis"`.

---

## 7. PropertiesMap Component

The map is rendered by `components/sections/properties-map.tsx`, a `"use client"` component that uses:

- **`react-leaflet`** — already in `package.json`
- **`react-leaflet-cluster`** — installed for marker clustering (groups nearby pins at low zoom)
- **OpenStreetMap tiles** — free, no key required at runtime

The component receives pre-computed markers as props from the server component, so no geocoding API calls happen at runtime.

### Leaflet icon fix

Leaflet's default marker icons break in Next.js because webpack replaces the image imports. The component patches `L.Icon.Default` on mount to point to the CDN URLs from `unpkg.com`. This is a known issue with Leaflet + webpack and the patch is stable.

### Dynamic import

Because Leaflet requires `window`, the component must be loaded with `ssr: false`:

```tsx
// app/properties-we-bought/page.tsx
const PropertiesMap = dynamic(
    () => import("@/components/sections/properties-map").then((m) => m.PropertiesMap),
    { ssr: false }
)
```
