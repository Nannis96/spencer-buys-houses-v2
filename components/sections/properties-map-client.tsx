"use client"

import dynamic from "next/dynamic"
import type { MapMarker } from "@/components/sections/properties-map"

const PropertiesMapInner = dynamic(
    () => import("@/components/sections/properties-map").then((m) => m.PropertiesMap),
    {
        ssr: false,
        loading: () => (
            <section className="bg-[var(--color-background)] border-b border-white/10">
                <div className="mx-auto max-w-7xl px-4 lg:px-8 py-10 lg:py-14">
                    <div
                        className="w-full rounded-2xl border border-white/10 bg-[var(--color-bg-950)] flex items-center justify-center"
                        style={{ height: 520 }}
                    >
                        <span className="text-gray-400 text-sm">Loading map…</span>
                    </div>
                </div>
            </section>
        ),
    }
)

export function PropertiesMapClient({ markers }: { markers: MapMarker[] }) {
    return <PropertiesMapInner markers={markers} />
}
