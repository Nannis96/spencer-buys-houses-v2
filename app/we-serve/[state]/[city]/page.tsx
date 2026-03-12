import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CallButton } from "@/components/ui/call-button"
import { CallNowBanner } from "@/components/sections/call-now-banner"
import { LeadFormConsent } from "@/components/forms/lead-form-consent"
import { findCity } from "@/lib/cities"
import { getAllCitySlugs, CityFaq, CitySituation } from "@/lib/cities"
import { AnimatedBenefitCards } from "@/app/get-a-cash-offer-today/animated-cards"

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
            <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
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
                <section className="relative bg-[var(--color-background)] pt-28 md:pt-44 pb-12 lg:pb-20 overflow-hidden">
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

                                <div className="flex flex-row items-center gap-4 mb-8">
                                    <CallButton />
                                </div>
                            </div>

                            <div className="hidden lg:block">
                                <LeadFormConsent />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ───────── 2. BENEFITS ───────── */}
                <section
                    id="benefits"
                    className="bg-[var(--color-background)] py-10 lg:py-14"
                    aria-labelledby="benefits-heading"
                >
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">
                        <div className="text-center mb-16">
                            <p className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-4 uppercase tracking-wide">
                                Why Choose Us
                            </p>
                            <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
                                {"Here's What "}
                                <span className="text-[var(--color-text-yellow)]">Spencer Buys Houses</span>
                                {" Can Do For You…"}
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Skip the traditional hassle of listing with an agent. Get a fair cash offer and sell your house fast.
                            </p>
                        </div>

                        {/* Animated cards — client leaf (data lives inside the client boundary) */}
                        <AnimatedBenefitCards />
                    </div>
                </section>

                <section className="bg-[var(--color-background)] py-10 lg:py-14" aria-labelledby="benefits-heading">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Left column — benefits & FAQs */}
                            <div>
                                <h2 id="benefits-heading" className="text-white text-2xl font-bold mb-4">Why work with Spencer Buys Houses in {" "}
                                    <span className="text-[var(--color-text-yellow)]">{city.name}?</span>
                                </h2>
                                <ul className="list-disc list-inside text-gray-300 space-y-2">
                                    {benefits.map((b: string) => (
                                        <li key={b}>{b}</li>
                                    ))}
                                </ul>

                                <div className="mt-8">
                                    <h3 className="text-white text-xl font-semibold mb-3">Frequently {" "}
                                        <span className="text-[var(--color-text-yellow)]"> Asked Questions</span>
                                    </h3>
                                    <div className="space-y-4">
                                        {faqs.map((f) => (
                                            <details key={f.q} className="bg-white/5 p-4 border border-[var(--color-primary)]/60 rounded-md">
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
                                    src={city.benefitsImage ?? "/houses/Houses_21.png"}
                                    alt={`We buy houses in ${city.name}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA Banner ───────────────────────────────────────────────── */}
                <CallNowBanner
                    badge="GET YOUR CASH OFFER TODAY"
                    heading={`Ready to Sell Your ${city.name} House Fast?`}
                    description={`No agents. No repairs. No commissions. Close in as little as 7–10 days. Call Spencer Buys Houses at (901) 621-8799 — we're here to help.`}
                    primaryLabel="(901) 621-8799"
                    secondaryLabel="Get My Free Cash Offer"
                    secondaryHref="#top"
                    headingId="about-cta-heading"
                />
            </main>
        </>
    )
}
