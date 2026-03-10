import { Suspense } from "react"
import type { Metadata } from "next"
import { PropertyDetailsForm } from "./property-details-form"
import { PropertyInfoForm } from "@/app/property-info/property-info-form"
import PropertyProgress from "@/components/progress/PropertyProgress"
import { JsonLd } from "@/components/seo/json-ld"
import { Loader2 } from "lucide-react"

/* ─── Constants ─────────────────────────────────────────────────────────── */

const SITE_URL = "https://www.spencerbuyshouses.com"
const OG_IMAGE =
    "https://image-cdn.carrot.com/uploads/sites/81361/2025/03/Home-Page-Design1-2.png"
const LOGO_IMAGE =
    "https://image-cdn.carrot.com/uploads/sites/81361/2025/08/cropped-Say-Less-Facebook-Cover-Facebook-Cover-07-23-2025_11_40_AM.png"
const SAME_AS = [
    "https://www.facebook.com/spencerbuyshouses",
    "https://www.instagram.com/spen.cershadrach",
    "https://www.linkedin.com/in/spencer-shadrach-0a379b4a",
    "https://mx.pinterest.com/spencerbuyshouses",
    "https://www.youtube.com/@spencerbuyshouses",
]

/* ─── SEO Metadata ──────────────────────────────────────────────────────── */

export const metadata: Metadata = {
    title: "Property Location Details | Spencer Buys Houses",
    description:
        "Step 2 of 3 — Enter your property's city, state, and ZIP code so Spencer Buys Houses can prepare your free, no-obligation cash offer in Memphis, TN.",
    // Mid-funnel form steps should never appear in search results
    robots: { index: false, follow: false },
    // Canonical points to the funnel entry page — avoids duplicate-content signals
    alternates: {
        canonical: "/get-a-cash-offer-today/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: `${SITE_URL}/property-details/`,
        siteName: "SpencerBuysHouses.com",
        title: "Get Your Free Cash Offer — Property Location | Spencer Buys Houses",
        description:
            "We buy houses in Memphis, TN in any condition — no fees, no commissions, fast closing. Complete your free cash offer request now.",
        images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Spencer Buys Houses — Sell Your Memphis Home Fast" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Get Your Free Cash Offer — Property Location | Spencer Buys Houses",
        description:
            "We buy houses in Memphis, TN in any condition — no fees, no commissions, fast closing. Complete your free cash offer request now.",
        images: [OG_IMAGE],
    },
}

/* ─── JSON-LD Structured Data ───────────────────────────────────────────── */

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${SITE_URL}/property-details/`,
            url: `${SITE_URL}/property-details/`,
            name: "Property Location Details | Spencer Buys Houses",
            description:
                "Step 2 of the free cash offer request form for Spencer Buys Houses — Memphis, TN cash home buyers. Enter your city, state, and ZIP code to receive your personalized cash offer.",
            inLanguage: "en-US",
            isPartOf: { "@id": SITE_URL },
            about: {
                "@type": "Thing",
                name: "Sell Your Memphis House Fast for Cash",
            },
            primaryImageOfPage: {
                "@type": "ImageObject",
                url: OG_IMAGE,
                width: 1200,
                height: 630,
            },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "Get A Cash Offer Today",
                        item: `${SITE_URL}/get-a-cash-offer-today/`,
                    },
                    {
                        "@type": "ListItem",
                        position: 3,
                        name: "Property Location",
                        item: `${SITE_URL}/property-details/`,
                    },
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
                "Direct cash home buyer in Memphis, TN. We buy houses in any condition — no fees, no commissions, fast closings.",
            logo: {
                "@type": "ImageObject",
                url: LOGO_IMAGE,
            },
            image: OG_IMAGE,
            sameAs: SAME_AS,
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+19016218799",
                contactType: "customer service",
                areaServed: "US",
                availableLanguage: "English",
            },
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
                reviewCount: "2",
                bestRating: "5",
            },
        },
    ],
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function PropertyDetailsPage() {
    return (
        <>
            <JsonLd data={jsonLd} />
            <main className="min-h-screen bg-[var(--color-background)] flex flex-col items-center justify-center px-4 py-20">
                {/* ── Page heading (SEO H1 — visually subtle, semantically required) ── */}
                <div className="w-full max-w-lg mb-6 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                        Get Your Free Cash Offer —{" "}
                        <span className="text-[#f59e0b]">Memphis, TN</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                        We buy houses in Memphis in any condition &mdash; no fees, no commissions, and no repairs needed.
                        Just enter your property&apos;s location below and we&apos;ll prepare your personalized cash offer
                        in as little as 24 hours.
                    </p>
                </div>

                {/* Progress indicator — Suspense required for useSearchParams */}
                <Suspense fallback={<div className="w-full max-w-lg mb-8 h-7" aria-hidden="true" />}>
                    <PropertyProgress activeStep={3} />
                </Suspense>

                {/* Form with Suspense boundary (required for useSearchParams) */}
                <Suspense
                    fallback={
                        <div className="rounded-2xl bg-[var(--color-background)] p-10 border border-[var(--color-primary)]/60 flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-[#f59e0b]" />
                        </div>
                    }
                >
                    <PropertyDetailsForm />
                </Suspense>
            </main>
        </>
    )
}
