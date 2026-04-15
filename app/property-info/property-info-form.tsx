"use client"

import { useId, useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RehabConditionWheel } from "@/components/ui/rehab-condition-wheel"
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
    MapPin,
    Building2,
    Hash,
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
    yearBuilt: z.string().optional(),
    yearsOwned: z.string().optional(),
    ownerName: z.string().optional(),
    condition: z.string().min(1, "Please select the property condition"),
    // Structured repairs input: checklist of common items, an estimated repair cost, and optional notes
    repairsChecklist: z.array(z.string()).optional(),
    repairsEstimate: z.string().optional(),
    repairsNotes: z.string().optional(),
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
    "w-full h-12 rounded-md bg-white/10 border border-white/20 text-white px-3 text-base sm:text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-[#f59e0b] " +
    "appearance-none cursor-pointer [&>option]:bg-[#1a1a2e] [&>option]:text-white"

const textareaClass =
    "w-full rounded-md bg-white/10 border border-white/20 text-white px-3 py-2.5 text-base sm:text-sm " +
    "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-[#f59e0b] resize-none min-h-[90px]"

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

    // Local editable copies of address from step 1
    const [editMode, setEditMode] = useState(false)
    const [localAddress, setLocalAddress] = useState(address)
    const [localCity, setLocalCity] = useState(city)
    const [localState, setLocalState] = useState(state)
    const [localZipCode, setLocalZipCode] = useState(zipCode)
    // Confirmed/saved address — changes here re-trigger the Rentcast prefill
    const [savedAddress, setSavedAddress] = useState(address)
    const [savedCity, setSavedCity] = useState(city)
    const [savedState, setSavedState] = useState(state)
    const [savedZipCode, setSavedZipCode] = useState(zipCode)
    // Geocoding state (for Street View lat/lng)
    const [geoLatLng, setGeoLatLng] = useState<{ lat: number; lng: number } | null>(null)
    const [isGeocoding, setIsGeocoding] = useState(false)
    const [geocodeError, setGeocodeError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid },
    } = useForm<PropertyInfoFormData>({
        resolver: zodResolver(propertyInfoSchema),
        defaultValues: {},
        mode: "onChange",
    })

    const [isPrefilling, setIsPrefilling] = useState(false)
    const [lastSaleDateDisplay, setLastSaleDateDisplay] = useState<string | null>(null)

    /** Returns a human-readable string like "~2 years (last sold Jan 2023)" */
    function formatYearsOwned(isoDate: string): string {
        try {
            const sold = new Date(isoDate)
            const now = new Date()
            const diffMs = now.getTime() - sold.getTime()
            const years = diffMs / (1000 * 60 * 60 * 24 * 365.25)
            const monthStr = sold.toLocaleDateString("en-US", { month: "short", year: "numeric" })
            if (years < 1) {
                const months = Math.round(years * 12)
                return `~${months} month${months !== 1 ? "s" : ""} (last sold ${monthStr})`
            }
            const yrs = Math.floor(years)
            return `~${yrs} year${yrs !== 1 ? "s" : ""} (last sold ${monthStr})`
        } catch {
            return isoDate
        }
    }

    // Repairs UI state: checklist and a global estimated repair cost (slider)
    const repairOptions = [
        "Roof",
        "HVAC",
        "Foundation",
        "Plumbing",
        "Electrical",
        "Windows/Doors",
        "Interior (paint/floor)",
        "Other",
    ]
    const [repairsChecklist, setRepairsChecklist] = useState<string[]>([])
    const [repairsEstimate, setRepairsEstimate] = useState<number>(5000)

    useEffect(() => {
        setValue("repairsChecklist", repairsChecklist)
    }, [repairsChecklist, setValue])

    useEffect(() => {
        setValue("repairsEstimate", String(repairsEstimate))
    }, [repairsEstimate, setValue])

    function toggleRepair(option: string) {
        setRepairsChecklist((prev) => (prev.includes(option) ? prev.filter((p) => p !== option) : [...prev, option]))
    }

    function formatCurrency(n: number) {
        try {
            return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)
        } catch {
            return `$${n}`
        }
    }

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
        if (data.garage !== undefined && data.garage !== "") params.append("garage", data.garage)
        if (data.basement !== undefined && data.basement !== "") params.append("basement", data.basement)
        if (data.propertyType !== undefined && data.propertyType !== "") params.append("propertyType", data.propertyType)
        if (data.bedrooms !== undefined && data.bedrooms !== "") params.append("bedrooms", data.bedrooms)
        if (data.bathrooms !== undefined && data.bathrooms !== "") params.append("bathrooms", data.bathrooms)
        if (data.squareFootage !== undefined && data.squareFootage !== "") params.append("squareFootage", data.squareFootage)
        if (data.yearsOwned !== undefined && data.yearsOwned !== "") params.append("yearsOwned", data.yearsOwned)
        if (data.ownerName !== undefined && data.ownerName !== "") params.append("ownerName", data.ownerName)
        if (data.condition !== undefined && data.condition !== "") params.append("condition", data.condition)
        // Repairs: checklist + estimate + notes (kept as strings for URL params)
        if (data.repairsChecklist && data.repairsChecklist.length > 0)
            params.append("repairsChecklist", data.repairsChecklist.join(","))
        if (data.repairsEstimate !== undefined && data.repairsEstimate !== "") params.append("repairsEstimate", data.repairsEstimate)
        if (data.repairsNotes !== undefined && data.repairsNotes !== "") params.append("repairsNotes", data.repairsNotes)
        if (data.occupied !== undefined && data.occupied !== "") params.append("occupied", data.occupied)
        if (data.listedWithRealtor !== undefined && data.listedWithRealtor !== "") params.append("listedWithRealtor", data.listedWithRealtor)
        if (data.closingTimeline !== undefined && data.closingTimeline !== "") params.append("closingTimeline", data.closingTimeline)
        if (data.ultimateGoal !== undefined && data.ultimateGoal !== "") params.append("ultimateGoal", data.ultimateGoal)
        if (data.askingPrice !== undefined && data.askingPrice !== "") params.append("askingPrice", data.askingPrice)
        if (data.fairPrice !== undefined && data.fairPrice !== "") params.append("fairPrice", data.fairPrice)
        if (data.yearBuilt !== undefined && data.yearBuilt !== "") params.append("yearBuilt", data.yearBuilt)
        if (data.bestTimeToCall !== undefined && data.bestTimeToCall !== "") params.append("bestTimeToCall", data.bestTimeToCall)

        // --- Fire AVM + offer calculation in parallel before moving to next step ---
        try {
            const avmParams = new URLSearchParams()
            if (address) avmParams.append("address", address)
            if (city) avmParams.append("city", city)
            if (state) avmParams.append("state", state)
            if (data.propertyType) avmParams.append("propertyType", data.propertyType)
            if (data.bedrooms) avmParams.append("bedrooms", data.bedrooms)
            if (data.bathrooms) avmParams.append("bathrooms", data.bathrooms)
            if (data.squareFootage) avmParams.append("squareFootage", data.squareFootage)
            avmParams.append("avm", "1")
            avmParams.append("maxRadius", String(10))

            // Build full address for the offer endpoint
            const fullAddress = [address, city, state, zipCode].filter(Boolean).join(", ")
            const conditionScale = data.condition ? Math.max(0, Math.min(5, Number(data.condition))) : 3

            // Only call our offers API here; RentCast AVM is computed server-side in /api/offers
            const offerRes = await fetch("/api/offers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address: fullAddress, conditionScale }),
            })

            if (offerRes.ok) {
                const offerData = await offerRes.json()
                if (offerData.cashOffer != null) params.set("cashOffer", String(offerData.cashOffer))
                if (offerData.repairCosts != null) params.set("repairCosts", String(offerData.repairCosts))
                if (offerData.arv != null) params.set("arv", String(offerData.arv))
                if (offerData.estimatedRent != null) params.set("estimatedRent", String(offerData.estimatedRent))
                if (offerData.annualTaxes != null) params.set("annualTaxes", String(offerData.annualTaxes))
                if (offerData.insuranceAnnual != null) params.set("insuranceAnnual", String(offerData.insuranceAnnual))
                console.log("Offer precomputed:", offerData.cashOffer)
                console.log("Offer precomputed details:", {
                    baseAvmPrice: offerData.baseAvmPrice,
                    repairCosts: offerData.repairCosts,
                    netBefore70: (offerData.baseAvmPrice ?? 0) - (offerData.repairCosts ?? 0),
                })
            } else {
                console.error("Offer API error:", offerRes.status)
            }
        } catch (err) {
            console.error("Failed to fetch AVM / offer:", err)
        }

        router.push(`/property-details?${params.toString()}`)
    }

    // Report step completion in URL so progress indicator can update in real time
    useEffect(() => {
        const params = new URLSearchParams(Array.from(searchParams.entries()))
        const alreadySet = params.get("step2Complete") === "true"
        // Skip replaceState if nothing would change — avoids triggering a
        // Next.js searchParams update that can remount the form inside Suspense.
        if (isValid && alreadySet) return
        if (!isValid && !alreadySet) return
        if (isValid) {
            params.set("step2Complete", "true")
        } else {
            params.delete("step2Complete")
        }
        const qs = params.toString()
        if (typeof window !== "undefined") {
            window.history.replaceState(null, "", `${pathname}${qs ? `?${qs}` : ""}`)
        }
    }, [isValid, router, pathname, searchParams])

    // Prefill form from Rentcast when address (or city/state/zip) is present
    useEffect(() => {
        // Only run in browser and when we have an address or city/state
        if (typeof window === "undefined") return
        if (!savedAddress && !(savedCity && savedState)) return

        let mounted = true
        const prefill = async () => {
            try {
                setIsPrefilling(true)
                const params = new URLSearchParams()
                if (savedAddress) params.append("address", savedAddress)
                if (savedCity) params.append("city", savedCity)
                if (savedState) params.append("state", savedState)
                if (savedZipCode) params.append("zipCode", savedZipCode)
                // Ask backend to return a single property object
                params.append("single", "1")

                const res = await fetch(`/api/rentcast?${params.toString()}`)
                if (!res.ok) {
                    console.error("Rentcast prefill failed:", res.status)
                    return
                }

                const prop = await res.json()
                if (!mounted || !prop) return

                // Save the raw result for debugging / later steps
                setAvmResult(prop)
                // Also print full API response to browser console
                console.log("Rentcast prefill result:", prop)

                // Map common Rentcast fields into our form fields (strings expected)
                try {
                    if (prop.bedrooms !== undefined && prop.bedrooms !== null) {
                        setValue("bedrooms", String(prop.bedrooms))
                    }

                    if (prop.bathrooms !== undefined && prop.bathrooms !== null) {
                        setValue("bathrooms", String(prop.bathrooms))
                    }

                    if (prop.squareFootage !== undefined && prop.squareFootage !== null) {
                        setValue("squareFootage", String(prop.squareFootage))
                    }

                    if (prop.propertyType) {
                        setValue("propertyType", prop.propertyType)
                    }

                    // Garage mapping: prefer explicit garageSpaces or garageType
                    const garageSpaces = prop?.features?.garageSpaces ?? prop?.garageSpaces
                    if (garageSpaces !== undefined && garageSpaces !== null) {
                        // Normalize to one of the select options (best-effort)
                        const spaces = Number(garageSpaces)
                        if (!Number.isNaN(spaces)) {
                            if (spaces >= 2) setValue("garage", "2 Car Attached")
                            else if (spaces === 1) setValue("garage", "1 Car Attached")
                            else setValue("garage", "None")
                        }
                    } else if (prop?.features?.garageType) {
                        setValue("garage", String(prop.features.garageType))
                    }

                    // Basement heuristics: if foundation type mentions slab, mark as None
                    const foundation = prop?.features?.foundationType
                    if (foundation && /slab/i.test(String(foundation))) {
                        setValue("basement", "None")
                    }

                    // Prices: try to populate asking/fair price from last sale or AVM if present
                    if (prop.lastSalePrice) {
                        setValue("askingPrice", String(prop.lastSalePrice))
                    } else if (prop?.avm?.value) {
                        setValue("askingPrice", String(prop.avm.value))
                    }
                    if (prop.yearBuilt !== undefined && prop.yearBuilt !== null) {
                        setValue("yearBuilt", String(prop.yearBuilt))
                    }

                    // Owner name
                    if (prop.owner?.names && Array.isArray(prop.owner.names) && prop.owner.names.length > 0) {
                        setValue("ownerName", (prop.owner.names as string[]).join(" / "))
                    }

                    // Last sale date → years owned
                    if (prop.lastSaleDate) {
                        const iso = String(prop.lastSaleDate)
                        const friendly = new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                        setLastSaleDateDisplay(friendly)
                        setValue("yearsOwned", formatYearsOwned(iso))
                    }
                } catch (err) {
                    console.error("Failed to map Rentcast data to form fields:", err)
                }
            } catch (err) {
                console.error("Failed to prefill from Rentcast:", err)
            } finally {
                setIsPrefilling(false)
            }
        }

        prefill()

        return () => {
            mounted = false
        }
    }, [savedAddress, savedCity, savedState, savedZipCode])

    // Geocode helper: fetch lat/lng for the provided address string
    const geocodeAddress = async (addr: string) => {
        try {
            setIsGeocoding(true)
            setGeocodeError(null)
            const url = `/api/geocode?address=${encodeURIComponent(addr)}`
            const res = await fetch(url)
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const json = await res.json()
            if (json.status === "OK" && Array.isArray(json.results) && json.results.length > 0) {
                const loc = json.results[0].geometry.location
                setGeoLatLng({ lat: Number(loc.lat), lng: Number(loc.lng) })
                setGeocodeError(null)
            } else {
                setGeoLatLng(null)
                setGeocodeError(json.status || "No results")
            }
        } catch (err: any) {
            console.error("Geocode error:", err)
            setGeoLatLng(null)
            setGeocodeError(err?.message ?? String(err))
        } finally {
            setIsGeocoding(false)
        }
    }

    // Auto-run geocode when the editable address fields change
    useEffect(() => {
        if (typeof window === "undefined") return
        const addr = [localAddress, localCity, localState, localZipCode].filter(Boolean).join(", ")
        if (!addr) {
            setGeoLatLng(null)
            setGeocodeError(null)
            return
        }
        // debounce a bit to avoid many requests while typing
        const t = setTimeout(() => geocodeAddress(addr), 600)
        return () => clearTimeout(t)
    }, [localAddress, localCity, localState, localZipCode])

    return (
        <AnimatePresence mode="wait">
            <motion.form
                key="property-info-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit(onSubmit, (errors) => {
                    console.log("Validation errors:", errors)
                })}
                noValidate
                aria-label="Property information"
                className="rounded-2xl bg-[var(--color-background)] p-4 sm:p-6 md:p-8 lg:p-10 border border-[var(--color-primary)]/60 w-full max-w-3xl lg:max-w-4xl mx-auto"
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

                {/* ── Summary of previous step (inline editable) ── */}
                <div className="rounded-lg bg-white/[0.03] border border-[var(--color-primary)]/60 p-3 mb-6">
                    <div className="flex items-start justify-between mb-2">
                        <p className="text-xs font-semibold text-[var(--color-primary-dark)] uppercase tracking-wider">
                            Address
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
                                    onClick={() => {
                                        setSavedAddress(localAddress)
                                        setSavedCity(localCity)
                                        setSavedState(localState)
                                        setSavedZipCode(localZipCode)
                                        setEditMode(false)
                                    }}
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

                {/* ── Street View + Map ── */}
                {(localAddress || localCity) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {/* Fachada / Street View */}
                        <div className="flex flex-col gap-1.5">
                            <p className="text-xs font-semibold text-[var(--color-primary-dark)] uppercase tracking-wider">
                                Street View
                            </p>
                            <div className="rounded-lg overflow-hidden border border-[var(--color-primary)]/40 h-56 sm:h-44 w-full flex items-center justify-center bg-[#0b0f1a]">
                                {isGeocoding ? (
                                    <div className="text-xs text-gray-400">Resolving address for Street View…</div>
                                ) : geoLatLng ? (
                                    <iframe
                                        title="Street view of property"
                                        width="100%"
                                        height="100%"
                                        loading="lazy"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                        src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=${geoLatLng.lat},${geoLatLng.lng}&fov=80&heading=0&pitch=0`}
                                    />
                                ) : (
                                    <div className="p-3 text-center">
                                        <div className="text-xs text-gray-400 mb-1">Street View unavailable for this address.</div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const addr = [localAddress, localCity, localState, localZipCode].filter(Boolean).join(", ")
                                                if (addr) geocodeAddress(addr)
                                            }}
                                            className="text-xs px-3 py-1 rounded bg-[#f59e0b] text-[#0f0f23]"
                                        >
                                            Try again
                                        </button>
                                        {geocodeError && <div className="text-xs text-red-400 mt-2">{geocodeError}</div>}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mapa */}
                        <div className="flex flex-col gap-1.5">
                            <p className="text-xs font-semibold text-[var(--color-primary-dark)] uppercase tracking-wider">
                                Location
                            </p>
                            <div className="rounded-lg overflow-hidden border border-[var(--color-primary)]/40 h-56 sm:h-44 w-full">
                                <iframe
                                    title="Property location on map"
                                    width="100%"
                                    height="100%"
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${geoLatLng ? `${geoLatLng.lat},${geoLatLng.lng}` : encodeURIComponent([localAddress, localCity, localState, localZipCode].filter(Boolean).join(", "))
                                        }&zoom=15`}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Prefill loading indicator */}
                {isPrefilling && (
                    <div className="mb-4 flex items-center gap-2 rounded-md bg-[#0f1724] p-3 text-sm text-gray-200 border border-white/10">
                        <Loader2 className="h-4 w-4 animate-spin text-[#f59e0b]" />
                        <span>Obteniendo datos de la propiedad…</span>
                    </div>
                )}

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

                    {/* Owner name + Years owned row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor={id("ownerName")} className="block text-xs text-gray-400 mb-1.5">
                                Current Owner
                            </label>
                            <Input
                                id={id("ownerName")}
                                placeholder="e.g. John Smith"
                                {...register("ownerName")}
                                className="h-12 text-base sm:text-sm bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                            />
                        </div>
                        <div>
                            <label htmlFor={id("yearsOwned")} className="block text-xs text-gray-400 mb-1.5">
                                How long have you owned the property?
                            </label>
                            <Input
                                id={id("yearsOwned")}
                                placeholder="e.g. 5 years, inherited, just bought…"
                                {...register("yearsOwned")}
                                className="h-12 text-base sm:text-sm bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                            />
                        </div>
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
                                step="1"
                                min={0}
                                placeholder="e.g. 3 or 0 for studio"
                                {...register("bedrooms", {
                                    setValueAs: (v) => (v === "" ? "" : String(Math.round(Number(v)))),
                                })}
                                className="h-12 text-base sm:text-sm bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
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
                                className="h-12 text-base sm:text-sm bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
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
                                className="h-12 text-base sm:text-sm bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                            />
                        </div>
                    </div>

                    {/* Year built */}
                    <div>
                        <label htmlFor={id("yearBuilt")} className="block text-xs text-gray-400 mb-1.5">
                            Year Built
                        </label>
                        <Input
                            id={id("yearBuilt")}
                            type="number"
                            step="1"
                            min={0}
                            placeholder="e.g. 1973"
                            {...register("yearBuilt")}
                            className="h-12 text-base sm:text-sm bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                        />
                    </div>

                    {/* Condition (required) */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-3">
                            What is the current condition of the property?{" "}
                            <span className="text-red-400" aria-hidden="true">*</span>
                        </label>
                        {/* Wheel IDs map 1-to-1 with condition levels 0-5 */}
                        <RehabConditionWheel
                            value={(() => {
                                const v = watch("condition")
                                const ids = ["turnkey", "cosmetic", "mid-light", "mid-heavy", "major", "full-gut"]
                                return v !== "" && v !== undefined ? (ids[Number(v)] ?? undefined) : undefined
                            })()}
                            onChange={(wheelId) => {
                                const levelMap: Record<string, string> = {
                                    turnkey: "0",
                                    cosmetic: "1",
                                    "mid-light": "2",
                                    "mid-heavy": "3",
                                    major: "4",
                                    "full-gut": "5",
                                }
                                setValue("condition", levelMap[wheelId] ?? "1", { shouldValidate: true })
                            }}
                        />
                        <FieldError message={errors.condition?.message} />
                    </div>

                    {/* Repairs: structured checklist + estimate + notes */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1.5">What has been upgraded in the last 10 years? Please select all that apply.</label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                            {repairOptions.map((opt) => (
                                <label key={opt} className="inline-flex items-center gap-2 text-sm text-gray-200">
                                    <input
                                        type="checkbox"
                                        checked={repairsChecklist.includes(opt)}
                                        onChange={() => toggleRepair(opt)}
                                        className="h-4 w-4 rounded border-gray-300 bg-white/5"
                                    />
                                    <span>{opt}</span>
                                </label>
                            ))}
                        </div>

                        <div>
                            <label htmlFor={id("repairsNotes")} className="block text-xs text-gray-400 mb-1.5">
                                Additional details (optional)
                            </label>
                            <textarea
                                id={id("repairsNotes")}
                                placeholder="e.g. Roof missing shingles on north side, HVAC not working…"
                                {...register("repairsNotes")}
                                className={textareaClass}
                            />
                        </div>
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
                                <option>Yes</option>
                                <option>No</option>
                                <option>Rental</option>
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
                                <option>7 days</option>
                                <option>14 days</option>
                                <option>30 days</option>
                                <option>Not sure yet</option>
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
                        <div className="relative">
                            <select
                                id={id("ultimateGoal")}
                                {...register("ultimateGoal")}
                                className={selectClass}
                                aria-invalid={!!errors.ultimateGoal}
                            >
                                <option value="">Select…</option>
                                <option>Foreclosure</option>
                                <option>Need Cash</option>
                                <option>Inherited</option>
                                <option>Bad Tenants</option>
                                <option>Moving</option>
                                <option>Downsizing</option>
                                <option>Other</option>
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                        </div>
                        <FieldError message={errors.ultimateGoal?.message} />
                    </div>

                    {/* Best time to call */}
                    {/* <div>
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
                    </div> */}

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
