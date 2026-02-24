import { ClipboardList, DollarSign, CalendarCheck } from "lucide-react"

const steps = [
    {
        icon: ClipboardList,
        step: "01",
        title: "Share Your Property Details",
        description:
            "Tell us about your property – address, condition, and your situation. It takes less than 2 minutes and there's zero obligation.",
    },
    {
        icon: DollarSign,
        step: "02",
        title: "Receive Your Competitive Cash Offer",
        description:
            "We'll analyze your home and present you a fair AS-IS cash offer within 24 hours. No repairs required, no open houses, no hassle.",
    },
    {
        icon: CalendarCheck,
        step: "03",
        title: "Close on YOUR Schedule",
        description:
            "Pick the closing date that works for YOU — as fast as 7 days or whenever you're ready. We handle the paperwork and pay all closing costs.",
    },
]

export function ProcessSection() {
    return (
        <section id="how-it-works" className="bg-[#13132b] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-4 uppercase tracking-wide">
                        How It Works
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        3 Simple Steps to Sell Your Memphis House Fast
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Our streamlined process means you go from offer to closing in days, not months.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connector line (desktop) */}
                    <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-[#f59e0b]/30 to-transparent" />

                    {steps.map(({ icon: Icon, step, title, description }) => (
                        <div key={step} className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#f59e0b]/30 transition-colors group">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#f59e0b] text-[#0f0f23] text-xs font-black">
                                {step}
                            </div>
                            <div className="mt-4 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f59e0b]/10 group-hover:bg-[#f59e0b]/20 transition-colors">
                                <Icon className="h-8 w-8 text-[#f59e0b]" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="#top"
                        className="inline-block rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-[#0f0f23] px-8 py-4 text-base font-bold transition-colors"
                    >
                        Get My Free Cash Offer Now
                    </a>
                </div>
            </div>
        </section>
    )
}
