"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"
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

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void
    }
}

/**
 * GHL's booking widget posts positional arrays, not named CustomEvent-style
 * objects. Two signals confirmed via real test bookings (2026-07-31):
 *  - In-person widget: ["msgsndr-booking-complete", { fingerprint, calendarId }]
 *  - Phone-call widget: only ["set-sticky-contacts", "_ud", "<contact JSON>", locationId, fingerprint]
 *    — "msgsndr-booking-complete" never arrived for this widget in testing.
 * The contact JSON's `appointment.id` is only populated once a booking exists,
 * so both signals are checked and either one fires the conversion (the
 * anti-duplicate ref below stops it firing twice if both arrive for the same
 * booking, as happened on the in-person widget). If GHL ever changes either
 * shape, temporarily log `event.data` in the message handler below to inspect it.
 */
const BOOKING_COMPLETE_EVENT = "msgsndr-booking-complete"
const STICKY_CONTACTS_EVENT = "set-sticky-contacts"
const STICKY_CONTACTS_KEY = "_ud"

function isBookingConfirmedMessage(payload: unknown): boolean {
    if (!Array.isArray(payload)) return false

    if (payload[0] === BOOKING_COMPLETE_EVENT) return true

    if (payload[0] === STICKY_CONTACTS_EVENT && payload[1] === STICKY_CONTACTS_KEY) {
        try {
            const contact = typeof payload[2] === "string" ? JSON.parse(payload[2]) : payload[2]
            return Boolean((contact as { appointment?: { id?: string } } | null)?.appointment?.id)
        } catch {
            return false
        }
    }

    return false
}

const GHL_MESSAGE_ORIGIN = "https://api.leadconnectorhq.com"

function sanitizeSellerName(raw: string | null): string | null {
    if (!raw) return null
    const trimmed = raw.trim()
    if (!trimmed) return null
    // Only allow characters that plausibly appear in a person's name.
    if (!/^[\p{L}\p{M}\s'.-]+$/u.test(trimmed)) return null
    return trimmed.slice(0, 60)
}

function fireBookingConversion() {
    if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
            send_to: "AW-16699021352/yz6kCLuMzNgcEKiw25o-",
            value: 1.0,
            currency: "USD",
        })
    }
}

export default function BookingsPage() {
    const [sellerName, setSellerName] = useState<string | null>(null)
    const [appointmentType, setAppointmentType] = useState<"in-person" | "phone">("in-person")
    const [bookingConfirmed, setBookingConfirmed] = useState(false)
    const conversionFiredRef = useRef(false)

    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                const stored = window.sessionStorage.getItem("sellerName")
                setSellerName(sanitizeSellerName(stored))
            }
        } catch {
            setSellerName(null)
        }
    }, [])

    useEffect(() => {
        const handler = (event: MessageEvent) => {
            if (event.origin !== GHL_MESSAGE_ORIGIN) return

            const payload: unknown = event.data

            if (!isBookingConfirmedMessage(payload)) return

            if (conversionFiredRef.current) return
            conversionFiredRef.current = true

            fireBookingConversion()
            setBookingConfirmed(true)
        }

        window.addEventListener("message", handler)
        return () => window.removeEventListener("message", handler)
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

                        {/* ── Booking Widgets ── */}
                        <div className="flex flex-col gap-6">
                            {/* Section heading */}
                            <div className="text-center">
                                <p className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest mb-1">Next Step</p>
                                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-2">
                                    Schedule Your Appointment
                                </h3>
                                <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                                    How would you prefer to connect with us?
                                </p>
                            </div>
                
                            {/* Appointment type selector */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setAppointmentType("in-person")}
                                    className={[
                                        "flex flex-col items-center gap-2 rounded-xl border px-4 py-5 text-sm font-semibold transition-all",
                                        appointmentType === "in-person"
                                            ? "border-[#f59e0b] bg-[#f59e0b]/10 text-white ring-2 ring-[#f59e0b]/40"
                                            : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:bg-white/[0.06]",
                                    ].join(" ")}
                                    aria-pressed={appointmentType === "in-person"}
                                >
                                    <span className="text-3xl" aria-hidden>🏠</span>
                                    <span>In-Person Visit</span>
                                    <span className="text-xs font-normal text-gray-400 text-center leading-snug">Spencer's team walks your home</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAppointmentType("phone")}
                                    className={[
                                        "flex flex-col items-center gap-2 rounded-xl border px-4 py-5 text-sm font-semibold transition-all",
                                        appointmentType === "phone"
                                            ? "border-[#f59e0b] bg-[#f59e0b]/10 text-white ring-2 ring-[#f59e0b]/40"
                                            : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:bg-white/[0.06]",
                                    ].join(" ")}
                                    aria-pressed={appointmentType === "phone"}
                                >
                                    <span className="text-3xl" aria-hidden>📞</span>
                                    <span>Phone Call</span>
                                    <span className="text-xs font-normal text-gray-400 text-center leading-snug">Book a call at a time that works for you</span>
                                </button>
                            </div>

                            {/* In-Person calendar */}
                            {appointmentType === "in-person" && (
                                <div className="rounded-xl border border-[#f59e0b]/30 overflow-hidden">
                                    <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.04] border-b border-white/10">
                                        <span className="text-lg" aria-hidden>🏠</span>
                                        <div>
                                            <p className="text-sm font-bold text-white">In-Person Appointment</p>
                                            <p className="text-xs text-gray-400">Schedule a visit — Spencer's team will walk your home</p>
                                        </div>
                                    </div>
                                    <div>
                                        <iframe
                                            src="https://api.leadconnectorhq.com/widget/booking/P1vgAP9PKCyszvGvim17"
                                            style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "900px" }}
                                            scrolling="yes"
                                            loading="lazy"
                                            id="P1vgAP9PKCyszvGvim17_1775688153226"
                                        />
                                        {/*
                                        * GHL form_embed.js — afterInteractive: required immediately after
                                        * hydration so the booking iframe renders correctly. Next.js
                                        * deduplicates scripts with the same src automatically.
                                        */}
                                        <Script
                                            id="ghl-embed-inperson"
                                            src="https://api.leadconnectorhq.com/js/form_embed.js"
                                            strategy="afterInteractive"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Phone Call calendar */}
                            {appointmentType === "phone" && (
                                <div className="rounded-xl border border-[#f59e0b]/30 overflow-hidden">
                                    <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.04] border-b border-white/10">
                                        <span className="text-lg" aria-hidden>📞</span>
                                        <div>
                                            <p className="text-sm font-bold text-white">Phone Call</p>
                                            <p className="text-xs text-gray-400">Prefer to talk? Book a call at a time that works for you</p>
                                        </div>
                                    </div>
                                    <div>
                                        <iframe
                                            src="https://api.leadconnectorhq.com/widget/bookings/spencerbuyhouses9hx574"
                                            style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "900px" }}
                                            scrolling="yes"
                                            loading="lazy"
                                            id="spencerbuyhouses9hx574_1775688153226"
                                        />
                                        {/* Same script as above; Next.js deduplicates by src — only one request is made */}
                                        <Script
                                            id="ghl-embed-phone"
                                            src="https://api.leadconnectorhq.com/js/form_embed.js"
                                            strategy="afterInteractive"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

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
