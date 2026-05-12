"use client"

import { useState, useEffect, useRef } from "react"
import { Phone, Menu, X, Home, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { SocialLinks } from "./social-links"
import { citiesData } from "@/lib/cities"

type NavService = { slug: string; title: string; category: string }

const SERVICE_CATEGORIES = [
    'Financial Situations',
    'Property Condition',
    'Life Changes',
    'Landlord Problems',
    'Listing Issues',
    'Legal',
    'Other',
]

export function StickyHeader() {
    const headerRef = useRef<HTMLElement | null>(null)
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mobileCitiesOpen, setMobileCitiesOpen] = useState(false)
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
    const [mobileOpenState, setMobileOpenState] = useState<string | null>(null)
    const [mobileOpenCategory, setMobileOpenCategory] = useState<string | null>(null)
    const [hoveredState, setHoveredState] = useState<string | null>(null)
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
    const [navServices, setNavServices] = useState<NavService[]>([])
    const pathname = usePathname()

    const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+19013999952"
    const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "(901) 399-9952"
    const PHONE_ARIA = `Call Spencer Buys Houses at ${PHONE_DISPLAY}`

    useEffect(() => {
        fetch('/api/services/nav')
            .then((r) => r.json())
            .then((data) => setNavServices(data))
            .catch(() => { })
    }, [])

    const serveStates = citiesData.filter((s) => s.stateSlug === "tennessee" || s.stateSlug === "mississippi")

    const normalizedPath = (pathname ?? "").replace(/\/$/, "")
    const isCitiesActive = normalizedPath === "/we-serve" || normalizedPath.startsWith("/we-serve/")
    const isServicesActive = normalizedPath === "/services" || normalizedPath.startsWith("/services/")

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const setHeaderHeight = () => {
            const h = headerRef.current?.offsetHeight ?? 0
            document.documentElement.style.setProperty("--app-header-height", `${h}px`)
        }

        setHeaderHeight()
        window.addEventListener("resize", setHeaderHeight)
        return () => window.removeEventListener("resize", setHeaderHeight)
    }, [])

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-[var(--color-background)] shadow-lg"
                : "bg-[var(--color-background)] shadow"
                }`}
            itemScope
            itemType="https://schema.org/Organization"
        >
            {/* Organization SEO properties */}
            <meta itemProp="name" content="Sell Your Memphis House Fast | Spencer Buys Houses" />
            <meta itemProp="url" content="https://www.spencerbuyshouses.com" />
            <meta itemProp="telephone" content={PHONE_NUMBER} />
            <meta itemProp="description" content="Need to sell your Memphis house fast for cash? Spencer Buys Houses offers fair cash offer, no fees and fast closing. Get your free offer today! (901)-979-9848" />

            <div className="mx-auto max-w-7xl px-4 lg:px-8 w-full">
                <div className="flex flex-col py-2">
                    <div className="grid grid-cols-3 items-center">

                        {/* Logo */}
                        <div className="flex justify-start">
                            <Link
                                href="/"
                                itemProp="url"
                                aria-label="Spencer Buys Houses Home"
                            >
                                <Image
                                    src="/SpencerBuysHouses_yellow.png"
                                    alt="SpencerBuysHouses.com"
                                    width={160}
                                    height={40}
                                    priority
                                    itemProp="logo"
                                />
                            </Link>
                        </div>

                        {/*Call Today (desktop center)*/}
                        <div className="hidden md:flex justify-center">
                            <a
                                href={`tel:${PHONE_NUMBER}`}
                                itemProp="telephone"
                                aria-label={PHONE_ARIA}
                                className="text-[var(--color-primary-dark)] font-semibold text-lg"
                            >
                                Call Today: {PHONE_DISPLAY}
                            </a>
                        </div>

                        <div className="flex items-center ml-auto md:ml-0 md:justify-end gap-4">
                            <SocialLinks className="hidden md:flex items-center gap-4" />

                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="md:hidden text-white p-2 ml-auto"
                                aria-label="Open navigation menu"
                                aria-expanded={mobileMenuOpen}
                                aria-controls="mobile-navigation"
                            >
                                <Menu className="h-6 w-6 text-[var(--color-primary-dark)]" />
                            </button>
                        </div>
                    </div>

                    <nav className="hidden md:flex justify-center pt-1 gap-1">
                        {[
                            { label: "Get your cash offer", href: "/get-a-cash-offer-today/" },
                            { label: "About", href: "/about/" },
                            { label: "How it works", href: "/how-it-works/" },
                            { label: "Properties we've bought", href: "/properties-we-bought/" },
                            { label: "Blog", href: "/blog/" },
                            { label: "Contact us", href: "/contact-us/" },
                            { label: "Get paid for referring", href: "/get-paid/" },
                        ].map((item, idx) => {
                            const normalizedPath = pathname.replace(/\/$/, "")
                            const normalizedHref = item.href.replace(/\/$/, "")
                            const isActive = normalizedPath === normalizedHref || normalizedPath.startsWith(normalizedHref + "/")
                            return (
                                <div key={item.label} className="flex items-center">
                                    <a
                                        href={item.href}
                                        className={`relative px-3 py-1 text-sm font-medium transition-all duration-200 rounded-md ${isActive
                                            ? "text-[var(--color-primary)] bg-[var(--color-primary)]/10"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                            }`}
                                    >
                                        {item.label}
                                        <span
                                            className={`absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-[#f59e0b] transition-all duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-30"
                                                }`}
                                        />
                                    </a>

                                    {idx === 0 && (
                                        <div className="relative group">
                                            <button className={`relative px-3 py-1 text-sm font-medium rounded-md ${isCitiesActive ? "text-[var(--color-primary)] bg-[var(--color-primary)]/10" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                                                Cities we serve
                                                <span className={`absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-[var] transition-all duration-300 ${isCitiesActive ? "opacity-100" : "opacity-0 group-hover:opacity-30"}`} />
                                            </button>

                                            <div onMouseLeave={() => setHoveredState(null)} className={`invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute top-full left-0 pt-2 z-50 ${hoveredState ? "w-[28rem]" : "w-48"}`}>
                                                <div className="bg-[var(--color-background)] border border-white/10 rounded-lg shadow-lg p-4 overflow-hidden transition-all duration-200">
                                                    <div className="flex">
                                                        <div className={hoveredState ? "w-1/3 pr-4 border-r border-white/5" : "w-full pr-0 border-r-0"}>
                                                            <ul className="space-y-2">
                                                                {serveStates.map((s) => (
                                                                    <li key={s.stateSlug}>
                                                                        <button
                                                                            onMouseEnter={() => setHoveredState(s.stateSlug)}
                                                                            onFocus={() => setHoveredState(s.stateSlug)}
                                                                            className={`w-full text-left text-sm py-2 px-2 rounded ${hoveredState === s.stateSlug ? "bg-white/5 text-white font-semibold" : "text-gray-300 hover:text-white"}`}
                                                                        >
                                                                            {s.state}
                                                                        </button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {hoveredState ? (
                                                            <div className="w-2/3 pl-4">
                                                                {serveStates.filter((s) => s.stateSlug === hoveredState).map((s) => (
                                                                    <div key={s.stateSlug}>
                                                                        <div className="font-semibold text-sm text-white mb-2">{s.state}</div>
                                                                        <ul className="space-y-1">
                                                                            {s.cities.map((c: any) => (
                                                                                <li key={c.slug}>
                                                                                    <a href={`/we-serve/${s.stateSlug}/${c.slug}/`} className="text-gray-300 hover:text-white text-sm block py-1">
                                                                                        {c.name}
                                                                                    </a>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {idx === 0 && (
                                        <div className="relative group">
                                            <button className={`relative px-3 py-1 text-sm font-medium rounded-md ${isServicesActive ? "text-[var(--color-primary)] bg-[var(--color-primary)]/10" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                                                Services
                                                <span className={`absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-[#f59e0b] transition-all duration-300 ${isServicesActive ? "opacity-100" : "opacity-0 group-hover:opacity-30"}`} />
                                            </button>

                                            <div onMouseLeave={() => setHoveredCategory(null)} className={`invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute top-full left-0 pt-2 z-50 ${hoveredCategory ? "w-[28rem]" : "w-56"}`}>
                                                <div className="bg-[var(--color-background)] border border-white/10 rounded-lg shadow-lg p-4 overflow-hidden transition-all duration-200">
                                                    <div className="flex">
                                                        <div className={hoveredCategory ? "w-1/2 pr-4 border-r border-white/5" : "w-full pr-0 border-r-0"}>
                                                            <ul className="space-y-1">
                                                                {SERVICE_CATEGORIES.map((cat) => (
                                                                    <li key={cat}>
                                                                        <button
                                                                            onMouseEnter={() => setHoveredCategory(cat)}
                                                                            onFocus={() => setHoveredCategory(cat)}
                                                                            className={`w-full text-left text-sm py-2 px-2 rounded ${hoveredCategory === cat ? "bg-white/5 text-white font-semibold" : "text-gray-300 hover:text-white"}`}
                                                                        >
                                                                            {cat}
                                                                        </button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {hoveredCategory && (
                                                            <div className="w-1/2 pl-4">
                                                                <div className="font-semibold text-xs text-[#f59e0b] uppercase tracking-wide mb-2">{hoveredCategory}</div>
                                                                <ul className="space-y-1">
                                                                    {navServices.filter((s) => s.category === hoveredCategory).length > 0
                                                                        ? navServices.filter((s) => s.category === hoveredCategory).map((s) => (
                                                                            <li key={s.slug}>
                                                                                <a href={`/services/${s.slug}/`} className="text-gray-300 hover:text-white text-sm block py-1">
                                                                                    {s.title}
                                                                                </a>
                                                                            </li>
                                                                        ))
                                                                        : <li className="text-gray-500 text-xs py-1">No services yet</li>
                                                                    }
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </nav>

                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[999] md:hidden">

                    {/* fondo oscuro */}
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={() => { setMobileMenuOpen(false); setMobileCitiesOpen(false); setMobileServicesOpen(false); setMobileOpenState(null); setMobileOpenCategory(null); }}
                    />

                    {/* panel */}
                    <div className="absolute top-0 left-0 right-0 bg-[#0f0f23] shadow-lg">

                        {/* header del panel */}
                        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">

                            <span className="text-white font-bold">
                                Spencer Buys Houses
                            </span>

                            <button
                                onClick={() => { setMobileMenuOpen(false); setMobileCitiesOpen(false); setMobileServicesOpen(false); setMobileOpenState(null); setMobileOpenCategory(null); }}
                                aria-label="Close menu"
                            >
                                <X className="h-6 w-6 text-[var(--color-primary-dark)]" />
                            </button>

                        </div>

                        {/* links */}
                        <nav className="flex flex-col px-4 py-4">

                            {[
                                { label: "Get your cash offer", href: "/get-a-cash-offer-today/" },
                                { label: "About", href: "/about/" },
                                { label: "How it works", href: "/how-it-works/" },
                                { label: "Properties We Bought", href: "/properties-we-bought/" },
                                { label: "Blog", href: "/blog/" },
                                { label: "Contact us", href: "/contact-us/" },
                                { label: "Get paid for referring", href: "/get-paid/" },
                            ].map((item) => {
                                const normalizedPath = pathname.replace(/\/$/, "")
                                const normalizedHref = item.href.replace(/\/$/, "")
                                const isActive = normalizedPath === normalizedHref || normalizedPath.startsWith(normalizedHref + "/")
                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className={`flex items-center justify-between py-4 border-b border-white/10 transition-colors ${isActive ? "text-[#f59e0b] font-medium" : "text-white"
                                            }`}
                                        onClick={() => { setMobileMenuOpen(false); setMobileCitiesOpen(false); setMobileServicesOpen(false); setMobileOpenState(null); setMobileOpenCategory(null); }}
                                    >
                                        {item.label}
                                        {isActive && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                                        )}
                                    </a>
                                )
                            })}

                            {/* Mobile: Services */}
                            <div className="pt-2">
                                <button
                                    onClick={() => setMobileServicesOpen((v) => !v)}
                                    aria-expanded={mobileServicesOpen}
                                    className="w-full flex items-center justify-between text-white py-3 border-b border-white/10"
                                >
                                    <span className="text-sm font-medium">Services</span>
                                    <span className="text-gray-300">
                                        {mobileServicesOpen ? <ChevronUp className="h-5 w-5 text-[var(--color-primary-dark)]" /> : <ChevronDown className="h-5 w-5 text-[var(--color-primary-dark)]" />}
                                    </span>
                                </button>

                                {mobileServicesOpen && (
                                    <div className="pt-2">
                                        <ul className="space-y-2">
                                            {SERVICE_CATEGORIES.map((cat) => (
                                                <li key={cat} className="mb-1">
                                                    <button
                                                        onClick={() => setMobileOpenCategory((prev) => prev === cat ? null : cat)}
                                                        aria-expanded={mobileOpenCategory === cat}
                                                        className="w-full flex items-center justify-between text-white py-3"
                                                    >
                                                        <span className="text-sm font-medium">{cat}</span>
                                                        <span className="text-gray-300">
                                                            {mobileOpenCategory === cat ? <ChevronUp className="h-4 w-4 text-[var(--color-primary-dark)]" /> : <ChevronDown className="h-4 w-4 text-[var(--color-primary-dark)]" />}
                                                        </span>
                                                    </button>

                                                    {mobileOpenCategory === cat && (
                                                        <div className="pl-4 pt-1 pb-2">
                                                            {navServices.filter((s) => s.category === cat).length > 0
                                                                ? navServices.filter((s) => s.category === cat).map((s) => (
                                                                    <a
                                                                        key={s.slug}
                                                                        href={`/services/${s.slug}/`}
                                                                        className="block py-2 text-gray-300"
                                                                        onClick={() => { setMobileMenuOpen(false); setMobileServicesOpen(false); setMobileOpenCategory(null); }}
                                                                    >
                                                                        {s.title}
                                                                    </a>
                                                                ))
                                                                : <span className="text-gray-500 text-xs">No services yet</span>
                                                            }
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Mobile: States & cities */}
                            <div className="pt-2">
                                <button
                                    onClick={() => setMobileCitiesOpen((v) => !v)}
                                    aria-expanded={mobileCitiesOpen}
                                    className="w-full flex items-center justify-between text-white py-3 border-b border-white/10"
                                >
                                    <span className="text-sm font-medium">Cities we serve</span>
                                    <span className="text-gray-300">
                                        {mobileCitiesOpen ? <ChevronUp className="h-5 w-5 text-[var(--color-primary-dark)]" /> : <ChevronDown className="h-5 w-5 text-[var(--color-primary-dark)]" />}
                                    </span>
                                </button>

                                {mobileCitiesOpen && (
                                    <div className="pt-2">
                                        <ul className="space-y-2">
                                            {serveStates.map((s) => (
                                                <li key={s.stateSlug} className="mb-1">
                                                    <button
                                                        onClick={() => setMobileOpenState((prev) => prev === s.stateSlug ? null : s.stateSlug)}
                                                        aria-expanded={mobileOpenState === s.stateSlug}
                                                        className="w-full flex items-center justify-between text-white py-3"
                                                    >
                                                        <span className="text-sm font-medium">{s.state}</span>
                                                        <span className="text-gray-300">
                                                            {mobileOpenState === s.stateSlug ? <ChevronUp className="h-4 w-4 text-[var(--color-primary-dark)]" /> : <ChevronDown className="h-4 w-4 text-[var(--color-primary-dark)]" />}
                                                        </span>
                                                    </button>

                                                    {mobileOpenState === s.stateSlug && (
                                                        <div className="pl-4 pt-2">
                                                            {s.cities.map((c: any) => (
                                                                <a
                                                                    key={c.slug}
                                                                    href={`/we-serve/${s.stateSlug}/${c.slug}/`}
                                                                    className="block py-2 text-gray-300"
                                                                    onClick={() => { setMobileMenuOpen(false); setMobileCitiesOpen(false); setMobileServicesOpen(false); setMobileOpenState(null); setMobileOpenCategory(null); }}
                                                                >
                                                                    {c.name}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* CTA */}
                            <a
                                href={`tel:${PHONE_NUMBER}`}
                                className="mt-4 py-3 text-center font-bold bg-[#f59e0b] text-black rounded-lg"
                                aria-label={PHONE_ARIA}
                            >
                                Call Today: {PHONE_DISPLAY}
                            </a>

                        </nav>
                    </div>
                </div>
            )}

        </header >
    )
}
