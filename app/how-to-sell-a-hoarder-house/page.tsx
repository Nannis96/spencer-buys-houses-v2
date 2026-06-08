import type { Metadata } from "next"
import { AlertTriangle, Flame, Bug, ShieldAlert, Wrench, DollarSign, Home, CheckCircle2, Users, Banknote, } from "lucide-react"
import { JsonLd } from "@/components/seo/json-ld"
import { LeadFormConsent } from "@/components/forms/lead-form-consent"
import { CTAButton } from "@/components/ui/cta-button"
import { CallButton } from "@/components/ui/call-button"

/* ─── Metadata ───────────────────────────────────────────────────────────── */

const SITE_URL = "https://www.spencerbuyshouses.com"
const OG_IMAGE = "https://www.spencerbuyshouses.com/Home-Page-Design1-2.webp"

export const metadata: Metadata = {
    title: "How to Sell a Hoarder House | Spencer Buys Houses",
    description:
        "Selling a hoarder house in Olive Branch Mississippi? Get a competitive cash offer today. We buy hoarder homes as-is — no cleaning, no repairs, fast closing.",
    alternates: {
        canonical: "/how-to-sell-a-hoarder-house/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: `${SITE_URL}/how-to-sell-a-hoarder-house/`,
        siteName: "SpencerBuysHouses.com",
        title: "How to Sell a Hoarder House | Spencer Buys Houses",
        description:
            "Selling a hoarder house in Olive Branch Mississippi? Get a competitive cash offer today. We buy hoarder homes as-is — no cleaning, no repairs, fast closing.",
        images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "How to Sell a Hoarder House | Spencer Buys Houses",
        description:
            "Selling a hoarder house in Olive Branch Mississippi? Get a competitive cash offer today. We buy hoarder homes as-is — no cleaning, no repairs, fast closing.",
        images: [OG_IMAGE],
    },
}

/* ─── JSON-LD ─────────────────────────────────────────────────────────────── */

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${SITE_URL}/how-to-sell-a-hoarder-house/`,
            url: `${SITE_URL}/how-to-sell-a-hoarder-house/`,
            name: "How to Sell a Hoarder House | Spencer Buys Houses",
            description:
                "Selling a hoarder house in Olive Branch Mississippi? Get a competitive cash offer today. We buy hoarder homes as-is — no cleaning, no repairs, fast closing.",
            isPartOf: { "@id": SITE_URL },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "How to Sell a Hoarder House",
                        item: `${SITE_URL}/how-to-sell-a-hoarder-house/`,
                    },
                ],
            },
        },
        {
            "@type": "LocalBusiness",
            "@id": `${SITE_URL}/#business`,
            name: "Spencer Buys Houses",
            alternateName: "Volunteer Buyers GP",
            url: SITE_URL,
            telephone: "+19016218799",
            description:
                "Spencer Buys Houses is a family-owned real estate solutions company based in Memphis, TN. We buy houses in any condition for cash with fast closings and no commissions.",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Memphis",
                addressRegion: "TN",
                addressCountry: "US",
            },
        },
    ],
}

/* ─── Dangers data ───────────────────────────────────────────────────────── */

const dangers = [
    {
        icon: Bug,
        title: "Health Hazards",
        description:
            "Hoarder houses can harbor mold, pests, and other health hazards that need to be addressed before the property can be sold. Hoarder houses may have mold, pests, or other hazards that need to be addressed before the property can be sold. It’s important to work with a professional to ensure that the property is safe for potential buyers.",
    },
    {
        icon: Flame,
        title: "Fire Hazards",
        description:
            "Another danger of a hoarder house is the potential fire hazard. Hoarder houses are often filled with clutter and debris that can easily catch fire, putting the homeowner and potential buyers at risk. It’s important to work with a professional to ensure that the property is up to code and safe for occupancy.",
    },
    {
        icon: AlertTriangle,
        title: "Bacteria",
        description:
            "In addition to the safety hazards, hoarder houses can also be a breeding ground for bacteria and other harmful microorganisms. The buildup of clutter and debris can create an unsanitary environment that can lead to health problems for the homeowner and potential buyers. It’s important to thoroughly clean and sanitize the property before presenting it to potential buyers.",
    },
]

/* ─── Fix vs Sell data ───────────────────────────────────────────────────── */

const fixOrSell = [
    {
        icon: Wrench,
        title: "Cleaning a Hoarder House",
        description:
            "Cleaning a hoarder house is a daunting task, and it can be overwhelming to take on alone. Depending on the severity of the hoarding, you may need to hire a professional cleaning company to handle the job. They will help you clean and organize the property quickly, so you can focus your attention elsewhere. This can be expensive, but it’s necessary to ensure the safety and health of anyone who enters the property. If you’re not willing or able to invest in a professional cleaning, selling the property as-is may be the best option.",
    },
    {
        icon: Home,
        title: "Renovating a Hoarder House",
        description:
            "If the hoarder house is in need of significant repairs or renovations, it may not be worth the investment to fix it up. Depending on the extent of the damage, the cost of repairs can quickly add up. In some cases, it may be more cost-effective to sell the property as-is and let the new owner handle the renovations. However, if the property has good bones and only needs minor repairs, fixing it up could increase its value and make it more appealing to potential buyers in Olive Branch Mississippi. Consult with a local real estate agent or advisor before making your decision about what to do with your unwanted property.",
    },
    {
        icon: DollarSign,
        title: "Cost to Fix a Hoarder House",
        description:
            "The cost to fix a hoarder house can vary greatly depending on the extent of the hoarding and the necessary repairs. In some cases, the cost to clean and repair the property may exceed its current market value. It’s important to consider the potential return on investment before investing in repairs. If the cost to fix the property is too high, selling it as-is may be the best option.",
    },
]

/* ─── Selling options data ───────────────────────────────────────────────── */

const sellingOptions = [
    {
        icon: Users,
        title: "Selling A Hoarder House With An Agent",
        description: [
            "One way to sell a hoarder house is to work with a Olive Branch Mississippi real estate agent. This option can be beneficial if the property is in good condition or only needs minor repairs. An agent can help you market the property, attract potential buyers, and negotiate offers on your behalf. However, if the property requires significant repairs or cleaning, it may not be the best option, as it can take longer to sell and may require additional expenses to prepare the property for sale.",
            "When showing the property to potential buyers, it’s important to be mindful of the hoarder’s feelings. It’s important to be respectful of the property and to avoid making any negative comments about the hoarder or their belongings. It can be an extremely sensitive subject for both the hoarder and their families.",
        ],
    },
    {
        icon: Banknote,
        title: "Selling A Hoarder House to a Cash Buyer",
        description: [
            "The best buyer for a hoarder house is oftentimes a Olive Branch Mississippi real estate investor. When working with a real estate investor, you won’t have to deal with the hassle of showing your home. Plus, there are minimal inspections, as they are trying to turn the property around quickly for sale. Other benefits of selling a hoarder house to a real estate investor are that they close quickly, have no commission, and sell for cash on your terms.",
            "If you’re looking to sell a hoarder house quickly, selling to a cash buyer may be the best option. Cash buyers are investors who purchase properties in as-is condition and pay cash for the property without requiring any repairs or cleaning. This option can be ideal if you’re looking to sell quickly and avoid the hassle and expense of cleaning and repairs. Additionally, cash buyers can typically close the sale faster than a traditional buyer, which can be beneficial if you’re looking to sell quickly.",
            "Selling a hoarder house requires careful consideration of your individual circumstances. Working with a real estate agent can be beneficial if the property is in good condition or only needs minor repairs. However, if you’re looking to sell quickly and avoid the hassle of cleaning and repairs, selling to a cash buyer may be the best option. Whatever route you choose, remember to prioritize the safety and health of anyone who enters the property.",
            "It’s important to disclose the hoarding disorder to potential buyers. This may be a difficult conversation to have, but it’s important to be upfront and honest about the property’s condition. This will prevent any surprises or miscommunications down the line.",
        ],
    },
]

/* ─── Inherited steps ────────────────────────────────────────────────────── */

const inheritedSteps = [
    "Assess the property for structural integrity.",
    "Check for health hazards such as mold or pests.",
    "Make sure essential systems such as plumbing and electrical are in working order.",
    "Develop a plan to declutter.",
    "Determine the best way to sell your hoarder house in Olive Branch Mississippi.",
]

/* ─── Related articles ───────────────────────────────────────────────────── */

const relatedArticles = [
    "8 Unexpected Costs You'll Face When Cleaning Out a Hoarder House in Olive Branch Mississippi",
    "7 Steps to Help You Set Up an Estate Sale for an Inherited House in Olive Branch Mississippi",
    "6 Surprising Things You Need to Know About Owning a Hoarder House in Olive Branch Mississippi",
    "4 Hidden Costs You Can Face When Inheriting a Property in Olive Branch Mississippi",
]

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function HoaderHousePage() {
    return (
        <>
            <JsonLd data={jsonLd} />

            <main className="bg-[var(--color-background)] min-h-screen">

                {/* ── 1. Hero ── */}
                <section
                    className="relative bg-[var(--color-background)] pt-28 md:pt-44 pb-16 lg:pb-24 overflow-hidden"
                    aria-labelledby="hero-heading"
                >
                    {/* Ambient glow */}
                    <div
                        aria-hidden="true"
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--color-primary-dark)]/5 rounded-full blur-3xl pointer-events-none"
                    />

                    <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">

                            {/* Left copy */}
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-6 uppercase tracking-wide">
                                    Sell Any Condition
                                </span>

                                <h1
                                    id="hero-heading"
                                    className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white"
                                >
                                    How to Sell a{" "}
                                    <span className="text-[var(--color-text-yellow)]">Hoarder House</span>
                                </h1>

                                <p className="mt-6 text-lg md:text-xl text-gray-300 font-medium leading-relaxed">
                                    If you own a property that you need to sell fast due to hoarding, we have a solution. Contact us today and get a competitive cash offer for that house or rental property.
                                </p>

                                <div className="mt-8">
                                    <CallButton />
                                </div>

                                {/* Mobile form */}
                                <div className="lg:hidden mt-10">
                                    <LeadFormConsent />
                                </div>
                            </div>

                            {/* Right form — desktop */}
                            <div className="hidden lg:block">
                                <LeadFormConsent />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Intro article ── */}
                <section className="bg-[var(--color-background-white)] py-6 lg:py-8">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">

                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
                            How to Sell a Hoarder House
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-[var(--color-text-black)] leading-relaxed text-lg">
                            <div className="space-y-5">
                                <p>
                                    Selling a hoarder house can be an overwhelming task for homeowners in Olive Branch Mississippi. Hoarding disorder is a mental illness that affects millions of people worldwide, often resulting in an accumulation of clutter and items that can make it challenging for the individual to live comfortably in their home. When it comes time to sell the property, the situation can become even more complicated.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <p>
                                    If you find yourself responsible for selling a hoarder house, it’s crucial to approach the situation with compassion and understanding. Although the task may seem daunting, it can be successfully navigated with the right mindset and strategy, minimizing stress along the way. Keep reading as we explore the process of selling a hoarder house in Olive Branch Mississippi.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <p>
                                    If you are tasked with selling a hoarder house, it’s important to approach the situation with compassion and understanding. While the task may seem difficult, with the right approach and mindset, it can be done successfully and without much stress. Keep reading as we explore exactly how to sell a hoarder house in Olive Branch Mississippi.
                                </p>
                            </div>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
                            How to Sell a Hoarder House — Overview
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-text-[var(--color-text-black)] leading-relaxed text-lg">
                            <div className="space-y-5">
                                <p>
                                    A hoarder house is a property that has been significantly impacted by individuals who suffer from hoarding disorder. This psychological condition can lead to an overwhelming accumulation of clutter and items that may only seem useful or valuable to the person collecting them. Hoarders often gather a wide variety of items, many of which others might consider junk or worthless, making it difficult for them to part with their possessions.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <p>
                                    Selling a hoarder house in Olive Branch Mississippi presents unique challenges that prospective sellers should be aware of. These properties often require extensive decluttering, deep cleaning, and sometimes even repairs before they can be presented to potential buyers. This process can be incredibly time-consuming and emotionally taxing, especially for those who have strong emotional attachments to their belongings. Family members and loved ones may also find it difficult to confront the situation, leading to added stress during what can already be a complicated process.
                                </p>
                            </div>
                        </div>

                        {/* What to do */}
                        <div className="mt-12 rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
                            <h3 className="text-2xl font-bold text-black mb-4 text-center">
                                What to Do?
                            </h3>
                            <div className="space-y-4 text-[var(--color-text-black)] leading-relaxed">
                                <p>
                                    Hoarder houses can be challenging to sell here in Olive Branch Mississippi, as they often require significant decluttering and cleaning before they can be presented to potential buyers. This can be a time-consuming and emotional process, as hoarders may have strong emotional attachments to their belongings and may struggle to part with them. Be mindful of this when you or a loved one needs to sell a home in Olive Branch Mississippi.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. Mid-page lead form CTA ── */}
                <section className="bg-[var(--color-background)] py-10 lg:py-14">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">
                        <div className="rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-8 md:p-12">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                        Selling Your Hoarder House?
                                    </h2>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        Contact us for your cash offer today! We buy hoarder houses in any condition — no cleaning, no repairs, no commissions.
                                    </p>
                                    <ul className="space-y-3">
                                        {[
                                            "No clean-up required",
                                            "Cash offer within 24 hours",
                                            "Close in 7 days or on your schedule",
                                        ].map((item) => (
                                            <li key={item} className="flex items-center gap-3 text-gray-300">
                                                <CheckCircle2 className="h-5 w-5 text-[var(--color-primary)] shrink-0" aria-hidden="true" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <LeadFormConsent />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 4. Can you sell? + Staging + Pricing ── */}
                <section className="bg-[var(--color-background)] py-12 lg:py-16">
                    <div className="mx-auto max-w-4xl px-4 lg:px-8 space-y-12">

                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Can You Sell a Hoarder House?
                            </h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                When selling a hoarder house, it’s important to approach the situation with compassion and understanding. You’ll want to work with the hoarder to determine which items are essential and which can be discarded. It’s also important to be respectful and mindful of the hoarder’s feelings throughout the process. The process can be much different than selling atypical property in the Olive Branch Mississippi area.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                            <h3 className="text-2xl font-bold text-white mb-4">Staging a Hoarder Home</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Once the property is decluttered and cleaned, it’s important to stage the home in a way that showcases its best features. This can be done by hiring a professional stager or by doing it yourself. It’s important to keep in mind that the hoarder may have a difficult time with this process, so it’s important to be patient and understanding.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                            <h3 className="text-2xl font-bold text-white mb-4">Pricing a Hoarder Home</h3>
                            <p className="text-gray-400 leading-relaxed">
                                When pricing the property, it’s important to keep in mind that hoarder houses may require more work and investment than other properties. It’s important to price the property accordingly while also keeping in mind the local market. Don’t go to high, or you will scare off any potential buyer. The real estate agent will be able to provide guidance on the appropriate pricing strategy for your Olive Branch Mississippi property.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── 5. Dangers ── */}
                <section className="bg-[var(--background-white)] border-t border-b border-white/10 py-7 lg:py-10">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">

                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-semibold mb-4 uppercase tracking-wide border border-red-500/20">
                                Safety First
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                                Dangers of a{" "}
                                <span className="text-[var(--color-text-red)]">Hoarder Home</span>
                            </h2>
                            <p className="text-[var(--color-text-black)] max-w-2xl mx-auto">
                                One of the biggest challenges of selling a hoarder house is the safety hazards that come with it. Hoarder homes can be very dangerous, both for your physical and mental health.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {dangers.map(({ icon: Icon, title, description }) => (
                                <div
                                    key={title}
                                    className="flex flex-col p-8 rounded-2xl bg-white border border-gray-100 hover:border-[var(--color-secondary)]/30 transition-colors"
                                >
                                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
                                        <Icon className="h-7 w-7 text-red-400" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[var(--color-text-black)] mb-3">{title}</h3>
                                    <p className="text-[var(--color-text-black)] text-sm leading-relaxed">{description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/5 p-6 md:p-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/15">
                                    <ShieldAlert className="h-5 w-5 text-red-400" aria-hidden="true" />
                                </div>
                                <p className="text-[var(--color-text-black)] leading-relaxed">
                                    Despite these dangers, it is possible to sell a hoarder house in Olive Branch Mississippi. It’s important to approach the situation with compassion and understanding and to work with professionals who have experience with hoarder houses. It may take more time and effort than selling a typical property, but with the right approach, it can be done successfully.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 6. Condemned? ── */}
                <section className="bg-[var(--color-background)] py-14 lg:py-16">
                    <div className="mx-auto max-w-7xl px-4 lg:px-10">

                        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
                            Can A Hoarder House Be Condemned?
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-gray-400 leading-relaxed text-lg py-5 lg:py-8">
                            <div className="space-y-5">
                                <p>
                                    Hoarder houses can be a safety hazard, not just for the homeowner but also for potential buyers coming to view the property. The question that arises is whether a hoarder house can be condemned. The answer is yes; a hoarder house can be condemned if it poses a significant risk to public health and safety.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <p>
                                    Local government officials can condemn a hoarder house if it is deemed uninhabitable due to safety hazards such as mold, pests, or structural damage. A condemned property is one that is deemed unfit for human habitation and is no longer legally allowed to be occupied. The owner of the property is responsible for addressing the safety hazards and bringing the property up to code before it can be reoccupied.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <p>
                                    Condemning a hoarder house is not a decision that is made lightly. Local government officials typically only condemn property as a last resort when all other options have been exhausted. They will work with the hoarder and their family to address the safety hazards and provide resources to help them clean and declutter the property.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-10">
                            <h3 className="text-2xl font-bold text-white text-center mb-4">Addressing Safety Issues</h3>
                            <div className="space-y-6 text-gray-400 leading-relaxed">
                                <p>
                                    If a hoarder house is condemned, the owner will have a certain amount of time to address the safety hazards and bring the property up to code. If they fail to do so, the property may be subject to demolition. In some cases, the local government may step in to provide resources to help the owner address the safety hazards and bring the property up to code.
                                </p>
                                <p>
                                    It’s important to note that condemning a hoarder house is not a punishment. It is a safety measure to protect public health and the safety of your friends and neighbors. Local government officials will work with the hoarder and their family to provide resources and support to help them address the underlying issues that led to the hoarding behavior.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 7. Fix or Sell As-Is ── */}
                <section className="bg-[var(--background-white)] border-t border-b border-white/10 py-14 lg:py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">

                        <div className="text-center mb-6">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-semibold mb-4 uppercase tracking-wide">
                                Your Options
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-black)] mb-4">
                                Should I Fix or Sell a Hoarder House{" "}
                                <span className="text-[var(--color-text-red)]">As-Is?</span>
                            </h2>
                            <p className="text-[var(--color-text-black)] max-w-2xl mx-auto">
                                If you’re in possession of a hoarder house, you may be wondering whether to fix it up or sell it as-is. While there are pros and cons to both options, the decision ultimately depends on your individual circumstances. Here are some things to consider before spending money on repair for a house that you wish to sell.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {fixOrSell.map(({ icon: Icon, title, description }) => (
                                <div
                                    key={title}
                                    className="flex flex-col p-8 rounded-2xl bg-white border border-gray-100 hover:border-[var(--color-secondary)]/30 hover:border-red-500/30 transition-colors"
                                >
                                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
                                        <Icon className="h-7 w-7 text-red-400" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-lg font-bold text-black mb-3">{title}</h3>
                                    <p className="text-[var(--color-text-black)] text-sm leading-relaxed">{description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 rounded-xl border border-red-500/20 bg-red-500/5 p-6 md:p-8">
                            <p className="text-[var(--color-text-black)] leading-relaxed">
                                The decision to fix or sell a hoarder house as-is depends on your individual circumstances. Cleaning a hoarder house can be expensive and time-consuming, while renovating a hoarder house may not be worth the investment. Consider the cost of fixing the property and the potential return on investment before making your decision. Ultimately, your goal should be to maximize the value of the property while ensuring the safety and health of anyone who enters it.
                            </p>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <CTAButton href="#top">Get Your Cash Offer Today</CTAButton>
                        </div>
                    </div>
                </section>

                {/* ── 8. Inheriting a Hoarder House ── */}
                <section className="bg-[var(--color-background)] py-12 lg:py-16">
                    <div className="mx-auto max-w-4xl px-4 lg:px-8">

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Inheriting a Hoarder House in Olive Branch Mississippi
                        </h2>

                        <div className="space-y-5 text-gray-400 leading-relaxed text-lg mb-8">
                            <p>
                                Inheriting a house can be a mixed blessing, but inheriting a hoarder house comes with unique challenges that require careful planning and sensitivity. If you’ve inherited a hoarder house in Olive Branch Mississippi, there are some essential steps to help you navigate this complex situation. With careful planning, you can take control of the situation and ensure a successful outcome.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <h3 className="text-xl font-bold text-white mb-5">Essential Steps After Inheriting</h3>
                            <ol className="space-y-4">
                                {inheritedSteps.map((step, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--color-background)] text-xs font-black mt-0.5">
                                            {idx + 1}
                                        </span>
                                        <span className="text-gray-400 leading-relaxed">{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <p className="mt-3 text-gray-400 leading-relaxed">
                            Remember to approach the situation with compassion and understanding, especially if the hoarder was a loved one, and seek professional help to ensure a smooth and successful sale.
                        </p>
                    </div>
                </section>

                {/* ── 9. Second mid-page lead form CTA ── */}
                <section className="bg-[var(--color-background)] py-5 lg:py-7">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">
                        <div className="rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-8 md:p-12">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                        Need to Get Rid of Your Hoarder House? We Can Help!
                                    </h2>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        Contact us for your cash offer today! No cleaning, no repairs, and no commissions — just a fair, fast cash offer.
                                    </p>
                                    <ul className="space-y-3">
                                        {[
                                            "No repairs or clean-up required",
                                            "Cash offer within 24 hours",
                                            "Close in as little as 7 days",
                                        ].map((item) => (
                                            <li key={item} className="flex items-center gap-3 text-gray-300">
                                                <CheckCircle2 className="h-5 w-5 text-[var(--color-primary)] shrink-0" aria-hidden="true" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <LeadFormConsent />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 10. How to sell quickly (with agent vs cash buyer) ── */}
                <section className="bg-[var(--background-white)] border-t border-b border-white/10 py-14 lg:py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8">

                        <div className="text-center mb-8">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-semibold mb-4 uppercase tracking-wide">
                                Selling Options
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                                How to Sell a Hoarder House{" "}
                                <span className="text-[var(--color-text-red)]">Quickly</span>
                            </h2>
                            <p className="text-[var(--color-text-black)] max-w-2xl mx-auto">
                                Selling a hoarder house can be a challenging task, but with the right approach, it’s possible to get it sold quickly. Here are two of the most popular options to consider:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {sellingOptions.map(({ icon: Icon, title, description }, idx) => (
                                <div
                                    key={title}
                                    className="flex flex-col p-10 md:p-12 rounded-2xl bg-white border border-gray-100 hover:border-[var(--color-secondary)]/30 transition-colors"
                                >
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
                                        <Icon className="h-8 w-8 text-red-400" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-black mb-4">{title}</h3>
                                    {Array.isArray(description) ? (
                                        description.map((para, i) => (
                                            <p key={i} className="text-[var(--color-text-black)] leading-relaxed mb-3 text-lg">
                                                {para}
                                            </p>
                                        ))
                                    ) : (
                                        <p className="text-[var(--color-text-black)] leading-relaxed text-lg ">{description}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6, md:mt-4 flex items-center justify-center">
                            <CTAButton href="#top">Get My Cash Offer</CTAButton>
                        </div>
                    </div>
                </section>

                {/* ── 11. Related articles ── */}
                <section className="bg-[var(--color-background)] py-12 lg:py-16">
                    <div className="mx-auto max-w-4xl px-4 lg:px-8">

                        <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
                        <ul className="space-y-3">
                            {relatedArticles.map((title) => (
                                <li key={title} className="flex items-start gap-3">
                                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
                                    <span className="text-gray-400 leading-relaxed">{title}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ── 12. Conclusion ── */}
                <section className="bg-[var(--color-background)] pb-16 lg:pb-24">
                    <div className="mx-auto max-w-4xl px-4 lg:px-8">
                        <div className="rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-8 md:p-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Yes, you can sell your hoarder home in Olive Branch Mississippi…
                            </h2>
                            <div className="space-y-4 text-gray-400 leading-relaxed">
                                <p>
                                    Selling a hoarder house can be a challenging and emotional process, but with the right approach and mindset, it can be done successfully. It’s important to approach the situation with compassion and understanding and to work with professionals who have experience with hoarder houses. By following these tips, you can successfully sell a hoarder’s house and help the hoarder move on to the next chapter of their life.
                                </p>
                                <p>
                                    To learn more about what to do with your hoarder house in Olive Branch Mississippi, reach out to our team! We are happy to help!
                                </p>
                            </div>
                            <div className="mt-8 flex items-center justify-center">
                                <CTAButton href="#top">Get Your Cash Offer Today</CTAButton>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}
