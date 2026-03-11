import { MapPin, Users, Clock, TrendingUp } from "lucide-react"
import { CallButton } from "@/components/ui/call-button"
import { CTAButton } from "../ui/cta-button"
import Image from "next/image"

const stats = [
    { icon: Users, value: "500+", label: "Memphis Homes Purchased" },
    { icon: Clock, value: "7 Days", label: "Average Closing Time" },
    { icon: TrendingUp, value: "0%", label: "Fees or Commissions" },
    { icon: MapPin, value: "Local", label: "Memphis Native Buyer" },
]

export function AboutSection() {
    return (
        <section id="about" className="bg-[var(--color-background)] py-10 lg:py-14">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <div>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-6 uppercase tracking-wide">
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

                        <div className="flex flex-row items-center gap-4 mb-8">
                            <CTAButton href="#top">Get Your Free Cash Offer</CTAButton>
                            <CallButton inline />
                        </div>
                    </div>

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
