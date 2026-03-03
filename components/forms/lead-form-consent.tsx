"use client"

import { useId, useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, User, ArrowRight, Loader2, ShieldCheck, Building2, Hash } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""

/* ─── Schema ──────────────────────────────────────────────────────────────── */

const leadConsentSchema = z.object({
    address: z.string().min(5, "Please enter a valid property address"),
    city: z.string().min(2, "Please enter your city"),
    state: z.string().min(2, "Please enter your state"),
    zipCode: z
        .string()
        .min(5, "Please enter a valid ZIP code")
        .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
    // Optional – user can opt in to SMS
    smsConsent: z.boolean().optional(),
    // Required – must explicitly agree to Privacy Policy
    privacyConsent: z
        .boolean()
        .refine((val) => val === true, {
            message: "You must agree to the Terms & Conditions and Privacy Policy",
        }),
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

export function LeadFormConsent() {
    const uid = useId()          // stable unique prefix per instance (safe for SSR)
    const id = (field: string) => `${uid}-${field}`
    const router = useRouter()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [mapsLoaded, setMapsLoaded] = useState(false)

    const addressInputRef = useRef<HTMLInputElement | null>(null)
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LeadConsentFormData>({
        resolver: zodResolver(leadConsentSchema),
        defaultValues: {
            smsConsent: false,
            privacyConsent: false,
        },
    })

    // ── Load Google Maps script ──────────────────────────────────────────────
    useEffect(() => {
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

            console.log("[Google Places] Parsed fields →", { address: fullAddress, city, state, zipCode: zip })
        })
    }, [setValue])

    useEffect(() => {
        if (mapsLoaded) initAutocomplete()
    }, [mapsLoaded, initAutocomplete])

    const { ref: registerAddressRef, ...registerAddressRest } = register("address")

    const onSubmit = (data: LeadConsentFormData) => {
        setIsSubmitting(true)
        console.log("Lead form (consent) submitted:", data)
        // TODO: replace with real API call / CRM webhook
        const params = new URLSearchParams({
            address: data.address,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            smsConsent: String(data.smsConsent ?? false),
        })
        setTimeout(() => {
            router.push(`/property-details?${params.toString()}`)
        }, 1500)
    }

    return (
        <AnimatePresence mode="wait">
            {/* ── Form ── */}
            <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Get a free cash offer"
                className="rounded-2xl bg-[#1a1a2e] p-6 md:p-8 border border-white/10"
            >
                <h3 className="text-xl font-bold text-white mb-1">
                    Get An Offer Today, Sell In A Matter Of Days
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                    100% free. Zero obligation. Results in 24 hours.
                </p>

                <div className="flex flex-col gap-4">
                    {/* ── Property Address ── */}
                    <div>
                        <label htmlFor={id("address")} className="sr-only">Property address</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f59e0b]" aria-hidden="true" />
                            <Input
                                id={id("address")}
                                placeholder="Property Address"
                                autoComplete="off"
                                ref={(el) => {
                                    registerAddressRef(el)
                                    addressInputRef.current = el
                                }}
                                {...registerAddressRest}
                                className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                aria-invalid={!!errors.address}
                                aria-describedby={errors.address ? id("address-err") : undefined}
                            />
                        </div>
                        <FieldError message={errors.address?.message} />
                    </div>

                    {/* ── Submit ── */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-14 text-lg font-bold bg-[#f59e0b] hover:bg-[#d97706] text-[#0f0f23] rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                                <span className="sr-only">Submitting…</span>
                            </>
                        ) : (
                            <>
                                GET MY FREE CASH OFFER
                                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                            </>
                        )}
                    </Button>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center flex items-center justify-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    Your information is secure and never shared with third parties.
                </p>
            </motion.form>
        </AnimatePresence>
    )
}
