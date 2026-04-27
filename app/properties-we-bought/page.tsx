import type { Metadata } from "next"
import { readFileSync } from "fs"
import { join } from "path"
import { MapPin, Home, TrendingUp, Calendar } from "lucide-react"
import Link from "next/link"
import rawData from "@/scripts/properties.json"
import { CallButton } from "@/components/ui/call-button"
import { CTAButton } from "@/components/ui/cta-button"
import { PropertiesMapClient } from "@/components/sections/properties-map-client"
import type { MapMarker } from "@/components/sections/properties-map"

/* ─── Metadata ───────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
    title: "Properties We've Bought in Memphis | Spencer Buys Houses",
    description:
        "Browse 546+ homes Spencer Buys Houses has purchased across Memphis, TN and surrounding areas. Cash purchases in every Memphis neighborhood over 10+ years.",
    alternates: { canonical: "/properties-we-bought/" },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.spencerbuyshouses.com/properties-we-bought/",
        siteName: "SpencerBuysHouses.com",
        title: "Properties We've Bought in Memphis | Spencer Buys Houses",
        description:
            "Browse 546+ homes Spencer Buys Houses has purchased across Memphis, TN and surrounding areas — every neighborhood, every condition, cash.",
        images: [{ url: "https://image-cdn.carrot.com/uploads/sites/81361/2025/03/Home-Page-Design1-2.png", width: 1200, height: 630 }],
    },
}

/* ─── Data helpers ───────────────────────────────────────────────────────── */

type PropertyEntry = { address: string; zip: string }
type RawData = Record<string, PropertyEntry[]>

const properties = rawData as RawData

/**
 * Classify each neighborhood bucket into one of three groups:
 *   "memphis"     – TN zips 380xx / 381xx and clear Memphis-area suburbs
 *   "mississippi" – any address ending in ", MS" or MS zips
 *   "other"       – everything else
 */
function classify(
    key: string,
    entries: PropertyEntry[]
): "memphis" | "mississippi" | "other" {
    const msCount = entries.filter((e) => e.address.includes(", MS")).length
    if (msCount >= entries.length * 0.5) return "mississippi"

    const otherCount = entries.filter(
        (e) =>
            !e.address.endsWith(", TN") &&
            !e.address.includes("Memphis, TN") &&
            !e.address.includes("Cordova, TN") &&
            !e.address.includes("Bartlett, TN") &&
            !e.address.includes("Germantown, TN") &&
            !e.address.includes("Collierville, TN") &&
            !e.address.includes("Millington, TN") &&
            !e.address.includes("Arlington, TN") &&
            !e.address.includes("Lakeland, TN") &&
            !e.address.includes(", TN")
    ).length

    if (otherCount >= entries.length * 0.4) return "other"
    return "memphis"
}

type Group = { key: string; label: string; entries: PropertyEntry[] }

const memphisGroups: Group[] = []
const msGroups: Group[] = []
const otherGroups: Group[] = []

for (const [key, entries] of Object.entries(properties)) {
    // Build a clean label (strip trailing zip if embedded in key)
    const label = key
        .replace(/\s+\d{5}(\s*&\s*\d{5})?$/, "")
        .replace(/\s+\d{4,5}$/, "")
        .trim()

    const group: Group = { key, label, entries }
    const cat = classify(key, entries)
    if (cat === "mississippi") msGroups.push(group)
    else if (cat === "other") otherGroups.push(group)
    else memphisGroups.push(group)
}

// Sort by count descending inside each section
const byCount = (a: Group, b: Group) => b.entries.length - a.entries.length
memphisGroups.sort(byCount)
msGroups.sort(byCount)
otherGroups.sort(byCount)

const totalMemphis = memphisGroups.reduce((s, g) => s + g.entries.length, 0)
const totalMs = msGroups.reduce((s, g) => s + g.entries.length, 0)
const totalOther = otherGroups.reduce((s, g) => s + g.entries.length, 0)
const totalAll = totalMemphis + totalMs + totalOther

/* ─── Map markers (from geocoded data if available, else empty) ───────────── */
let mapMarkers: MapMarker[] = []
try {
    const raw = readFileSync(
        join(process.cwd(), "scripts", "properties-geocoded.json"),
        "utf8"
    )
    const geocoded = JSON.parse(raw) as Record<
        string,
        Array<{ address: string; zip: string; lat: number | null; lng: number | null }>
    >
    for (const entries of Object.values(geocoded)) {
        for (const e of entries) {
            if (e.lat != null && e.lng != null) {
                mapMarkers.push({ address: e.address, lat: e.lat, lng: e.lng })
            }
        }
    }
} catch {
    // Geocoded file not yet generated — map will not render markers
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function StatCard({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[var(--color-bg-800)] border border-white/10">
            <span className="text-3xl font-bold text-[var(--color-primary)]">{value}</span>
            <span className="text-sm text-gray-400 mt-1 text-center">{label}</span>
        </div>
    )
}

function NeighborhoodCard({ group }: { group: Group }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-bg-950)] border-b border-white/10">
                <h3 className="font-semibold text-white text-sm leading-tight">{group.label}</h3>
                <span className="ml-3 shrink-0 text-xs font-bold text-[var(--color-text-red)] bg-[var(--color-amber-10)] border border-[var(--color-primary)]/30 rounded-full px-2 py-0.5">
                    {group.entries.length} home{group.entries.length !== 1 ? "s" : ""}
                </span>
            </div>
            {/* Property list */}
            <ul className="divide-y divide-white/5">
                {group.entries.map((entry, i) => (
                    <li key={i} className="flex items-start gap-2 px-4 py-2.5">
                        <MapPin className="shrink-0 mt-0.5 h-3.5 w-3.5 text-[var(--color-primary-dark)]" />
                        <span className="text-sm text-[var(--color-text-black)] leading-snug">{entry.address}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function SectionHeading({
    title,
    count,
}: {
    title: string
    count: number
}) {
    return (
        <div className="flex items-center justify-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <span className="text-[var(--color-primary)] font-semibold text-lg sm:ml-2">
                — {count.toLocaleString()} Properties
            </span>
        </div>
    )
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function PropertiesWeBoughtPage() {
    return (
        <main className="bg-[var(--color-background)] min-h-screen pt-[var(--app-header-height,80px)]">

            {/* ── Hero ──────────────────────────────────────────────────── */}
            <section className="bg-[var(--color-background)] border-b border-white/10">
                <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 md:py-20">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-amber-10)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)] mb-4">
                            <Home className="h-3.5 w-3.5" />
                            Verified Purchase History
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                            Properties We&apos;ve Bought{" "}
                            <span className="text-[var(--color-primary)]">in Memphis, TN</span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Over a decade of cash purchases across every Memphis neighborhood.
                            This is our documented track record — {totalAll.toLocaleString()}+ homes purchased and counting.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <CTAButton href="/get-a-cash-offer-today/">Get Your Free Cash Offer</CTAButton>
                            <CallButton inline />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Stats Bar ────────────────────────────────────────────────── */}
            <section className="bg-[var(--color-background-yellow)] py-12" aria-label="Company statistics">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "546+", label: "Homes Purchased", icon: Home },
                            { value: "34", label: "Memphis Zip Codes", icon: MapPin },
                            { value: "6–7", label: "Homes / Month", icon: TrendingUp },
                            { value: "10+", label: "Years in Memphis", icon: Calendar },
                        ].map(({ value, label, icon: Icon }) => (
                            <div key={label} className="flex flex-col items-center text-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-dark)]/10">
                                    <Icon className="h-6 w-6 text-[var(--color-secondary)]" aria-hidden="true" />
                                </div>
                                <span className="text-3xl md:text-4xl font-black text-[var(--color-text-black)]">{value}</span>
                                <span className="text-sm text-[var(--color-text-black)] font-medium leading-tight">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Map ──────────────────────────────────────────────────── */}
            <PropertiesMapClient markers={mapMarkers} />

            {/* ── Why we publish this ────────────────────────────────────── */}
            <section className="bg-[var(--color-background)] border-b border-white/10">
                <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="shrink-0 rounded-xl bg-[var(--color-amber-10)] border border-[var(--color-primary)]/20 p-3">
                        <TrendingUp className="h-6 w-6 text-[var(--color-primary)]" />
                    </div>
                    <div>
                        <p className="text-white font-semibold mb-1">Why we publish this list</p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            When you call Spencer Buys Houses, you&apos;re not talking to a national company that&apos;s
                            never seen your street. We&apos;ve bought homes throughout this city — and we know exactly
                            what they&apos;re worth. This list is our proof.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Property List ─────────────────────────────────────────── */}
            <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12 space-y-16">

                {/* Memphis TN */}
                <section id="memphis">
                    <SectionHeading title="Memphis, TN — by Neighborhood" count={totalMemphis} />
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {memphisGroups.map((g) => (
                            <NeighborhoodCard key={g.key} group={g} />
                        ))}
                    </div>
                </section>

                {/* Mississippi */}
                {msGroups.length > 0 && (
                    <section id="mississippi">
                        <div className="border-t border-white/10 pt-12">
                            <SectionHeading title="Mississippi" count={totalMs} />
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {msGroups.map((g) => (
                                    <NeighborhoodCard key={g.key} group={g} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Other Markets */}
                {otherGroups.length > 0 && (
                    <section id="other">
                        <div className="border-t border-white/10 pt-12">
                            <SectionHeading title="Other Markets" count={totalOther} />
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {otherGroups.map((g) => (
                                    <NeighborhoodCard key={g.key} group={g} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* ── CTA ───────────────────────────────────────────────────── */}
            <section className="bg-[var(--color-background)] border-t border-white/10">
                <div className="mx-auto max-w-4xl px-4 lg:px-8 py-16 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-amber-10)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)] mb-4">
                        <Calendar className="h-3.5 w-3.5" />
                        We Buy Houses in Your Neighborhood
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                        Have a House in Memphis to Sell?
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                        We&apos;ve bought homes in your neighborhood before.{" "}
                        <span className="text-white font-semibold">Cash offer, no repairs,</span> close in as little
                        as 7 days.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <CTAButton href="/get-a-cash-offer-today/">Get Your Free Cash Offer</CTAButton>
                        <CallButton inline />
                    </div>
                </div>
            </section>
        </main>
    )
}
