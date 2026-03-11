import type { Metadata } from "next"
import {
    Phone,
    Mail,
    MapPin,
    Check,
    ArrowRight,
    ShieldCheck,
    Clock,
    Download,
    DollarSign,
    Calendar,
    Percent,
    Home,
} from "lucide-react"
import { JsonLd } from "@/components/seo/json-ld"
import { CallNowBanner } from "@/components/sections/call-now-banner"
import { LeadFormConsent } from "@/components/forms/lead-form-consent"

/* ─── Metadata ───────────────────────────────────────────────────────────── */

const SITE_URL = "https://www.spencerbuyshouses.com"
const OG_IMAGE =
    "https://image-cdn.carrot.com/uploads/sites/81361/2025/03/Home-Page-Design1-2.png"

export const metadata: Metadata = {
    title: "Contact Us | Spencer Buys Houses — Memphis Cash Home Buyers",
    description:
        "Have questions about selling your Memphis home for cash? Contact Spencer Buys Houses. Get a free, no-obligation cash offer within 24 hours. Call (901) 621-8799 or send us a message.",
    alternates: {
        canonical: "/contact-us/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: `${SITE_URL}/contact-us/`,
        siteName: "SpencerBuysHouses.com",
        title: "Contact Us | Spencer Buys Houses — Memphis Cash Home Buyers",
        description:
            "Reach out to Spencer Buys Houses with any questions about selling your Memphis home fast for cash. No fees, no commissions, close in as little as 7 days.",
        images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us | Spencer Buys Houses — Memphis Cash Home Buyers",
        description:
            "Reach out to Spencer Buys Houses with any questions about selling your Memphis home fast for cash. No fees, no commissions, close in as little as 7 days.",
        images: [OG_IMAGE],
    },
}

/* ─── JSON-LD ─────────────────────────────────────────────────────────────── */

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${SITE_URL}/contact-us/`,
            url: `${SITE_URL}/contact-us/`,
            name: "Contact Us | Spencer Buys Houses — Memphis Cash Home Buyers",
            description:
                "Contact Spencer Buys Houses to get a free cash offer for your Memphis home. No fees, no commissions, close in 7 days.",
            isPartOf: { "@id": SITE_URL },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "Contact Us",
                        item: `${SITE_URL}/contact-us/`,
                    },
                ],
            },
        },
        {
            "@type": "LocalBusiness",
            "@id": `${SITE_URL}/#organization`,
            name: "Spencer Buys Houses",
            url: SITE_URL,
            telephone: "+19016218799",
            address: {
                "@type": "PostalAddress",
                streetAddress: "111 S Highland St, Suite 179",
                addressLocality: "Memphis",
                addressRegion: "TN",
                postalCode: "38111",
                addressCountry: "US",
            },
            openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "08:00",
                closes: "18:00",
            },
        },
    ],
}

/* ─── FAQ items ──────────────────────────────────────────────────────────── */

const topicsList = [
    "The history of our company and who we are",
    "Our process for making you an all-cash offer for your house",
    "Our process for helping homeowners stop foreclosure in Memphis",
    "Anything else — even if it's just to make sure we're real people!",
]

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function ContactUsPage() {
    return (
        <main className="bg-[var(--color-background)] min-h-screen pt-10 md:pt-12">
            <JsonLd data={jsonLd} />

            {/* ── Hero Banner ──────────────────────────────────────────────── */}
            <section
                className="relative overflow-hidden pt-24 pb-10 lg:pt-30 lg:pb-20"
                aria-labelledby="contact-hero-heading"
            >
                {/* Background glow */}
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-[var(--color-primary-dark)]/5 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-text-yellow)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-6 uppercase tracking-wide">
                        Connect With Us
                    </span>
                    <h1
                        id="contact-hero-heading"
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight text-balance"
                    >
                        Have Questions?{" "}
                        <span className="text-[var(--color-text-yellow)]">We{"'"}re Here to Help.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Our goal is to make selling your home simple and stress-free. Whether
                        you{"'"}re ready to get a cash offer or just have questions, we{"'"}d
                        love to hear from you.
                    </p>
                </div>
            </section>

            {/* ── Why Choose Us (quick trust strip) ───────────────────────── */}
            <section className="py-10 lg:py-14 bg-[var(--color-background)] border-t border-white/5" aria-label="Why work with Spencer Buys Houses">
                <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-6 uppercase tracking-wide">
                        Why homeowners across Memphis choose us
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                        {[
                            {
                                icon: (
                                    <DollarSign className="h-8 w-8 text-[var(--color-primary-dark)]" aria-hidden="true" />
                                ),
                                title: "Fair Cash Offer",
                                desc: "Receive a no-obligation offer within 24 hours — backed by proof of funds.",
                            },
                            {
                                icon: (
                                    <Calendar className="h-8 w-8 text-[var(--color-primary-dark)]" aria-hidden="true" />
                                ),
                                title: "Close in 7 Days",
                                desc: "We work on your schedule — as fast or as flexible as you need.",
                            },
                            {
                                icon: (
                                    <Percent className="h-8 w-8 text-[var(--color-primary-dark)]" aria-hidden="true" />
                                ),
                                title: "Zero Fees",
                                desc: "No agent commissions, no closing costs. The offer is what you take home.",
                            },
                            {
                                icon: (
                                    <Home className="h-8 w-8 text-[var(--color-primary-dark)]" aria-hidden="true" />
                                ),
                                title: "Any Condition",
                                desc: "Repairs, inherited homes, foreclosure — we buy houses as-is.",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-[var(--color-primary)]/60 hover:border-[#f59e0b]/30 transition-colors"
                            >
                                <span className="mb-3" aria-hidden="true">{item.icon}</span>
                                <h3 className="text-[var(--color-primary)] font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Main Content: Info + Form ─────────────────────────────────── */}
            <section className="py-12 lg:py-20" aria-labelledby="contact-form-heading">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                        {/* ── Left column: Info ── */}
                        <div>
                            <h2
                                id="contact-form-heading"
                                className="text-2xl md:text-3xl font-bold text-white mb-4"
                            >
                                Let{"'"}s {" "}
                                <span className="text-[var(--color-text-yellow)]">Talk About Your Home</span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                If you{"'"}ve been thinking{" "}
                                <em className="text-gray-300">
                                    &ldquo;I need to sell my house fast,&rdquo;
                                </em>{" "}
                                you{"'"}ve come to the right place. We offer cash for houses in
                                Memphis, providing a fair, no-obligation cash offer{" "}
                                <strong className="text-white">within 24 hours</strong>. We
                                understand time is often critical, and we work on your schedule
                                to close as quickly as possible — often in as little as{" "}
                                <strong className="text-white">7 days</strong>.
                            </p>

                            {/* Topics list */}
                            <div className="mb-8">
                                <p className="text-gray-300 font-semibold mb-4">
                                    Feel free to ask us about:
                                </p>
                                <ul className="flex flex-col gap-3" role="list">
                                    {topicsList.map((topic) => (
                                        <li key={topic} className="flex items-start gap-3">
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-dark)]/10">
                                                <Check className="h-3.5 w-3.5 text-[var(--color-primary-dark)]" aria-hidden="true" />
                                            </span>
                                            <span className="text-gray-400 leading-relaxed text-sm">{topic}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Response time note */}
                            <div className="flex items-start gap-3 rounded-xl bg-[var(--color-background)]/5 border border-[var(--color-primary)]/60 p-4 mb-8">
                                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary-dark)]" aria-hidden="true" />
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    We respond to emails within{" "}
                                    <strong className="text-[var(--color-primary-dark)]">48 hours</strong>. If you
                                    need us sooner, give us a call — we can answer phone calls
                                    much faster than we can reply to emails.
                                </p>
                            </div>

                            {/* Contact info card */}
                            <div className="rounded-2xl bg-[var(--color-background)] border border-[var(--color-primary)]/60 p-6">
                                <h3 className="text-lg font-bold text-[var(--color-text-yellow)] mb-5">Contact Info</h3>
                                <div className="flex flex-col gap-4">
                                    <a
                                        href="tel:+19016218799"
                                        className="flex items-center gap-4 group"
                                        aria-label="Call us at 901-621-8799"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-dark)]/10 group-hover:bg-[var(--color-primary-dark)]/20 transition-colors">
                                            <Phone className="h-5 w-5 text-[var(--color-primary-dark)]" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Phone</p>
                                            <p className="text-white font-semibold group-hover:text-[var(--color-primary-dark)] transition-colors">
                                                (901) 621-8799
                                            </p>
                                        </div>
                                    </a>

                                    <a
                                        href="mailto:info@spencerbuyshouses.com"
                                        className="flex items-center gap-4 group"
                                        aria-label="Email info@spencerbuyshouses.com"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-dark)]/10 group-hover:bg-[var(--color-primary-dark)]/20 transition-colors">
                                            <Mail className="h-5 w-5 text-[var(--color-primary-dark)]" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Email</p>
                                            <p className="text-white font-semibold group-hover:text-[var(--color-primary-dark)] transition-colors break-all">
                                                info@spencerbuyshouses.com
                                            </p>
                                        </div>
                                    </a>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-dark)]/10">
                                            <MapPin className="h-5 w-5 text-[var(--color-primary-dark)]" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Office</p>
                                            <address className="not-italic text-white font-semibold text-sm leading-snug">
                                                Spencer Buys Houses
                                                <br />
                                                111 S Highland St, Suite 179
                                                <br />
                                                Memphis, TN 38111
                                            </address>
                                        </div>
                                    </div>
                                </div>

                                {/* No hidden fees pill */}
                                <div className="mt-6 pt-5 border-t border-[var(--color-primary)]/60">
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <ShieldCheck className="h-4 w-4 text-[#22c55e] shrink-0" aria-hidden="true" />
                                        No hidden fees, commissions, or closing costs — ever.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right form – desktop */}
                        <div className="hidden lg:block">
                            <LeadFormConsent />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Call Now Banner ──────────────────────────────────────────── */}
            <CallNowBanner
                badge="GET IN TOUCH TODAY"
                heading="Ready to Sell Your Memphis House Fast?"
                description='No fees. No repairs. No obligation. Get your free cash offer within 24 hours — or just give us a call and say "hi"!'
                secondaryLabel="Get My Free Cash Offer"
                secondaryHref="/get-a-cash-offer-today/"
                headingId="contact-cta-heading"
            />
        </main>
    )
}
