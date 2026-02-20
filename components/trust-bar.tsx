import { Shield, Star, Award, CheckCircle } from "lucide-react"

const badges = [
    { icon: Shield, label: "BBB A+ Rated" },
    { icon: Star, label: "500+ Homes Purchased" },
    { icon: Award, label: "As Seen on HGTV" },
    { icon: CheckCircle, label: "Licensed & Insured" },
]

export function TrustBar() {
    return (
        <section className="bg-[#0f0f23] border-y border-white/10 py-8">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
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
