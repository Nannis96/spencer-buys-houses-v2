import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { JsonLd } from "@/components/seo/json-ld"
import { CallButton } from "@/components/ui/call-button"
import { LeadFormConsent } from "@/components/forms/lead-form-consent"
import { findCity } from "@/lib/cities"
import { getAllCitySlugs, CityFaq, CitySituation } from "@/lib/cities"
import { buildBreadcrumbList, SITE_URL } from "@/lib/schema"
import { Banknote, Wrench, CircleOff, Calendar, HeartHandshake, ShieldCheck } from "lucide-react";


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
            <main className="min-h-screen bg-[var(--color-background)] bg-no-repeat bg-center bg-cover flex items-center justify-center">
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
        "@id": "https://www.spencerbuyshouses.com/#business",
        name: "Spencer Buys Houses",
        url: "https://www.spencerbuyshouses.com",
        telephone: "+19016218799",
        address: { "@type": "PostalAddress", addressLocality: city.name, addressRegion: state.state, addressCountry: "US" },
        description: city.seoDescription,
        areaServed: { "@type": "City", name: city.name },
    }

    return (
        <>
            {/* JSON-LD structured data — server-rendered, no JS cost */}
            <JsonLd data={jsonLd} />
            {/* BreadcrumbList — separate script, never in the global layout */}
            <JsonLd data={buildBreadcrumbList([
                { name: "Home", item: `${SITE_URL}/` },
                { name: `${city.name}, ${state.state}`, item: `${SITE_URL}/we-serve/${stateSlug}/${citySlug}/` },
            ])} />
            <main id="top">
                <section className="relative -mt-[var(--app-header-height)] pt-[calc(var(--app-header-height)+7rem)] md:pt-[calc(var(--app-header-height)+11rem)] pb-12 lg:pb-20 overflow-hidden">
                    <Image
                        src={city.heroImage ?? "/background-we-serve.webp"}
                        alt={city.heroTitle}
                        fill
                        priority
                        quality={85}
                        sizes="100vw"
                        className="object-cover object-[75%_30%] md:object-[60%_30%] lg:object-[50%_25%]"
                    />
                    <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[520px] bg-[#f59e0b]/5 rounded-full blur-3xl" />
                    <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <div className="relative z-10">
                                <div className="p-0 md:p-0 text-[var(--color-text-black)] dark:text-white">
                                    <h1 className="block text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                                        {city.heroTitle}
                                    </h1>
                                </div>

                                {(city.heroSubtitle || city.intro) && (
                                    <div className="mt-6 p-0 md:p-0 text-[var(--color-text-black)] dark:text-white">
                                        {city.heroSubtitle && (
                                            <p className="mx-auto max-w-2xl text-lg">{city.heroSubtitle}</p>
                                        )}

                                        {city.intro && (
                                            <p className="mt-4 max-w-3xl">{city.intro}</p>
                                        )}
                                    </div>
                                )}

                                <div className="flex flex-row items-center gap-4 mb-8 mt-4">
                                    <CallButton />
                                </div>
                            </div>

                            <div className="block">
                                <LeadFormConsent />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── WHY US ──────────────────────────────────────────────── */}
                <section className="bg-[var(--color-background-white)] py-20 lg:py-22 w-full">
                    <div className="mx-auto max-w-[1800px] px-4 lg:px-16 w-full">

                        {/* Header */}
                        <div className="max-w-2xl mb-14 text-left">
                            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)] font-semibold mb-4">
                                Why Choose Us
                            </p>

                            <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-black)] leading-tight">
                                Here's what Spencer Buys Houses can do for you
                            </h2>
                        </div>

                        {/* Benefits */}
                        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">

                            {[
                                {
                                    icon: <Banknote className="h-8 w-8 text-[var(--color-secondary)]" />,
                                    title: "Cash in Days",
                                    desc: "Get cash in your hands within a few days of contacting us. We close fast on your timeline.",
                                },
                                {
                                    icon: <Wrench className="h-8 w-8 text-[var(--color-secondary)]" />,
                                    title: "Any Condition",
                                    desc: "Fire damage, water damage, inherited home, or major repairs needed — we buy as-is, no questions.",
                                },
                                {
                                    icon: <CircleOff className="h-8 w-8 text-[var(--color-secondary)]" />,
                                    title: "Zero Fees",
                                    desc: "No commissions, no closing costs, no hidden fees. The offer we give is the amount you walk away with.",
                                },
                                {
                                    icon: <Calendar className="h-8 w-8 text-[var(--color-secondary)]" />,
                                    title: "Your Timeline",
                                    desc: "Need to close in 7 days or 60 days? You pick the date. We work around your schedule, not ours.",
                                },
                                {
                                    icon: <HeartHandshake className="h-8 w-8 text-[var(--color-secondary)]" />,
                                    title: "Local & Family-Owned",
                                    desc: `We know the ${city.name} and Memphis market deeply. Genuine, personalized support every step of the way.`,
                                },
                                {
                                    icon: <ShieldCheck className="h-8 w-8 text-[var(--color-secondary)]" />,
                                    title: "Transparent Process",
                                    desc: "Clear contracts, honest pricing based on real market value. No surprises, no pressure, no games.",
                                },
                            ].map(({ icon, title, desc }) => (
                                <div key={title} className="bg-white border border-gray-200 p-6 flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:border-[var(--color-secondary)]">
                                    <div className="w-12 h-12 flex items-center justify-center bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                                        {icon}
                                    </div>

                                    <h3 className="text-lg font-bold text-[var(--color-text-black)]">
                                        {title}
                                    </h3>

                                    <p className="text-sm leading-7 text-gray-600">
                                        {desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── HOW IT WORKS ────────────────────────────────────────── */}
                <section className="bg-[var(--color-background)] py-20 lg:py-28 w-full">
                    <div className="mx-auto max-w-[1800px] px-4 lg:px-16 w-full">

                        {/* Header */}
                        <div className="max-w-2xl mb-20">
                            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)] font-semibold mb-4">
                                Simple Process
                            </p>

                            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                                Three steps to cash in your hands
                            </h2>
                        </div>

                        <div className="hidden md:block relative">
                            {/* Connecting line — left/right = center of first/last column in a 3-col grid (100% / 6) */}
                            <div className="absolute top-6 left-[calc(100%/6)] right-[calc(100%/6)] h-px bg-white/20" />

                            <div className="grid grid-cols-3 relative z-10">
                                {[
                                    {
                                        num: "01",
                                        title: "Contact us",
                                        desc: `Fill out the form or call (901) 621-8799. Tell us about your ${city.name} property.`,
                                    },
                                    {
                                        num: "02",
                                        title: "Get your offer",
                                        desc: "We review your home and send a fair, no-obligation cash offer within 24 hours.",
                                    },
                                    {
                                        num: "03",
                                        title: "Close & get paid",
                                        desc: "Pick your closing date. We handle all the paperwork. Cash in your account.",
                                    },
                                ].map(({ num, title, desc }) => (
                                    <div key={num} className="flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full border border-[var(--color-primary)] bg-[var(--color-background)] flex items-center justify-center text-[var(--color-primary)] font-bold text-lg">
                                            {num}
                                        </div>

                                        <div className="mt-8 max-w-xs text-center">
                                            <h3 className="text-xl font-semibold text-white">
                                                {title}
                                            </h3>

                                            <p className="mt-4 text-sm leading-7 text-gray-400">
                                                {desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Version */}
                        <div className="md:hidden space-y-8">

                            {[
                                {
                                    num: "01",
                                    title: "Contact us",
                                    desc: `Fill out the form or call (901) 621-8799. Tell us about your ${city.name} property.`,
                                },
                                {
                                    num: "02",
                                    title: "Get your offer",
                                    desc: "We review your home and send a fair, no-obligation cash offer within 24 hours.",
                                },
                                {
                                    num: "03",
                                    title: "Close & get paid",
                                    desc: "Pick your closing date. We handle all the paperwork. Cash in your account.",
                                },
                            ].map(({ num, title, desc }) => (
                                <div
                                    key={num}
                                    className="flex gap-4 border border-white/10 p-5 rounded-lg"
                                >
                                    <div
                                        className="
                            w-12
                            h-12
                            rounded-full
                            border
                            border-[var(--color-primary)]
                            text-[var(--color-primary)]
                            flex
                            items-center
                            justify-center
                            font-bold
                            shrink-0
                        "
                                    >
                                        {num}
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {title}
                                        </h3>

                                        <p className="text-sm text-gray-400 leading-6">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                <section className="bg-[var(--color-background-white)] py-10 lg:py-14" aria-labelledby="benefits-heading">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">
                        {/* Benefits + image: two-column on lg, single column on mobile */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Left column — benefits only */}
                            <div>
                                <h2 id="benefits-heading" className="text-black text-2xl font-bold mb-4">Why work with Spencer Buys Houses in {" "}
                                    <span className="text-[var(--color-text-red)]">{city.name}?</span>
                                </h2>
                                <ul className="list-disc list-inside text-[var(--color-text-black)] space-y-2">
                                    {benefits.map((b: string) => (
                                        <li key={b}>{b}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right column — city image with fallback */}
                            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src={city.benefitsImage ?? "/houses/Houses_22.png"}
                                    alt={`We buy houses in ${city.name}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </div>

                        {/* FAQ — full container width, outside the two-column grid */}
                        <div className="mt-8">
                            <h3 className="text-black text-xl font-semibold mb-3">Frequently {" "}
                                <span className="text-[var(--color-text-red)]"> Asked Questions</span>
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {faqs.map((f) => (
                                    <details key={f.q} className="bg-white p-4 border border-[var(--color-secondary)]/60 rounded-md">
                                        <summary className="font-medium text-black cursor-pointer">{f.q}</summary>
                                        <div className="mt-2 text-[var(--color-text-black)]">{f.a}</div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA ───────────────────────────────────────────────────── */}
                <section className="bg-[var(--color-background-yellow)] border-t border-white/10 relative">
                    {/* Desktop: text flush left, buttons flush right */}
                    <div className="hidden md:flex items-center justify-between px-4 lg:px-16 py-8 min-h-[200px]">
                        <div className="max-w-[720px]">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
                                {`Ready to sell your ${city.name} house?`}
                            </h2>
                            <p className="text-black text-base">
                                No agents. No repairs. No commissions. Call today or get your offer online.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 shrink-0 ml-8">
                            <CallButton inline />
                        </div>
                    </div>

                    {/* Mobile: stacked, centered */}
                    <div className="md:hidden mx-auto max-w-4xl px-4 lg:px-8 py-20 text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
                            {`Ready to sell your ${city.name} house?`}
                        </h2>
                        <p className="text-black text-sm mb-6 max-w-xl mx-auto">
                            No agents. No repairs. No commissions. Call today or get your offer online.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <CallButton inline />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
