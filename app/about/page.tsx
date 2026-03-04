import type { Metadata } from "next"
import {
    Home,
    Users,
    Clock,
    ShieldCheck,
    DollarSign,
    Handshake,
    Star,
    MapPin,
    Phone,
    ArrowRight,
    Check,
    X,
    Minus,
    TrendingUp,
    Award,
} from "lucide-react"
import Image from "next/image"
import { JsonLd } from "@/components/seo/json-ld"
import { CallNowBanner } from "@/components/sections/call-now-banner"

/* ─── Metadata ───────────────────────────────────────────────────────────── */

const SITE_URL = "https://www.spencerbuyshouses.com"
const OG_IMAGE =
    "https://image-cdn.carrot.com/uploads/sites/81361/2025/03/Home-Page-Design1-2.png"

export const metadata: Metadata = {
    title: "About Spencer Buys Houses | Memphis Cash Home Buyers",
    description:
        "Learn about Spencer Buys Houses — Memphis's trusted local cash home buyer with over 10 years of experience. We buy houses in any condition, fast, with no fees or commissions.",
    alternates: {
        canonical: "/about/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: `${SITE_URL}/about/`,
        siteName: "SpencerBuysHouses.com",
        title: "About Spencer Buys Houses | Memphis Cash Home Buyers",
        description:
            "Meet the team behind Spencer Buys Houses — your local Memphis cash buyer. Over 10 years helping homeowners sell fast, without fees, repairs, or drama.",
        images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Spencer Buys Houses | Memphis Cash Home Buyers",
        description:
            "Meet the team behind Spencer Buys Houses — your local Memphis cash buyer. Over 10 years helping homeowners sell fast, without fees, repairs, or drama.",
        images: [OG_IMAGE],
    },
}

/* ─── JSON-LD ─────────────────────────────────────────────────────────────── */

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${SITE_URL}/about/`,
            url: `${SITE_URL}/about/`,
            name: "About Spencer Buys Houses | Memphis Cash Home Buyers",
            description:
                "Learn about Spencer Buys Houses, a family-owned real estate solutions company based in Memphis, TN. We buy houses in any condition with cash, fast closings, and no fees.",
            isPartOf: { "@id": SITE_URL },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                    { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about/` },
                ],
            },
        },
        {
            "@type": "LocalBusiness",
            "@id": `${SITE_URL}/#organization`,
            name: "Spencer Buys Houses",
            alternateName: "Volunteer Buyers GP",
            url: SITE_URL,
            telephone: "+19016218799",
            description:
                "Spencer Buys Houses is a family-owned real estate solutions company based in Memphis, TN. We buy houses in any condition for cash with fast closings and no commissions.",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Memphis",
                addressRegion: "TN",
                addressCountry: "US",
            },
            areaServed: [
                "Memphis, TN",
                "Berclair, TN",
                "Raleigh, TN",
                "Frayser, TN",
                "Hickory Hill, TN",
                "Cordova, TN",
                "Whitehaven, TN",
            ],
            foundingDate: "2014",
            numberOfEmployees: { "@type": "QuantitativeValue", value: 5 },
        },
    ],
}

/* ─── Data ────────────────────────────────────────────────────────────────── */

const stats = [
    { value: "10+", label: "Years of Experience", icon: Award },
    { value: "500+", label: "Homes Purchased", icon: Home },
    { value: "7–10", label: "Days to Close", icon: Clock },
    { value: "$0", label: "Fees or Commissions", icon: DollarSign },
]

const whyUs = [
    {
        icon: Home,
        title: "Family-Owned & Local",
        description:
            "We're not a big corporation — we're your Memphis neighbors. Every deal is personal, and we treat every homeowner with respect and honesty.",
    },
    {
        icon: DollarSign,
        title: "Real Cash, Real Fast",
        description:
            "Our offers are backed by proof of funds. No financing contingencies, no delays, no fall-throughs — just a straightforward cash offer.",
    },
    {
        icon: Clock,
        title: "Fast & Flexible Closings",
        description:
            "Need to close in 7 days? Done. Need a few weeks? No problem. We work on your schedule so you can plan your next move stress-free.",
    },
    {
        icon: Handshake,
        title: "Zero Fees, Zero Hassle",
        description:
            "No agent commissions, no hidden fees, and we cover your closing costs. The offer you accept is the amount you walk away with.",
    },
    {
        icon: ShieldCheck,
        title: "Any Condition, Any Situation",
        description:
            "Fixer-upper, inherited property, foreclosure, divorce, relocating — we've seen it all and we're here to help, whatever your situation.",
    },
    {
        icon: MapPin,
        title: "Deep Memphis Roots",
        description:
            "From Whitehaven to Cordova, Frayser to Hickory Hill — we know Memphis inside and out and have purchased hundreds of homes across the metro.",
    },
]

type CompareValue = "yes" | "no" | "maybe"

const compareRows: {
    label: string
    spencer: CompareValue
    agent: CompareValue
    fsbo: CompareValue
}[] = [
        { label: "Competitive Cash Price", spencer: "yes", agent: "maybe", fsbo: "maybe" },
        { label: "Close in 7–10 Days", spencer: "yes", agent: "no", fsbo: "no" },
        { label: "No Commissions (6%+)", spencer: "yes", agent: "no", fsbo: "yes" },
        { label: "No Repairs Required", spencer: "yes", agent: "no", fsbo: "no" },
        { label: "We Pay Closing Costs", spencer: "yes", agent: "no", fsbo: "no" },
        { label: "No Financing Contingency", spencer: "yes", agent: "maybe", fsbo: "maybe" },
        { label: "No Open Houses / Showings", spencer: "yes", agent: "no", fsbo: "no" },
        { label: "Guaranteed Sale", spencer: "yes", agent: "no", fsbo: "no" },
    ]

/* ─── Sub-components ──────────────────────────────────────────────────────── */

function CompareCell({ value }: { value: CompareValue }) {
    if (value === "yes")
        return (
            <span className="flex justify-center">
                <Check className="h-5 w-5 text-[#22c55e]" aria-label="Yes" />
            </span>
        )
    if (value === "no")
        return (
            <span className="flex justify-center">
                <X className="h-5 w-5 text-red-500" aria-label="No" />
            </span>
        )
    return (
        <span className="flex justify-center">
            <Minus className="h-5 w-5 text-gray-500" aria-label="Maybe" />
        </span>
    )
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function AboutPage() {
    return (
        <main className="bg-[#0f0f23] min-h-screen pt-10 md:pt-12">
            <JsonLd data={jsonLd} />

            {/* ── Hero Banner ──────────────────────────────────────────────── */}
            <section
                className="relative bg-[#0a0a1a] border-b border-white/10 pt-32 pb-20 overflow-hidden"
                aria-labelledby="about-heading"
            >
                {/* Ambient glow */}
                <div
                    aria-hidden="true"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#f59e0b]/5 rounded-full blur-3xl pointer-events-none"
                />

                <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-6 uppercase tracking-wide">
                            <Users className="h-4 w-4" aria-hidden="true" />
                            Family-Owned Memphis Home Buyers
                        </span>

                        <h1
                            id="about-heading"
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
                        >
                            We Are{" "}
                            <span className="text-[#f59e0b]">Spencer Buys Houses</span>
                        </h1>

                        <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-10">
                            We are passionate about helping Memphis homeowners avoid the stress of selling their
                            houses the traditional way and beautifying TN one house at a time.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="/get-a-cash-offer-today/"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-[#0f0f23] font-bold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]"
                            >
                                Get Your Free Cash Offer
                                <ArrowRight className="h-5 w-5" aria-hidden="true" />
                            </a>
                            <a
                                href="tel:+19016218799"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/20 text-white hover:bg-white/5 font-semibold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                                aria-label="Call Spencer Buys Houses at 901-621-8799"
                            >
                                <Phone className="h-5 w-5" aria-hidden="true" />
                                (901) 621-8799
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Stats Bar ────────────────────────────────────────────────── */}
            <section className="bg-[#13132b] border-b border-white/10 py-12" aria-label="Company statistics">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map(({ value, label, icon: Icon }) => (
                            <div key={label} className="flex flex-col items-center text-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f59e0b]/10">
                                    <Icon className="h-6 w-6 text-[#f59e0b]" aria-hidden="true" />
                                </div>
                                <span className="text-3xl md:text-4xl font-black text-white">{value}</span>
                                <span className="text-sm text-gray-400 font-medium leading-tight">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── About Content ─────────────────────────────────────────────── */}
            <section className="py-20 lg:py-28" aria-labelledby="story-heading">
                <div className="mx-auto max-w-5xl px-4 lg:px-8">

                    {/* Our Story: image + text side by side */}
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center mb-16">

                        {/* Image */}
                        <div className="w-full lg:w-7/12 flex-shrink-0">
                            <Image
                                src="/spencer.jpeg"
                                alt="Spencer Buys Houses — Memphis local home buyer"
                                width={520}
                                height={600}
                                className="rounded-2xl w-full object-cover shadow-2xl"
                                priority
                            />
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-4 uppercase tracking-wide">
                                Our Story
                            </span>
                            <h2
                                id="story-heading"
                                className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
                            >
                                About Spencer Buys Houses
                            </h2>
                            <div className="space-y-4 text-gray-400 leading-relaxed text-sm md:text-base">
                                <p>
                                    For years, the only option for most Memphis house sellers has been to list
                                    their property on the market, try to sell it yourself, or hold on to it,
                                    hoping the problem will go away. Spencer Buys Houses saw the gap in the local
                                    market for all of the property owners who don&apos;t want to (or can&apos;t)
                                    sell through the traditional route with an agent.
                                </p>
                                <p>
                                    We provide win-win solutions to help homeowners get out of their sticky
                                    situations — including foreclosure, owning a burdensome property, probate,
                                    or anything else. Our focus is on providing you with a solution to your
                                    situation so you can continue to do the things you love.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* How We Work: single column centered */}
                    <div className="text-center mb-6">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-4 uppercase tracking-wide">
                            How We Work
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            How We Work With Homeowners
                        </h2>
                    </div>

                    <div className="space-y-4 text-gray-400 leading-relaxed text-sm md:text-base max-w-3xl mx-auto text-center">
                        <p>
                            We are a real estate solutions company based out of Memphis. We&apos;re a
                            family-owned business dedicated to helping homeowners like you find solutions
                            to any problem. Whether you&apos;re facing foreclosure, struggling to sell
                            your property, or need to sell your house quickly, Spencer Buys Houses can help.
                        </p>
                        <p>
                            At SpencerBuysHouses.com, we make selling your home fast, simple, and stress-free.
                            Whether it&apos;s a fixer-upper, inherited property, vacant rental, or you&apos;re
                            just ready to move on — Spencer is the local buyer you can trust. With over 10 years
                            of experience and hundreds of homes purchased in Memphis and the surrounding areas,
                            Spencer offers real solutions backed by real cash.
                        </p>
                        <p>
                            We buy houses in any condition and on your timeline — no agents, no commissions, no
                            repairs, and no drama. Just a straightforward offer and a smooth closing, often in
                            as little as 7–10 days. Our team handles everything from start to finish, and
                            we&apos;ll even pay all your closing costs.
                        </p>
                        <p>
                            You&apos;ve probably seen us on TV, billboards, or heard about us from a neighbor.
                            That&apos;s because when Memphis needs to sell a house fast, Spencer Buys Houses is
                            the name they trust.
                        </p>
                    </div>

                    {/* Trust badges */}
                    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                        {[
                            "No agent commissions",
                            "We pay closing costs",
                            "Any condition accepted",
                            "Close in 7–10 days",
                            "No repairs needed",
                            "Guaranteed cash offer",
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-2 text-sm text-gray-300 justify-center"
                            >
                                <Check className="h-4 w-4 text-[#f59e0b] flex-shrink-0" aria-hidden="true" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Testimonial Quote ─────────────────────────────────────────── */}
            <section className="bg-[#13132b] border-y border-white/10 py-16" aria-label="Our mission">
                <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
                    <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className="h-6 w-6 text-[#f59e0b] fill-[#f59e0b]"
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                    <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-6">
                        &ldquo;If you have any questions about our process for helping you sell a house
                        quickly and for a fair cash amount or if you want to learn more about us, don&apos;t
                        hesitate to contact us anytime!
                    </blockquote>
                    <p className="text-[#f59e0b] font-semibold">Call Spencer Buys Houses Today At 901-621-8799</p>
                    <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-sm">
                        <TrendingUp className="h-4 w-4 text-[#f59e0b]" aria-hidden="true" />
                        Trusted by hundreds of Memphis homeowners
                    </div>
                </div>
            </section>

            {/* ── Free Guide CTA ────────────────────────────────────────────── */}
            <section className="py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-4 uppercase tracking-wide">
                        Free Guide
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                        The Pros &amp; Cons Of Selling Your House To A Local Professional Home Buyer
                    </h2>
                    <div className="space-y-4 text-gray-400 leading-relaxed text-sm md:text-base mb-8">
                        <p>
                            Download our FREE Guide and contact us anytime with any questions,
                            for a no-hassle Situation Evaluation, or if you would like to learn more
                            about how we help Memphis homeowners sell their unwanted properties for cash.
                        </p>
                        <p>
                            Get your FREE Guide and then give us a call at{" "}
                            <a
                                href="tel:+19016218799"
                                className="text-[#f59e0b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded"
                                aria-label="Call Spencer Buys Houses at 901-621-8799"
                            >
                                901-621-8799
                            </a>
                            . We would love to discuss what your home is worth and what we can offer
                            with our Cash Offer Program.
                        </p>
                    </div>
                    <a
                        href="/get-a-cash-offer-today/"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-[#0f0f23] font-bold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]"
                    >
                        Get My Free Cash Offer
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </a>
                </div>
            </section>

            {/* ── CTA Banner ───────────────────────────────────────────────── */}
            <CallNowBanner
                badge="GET YOUR CASH OFFER TODAY"
                heading="Ready to Sell Your Memphis House Fast?"
                description="No agents. No repairs. No commissions. Close in as little as 7–10 days. Call Spencer Buys Houses at (901) 621-8799 — we're here to help."
                primaryLabel="(901) 621-8799"
                secondaryLabel="Get My Free Cash Offer"
                secondaryHref="/get-a-cash-offer-today/"
                headingId="about-cta-heading"
            />
        </main>
    )
}
