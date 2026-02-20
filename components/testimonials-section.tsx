import { Star, Quote } from "lucide-react"

const testimonials = [
    {
        name: "Sarah M.",
        location: "Houston, TX",
        text: "They made the whole process so easy. I had a cash offer within 24 hours and closed in just 10 days. The price was fair and the team was incredibly professional.",
        rating: 5,
    },
    {
        name: "James & Linda K.",
        location: "Dallas, TX",
        text: "We inherited a property that needed tons of work. They bought it completely as-is and we didn't have to spend a dime on repairs. Highly recommend to anyone in a similar situation!",
        rating: 5,
    },
    {
        name: "Robert T.",
        location: "San Antonio, TX",
        text: "After my divorce, I needed to sell fast and move on. They gave me a fair price and worked around my schedule. Professional and compassionate from start to finish.",
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

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="bg-[#0f0f23] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-4">
                        REAL REVIEWS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {"Testimonials"}
                    </h2>
                    {/* <p className="text-gray-400 max-w-2xl mx-auto">
                        {"Hear from real homeowners who sold their properties quickly and stress-free."}
                    </p> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <div key={t.name} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
                            <StarRating rating={t.rating} />
                            <Quote className="h-6 w-6 text-[#f59e0b]/30 mt-4 mb-3" />
                            <p className="text-gray-300 leading-relaxed mb-6 flex-1">{t.text}</p>
                            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                <div className="h-10 w-10 rounded-full bg-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b] font-bold text-sm">
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
