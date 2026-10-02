"use client"

import { useId, useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, ArrowRight, Loader2, ShieldCheck, CheckCircle2 } from "lucide-react"
import { BookingWidget, hasBooked } from "./booking-widget"

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""

/* ─── Schema ──────────────────────────────────────────────────────────────── */

const leadConsentSchema = z.object({
    address: z.string().min(5, "Please enter a valid property address"),
    // City/state/zip are optional here — we allow proceeding with just an address.
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z
        .string()
        .optional()
        .refine((val) => !val || /^\d{5}(-\d{4})?$/.test(val), "Please enter a valid ZIP code"),
    // Optional – user can opt in to SMS
    smsConsent: z.boolean().optional(),
})

type LeadConsentFormData = z.infer<typeof leadConsentSchema>

/* ─── Field wrapper ───────────────────────────────────────────────────────── */

function FieldError({ message }: { message?: string }) {
    if (!message) return null
    return (
        <p role="alert" className="mt-1.5 text-xs text-red-400">
            {message}
        </p>
    )
}

/* ─── Component ───────────────────────────────────────────────────────────── */

function AddressForm({ onNext }: { onNext?: (params: URLSearchParams) => void } = {}) {
    const uid = useId()          // stable unique prefix per instance (safe for SSR)
    const id = (field: string) => `${uid}-${field}`
    const router = useRouter()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [mapsLoaded, setMapsLoaded] = useState(false)
    const [addressSelected, setAddressSelected] = useState(false)

    const addressInputRef = useRef<HTMLInputElement | null>(null)
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<LeadConsentFormData>({
        resolver: zodResolver(leadConsentSchema),
        defaultValues: {
            smsConsent: false,
        },
    })

    // If the user types or the field is pre-filled (not only when a Place is selected),
    // allow continuing once the address field contains non-empty text.
    const watchedAddress = watch("address")
    useEffect(() => {
        if (typeof watchedAddress === "string" && watchedAddress.trim().length > 0) {
            setAddressSelected(true)
        } else {
            setAddressSelected(false)
        }
    }, [watchedAddress])

    // ── Load Google Maps script (deferred until user interacts) ────────────────
    const loadGoogleMaps = useCallback(() => {
        if (!GOOGLE_MAPS_API_KEY || typeof window === "undefined") return
        if (window.google?.maps) { setMapsLoaded(true); return }

        const existing = document.getElementById("google-maps-script")
        if (existing) {
            existing.addEventListener("load", () => setMapsLoaded(true))
            return
        }

        const script = document.createElement("script")
        script.id = "google-maps-script"
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
        script.async = true
        script.defer = true
        script.onload = () => setMapsLoaded(true)
        document.head.appendChild(script)
    }, [])

    // ── Initialize Places Autocomplete ───────────────────────────────────────
    const initAutocomplete = useCallback(() => {
        if (!addressInputRef.current || !window.google?.maps?.places) return

        autocompleteRef.current = new window.google.maps.places.Autocomplete(
            addressInputRef.current,
            {
                fields: ["address_components", "formatted_address", "geometry", "name"],
                types: ["address"],
                componentRestrictions: { country: "us" },
            }
        )

        autocompleteRef.current.addListener("place_changed", () => {
            const place = autocompleteRef.current?.getPlace()
            if (!place?.address_components) return

            // Print full API result to console
            console.log("[Google Places] Place selected:", place)

            const get = (type: string, short = false) => {
                const comp = place.address_components?.find((c) => c.types.includes(type))
                return short ? (comp?.short_name ?? "") : (comp?.long_name ?? "")
            }

            const fullAddress = place.formatted_address ?? ""
            const city =
                get("locality") ||
                get("sublocality") ||
                get("administrative_area_level_2")
            const state = get("administrative_area_level_1", true) // e.g. "CA"
            const zip = get("postal_code")

            setValue("address", fullAddress, { shouldValidate: true })
            setValue("city", city, { shouldValidate: true })
            setValue("state", state, { shouldValidate: true })
            setValue("zipCode", zip, { shouldValidate: true })
            setAddressSelected(true)

            console.log("[Google Places] Parsed fields →", { address: fullAddress, city, state, zipCode: zip })
        })
    }, [setValue])

    useEffect(() => {
        if (mapsLoaded) initAutocomplete()
    }, [mapsLoaded, initAutocomplete])

    const { ref: registerAddressRef, ...registerAddressRest } = register("address")

    // Button blink class applied only when not submitting and address present
    const blinkClass = !isSubmitting && addressSelected ? "blink" : ""
    const buttonClass = `h-16 sm:h-[4.5rem] text-lg sm:text-xl font-extrabold uppercase tracking-wide rounded-xl transition-transform transform-gpu bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-[var(--color-text-white)] shadow-lg shadow-black/40 hover:scale-[1.02] active:scale-[0.98] ${blinkClass} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`

    const onSubmit = (data: LeadConsentFormData) => {
        setIsSubmitting(true)
        console.log("Lead form (consent) submitted:", data)
        // TODO: replace with real API call / CRM webhook
        const params = new URLSearchParams()
        params.append("address", data.address)
        if (data.city) params.append("city", data.city)
        if (data.state) params.append("state", data.state)
        if (data.zipCode) params.append("zipCode", String(data.zipCode))
        params.append("smsConsent", String(data.smsConsent ?? false))

        if (onNext) {
            setIsSubmitting(false)
            onNext(params)
        } else {
            router.push(`/property-info?${params.toString()}`)
        }
    }

    return (
        <>
            {/* ── Form ── */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Get a free cash offer"
                className="animate-fade-up rounded-3xl bg-[var(--background)] p-6 sm:p-8 md:p-10 border-2 border-[var(--color-primary-dark)] shadow-2xl shadow-black/50"
            >
                <h3 className="text-center text-4xl sm:text-5xl font-extrabold text-[var(--color-primary)] mb-3 leading-snug tracking-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.35)]">
                    Get An Offer In{" "}
                    <span className="cash-pulse text-[var(--color-secondary)]">24 Hours</span>
                </h3>
                <p className="text-center text-[var(--color-text-white)]/80 text-base sm:text-lg font-medium mb-7">
                    100% free. Zero obligation. Results in 24 hours.
                </p>

                <div className="flex flex-col gap-5">
                    {/* ── Property Address ── */}
                    <div>
                        <label
                            htmlFor={id("address")}
                            className="mb-2 block text-sm font-bold uppercase tracking-wide text-[var(--color-text-white)]/90"
                        >
                            Property Address
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-[var(--color-primary)]" aria-hidden="true" />
                            <Input
                                id={id("address")}
                                placeholder="Type In Your Address"
                                autoComplete="off"
                                ref={(el) => {
                                    registerAddressRef(el)
                                    addressInputRef.current = el
                                }}
                                onFocus={loadGoogleMaps}
                                {...registerAddressRest}
                                className="pl-14 h-14 sm:h-16 bg-[var(--color-amber-05)] border-2 border-[rgba(255,255,255,0.12)] text-[var(--color-text-white)] placeholder:text-[rgba(255,255,255,0.6)] font-semibold text-lg sm:text-xl rounded-xl focus-visible:ring-yellow-400/60 focus-visible:border-yellow-400/60 address-glow"
                                aria-invalid={!!errors.address}
                                aria-describedby={errors.address ? id("address-err") : undefined}
                            />
                        </div>
                        <FieldError message={errors.address?.message} />
                        {/* Hidden fields so city/state/zipCode/smsConsent are included in form data */}
                        <input type="hidden" {...register("city")} />
                        <input type="hidden" {...register("state")} />
                        <input type="hidden" {...register("zipCode")} />
                        <input type="hidden" {...register("smsConsent")} />
                    </div>

                    {/* ── Submit ── */}
                    <Button
                        type="submit"
                        disabled={isSubmitting || !addressSelected}
                        className={buttonClass}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
                                <span className="sr-only">Submitting…</span>
                            </>
                        ) : (
                            <>
                                GET MY FREE CASH OFFER
                                <ArrowRight className="ml-2 h-6 w-6" aria-hidden="true" />
                            </>
                        )}
                    </Button>

                    <p className="text-sm sm:text-base text-[var(--color-text-white)]/90 mt-1 text-center">
                        Receive your offer in approximately <span className="font-bold">2 minutes</span>.
                    </p>
                </div>

                <p className="text-xs sm:text-sm text-[var(--color-text-white)]/70 mt-5 text-center flex items-center justify-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[var(--color-primary)]" aria-hidden="true" />
                    Your information is secure and never shared with third parties.
                </p>
            </form>
        </>
    )
}

/* ─── Entry point ─────────────────────────────────────────────────────────── */

/**
 * Funnel entry: seller first books an appointment (low-friction, captures the
 * lead even if they never finish the long form), then continues to the offer form.
 */
export function LeadFormConsent({ onNext }: { onNext?: (params: URLSearchParams) => void } = {}) {
    const [booked, setBooked] = useState(false)
    const [showForm, setShowForm] = useState(false)

    // Returning in the same session after already booking: skip straight to the CTA.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is client-only
        if (hasBooked()) setBooked(true)
    }, [])

    if (showForm) return <AddressForm onNext={onNext} />

    if (!booked) {
        return (
            <div className="animate-fade-up rounded-3xl bg-[var(--background)] p-4 sm:p-6 border-2 border-[var(--color-primary-dark)] shadow-2xl shadow-black/50">
                <BookingWidget onBooked={() => setBooked(true)} />
            </div>
        )
    }

    return (
        <div
            role="status"
            className="animate-fade-up rounded-3xl bg-[var(--background)] p-6 sm:p-8 border-2 border-[var(--color-primary-dark)] shadow-2xl shadow-black/50 text-center"
        >
            <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-[#22c55e]" aria-hidden="true" />
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Your appointment is confirmed</h3>
            <p className="text-gray-300 text-sm sm:text-base mb-6">
                Want your cash offer ready before we talk? Tell us about your property — it only takes about 2 minutes.
            </p>
            <Button
                type="button"
                onClick={() => setShowForm(true)}
                className="h-14 w-full text-lg font-extrabold uppercase tracking-wide rounded-xl bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-[var(--color-text-white)] shadow-lg shadow-black/40"
            >
                GET MY FREE CASH OFFER
                <ArrowRight className="ml-2 h-6 w-6" aria-hidden="true" />
            </Button>
        </div>
    )
}
