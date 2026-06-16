"use client"

import { useState, useMemo, useRef } from "react"
import { MapPin, ChevronDown } from "lucide-react"

/* ─── Types ──────────────────────────────────────────────────────────────── */

type PropertyEntry = { address: string; zip: string }
type Group = { key: string; label: string; entries: PropertyEntry[] }
type Region = "all" | "memphis" | "mississippi" | "other"

interface Props {
    memphisGroups: Group[]
    msGroups: Group[]
    otherGroups: Group[]
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function AddressCard({ address }: { address: string }) {
    return (
        <div className="rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 flex items-start gap-2">
            <MapPin className="shrink-0 mt-0.5 h-3.5 w-3.5 text-[var(--color-primary-dark)]" />
            <span className="text-sm text-black leading-snug">{address}</span>
        </div>
    )
}

function NeighborhoodSection({ group }: { group: Group }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-black text-sm leading-tight">{group.label}</h3>
                    <span className="shrink-0 text-xs font-bold text-[var(--color-text-red)] bg-[var(--color-amber-10)] border border-[var(--color-primary)]/30 rounded-full px-2 py-0.5">
                        {group.entries.length} home{group.entries.length !== 1 ? "s" : ""}
                    </span>
                </div>
                <ChevronDown
                    className={`shrink-0 h-4 w-4 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="px-4 py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                    {group.entries.map((entry, i) => (
                        <AddressCard key={i} address={entry.address} />
                    ))}
                </div>
            )}
        </div>
    )
}

function SectionHeading({ title, count }: { title: string; count: number }) {
    return (
        <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-black">{title}</h2>
            <span className="text-[var(--color-primary)] font-semibold text-lg sm:ml-2">
                — {count.toLocaleString()} Properties
            </span>
        </div>
    )
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */

const TABS: { label: string; value: Region }[] = [
    { label: "All Regions", value: "all" },
    { label: "Memphis, TN", value: "memphis" },
    { label: "Mississippi", value: "mississippi" },
    { label: "Other Markets", value: "other" },
]

function filterGroups(groups: Group[], query: string): Group[] {
    if (!query.trim()) return groups
    const q = query.toLowerCase()
    return groups
        .map((g) => ({
            ...g,
            entries: g.entries.filter(
                (e) =>
                    e.address.toLowerCase().includes(q) ||
                    g.label.toLowerCase().includes(q)
            ),
        }))
        .filter((g) => g.entries.length > 0)
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export function PropertiesListClient({ memphisGroups, msGroups, otherGroups }: Props) {
    const [query, setQuery] = useState("")
    const [region, setRegion] = useState<Region>("all")
    const [activeKey, setActiveKey] = useState<string | null>(null)
    const controlsRef = useRef<HTMLDivElement>(null)

    function scrollToSection(key: string) {
        const el = document.getElementById(key)
        if (!el) return
        const appHeaderHeight = parseInt(
            getComputedStyle(document.documentElement)
                .getPropertyValue("--app-header-height") || "80"
        )
        const controlsHeight = controlsRef.current?.offsetHeight ?? 0
        const top = el.getBoundingClientRect().top + window.scrollY - appHeaderHeight - controlsHeight
        window.scrollTo({ top, behavior: "smooth" })
        setActiveKey(key)
    }

    const filteredMemphis = useMemo(
        () => filterGroups(memphisGroups, query),
        [memphisGroups, query]
    )
    const filteredMs = useMemo(
        () => filterGroups(msGroups, query),
        [msGroups, query]
    )
    const filteredOther = useMemo(
        () => filterGroups(otherGroups, query),
        [otherGroups, query]
    )

    const showMemphis = region === "all" || region === "memphis"
    const showMs = region === "all" || region === "mississippi"
    const showOther = region === "all" || region === "other"

    const sidebarGroups = [
        ...(showMemphis ? filteredMemphis : []),
        ...(showMs ? filteredMs : []),
        ...(showOther ? filteredOther : []),
    ]

    const totalVisible =
        (showMemphis ? filteredMemphis.reduce((s, g) => s + g.entries.length, 0) : 0) +
        (showMs ? filteredMs.reduce((s, g) => s + g.entries.length, 0) : 0) +
        (showOther ? filteredOther.reduce((s, g) => s + g.entries.length, 0) : 0)

    return (
        <section className="bg-[var(--color-background-white)]">
            {/* ── Controls (sticky) ────────────────────────────────────────── */}
            <div ref={controlsRef} className="sticky top-[var(--app-header-height,80px)] z-20 bg-[var(--color-background-white)] border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">

                    {/* Search */}
                    <div className="flex-1 w-full">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value)
                                // Typing deselects any active region button
                                if (e.target.value) setRegion("all")
                            }}
                            placeholder="Search by address, neighborhood, or city..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                        />
                    </div>

                    {/* Region tabs */}
                    <div className="flex flex-wrap gap-2">
                        {TABS.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => {
                                    setRegion(tab.value)
                                    // Pressing a region button clears the search
                                    setQuery("")
                                }}
                                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${region === tab.value && !query
                                    ? "bg-black text-white"
                                    : "border border-gray-300 text-black hover:bg-gray-100"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
                {/* ── Body ─────────────────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

                    {/* Sidebar */}
                    <aside className="hidden lg:block sticky top-24 h-fit">
                        <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4">
                            Jump to Neighborhood
                        </h3>
                        <div className="space-y-1 max-h-[80vh] overflow-y-auto pr-2">
                            {sidebarGroups.map((g) => (
                                <button
                                    key={g.key}
                                    onClick={() => scrollToSection(g.key)}
                                    className={`w-full flex items-center justify-between text-sm transition-colors py-1 text-left ${activeKey === g.key
                                            ? "text-[var(--color-primary)] font-semibold"
                                            : "text-black hover:text-[var(--color-primary)]"
                                        }`}
                                >
                                    <span>{g.label}</span>
                                    <span className={`text-xs rounded-full px-2 py-0.5 shrink-0 ml-2 ${activeKey === g.key
                                            ? "bg-[var(--color-primary)] text-white"
                                            : "bg-gray-100"
                                        }`}>
                                        {g.entries.length}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Main content */}
                    <div className="space-y-12">

                        {/* No results */}
                        {totalVisible === 0 && (
                            <p className="text-gray-500 text-center py-16">
                                No properties found{query ? ` for "${query}"` : ""}.
                            </p>
                        )}

                        {/* Memphis */}
                        {showMemphis && filteredMemphis.length > 0 && (
                            <section id="memphis">
                                <SectionHeading
                                    title="Memphis, TN — by Neighborhood"
                                    count={filteredMemphis.reduce((s, g) => s + g.entries.length, 0)}
                                />
                                {filteredMemphis.map((g) => (
                                    <div id={g.key} key={g.key}>
                                        <NeighborhoodSection group={g} />
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* Mississippi */}
                        {showMs && filteredMs.length > 0 && (
                            <section id="mississippi">
                                <SectionHeading
                                    title="Mississippi"
                                    count={filteredMs.reduce((s, g) => s + g.entries.length, 0)}
                                />
                                {filteredMs.map((g) => (
                                    <div id={g.key} key={g.key}>
                                        <NeighborhoodSection group={g} />
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* Other Markets */}
                        {showOther && filteredOther.length > 0 && (
                            <section id="other">
                                <SectionHeading
                                    title="Other Markets"
                                    count={filteredOther.reduce((s, g) => s + g.entries.length, 0)}
                                />
                                {filteredOther.map((g) => (
                                    <div id={g.key} key={g.key}>
                                        <NeighborhoodSection group={g} />
                                    </div>
                                ))}
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
