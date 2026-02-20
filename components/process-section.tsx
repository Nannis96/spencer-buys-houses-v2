import { ClipboardList, DollarSign, CalendarCheck } from "lucide-react"

const steps = [
    {
        icon: ClipboardList,
        title: "Tell Us About Your Property",
        description: "Fill out our simple form or give us a call. Share your property details - no prep needed, any condition accepted.",
    },
    {
        icon: DollarSign,
        title: "Get Your Cash Offer in 24hrs",
        description: "We evaluate your property using real market data and present a fair, no-obligation cash offer - fast.",
    },
    {
        icon: CalendarCheck,
        title: "Close & Get Paid On Your Date",
        description: "You pick the closing date. Get your money in as little as 7 days. We handle all the paperwork.",
    },
]

export function ProcessSection() {
    return (
        <section id="how-it-works" className="bg-[#0f0f23] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-4">
                        SIMPLE 3-STEP PROCESS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        How It Works
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Selling your house has never been easier. No showings, no agents, no hassle.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <div key={step.title} className="relative text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#f59e0b]/30 transition-all">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#f59e0b] text-[#0f0f23] font-bold flex items-center justify-center text-sm">
                                {i + 1}
                            </div>
                            <div className="mx-auto mb-6 mt-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f59e0b]/10">
                                <step.icon className="h-8 w-8 text-[#f59e0b]" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
