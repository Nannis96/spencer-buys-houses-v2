"use client"

import { useId, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, User, ArrowRight, Loader2, CheckCircle2, ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/* ─── Schema ──────────────────────────────────────────────────────────────── */

const leadConsentSchema = z.object({
    firstName: z.string().min(2, "Please enter your first name"),
    lastName: z.string().min(2, "Please enter your last name"),
    address: z.string().min(5, "Please enter a valid property address"),
    phone: z
        .string()
        .min(10, "Please enter a valid phone number")
        .regex(/^[\d\s\-().+]+$/, "Please enter a valid phone number"),
    email: z.string().email("Please enter a valid email address"),
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

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

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
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitted(true)
        }, 1500)
    }

    return (
        <AnimatePresence mode="wait">
            {/* ── Success state ── */}
            {submitted ? (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="rounded-2xl bg-[#1a1a2e] p-8 md:p-10 text-center border border-white/10"
                    role="status"
                    aria-live="polite"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#22c55e]/10"
                    >
                        <CheckCircle2 className="h-10 w-10 text-[#22c55e]" aria-hidden="true" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                        {"You're All Set!"}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        {"One of our home buying specialists will reach out within the next 24 hours with your personalized cash offer."}
                    </p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b]/10 px-4 py-2 text-sm font-medium text-[#f59e0b]">
                        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                        Your information is 100% secure
                    </div>
                </motion.div>
            ) : (
                /* ── Form ── */
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

                        {/* ── Name row ── */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor={id("firstName")} className="sr-only">First name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f59e0b]" aria-hidden="true" />
                                    <Input
                                        id={id("firstName")}
                                        placeholder="First Name"
                                        autoComplete="given-name"
                                        {...register("firstName")}
                                        className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                        aria-invalid={!!errors.firstName}
                                        aria-describedby={errors.firstName ? id("firstName-err") : undefined}
                                    />
                                </div>
                                <FieldError message={errors.firstName?.message} />
                            </div>
                            <div>
                                <label htmlFor={id("lastName")} className="sr-only">Last name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f59e0b]" aria-hidden="true" />
                                    <Input
                                        id={id("lastName")}
                                        placeholder="Last Name"
                                        autoComplete="family-name"
                                        {...register("lastName")}
                                        className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                        aria-invalid={!!errors.lastName}
                                        aria-describedby={errors.lastName ? id("lastName-err") : undefined}
                                    />
                                </div>
                                <FieldError message={errors.lastName?.message} />
                            </div>
                        </div>

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

                        {/* ── Phone ── */}
                        <div>
                            <label htmlFor={id("phone")} className="sr-only">Phone number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f59e0b]" aria-hidden="true" />
                                <Input
                                    id={id("phone")}
                                    type="tel"
                                    placeholder="Phone Number"
                                    autoComplete="tel"
                                    {...register("phone")}
                                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                    aria-invalid={!!errors.phone}
                                    aria-describedby={errors.phone ? id("phone-err") : undefined}
                                />
                            </div>
                            <FieldError message={errors.phone?.message} />
                        </div>

                        {/* ── Email ── */}
                        <div>
                            <label htmlFor={id("email")} className="sr-only">Email address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f59e0b]" aria-hidden="true" />
                                <Input
                                    id={id("email")}
                                    type="email"
                                    placeholder="Email Address"
                                    autoComplete="email"
                                    {...register("email")}
                                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? id("email-err") : undefined}
                                />
                            </div>
                            <FieldError message={errors.email?.message} />
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
            )}
        </AnimatePresence>
    )
}
