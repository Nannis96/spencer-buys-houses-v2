import { Star, Quote } from "lucide-react"

const testimonials = [
    {
        name: "Darlene W.",
        location: "Memphis, TN",
        text: "Spencer made selling my Frayser home incredibly easy. I had a fair cash offer within 24 hours and closed in 9 days. No repairs, no commissions, no stress. I wish I had called sooner!",
        rating: 5,
    },
    {
        name: "Marcus & Tanya B.",
        location: "Hickory Hill, TN",
        text: "We inherited a property that needed a ton of work. Spencer bought it completely as-is and we didn't spend a dime on repairs. Honest, transparent, and fast — highly recommend!",
        rating: 5,
    },
    {
        name: "James P.",
        location: "Raleigh, TN",
        text: "After going through a tough situation, I needed to sell fast and move forward. Spencer gave me a fair price, covered closing costs, and worked around my schedule. Truly compassionate service.",
        rating: 5,
    },
    {
        name: "Linda S.",
        location: "Cordova, TN",
        text: "I was skeptical at first but Spencer was professional from start to finish. No lowball offers, no hidden fees. He paid exactly what he promised and we closed on my timeline.",
        rating: 5,
    },
    {
        name: "Anthony R.",
        location: "Berclair, TN",
        text: "Listing with an agent wasn't working for me. Spencer stepped in, gave me a no-obligation offer the same day, and we closed in under 2 weeks. Best decision I made.",
        rating: 5,
    },
    {
        name: "Sheila M.",
        location: "Whitehaven, TN",
        text: "Spencer is a Memphis native who truly cares about this community. The process was smooth, he answered every question, and my family got the fresh start we needed.",
        rating: 5,
    },
]

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
    const visible = count ? testimonials.slice(0, count) : testimonials

    return (
        <section id="testimonials" className="bg-[var(--color-background)] py-10 lg:py-14">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-4">
                        REAL REVIEWS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        What Memphis Homeowners Are Saying
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Real stories from real people who sold their Memphis property fast — no stress, no surprises.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visible.map((t) => (
                        <div key={t.name} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
                            <StarRating rating={t.rating} />
                            <Quote className="h-6 w-6 text-[var(--color-primary-dark)]/30 mt-4 mb-3" />
                            <p className="text-gray-300 leading-relaxed mb-6 flex-1">{t.text}</p>
                            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                <div className="h-10 w-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold text-sm">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-sm">{t.name}</p>
                                    <p className="text-xs text-gray-500">{t.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Aggregate review badge */}
                <div className="mt-12 flex items-center justify-center">
                    {/* <div className="inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-6 py-3">
                        <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                            ))}
                        </div>
                        <span className="text-sm text-gray-300">
                            <span className="font-bold text-white">4.9 out of 5</span>
                            {" based on 500+ reviews"}
                        </span>
                    </div> */}
                </div>
            </div>
        </section>
    )
}
