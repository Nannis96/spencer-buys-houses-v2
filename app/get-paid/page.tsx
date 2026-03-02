import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { ReferralContent } from "./referral-content"

/* ─── SEO Metadata ──────────────────────────────────────────────────────── */

export const metadata: Metadata = {
    title: "Get Paid for Referring | Spencer Buys Houses Referral Program",
    description:
        "Know someone looking to sell their home fast in Memphis? Refer them to Spencer Buys Houses and earn cash for every successful referral. It's simple, fast, and free!",
    alternates: {
        canonical: "/get-paid/",
    },
    openGraph: {
        title: "Get Paid for Referring | Spencer Buys Houses Referral Program",
        description:
            "Refer a friend who wants to sell their Memphis home fast and earn cash when we close the deal. No fees. No hassle. Just cash in your pocket.",
        url: "https://www.spencerbuyshouses.com/get-paid/",
        type: "website",
    },
}

/* ─── JSON-LD Structured Data ───────────────────────────────────────────── */

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": "https://www.spencerbuyshouses.com/get-paid/",
            url: "https://www.spencerbuyshouses.com/get-paid/",
            name: "Get Paid for Referring | Spencer Buys Houses Referral Program",
            description:
                "Earn cash by referring friends and family to Spencer Buys Houses. We buy Memphis homes fast, and we pay you when we close the deal.",
            inLanguage: "en-US",
            isPartOf: { "@id": "https://www.spencerbuyshouses.com/" },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.spencerbuyshouses.com/" },
                    { "@type": "ListItem", position: 2, name: "Get Paid for Referring", item: "https://www.spencerbuyshouses.com/get-paid/" },
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
        },
    ],
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function GetPaidPage() {
    return (
        <>
            <JsonLd data={jsonLd} />
            <ReferralContent />
        </>
    )
}
