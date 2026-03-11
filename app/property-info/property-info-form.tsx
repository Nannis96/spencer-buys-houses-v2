"use client"

import { useId, useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    ArrowRight,
    Loader2,
    ShieldCheck,
    CheckCircle2,
    Clock,
    DollarSign,
    Home,
    Wrench,
    BadgeCheck,
    HeartHandshake,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/* ─── Schema ──────────────────────────────────────────────────────────────── */

const propertyInfoSchema = z.object({
    // Property Information
    garage: z.string().optional(),
    basement: z.string().optional(),
    // Added property fields (kept as strings to match existing schema style)
    propertyType: z.string().optional(),
    bedrooms: z.string().optional(),
    bathrooms: z.string().optional(),
    squareFootage: z.string().optional(),
    yearsOwned: z.string().optional(),
    condition: z.string().min(1, "Please select the property condition"),
    repairs: z.string().optional(),
    occupied: z.string().min(1, "Please select who is living in the house"),
    listedWithRealtor: z.string().min(1, "Please indicate if the property is listed"),
    // Situation
    closingTimeline: z.string().optional(),
    ultimateGoal: z.string().min(1, "Please describe your ultimate goal for this property"),
    askingPrice: z.string().optional(),
    fairPrice: z.string().optional(),
    bestTimeToCall: z.string().optional(),
})

type PropertyInfoFormData = z.infer<typeof propertyInfoSchema>

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function FieldError({ message }: { message?: string }) {
    if (!message) return null
    return (
        <p role="alert" className="mt-1.5 text-xs text-red-400">
            {message}
        </p>
    )
}

const selectClass =
    "w-full h-12 rounded-md bg-white/10 border border-white/20 text-white px-3 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-[#f59e0b] " +
    "appearance-none cursor-pointer [&>option]:bg-[#1a1a2e] [&>option]:text-white"

const textareaClass =
    "w-full rounded-md bg-white/10 border border-white/20 text-white px-3 py-2.5 text-sm " +
    "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-[#f59e0b] resize-none min-h-[90px]"

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

/* ─── Why Spencer benefits ─────────────────────────────────────────────────── */

const benefits = [
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
]

/* ─── Success Screen ──────────────────────────────────────────────────────── */

function SuccessScreen() {
    return (
        <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-2xl mx-auto"
        >
            {/* Confirmation card */}
            <div
                className="rounded-2xl bg-[#1a1a2e] p-8 md:p-10 text-center border border-white/10 mb-10"
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
                <h3 className="text-2xl font-bold text-white mb-2">{"You're All Set!"}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed max-w-md mx-auto">
                    {"We've received your information and one of our home buying specialists will reach out very soon with your personalized cash offer."}
                </p>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b]/10 px-4 py-2 text-sm font-medium text-[#f59e0b]">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    Your information is 100% secure &amp; never shared
                </div>
            </div>

            {/* Why Spencer section */}
            <div className="text-center mb-8">
                <p className="text-xs font-semibold text-[#f59e0b] uppercase tracking-widest mb-2">
                    While you wait…
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Why Homeowners Choose Spencer
                </h3>
                <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
                    Selling your home the traditional way can take months and cost thousands. With Spencer
                    Buys Houses, the process is simple, fast, and completely on your terms.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((b) => (
                    <motion.div
                        key={b.title}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-xl bg-[#1a1a2e] border border-white/10 p-5 flex gap-4 items-start"
                    >
                        <div className="shrink-0 h-11 w-11 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center text-[#f59e0b]">
                            {b.icon}
                        </div>
                        <div>
                            <p className="font-semibold text-white text-sm mb-1">{b.title}</p>
                            <p className="text-gray-400 text-xs leading-relaxed">{b.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-10 text-center">
                <a
                    href="tel:+19016218799"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-[#0f0f23] font-bold px-8 py-4 text-lg transition-all hover:scale-[1.02]"
                >
                    Call Us Now — (901) 621-8799
                </a>
                <p className="text-gray-500 text-xs mt-3">
                    Questions? Call or text anytime — we answer 7 days a week.
                </p>
            </div>
        </motion.div>
    )
}

/* ─── Main Form Component ─────────────────────────────────────────────────── */

export function PropertyInfoForm() {
    const uid = useId()
    const id = (field: string) => `${uid}-${field}`
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    // All data forwarded from step 1 (address entry)
    const address = searchParams.get("address") ?? ""
    const city = searchParams.get("city") ?? ""
    const state = searchParams.get("state") ?? ""
    const zipCode = searchParams.get("zipCode") ?? ""
    const smsConsentPrev = searchParams.get("smsConsent") ?? "false"

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [avmResult, setAvmResult] = useState<any>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<PropertyInfoFormData>({
        resolver: zodResolver(propertyInfoSchema),
        defaultValues: {},
        mode: "onChange",
    })

    const onSubmit = async (data: PropertyInfoFormData) => {
        setIsSubmitting(true)

        // Build params to forward to step 3 (property-details)
        const params = new URLSearchParams()
        // Forward step 1 address data
        params.append("address", address)
        if (city) params.append("city", city)
        if (state) params.append("state", state)
        if (zipCode) params.append("zipCode", zipCode)
        if (smsConsentPrev) params.append("smsConsent", smsConsentPrev)
        // Property info fields from this step
        if (data.garage) params.append("garage", data.garage)
        if (data.basement) params.append("basement", data.basement)
        if (data.propertyType) params.append("propertyType", data.propertyType)
        if (data.bedrooms) params.append("bedrooms", data.bedrooms)
        if (data.bathrooms) params.append("bathrooms", data.bathrooms)
        if (data.squareFootage) params.append("squareFootage", data.squareFootage)
        if (data.yearsOwned) params.append("yearsOwned", data.yearsOwned)
        params.append("condition", data.condition)
        if (data.repairs) params.append("repairs", data.repairs)
        params.append("occupied", data.occupied)
        params.append("listedWithRealtor", data.listedWithRealtor)
        if (data.closingTimeline) params.append("closingTimeline", data.closingTimeline)
        params.append("ultimateGoal", data.ultimateGoal)
        if (data.askingPrice) params.append("askingPrice", data.askingPrice)
        if (data.fairPrice) params.append("fairPrice", data.fairPrice)
        if (data.bestTimeToCall) params.append("bestTimeToCall", data.bestTimeToCall)

        // --- Call AVM API before moving to next step ---
        try {
            const avmParams = new URLSearchParams()
            if (address) avmParams.append("address", address)
            if (city) avmParams.append("city", city)
            if (state) avmParams.append("state", state)
            if (data.propertyType) avmParams.append("propertyType", data.propertyType)
            if (data.bedrooms) avmParams.append("bedrooms", data.bedrooms)
            if (data.bathrooms) avmParams.append("bathrooms", data.bathrooms)
            if (data.squareFootage) avmParams.append("squareFootage", data.squareFootage)
            // Request AVM behavior from the backend
            avmParams.append("avm", "1")
            // maxRadius default is set server-side (DEFAULT_MAX_RADIUS=10), but also send it explicitly
            avmParams.append("maxRadius", String(10))

            const res = await fetch(`/api/rentcast?${avmParams.toString()}`)
            if (!res.ok) {
                const txt = await res.text()
                console.error("AVM API error:", res.status, txt)
            } else {
                const avmData = await res.json()
                setAvmResult(avmData)
                console.log("AVM result:", avmData)
            }
        } catch (err) {
            console.error("Failed to fetch AVM:", err)
        }

        setTimeout(() => {
            router.push(`/property-details?${params.toString()}`)
        }, 1500)
    }

    // Report step completion in URL so progress indicator can update in real time
    useEffect(() => {
        const params = new URLSearchParams(Array.from(searchParams.entries()))
        if (isValid) {
            params.set("step2Complete", "true")
        } else {
            params.delete("step2Complete")
        }
        const qs = params.toString()
        // Update the URL without triggering a Next navigation (which can cause
        // a scroll-to-top). Use history.replaceState to avoid navigation while
        // the user is interacting with the form.
        if (typeof window !== "undefined") {
            window.history.replaceState(null, "", `${pathname}${qs ? `?${qs}` : ""}`)
        }
    }, [isValid, router, pathname, searchParams])

    return (
        <AnimatePresence mode="wait">
            <motion.form
                key="property-info-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Property information"
                className="rounded-2xl bg-[var(--color-background)] p-6 md:p-8 border border-[var(--color-primary)]/60 w-full max-w-2xl mx-auto"
            >
                <h3 className="text-xl font-bold text-white mb-1">Property Information</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Excellent. We need a bit more info about your situation so we can provide you with your
                    options and an instant cash offer.
                    <br />
                    <span className="text-gray-500">
                        Please complete the form below. If you don&apos;t have the answers handy for some
                        fields, just leave them blank for now.
                    </span>
                </p>

                <div className="flex flex-col gap-5">

                    {/* ───────── PROPERTY INFORMATION ───────── */}
                    <SectionHeading>Property Information</SectionHeading>

                    {/* Garage + Basement row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor={id("garage")} className="block text-xs text-gray-400 mb-1.5">
                                Garage
                            </label>
                            <div className="relative">
                                <select id={id("garage")} {...register("garage")} className={selectClass}>
                                    <option value="">Select…</option>
                                    <option>None</option>
                                    <option>1 Car Attached</option>
                                    <option>1 Car Detached</option>
                                    <option>2 Car Attached</option>
                                    <option>2 Car Detached</option>
                                    <option>Carport</option>
                                    <option>Other</option>
                                </select>
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor={id("basement")} className="block text-xs text-gray-400 mb-1.5">
                                Basement
                            </label>
                            <div className="relative">
                                <select id={id("basement")} {...register("basement")} className={selectClass}>
                                    <option value="">Select…</option>
                                    <option>None</option>
                                    <option>Finished</option>
                                    <option>Partially Finished</option>
                                    <option>Unfinished</option>
                                    <option>Crawl Space</option>
                                    <option>Other</option>
                                </select>
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                            </div>
                        </div>
                    </div>

                    {/* Years owned */}
                    <div>
                        <label htmlFor={id("yearsOwned")} className="block text-xs text-gray-400 mb-1.5">
                            How long have you owned the property?
                        </label>
                        <Input
                            id={id("yearsOwned")}
                            placeholder="e.g. 5 years, inherited, just bought…"
                            {...register("yearsOwned")}
                            className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                        />
                    </div>

                    {/* Property type + Bedrooms row (strings to match schema) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor={id("propertyType")} className="block text-xs text-gray-400 mb-1.5">
                                Property Type
                            </label>
                            <div className="relative">
                                <select
                                    id={id("propertyType")}
                                    {...register("propertyType")}
                                    className={selectClass}
                                >
                                    <option value="">Select…</option>
                                    <option>Single Family</option>
                                    <option>Condo</option>
                                    <option>Townhouse</option>
                                    <option>Manufactured</option>
                                    <option>Multi-Family</option>
                                    <option>Apartment</option>
                                    <option>Land</option>
                                </select>
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor={id("bedrooms")} className="block text-xs text-gray-400 mb-1.5">
                                Bedrooms (use 0 for studio)
                            </label>
                            <Input
                                id={id("bedrooms")}
                                type="number"
                                step="0.5"
                                min={0}
                                placeholder="e.g. 3 or 0 for studio"
                                {...register("bedrooms")}
                                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                            />
                        </div>
                    </div>

                    {/* Bathrooms + Square footage row (strings to match schema) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor={id("bathrooms")} className="block text-xs text-gray-400 mb-1.5">
                                Bathrooms
                            </label>
                            <Input
                                id={id("bathrooms")}
                                type="number"
                                step="0.25"
                                min={0}
                                placeholder="e.g. 2.5"
                                {...register("bathrooms")}
                                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                            />
                        </div>

                        <div>
                            <label htmlFor={id("squareFootage")} className="block text-xs text-gray-400 mb-1.5">
                                Square Footage
                            </label>
                            <Input
                                id={id("squareFootage")}
                                type="number"
                                step="1"
                                min={0}
                                placeholder="e.g. 1450"
                                {...register("squareFootage")}
                                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                            />
                        </div>
                    </div>

                    {/* Condition (required) */}
                    <div>
                        <label htmlFor={id("condition")} className="block text-xs text-gray-400 mb-1.5">
                            What is the current condition of the property?{" "}
                            <span className="text-red-400" aria-hidden="true">*</span>
                        </label>
                        <div className="relative">
                            <select
                                id={id("condition")}
                                {...register("condition")}
                                className={selectClass}
                                aria-invalid={!!errors.condition}
                                aria-describedby={errors.condition ? id("condition-err") : undefined}
                            >
                                <option value="">Select condition…</option>
                                <option>Good</option>
                                <option>Fair</option>
                                <option>Poor</option>
                                <option>Terrible</option>
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                        </div>
                        <FieldError message={errors.condition?.message} />
                    </div>

                    {/* Repairs */}
                    <div>
                        <label htmlFor={id("repairs")} className="block text-xs text-gray-400 mb-1.5">
                            What kind of repairs and maintenance does the house need?
                        </label>
                        <textarea
                            id={id("repairs")}
                            placeholder="e.g. New roof, HVAC servicing, foundation cracks…"
                            {...register("repairs")}
                            className={textareaClass}
                        />
                    </div>

                    {/* Occupied (required) */}
                    <div>
                        <label htmlFor={id("occupied")} className="block text-xs text-gray-400 mb-1.5">
                            Is there anyone living in the house?{" "}
                            <span className="text-red-400" aria-hidden="true">*</span>
                        </label>
                        <div className="relative">
                            <select
                                id={id("occupied")}
                                {...register("occupied")}
                                className={selectClass}
                                aria-invalid={!!errors.occupied}
                            >
                                <option value="">Select…</option>
                                <option>Yes – Owner Occupied</option>
                                <option>Yes – Tenant Occupied</option>
                                <option>No – Vacant</option>
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                        </div>
                        <FieldError message={errors.occupied?.message} />
                    </div>

                    {/* Listed with realtor (required) */}
                    <div>
                        <label htmlFor={id("listedWithRealtor")} className="block text-xs text-gray-400 mb-1.5">
                            Is the house currently listed with a realtor?{" "}
                            <span className="text-red-400" aria-hidden="true">*</span>
                        </label>
                        <div className="relative">
                            <select
                                id={id("listedWithRealtor")}
                                {...register("listedWithRealtor")}
                                className={selectClass}
                                aria-invalid={!!errors.listedWithRealtor}
                            >
                                <option value="">Select…</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                        </div>
                        <FieldError message={errors.listedWithRealtor?.message} />
                    </div>

                    {/* ───────── YOUR SITUATION ───────── */}
                    <SectionHeading>Your Situation</SectionHeading>

                    {/* Closing timeline */}
                    <div>
                        <label htmlFor={id("closingTimeline")} className="block text-xs text-gray-400 mb-1.5">
                            How soon would you like us to CLOSE?
                        </label>
                        <p className="text-xs text-gray-500 mb-2">
                            We can close on the date YOU CHOOSE. If you need extra time to move after closing,
                            we can often accommodate.
                        </p>
                        <div className="relative">
                            <select id={id("closingTimeline")} {...register("closingTimeline")} className={selectClass}>
                                <option value="">Select…</option>
                                <option>30 days or less</option>
                                <option>30 – 60 days</option>
                                <option>60 – 90 days</option>
                                <option>90+ days</option>
                                <option>Flexible</option>
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                        </div>
                    </div>

                    {/* Ultimate goal (required) */}
                    <div>
                        <label htmlFor={id("ultimateGoal")} className="block text-xs text-gray-400 mb-1.5">
                            {"What's your ultimate goal with your house? "}
                            <span className="text-red-400" aria-hidden="true">*</span>
                        </label>
                        <textarea
                            id={id("ultimateGoal")}
                            placeholder="e.g. Sell fast for cash, avoid foreclosure, relocate…"
                            {...register("ultimateGoal")}
                            className={textareaClass}
                            aria-invalid={!!errors.ultimateGoal}
                        />
                        <FieldError message={errors.ultimateGoal?.message} />
                    </div>

                    {/* Price row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor={id("askingPrice")} className="block text-xs text-gray-400 mb-1.5">
                                What is your asking price?
                            </label>
                            <Input
                                id={id("askingPrice")}
                                placeholder="$ e.g. 120,000"
                                {...register("askingPrice")}
                                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                            />
                        </div>
                        <div>
                            <label htmlFor={id("fairPrice")} className="block text-xs text-gray-400 mb-1.5">
                                As-is fair price for both of us?
                            </label>
                            <Input
                                id={id("fairPrice")}
                                placeholder="$ e.g. 110,000"
                                {...register("fairPrice")}
                                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                            />
                        </div>
                    </div>

                    {/* Best time to call */}
                    <div>
                        <label htmlFor={id("bestTimeToCall")} className="block text-xs text-gray-400 mb-1.5">
                            When is the best time to call?
                        </label>
                        <div className="relative">
                            <select id={id("bestTimeToCall")} {...register("bestTimeToCall")} className={selectClass}>
                                <option value="">Select…</option>
                                <option>Anytime</option>
                                <option>Morning (8 am – 12 pm)</option>
                                <option>Afternoon (12 pm – 5 pm)</option>
                                <option>Evening (5 pm – 8 pm)</option>
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-14 text-lg font-bold bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/60 text-[var(--color-text-white)] rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                                <span className="sr-only">Submitting…</span>
                            </>
                        ) : (
                            <>
                                NEXT
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
