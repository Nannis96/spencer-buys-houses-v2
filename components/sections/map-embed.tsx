"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

interface MapEmbedProps {
    src: string
    title: string
    address?: string
}

export function MapEmbed({ src, title, address }: MapEmbedProps) {
    const [loaded, setLoaded] = useState(false)

    if (loaded) {
        return (
            <iframe
                title={title}
                src={src}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        )
    }

    return (
        <button
            type="button"
            onClick={() => setLoaded(true)}
            className="relative w-full h-full bg-[#1a1a2e] flex flex-col items-center justify-center gap-3 cursor-pointer group"
            aria-label={`Load map: ${title}`}
        >
            {/* Grid lines mimicking a map */}
            <div
                className="absolute inset-0 opacity-10"
                aria-hidden="true"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary-dark)]/20 border border-[var(--color-primary)]/40 group-hover:bg-[var(--color-primary-dark)]/30 transition-colors">
                    <MapPin className="h-7 w-7 text-[var(--color-primary-dark)]" aria-hidden="true" />
                </div>
                <div className="text-center">
                    <p className="text-white font-semibold text-sm">Click to load map</p>
                    {address && (
                        <p className="text-gray-400 text-xs mt-1">{address}</p>
                    )}
                </div>
            </div>
        </button>
    )
}
