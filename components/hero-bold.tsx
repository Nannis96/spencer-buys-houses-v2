import { LeadForm } from "@/components/lead-form"
import { Star, ArrowDown, CalendarCheck } from "lucide-react"

export function HeroBold() {
    return (
        <section className="relative bg-[#0f0f23] pt-24 pb-16 lg:pb-24 overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#f59e0b]/5 rounded-full blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Content */}
                    <div>
                        {/* Social proof */}
                        {/* <div className="flex items-center gap-3 mb-8">
                            <div className="flex -space-x-2">
                                {["S", "J", "R", "M"].map((letter, i) => (
                                    <div
                                        key={i}
                                        className="h-10 w-10 rounded-full border-2 border-[#0f0f23] bg-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b] text-sm font-bold"
                                    >
                                        {letter}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                                    ))}
                                    <span className="ml-1.5 text-sm font-semibold text-white">4.9/5</span>
                                </div>
                                <p className="text-sm text-gray-400">Rated by 500+ happy homeowners</p>
                            </div>
                        </div> */}

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                            Get A Cash Offer Today Without An Agent!
                            <br />
                            {/* <span className="text-[#f59e0b]">FAST FOR CASH</span> */}
                        </h1>

                        <p className="text-lg text-gray-400 leading-relaxed mb-6 max-w-lg">
                            {"Sell Your House Without An Agent And Skip The Hassle Of Listing. We’re a direct cash house buyer in Memphis, TN that buys houses in any condition, as-is.Need repairs? We’ll cover them!"}
                        </p>

                        {/* Guaranteed Close Date badge */}
                        {/* <div className="inline-flex items-center gap-2.5 mb-8 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 px-4 py-2.5">
                            <CalendarCheck className="h-5 w-5 text-[#22c55e]" />
                            <span className="text-sm font-semibold text-[#22c55e]">Guaranteed Close Date - You Pick the Day</span>
                        </div> */}

                        {/* <div className="flex flex-wrap gap-3 mb-8">
                            {["No Commissions", "No Repairs", "No Fees", "Close in 7 Days"].map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div> */}

                        {/* Mobile form - protagonist on small screens */}
                        <div className="lg:hidden mb-8">
                            <LeadForm />
                        </div>

                        {/* Scroll indicator */}
                        {/* <div className="hidden lg:flex items-center gap-2 text-gray-500 text-sm">
                            <ArrowDown className="h-4 w-4 animate-bounce" />
                            <span>Scroll to learn more</span>
                        </div> */}
                    </div>

                    {/* Right: Lead form */}
                    <div className="hidden lg:block">
                        <LeadForm />

                        {/* Quick stats */}
                        {/* <div className="mt-8 grid grid-cols-3 gap-4">
                            {[
                                { value: "$50M+", label: "Cash Paid" },
                                { value: "7 Days", label: "Avg Close" },
                                { value: "500+", label: "Homes Bought" },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                                    <p className="text-xl font-bold text-[#f59e0b]">{stat.value}</p>
                                    <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}
