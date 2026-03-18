import { NextRequest, NextResponse } from "next/server"

const RENTCAST_API_KEY = process.env.RENTCAST_API_KEY ?? ""
const RENTCAST_BASE = "https://api.rentcast.io/v1"
// Default max radius for AVM comparable search (miles)
const DEFAULT_MAX_RADIUS = 10

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")
    const city = searchParams.get("city")
    const state = searchParams.get("state")
    const limit = searchParams.get("limit") ?? "30"

    // AVM-specific params (optional)
    const avm = (searchParams.get("avm") ?? "").toLowerCase()
    const latitude = searchParams.get("latitude")
    const longitude = searchParams.get("longitude")
    const propertyType = searchParams.get("propertyType")
    const bedrooms = searchParams.get("bedrooms")
    const bathrooms = searchParams.get("bathrooms")
    const squareFootage = searchParams.get("squareFootage")
    const maxRadius = searchParams.get("maxRadius") ?? String(DEFAULT_MAX_RADIUS)

    // Basic validation: require either an address or city+state for general searches.
    // For AVM requests, allow address or latitude+longitude.
    if (avm === "1" || avm === "true") {
        if (!address && !(latitude && longitude)) {
            return NextResponse.json(
                { error: "address or latitude+longitude query parameters are required for AVM" },
                { status: 400 }
            )
        }
    } else {
        if (!address && !(city && state)) {
            return NextResponse.json(
                { error: "address or city+state query parameters are required" },
                { status: 400 }
            )
        }
    }

    if (!RENTCAST_API_KEY) {
        return NextResponse.json({ error: "Rentcast API key is not configured" }, { status: 500 })
    }

    // Choose endpoint: AVM (if requested) or original properties/listings behavior.
    let url: string
    if (avm === "1" || avm === "true") {
        const params = new URLSearchParams()
        if (address) params.append("address", address)
        if (latitude) params.append("latitude", latitude)
        if (longitude) params.append("longitude", longitude)
        if (propertyType) params.append("propertyType", propertyType)
        if (bedrooms) params.append("bedrooms", bedrooms)
        if (bathrooms) params.append("bathrooms", bathrooms)
        if (squareFootage) params.append("squareFootage", squareFootage)
        params.append("maxRadius", maxRadius)

        url = `${RENTCAST_BASE}/avm/value?${params.toString()}`
    } else {
        // If `address` is provided, previous behavior (properties search).
        // Otherwise, call listings/sale with city/state to include price information.
        if (address) {
            const params = new URLSearchParams({
                address,
                radius: "10",
                limit,
            })

            url = `${RENTCAST_BASE}/properties?${params.toString()}`
        } else {
            const params = new URLSearchParams({
                city: city as string,
                state: state as string,
                status: "Active",
                limit,
            })

            url = `${RENTCAST_BASE}/listings/sale?${params.toString()}`
        }
    }

    try {
        const response = await fetch(url, {
            headers: {
                Accept: "application/json",
                "X-Api-Key": RENTCAST_API_KEY,
            },
            // Revalidate every hour — property data doesn't change by the minute
            next: { revalidate: 3600 },
        })

        if (!response.ok) {
            const text = await response.text()
            console.error("[Rentcast] API error:", response.status, text)
            return NextResponse.json(
                { error: `Rentcast error: ${response.status}`, detail: text },
                { status: response.status }
            )
        }

        const data = await response.json()

        // If caller asked for a single property result, and the API returned an array,
        // return only the first item to simplify client-side pre-filling.
        const single = searchParams.get("single")
        if (single === "1") {
            if (Array.isArray(data)) {
                return NextResponse.json(data[0] ?? {})
            }
            // If the API already returned an object, return it as-is
            return NextResponse.json(data)
        }

        return NextResponse.json(data)
    } catch (err) {
        console.error("[Rentcast] Fetch failed:", err)
        return NextResponse.json({ error: "Failed to reach Rentcast API" }, { status: 502 })
    }
}
