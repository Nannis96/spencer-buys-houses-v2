import type { Metadata } from "next"
import { Scale, ShieldCheck, FileText, AlertTriangle } from "lucide-react"
import { JsonLd } from "@/components/seo/json-ld"

const SITE_URL = "https://www.spencerbuyshouses.com"
const OG_IMAGE =
    "https://image-cdn.carrot.com/uploads/sites/81361/2025/03/Home-Page-Design1-2.png"

export const metadata: Metadata = {
    title: "Terms of Use",
    description:
        "Review the Terms of Use for Spencer Buys Houses (Volunteer Buyers GP). By using our website or services, you agree to these terms and conditions.",
    alternates: {
        canonical: "/terms/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: `${SITE_URL}/terms/`,
        siteName: "SpencerBuysHouses.com",
        title: "Terms of Use | Spencer Buys Houses",
        description:
            "Review the Terms of Use for Spencer Buys Houses (Volunteer Buyers GP). By using our website or services, you agree to these terms and conditions.",
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: "Spencer Buys Houses — Terms of Use",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Terms of Use | Spencer Buys Houses",
        description:
            "Review the Terms of Use for Spencer Buys Houses. By using our website or services, you agree to these terms.",
        images: [OG_IMAGE],
    },
}

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": `${SITE_URL}/terms/`,
            url: `${SITE_URL}/terms/`,
            name: "Terms of Use | Spencer Buys Houses",
            description:
                "Review the Terms of Use for Spencer Buys Houses (Volunteer Buyers GP). By using our website or services, you agree to these terms and conditions.",
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
                        name: "Terms of Use",
                        item: `${SITE_URL}/terms/`,
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
    { id: "certification", label: "1. Certification of User" },
    { id: "content-registration", label: "2. Content & Registration" },
    { id: "limitations", label: "3. Limitations on Use" },
    { id: "access-delays", label: "4. Access & Delays" },
    { id: "monitoring", label: "5. Monitoring" },
    { id: "warranties", label: "6. Warranties & Liability" },
    { id: "indemnification", label: "7. Indemnification" },
    { id: "privacy", label: "8. Privacy Policy" },
    { id: "marketing", label: "9. Unsolicited Marketing" },
    { id: "miscellaneous", label: "10. Miscellaneous" },
]

/* ─── Reusable prose helpers ────────────────────────────────────────────── */

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

function Caps({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4 font-medium uppercase tracking-wide border-l-2 border-[#f59e0b]/40 pl-4">
            {children}
        </p>
    )
}

function NumberedList({ items }: { items: string[] }) {
    return (
        <ol className="list-decimal list-outside ml-5 space-y-2 text-gray-400 text-sm md:text-base mb-4">
            {items.map((item, i) => (
                <li key={i} className="leading-relaxed pl-1">
                    {item}
                </li>
            ))}
        </ol>
    )
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function TermsOfUsePage() {
    return (
        <main className="bg-[#0f0f23] min-h-screen">
            <JsonLd data={jsonLd} />

            {/* ── Hero Banner ────────────────────────────────────────────── */}
            <section
                className="relative bg-[#0a0a1a] border-b border-white/10 pt-32 pb-16 overflow-hidden"
                aria-labelledby="terms-heading"
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
                                <span className="text-gray-400" aria-current="page">Terms of Use</span>
                            </li>
                        </ol>
                    </nav>

                    <div className="flex flex-col items-center text-center gap-4">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold uppercase tracking-wide">
                            <Scale className="h-4 w-4" aria-hidden="true" />
                            Legal
                        </span>
                        <h1 id="terms-heading" className="text-4xl md:text-5xl font-black text-white leading-tight">
                            Terms of Use
                        </h1>
                        <p className="text-gray-400 max-w-2xl text-base md:text-lg">
                            Please read these terms carefully before using any website, mobile app, or
                            service provided by <strong className="text-white">Spencer Buys Houses</strong>{" "}
                            (Volunteer Buyers GP).
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 mt-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <FileText className="h-4 w-4 text-[#f59e0b]" aria-hidden="true" />
                                <time dateTime="2026">Last updated: 2026</time>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <ShieldCheck className="h-4 w-4 text-[#f59e0b]" aria-hidden="true" />
                                Volunteer Buyers GP DBA Spencer Buys Houses
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Main Content ────────────────────────────────────────────── */}
            <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* ── Table of Contents (sticky on desktop) ──────────── */}
                    <aside className="hidden lg:block lg:w-64 xl:w-72 flex-shrink-0">
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
                            <AlertTriangle className="h-5 w-5 text-[#f59e0b] flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <div className="text-sm text-gray-300 leading-relaxed">
                                <strong className="text-white">Important:</strong> BY USING ANY WEBSITE, MOBILE APP
                                OR SERVICE OF Volunteer Buyers GP otherwise known as
                                Spencer Buys Houses DBA herein referred to as “The Company” (“Volunteer Buyers GP”)
                                YOU AGREE TO ABIDE BY THESE TERMS OF USE BETWEEN YOU AND Volunteer Buyers GP,
                                (Spencer Buys Houses DBA) WHICH INCLUDE THE REFERENCED PRIVACY POLICY (“AGREEMENT”).
                                IF YOU DO NOT AGREE TO BE BOUND BY THIS AGREEMENT, YOU ARE NOT AUTHORIZED TO USE ANY
                                Volunteer Buyers GP WEBSITE OR TO OBTAIN ANY SERVICES FROM Volunteer Buyers GP.
                            </div>
                        </div>

                        <Prose>
                            The company websites and mobile apps (collectively, “Websites”; and individually,
                            “Website”). The Company provides numerous services, including as referenced on
                            the Websites (“Services”).
                        </Prose>
                        <Prose>
                            The Company reserves the right, at its discretion, to revise the terms of this Agreement
                            and/or change, suspend, discontinue or modify any aspect of any Website. Such
                            modifications may include, without limitation, changes in content, in user priorities,
                            and discontinuance of functional aspects of any Website. Your continued use of any Website
                            after the posting of revisions to the Terms Of Use shall constitute your acceptance to be
                            bound by the express terms of any such revisions.
                        </Prose>

                        {/* ── Sections ──────────────────────────────────── */}

                        <div className="space-y-10 mt-10">

                            {/* 1 */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="certification">
                                <SectionHeading id="certification">
                                    1. Certification of User
                                </SectionHeading>
                                <Prose>
                                    By using or attempting to use this Website, you certify to The Company that you
                                    are a resident of the United States or otherwise authorized to conduct business
                                    in the United States, are at least 18 years of age or older and have the legal
                                    capacity to enter into this Agreement.
                                </Prose>
                            </section>

                            {/* 2 */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="content-registration">
                                <SectionHeading id="content-registration">
                                    2. Content and Registration
                                </SectionHeading>

                                <SubHeading>2.1 Website Content</SubHeading>
                                <Prose>
                                    he Website content shall mean all areas and aspects of the Website and Services
                                    including, without limitation, text, data, photos, graphics and/or video or any
                                    information whatsoever obtained through the Website (collectively referred to
                                    herein as “Information”), The Company’ computers or network and any subscription
                                    or software, product, service, or information provided by The Company.
                                </Prose>

                                <SubHeading>2.2 Vendor Content</SubHeading>
                                <Prose>
                                    The Company has entered into contractual relationships with certain vendors,
                                    sponsors, and advertisers of products or services (“Vendors”), pursuant to which
                                    The Company may link to or display information, advertisements, discounts, products,
                                    goods, or services offered by the Vendors (“Vendor Content”). Volunteer Buyers GP
                                    does not guarantee the availability or accuracy of any such Vendor Content or offers,
                                    nor does it endorse, guarantee nor insure any Vendor products or services.
                                </Prose>

                                <SubHeading>2.3 Limitation of Liability for Vendor Content</SubHeading>
                                <Prose>
                                    The Company shall not be held liable, directly or indirectly, for any loss or damage
                                    caused by your use of: (a) any external site linked to the Service, (b) Vendor
                                    Information, or (c) Vendor products or services. Statements made on the Service Area
                                    concerning the products or services of Volunteer Buyers GP do not constitute an offer,
                                    but are merely solicitations of an offer.
                                </Prose>

                                <SubHeading>2.4 Registration</SubHeading>
                                <Prose>
                                    ou may browse and view certain content on the Website without registering, but as a
                                    condition to using certain other aspects of the Website or accessing certain services,
                                    you may be required to register and select a user identification and password. You
                                    agree to maintain the confidentiality of such registration information, be the sole
                                    user of such registration and use your registration solely to access the Website and
                                    to obtain Services. The Company reserves the right to monitor your use of the
                                    registration and to discontinue you it at any time in Volunteer Buyers GP sole discretion.
                                    If you believe that your registration has been compromised, you must promptly change
                                    your registration information and notify us immediately.
                                </Prose>
                            </section>

                            {/* 3 */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="limitations">
                                <SectionHeading id="limitations">
                                    3. Limitations on Use and User Submissions
                                </SectionHeading>

                                <SubHeading>3.1 Copyright, Patent and Trademark Notice</SubHeading>
                                <Prose>
                                    All content of the Website provided by The Company, including, but not limited to,
                                    all text, photos, graphics, audio, software, webpage layouts or configurations,
                                    presentations in any format and/or video is copyrighted by The Company., or its
                                    affiliates or subsidiaries {" "}
                                    <strong className="text-gray-300">
                                        Copyright © 2013-2019 Volunteer Buyers GP. All rights reserved.
                                    </strong>
                                </Prose>
                                <Prose>
                                    No portion of the Content or other materials may be directly or indirectly copied,
                                    published, reproduced, modified, performed, displayed, sold, transmitted, published,
                                    broadcast, rewritten for broadcast or publication or redistributed in any medium,
                                    whether now known or hereafter created. The foregoing prohibition includes, but is
                                    not limited to “screen scraping” or “database scraping” to obtain lists of users or
                                    other Information. Nor may any portion of the Information or other materials be
                                    stored in a computer or distributed over any network, except that you may download
                                    or print one copy of pages strictly for personal and non-commercial use; however,
                                    any print out of any page of the Website or portion thereof, must include The Company’
                                    copyright notice. The Company and its associated logos, page headers, custom graphics,
                                    buttons, and other icons are service marks, trademarks, registered service marks,
                                    registered trademarks, and/or trade dress of The Company. All other content product
                                    names and company logos are trademarks of their respective owners. Neither these
                                    materials, nor any portion thereof, may be stored in a computer except as reasonably
                                    necessary for personal and non-commercial use; however, any print out of any page of
                                    the Website or portion thereof, must include The Company’ copyright notice and/or
                                    trademark registration notice as appropriate.
                                </Prose>

                                <SubHeading>3.2 Notice of Copyright Infringement</SubHeading>
                                <Prose>
                                    The Company respects the copyrights of others. The Companyreserves the right, but
                                    not the obligation, to terminate your license to use the Services if it determines
                                    in its sole and absolute discretion that you are involved in infringing activity,
                                    including alleged acts of first-time or repeat infringement, regardless of whether
                                    the material or activity is ultimately determined to be infringing. The Company has
                                    implemented procedures for receiving written notification of claimed infringements.
                                    If you believe that your copyrighted work has been reproduced on the Website in a
                                    way that constitutes copyright infringement you may notify us by e-mail at {" "}
                                    <a
                                        href="mailto:marketing@volunteerbuyers.com"
                                        className="text-[#f59e0b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded"
                                    >
                                        marketing@volunteerbuyers.com
                                    </a>
                                    .
                                </Prose>

                                <SubHeading>3.3 Restricted Use</SubHeading>
                                <Prose>
                                    You agree to use the Service Area and Information for lawful purposes only. You
                                    agree not to post or transmit any information through the Service Area which: (a)
                                    infringes any patent, trademark or copyright rights of others or violates their
                                    privacy or publicity rights, (b) is unlawful, threatening, abusive, defamatory,
                                    libelous, vulgar, obscene, profane, indecent or otherwise objectionable, or (c) is
                                    protected by patent, copyright, trademark or other proprietary right without the
                                    express permission of the owner of such right. You shall be solely liable for any
                                    damages resulting from any infringement of patent, copyright, trademark or other
                                    proprietary rights, or any other harm resulting from your use of the Service.
                                </Prose>

                                <SubHeading>3.4 Your Submission of Messages</SubHeading>
                                <Prose>
                                    Your Submission of Messages – You hereby grant to Volunteer Buyers GP a worldwide,
                                    royalty-free, perpetual, irrevocable, non-exclusive right and license to use,
                                    reproduce, modify, adapt, publish, translate, create derivative works from, distribute,
                                    perform, display and use for any purpose all messages or other materials posted by
                                    you on the Service or any e-mail sent by you to Volunteer Buyers GP (in whole or in
                                    part) and to incorporate any such messages or other materials or e-mails in any form,
                                    into other media or technology whether now known or hereafter developed.
                                </Prose>

                                <SubHeading>3.5 Public Messages</SubHeading>
                                <Prose>
                                    Public messages – All electronic forums made available to users of the Service are
                                    the sole property of Volunteer Buyers GP and are not a public forum. You understand
                                    and acknowledge that all information, data, files, software, music, sound, photographs,
                                    graphics, video, messages or other materials posted by any person or entity other
                                    than Volunteer Buyers GP (“Third-Party Content”), whether publicly posted or privately
                                    transmitted, are the sole responsibility of the person from which such Third-Party
                                    Content originated. You assume total liability for all Third-Party Content that you
                                    upload, post, email or otherwise transmit via the Service. Volunteer Buyers GP assumes
                                    no liability for any such Third-Party Content. You agree not to use the Service to:
                                </Prose>
                                <NumberedList
                                    items={[
                                        "Upload, post, e-mail or otherwise transmit any Third-Party Content that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another’s privacy, or hateful, or is racially, ethnically or otherwise objectionable;",
                                        "Harm minors in any way;",
                                        "Impersonate any person or entity, including, but not limited to, an official or representative of Volunteer Buyers GP, or falsely state or otherwise misrepresent your affiliation with a person or entity;",
                                        "orge headers or otherwise manipulate identifiers to disguise the origin of any Content transmitted through the Service;",
                                        "Upload, post, e-mail or otherwise transmit any Third-Party Content that you do not have a right to transmit under any law or under contractual or fiduciary relationships (such as inside information, proprietary and confidential information learned or disclosed as part of employment relationships or under nondisclosure agreements);",
                                        "Upload, post, e-mail or otherwise transmit any Third-Party Content that infringes any patent, trademark, trade secret, copyright or other proprietary rights of any party;",
                                        "Upload, post, e-mail or otherwise transmit any unsolicited or unauthorized advertising, promotional materials, “junk mail,” “spam,” “chain letters,” “pyramid schemes,” or any other form of solicitation;",
                                        "Upload, post, e-mail or otherwise transmit any material that contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment or network;",
                                        "Disrupt the normal flow of dialogue, cause a screen to “scroll” faster than other users of the Service are able to type, or otherwise act in a manner that negatively affects other users’ ability to engage in real time exchanges;",
                                        "Interfere with or disrupt the Service or servers or networks connected to the Service, or disobey any requirements, procedures, policies or regulations of networks connected to the Service;",
                                        "Intentionally or unintentionally violate any applicable local, state, national or international law, including, but not limited to, regulations promulgated by the U.S. Securities and Exchange Commission, any rules of any national or other securities exchange, including, without limitation, the New York Stock Exchange, the American Stock Exchange or the NASDAQ, and any regulations having the force of law;",
                                        "“stalk” or otherwise harass another; or",
                                        "Collect or store personal data about other users.",
                                    ]}
                                />
                                <Prose>
                                    You acknowledge that The Company does not pre-screen Third-Party Content, but that
                                    The Company and its designees shall have the right (but not the obligation) in their
                                    sole discretion to refuse or move any Third-Party Content that is available via the
                                    Service. Without limiting the foregoing, The Company and its designees shall have
                                    the right to remove any Third-Party Content that violates this Agreement or is
                                    otherwise objectionable. You agree that you must evaluate, and bear all risks associated
                                    with, the use of any Third-Party Content, including any reliance on the accuracy,
                                    completeness, or usefulness of such Third-Party Content.
                                </Prose>
                                <Prose>
                                    You acknowledge and agree that The Company may preserve Third-Party Content and may
                                    also disclose Third-Party Content if required to do so by law or in the good faith
                                    belief that such preservation or disclosure is reasonably necessary to: (a) comply
                                    with legal process; (b) enforce this Agreement; (c) respond to claims that any
                                    Third-Party Content violates the rights of other third-parties; or (d) protect the
                                    rights, property, or personal safety of Volunteer Buyers GP, its users, or the public.
                                </Prose>

                                <SubHeading>3.6 Linking</SubHeading>
                                <Prose>
                                    Without the prior written consent of The Company, you may not use any of The Company
                                    proprietary logos, marks, or other distinctive graphics, video, or audio material in
                                    your links. You may not link to the Website or to any page thereof or engage in the
                                    practice of “deep linking” in any manner reasonably likely to: (a) imply affiliation
                                    with or endorsement or sponsorship of or by The Company; (b) cause confusion, mistake,
                                    or deception; (c) dilute The Company’ trademarks or service marks; (d) otherwise violate
                                    state or federal law; or (e) constitute improper disparagement or disclosure concerning
                                    The Companyor any of its respective affiliates, or their respective officers, directors,
                                    agents, franchises, or Vendors. You may not frame or otherwise incorporate into another
                                    Website any of the Information or other materials on this Website without the prior
                                    written consent of Volunteer Buyers GP.
                                </Prose>
                            </section>

                            {/* 4 */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="access-delays">
                                <SectionHeading id="access-delays">
                                    4. Access and Delays in Services
                                </SectionHeading>
                                <Prose>
                                    Volunteer Buyers GP, its affiliates, subsidiaries, and Vendors shall have no
                                    responsibility to provide you access to the Website. Further, The Company, its
                                    affiliates, subsidiaries, and Vendors shall not be liable to you for any loss
                                    or liability resulting, directly or indirectly, from delays, inaccuracies,
                                    errors, omissions or interruptions of the Service for any reason, including,
                                    without limitation, due to electronic or mechanical equipment failures, telephone
                                    interconnect problems, defects, weather, strikes, walkouts, fire, acts of God,
                                    riots, armed conflicts, acts of war, acts of terrorism, or to other like causes.
                                </Prose>
                            </section>

                            {/* 5 */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="monitoring">
                                <SectionHeading id="monitoring">
                                    5. Monitoring by Volunteer Buyers GP
                                </SectionHeading>
                                <Prose>
                                    You acknowledge that The Company reserves the right to, and may from time to
                                    time, monitor for all lawful purposes any and all Third-Party Content transmitted
                                    or received through the Service. During monitoring, information may be examined,
                                    recorded, copied, and used for authorized purposes. All Third-Party Content,
                                    including personal information, placed on or sent over the Service may be monitored.
                                    Use of the Service, authorized or unauthorized, constitutes consent to such
                                    monitoring and to the other terms of this Agreement.
                                </Prose>
                            </section>

                            {/* 6 */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="warranties">
                                <SectionHeading id="warranties">
                                    6. Representations, Warranties and Limitation of Liability
                                </SectionHeading>

                                <SubHeading>6.1 General Disclaimer and Limited Warranty</SubHeading>
                                <Prose>
                                    General Disclaimer and Limited Warranty – You acknowledge that certain aspects of
                                    the Information and/or Vendor Information and links provided through the Website
                                    are compiled from sources which may be beyond the control of The Company. Though
                                    such Information and links are recognized by the parties to be generally reliable,
                                    the parties acknowledge that inaccuracies may occur. Volunteer Buyers GP, its
                                    licensors and Vendors do not warrant the accuracy or suitability of any such
                                    Information. Neither The Company nor its licensors or Vendors represent or endorse
                                    the accuracy or reliability of the Information distributed through the Service.
                                </Prose>
                                <Caps>
                                    FOR THIS REASON, YOU ACKNOWLEDGE THAT THE WEBSITE IS PROVIDED TO YOU ON AN “AS IS
                                    WITH ALL FAULTS BASIS.” Volunteer Buyers GP AND ITS LICENSORS AND VENDORS EXPRESSLY
                                    DISCLAIM ANY AND ALL WARRANTIES, WHETHER EXPRESS, ORAL, IMPLIED, STATUTORY OR
                                    OTHERWISE, INCLUDING ANY IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A
                                    PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, OR ANY WARRANTIES ARISING BY VIRTUE OF
                                    CUSTOM OF TRADE OR COURSE OF DEALING. FURTHER, Volunteer Buyers GP AND ITS LICENSORS
                                    AND VENDORS NEITHER REPRESENT NOR WARRANT THAT THE WEBSITE WILL MEET YOUR REQUIREMENTS
                                    OR IS SUITABLE FOR YOUR NEEDS OR WILL ACHIEVE ANY DESIRED RESULT.
                                </Caps>

                                <SubHeading>6.2 User Responsibility</SubHeading>
                                <Prose>
                                    You assume all risk of errors and/or omissions in the Website, including the transmission
                                    or translation of data. You assume full responsibility for implementing sufficient
                                    procedures and checks to satisfy your requirements for the accuracy and suitability of the
                                    Website, including the Information, and for maintaining any means which you may
                                    require for the reconstruction of lost data or subsequent manipulations or analyses
                                    of the Information provided under this Agreement.
                                </Prose>

                                <SubHeading>6.3 Viruses</SubHeading>
                                <Caps>
                                    YOU ACKNOWLEDGE AND AGREE THAT Volunteer Buyers GP USES REASONABLE EFFORTS TO ASSURE
                                    THAT NO VIRUSES OR PROGRAMS WITH SIMILAR FUNCTIONS OPERATE ON, OR ARE PASSED THROUGH,
                                    THE WEBSITE OR THE INFORMATION. HOWEVER, YOU HEREBY ASSUME ALL RESPONSIBILITY (AND
                                    THEREBY HOLD The Company HARMLESS), BY WHATEVER MEANS YOU DEEM MOST APPROPRIATE FOR
                                    YOUR NEEDS, FOR DETECTING AND ERADICATING ANY VIRUS OR PROGRAM WITH A SIMILAR
                                    FUNCTION.
                                </Caps>

                                <SubHeading>6.4 Limitation of Liability</SubHeading>
                                <Caps>
                                    LIMITATION OF LIABILITY – YOU AGREE THAT The Company AND ITS AFFILIATES, SUBSIDIARIES,
                                    AND VENDORS SHALL NOT IN ANY EVENT BE LIABLE FOR ANY SPECIAL, INCIDENTAL OR CONSEQUENTIAL
                                    DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE SERVICE FOR ANY PURPOSE
                                    WHATSOEVER. IF THE ABOVE LIMITATIONS OF LIABILITIES SHOULD FAIL IN THEIR ESSENTIAL
                                    PURPOSE FOR ANY REASON, SUCH LIABILITY IS AND SHALL BE LIMITED TO A SUM EQUAL IN
                                    AMOUNT TO TEN (10%) PERCENT OF THE SUMS PAID TO The Company BY YOU UNDER THE TERMS
                                    OF THIS AGREEMENT OR $100.00, WHICHEVER IS GREATER, AS LIQUIDATED DAMAGES AND NOT
                                    AS A PENALTY EVEN IF Volunteer Buyers GP OR ITS AFFILIATES HAVE BEEN ADVISED OF THE
                                    POSSIBILITY OF SUCH DAMAGES. THIS LIABILITY, IF ANY, SHALL BE COMPLETE AND EXCLUSIVE.
                                    THE PROVISIONS CONTAINED IN THIS SECTION 6 SHALL SURVIVE TERMINATION OF THIS AGREEMENT.
                                </Caps>

                                <SubHeading>6.5 FTC Notice</SubHeading>
                                <Caps>
                                    SOME STATES DO NOT ALLOW LIMITATIONS ON HOW LONG AN IMPLIED WARRANTY LASTS, SO THE
                                    ABOVE LIMITATION MAY NOT APPLY TO YOU. SOME STATES DO NOT ALLOW THE EXCLUSION OR
                                    LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION OR
                                    EXCLUSION MAY NOT APPLY TO YOU. THIS WARRANTY GIVES YOU SPECIFIC LEGAL RIGHTS, AND
                                    YOU MAY ALSO HAVE OTHER RIGHTS WHICH VARY FROM STATE TO STATE.
                                </Caps>
                            </section>

                            {/* 7 */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="indemnification">
                                <SectionHeading id="indemnification">
                                    7. Indemnification
                                </SectionHeading>
                                <Caps>
                                    YOU SHALL RELEASE, DISCHARGE, AND RELINQUISH, DEFEND INDEMNIFY AND HOLD HARMLESS
                                    Volunteer Buyers GP AND ITS AFFILIATES, SUBSIDIARIES, AND VENDORS, AND EACH OF THEIR
                                    MEMBERS, SHAREHOLDERS, DIRECTORS, EMPLOYEES, AGENTS, REPRESENTATIVES, VENDORS, AND
                                    CONTRACTORS OF WHATEVER TIER (COLLECTIVELY, THE INDEMNITEES) FROM AND AGAINST ALL
                                    LOSS, CLAIMS, DEMANDS AND CAUSES OF ACTION OF WHATEVER KIND OR CHARACTER, INCLUDING
                                    WITHOUT LIMITATION COSTS, ATTORNEYS’ FEES AND EXPENSES INCURRED IN CONNECTION WITH
                                    ANY CLAIM BROUGHT BY ANY PERSON(S) OR ENTITY(IES) ARISING FROM, IN CONNECTION WITH,
                                    OR RELATING TO, YOUR ACCESS AND USE OF THE WEBSITE, INCLUDING YOUR USE OF THE
                                    INFORMATION OBTAINED THROUGH THE WEBSITE. THE OBLIGATIONS TO RELEASE, DEFEND AND TO
                                    INDEMNIFY CONTAINED IN THIS SECTION SHALL APPLY EVEN IF CAUSED, IN WHOLE OR IN PART,
                                    BY THE JOINT, SOLE, GROSS OR CONCURRENT NEGLIGENCE, STRICT LIABILITY, CONTRACTUAL
                                    LIABILITIES OF THIRD PARTIES, OR OTHER FAULT, WHETHER PASSIVE OR ACTIVE, OF ANY
                                    PERSON OR ENTITY, INCLUDING BUT NOT LIMITED TO THE INDEMNITEES, JOINTLY OR SEVERALLY.
                                    YOU SHALL COOPERATE AS FULLY AS REASONABLY REQUIRED IN THE DEFENSE OF ANY SUCH CLAIM.
                                </Caps>
                            </section>

                            {/* 8 */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="privacy">
                                <SectionHeading id="privacy">
                                    8. Privacy Policy
                                </SectionHeading>
                                <Prose>
                                    These Terms of Use include our{" "}
                                    <a href="/privacy/" className="text-[#f59e0b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded">
                                        Privacy Policy
                                    </a>{" "}
                                    as contained on our website, which is incorporated fully herein.
                                </Prose>
                            </section>

                            {/* 9 */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="marketing">
                                <SectionHeading id="marketing">
                                    9. Unsolicited Marketing
                                </SectionHeading>

                                <SubHeading>9.1 Unsolicited Marketing</SubHeading>
                                <Prose>
                                    The Company supports responsible e-commerce. Volunteer Buyers GP does not authorize
                                    anyone to use the Service to broadcast, distribute, transmit or retransmit unsolicited
                                    commercial, non-commercial, bulk, or junk electronic mail, including email ("SPAM").
                                </Prose>

                                <SubHeading>9.2 Electronic Direct Marketing Programs</SubHeading>
                                <Prose>
                                    The Company may develop and participate in electronic direct marketing to users of the
                                    Website who elect to receive electronic mail of specific interest to them. In keeping
                                    with this Agreement, The Company does not forward the names and addresses (electronic
                                    or otherwise) to third parties. Advertisers who participate in The Company’ electronic
                                    direct marketing programs identify the category of users who would most likely be
                                    interested in their goods and services. The Company then forwards the advertisements to
                                    users who have elected to receive that category of electronic mail. Users may elect to
                                    not receive similar electronic mail by requesting that their e-mail address be removed
                                    from the mailing list by selecting the appropriate option included with each e-mail
                                    advertisement sent by The Company. In addition, users may elect to be removed from such
                                    lists at any time by sending a message to the System administrator at{" "}
                                    <a
                                        href="mailto:admin@VolunteerBuyers.com"
                                        className="text-[#f59e0b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded"
                                    >
                                        admin@VolunteerBuyers.com
                                    </a>
                                    .
                                </Prose>

                                <SubHeading>9.3 Reporting SPAM</SubHeading>
                                <Prose>
                                    Users who receive SPAM or any threatening or offensive e-mail through the Services may
                                    report it to The Company by forwarding the unedited message with the full message header
                                    to{" "}
                                    <a
                                        href="mailto:admin@VolunteerBuyers.com"
                                        className="text-[#f59e0b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded"
                                    >
                                        admin@VolunteerBuyers.com
                                    </a>
                                    .
                                </Prose>

                                <SubHeading>9.4 Reservation of Rights</SubHeading>
                                <Prose>
                                    The Company reserves the right to take all legal or technical steps that it deems necessary
                                    to prevent the broadcast, distribution, transmission, or retransmission over the Service of
                                    SPAM, junk e-mail, threatening or offensive e-mail, or e-mail otherwise determined by The
                                    Company, in its sole discretion, to be objectionable. The Company reserves the right to
                                    suspend or terminate any person or entity’s use of or access to the Service if it determines,
                                    in its sole and absolute discretion, that such person has used or intends to use the Service
                                    in violation of this policy. A failure of Volunteer Buyers GP to exercise any right provided
                                    for herein shall not be deemed to be a waiver of such right.
                                </Prose>
                            </section>

                            {/* 10 */}
                            <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8" aria-labelledby="miscellaneous">
                                <SectionHeading id="miscellaneous">
                                    10. Miscellaneous
                                </SectionHeading>

                                <SubHeading>10.1 Governing Law; Limitations; Venue</SubHeading>
                                <Prose>
                                    The laws of the State of TN, excluding any rule or principle that would refer to and apply the
                                    substantive law of another state or jurisdiction, shall govern this Agreement. To the extent
                                    allowed by applicable law, any claims or causes of action arising from or relating to your
                                    access and use of the Service as contemplated by this Agreement must be instituted within two
                                    (2) years from the date upon which such claim or cause arose. Further, any such claim or cause
                                    of action shall be brought EXCLUSIVELY in the state or federal courts located in Shebly County,
                                    TN, and you agree to submit to the exclusive personal jurisdiction of such courts and hereby
                                    appoint the Secretary of State of TN as your agent for service of process. You agree to waive
                                    any objection that the state or federal courts of Shelby County, TN, are an inconvenient forum.
                                </Prose>

                                <SubHeading>10.2 Assignments</SubHeading>
                                <Prose>
                                    You may not assign any of your rights, obligations, privileges, or performance hereunder without
                                    the prior written consent of The Company. Any assignment other than as provided for in this
                                    Section 10.2 shall be null and void.
                                </Prose>

                                <SubHeading>10.3 Severability</SubHeading>
                                <Prose>
                                    If any provision of this Agreement is found to be unlawful or unenforceable in any respect, the
                                    court shall reform such provision so as to render it enforceable (or, if it is not possible to
                                    reform such provision so as to make it enforceable, then delete such provision); and, as
                                    so reformed or modified, fully enforce this Agreement.
                                </Prose>

                                <SubHeading>10.4 Connectivity Charges</SubHeading>
                                <Prose>
                                    You understand that your access to the Website and use of the Services may incur third party
                                    connectivity charges. You understand that you are responsibly for any such charges that your
                                    use incurs, including from your cell phone or internet service provider, including fees
                                    related to text messaging and data fees.
                                </Prose>

                                <SubHeading>10.5 Termination</SubHeading>
                                <Prose>
                                    The Company may terminate or suspend your use of the Website for any reason. Termination or
                                    cancellation of your use of the Website shall not affect any right or relief to which The
                                    Company may be entitled, at law or in equity. Upon termination of this Agreement, all rights
                                    granted to you will terminate and revert to The Company.
                                </Prose>
                                pnpm run dev
                                <SubHeading>10.6 Notice</SubHeading>
                                <Prose>
                                    Official correspondence must be sent via postal mail to:{" "}
                                    <strong className="text-gray-300">
                                        Volunteer Buyers GP. 111 S Highland Street Suite 179 Memphis, TN 38111.
                                    </strong>
                                </Prose>

                                <SubHeading>
                                    10.7 Notice Regarding Electronic Commercial Service for California
                                    Users
                                </SubHeading>
                                <Prose>
                                    Pursuant to California Civil Code Section 1789.3, California Site users are entitled to the
                                    following specific consumer rights notice: The Complaint Assistance Unit of the Division of
                                    consumer Services of the California Department of consumer Affairs may be contacted in writing
                                    at 1625 North Market Blvd., Sacramento, CA 95834, or by telephone at 916-445-1254 or 800-952-5210.
                                </Prose>

                                <SubHeading>10.8 Entire Agreement</SubHeading>
                                <Prose>
                                    This Agreement is complete and effective at the time you begin use of the Service. This
                                    Agreement constitutes the entire agreement between the parties, and no other agreement,
                                    written or oral, exists between you and Volunteer Buyers GP. In the event that any
                                    inconsistencies exist between this Agreement and any future published terms or understanding,
                                    the last published Agreement or terms of use shall control.
                                </Prose>
                            </section>

                        </div>

                        {/* ── Footer notice ─────────────────────────────── */}
                        <div className="mt-12 rounded-2xl bg-white/[0.02] border border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-gray-500">
                                ANY RIGHTS NOT EXPRESSLY GRANTED HEREIN ARE RESERVED BY Volunteer Buyers GP.
                                <br />
                                <span className="text-gray-600">
                                    © 2023 Volunteer Buyers GP. All rights reserved.
                                </span>
                            </p>
                            <a
                                href="/get-a-cash-offer-today/"
                                className="flex-shrink-0 inline-block px-6 py-2.5 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-[#0f0f23] text-sm font-bold transition-colors"
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
