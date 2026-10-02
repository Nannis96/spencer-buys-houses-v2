"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

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
 * so both signals are checked and either one counts as a booking. If GHL ever
 * changes either shape, temporarily log `event.data` in the handler below.
 */
const BOOKING_COMPLETE_EVENT = "msgsndr-booking-complete"
const STICKY_CONTACTS_EVENT = "set-sticky-contacts"
const STICKY_CONTACTS_KEY = "_ud"
const GHL_MESSAGE_ORIGIN = "https://api.leadconnectorhq.com"

/** sessionStorage flag: one conversion per session, and lets other pages know the seller already booked. */
export const BOOKED_KEY = "appointmentBooked"

export function hasBooked(): boolean {
    try {
        return window.sessionStorage.getItem(BOOKED_KEY) === "1"
    } catch {
        return false
    }
}

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

function fireBookingConversion() {
    if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
            send_to: "AW-16699021352/yz6kCLuMzNgcEKiw25o-",
            value: 1.0,
            currency: "USD",
        })
    }
}

const typeButtonClass = (active: boolean) =>
    [
        "flex flex-col items-center gap-2 rounded-xl border px-4 py-5 text-sm font-semibold transition-all",
        active
            ? "border-[#f59e0b] bg-[#f59e0b]/10 text-white ring-2 ring-[#f59e0b]/40"
            : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:bg-white/[0.06]",
    ].join(" ")

/**
 * Appointment picker (in-person / phone) + GHL calendars. Fires the Google Ads
 * conversion (once per session) and calls `onBooked` when a booking is confirmed.
 */
export function BookingWidget({ onBooked }: { onBooked?: () => void }) {
    const [appointmentType, setAppointmentType] = useState<"in-person" | "phone" | null>(null)

    useEffect(() => {
        const handler = (event: MessageEvent) => {
            if (event.origin !== GHL_MESSAGE_ORIGIN) return
            if (!isBookingConfirmedMessage(event.data)) return

            // Several widgets can be mounted on one page; the flag is set
            // synchronously so only the first listener fires the conversion.
            const first = !hasBooked()
            try {
                window.sessionStorage.setItem(BOOKED_KEY, "1")
            } catch {
                // Blocked storage — worst case the conversion can fire again.
            }
            if (first) fireBookingConversion()
            onBooked?.()
        }

        window.addEventListener("message", handler)
        return () => window.removeEventListener("message", handler)
    }, [onBooked])

    return (
        <div className="flex flex-col gap-6">
            <div className="text-center">
                <p className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest mb-2">
                    Free · No Obligation · No Fees
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
                    Sell Your House <span className="text-[var(--color-secondary)]">Fast For Cash</span>
                </h3>
                <p className="text-sm sm:text-base text-gray-300 max-w-md mx-auto leading-relaxed">
                    Book a free appointment and get your cash offer — we buy as-is, so no repairs and no agent commissions.
                </p>
                <p className="text-sm font-semibold text-white mt-4">How would you like to connect with us?</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => setAppointmentType("in-person")}
                    className={typeButtonClass(appointmentType === "in-person")}
                    aria-pressed={appointmentType === "in-person"}
                >
                    <span className="text-3xl" aria-hidden>🏠</span>
                    <span>In-Person Visit</span>
                    <span className="text-xs font-normal text-gray-400 text-center leading-snug">Spencer&apos;s team walks your home</span>
                </button>
                <button
                    type="button"
                    onClick={() => setAppointmentType("phone")}
                    className={typeButtonClass(appointmentType === "phone")}
                    aria-pressed={appointmentType === "phone"}
                >
                    <span className="text-3xl" aria-hidden>📞</span>
                    <span>Phone Call</span>
                    <span className="text-xs font-normal text-gray-400 text-center leading-snug">Book a call at a time that works for you</span>
                </button>
            </div>

            {!appointmentType && (
                <p className="text-center text-xs text-gray-400">Choose an option above to see available times</p>
            )}

            {appointmentType && (
            <div className="rounded-xl border border-[#f59e0b]/30 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.04] border-b border-white/10">
                    <span className="text-lg" aria-hidden>{appointmentType === "phone" ? "📞" : "🏠"}</span>
                    <div>
                        <p className="text-sm font-bold text-white">
                            {appointmentType === "phone" ? "Phone Call" : "In-Person Appointment"}
                        </p>
                        <p className="text-xs text-gray-400">
                            {appointmentType === "phone"
                                ? "Prefer to talk? Book a call at a time that works for you"
                                : "Schedule a visit — Spencer's team will walk your home"}
                        </p>
                    </div>
                </div>
                {appointmentType === "in-person" ? (
                    <iframe
                        src="https://api.leadconnectorhq.com/widget/booking/P1vgAP9PKCyszvGvim17"
                        style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "900px" }}
                        scrolling="yes"
                        loading="lazy"
                        id="P1vgAP9PKCyszvGvim17_1775688153226"
                    />
                ) : (
                    <iframe
                        src="https://api.leadconnectorhq.com/widget/bookings/spencerbuyhouses9hx574"
                        style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "900px" }}
                        scrolling="yes"
                        loading="lazy"
                        id="spencerbuyhouses9hx574_1775688153226"
                    />
                )}
                {/* GHL form_embed.js — required after hydration so the iframe resizes correctly. */}
                <Script
                    id="ghl-embed"
                    src="https://api.leadconnectorhq.com/js/form_embed.js"
                    strategy="afterInteractive"
                />
            </div>
            )}
        </div>
    )
}
