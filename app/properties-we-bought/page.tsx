import type { Metadata } from "next"
import { readFileSync } from "fs"
import { join } from "path"
import { Home, TrendingUp, Calendar } from "lucide-react"
import rawData from "@/scripts/properties.json"
import { CallButton } from "@/components/ui/call-button"
import { CTAButton } from "@/components/ui/cta-button"
import { PropertiesMapClient } from "@/components/sections/properties-map-client"
import type { MapMarker } from "@/components/sections/properties-map"
import { JsonLd } from "@/components/seo/json-ld"
import { buildBreadcrumbList, SITE_URL } from "@/lib/schema"
import { PropertiesListClient } from "@/components/sections/properties-list-client"

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
        images: [{ url: "https://www.spencerbuyshouses.com/Home-Page-Design1-2.webp", width: 1200, height: 630 }],
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
    if (key === "Other Markets") return "other"
    if (key === "Mississippi") return "mississippi"

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



/* ─── Page ───────────────────────────────────────────────────────────────── */

const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", item: `${SITE_URL}/` },
    { name: "Properties We've Bought", item: `${SITE_URL}/properties-we-bought/` },
])

export default function PropertiesWeBoughtPage() {
    return (
        <>
            <JsonLd data={breadcrumbSchema} />
            <main className="bg-[var(--color-background)] min-h-screen pt-30">

                {/* ── Hero ──────────────────────────────────────────────────── */}
                <section className="bg-[var(--color-background)] border-b border-white/10">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8 md:py-10">
                        <div className="max-w-3xl text-left">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-amber-10)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)] mb-4">
                                <Home className="h-3.5 w-3.5" />
                                Verified Purchase History
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                                Properties We&apos;ve Bought{" "}
                                <span className="text-[var(--color-primary)]">Across Memphis & Beyond</span>
                            </h1>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                Over a decade of cash purchases across every Memphis neighborhood. This is our documented track record — real addresses, real deals, real proof that we buy houses.
                            </p>

                            <div className="hero-stats w-full max-w-5xl mx-auto">
                                <div className="grid grid-cols-2 md:grid-cols-4 border border-[var(--color-primary-dark)]/30 rounded-sm overflow-hidden">

                                    <div className="flex flex-col items-center justify-center py-6 border-r border-[var(--color-primary-dark)]/30">
                                        <span className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
                                            552+
                                        </span>
                                        <span className="text-sm text-gray-300">
                                            Homes purchased
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center py-6 border-r border-[var(--color-primary-dark)]/30">
                                        <span className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
                                            34
                                        </span>
                                        <span className="text-sm text-gray-300">
                                            Zip codes
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center py-6 border-r border-[var(--color-primary-dark)]/30">
                                        <span className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
                                            6–7
                                        </span>
                                        <span className="text-sm text-gray-300">
                                            Homes / month
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center py-6">
                                        <span className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
                                            10+
                                        </span>
                                        <span className="text-sm text-gray-300">
                                            Years in Memphis
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Map ──────────────────────────────────────────────────── */}
                {/* <PropertiesMapClient markers={mapMarkers} /> */}

                {/* ── Property List ─────────────────────────────────────────── */}
                <PropertiesListClient
                    memphisGroups={memphisGroups}
                    msGroups={msGroups}
                    otherGroups={otherGroups}
                />

                {/* ── CTA ───────────────────────────────────────────────────── */}
                <section className="bg-[var(--color-background-yellow)] border-t border-white/10 relative">
                    {/* Desktop: text flush left, buttons flush right */}
                    <div className="hidden md:flex items-center justify-between px-4 lg:px-16 py-8 min-h-[200px]">
                        <div className="max-w-[720px]">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
                                Have a house to sell in Memphis?
                            </h2>
                            <p className="text-black text-base">
                                We&apos;bought homes in your neighborhood before. Cash offer, no repairs, close in as little as 7 days.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 shrink-0 ml-8">
                            <CTAButton href="/get-a-cash-offer-today/">
                                Get Your Free Cash Offer
                            </CTAButton>
                            <CallButton inline />
                        </div>
                    </div>

                    {/* Mobile: stacked, centered */}
                    <div className="md:hidden mx-auto max-w-4xl px-4 lg:px-8 py-20 text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
                            Have a house to sell in Memphis?
                        </h2>
                        <p className="text-black text-sm mb-6 max-w-xl mx-auto">
                            We&apos;bought homes in your neighborhood before. Cash offer, no repairs, close in as little as 7 days.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <CTAButton href="/get-a-cash-offer-today/">Get Your Free Cash Offer</CTAButton>
                            <CallButton inline />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
