import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
    Clock, Ban, Wrench, DollarSign, ShieldCheck, Handshake,
    Home, Users, AlertTriangle, FileText,
    Phone, Star, CheckCircle2, ArrowRight,
} from "lucide-react"
import { LeadFormConsent } from "@/components/forms/lead-form-consent"
import { findCity } from "@/lib/cities"

import { ProcessSection } from "@/components/sections/process-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getAllCitySlugs, CityFaq, CitySituation } from "@/lib/cities"
import { section } from "framer-motion/m"

const DEFAULT_BENEFITS: string[] = [
    "Same-day cash offers — no waiting weeks for a response.",
    "Close in as little as 7 days — or on your own schedule.",
    "No fees, no commissions — keep 100% of the proceeds.",
    "Sell as-is — no repairs, cleaning, or staging required.",
]

const DEFAULT_SITUATIONS: CitySituation[] = [
    { title: "Damaged or distressed home", description: "We buy homes in any condition — fire, flood, mold, or storm damage." },
    { title: "Problem tenants", description: "We take properties with difficult tenants or squatters off your hands." },
    { title: "Facing foreclosure", description: "A quick cash sale can stop foreclosure in its tracks." },
]

const DEFAULT_FAQS: CityFaq[] = [
    { q: "Will I have to move out immediately after the sale?", a: "Not necessarily. We are flexible — you choose a move-out date that works for you." },
    { q: "Can you help if I'm behind on taxes or mortgage payments?", a: "Yes — we work with many homeowners in difficult financial situations." },
]

export function generateStaticParams() {
    return getAllCitySlugs()
}

type Props = { params: Promise<{ state: string; city: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { state: stateSlug, city: citySlug } = await params
    const found = findCity(stateSlug, citySlug)
    if (!found) return { title: "Not found" }
    const { state, city } = found
    const url = `https://www.spencerbuyshouses.com/we-serve/${stateSlug}/${citySlug}/`
    return {
        title: city.seoTitle,
        description: city.seoDescription,
        alternates: { canonical: url },
        openGraph: { title: city.seoTitle, description: city.seoDescription, url, siteName: "Spencer Buys Houses", type: "website" },
        twitter: { card: "summary_large_image", title: city.seoTitle, description: city.seoDescription },
    }
}

export default async function CityPage({ params }: Props) {
    const { state: stateSlug, city: citySlug } = await params
    const found = findCity(stateSlug, citySlug)
    if (!found) {
        return (
            <main className="min-h-screen bg-[#0f0f23] flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">City not found</h1>
                    <Link href="/" className="text-[#f59e0b] underline">Go home</Link>
                </div>
            </main>
        )
    }
    const { state, city } = found
    const benefits = city.benefits ?? DEFAULT_BENEFITS
    const situations = city.situations ?? DEFAULT_SITUATIONS
    const faqs = city.faqs ?? DEFAULT_FAQS

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Spencer Buys Houses",
        url: `https://www.spencerbuyshouses.com/we-serve/${stateSlug}/${citySlug}/`,
        telephone: "+19016218799",
        address: { "@type": "PostalAddress", addressLocality: city.name, addressRegion: state.state, addressCountry: "US" },
        description: city.seoDescription,
        areaServed: { "@type": "City", name: city.name },
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <main id="top">
                <section className="relative bg-[#0f0f23] pt-28 md:pt-44 pb-12 lg:pb-20 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[520px] bg-[#f59e0b]/5 rounded-full blur-3xl" />
                    <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <div>
                                <h1 className="block text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white">
                                    {city.heroTitle}
                                </h1>

                                {city.heroSubtitle && (
                                    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">{city.heroSubtitle}</p>
                                )}

                                {city.intro && (
                                    <p className="mt-6 text-gray-300 max-w-3xl">{city.intro}</p>
                                )}

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <a href="tel:+19016218799" className="inline-block rounded-md bg-[#f59e0b] px-5 py-3 font-bold text-black">Call Now (901) 621-8799</a>
                                    <Link href="/get-a-cash-offer-today/" className="inline-block rounded-md border border-white/10 px-5 py-3 text-white">Get a Cash Offer</Link>
                                </div>
                            </div>

                            <div className="hidden lg:block">
                                <LeadFormConsent />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-[#13132b] py-20 lg:py-28" aria-labelledby="benefits-heading">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Left column — benefits & FAQs */}
                            <div>
                                <h2 id="benefits-heading" className="text-2xl font-bold mb-4">Why work with Spencer Buys Houses in {city.name}?</h2>
                                <ul className="list-disc list-inside text-gray-300 space-y-2">
                                    {benefits.map((b: string) => (
                                        <li key={b}>{b}</li>
                                    ))}
                                </ul>

                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold mb-3">Frequently Asked Questions</h3>
                                    <div className="space-y-4">
                                        {faqs.map((f) => (
                                            <details key={f.q} className="bg-white/5 p-4 rounded-md">
                                                <summary className="font-medium text-white cursor-pointer">{f.q}</summary>
                                                <div className="mt-2 text-gray-300">{f.a}</div>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right column — city image with fallback */}
                            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src={city.benefitsImage ?? "/var-a-exterior.jpg"}
                                    alt={`We buy houses in ${city.name}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
