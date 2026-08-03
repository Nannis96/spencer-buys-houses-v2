"use client"

import { useId, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Phone, Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/* ─── Schema ──────────────────────────────────────────────────────────────── */
const propertyDetailsSchema = z.object({
    firstName: z.string().min(2, "Please enter your first name"),
    lastName: z.string().min(2, "Please enter your last name"),
    phone: z
        .string()
        .min(10, "Please enter a valid phone number")
        .regex(/^[\d\s\-().+]+$/, "Please enter a valid phone number"),
    email: z.string().email("Please enter a valid email address"),
    smsConsent: z.boolean().optional(),
    privacyConsent: z
        .boolean()
        .refine((v) => v === true, {
            message: "You must agree to the Terms & Conditions and Privacy Policy",
        }),
})

type PropertyDetailsFormData = z.infer<typeof propertyDetailsSchema>

/* ─── Field error ─────────────────────────────────────────────────────────── */
function FieldError({ message }: { message?: string }) {
    if (!message) return null
    return (
        <p role="alert" className="mt-1.5 text-xs text-red-400">
            {message}
        </p>
    )
}

function SectionHeading({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <h4
            className={
                "text-base font-bold text-[var(--color-primary)] uppercase tracking-wider mb-4 pt-2 border-t border-white/10 first:border-0 first:pt-0 " +
                (className ?? "")
            }
        >
            {children}
        </h4>
    )
}

/* ─── Component ───────────────────────────────────────────────────────────── */
export function PropertyDetailsForm({ initialParams }: { initialParams?: URLSearchParams | null } = {}) {
    const uid = useId()
    const id = (field: string) => `${uid}-${field}`
    const searchParams = useSearchParams()

    // Helper: prefer initialParams (from multi-step wrapper) over URL search params
    const p = (k: string) => initialParams?.get(k) ?? searchParams.get(k)

    // Address as confirmed by the seller on the previous step
    const address = p("address") ?? ""
    const city = p("city") ?? ""
    const state = p("state") ?? ""
    const zipCode = p("zipCode") ?? ""

    const [isSubmitting, setIsSubmitting] = useState(false)

    // Offer may have been precomputed in property-info-form and passed via URL params.
    // Only forwarded to the lead webhook below — display of these values now lives on /bookings.
    const precomputedCashOffer = p("cashOffer") !== null ? Number(p("cashOffer")) : null
    const precomputedRepairCosts = p("repairCosts") !== null ? Number(p("repairCosts")) : null
    const precomputedArv = p("arv") !== null ? Number(p("arv")) : null
    const precomputedEstimatedRent = p("estimatedRent") !== null ? Number(p("estimatedRent")) : null
    const precomputedAnnualTaxes = p("annualTaxes") !== null ? Number(p("annualTaxes")) : null
    const precomputedInsuranceAnnual = p("insuranceAnnual") !== null ? Number(p("insuranceAnnual")) : null
    console.log('Precomputed offer (from URL):', { precomputedCashOffer, precomputedRepairCosts })

    const router = useRouter()

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<PropertyDetailsFormData>({
        resolver: zodResolver(propertyDetailsSchema),
        mode: "onChange",
        defaultValues: {
            firstName: p("_firstName") ?? "",
            lastName: p("_lastName") ?? "",
            phone: p("_phone") ?? "",
            email: p("_email") ?? "",
        },
    })

    const onSubmit = async (data: PropertyDetailsFormData) => {
        setIsSubmitting(true)
        console.log("Form completed:", { address, city, state, zipCode, ...data })

        // Build and print combined JSON of all form data (for debugging)
        const combinedFormData = {
            address: { address, city, state, zipCode },
            // explicit top-level fields for GHL mapping
            askingPrice: p("askingPrice") ?? null,
            // include all search params forwarded from previous steps
            searchParams: Object.fromEntries(Array.from((initialParams ?? searchParams).entries())),
            // current step form data
            formData: data,
            // any precomputed offer values that may have been passed via URL
            precomputed: {
                cashOffer: precomputedCashOffer,
                repairCosts: precomputedRepairCosts,
                arv: precomputedArv,
                estimatedRent: precomputedEstimatedRent,
                annualTaxes: precomputedAnnualTaxes,
                insuranceAnnual: precomputedInsuranceAnnual,
            },
        }

        console.log("Combined form JSON:", JSON.stringify(combinedFormData, null, 2))

        // Send lead data to webhook. The seller always continues to /bookings, so a
        // failure here is logged rather than surfaced — but it must not pass silently.
        try {
            const res = await fetch("https://services.leadconnectorhq.com/hooks/sD7ANbPAIA28p65ZSvJl/webhook-trigger/85b6e410-ce4c-49be-b54d-f29a32f2846a", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(combinedFormData),
            })
            if (!res.ok) {
                console.error("Webhook rejected the lead:", res.status, await res.text().catch(() => ""))
            }
        } catch (err) {
            console.error("Webhook error:", err)
        }

        // Persist the seller's name for the /bookings page header, then redirect there
        // to schedule the appointment. sessionStorage can throw in private-browsing
        // modes or when cookies/storage are blocked — never let that block the redirect.
        try {
            if (typeof window !== "undefined") {
                window.sessionStorage.setItem("sellerName", `${data.firstName} ${data.lastName}`.trim())
            }
        } catch (err) {
            console.error("sessionStorage error:", err)
        }

        setIsSubmitting(false)
        router.push("/bookings")
    }

    return (
        <AnimatePresence mode="wait">
            <motion.form
                key="property-details-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Property details"
                className="rounded-2xl bg-[var(--color-background)] p-4 sm:p-6 md:p-8 lg:p-10 border border-[var(--color-primary)]/60 w-full max-w-3xl lg:max-w-4xl mx-auto"
            >
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-bold text-white">
                        One More Step — {" "}
                        <span className="text-[var(--color-text-yellow)]">To See Your <span className="font-bold underline">OFFER</span></span>
                    </h3>
                    <button
                        type="button"
                        onClick={() => {
                            const p = new URLSearchParams(Array.from(searchParams.entries()))
                            // Return the seller to the last /property-info step (6 — confirm
                            // property details) rather than to the start of that page.
                            p.set("propInfoStep", "6")
                            // Save current Your Info values so they survive the round-trip
                            const vals = getValues()
                            if (vals.firstName) p.set("_firstName", vals.firstName)
                            if (vals.lastName) p.set("_lastName", vals.lastName)
                            if (vals.phone) p.set("_phone", vals.phone)
                            if (vals.email) p.set("_email", vals.email)
                            window.location.href = `/property-info?${p.toString()}`
                        }}
                        className="text-sm text-[var(--color-primary)] hover:underline flex items-center gap-1.5 shrink-0 ml-4"
                    >
                        ← Back
                    </button>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                    100% free. Zero obligation. Results in 24&nbsp;hours.
                </p>

                <div className="flex flex-col gap-4">
                    {/* ── Name row ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor={id("firstName")} className="sr-only">First name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />
                                <Input
                                    id={id("firstName")}
                                    placeholder="First Name"
                                    autoComplete="given-name"
                                    {...register("firstName")}
                                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[var(--color-primary)] focus-visible:border-[var(--color-primary)]"
                                    aria-invalid={!!errors.firstName}
                                    aria-describedby={errors.firstName ? id("firstName-err") : undefined}
                                />
                            </div>
                            <FieldError message={errors.firstName?.message} />
                        </div>
                        <div>
                            <label htmlFor={id("lastName")} className="sr-only">Last name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />
                                <Input
                                    id={id("lastName")}
                                    placeholder="Last Name"
                                    autoComplete="family-name"
                                    {...register("lastName")}
                                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[var(--color-primary)] focus-visible:border-[var(--color-primary)]"
                                    aria-invalid={!!errors.lastName}
                                    aria-describedby={errors.lastName ? id("lastName-err") : undefined}
                                />
                            </div>
                            <FieldError message={errors.lastName?.message} />
                        </div>
                    </div>

                    {/* ── Phone ── */}
                    <div>
                        <label htmlFor={id("phone")} className="sr-only">Phone number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />
                            <Input
                                id={id("phone")}
                                type="tel"
                                placeholder="Phone Number"
                                autoComplete="tel"
                                {...register("phone")}
                                className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[var(--color-primary)] focus-visible:border-[var(--color-primary)]"
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
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />
                            <Input
                                id={id("email")}
                                type="email"
                                placeholder="Email Address"
                                autoComplete="email"
                                {...register("email")}
                                className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[var(--color-primary)] focus-visible:border-[var(--color-primary)]"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? id("email-err") : undefined}
                            />
                        </div>
                        <FieldError message={errors.email?.message} />
                    </div>

                    {/* ───────── CONSENT ───────── */}
                    <SectionHeading className="mt-1">Consent</SectionHeading>

                    {/* SMS Consent */}
                    <div className="rounded-lg bg-white/[0.03] border border-white/10 p-3 -mt-3">
                        <label htmlFor={id("smsConsent")} className="flex items-start gap-3 cursor-pointer">
                            <input
                                id={id("smsConsent")}
                                type="checkbox"
                                {...register("smsConsent")}
                                className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/10 accent-[#f59e0b] cursor-pointer"
                            />
                            <span className="text-xs text-gray-400 leading-relaxed">
                                <span className="font-semibold text-gray-300">SMS Consent (optional)</span>
                                {" — "}By checking this box you consent to receive SMS messages, emails, and
                                calls from Spencer Buys Houses. Message frequency varies. Msg &amp; data rates
                                may apply. To unsubscribe, follow the instructions in our communications.
                                Text <strong className="text-gray-300">HELP</strong> for help,{" "}
                                <strong className="text-gray-300">STOP</strong> to cancel. Your information
                                will not be sold to third parties.
                            </span>
                        </label>
                    </div>

                    {/* Privacy Consent (required) */}
                    <div>
                        <label htmlFor={id("privacyConsent")} className="flex items-start gap-3 cursor-pointer">
                            <input
                                id={id("privacyConsent")}
                                type="checkbox"
                                {...register("privacyConsent")}
                                className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/10 accent-[#f59e0b] cursor-pointer"
                                aria-required="true"
                                aria-invalid={!!errors.privacyConsent}
                            />
                            <span className="text-xs text-gray-400 leading-relaxed">
                                I agree to the{" "}
                                <a href="/terms" className="text-[#f59e0b] hover:underline">
                                    Terms &amp; Conditions
                                </a>{" "}
                                and{" "}
                                <a href="/privacy" className="text-[#f59e0b] hover:underline">
                                    Privacy Policy
                                </a>
                                .{" "}
                                <span className="text-red-400" aria-hidden="true">*</span>
                            </span>
                        </label>
                        <FieldError message={errors.privacyConsent?.message} />
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
