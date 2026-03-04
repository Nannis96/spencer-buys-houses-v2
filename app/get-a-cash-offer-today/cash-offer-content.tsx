/**
 * CashOfferContent — Server Component
 *
 * Rendering this as a server component means ALL static content (headings,
 * body copy, semantic HTML) is included in the initial HTML payload that
 * search engine crawlers receive — optimal for SEO.
 *
 * Only interactive/animated leaves are marked "use client":
 *   - LeadFormConsent        (form state + validation)
 *   - AnimatedBenefitCards   (framer-motion entrance animations + icon data)
 *   - AnimatedTestimonialCards
 */

import { LeadFormConsent } from "@/components/forms/lead-form-consent"
import { AnimatedBenefitCards } from "./animated-cards"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { CallNowBanner } from "@/components/sections/call-now-banner"
import { CheckCircle2 } from "lucide-react"
import Image from "next/image"

export function CashOfferContent() {
    return (
        <>
            {/* ───────── 1. HERO + FORM ───────── */}
            <section
                className="relative bg-[#0f0f23] pt-28 md:pt-44 pb-16 lg:pb-24 overflow-hidden"
                aria-labelledby="hero-heading"
            >
                {/* Ambient glow — decorative */}
                <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#f59e0b]/5 rounded-full blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
                        {/* Left copy */}
                        <div>
                            <p className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-6 uppercase tracking-wide">
                                Sell Without An Agent
                            </p>

                            <h1 id="hero-heading" className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white">
                                Get A Cash Offer Today{" "}
                                <span className="text-[#f59e0b]">Without An Agent!</span>
                            </h1>

                            <p className="mt-6 text-lg md:text-xl text-gray-300 font-medium">
                                Sell Your House Without An Agent And Skip The Hassle Of Listing
                            </p>

                            <p className="mt-4 text-gray-400 leading-relaxed max-w-xl">
                                {"We're a direct cash house buyer in Memphis, TN that buys houses in any condition, as-is."}
                            </p>

                            <ul className="mt-6 space-y-3" aria-label="Key benefits">
                                {[
                                    "Need repairs? We'll cover them!",
                                    "No fees, no commissions",
                                    "Close on YOUR schedule",
                                ].map((point) => (
                                    <li key={point} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-[#22c55e] shrink-0" aria-hidden="true" />
                                        <span className="text-gray-300">{point}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Mobile form */}
                            <div className="lg:hidden mt-10">
                                <LeadFormConsent />
                            </div>
                        </div>

                        {/* Right form – desktop */}
                        <div className="hidden lg:block">
                            <LeadFormConsent />
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────── 2. BENEFITS ───────── */}
            <section
                id="benefits"
                className="bg-[#13132b] py-20 lg:py-28"
                aria-labelledby="benefits-heading"
            >
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-4 uppercase tracking-wide">
                            Why Choose Us
                        </p>
                        <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {"Here's What Spencer Buys Houses Can Do For You…"}
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Skip the traditional hassle of listing with an agent. Get a fair cash offer and sell your house fast.
                        </p>
                    </div>

                    {/* Animated cards — client leaf (data lives inside the client boundary) */}
                    <AnimatedBenefitCards />
                </div>
            </section>

            {/* ───────── 3. TESTIMONIALS ───────── */}
            <TestimonialsSection count={3} />

            {/* ───────── 4. "BUT IT GETS BETTER" ───────── */}
            <section className="bg-[#13132b] py-20 lg:py-28" aria-labelledby="better-heading">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Image */}
                        <div className="flex justify-center lg:justify-start">
                            <div className="w-full overflow-hidden rounded-2xl shadow-md border border-white/10">
                                <div className="relative w-full aspect-[16/9]">
                                    <Image
                                        src="/var-a-exterior.jpg"
                                        alt="A quiet Memphis neighborhood with tree-lined streets and homes in good condition"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 800px"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Copy */}
                        <div>
                            <p className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-6 uppercase tracking-wide">
                                But It Gets Better
                            </p>

                            <h2 id="better-heading" className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                Sell Fast Without An Agent —{" "}
                                <span className="text-[#f59e0b]">With No Rush to Move</span>
                            </h2>

                            <p className="text-gray-400 leading-relaxed mb-4">
                                {"You can sell fast without an agent with no rush to move. Get a cash offer and you don't have to move out right away; you can stay in your home for a while until you locate another home."}
                            </p>

                            <p className="text-gray-400 leading-relaxed mb-8">
                                We are confident that we can help you today – regardless of the situation.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#top"
                                    className="inline-block rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-[#0f0f23] px-6 py-3 text-sm font-bold transition-colors text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]"
                                >
                                    Get Your Free Cash Offer
                                </a>
                                <a
                                    href="tel:+19016218799"
                                    className="inline-block rounded-lg border border-white/20 hover:border-[#f59e0b]/50 text-white px-6 py-3 text-sm font-bold transition-colors text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]"
                                >
                                    Call (901) 621-8799
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────── 5. CALL NOW BANNER ───────── */}
            <CallNowBanner />
        </>
    )
}
