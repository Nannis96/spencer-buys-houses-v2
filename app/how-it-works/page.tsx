import type { Metadata } from "next"
import {
    ClipboardList,
    Phone,
    DollarSign,
    CalendarCheck,
    Home,
    Clock,
    ShieldCheck,
    Banknote,
    ArrowRight,
    CheckCircle2,
} from "lucide-react"
import Image from "next/image"
import { JsonLd } from "@/components/seo/json-ld"
import { CallNowBanner } from "@/components/sections/call-now-banner"
import { LeadFormConsent } from "@/components/forms/lead-form-consent"
import { CTAButton } from "@/components/ui/cta-button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

/* ─── Metadata ───────────────────────────────────────────────────────────── */

const SITE_URL = "https://www.spencerbuyshouses.com"
const OG_IMAGE =
    "https://image-cdn.carrot.com/uploads/sites/81361/2025/03/Home-Page-Design1-2.png"

export const metadata: Metadata = {
    title: "How We Buy Houses in Memphis | Spencer Buys Houses",
    description:
        "Learn how Spencer Buys Houses buys Memphis homes fast for cash. Our simple 4-step process means no fees, no repairs, and a fair all-cash offer in as little as 24 hours.",
    alternates: {
        canonical: "/how-it-works/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: `${SITE_URL}/how-it-works/`,
        siteName: "SpencerBuysHouses.com",
        title: "How We Buy Houses in Memphis | Spencer Buys Houses",
        description:
            "Our process is fair, works on your timeline, and is easy to follow. Get a cash offer in 24 hours and close in as little as 7 days.",
        images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "How We Buy Houses in Memphis | Spencer Buys Houses",
        description:
            "Our process is fair, works on your timeline, and is easy to follow. Get a cash offer in 24 hours and close in as little as 7 days.",
        images: [OG_IMAGE],
    },
}

/* ─── JSON-LD ─────────────────────────────────────────────────────────────── */

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${SITE_URL}/how-it-works/`,
            url: `${SITE_URL}/how-it-works/`,
            name: "How We Buy Houses in Memphis | Spencer Buys Houses",
            description:
                "Discover our simple, transparent 4-step process to sell your Memphis house fast for cash with Spencer Buys Houses.",
            isPartOf: { "@id": SITE_URL },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "How It Works",
                        item: `${SITE_URL}/how-it-works/`,
                    },
                ],
            },
        },
        {
            "@type": "HowTo",
            name: "How to Sell Your Memphis House Fast for Cash",
            description:
                "Our simple 4-step process to sell your Memphis home for cash — no fees, no repairs, close in as little as 7 days.",
            step: [
                {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Tell us about your property",
                    text: "Share your property details — it's quick, easy, and free!",
                },
                {
                    "@type": "HowToStep",
                    position: 2,
                    name: "We schedule a quick appointment",
                    text: "If your property meets our buying criteria, we'll contact you to set up a quick appointment.",
                },
                {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Receive a fair all-cash offer",
                    text: "We present you with a fair, no-obligation all-cash offer within 24 hours.",
                },
                {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Close and get your cash",
                    text: "We close at a local reputable title company. Cash in your hands in as little as 7 days!",
                },
            ],
        },
    ],
}

/* ─── Process steps data ─────────────────────────────────────────────────── */

const steps = [
    {
        icon: ClipboardList,
        step: "01",
        title: "Tell Us About Your Property",
        description:
            "Fill out our short form or give us a call — it's quick, easy, and completely free. We'll start reviewing your property immediately.",
        highlight: "Takes less than 2 minutes",
    },
    {
        icon: Phone,
        step: "02",
        title: "We Schedule a Quick Appointment",
        description:
            "If your property meets our buying criteria, one of our specialists will reach out to set up a brief walkthrough at a time that works for you.",
        highlight: "No obligation whatsoever",
    },
    {
        icon: DollarSign,
        step: "03",
        title: "Receive a Fair All-Cash Offer",
        description:
            "We present you with a transparent, fair all-cash offer — or discuss the best method to proceed for your unique situation.",
        highlight: "Offer in as little as 24 hours",
    },
    {
        icon: CalendarCheck,
        step: "04",
        title: "Close & Get Your Cash",
        description:
            "We close at a local, reputable title company on your schedule. No last-minute surprises — cash in your hands in as little as 7 days.",
        highlight: "Close in as little as 7 days",
    },
]

/* ─── sell to investor data ─────────────────────────────────────────────────── */

const stepsInvestor = [
    {
        icon: Phone,
        step: "01",
        title: "Get a Quote",
        description:
            "Call us to receive a no-obligation cash offer for your property. We’ll gather basic details about your home(location, condition, your timeline) and provide a fair, competitive offer—usually within 24 hours.",
        highlight: "Takes less than 2 minutes",
    },
    {
        icon: ClipboardList,
        step: "02",
        title: "Due Diligence",
        description:
            "Once you accept the offer, we’ll handle all the paperwork and property evaluation. Our team verifies the property’s details while you sit back and relax—no repairs or inspections required from you.",
        highlight: "No obligation whatsoever",
    },
    {
        icon: CalendarCheck,
        step: "03",
        title: "Set a Closing Date",
        description:
            "Choose a closing date that works best for you—we can close in as little as 7 days or on your timeline. We work with a trusted local title company to ensure a smooth, transparent process.",
        highlight: "Close in as little as 7 days",
    },
]

/* ─── Selling benefits ───────────────────────────────────────────────────── */

const sellingBenefits = [
    {
        icon: Banknote,
        title: "No Commissions or Fees",
        description:
            "The offer you accept is the amount you receive. We cover standard closing costs — zero deductions, zero surprises.",
    },
    {
        icon: Home,
        title: "Sell Completely As-Is",
        description:
            "No repairs, no cleaning, no staging. We buy Memphis homes in any condition — from pristine to total fixer-uppers.",
    },
    {
        icon: Clock,
        title: "Close on Your Timeline",
        description:
            "Need 7 days? Need 60? We adapt to your schedule — not the other way around.",
    },
    {
        icon: ShieldCheck,
        title: "No Financing Fall-Through Risk",
        description:
            "We buy with cash, so there's zero risk of deals falling apart due to bank financing issues.",
    },
]

/* ─── FAQ data ───────────────────────────────────────────────────────────── */

const faqs = [
    {
        q: `What does "as-is" mean?`,
        a: `We buy your Memphis home as-is, meaning you don't have to worry about doing repairs, fixing your home up, or getting it ready for showings. We'll handle all repairs, inspections, and more after we purchase your home. We factor this into our offer, of course, but it saves you the money and the headache associated with getting your home ready to sell.`,
    },
    {
        q: `What does an "all-cash offer" mean?`,
        a: `"All-cash" means exactly that — all cash for your Memphis home! Because we are real estate investors who are purchasing your home directly, we don't rely on traditional financing like retail homebuyers. When you sell to us, there's no risk of the financing falling through or closing being delayed. When we make you an offer, that's the full amount you'll receive at closing.`,
    },
    {
        q: "How fast is a fast closing?",
        a: "After you send us information about your home, we can make you a no-obligation, fair all-cash offer in as little as 24 hours. Once you accept, we close at a local, reputable title company in as little as 7 days. Compare that to the 30+ days it can take to close when listing your house the traditional way, and the benefits are obvious!",
    },
    {
        q: "What if I don't need a fast closing?",
        a: "At Spencer Buys Houses, we work on your time frame. If you don't need a fast closing due to the need to make arrangements, explore your future options, etc., we will schedule the closing on the day that works best for you!",
    },
    {
        q: "Will I get a lowball offer?",
        a: "Our goal is to provide you with the fairest offer possible. Unlike other buyers or big tech giants, we're transparent with how we arrive at an offer amount. What we offer is based on what the value of the property may be once we make the necessary improvements and upgrades. We're entirely transparent with this offer process and happy to walk you through how it works.",
    },
    {
        q: "Is this even legit?",
        a: "Yes, it is! The real estate industry is rapidly changing, and thousands of homeowners are exploring their options when it comes to selling their house in the fastest, easiest, and most transparent way. That's where we come in. We offer an alternative for those homeowners who may not have the time or ability to list their house on the market for top dollar. We'll work with you to assess your situation, make you a transparent all-cash offer, and close on your timeline.",
    },
]

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function HowWeBuyHousesPage() {
    return (
        <>
            <JsonLd data={jsonLd} />

            <main>
                {/* ── 1. Hero ── */}
                <section className="relative bg-[var(--color-background)] pt-28 md:pt-44 pb-16 lg:pb-24 overflow-hidden">
                    {/* Ambient glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--color-primary-dark)]/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                            {/* Left copy */}
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-5 uppercase tracking-wide">
                                    Our Simple Process
                                </span>
                                <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white">
                                    How We {" "}
                                    <span className="text-[var(--color-text-yellow)]">Buy Houses </span>
                                    in Memphis
                                </h1>
                                <p className="mt-6 text-lg text-gray-400 leading-relaxed">
                                    Our process is fair, works on your timeline, and is easy to follow.
                                    Get a no-obligation cash offer in as little as 24 hours and close in as
                                    little as 7 days.
                                </p>

                                {/* Quick trust signals */}
                                <ul className="mt-8 flex flex-col gap-3">
                                    {[
                                        "No fees or commissions — ever",
                                        "No repairs or cleaning required",
                                        "Close in 7 days or on your schedule",
                                        "100% transparent — no surprises",
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-gray-300">
                                            <CheckCircle2 className="h-5 w-5 text-[var(--color-primary)] shrink-0" aria-hidden="true" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                {/* Mobile form */}
                                <div className="lg:hidden mt-10">
                                    <LeadFormConsent />
                                </div>
                            </div>

                            {/* Right: Lead form (desktop) */}
                            <div className="hidden lg:block">
                                <LeadFormConsent />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Process Steps ── */}
                <section id="process" className="bg-[var(--color-background)] py-10 lg:py-14">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">

                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-4 uppercase tracking-wide">
                                How The Process Works
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                <span className="text-[var(--color-text-yellow)]">4 Simple Steps</span>
                                {" "} to Sell Your Memphis Home Fast
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                We've made selling your house as straightforward as possible. Here's exactly what
                                happens from your first contact to cash in hand.
                            </p>
                        </div>

                        {/* Steps grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                            {/* Connector bar (desktop) */}

                            {steps.map(({ icon: Icon, step, title, description, highlight }) => (
                                <div
                                    key={step}
                                    className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--color-primary-dark)]/30 transition-colors group"
                                >
                                    <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent" />
                                    {/* Step badge */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--color-background)] text-xs font-black">
                                        {step}
                                    </div>

                                    {/* Icon */}
                                    <div className="mt-4 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary-dark)]/20 transition-colors">
                                        <Icon className="h-8 w-8 text-[var(--color-primary)]" />
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>

                                    {/* Highlight pill */}
                                    <span className="mt-auto inline-block rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
                                        {highlight}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Timeframe callout */}
                        <div className="mt-14 rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary)]/15">
                                <Clock className="h-7 w-7 text-[var(--color-primary)]" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)] mb-1">
                                    Timeframe
                                </p>
                                <p className="text-white leading-relaxed">
                                    After you provide us with your details, we can typically present you with a reasonable
                                    all-cash offer in just {" "}
                                    <strong className="text-[var(--color-primary-dark)]">24 hours</strong>. Following that, we can finalize the
                                    sale in as little as {" "}
                                    <strong className="text-[var(--color-primary-dark)]">7 days</strong>… or whenever works best for you.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. Why sell to us ── */}
                <section className="bg-[var(--color-background)] py-10 lg:py-14">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                            {/* Left: copy */}
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-5 uppercase tracking-wide">
                                    Why Choose Us
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                    Selling Your Memphis Home Can Be A Quick & Easy Process
                                </h2>

                                <div className="space-y-5 text-gray-400 leading-relaxed">
                                    <p>
                                        Spencer Buys Houses buys houses in and around Memphis
                                        (and other areas, too!). <strong className="text-white">
                                            We’re not listing your house, we’re</strong>
                                        actually the ones buying your home. Because <strong className="text-white">we pay cash</strong>
                                        and are buying your Memphis home directly from you, we’re able
                                        to close quickly (or on your schedule).
                                    </p>
                                    <p>
                                        When you work with us there are no fees and no commissions like
                                        there are when you list your house with a traditional agent.
                                        You never have to worry about any extra costs to sell your house
                                        fast coming out of your pocket or even getting your house
                                        “market-ready” to sell. We want to buy your house{" "}
                                        <strong className="text-white">as-is</strong>.
                                    </p>
                                    <p>
                                        No matter how ugly or pretty it is and no matter the location,
                                        we buy houses in Memphis in any condition.
                                    </p>

                                </div>
                            </div>

                            {/* Right: benefits cards */}
                            <div className="flex items-center justify-center">
                                <div className="w-full max-w-[500px] rounded-2xl overflow-hidden border border-white/10">
                                    <Image
                                        src="/houses/Houses_19.png"
                                        alt="Houses"
                                        width={560}
                                        height={360}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>

                            <div className="rounded-xl border border-[var(--color-primary-dark)]/20 bg-[var(--color-primary-dark)]/5 p-5">
                                <p className="text-[var(--color-primary-dark)] font-semibold">
                                    From offer to close and cash in your hand in as little as 7 days.
                                </p>
                                <p className="text-gray-400 text-sm mt-2">
                                    You can quickly eliminate the stress of that property and stop making
                                    another utility payment, tax payment, insurance payment, mortgage
                                    payment, or any other expenses tied to homeownership. If you decide
                                    to put your house on the market and wait for over 90 days to finalize
                                    the sale, you must consider all the costs of keeping that property
                                    while it’s listed and during the waiting period before closing.
                                </p>
                            </div>
                            <div className="rounded-xl border border-[var(--color-primary-dark)]/20 bg-[var(--color-primary-dark)]/5 p-5">
                                <p className="text-[var(--color-primary-dark)] font-semibold">
                                    Don’t worry about fixing anything or cleaning your house again and again for buyer after buyer.
                                </p>
                                <p className="text-gray-400 text-sm mt-2">
                                    We don’t care how dirty your house is (we’ve seen worse!) or how many
                                    repairs are needed. Is it a complete fixer? Great! We love projects.
                                    We want to make an offer on your house today. Let us save you time
                                    and put more money in your pocket.
                                </p>
                            </div>

                        </div>
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <CTAButton href="#top">See What We Can Offer You</CTAButton>
                        </div>
                    </div>
                </section>

                {/* ── Sell To Investor Process Steps ── */}
                <section
                    id="process-investor"
                    className="bg-[var(--background-white)] border-t-4 border-[var(--color-secondary)] py-16 lg:py-20"
                    style={{
                        backgroundImage: "url('/buildings.png')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: '90%',
                    }}
                >
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">

                        {/* Section header */}
                        <div className="text-center mb-14">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-sm font-semibold mb-4 uppercase tracking-wide border border-[var(--color-secondary)]/20">
                                How The Process Works
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-black)] mb-4">
                                How To {" "}
                                <span className="text-[var(--color-secondary)]">Sell My House </span>
                                To An Investor
                            </h2>
                            <p className="text-[var(--color-text-black)] max-w-2xl mx-auto">
                                A simple 3-step process designed to get you from offer to cash as fast as possible.
                            </p>
                            <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-[var(--color-secondary)]" />
                        </div>

                        {/* Steps Investor grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {stepsInvestor.map(({ icon: Icon, step, title, description, highlight }, idx) => (
                                <div
                                    key={step}
                                    className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-xl hover:border-[var(--color-secondary)]/30 transition-all duration-300 group"
                                >
                                    {/* Connector arrow between cards (desktop) */}
                                    {idx < stepsInvestor.length - 1 && (
                                        <ArrowRight className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 z-10 h-6 w-6 text-[var(--color-secondary)]/40" />
                                    )}

                                    {/* Step badge */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-secondary)] text-[var(--color-text-white)] text-xs font-black shadow-sm ring-4 ring-white">
                                        {step}
                                    </div>

                                    {/* Icon */}
                                    <div className="mt-6 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-secondary)]/10 group-hover:bg-[var(--color-secondary)]/15 transition-colors">
                                        <Icon className="h-8 w-8 text-[var(--color-secondary)]" />
                                    </div>

                                    <h3 className="text-lg font-bold text-[var(--color-text-black)] mb-3">{title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{description}</p>

                                    {/* Highlight pill */}
                                    <span className="mt-auto inline-block rounded-full bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20 px-4 py-1 text-xs font-semibold text-[var(--color-secondary)]">
                                        {highlight}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Bottom CTA strip */}
                        <div className="mt-12 rounded-2xl bg-[var(--color-secondary)] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <p className="text-[var(--color-text-white)] font-bold text-lg mb-1">Ready to get your cash offer?</p>
                                <p className="text-white/80 text-sm">No fees, no repairs, no obligation — close in as little as 7 days.</p>
                            </div>
                            <CTAButton
                                href="#top"
                                className="shrink-0 bg-white hover:bg-gray-50"
                                textColor="text-[var(--color-secondary-dark)]"
                            >
                                Get My Cash Offer
                            </CTAButton>
                        </div>
                    </div>
                </section>

                {/* ── New: Benefits of selling to an investor ── */}
                <section id="benefits-investor" className="bg-[var(--color-background)] py-10 lg:py-14">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">

                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                Benefits of Selling my House To {" "}
                                <span className="text-[var(--color-text-yellow)]">An Investor?</span>

                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Selling to an investor can simplify and speed up the sale of your home.
                                Below are common benefits homeowners experience when working with investors.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-dark)]/10">
                                        <Clock className="h-6 w-6 text-[var(--color-primary-dark)]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">Fast Closing</h3>
                                        <p className="text-gray-400 text-sm">
                                            One of the biggest benefits of selling to an investor is speed.
                                            Traditional home sales can take weeks or even months, but investors
                                            often close in as little as 7-14 days. This can be ideal if you’re facing a
                                            time-sensitive situation like foreclosure, job relocation, or a family
                                            emergency.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-dark)]/10">
                                        <Home className="h-6 w-6 text-[var(--color-primary-dark)]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">Sell As-Is</h3>
                                        <p className="text-gray-400 text-sm">
                                            Investors typically buy homes "as-is," meaning you don’t have
                                            to spend time or money on repairs. Whether your property needs
                                            minor updates or major renovations, an investor will take it off
                                            your hands.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-dark)]/10">
                                        <ShieldCheck className="h-6 w-6 text-[var(--color-primary-dark)]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">No open houses</h3>
                                        <p className="text-gray-400 text-sm">
                                            No buyer contingencies, and no lengthy negotiations. Investors
                                            usually pay in cash, which means fewer obstacles and a smoother
                                            closing process.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-dark)]/10">
                                        <CalendarCheck className="h-6 w-6 text-[var(--color-primary-dark)]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">Stay &amp; Pay</h3>
                                        <p className="text-gray-400 text-sm">
                                            Many investors offer flexible terms tailored to your needs, such as
                                            allowing you to stay in the home after closing for a short period or
                                            working around your schedule
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── New: Homeowner Checklist ── */}
                <section id="homeowner-checklist" className="bg-[var(--color-background)] py-10 lg:py-14">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Homeowner  {" "}
                                <span className="text-[var(--color-text-yellow)]">Checklist</span>
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                                We are now moving towards closing and wanted to give you
                                an idea of what to expect. Everything moves super fast, so we
                                need your cooperation to make things as speedy as possible.
                                This can also serve as a checklist!
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <article className="p-6 rounded-2xl bg-[var(--color-background-white)] border border-white/10 hover:border-[var(--color-secondary)]/30">
                                <h3 className="text-[var(--color-text-red)] font-bold mb-3">In person Appointments (Days 1-4)</h3>
                                <ul className="text-[var(--color-text-black)] list-inside space-y-2">
                                    <li>
                                        <strong className="text-[var(--color-text-red)]">Access</strong> — This component is critical to a speedy closing. Generally,
                                        we get photos of the home within 72 hours of signing the Purchase and
                                        Sale Agreement.
                                    </li>
                                    <li>
                                        <strong className="text-[var(--color-text-red)]">Keys</strong> — If the home is vacant or the owner doesn’t live nearby, we will place a
                                        lockbox on the property to gain access and move things along quickly
                                    </li>
                                </ul>
                            </article>

                            <article className="p-6 rounded-2xl bg-[var(--color-background-white)] border border-white/10">
                                <h3 className="text-[var(--color-text-red)] font-bold mb-3">Buyer Walk-Throughs (Days 5-10)</h3>
                                <ul className="text-[var(--color-text-black)] list-inside space-y-2">
                                    <li>
                                        <strong className="text-[var(--color-text-red)]">Contractor Bids</strong> — Firming up our numbers is vital to making a wise investment.
                                        This is a crucial piece tour success.
                                    </li>
                                    <li>
                                        <strong className="text-[var(--color-text-red)]">Walk-Throughs</strong> — Buying a home can be a very difficult task, but we’ve got it
                                        down to a science. This involves getting our team inside the house within the
                                        first ten days of the contract period. This might include contractors, insurance,
                                        the finance team, the owner, and any specialists or experts needed to determine if this is the right fit for our needs as an investment company.
                                    </li>
                                </ul>
                            </article>

                            <article className="p-6 rounded-2xl bg-[var(--color-background-white)] border border-white/10">
                                <h3 className="text-[var(--color-text-red)] font-bold mb-3">Due Diligence (Days 11-21)</h3>
                                <ul className="text-[var(--color-text-black)] list-inside space-y-2">
                                    <li>
                                        <strong className="text-[var(--color-text-red)]">Rental Property</strong> — Provide tenant information, lease, rent payment history,
                                        and similar information. All of this will be placed on the settlement statement
                                        and pro-rated.
                                    </li>
                                    <li>
                                        <strong className="text-[var(--color-text-red)]">Mortgage or Liens</strong> — or liens, expected payoffs and documents to release the liens.
                                    </li>
                                    <li>
                                        <strong className="text-[var(--color-text-red)]">Inherited Home</strong> — death certificates, affidavits, and other supporting
                                        ownership documents.
                                    </li>
                                    <li>
                                        <strong className="text-[var(--color-text-red)]">Vacate the Home</strong> — prepare to move out and gather your belongings.
                                        Turn utilities off, cancel insurance, and confirm.
                                    </li>
                                </ul>
                            </article>

                            <article className="p-6 rounded-2xl bg-[var(--color-background-white)] border border-white/10">
                                <h3 className="text-[var(--color-text-red)] font-bold mb-3">Closing</h3>
                                <p className="text-[var(--color-text-black)] leading-relaxed">
                                    <strong className="text-[var(--color-text-red)]">Closing Day: </strong>You will show up for closing to sign the documents and
                                    collect a cashier's check. If you prefer, we can mail the closing papers
                                    to you, and you can receive a wire to your bank account.
                                </p>
                            </article>
                        </div>

                        <div className="mt-10 text-center">
                            <h3 className="text-2xl font-bold text-white mb-3">
                                SELL YOUR MEMPHIS HOUSE FAST FOR CASH — {" "}
                                <span className="text-[var(--color-text-yellow)]">NO STRESS, NO DELAYS!</span>
                            </h3>
                            <p className="text-gray-400 max-w-3xl mx-auto">
                                Spencer Buys Houses is your trusted local cash
                                home buyer in Memphis, Tennessee, offering a fast,
                                hassle-free solution to sell your house for cash.
                                Whether you’re relocating, managing an inherited
                                property, or need to sell your house fast in Memphis
                                TN, our same-day cash offers eliminate stress and
                                delays. Learn how our home buying process works!
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── New: Closing Day (brief checklist) ── */}
                <section id="closing-day" className="bg-[var(--color-background-white)] py-10 lg:py-14">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-black)] mb-2">
                                <span className="text-[var(--color-text-red)]">Closing</span>
                                {" "}Day</h2>
                            <p className="text-[var(--color-text-black)] max-w-2xl mx-auto">
                                What to bring and what to expect on the day you close the sale.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-[var(--color-secondary)]/30">
                                <h4 className="text-[var(--color-text-red)] font-semibold mb-2">Bring Identification</h4>
                                <p className="text-[var(--color-text-black)] text-sm">Have a valid government-issued ID (driver’s license or passport) for notarization.</p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-[var(--color-secondary)]/30">
                                <h4 className="text-[var(--color-text-red)] font-semibold mb-2">Sign the Documents</h4>
                                <p className="text-[var(--color-text-black)] text-sm">You’ll sign the deed transfer, settlement statement, and any other required paperwork.</p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-[var(--color-secondary)]/30">
                                <h4 className="text-[var(--color-text-red)] font-semibold mb-2">Collect Your Funds</h4>
                                <p className="text-[var(--color-text-black)] text-sm">Choose whether to receive your proceeds via wire transfer or a cashier's check.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 5. FAQ ── */}
                <section id="faq" className="bg-[var(--color-background)] py-10 lg:py-14">
                    <div className="mx-auto max-w-3xl px-4 lg:px-8">
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-4 uppercase tracking-wide">
                                I Have Some Questions…
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Straight Answers to Common Questions
                            </h2>
                            <p className="text-gray-400 max-w-xl mx-auto">
                                Everything you need to know about our process and what to expect when you sell to us.
                            </p>
                        </div>

                        <Accordion type="single" collapsible className="flex flex-col gap-3">
                            {faqs.map((faq, i) => (
                                <AccordionItem
                                    key={i}
                                    value={`item-${i}`}
                                    className="rounded-xl border border-white/10 bg-white/5 px-6 data-[state=open]:border-[var(--color-primary-dark)]/30"
                                >
                                    <AccordionTrigger className="text-left text-white hover:text-[var(--color-primary)] font-semibold py-5 hover:no-underline">
                                        {faq.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-400 leading-relaxed pb-5">
                                        {faq.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* ── 6. Bottom form CTA ── */}
                <section className="bg-[var(--color-background)] py-10 lg:py-14">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                            {/* Left copy */}
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-5 uppercase tracking-wide">
                                    Ready to Get Started?
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                    See What We Can {" "}
                                    <span className="text-[var(--color-text-yellow)]">Offer You for Your House </span>
                                </h2>
                                <p className="text-gray-400 leading-relaxed mb-8">
                                    Fill out the short form and one of our home buying specialists will reach out within
                                    the next 24 hours with your personalized cash offer. 100% free, no obligation, and
                                    completely confidential.
                                </p>
                                <ul className="flex flex-col gap-3 text-gray-300">
                                    {[
                                        "Offer in as little as 24 hours",
                                        "Close in as little as 7 days",
                                        "No fees, commissions, or repairs",
                                        "Your information is 100% secure",
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-[var(--color-primary-dark)] shrink-0" aria-hidden="true" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right: form */}
                            <div>
                                <LeadFormConsent />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 4. CTA Banner ── */}
                <CallNowBanner
                    badge="GET YOUR OFFER TODAY"
                    heading="Contact Us Today to Get Your Offer!"
                    description="No fees. No repairs. No obligation. Close in as little as 7 days."
                    secondaryLabel="Get My Free Cash Offer"
                    secondaryHref="/get-a-cash-offer-today/"
                    headingId="how-it-works-cta-heading"
                />
            </main>
        </>
    )
}
