import { Shield, Star, Clock, CheckCircle, MapPin, DollarSign } from "lucide-react"

const badges = [
    { icon: Star, label: "5-Star Google Reviews" },
    { icon: Clock, label: "Close in 7 Days" },
    { icon: DollarSign, label: "Zero Commissions" },
    { icon: Shield, label: "No Repairs Needed" },
    { icon: MapPin, label: "Local Memphis Buyer" },
    { icon: CheckCircle, label: "Zero Obligation Offer" },
]

export function TrustBar() {
    return (
        <section className="bg-[#0f0f23] border-y border-white/10 py-8">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 lg:flex-nowrap lg:justify-center lg:gap-12">
                    {badges.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2.5">
                            <Icon className="h-5 w-5 text-[#f59e0b]" />
                            <span className="text-sm font-medium text-gray-300">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
