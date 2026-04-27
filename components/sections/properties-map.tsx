"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import type { LatLngTuple } from "leaflet"

import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "react-leaflet-cluster/dist/assets/MarkerCluster.css"
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css"

export type MapMarker = {
    address: string
    lat: number
    lng: number
}

interface Props {
    markers: MapMarker[]
}

const MEMPHIS_CENTER: LatLngTuple = [35.1495, -90.049]

// Leaflet's default icon resolution breaks in Next.js – patch once on mount.
function patchLeafletIcons() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    })
}

export function PropertiesMap({ markers }: Props) {
    const patched = useRef(false)
    useEffect(() => {
        if (!patched.current) {
            patched.current = true
            patchLeafletIcons()
        }
    }, [])

    return (
        <section
            id="properties-map"
            className="bg-[var(--color-background)] border-b border-white/10"
            aria-labelledby="properties-map-heading"
        >
            <div className="mx-auto max-w-7xl px-4 lg:px-8 py-10 lg:py-14">
                <div className="text-center mb-8">
                    <p className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-4 uppercase tracking-wide">
                        Where We&apos;ve Bought
                    </p>
                    <h2 id="properties-map-heading" className="text-2xl md:text-3xl font-bold text-white">
                        Houses We&apos;ve Purchased — Map View
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-3">
                        {markers.length} verified cash purchases across the Memphis area.
                        Click any cluster to zoom in, click a pin to see the address.
                    </p>
                </div>

                <div
                    className="w-full overflow-hidden rounded-2xl shadow-md border border-white/10"
                    style={{ height: 520 }}
                >
                    <MapContainer
                        center={MEMPHIS_CENTER}
                        zoom={11}
                        style={{ width: "100%", height: "100%" }}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MarkerClusterGroup chunkedLoading>
                            {markers.map((m, i) => (
                                <Marker key={i} position={[m.lat, m.lng]}>
                                    <Popup>{m.address}</Popup>
                                </Marker>
                            ))}
                        </MarkerClusterGroup>
                    </MapContainer>
                </div>
            </div>
        </section>
    )
}
