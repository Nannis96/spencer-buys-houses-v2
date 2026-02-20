"use client"

import { Ban, Wrench, DollarSign, Clock, ShieldCheck, Handshake } from "lucide-react"
import { motion } from "framer-motion"

const benefits = [
    {
        icon: Ban,
        title: "Zero Commissions",
        description: "Keep every dollar you deserve. We charge absolutely no agent fees or commissions - ever.",
    },
    {
        icon: Wrench,
        title: "No Repairs Needed",
        description: "Sell your house exactly as-is. Leaky roof? Broken AC? We handle it all after closing.",
    },
    {
        icon: DollarSign,
        title: "No Hidden Fees",
        description: "We even cover typical closing costs. The offer you accept is the amount you walk away with.",
    },
    {
        icon: Clock,
        title: "Close in 7 Days",
        description: "Need to move fast? We can close in as little as 7 days. You choose the timeline.",
    },
    {
        icon: ShieldCheck,
        title: "Guaranteed Offer",
        description: "Our cash offers are backed by proof of funds. No financing fall-throughs, no last-minute surprises.",
    },
    {
        icon: Handshake,
        title: "Fair Cash Price",
        description: "We use comparable sales data and real market analysis to ensure you get a competitive, honest offer.",
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
            ease: "easeOut",
        },
    }),
}

export function BenefitsSection() {
    return (
        <section id="benefits" className="bg-[#13132b] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-sm font-semibold mb-4">
                        WHY CHOOSE US
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        The Smarter Way to Sell Your Home
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Skip the traditional hassle. Here is why over 500 homeowners have chosen us to sell their property fast.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
        </section>
    )
}
