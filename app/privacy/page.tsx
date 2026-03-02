import type { Metadata } from "next"
import { ShieldCheck, Eye, Lock, FileText } from "lucide-react"
import { JsonLd } from "@/components/seo/json-ld"

const SITE_URL = "https://www.spencerbuyshouses.com"
const OG_IMAGE =
    "https://image-cdn.carrot.com/uploads/sites/81361/2025/03/Home-Page-Design1-2.png"

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Learn how Spencer Buys Houses collects, uses, and protects your personal information. We never sell your data. Your privacy is our priority.",
    alternates: {
        canonical: "/privacy/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: `${SITE_URL}/privacy/`,
        siteName: "SpencerBuysHouses.com",
        title: "Privacy Policy | Spencer Buys Houses",
        description:
            "Learn how Spencer Buys Houses collects, uses, and protects your personal information. We never sell your data. Your privacy is our priority.",
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: "Spencer Buys Houses — Privacy Policy",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Privacy Policy | Spencer Buys Houses",
        description:
            "Learn how Spencer Buys Houses collects, uses, and protects your personal information. We never sell your data.",
        images: [OG_IMAGE],
    },
}

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${SITE_URL}/privacy/`,
            url: `${SITE_URL}/privacy/`,
            name: "Privacy Policy | Spencer Buys Houses",
            description:
                "Learn how Spencer Buys Houses collects, uses, and protects your personal information. We never sell your data. Your privacy is our priority.",
            inLanguage: "en-US",
            dateModified: "2026-02-26",
            isPartOf: { "@id": SITE_URL },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: `${SITE_URL}/`,
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "Privacy Policy",
                        item: `${SITE_URL}/privacy/`,
                    },
                ],
            },
        },
        {
            "@type": "LocalBusiness",
            "@id": `${SITE_URL}/#business`,
            name: "Spencer Buys Houses",
            url: SITE_URL,
            telephone: "+19016218799",
            description:
                "Direct cash home buyer in Memphis, TN. We buy houses in any condition — no fees, no commissions, fast closings.",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Memphis",
                addressRegion: "TN",
                addressCountry: "US",
            },
            areaServed: ["Memphis, TN", "Berclair, TN", "Raleigh, TN", "Frayser, TN", "Hickory Hill, TN", "Cordova, TN", "Whitehaven, TN"],
        },
    ],
}

/* ─── Section data for the table of contents ─────────────────────────────── */

const sections = [
    { id: "what-we-collect", label: "What information do we collect?" },
    { id: "how-we-use", label: "What do we use it for?" },
    { id: "how-we-protect", label: "How do we protect it?" },
    { id: "disclosure", label: "Do we disclose information?" },
    { id: "third-party-links", label: "Third-party links" },
    { id: "third-party-services", label: "Third-party services" },
    { id: "remarketing", label: "Remarketing" },
    { id: "california", label: "California Compliance (COPPA)" },
    { id: "personal-financial", label: "Personal & Financial Info" },
    { id: "changes", label: "Changes to this Policy" },
    { id: "contact", label: "Contacting Us" },
]

/* ─── Reusable prose helpers (mirrors terms/page.tsx) ────────────────────── */

function SectionHeading({
    id,
    children,
}: {
    id: string
    children: React.ReactNode
}) {
    return (
        <h2
            id={id}
            className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3 scroll-mt-28"
        >
            <span className="flex-shrink-0 w-1 h-6 rounded-full bg-[#f59e0b]" aria-hidden="true" />
            {children}
        </h2>
    )
}

function SubHeading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-base font-semibold text-[#f59e0b] mt-6 mb-2">
            {children}
        </h3>
    )
}

function Prose({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-4">
            {children}
        </p>
    )
}

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="list-disc list-outside ml-5 space-y-2 text-gray-400 text-sm md:text-base mb-4">
            {items.map((item, i) => (
                <li key={i} className="leading-relaxed pl-1">
                    {item}
                </li>
            ))}
        </ul>
    )
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function PrivacyPolicyPage() {
    return (
        <main className="bg-[#0f0f23] min-h-screen">
            <JsonLd data={jsonLd} />

            {/* ── Hero Banner ────────────────────────────────────────────── */}
            <section
                className="relative bg-[#0a0a1a] border-b border-white/10 pt-32 pb-16 overflow-hidden"
                aria-labelledby="privacy-heading"
            >
                {/* Ambient glow */}
                <div
                    aria-hidden="true"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#f59e0b]/5 rounded-full blur-3xl pointer-events-none"
                />

                <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="flex justify-center mb-6">
                        <ol className="flex items-center gap-2 text-sm text-gray-500">
                            <li>
                                <a
                                    href="/"
                                    className="hover:text-[#f59e0b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded"
                                >
                                    Home
                                </a>
                            </li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li>
                                <span className="text-gray-400" aria-current="page">Privacy Policy</span>
                            </li>
                        </ol>
                    </nav>

                    <div className="flex flex-col items-center text-center gap-4">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold uppercase tracking-wide">
                            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                            Legal
                        </span>
                        <h1 id="privacy-heading" className="text-4xl md:text-5xl font-black text-white leading-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-400 max-w-2xl text-base md:text-lg">
                            Your privacy is important to us. This policy explains how{" "}
                            <strong className="text-white">Spencer Buys Houses</strong> collects,
                            uses, and protects the information you share with us.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 mt-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <FileText className="h-4 w-4 text-[#f59e0b]" aria-hidden="true" />
                                Applies to: spencerbuyshouses.com
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Lock className="h-4 w-4 text-[#f59e0b]" aria-hidden="true" />
                                Your data is never sold to third parties
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Main Content ────────────────────────────────────────────── */}
            <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* ── Table of Contents (sticky on desktop) ──────────── */}
                    <aside aria-label="Page navigation" className="hidden lg:block lg:w-64 xl:w-72 flex-shrink-0">
                        <div className="sticky top-28 rounded-2xl bg-white/[0.03] border border-white/10 p-6">
                            <p className="text-xs font-semibold text-[#f59e0b] uppercase tracking-widest mb-4">
                                Contents
                            </p>
                            <nav aria-label="Page table of contents" className="flex flex-col gap-1">
                                {sections.map((s) => (
                                    <a
                                        key={s.id}
                                        href={`#${s.id}`}
                                        className="text-sm text-gray-400 hover:text-[#f59e0b] transition-colors py-1 leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded"
                                    >
                                        {s.label}
                                    </a>
                                ))}
                            </nav>
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <a
                                    href="tel:+19016218799"
                                    aria-label="Call Spencer Buys Houses at (901) 621-8799"
                                    className="block text-center py-2.5 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-[#0f0f23] text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]"
                                >
                                    (901) 621-8799
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* ── Content ─────────────────────────────────────────── */}
                    <article className="flex-1 min-w-0">

                        {/* Intro notice */}
                        <div className="rounded-2xl bg-[#f59e0b]/5 border border-[#f59e0b]/20 p-6 mb-10 flex gap-4">
                            <Eye className="h-5 w-5 text-[#f59e0b] flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <div className="text-sm text-gray-300 leading-relaxed">
                                <strong className="text-white">Your privacy matters.</strong> This
                                online privacy policy applies only to information collected through
                                our website and not to information collected offline. By using our
                                site, you consent to our privacy policy.
                            </div>
                        </div>

                        <div className="space-y-10">

                            {/* 1 – What we collect */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="what-we-collect">
                                <SectionHeading id="what-we-collect">
                                    What information do we collect?
                                </SectionHeading>
                                <Prose>
                                    We collect information from you when you subscribe to our newsletter,
                                    fill out a form, or submit property information.
                                </Prose>
                                <Prose>
                                    We may collect information about your computer, including your IP
                                    address, operating system, and browser type using Google Analytics.
                                    This is to improve browsing for everyone and does not identify any
                                    individual.
                                </Prose>
                                <Prose>
                                    When ordering or registering on our site, as appropriate, you may be
                                    asked to enter your: name, e-mail address, mailing address, or phone
                                    number. You may, however, visit our site anonymously.
                                </Prose>
                                <Prose>
                                    We transfer information about you if Spencer Buys Houses is acquired
                                    by or merged with another company. In this event, Spencer Buys Houses
                                    will notify you before information about you is transferred and becomes
                                    subject to a different privacy policy.
                                </Prose>
                            </section>

                            {/* 2 – How we use */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="how-we-use">
                                <SectionHeading id="how-we-use">
                                    What do we use your information for?
                                </SectionHeading>
                                <Prose>
                                    Any of the information we collect from you may be used in one of the
                                    following ways:
                                </Prose>

                                <SubHeading>To process transactions</SubHeading>
                                <Prose>
                                    Your information, whether public or private, will not be sold,
                                    exchanged, transferred, or given to any other company for any reason
                                    whatsoever, without your consent, other than for the express purpose
                                    of delivering the purchased product or service requested.
                                </Prose>

                                <SubHeading>To send periodic emails</SubHeading>
                                <Prose>
                                    The email address you provide may be used to send you information,
                                    respond to inquiries, and/or other requests or questions.
                                </Prose>
                            </section>

                            {/* 3 – How we protect */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="how-we-protect">
                                <SectionHeading id="how-we-protect">
                                    How do we protect your information?
                                </SectionHeading>
                                <Prose>
                                    We implement a variety of security measures to maintain the safety of
                                    your personal information when you enter, submit, or access your
                                    personal information.
                                </Prose>
                            </section>

                            {/* 4 – Disclosure */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="disclosure">
                                <SectionHeading id="disclosure">
                                    Do we disclose any information to outside parties?
                                </SectionHeading>
                                <Prose>
                                    We do not sell, trade, or otherwise transfer to outside parties your
                                    personally identifiable information. This does not include trusted
                                    third parties who assist us in operating our website, conducting our
                                    business, or servicing you, so long as those parties agree to keep
                                    this information confidential.
                                </Prose>
                                <Prose>
                                    We may also release your information when we believe release is
                                    appropriate to comply with the law, enforce our site policies, or
                                    protect our or others' rights, property, or safety. However,
                                    non-personally identifiable visitor information may be provided to
                                    other parties for marketing, advertising, or other uses.
                                </Prose>
                            </section>

                            {/* 5 – Third-party links */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="third-party-links">
                                <SectionHeading id="third-party-links">
                                    Third-party links
                                </SectionHeading>
                                <Prose>
                                    Occasionally, at our discretion, we may include or offer third-party
                                    products or services on our website. These third-party sites have
                                    separate and independent privacy policies. We therefore have no
                                    responsibility or liability for the content and activities of these
                                    linked sites. Nonetheless, we seek to protect the integrity of our
                                    site and welcome any feedback about these sites.
                                </Prose>
                            </section>

                            {/* 6 – Third-party services */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="third-party-services">
                                <SectionHeading id="third-party-services">
                                    Third-Party Services
                                </SectionHeading>
                                <Prose>
                                    In general, the third-party providers used by us will only collect,
                                    use, and disclose your information to the extent necessary to allow
                                    them to perform the services they provide to us.
                                </Prose>
                                <Prose>
                                    However, certain third-party service providers, such as payment
                                    gateways and other payment transaction processors, have their own
                                    privacy policies with respect to the information we are required to
                                    provide to them for your purchase-related transactions. We recommend
                                    that you read their privacy policies so you can understand the manner
                                    in which your personal information will be handled by these providers.
                                </Prose>
                                <Prose>
                                    In particular, remember that certain providers may be located in or
                                    have facilities located in a different jurisdiction than either you or
                                    us. If you elect to proceed with a transaction that involves the
                                    services of a third-party service provider, your information may
                                    become subject to the laws of the jurisdiction(s) in which that
                                    service provider or its facilities are located.
                                </Prose>
                                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4 mt-4 text-sm text-gray-400 leading-relaxed">
                                    <strong className="text-gray-300">Example:</strong> If you are
                                    located in Canada and your transaction is processed by a payment
                                    gateway located in the United States, your personal information used
                                    in completing that transaction may be subject to disclosure under
                                    United States legislation, including the Patriot Act.
                                </div>
                                <Prose>
                                    Once you leave our website or are redirected to a third-party website
                                    or application, you are no longer governed by this Privacy Policy or
                                    our website's{" "}
                                    <a
                                        href="/terms/"
                                        className="text-[#f59e0b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded"
                                    >
                                        Terms of Use
                                    </a>
                                    .
                                </Prose>
                            </section>

                            {/* 7 – Remarketing */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="remarketing">
                                <SectionHeading id="remarketing">
                                    Remarketing
                                </SectionHeading>
                                <Prose>
                                    Spencer Buys Houses may use 3rd-party vendor re-marketing tracking
                                    cookies, including but not limited to the Google AdWords tracking
                                    cookie. This means we will continue to show ads to you across the
                                    internet, specifically on the Google Content Network (GCN). We
                                    respect your privacy and are not collecting any identifiable
                                    information through the use of Google or any other 3rd-party
                                    remarketing system.
                                </Prose>
                                <Prose>
                                    The third-party vendors, including Facebook and Google, whose
                                    services we use will place cookies on web browsers in order to serve
                                    ads based on past visits to our website. This allows us to make
                                    special offers and continue to market our services to those who have
                                    shown interest in our service.
                                </Prose>
                                <Prose>
                                    In addition to using cookies and related technologies as described
                                    above, we also may permit certain third-party companies to help us
                                    tailor advertising that we think may be of interest to users and to
                                    collect and use other data about user activities on our Sites and/or
                                    Services. These companies may deliver ads that might also place
                                    cookies and otherwise track user behavior.
                                </Prose>

                                <SubHeading>Google AdWords Remarketing</SubHeading>
                                <Prose>
                                    This website uses the Google AdWords remarketing service to advertise
                                    on third-party websites (including Google) to previous visitors to our
                                    site. It could mean that we advertise to previous visitors who
                                    haven&apos;t completed a task on our site, for example using the contact
                                    form to make an inquiry. This could be in the form of an advertisement
                                    on the Google search results page or a site in the Google Display
                                    Network. Third-party vendors, including Google, use cookies to serve
                                    ads based on someone&apos;s past visits to the Spencer Buys Houses
                                    website. Any data collected will be used in accordance with our own
                                    privacy policy and{" "}
                                    <a
                                        href="https://policies.google.com/privacy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#f59e0b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded"
                                    >
                                        Google&apos;s privacy policy
                                    </a>
                                    .
                                </Prose>
                            </section>

                            {/* 8 – California / COPPA */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="california">
                                <SectionHeading id="california">
                                    California &amp; Children&apos;s Privacy Compliance
                                </SectionHeading>

                                <SubHeading>
                                    California Online Privacy Protection Act Compliance
                                </SubHeading>
                                <Prose>
                                    Because we value your privacy we have taken the necessary precautions
                                    to be in compliance with the California Online Privacy Protection Act.
                                    We will not distribute your personal information to outside parties
                                    without your consent.
                                </Prose>

                                <SubHeading>
                                    Children&apos;s Online Privacy Protection Act Compliance (COPPA)
                                </SubHeading>
                                <Prose>
                                    We are in compliance with the requirements of COPPA (Children&apos;s
                                    Online Privacy Protection Act), and we do not collect any information
                                    from anyone under 13 years of age. Our website, products, and
                                    services are all directed to people who are at least 13 years old or
                                    older.
                                </Prose>
                            </section>

                            {/* 9 – Personal, financial, property */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="personal-financial">
                                <SectionHeading id="personal-financial">
                                    Personal, Financial, and Property Information
                                </SectionHeading>
                                <Prose>
                                    Our company is a real estate services firm that may require you to
                                    submit certain information so we can help you in your situation. This
                                    information may include your contact info, information about your
                                    property, or even in some cases financial information needed to help
                                    us analyze your property and situation.
                                </Prose>
                                <Prose>
                                    This information is for our use only and will not be shared with
                                    outside parties unless required to help us help you solve your real
                                    estate situation.
                                </Prose>
                            </section>

                            {/* 10 – Changes */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="changes">
                                <SectionHeading id="changes">
                                    Changes to our Privacy Policy
                                </SectionHeading>
                                <Prose>
                                    If we decide to change our privacy policy, we will post those changes
                                    on this page. This online privacy policy applies only to information
                                    collected through our website and not to information collected offline.
                                </Prose>
                            </section>

                            {/* 11 – Contact */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="contact">
                                <SectionHeading id="contact">
                                    Contacting Us
                                </SectionHeading>
                                <Prose>
                                    If there are any questions regarding this privacy policy you may
                                    contact us using the information on our{" "}
                                    <a
                                        href="/contact-us/"
                                        className="text-[#f59e0b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded"
                                    >
                                        contact page
                                    </a>
                                    , or by calling us directly at{" "}
                                    <a
                                        href="tel:+19016218799"
                                        aria-label="Call Spencer Buys Houses at (901) 621-8799"
                                        className="text-[#f59e0b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded"
                                    >
                                        (901) 621-8799
                                    </a>
                                    .
                                </Prose>
                            </section>

                        </div>

                        {/* ── Footer notice ─────────────────────────────── */}
                        <div className="mt-12 rounded-2xl bg-white/[0.02] border border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-gray-500">
                                <p>
                                    Also see our{" "}
                                    <a
                                        href="/terms/"
                                        className="text-[#f59e0b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded"
                                    >
                                        Terms of Use
                                    </a>
                                    .
                                </p>
                                <p className="text-gray-600 mt-1">
                                    © 2026 Spencer Buys Houses. All rights reserved.
                                </p>
                            </div>
                            <a
                                href="/get-a-cash-offer-today/"
                                aria-label="Get your free cash offer from Spencer Buys Houses"
                                className="flex-shrink-0 inline-block px-6 py-2.5 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-[#0f0f23] text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]"
                            >
                                Get Your Cash Offer
                            </a>
                        </div>

                    </article>
                </div>
            </div>
        </main>
    )
}
