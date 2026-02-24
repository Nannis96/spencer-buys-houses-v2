import { MapPin, Users, Clock, TrendingUp } from "lucide-react"

const stats = [
    { icon: Users, value: "500+", label: "Memphis Homes Purchased" },
    { icon: Clock, value: "7 Days", label: "Average Closing Time" },
    { icon: TrendingUp, value: "0%", label: "Fees or Commissions" },
    { icon: MapPin, value: "Local", label: "Memphis Native Buyer" },
]

export function AboutSection() {
    return (
        <section id="about" className="bg-[#0f0f23] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <div>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-6 uppercase tracking-wide">
                            About Spencer
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                            A Local Memphis Cash Home Buyer You Can Trust
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            We are a real estate solutions and investment firm that specializes in helping homeowners get rid of burdensome houses fast. We are investors and problem solvers who can buy your house fast with a fair all-cash offer.
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Whether you are facing foreclosure, going through a divorce, dealing with an inherited property, or simply need to move quickly — <strong className="text-white">Spencer Buys Houses</strong> is here to give you a fast, fair, no-obligation cash offer. As a Memphis native, Spencer understands the local market and is committed to helping our community.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="#top"
                                className="inline-block rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-[#0f0f23] px-6 py-3 text-sm font-bold transition-colors text-center"
                            >
                                Get Your Free Cash Offer
                            </a>
                            <a
                                href="tel:+19016218799"
                                className="inline-block rounded-lg border border-white/20 hover:border-[#f59e0b]/50 text-white px-6 py-3 text-sm font-bold transition-colors text-center"
                            >
                                Call (901) 621-8799
                            </a>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map(({ icon: Icon, value, label }) => (
                            <div
                                key={label}
                                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#f59e0b]/30 transition-colors"
                            >
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f59e0b]/10">
                                    <Icon className="h-6 w-6 text-[#f59e0b]" />
                                </div>
                                <p className="text-2xl font-black text-white mb-1">{value}</p>
                                <p className="text-xs text-gray-400 leading-snug">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
