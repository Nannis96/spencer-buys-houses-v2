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
import { JsonLd } from "@/components/seo/json-ld"
import { CallNowBanner } from "@/components/sections/call-now-banner"
import { LeadFormConsent } from "@/components/forms/lead-form-consent"
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
        canonical: "/how-we-buy-houses/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: `${SITE_URL}/how-we-buy-houses/`,
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
            "@id": `${SITE_URL}/how-we-buy-houses/`,
            url: `${SITE_URL}/how-we-buy-houses/`,
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
                        name: "How We Buy Houses",
                        item: `${SITE_URL}/how-we-buy-houses/`,
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
                <section className="relative bg-[#0f0f23] pt-28 md:pt-44 pb-16 lg:pb-24 overflow-hidden">
                    {/* Ambient glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#f59e0b]/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                            {/* Left copy */}
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-5 uppercase tracking-wide">
                                    Our Simple Process
                                </span>
                                <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white">
                                    How We Buy Houses in Memphis
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
                                            <CheckCircle2 className="h-5 w-5 text-[#f59e0b] shrink-0" aria-hidden="true" />
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
                <section id="process" className="bg-[#13132b] py-20 lg:py-28">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">

                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-4 uppercase tracking-wide">
                                How The Process Works
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                4 Simple Steps to Sell Your Memphis Home Fast
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                We've made selling your house as straightforward as possible. Here's exactly what
                                happens from your first contact to cash in hand.
                            </p>
                        </div>

                        {/* Steps grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                            {/* Connector bar (desktop) */}
                            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#f59e0b]/30 to-transparent" />

                            {steps.map(({ icon: Icon, step, title, description, highlight }) => (
                                <div
                                    key={step}
                                    className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#f59e0b]/30 transition-colors group"
                                >
                                    {/* Step badge */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#f59e0b] text-[#0f0f23] text-xs font-black">
                                        {step}
                                    </div>

                                    {/* Icon */}
                                    <div className="mt-4 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f59e0b]/10 group-hover:bg-[#f59e0b]/20 transition-colors">
                                        <Icon className="h-8 w-8 text-[#f59e0b]" />
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>

                                    {/* Highlight pill */}
                                    <span className="mt-auto inline-block rounded-full bg-[#f59e0b]/10 px-3 py-1 text-xs font-semibold text-[#f59e0b]">
                                        {highlight}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Timeframe callout */}
                        <div className="mt-14 rounded-2xl border border-[#f59e0b]/20 bg-[#f59e0b]/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f59e0b]/15">
                                <Clock className="h-7 w-7 text-[#f59e0b]" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wide text-[#f59e0b] mb-1">
                                    Timeframe
                                </p>
                                <p className="text-white leading-relaxed">
                                    After you provide us with your details, we can typically present you with a reasonable
                                    all-cash offer in just{" "}
                                    <strong className="text-[#f59e0b]">24 hours</strong>. Following that, we can finalize the
                                    sale in as little as{" "}
                                    <strong className="text-[#f59e0b]">7 days</strong>… or whenever works best for you.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. Why sell to us ── */}
                <section className="bg-[#0f0f23] py-20 lg:py-28">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                            {/* Left: copy */}
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-5 uppercase tracking-wide">
                                    Why Choose Us
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                    Selling Your Memphis Home Can Be a Quick &amp; Easy Process
                                </h2>

                                <div className="space-y-5 text-gray-400 leading-relaxed">
                                    <p>
                                        Spencer Buys Houses buys homes in and around Memphis (and other areas, too!). We're not
                                        listing your house — we're actually the ones buying your home. Because we pay cash and
                                        purchase your Memphis home directly from you, we're able to close quickly or on your
                                        schedule.
                                    </p>
                                    <p>
                                        When you work with us there are <strong className="text-white">no fees and no commissions</strong> like
                                        there are when you list your house with a traditional agent. You never have to worry about
                                        extra costs coming out of your pocket or getting your house "market-ready." We want to buy
                                        your house{" "}
                                        <strong className="text-white">as-is</strong>.
                                    </p>
                                    <p>
                                        No matter how ugly or pretty it is, and no matter the location, we buy houses in Memphis
                                        in any condition. Don't worry about fixing anything or cleaning your house again and
                                        again for buyer after buyer. We don't care how dirty your house is or how many repairs are
                                        needed — we love projects.
                                    </p>
                                    <div className="rounded-xl border border-[#f59e0b]/20 bg-[#f59e0b]/5 p-5">
                                        <p className="text-white font-semibold">
                                            From offer to close, cash in your hand in as little as 7 days.
                                        </p>
                                        <p className="text-gray-400 text-sm mt-2">
                                            You can quickly eliminate the stress of that property and stop making utility,
                                            tax, insurance, and mortgage payments. Don't wait 90+ days on the market when you
                                            can have cash in hand next week.
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href="/get-a-cash-offer-today/"
                                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-[#0f0f23] px-7 py-4 text-base font-bold transition-colors"
                                >
                                    See What We Can Offer You
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>

                            {/* Right: benefits cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {sellingBenefits.map(({ icon: Icon, title, description }) => (
                                    <div
                                        key={title}
                                        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#f59e0b]/30 transition-colors group"
                                    >
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f59e0b]/10 group-hover:bg-[#f59e0b]/20 transition-colors">
                                            <Icon className="h-6 w-6 text-[#f59e0b]" />
                                        </div>
                                        <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                                    </div>
                                ))}
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
                    headingId="how-we-buy-cta-heading"
                />

                {/* ── 5. FAQ ── */}
                <section id="faq" className="bg-[#0f0f23] py-20 lg:py-28">
                    <div className="mx-auto max-w-3xl px-4 lg:px-8">
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-4 uppercase tracking-wide">
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
                                    className="rounded-xl border border-white/10 bg-white/5 px-6 data-[state=open]:border-[#f59e0b]/30"
                                >
                                    <AccordionTrigger className="text-left text-white hover:text-[#f59e0b] font-semibold py-5 hover:no-underline">
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
                <section className="bg-[#13132b] py-20 lg:py-28">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                            {/* Left copy */}
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-5 uppercase tracking-wide">
                                    Ready to Get Started?
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                    See What We Can Offer You for Your House
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
                                            <CheckCircle2 className="h-5 w-5 text-[#f59e0b] shrink-0" aria-hidden="true" />
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
            </main>
        </>
    )
}
