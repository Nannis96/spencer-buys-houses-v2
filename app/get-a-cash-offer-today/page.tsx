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
            about: { "@id": "https://www.spencerbuyshouses.com/#business" },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.spencerbuyshouses.com/" },
                    { "@type": "ListItem", position: 2, name: "Get A Cash Offer Today", item: "https://www.spencerbuyshouses.com/get-a-cash-offer-today/" },
                ],
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

