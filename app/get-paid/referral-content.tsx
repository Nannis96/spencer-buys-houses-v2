/**
 * ReferralContent — Server Component
 *
 * All static content is rendered server-side for optimal SEO.
 * Interactive leaves (form) are marked "use client" inside their own files.
 */

import { LeadFormConsent } from "@/components/forms/lead-form-consent"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { CallNowBanner } from "@/components/sections/call-now-banner"
import { CallButton } from "@/components/ui/call-button"
import { CTAButton } from "@/components/ui/cta-button"
import {
    Share2,
    Handshake,
    DollarSign,
    CheckCircle2,
    Zap,
    BadgeDollarSign,
    ShieldCheck,
    Star,
    Quote,
    ArrowRight,
} from "lucide-react"
import Image from "next/image"

/* ─── Referral process steps ────────────────────────────────────────────── */

const steps = [
    {
        icon: Share2,
        step: "01",
        title: "Refer Someone",
        description:
            "Share your unique referral or simply tell a friend about us. It takes less than a minute — just send us their details and we'll handle the rest.",
    },
    {
        icon: Handshake,
        step: "02",
        title: "We Close the Deal",
        description:
            "Once your referral decides to sell their home to us, we take care of everything — from the first call to paperwork and closing.",
    },
    {
        icon: DollarSign,
        step: "03",
        title: "You Get Paid",
        description:
            "You'll receive your cash reward as soon as we close the deal. Quick, simple, and no strings attached!",
    },
]

/* ─── Why refer benefits ─────────────────────────────────────────────────── */

const benefits = [
    {
        icon: Zap,
        title: "Fast & Hassle-Free Closings",
        description:
            "No waiting around. We buy houses as-is and close on your referral's timeline — often in as little as 7 days.",
    },
    {
        icon: BadgeDollarSign,
        title: "No Fees. No Commissions.",
        description:
            "Your referral won't pay hidden costs or agent commissions. And neither will you. Zero out-of-pocket for everyone.",
    },
    {
        icon: ShieldCheck,
        title: "Trusted Local Buyers",
        description:
            "Spencer Buys Houses is a well-established, family-owned company with a proven track record in the Memphis community.",
    },
]

/* ─── Featured testimonial ───────────────────────────────────────────────── */

function FeaturedTestimonial() {
    return (
        <div className="relative rounded-2xl bg-[var(--color-background)]/5 border border-[var(--color-primary)]/60 p-8 md:p-10">
            {/* Gold accent bar */}
            <div className="absolute top-0 left-8 w-12 h-1 rounded-full bg-[var(--color-text-yellow)]" />

            <div className="flex items-center gap-1 mb-6 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" fill="#f59e0b" stroke="none" aria-hidden="true" />
                ))}
                <span className="ml-2 text-xs font-semibold text-[#f59e0b]">5.0</span>
            </div>

            <Quote className="h-8 w-8 text-[var(--color-text-yellow)]/30 mb-4" aria-hidden="true" />

            <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-8">
                I had an amazing experience working with Spencer Buys Houses! From start to finish, the process was smooth,
                transparent, and stress-free. Spencer and his team were professional, honest, and extremely knowledgeable.
                If you&apos;re looking to sell your house fast without the hassle of repairs, showings, or agent fees, I
                highly recommend Spencer Buys Houses. Their customer service is top-notch, and they truly care about
                helping homeowners.
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[var(--color-primary-dark)]/20 flex items-center justify-center text-[var(--color-primary-dark)] font-bold text-lg">
                        C
                    </div>
                    <div>
                        <p className="font-bold text-white">Christina Josephine</p>
                        <p className="text-sm text-gray-500">Memphis, TN</p>
                    </div>
                </div>
                <a
                    href="https://g.co/kgs/spencerbuyshouses"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary-dark)] hover:text-[var(--color-primary-dark)]/60 transition-colors"
                    aria-label="Read the full review on Google"
                >
                    Read Full Review on Google
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
            </div>
        </div>
    )
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export function ReferralContent() {
    return (
        <>
            {/* ───────── 1. HERO + FORM ───────── */}
            <section
                className="relative bg-[var(--color-background)] pt-28 md:pt-44 pb-16 lg:pb-24 overflow-hidden"
                aria-labelledby="referral-hero-heading"
            >
                {/* Ambient glow */}
                <div
                    aria-hidden="true"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--color-text-yellow)]/5 rounded-full blur-3xl"
                />

                <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">

                        {/* ── Left copy ── */}
                        <div>
                            <p className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-6 uppercase tracking-wide">
                                Referral Program
                            </p>

                            <h1
                                id="referral-hero-heading"
                                className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white"
                            >
                                Get Paid for{" "}
                                <span className="text-[var(--color-primary-dark)]">Referring a Friend!</span>
                            </h1>

                            <p className="mt-6 text-lg md:text-xl text-gray-300 font-medium">
                                Know Someone Looking to Sell Their Home Fast in Memphis?
                            </p>

                            <p className="mt-4 text-gray-400 leading-relaxed max-w-xl">
                                Refer them to Spencer Buys Houses and earn cash for every successful referral. Simply share
                                their details and we&apos;ll handle everything from the first call to closing — you just
                                collect your reward.
                            </p>

                            <ul className="mt-6 space-y-3" aria-label="Referral program highlights">
                                {[
                                    "Earn cash the moment we close the deal",
                                    "No fees, no commissions for you or your referral",
                                    "We handle all paperwork from start to finish",
                                ].map((point) => (
                                    <li key={point} className="flex items-center gap-3 ">
                                        <CheckCircle2 className="h-5 w-5 text-[var(--color-primary)] shrink-0" aria-hidden="true" />
                                        <span className="text-[var(--color-text-white)]">{point}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Mobile form */}
                            <div className="lg:hidden mt-8">
                                <LeadFormConsent />
                            </div>
                        </div>

                        {/* ── Right form — desktop ── */}
                        <div className="hidden lg:block">
                            <LeadFormConsent />
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────── 2. HOW OUR REFERRAL PROCESS WORKS ───────── */}
            <section
                id="referral-process"
                className="bg-[var(--color-background)] py-10 lg:py-14"
                aria-labelledby="referral-process-heading"
            >
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-4 uppercase tracking-wide">
                            How It Works
                        </span>
                        <h2
                            id="referral-process-heading"
                            className="text-3xl md:text-4xl font-bold text-white mb-4"
                        >
                            3 Simple Steps to {" "}
                            <span className="text-[var(--color-primary-dark)]">Start Earning</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Our referral program is designed to be effortless. Share someone&apos;s details and we take
                            care of everything else.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connector line (desktop) */}

                        {steps.map(({ icon: Icon, step, title, description }) => (
                            <div
                                key={step}
                                className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--color-primary-dark)]/30 transition-colors group"
                            >
                                <div
                                    aria-hidden="true"
                                    className="hidden md:block absolute top-10 left-1/8 right-1/8 h-px bg-gradient-to-r from-transparent via-[var(--color-primary-dark)]/30 to-transparent"
                                />
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary-dark)] text-[var(--color-background)] text-xs font-black">
                                    {step}
                                </div>
                                <div className="mt-4 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary-dark)]/10 group-hover:bg-[var(--color-primary-dark)]/20 transition-colors">
                                    <Icon className="h-8 w-8 text-[var(--color-primary-dark)]" aria-hidden="true" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <CTAButton href="#top">Get Your Free Cash Offer</CTAButton>
                    </div>
                </div>
            </section>

            {/* ───────── 3. WHY REFER TO SPENCER BUYS HOUSES ───────── */}
            <section
                id="why-refer"
                className="bg-[var(--color-background)] py-10 lg:py-14s"
                aria-labelledby="why-refer-heading"
            >
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left — copy */}
                        <div>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-6 uppercase tracking-wide">
                                Why Choose Us
                            </span>
                            <h2
                                id="why-refer-heading"
                                className="text-3xl md:text-4xl font-bold text-white mb-6"
                            >
                                Why Refer to{" "}
                                <span className="text-[var(--color-primary-dark)]">Spencer Buys Houses?</span>
                            </h2>

                            <p className="text-gray-400 leading-relaxed mb-10">
                                It&apos;s easy to help someone sell their home with our referral program. Simply share
                                their details and we will take care of the rest — ensuring a seamless experience from
                                the first call to close. This is an effortless way to earn extra cash while helping
                                someone sell their Memphis home quickly.
                            </p>

                            <ul className="space-y-6" aria-label="Benefits of the referral program">
                                {benefits.map(({ icon: Icon, title, description }) => (
                                    <li key={title} className="flex items-start gap-4">
                                        <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-dark)]/20">
                                            <Icon className="h-6 w-6 text-[var(--color-primary-dark)]" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white mb-1">{title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right — image */}
                        <div className="flex justify-center lg:justify-end order-first lg:order-last">
                            <div className="w-full overflow-hidden rounded-2xl shadow-md border border-white/10">
                                <div className="relative w-full aspect-[4/3]">
                                    <Image
                                        src="/houses/Houses_20.png"
                                        alt="Overhead view of a sunny suburban neighborhood in Memphis, TN"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 600px"
                                        className="object-cover"
                                    />
                                    {/* Overlay badge */}
                                    <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-[var(--color-background)]/80 backdrop-blur-sm border border-white/10 p-4 flex items-center gap-3">
                                        <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-dark)]">
                                            <DollarSign className="h-5 w-5 text-[var(--color-background)]" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-sm">Start Referring &amp; Earning Today</p>
                                            <p className="text-gray-400 text-xs">Cash paid at closing — no waiting</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────── 4. TESTIMONIALS ───────── */}
            <section
                id="referral-testimonials"
                className="bg-[var(--color-background)] py-10 lg:py-14"
                aria-labelledby="testimonials-heading"
            >
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-4 uppercase tracking-wide">
                            Real Reviews
                        </span>
                        <h2
                            id="testimonials-heading"
                            className="text-3xl md:text-4xl font-bold text-white mb-4"
                        >
                            What Memphis Homeowners Are Saying
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Real stories from real people who trusted Spencer Buys Houses to deliver a fast, fair, and
                            stress-free experience.
                        </p>
                    </div>

                    <FeaturedTestimonial />
                </div>
            </section>

            {/* ───────── 5. CTA BANNER ───────── */}
            <CallNowBanner
                badge="Start Earning Today"
                heading="Know Someone Who Needs to Sell Fast?"
                description="Refer them now and earn cash when we close the deal. No fees, no hassle — just a reward for helping a friend."
                secondaryLabel="Submit a Referral"
                secondaryHref="#top"
                headingId="referral-cta-heading"
            />

            {/* ───────── 6. SECOND FORM ───────── */}
            <section
                id="referral-form"
                className="bg-[var(--color-background)] py-20 lg:py-28"
                aria-labelledby="referral-form-heading"
            >
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        {/* Left copy */}
                        <div>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-6 uppercase tracking-wide">
                                Submit a Referral
                            </span>
                            <h2
                                id="referral-form-heading"
                                className="text-3xl md:text-4xl font-bold text-white mb-6"
                            >
                                Contact Us to{" "}
                                <span className="text-[#f59e0b]">Send Your Referral</span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                Fill in the details of the person you&apos;d like to refer and our team will reach out
                                to them promptly. We&apos;ll keep you in the loop every step of the way, and you&apos;ll
                                get paid as soon as the deal closes.
                            </p>

                            <ul className="mt-8 space-y-3" aria-label="Referral promise points">
                                {[
                                    "We contact your referral within 24 hours",
                                    "You get paid at closing — no delays",
                                    "Your referral pays zero fees or commissions",
                                ].map((point) => (
                                    <li key={point} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-[var(--color-primary)] shrink-0" aria-hidden="true" />
                                        <span className="text-gray-300 text-sm">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right form */}
                        <div>
                            <LeadFormConsent />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
