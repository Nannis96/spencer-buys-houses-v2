"use client"

import { useId, useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, User, Phone, Mail, ArrowRight, Loader2, ShieldCheck, Building2, Hash, CheckCircle2, DollarSign, Clock, Wrench, Home, BadgeCheck, HeartHandshake } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { CallButton } from "@/components/ui/call-button"

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

/* ─── Read-only summary row ───────────────────────────────────────────────── */

function SummaryRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0">
            <span className="text-[#f59e0b] shrink-0">{icon}</span>
            <span className="text-xs text-gray-400 w-20 shrink-0">{label}</span>
            <span className="text-sm text-white truncate">{value}</span>
        </div>
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

export function PropertyDetailsForm() {
    const uid = useId()
    const id = (field: string) => `${uid}-${field}`
    const searchParams = useSearchParams()

    // stable string representation of search params to avoid effect re-running
    const spString = searchParams.toString()
    const address = searchParams.get("address") ?? ""
    const city = searchParams.get("city") ?? ""
    const state = searchParams.get("state") ?? ""
    const zipCode = searchParams.get("zipCode") ?? ""
    const smsConsent = searchParams.get("smsConsent") ?? "false"

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [offerLoading, setOfferLoading] = useState(false)
    const [repairCost, setRepairCost] = useState<number | null>(null)
    const [finalOffer, setFinalOffer] = useState<number | null>(null)

    // Local editable copies of prior-step values (inline edit)
    const [localAddress, setLocalAddress] = useState(address)
    const [localCity, setLocalCity] = useState(city)
    const [localState, setLocalState] = useState(state)
    const [localZipCode, setLocalZipCode] = useState(zipCode)
    const [localSmsConsent, setLocalSmsConsent] = useState(smsConsent)

    const router = useRouter()
    const pathname = usePathname()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<PropertyDetailsFormData>({
        resolver: zodResolver(propertyDetailsSchema),
        mode: "onChange",
    })

    const onSubmit = async (data: PropertyDetailsFormData) => {
        setIsSubmitting(true)
        console.log("Form completed:", { address: localAddress, city: localCity, state: localState, zipCode: localZipCode, ...data })

        // Begin offer calculation: fetch AVM (priceRangeLow) and compute repairs
        try {
            setOfferLoading(true)
            const params = new URLSearchParams(Array.from(searchParams.entries()))
            params.set("avm", "1")
            params.set("maxRadius", "1")

            const res = await fetch(`/api/rentcast?${params.toString()}`)
            let avmData: any = null
            if (res.ok) {
                avmData = await res.json()
            } else {
                console.error("AVM fetch failed:", res.status)
            }

            // Extract priceRangeLow (fallback to price if missing)
            const priceLow = (avmData && (avmData.priceRangeLow ?? avmData.price ?? null)) || null

            // Determine inputs for repair calc
            const sqft = Number(searchParams.get("squareFootage") ?? 0) || 0
            const propertyType = (searchParams.get("propertyType") || "Single Family")
            const cond = Number(searchParams.get("condition") || "3") || 3

            // Try to get yearBuilt from AVM subjectProperty or search params
            const yearBuiltRaw = avmData?.subjectProperty?.yearBuilt ?? searchParams.get("yearBuilt")
            const yearBuilt = yearBuiltRaw ? Number(yearBuiltRaw) : undefined

            // Calculate base cost per sqft following app.py logic
            let baseCost = 15
            if (yearBuilt !== undefined && !Number.isNaN(yearBuilt)) {
                if (yearBuilt < 1950) baseCost = 75
                else if (yearBuilt < 1978) baseCost = 60
                else if (yearBuilt < 1990) baseCost = 40
                else if (yearBuilt < 2000) baseCost = 25
                else baseCost = 15
            } else {
                // conservative default when year built unknown
                baseCost = 40
            }

            const typeMultipliers: Record<string, number> = {
                "Single Family": 1.0,
                "Multi-Family": 1.3,
                Apartment: 1.3,
                Condo: 0.6,
                Townhouse: 0.8,
                "Mobile Home": 1.5,
                Land: 0.0,
            }
            const typeMult = typeMultipliers[propertyType] ?? 1.0

            const conditionMultipliers: Record<number, number> = { 1: 0.4, 2: 0.7, 3: 1.0, 4: 1.35, 5: 1.75 }
            const condMult = conditionMultipliers[cond] ?? 1.0

            const repairPerSqft = baseCost * typeMult * condMult
            const totalRepairs = Math.max(0, Math.round(sqft * repairPerSqft))

            setRepairCost(totalRepairs)

            // Compute final cash offer using priceRangeLow per instructions
            let offer = null
            if (priceLow !== null) {
                offer = Math.max(0, Math.round((Number(priceLow) - totalRepairs) * 0.7))
                setFinalOffer(offer)
            }

            // Log to console as requested
            console.log("Calculated repair cost:", totalRepairs)
            console.log("Final cash offer (70% of priceRangeLow - repairs):", offer)

            // reflect success in URL so progress indicator can show final state
            const outParams = new URLSearchParams(Array.from(searchParams.entries()))
            outParams.set("submitted", "true")
            outParams.set("step3Complete", "true")
            const qs = outParams.toString()

            // small delay to keep UX friendly, then show success screen
            setTimeout(() => {
                setIsSubmitting(false)
                setOfferLoading(false)
                setSubmitted(true)
                router.replace(`${pathname}${qs ? `?${qs}` : ""}`)
            }, 600)
        } catch (err) {
            console.error("Offer calculation failed:", err)
            setIsSubmitting(false)
            setOfferLoading(false)
            // still mark submitted so the user sees confirmation even if calc failed
            setSubmitted(true)
        }
    }

    // Report step 3 partial-completion in URL so progress indicator updates in real time
    useEffect(() => {
        const params = new URLSearchParams(spString)
        if (isValid) {
            params.set("step3Complete", "true")
        } else {
            params.delete("step3Complete")
        }
        const qs = params.toString()
        const newUrl = `${pathname}${qs ? `?${qs}` : ""}`

        // only replace if the URL actually changes (prevents repeated router.replace calls)
        if (typeof window !== "undefined" && newUrl !== window.location.pathname + window.location.search) {
            router.replace(newUrl)
        }
    }, [isValid, pathname, router, spString])

    if (submitted) {
        return (
            <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-lg mx-auto"
            >
                <div
                    className="rounded-2xl bg-[var(--color-background)] p-8 md:p-10 text-center border border-[var(--color-primary)]/60 mb-8"
                    role="status"
                    aria-live="polite"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#22c55e]/10"
                        aria-hidden
                    >
                        <CheckCircle2 className="h-10 w-10 text-[#22c55e]" />
                    </motion.div>

                    {/* Primary: Offer first (large, prominent) */}
                    <div className="mt-2 text-center">
                        {offerLoading ? (
                            <div className="inline-flex items-center gap-3 text-sm text-gray-300">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Calculating your cash offer…
                            </div>
                        ) : finalOffer !== null ? (

                            <div className="mt-1">
                                <p className="text-3xl md:text-4xl font-extrabold text-white leading-tight">YOUR CAS OFFER ${finalOffer?.toLocaleString?.()}</p>
                            </div>
                        ) : (
                            <div className="mt-1 text-sm text-gray-400">No offer available at this time.</div>
                        )}
                    </div>

                    {/* Secondary: confirmation copy and security badge */}
                    <h3 className="text-xl md:text-2xl font-semibold text-white my-4">You're All Set!</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed max-w-md mx-auto text-sm">
                        We've received your information — one of our home buying specialists will reach out soon with details and next steps.
                    </p>
                    <p className="text-gray-300 mb-4 leading-relaxed max-w-md mx-auto text-sm">
                        Estimated cash offer — approximate and subject to verification
                    </p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-4 py-2 text-sm font-medium text-[var(--color-primary)]">
                        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                        Your information is 100% secure &amp; never shared
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { icon: <DollarSign className="h-6 w-6" />, title: "No Fees or Commissions", desc: "We pay all closing costs. Zero agent commissions. The offer we make is the cash you receive." },
                        { icon: <Clock className="h-6 w-6" />, title: "Close On Your Timeline", desc: "Need to close in 7 days? Or need 90? We work around your schedule — not ours." },
                        { icon: <Wrench className="h-6 w-6" />, title: "We Buy As-Is", desc: "Don't lift a finger. No repairs, cleaning, or renovations required before closing." },
                        { icon: <Home className="h-6 w-6" />, title: "Any Condition, Any Situation", desc: "Foreclosure, probate, divorce, inherited property — we've seen it all and we can help." },
                        { icon: <BadgeCheck className="h-6 w-6" />, title: "Local & Trusted", desc: "Spencer is a Memphis-based buyer. You work directly with us — no middlemen, no runaround." },
                        { icon: <HeartHandshake className="h-6 w-6" />, title: "Stress-Free Process", desc: "Three simple steps: get an offer, accept it, and get paid. That's it." },
                    ].map((b) => (
                        <motion.div
                            key={b.title}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="rounded-xl bg-[var(--color-background)] border border-white/10 p-5 flex gap-4 items-start"
                        >
                            <div className="shrink-0 h-11 w-11 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                                {b.icon}
                            </div>
                            <div>
                                <p className="font-semibold text-white text-sm mb-1">{b.title}</p>
                                <p className="text-gray-400 text-xs leading-relaxed">{b.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <CallButton />
                </div>
            </motion.div>
        )
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
                className="rounded-2xl bg-[var(--color-background)] p-6 md:p-8 border border-[var(--color-primary)]/60 w-full max-w-lg mx-auto"
            >
                <h3 className="text-xl font-bold text-white mb-1">
                    One More Step — Tell Us {" "}
                    <span className="text-[var(--color-text-yellow)]">About The Property</span>
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                    100% free. Zero obligation. Results in 24&nbsp;hours.
                </p>

                {/* ── Summary of previous step (inline editable) ── */}
                <div className="rounded-lg bg-white/[0.03] border border-[var(--color-primary)]/60 p-3 mb-6">
                    <div className="flex items-start justify-between mb-2">
                        <p className="text-xs font-semibold text-[var(--color-primary-dark)] uppercase tracking-wider">
                            Your information
                        </p>
                        {!editMode && (
                            <button
                                type="button"
                                onClick={() => setEditMode(true)}
                                className="text-xs text-[var(--color-primary)] hover:underline focus:outline-none"
                            >
                                Edit
                            </button>
                        )}
                    </div>

                    {editMode ? (
                        <div className="space-y-3">
                            <Input
                                placeholder="Property address"
                                value={localAddress}
                                onChange={(e) => setLocalAddress(e.target.value)}
                                className="h-10 bg-white/5 text-white placeholder:text-gray-400"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <Input
                                    placeholder="City"
                                    value={localCity}
                                    onChange={(e) => setLocalCity(e.target.value)}
                                    className="h-10 bg-white/5 text-white placeholder:text-gray-400"
                                />
                                <Input
                                    placeholder="State"
                                    value={localState}
                                    onChange={(e) => setLocalState(e.target.value)}
                                    className="h-10 bg-white/5 text-white placeholder:text-gray-400"
                                />
                            </div>

                            <Input
                                placeholder="Zip code"
                                value={localZipCode}
                                onChange={(e) => setLocalZipCode(e.target.value)}
                                className="h-10 bg-white/5 text-white placeholder:text-gray-400"
                            />

                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    onClick={() => setEditMode(false)}
                                    className="h-10 px-4 bg-[#f59e0b] text-[#0f0f23]"
                                >
                                    Save
                                </Button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setLocalAddress(address)
                                        setLocalCity(city)
                                        setLocalState(state)
                                        setLocalZipCode(zipCode)
                                        setLocalSmsConsent(smsConsent)
                                        setEditMode(false)
                                    }}
                                    className="h-10 px-4 rounded-lg border border-white/10 text-sm text-white"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <SummaryRow icon={<MapPin className="h-4 w-4 text-[var(--color-primary)]" />} label="Address" value={localAddress} />
                            <SummaryRow icon={<Building2 className="h-4 w-4 text-[var(--color-primary)]" />} label="City" value={localCity} />
                            <SummaryRow icon={<Building2 className="h-4 w-4 text-[var(--color-primary)]" />} label="State" value={localState} />
                            <SummaryRow icon={<Hash className="h-4 w-4 text-[var(--color-primary)]" />} label="Zip Code" value={localZipCode} />
                        </>
                    )}
                </div>

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

                    {/* ── Submit ── */}
                    {/* ───────── CONSENT ───────── */}
                    {/* <SectionHeading>Consent</SectionHeading> */}
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
