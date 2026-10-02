"use client"

import { useEffect, useState } from "react"
import {
    CheckCircle2,
    ShieldCheck,
    DollarSign,
    Clock,
    Wrench,
    Home,
    BadgeCheck,
    HeartHandshake,
} from "lucide-react"

import { motion } from "framer-motion"
import { CallButton } from "@/components/ui/call-button"
import { BookingWidget, hasBooked } from "@/components/forms/booking-widget"

function sanitizeSellerName(raw: string | null): string | null {
    if (!raw) return null
    const trimmed = raw.trim()
    if (!trimmed) return null
    // Only allow characters that plausibly appear in a person's name.
    if (!/^[\p{L}\p{M}\s'.-]+$/u.test(trimmed)) return null
    return trimmed.slice(0, 60)
}

export default function BookingsPage() {
    const [sellerName, setSellerName] = useState<string | null>(null)
    const [bookingConfirmed, setBookingConfirmed] = useState(false)

    useEffect(() => {
        try {
            setSellerName(sanitizeSellerName(window.sessionStorage.getItem("sellerName")))
        } catch {
            setSellerName(null)
        }
        // Already booked at the start of the funnel — don't offer the calendar again.
        // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is client-only
        if (hasBooked()) setBookingConfirmed(true)
    }, [])

    return (
        
        <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 pt-28 pb-10">

            
                <div className="flex justify-center">
                    <div className="w-full max-w-2xl mb-6 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    Get Your Free Cash Offer —{" "}
                    <span className="text-[#f59e0b]">Memphis, TN</span>
                </h1>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    We buy houses in Memphis in any condition &mdash; no fees, no commissions, and no repairs needed.
                    Just enter your property&apos;s location below and we&apos;ll prepare your personalized cash offer
                    in as little as 24 hours.
                </p>
            </div>
                </div>
                
                
            {/* ───────────────────────────────────────────────────────────── */}

            <div className="mt-12">
                <div
                    className="rounded-2xl bg-[var(--color-background)] p-6 md:p-8 text-center border border-[var(--color-primary)]/60"
                    role="status"
                    aria-live="polite"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                        }}
                        className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#22c55e]/10"
                    >
                        <CheckCircle2 className="h-10 w-10 text-[#22c55e]" />
                    </motion.div>

                    <div className="text-left">
                        {sellerName ? (
                            <div className="mb-3 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-tight">{sellerName}</p>
                                    <p className="text-lg sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-400 leading-tight">You will receive your offer via email shortly</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">Your 3 Options — Estimated</p>
                        )}

                        {bookingConfirmed && (
                            <div className="mb-6 rounded-xl border border-[#22c55e]/30 bg-[#22c55e]/10 px-4 py-3 flex items-center gap-2 justify-center text-sm font-semibold text-[#22c55e]">
                                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                                Your appointment is confirmed
                            </div>
                        )}

                        {/* Video wrapper */}
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 ring-1 ring-[var(--color-primary-dark)]/20 mb-8">
                            {/* Subtle glow behind frame */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-2xl bg-[var(--color-primary-dark)]/5 blur-xl"
                            />

                            {/* 16/9 aspect ratio container */}
                            <div className="relative w-full aspect-video">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src="https://www.youtube.com/embed/eFa-zwpW6s0?rel=0&modestbranding=1&color=white&autoplay=1&mute=1"
                                    title="How Spencer Buys Houses — Sell Your Memphis Home Fast for Cash"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* ── Booking Widgets (skipped if the seller already booked at the start of the funnel) ── */}
                        {!bookingConfirmed && <BookingWidget onBooked={() => setBookingConfirmed(true)} />}

                        <p className="text-gray-300 mb-4 leading-relaxed max-w-md mx-auto text-sm">
                            We've received your information — one of our home buying specialists
                            will reach out soon with details and next steps.
                        </p>

                        <div className="flex justify-center">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-4 py-2 text-sm font-medium text-[var(--color-primary)]">
                                <ShieldCheck className="h-4 w-4" />
                                Your information is 100% secure &amp; never shared
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                    {
                        icon: <DollarSign className="h-6 w-6" />,
                        title: "No Fees or Commissions",
                        desc: "We pay all closing costs. Zero agent commissions. The offer we make is the cash you receive.",
                    },
                    {
                        icon: <Clock className="h-6 w-6" />,
                        title: "Close On Your Timeline",
                        desc: "Need to close in 7 days? Or need 90? We work around your schedule — not ours.",
                    },
                    {
                        icon: <Wrench className="h-6 w-6" />,
                        title: "We Buy As-Is",
                        desc: "Don't lift a finger. No repairs, cleaning, or renovations required before closing.",
                    },
                    {
                        icon: <Home className="h-6 w-6" />,
                        title: "Any Condition, Any Situation",
                        desc: "Foreclosure, probate, divorce, inherited property — we've seen it all and we can help.",
                    },
                    {
                        icon: <BadgeCheck className="h-6 w-6" />,
                        title: "Local & Trusted",
                        desc: "Spencer is a Memphis-based buyer. You work directly with us — no middlemen, no runaround.",
                    },
                    {
                        icon: <HeartHandshake className="h-6 w-6" />,
                        title: "Stress-Free Process",
                        desc: "Three simple steps: get an offer, accept it, and get paid. That's it.",
                    },
                ].map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: index * 0.05,
                            duration: 0.35,
                        }}
                        className="rounded-xl bg-[var(--color-background)] border border-white/10 p-5 flex gap-4 items-start"
                    >
                        <div className="shrink-0 h-11 w-11 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                            {item.icon}
                        </div>

                        <div>
                            <p className="font-semibold text-white text-sm mb-1">
                                {item.title}
                            </p>

                            <p className="text-gray-400 text-xs leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <CallButton />
            </div>
        </div>
    )
}
