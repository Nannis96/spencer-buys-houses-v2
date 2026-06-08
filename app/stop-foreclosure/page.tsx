import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { StopForeclosureContent } from "./stop-foreclosure-content"

export const metadata: Metadata = {
    title: "Stop Foreclosure in TN | Spencer Buys Houses",
    description:
        "Know your options and avoid foreclosure. Contact Spencer Buys Houses or download a free guide to get immediate help and guidance.",
    alternates: {
        canonical: "/stop-foreclosure/",
    },
    openGraph: {
        title: "Stop Foreclosure in TN | Spencer Buys Houses",
        description:
            "Know your options and avoid foreclosure. Contact Spencer Buys Houses or download a free guide to get immediate help and guidance.",
        url: "https://www.spencerbuyshouses.com/stop-foreclosure/",
        type: "website",
    },
}

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": "https://www.spencerbuyshouses.com/stop-foreclosure/",
            url: "https://www.spencerbuyshouses.com/stop-foreclosure/",
            name: "Stop Foreclosure in TN | Spencer Buys Houses",
            description:
                "Know your options and avoid foreclosure. Contact Spencer Buys Houses or download a free guide to get immediate help and guidance.",
            inLanguage: "en-US",
            isPartOf: { "@id": "https://www.spencerbuyshouses.com/" },
            about: { "@id": "https://www.spencerbuyshouses.com/#business" },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.spencerbuyshouses.com/" },
                    { "@type": "ListItem", position: 2, name: "Stop Foreclosure", item: "https://www.spencerbuyshouses.com/stop-foreclosure/" },
                ],
            },
        },
    ],
}

export default function StopForeclosurePage() {
    return (
        <>
            <JsonLd data={jsonLd} />
            <main>
                <StopForeclosureContent />
            </main>
        </>
    )
}
