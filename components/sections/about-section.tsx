import { MapPin, Users, Clock, TrendingUp } from "lucide-react"
import Image from "next/image"

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
                            About Spencer Buys Houses
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                            Sell Your Memphis House Fast for Cash
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            Spencer Buys Houses is your trusted local cash home buyer in Memphis, Tennessee, offering a fast, hassle-free solution to sell your Memphis house fast for cash. Whether you’re relocating, managing an inherited property, or need to sell your house fast in Memphis TN, our same-day cash offers eliminate stress and delays. Learn how our home buying process works!
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            We specialize in closing sales in as little as 7 days – no fees, no commissions, and no obligations. Our streamlined process simplifies selling for homeowners across Memphis and surrounding areas, turning complex situations into seamless cash home buyer solutions.
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
                    {/* <div className="grid grid-cols-2 gap-4">
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
                    </div> */}

                    {/* Image in place of stats grid */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="w-full max-w-full lg:max-w-4xl overflow-hidden rounded-2xl shadow-md">
                            <div className="relative w-full aspect-[16/9]">
                                <Image
                                    src="/var-a-exterior.jpg"
                                    alt="Exterior view of a house"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 1792px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
