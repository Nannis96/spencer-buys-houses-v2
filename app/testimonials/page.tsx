import React from "react";
import type { Metadata } from "next"
import { testimonials } from "../../components/data/testimonials";
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { CallButton } from "@/components/ui/call-button"
import { Award, Home, Clock, DollarSign, } from "lucide-react"
import { LeadFormConsent } from "@/components/forms/lead-form-consent"
import { JsonLd } from "@/components/seo/json-ld"

/* ─── Metadata ───────────────────────────────────────────────────────────── */

const SITE_URL = "https://www.spencerbuyshouses.com"
const OG_IMAGE = "https://www.spencerbuyshouses.com/Home-Page-Design1-2.webp"

export const metadata: Metadata = {
    title: "Reviews & Testimonials | Cash Home Buyers Memphis TN | Spencer Buys Houses",
    description:
        "Read real reviews from Memphis homeowners who sold their house fast for cash with Spencer Buys Houses. 500+ homes bought, 5-star rated, no fees, no repairs.",
    alternates: {
        canonical: "/testimonials/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: `${SITE_URL}/testimonials/`,
        siteName: "SpencerBuysHouses.com",
        title: "Reviews & Testimonials | Cash Home Buyers Memphis TN | Spencer Buys Houses",
        description:
            "Read real reviews from Memphis homeowners who sold their house fast for cash with Spencer Buys Houses. 500+ homes bought, 5-star rated, no fees, no repairs.",
        images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Reviews & Testimonials | Cash Home Buyers Memphis TN | Spencer Buys Houses",
        description:
            "Read real reviews from Memphis homeowners who sold their house fast for cash with Spencer Buys Houses. 500+ homes bought, 5-star rated, no fees, no repairs.",
        images: [OG_IMAGE],
    },
}

/* ─── JSON-LD ─────────────────────────────────────────────────────────────── */

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${SITE_URL}/testimonials/`,
            url: `${SITE_URL}/testimonials/`,
            name: "Reviews & Testimonials | Cash Home Buyers Memphis TN | Spencer Buys Houses",
            description:
                "Read real reviews from Memphis homeowners who sold their house fast for cash with Spencer Buys Houses. 500+ homes bought, 5-star rated, no fees, no repairs.",
            isPartOf: { "@id": SITE_URL },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                    { "@type": "ListItem", position: 2, name: "Testimonials", item: `${SITE_URL}/testimonials/` },
                ],
            },
        },
        {
            "@type": "LocalBusiness",
            "@id": `${SITE_URL}/#business`,
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
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                bestRating: "5",
                worstRating: "1",
                reviewCount: String(testimonials.length),
            },
            review: testimonials.map((t) => ({
                "@type": "Review",
                author: { "@type": "Person", name: t.name },
                reviewBody: t.text,
                reviewRating: {
                    "@type": "Rating",
                    ratingValue: String(t.rating),
                    bestRating: "5",
                    worstRating: "1",
                },
                ...(t.location ? { locationCreated: { "@type": "Place", name: t.location } } : {}),
            })),
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

export default function TestimonialsPage() {
    const items = testimonials.slice(0, 6);

    return (
        <main className="bg-background min-h-screen">
            <JsonLd data={jsonLd} />

            {/* ───────── 1. HERO + FORM ───────── */}
            <section
                className="relative bg-[var(--color-background)] pt-28 md:pt-44 pb-16 lg:pb-24 overflow-hidden"
                aria-labelledby="hero-heading"
            >
                {/* Ambient glow — decorative */}
                <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#f59e0b]/5 rounded-full blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
                        {/* Left copy */}
                        <div>
                            <p className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-6 uppercase tracking-wide">
                                What Our Clients Say
                            </p>

                            <h1 id="hero-heading" className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white">
                                Spencer Buys Houses{" "}
                                <span className="text-[var(--color-text-yellow)]">Reviews</span>
                            </h1>

                            <p className="mt-6 text-lg md:text-xl text-gray-300 font-medium">
                                Almost everyone knows several local real estate agents but selling your Memphis TN house to a direct cash buyer like Spencer Buys Houses may be a new concept for most. See how we’ve helped other local property owners sell with confidence, for a fair price, on your own schedule without traditional real estate hassles and fees.
                            </p>

                            <p className="mt-4 text-gray-400 leading-relaxed max-w-xl">
                                {"Want to share your own experience with us? Send us a note to let us know what working with Spencer Buys Houses has been like for you."}
                            </p>

                            <CallButton />

                            {/* Mobile form */}
                            <div className="lg:hidden mt-10">
                                <LeadFormConsent />
                            </div>
                        </div>

                        {/* Right form – desktop */}
                        <div className="hidden lg:block">
                            <LeadFormConsent />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Stats Bar ────────────────────────────────────────────────── */}
            <section className="bg-[var(--color-background)] py-12" aria-label="Company statistics">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map(({ value, label, icon: Icon }) => (
                            <div key={label} className="flex flex-col items-center text-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-dark)]/10">
                                    <Icon className="h-6 w-6 text-[var(--color-primary)]" aria-hidden="true" />
                                </div>
                                <span className="text-3xl md:text-4xl font-black text-white">{value}</span>
                                <span className="text-sm text-gray-400 font-medium leading-tight">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Testimonials — Memphis homeowners */}
            <TestimonialsSection count={6} />
        </main>
    );
}
