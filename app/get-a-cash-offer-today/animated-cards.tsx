"use client"

import { motion } from "framer-motion"
import { Star, Quote, Ban, Clock, ShieldCheck, Home } from "lucide-react"

/* ──────────────────────────── Data (lives here — client boundary) ────── */

const benefits = [
    {
        icon: Ban,
        title: "NO Fees, NO Commissions",
        description:
            "Get a cash offer and we pay ALL closing costs associated with the transaction. Zero commissions when we buy your house.",
    },
    {
        icon: ShieldCheck,
        title: "Hundreds of Homes Purchased",
        description:
            "We've been buying houses for years and have purchased hundreds of homes. We have the resources, the experience, and the ability to create a win-win offer for you!",
    },
    {
        icon: Clock,
        title: "CASH in Days",
        description:
            "We can get CASH in your hands within a few days of you contacting us. We close fast!",
    },
    {
        icon: Home,
        title: "Any Condition, YOUR Timeline",
        description:
            "We are a local Memphis company that can buy your house in ANY condition. You'll pay ZERO commissions or closing costs. You choose when we close!",
    },
]

const testimonials = [
    {
        name: "Zac Brown",
        text: "Awesome group to deal with! Can't say enough about the patience and dedication this team has. Thank you all for helping with all that you did!",
        rating: 5,
        reviewLink:
            "https://www.google.com/search?sca_esv=bcc33a35ba758be7&kgmid=/g/11jnny9nkl&q=Spencer+Buys+Houses",
    },
    {
        name: "John Medina",
        text: "Spencer personally came and looked at my house. He arrived on time looked over the property and agreed to my asking price on the spot. He had no problem with the date I ask for closing. He never wavered on his offer and closing went through without a hitch. He did everything he said and I would not hesitate doing business with him again if the occasion ever arrose.",
        rating: 5,
        reviewLink:
            "https://www.google.com/search?sca_esv=bcc33a35ba758be7&kgmid=/g/11jnny9nkl&q=Spencer+Buys+Houses",
    },
]

/* ──────────────────────────── Animations ──────────────────────────────── */

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
    }),
}

/* ──────────────────────────── Star Rating ──────────────────────────────── */

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    aria-hidden="true"
                    className={`h-4 w-4 ${i < rating ? "fill-[#f59e0b] text-[#f59e0b]" : "fill-transparent text-gray-600"}`}
                />
            ))}
            <span className="ml-1.5 text-xs font-semibold text-[#f59e0b]">{rating}.0</span>
        </div>
    )
}

/* ──────────────────────────── Benefit Cards ────────────────────────────── */

export function AnimatedBenefitCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map(({ icon: Icon, title, description }, i) => (
                <motion.article
                    key={title}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeUp}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--color-primary)]/30 transition-colors group"
                >
                    <div
                        aria-hidden="true"
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary)]/20 transition-colors"
                    >
                        <Icon className="h-6 w-6 text-[var(--color-primary)]" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                </motion.article>
            ))}
        </div>
    )
}

/* ──────────────────────────── Testimonial Cards ───────────────────────── */

export function AnimatedTestimonialCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
                <motion.article
                    key={t.name}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col"
                    itemScope
                    itemType="https://schema.org/Review"
                >
                    <StarRating rating={t.rating} />
                    <Quote className="h-6 w-6 text-[var(--color-primary)]/30 mt-4 mb-3" aria-hidden="true" />

                    <blockquote
                        itemProp="reviewBody"
                        className="text-gray-300 leading-relaxed mb-6 flex-1 not-italic"
                    >
                        {t.text}
                    </blockquote>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-3" itemProp="author" itemScope itemType="https://schema.org/Person">
                            <div
                                aria-hidden="true"
                                className="h-10 w-10 rounded-full bg-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b] font-bold text-sm"
                            >
                                {t.name.charAt(0)}
                            </div>
                            <p className="font-semibold text-white text-sm" itemProp="name">
                                — {t.name}
                            </p>
                        </div>
                        <a
                            href={t.reviewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#f59e0b] hover:underline font-medium focus:outline-none focus-visible:ring-1 focus-visible:ring-[#f59e0b] rounded"
                            aria-label={`Read ${t.name}'s full review on Google`}
                        >
                            Read Full Review on Google →
                        </a>
                    </div>
                </motion.article>
            ))}
        </div>
    )
}
