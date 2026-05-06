"use client"

import { useMemo } from "react"
import { Star, Quote, ArrowRight, } from "lucide-react"
import { testimonials } from "@/components/data/testimonials"

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating
                        ? "fill-[#f59e0b] text-[#f59e0b]"
                        : "fill-transparent text-gray-600"
                        }`}
                />
            ))}
            <span className="ml-1.5 text-xs font-semibold text-[#f59e0b]">{rating}.0</span>
        </div>
    )
}

interface TestimonialsSectionProps {
    /** Number of testimonials to display. Defaults to all. */
    count?: number
}

export function TestimonialsSection({ count }: TestimonialsSectionProps = {}) {
    // Make a shuffled copy (Fisher–Yates) on the client only
    const shuffled = useMemo(() => {
        const arr = [...testimonials]
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[arr[i], arr[j]] = [arr[j], arr[i]]
        }
        return arr
    }, [])

    const visible = count ? shuffled.slice(0, count) : shuffled

    return (
        <section id="testimonials" className="bg-[var(--color-background-white)] border-t-4 border-[var(--color-secondary)] py-10 lg:py-14">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-sm font-semibold mb-4">
                        REAL REVIEWS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-black)] mb-4">
                        What {" "}
                        <span className="text-[var(--color-secondary)]">Are Clients </span>
                        Saying?
                    </h2>
                    <p className="text-[var(--color-text-black)] max-w-2xl mx-auto">
                        Real stories from real people who sold their Memphis property fast — no stress, no surprises.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visible.map((t) => (
                        <div key={t.name} className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-[var(--color-secondary)]/30 flex flex-col">
                            <StarRating rating={t.rating} />
                            <Quote className="h-6 w-6 text-[var(--color-primary-dark)]/30 mt-4 mb-3" />
                            <p className="text-[var(--color-text-black)] leading-relaxed mb-6 flex-1">{t.text}</p>
                            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                <div className="h-10 w-10 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center text-[var(--color-secondary)] font-bold text-sm">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-[var(--color-text-black)] text-sm">{t.name}</p>
                                    <p className="text-xs text-[var(--color-text-black)]">{t.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-col items-center md:flex-row md:justify-between md:items-center">
                    <div className="inline-flex items-center gap-3 rounded-full bg-yellow-50 border border-[var(--color-secondary)]/10 px-6 py-3">
                        <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                            ))}
                        </div>
                        <span className="text-sm text-[var(--color-text-black)]">
                            <span className="font-bold text-[var(--color-text-black)]">4.9 out of 5</span>
                            {" based on 500+ reviews"}
                        </span>
                    </div>

                    <a
                        href="https://www.google.com/search?kgmid=/g/11jnny9nkl&q=Spencer+Buys+Houses"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-secondary)] hover:text-[var(--color-secondary)]/60 transition-colors"
                    >
                        Read Full Reviews on Google
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </section>
    )
}
