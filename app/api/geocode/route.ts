import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const address = req.nextUrl.searchParams.get("address")
    if (!address) {
        return NextResponse.json({ error: "Missing address" }, { status: 400 })
    }

    const key = process.env.GOOGLE_MAPS_SERVER_KEY
    if (!key) {
        return NextResponse.json({ error: "Missing server API key" }, { status: 500 })
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`
    const res = await fetch(url)
    const json = await res.json()

    return NextResponse.json(json)
}
