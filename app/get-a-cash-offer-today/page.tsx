import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { CashOfferContent } from "./cash-offer-content"

/* ─── SEO Metadata ──────────────────────────────────────────────────────── */

export const metadata: Metadata = {
    title: "Get A Cash Offer Today Without An Agent",
    description:
        "Sell your Memphis house without an agent and skip the hassle of listing. Spencer Buys Houses is a direct cash house buyer in Memphis, TN that buys houses in any condition, as-is. Get your free cash offer today!",
    alternates: {
        canonical: "/get-a-cash-offer-today/",
    },
    openGraph: {
        title: "Get A Cash Offer Today Without An Agent | Spencer Buys Houses",
        description:
            "Sell your house without an agent. We buy houses in Memphis, TN in any condition. No fees, no commissions, fast closing. Get your free cash offer today!",
        url: "https://www.spencerbuyshouses.com/get-a-cash-offer-today/",
        type: "website",
    },
}

/* ─── JSON-LD Structured Data ───────────────────────────────────────────── */

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": "https://www.spencerbuyshouses.com/get-a-cash-offer-today/",
            url: "https://www.spencerbuyshouses.com/get-a-cash-offer-today/",
            name: "Get A Cash Offer Today Without An Agent | Spencer Buys Houses",
            description:
                "Sell your Memphis house without an agent. Direct cash buyer in Memphis, TN. No fees, no commissions, fast closing. Get your free offer today!",
            inLanguage: "en-US",
            isPartOf: { "@id": "https://www.spencerbuyshouses.com/" },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.spencerbuyshouses.com/" },
                    { "@type": "ListItem", position: 2, name: "Get A Cash Offer Today", item: "https://www.spencerbuyshouses.com/get-a-cash-offer-today/" },
                ],
            },
        },
        {
            "@type": "LocalBusiness",
            "@id": "https://www.spencerbuyshouses.com/#business",
            name: "Spencer Buys Houses",
            url: "https://www.spencerbuyshouses.com",
            telephone: "+19016218799",
            description:
                "Direct cash home buyer in Memphis, TN. We buy houses in any condition — no fees, no commissions, fast closings.",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Memphis",
                addressRegion: "TN",
                addressCountry: "US",
            },
            areaServed: ["Memphis, TN", "Berclair, TN", "Raleigh, TN", "Frayser, TN", "Hickory Hill, TN", "Cordova, TN", "Whitehaven, TN"],
            review: [
                {
                    "@type": "Review",
                    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                    author: { "@type": "Person", name: "Zac Brown" },
                    reviewBody:
                        "Awesome group to deal with! Can't say enough about the patience and dedication this team has. Thank you all for helping with all that you did!",
                },
                {
                    "@type": "Review",
                    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                    author: { "@type": "Person", name: "John Medina" },
                    reviewBody:
                        "Spencer personally came and looked at my house. He arrived on time looked over the property and agreed to my asking price on the spot. He had no problem with the date I ask for closing. He never wavered on his offer and closing went through without a hitch.",
                },
            ],
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

export default function GetCashOfferPage() {
    return (
        <>
            {/* JSON-LD structured data — server-rendered, no JS cost */}
            <JsonLd data={jsonLd} />
            <main>
                <CashOfferContent />
            </main>
        </>
    )
}

