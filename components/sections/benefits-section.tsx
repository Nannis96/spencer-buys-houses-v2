"use client"

import { Ban, Wrench, DollarSign, Clock, ShieldCheck, Handshake, Check, X, Minus } from "lucide-react"
import { motion } from "framer-motion"

const benefits = [
    {
        icon: Clock,
        title: "Close in 7 Days",
        description: "Need to move fast? We can close in as little as 7 days. You choose the closing date.",
    },
    {
        icon: Ban,
        title: "Zero Commissions",
        description: "Keep every dollar — no agent fees, no commissions, ever.",
    },
    {
        icon: Wrench,
        title: "No Repairs Needed",
        description: "Sell your house exactly as-is. Leaky roof? Foundation issues? We handle it all.",
    },
    {
        icon: DollarSign,
        title: "No Hidden Fees",
        description: "We cover typical closing costs. The offer you accept is the amount you walk away with.",
    },
    {
        icon: ShieldCheck,
        title: "Guaranteed Offer",
        description: "Our cash offers are backed by proof of funds. No financing fall-throughs, ever.",
    },
    {
        icon: Handshake,
        title: "Flexible Timelines",
        description: "Pick the closing date that works for you — fast or at your own pace.",
    },
]

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut" as const,
        },
    }),
}

type CompareValue = "yes" | "no" | "maybe"

const compareRows: { label: string; spencer: CompareValue; agent: CompareValue; fsbo: CompareValue }[] = [
    { label: "Competitive Cash Price", spencer: "yes", agent: "maybe", fsbo: "maybe" },
    { label: "Close in 7 Days", spencer: "yes", agent: "no", fsbo: "no" },
    { label: "No Commissions (6%+)", spencer: "yes", agent: "no", fsbo: "yes" },
    { label: "No Repairs Required", spencer: "yes", agent: "no", fsbo: "no" },
    { label: "We Pay Closing Costs", spencer: "yes", agent: "no", fsbo: "no" },
    { label: "No Financing Contingency", spencer: "yes", agent: "maybe", fsbo: "maybe" },
    { label: "No Open Houses / Showings", spencer: "yes", agent: "no", fsbo: "no" },
    { label: "Guaranteed Sale", spencer: "yes", agent: "no", fsbo: "no" },
]

function CompareCell({ value }: { value: CompareValue }) {
    if (value === "yes")
        return <span className="flex justify-center"><Check className="h-5 w-5 text-[#22c55e]" /></span>
    if (value === "no")
        return <span className="flex justify-center"><X className="h-5 w-5 text-red-500" /></span>
    return <span className="flex justify-center"><Minus className="h-5 w-5 text-gray-500" /></span>
}

export function BenefitsSection() {
    return (
        <section id="benefits" className="bg-[#13132b] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">

                {/* Benefit Cards */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-4 uppercase tracking-wide">
                        Why Choose Us
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        The Smarter Way to Sell Your Memphis Home
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Skip the traditional hassle. Here's why hundreds of Memphis homeowners have chosen us to sell their property fast.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {benefits.map(({ icon: Icon, title, description }, i) => (
                        <motion.div
                            key={title}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={cardVariants}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#f59e0b]/30 transition-colors group"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f59e0b]/10 group-hover:bg-[#f59e0b]/20 transition-colors">
                                <Icon className="h-6 w-6 text-[#f59e0b]" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Comparison Table */}
                <div className="text-center mb-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        See How We Compare
                    </h3>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm">
                        Selling with Spencer vs. a traditional agent vs. listing it yourself.
                    </p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/10">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="py-4 px-6 text-left text-gray-400 font-medium w-1/2">Feature</th>
                                <th className="py-4 px-4 text-center font-bold text-[#f59e0b] bg-[#f59e0b]/5">
                                    Spencer Buys Houses
                                </th>
                                <th className="py-4 px-4 text-center text-gray-400 font-medium">Traditional Agent</th>
                                <th className="py-4 px-4 text-center text-gray-400 font-medium">FSBO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compareRows.map((row, i) => (
                                <tr
                                    key={row.label}
                                    className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                                >
                                    <td className="py-3 px-6 text-gray-300">{row.label}</td>
                                    <td className="py-3 px-4 bg-[#f59e0b]/5">
                                        <CompareCell value={row.spencer} />
                                    </td>
                                    <td className="py-3 px-4">
                                        <CompareCell value={row.agent} />
                                    </td>
                                    <td className="py-3 px-4">
                                        <CompareCell value={row.fsbo} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </section>
    )
}
