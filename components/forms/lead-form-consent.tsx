"use client"

import { useId, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, User, ArrowRight, Loader2, ShieldCheck, Building2, Hash } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LeadConsentFormData>({
        resolver: zodResolver(leadConsentSchema),
        defaultValues: {
            smsConsent: false,
            privacyConsent: false,
        },
    })

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
                                autoComplete="street-address"
                                {...register("address")}
                                className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                aria-invalid={!!errors.address}
                                aria-describedby={errors.address ? id("address-err") : undefined}
                            />
                        </div>
                        <FieldError message={errors.address?.message} />
                    </div>

                    {/* ── City ── */}
                    <div>
                        <label htmlFor={id("city")} className="sr-only">City</label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f59e0b]" aria-hidden="true" />
                            <Input
                                id={id("city")}
                                placeholder="City"
                                autoComplete="address-level2"
                                {...register("city")}
                                className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                aria-invalid={!!errors.city}
                                aria-describedby={errors.city ? id("city-err") : undefined}
                            />
                        </div>
                        <FieldError message={errors.city?.message} />
                    </div>

                    {/* ── State & ZIP row ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* State */}
                        <div>
                            <label htmlFor={id("state")} className="sr-only">State</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f59e0b]" aria-hidden="true" />
                                <Input
                                    id={id("state")}
                                    placeholder="State"
                                    autoComplete="address-level1"
                                    {...register("state")}
                                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                    aria-invalid={!!errors.state}
                                    aria-describedby={errors.state ? id("state-err") : undefined}
                                />
                            </div>
                            <FieldError message={errors.state?.message} />
                        </div>

                        {/* ZIP Code */}
                        <div>
                            <label htmlFor={id("zipCode")} className="sr-only">ZIP Code</label>
                            <div className="relative">
                                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f59e0b]" aria-hidden="true" />
                                <Input
                                    id={id("zipCode")}
                                    placeholder="ZIP Code"
                                    autoComplete="postal-code"
                                    inputMode="numeric"
                                    {...register("zipCode")}
                                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                    aria-invalid={!!errors.zipCode}
                                    aria-describedby={errors.zipCode ? id("zipCode-err") : undefined}
                                />
                            </div>
                            <FieldError message={errors.zipCode?.message} />
                        </div>
                    </div>

                    {/* ── SMS / Communications Consent (optional) ── */}
                    <div className="rounded-lg bg-white/[0.03] border border-white/10 p-3">
                        <label htmlFor={id("smsConsent")} className="flex items-start gap-3 cursor-pointer">
                            <input
                                id={id("smsConsent")}
                                type="checkbox"
                                {...register("smsConsent")}
                                className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/10 accent-[#f59e0b] cursor-pointer"
                            />
                            <span className="text-xs text-gray-400 leading-relaxed">
                                <span className="font-semibold text-gray-300">SMS &amp; Communications Consent (optional)</span>
                                {" — "}By checking this box you consent to receive SMS messages, emails, and calls from Spencer Buys Houses. Message frequency varies. Msg &amp; data rates may apply. Text <strong className="text-gray-300">HELP</strong> for help, <strong className="text-gray-300">STOP</strong> to cancel. Your information will not be sold to third parties.
                            </span>
                        </label>
                    </div>

                    {/* ── Privacy Consent (required) ── */}
                    <div>
                        <label htmlFor={id("privacyConsent")} className="flex items-start gap-3 cursor-pointer">
                            <input
                                id={id("privacyConsent")}
                                type="checkbox"
                                {...register("privacyConsent")}
                                className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/10 accent-[#f59e0b] cursor-pointer"
                                aria-required="true"
                                aria-invalid={!!errors.privacyConsent}
                                aria-describedby={errors.privacyConsent ? id("privacy-err") : undefined}
                            />
                            <span className="text-xs text-gray-400 leading-relaxed">
                                I agree to the{" "}
                                <a href="/terms" className="text-[#f59e0b] hover:underline focus:outline-none focus:ring-1 focus:ring-[#f59e0b] rounded">
                                    Terms &amp; Conditions
                                </a>
                                {" "}and{" "}
                                <a href="/privacy" className="text-[#f59e0b] hover:underline focus:outline-none focus:ring-1 focus:ring-[#f59e0b] rounded">
                                    Privacy Policy
                                </a>.{" "}
                                <span className="text-red-400" aria-hidden="true">*</span>
                                <span className="sr-only">(required)</span>
                            </span>
                        </label>
                        {errors.privacyConsent && (
                            <p id={id("privacy-err")} role="alert" className="mt-1.5 text-xs text-red-400 ml-7">
                                {errors.privacyConsent.message}
                            </p>
                        )}
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
