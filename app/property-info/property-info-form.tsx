"use client"

import { useId, useState, useEffect, useRef, useCallback } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useForm, type FieldErrors } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft, Loader2, ShieldCheck, MapPin, Building2, Hash, Sparkles, Pencil } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""

/* ─── Schema ──────────────────────────────────────────────────────────────── */

const propertyInfoSchema = z.object({
    /** Stored as the 0-5 rehab scale that /api/offers turns into a repair estimate. */
    condition: z.string().min(1, "Please choose the option that best describes your property"),
    /** Reuses the existing CRM field name so GoHighLevel mappings keep working. */
    closingTimeline: z.string().min(1, "Please tell us when you'd like to sell"),
    /** Multi-select; forwarded to the CRM as a comma-separated `ultimateGoal`. */
    ultimateGoal: z.array(z.string()).min(1, "Please select at least one reason"),
    /** Always typed by the seller — never pre-filled from public records. */
    askingPrice: z.string().min(1, "Please enter the amount you have in mind"),
    /* Looked up from public records, confirmed by the seller on the last step. */
    bedrooms: z.string().optional(),
    bathrooms: z.string().optional(),
    squareFootage: z.string().optional(),
    yearBuilt: z.string().optional(),
    lastSoldYear: z.string().optional(),
})

type PropertyInfoFormData = z.infer<typeof propertyInfoSchema>

/** Fields RentCast can fill in for the seller. */
type LookupField = "bedrooms" | "bathrooms" | "squareFootage" | "yearBuilt" | "lastSoldYear"

/* ─── Step options ────────────────────────────────────────────────────────── */

/** `scale` feeds the repair-cost multiplier in /api/offers (0 = turnkey, 5 = full gut). */
const CONDITION_OPTIONS = [
    { label: "Excellent", scale: "0", hint: "New construction (under 5 years old) or completely remodeled within the last 5 years." },
    { label: "Good", scale: "1", hint: "Well maintained with only minor cosmetic updates needed." },
    { label: "Fair", scale: "3", hint: "Shows normal wear for its age and may benefit from some updates." },
    { label: "Needs repairs", scale: "4", hint: "Requires repairs to one or more major areas such as the kitchen, bathrooms, roof, HVAC, plumbing, or electrical." },
    { label: "Needs major repairs", scale: "5", hint: "Requires significant structural work or a full renovation." },
] as const

const TIMELINE_OPTIONS = ["Within a week", "Within a month", "More than a month"] as const

const REASON_OPTIONS = [
    "Moving",
    "Financial difficulties",
    "Inherited property",
    "Divorce",
    "Tired of being a landlord",
    "Foreclosure",
    "Downsizing",
    "Other",
] as const

const LAST_STEP = 6

const STEP_TITLES: Record<number, string> = {
    1: "How would you describe your property?",
    2: "When would you like to sell?",
    3: "Why are you selling?",
    4: "Your asking price",
    5: "Confirm your address",
    6: "Confirm your property details",
}

/** Which fields must validate before the seller can leave each step. */
const STEP_FIELDS: Record<number, Array<keyof PropertyInfoFormData>> = {
    1: ["condition"],
    2: ["closingTimeline"],
    3: ["ultimateGoal"],
    4: ["askingPrice"],
    5: [],
    6: [],
}

/* ─── Shared styles ───────────────────────────────────────────────────────── */

const inputClass =
    "h-12 text-base sm:text-sm bg-white/10 border-white/20 text-white placeholder:text-gray-400 " +
    "focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"

const nextButtonClass =
    "h-14 text-lg font-bold bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/60 " +
    "text-[var(--color-text-white)] rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"

/** Sits beside NEXT — same height so the pair reads as one control, quieter so it doesn't compete. */
const backButtonClass =
    "h-14 px-5 sm:px-6 text-base font-semibold bg-white/5 border border-white/20 text-gray-300 " +
    "hover:bg-white/10 hover:text-white rounded-lg transition-all active:scale-[0.98] cursor-pointer shrink-0"

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function FieldError({ message }: { message?: string }) {
    if (!message) return null
    return (
        <p role="alert" className="mt-2 text-xs text-red-400">
            {message}
        </p>
    )
}

/** Selectable card used by steps 1-3 — same look for single- and multi-select. */
function OptionCard({
    label,
    hint,
    selected,
    multi,
    onSelect,
}: {
    label: string
    hint?: string
    selected: boolean
    multi?: boolean
    onSelect: () => void
}) {
    return (
        <button
            type="button"
            role={multi ? "checkbox" : "radio"}
            aria-checked={selected}
            onClick={onSelect}
            className={[
                "flex flex-col items-start gap-1 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-all",
                selected
                    ? "border-[#f59e0b] bg-[#f59e0b]/10 text-white ring-2 ring-[#f59e0b]/40"
                    : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:bg-white/[0.06]",
            ].join(" ")}
        >
            <span>{label}</span>
            {hint && <span className="text-xs font-normal text-gray-400 leading-snug">{hint}</span>}
        </button>
    )
}

/** Marks a value the app looked up, so the seller confirms it instead of retyping it. */
function AutoFilledBadge() {
    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-[#f59e0b]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#f59e0b]">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            From public records
        </span>
    )
}

function ConfirmField({
    id,
    label,
    autoFilled,
    children,
}: {
    id: string
    label: string
    autoFilled?: boolean
    children: React.ReactNode
}) {
    return (
        <div>
            <div className="flex items-center justify-between gap-2 mb-1.5 min-h-[18px]">
                <label htmlFor={id} className="block text-xs text-gray-400">
                    {label}
                </label>
                {autoFilled && <AutoFilledBadge />}
            </div>
            {children}
        </div>
    )
}

/** Read-only summary row used by the address confirmation step. */
function SummaryRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0">
            <span className="text-[#f59e0b] shrink-0">{icon}</span>
            <span className="text-xs text-gray-400 w-20 shrink-0">{label}</span>
            <span className="text-sm text-white truncate">{value || "—"}</span>
        </div>
    )
}

/* ─── Main Form Component ─────────────────────────────────────────────────── */

export function PropertyInfoForm({
    initialParams,
    onNext,
}: { initialParams?: URLSearchParams | null; onNext?: (params: URLSearchParams) => void } = {}) {
    const uid = useId()
    const id = (field: string) => `${uid}-${field}`
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    // Helper: prefer initialParams (from the multi-step wrapper) over URL search params
    const p = (k: string) => initialParams?.get(k) ?? searchParams.get(k)

    // Address captured on the landing form (step 0)
    const address = p("address") ?? ""
    const city = p("city") ?? ""
    const state = p("state") ?? ""
    const zipCode = p("zipCode") ?? ""
    const smsConsentPrev = p("smsConsent") ?? "false"

    const parsedStep = Number(p("propInfoStep"))
    const initialStep =
        Number.isFinite(parsedStep) && parsedStep >= 1 && parsedStep <= LAST_STEP ? parsedStep : 1

    const [formStep, setFormStep] = useState(initialStep)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Editable copies of the address, confirmed on step 5
    const [editMode, setEditMode] = useState(false)
    const [localAddress, setLocalAddress] = useState(address)
    const [localCity, setLocalCity] = useState(city)
    const [localState, setLocalState] = useState(state)
    const [localZipCode, setLocalZipCode] = useState(zipCode)
    // Confirmed address — changing it re-triggers the public-records lookup
    const [savedAddress, setSavedAddress] = useState(address)
    const [savedCity, setSavedCity] = useState(city)
    const [savedState, setSavedState] = useState(state)
    const [savedZipCode, setSavedZipCode] = useState(zipCode)

    // Public-records lookup state
    const [isLookingUp, setIsLookingUp] = useState(false)
    const [recordsFound, setRecordsFound] = useState(false)
    const [autoFilled, setAutoFilled] = useState<Partial<Record<LookupField, boolean>>>({})
    /** Whether a last-sale year is known at all — keeps the field from vanishing mid-edit. */
    const [hasLastSold, setHasLastSold] = useState(false)
    const [addressError, setAddressError] = useState<string | null>(null)

    // Google Places autocomplete for the address edit field
    const [mapsLoaded, setMapsLoaded] = useState(false)
    const addressInputRef = useRef<HTMLInputElement | null>(null)
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        trigger,
        formState: { errors },
    } = useForm<PropertyInfoFormData>({
        resolver: zodResolver(propertyInfoSchema),
        defaultValues: {
            condition: p("condition") ?? "",
            closingTimeline: p("closingTimeline") ?? "",
            ultimateGoal: [],
            askingPrice: "",
        },
        mode: "onChange",
    })

    const condition = watch("condition")
    const closingTimeline = watch("closingTimeline")
    const reasons = watch("ultimateGoal") ?? []

    /* ── Restore previous answers when the seller steps back from "Your Info" ── */
    const hydratedRef = useRef(false)
    useEffect(() => {
        if (hydratedRef.current || typeof window === "undefined") return
        hydratedRef.current = true

        const get = (k: string) => initialParams?.get(k) ?? searchParams.get(k) ?? undefined

        const simpleFields = [
            "condition",
            "closingTimeline",
            "askingPrice",
            "bedrooms",
            "bathrooms",
            "squareFootage",
            "yearBuilt",
            "lastSoldYear",
        ] as const

        simpleFields.forEach((field) => {
            const value = get(field)
            if (value) setValue(field, value)
        })

        if (get("lastSoldYear")) setHasLastSold(true)

        const savedReasons = get("ultimateGoal")
        if (savedReasons) {
            setValue(
                "ultimateGoal",
                savedReasons.split(",").map((r) => r.trim()).filter(Boolean)
            )
        }
    }, [initialParams, searchParams, setValue])

    /* ── Public records lookup (RentCast) ─────────────────────────────────────
       Runs in the background as soon as the address is known, so the data is
       already waiting by the time the seller reaches the confirmation step.   */
    useEffect(() => {
        if (typeof window === "undefined") return
        if (!savedAddress && !(savedCity && savedState)) return

        let mounted = true

        const lookup = async () => {
            try {
                setIsLookingUp(true)

                const params = new URLSearchParams()
                if (savedAddress) params.append("address", savedAddress)
                if (savedCity) params.append("city", savedCity)
                if (savedState) params.append("state", savedState)
                if (savedZipCode) params.append("zipCode", savedZipCode)
                params.append("single", "1")

                const res = await fetch(`/api/rentcast?${params.toString()}`)
                if (!res.ok) {
                    console.error("Public records lookup failed:", res.status)
                    return
                }

                const property = await res.json()
                if (!mounted || !property) return

                // The seller's own answer always wins — only fill what is still empty.
                const filled: LookupField[] = []
                let anyRecord = false

                const fillIfEmpty = (field: LookupField, value: unknown) => {
                    if (value === undefined || value === null || value === "") return
                    anyRecord = true
                    if (getValues(field)) return
                    setValue(field, String(value))
                    filled.push(field)
                }

                fillIfEmpty("bedrooms", property.bedrooms)
                fillIfEmpty("bathrooms", property.bathrooms)
                fillIfEmpty("squareFootage", property.squareFootage)
                fillIfEmpty("yearBuilt", property.yearBuilt)

                if (property.lastSaleDate) {
                    const soldYear = new Date(String(property.lastSaleDate)).getFullYear()
                    if (!Number.isNaN(soldYear)) {
                        setHasLastSold(true)
                        fillIfEmpty("lastSoldYear", soldYear)
                    }
                }

                // Based on what the records actually contained, not on what we wrote —
                // a seller stepping back has their own answers in place already.
                if (anyRecord) setRecordsFound(true)

                if (filled.length > 0) {
                    setAutoFilled((prev) => {
                        const next = { ...prev }
                        filled.forEach((field) => {
                            next[field] = true
                        })
                        return next
                    })
                }
            } catch (err) {
                console.error("Public records lookup failed:", err)
            } finally {
                if (mounted) setIsLookingUp(false)
            }
        }

        lookup()

        return () => {
            mounted = false
        }
    }, [savedAddress, savedCity, savedState, savedZipCode, getValues, setValue])

    /** Once the seller edits a looked-up value it is theirs, not ours. */
    const clearAutoFilled = (field: LookupField) =>
        setAutoFilled((prev) => (prev[field] ? { ...prev, [field]: false } : prev))

    /* ── Google Places on the address edit field ──────────────────────────── */
    const loadGoogleMaps = useCallback(() => {
        if (!GOOGLE_MAPS_API_KEY || typeof window === "undefined") return
        if (window.google?.maps) {
            setMapsLoaded(true)
            return
        }

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

    useEffect(() => {
        if (!mapsLoaded || !editMode) return
        if (!addressInputRef.current || !window.google?.maps?.places) return

        autocompleteRef.current = new window.google.maps.places.Autocomplete(addressInputRef.current, {
            fields: ["address_components", "formatted_address"],
            types: ["address"],
            componentRestrictions: { country: "us" },
        })

        const listener = autocompleteRef.current.addListener("place_changed", () => {
            const place = autocompleteRef.current?.getPlace()
            if (!place?.address_components) return

            const get = (type: string, short = false) => {
                const comp = place.address_components?.find((c) => c.types.includes(type))
                return short ? (comp?.short_name ?? "") : (comp?.long_name ?? "")
            }

            setLocalAddress(place.formatted_address ?? "")
            setLocalCity(get("locality") || get("sublocality") || get("administrative_area_level_2"))
            setLocalState(get("administrative_area_level_1", true))
            setLocalZipCode(get("postal_code"))
        })

        return () => listener?.remove()
    }, [mapsLoaded, editMode])

    /* ── Step navigation ──────────────────────────────────────────────────── */

    const goToStep = useCallback(
        (next: number) => {
            setFormStep(next)
            const params = new URLSearchParams(Array.from(searchParams.entries()))
            params.set("propInfoStep", String(next))
            if (typeof window !== "undefined") {
                window.history.replaceState(null, "", `${pathname}?${params.toString()}`)
                window.scrollTo({ top: 0, behavior: "smooth" })
            }
        },
        [pathname, searchParams]
    )

    const confirmAddressEdit = () => {
        const changed = localAddress !== savedAddress || localZipCode !== savedZipCode

        setSavedAddress(localAddress)
        setSavedCity(localCity)
        setSavedState(localState)
        setSavedZipCode(localZipCode)
        setEditMode(false)
        setAddressError(null)

        // A different property means the previous lookup's values no longer apply.
        // Only values we filled are cleared — anything the seller typed survives.
        if (changed) {
            ;(Object.keys(autoFilled) as LookupField[]).forEach((field) => {
                if (autoFilled[field]) setValue(field, "")
            })
            setAutoFilled({})
            setHasLastSold(false)
            setRecordsFound(false)
        }
    }

    const handleNext = async () => {
        const fields = STEP_FIELDS[formStep]
        if (fields.length > 0) {
            const valid = await trigger(fields)
            if (!valid) return
        }

        if (formStep === 5) {
            if (!localAddress.trim()) {
                setAddressError("Please enter the address of the property")
                return
            }
            setAddressError(null)
            // Don't make the seller press Save before Next — commit what they typed.
            if (editMode) confirmAddressEdit()
        }

        goToStep(formStep + 1)
    }

    const cancelAddressEdit = () => {
        setLocalAddress(savedAddress)
        setLocalCity(savedCity)
        setLocalState(savedState)
        setLocalZipCode(savedZipCode)
        setEditMode(false)
    }

    /**
     * Reached when the final step is submitted but an earlier answer is missing —
     * possible if someone opens ?propInfoStep=6 directly. Their error messages live
     * on the steps they belong to, so send the seller to the first one that failed
     * instead of leaving the button looking broken.
     */
    const onInvalid = (formErrors: FieldErrors<PropertyInfoFormData>) => {
        const firstIncompleteStep = Object.keys(STEP_FIELDS)
            .map(Number)
            .sort((a, b) => a - b)
            .find((step) => STEP_FIELDS[step].some((field) => formErrors[field]))

        if (firstIncompleteStep) goToStep(firstIncompleteStep)
    }

    /* ── Submit → hand off to the contact step ────────────────────────────── */

    const onSubmit = async (data: PropertyInfoFormData) => {
        setIsSubmitting(true)

        const conditionLabel = CONDITION_OPTIONS.find((o) => o.scale === data.condition)?.label ?? ""
        const params = new URLSearchParams()

        // Address as confirmed on step 5 — the seller may have corrected it there
        params.append("address", savedAddress)
        if (savedCity) params.append("city", savedCity)
        if (savedState) params.append("state", savedState)
        if (savedZipCode) params.append("zipCode", savedZipCode)
        if (smsConsentPrev) params.append("smsConsent", smsConsentPrev)

        params.append("condition", data.condition)
        if (conditionLabel) params.append("conditionLabel", conditionLabel)
        params.append("closingTimeline", data.closingTimeline)
        params.append("ultimateGoal", data.ultimateGoal.join(", "))
        params.append("askingPrice", data.askingPrice)

        const confirmedFields: LookupField[] = [
            "bedrooms",
            "bathrooms",
            "squareFootage",
            "yearBuilt",
            "lastSoldYear",
        ]
        confirmedFields.forEach((field) => {
            const value = data[field]
            if (value) params.append(field, value)
        })

        // Carry "Your Info" values so they survive a round-trip back to this step
        const contactKeys = ["_firstName", "_lastName", "_phone", "_email"] as const
        contactKeys.forEach((key) => {
            const value = p(key)
            if (value) params.append(key, value)
        })

        // Precompute the cash offer so /bookings has it without another wait
        try {
            const fullAddress = [savedAddress, savedCity, savedState, savedZipCode]
                .filter(Boolean)
                .join(", ")

            const offerRes = await fetch("/api/offers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address: fullAddress, conditionScale: Number(data.condition) }),
            })

            if (offerRes.ok) {
                const offer = await offerRes.json()
                const offerKeys = [
                    "cashOffer",
                    "repairCosts",
                    "arv",
                    "estimatedRent",
                    "annualTaxes",
                    "insuranceAnnual",
                ] as const
                offerKeys.forEach((key) => {
                    if (offer[key] != null) params.set(key, String(offer[key]))
                })
            } else {
                console.error("Offer API error:", offerRes.status)
            }
        } catch (err) {
            console.error("Failed to fetch the cash offer:", err)
        }

        if (onNext) {
            setIsSubmitting(false)
            onNext(params)
        } else {
            router.push(`/property-details?${params.toString()}`)
        }
    }

    /* ── Render ───────────────────────────────────────────────────────────── */

    // The Maps Embed API geocodes `q` itself, so the address goes straight through —
    // no separate geocoding round trip is needed to place the pin.
    const mapQuery = encodeURIComponent(
        [localAddress, localCity, localState, localZipCode].filter(Boolean).join(", ")
    )

    return (
        <AnimatePresence mode="wait">
            <motion.form
                key="property-info-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onSubmit={(e) => {
                    e.preventDefault()
                    // Pressing Enter anywhere would otherwise submit the whole form and
                    // skip the remaining steps — treat it as "next" until the last one.
                    if (formStep < LAST_STEP) {
                        void handleNext()
                        return
                    }
                    void handleSubmit(onSubmit, onInvalid)(e)
                }}
                noValidate
                aria-label="Property information"
                className="rounded-2xl bg-[var(--color-background)] p-4 sm:p-6 md:p-8 lg:p-10 border border-[var(--color-primary)]/60 w-full max-w-3xl lg:max-w-4xl mx-auto"
            >
                <h3 className="text-xl font-bold text-white mb-6">{STEP_TITLES[formStep]}</h3>

                <div className="flex flex-col gap-5">
                    {/* ───────── Step 1 — Property condition ───────── */}
                    {formStep === 1 && (
                        <div>
                            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                                Choose the option that best matches your home&apos;s current condition. We'll confirm everything during our conversation.
                            </p>
                            <div
                                role="radiogroup"
                                aria-label="Property condition"
                                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                            >
                                {CONDITION_OPTIONS.map((option) => (
                                    <OptionCard
                                        key={option.scale}
                                        label={option.label}
                                        hint={option.hint}
                                        selected={condition === option.scale}
                                        onSelect={() =>
                                            setValue("condition", option.scale, { shouldValidate: true })
                                        }
                                    />
                                ))}
                            </div>
                            <FieldError message={errors.condition?.message} />
                        </div>
                    )}

                    {/* ───────── Step 2 — Selling timeline ───────── */}
                    {formStep === 2 && (
                        <div>
                            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                                We can close on the date you choose — and if you need extra time to move out
                                afterwards, we can usually accommodate that too.
                            </p>
                            <div
                                role="radiogroup"
                                aria-label="Selling timeline"
                                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                            >
                                {TIMELINE_OPTIONS.map((option) => (
                                    <OptionCard
                                        key={option}
                                        label={option}
                                        selected={closingTimeline === option}
                                        onSelect={() =>
                                            setValue("closingTimeline", option, { shouldValidate: true })
                                        }
                                    />
                                ))}
                            </div>
                            <FieldError message={errors.closingTimeline?.message} />
                        </div>
                    )}

                    {/* ───────── Step 3 — Reason for selling ───────── */}
                    {formStep === 3 && (
                        <div>
                            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                                Select everything that applies — there are no wrong answers, and it helps us
                                tailor the offer to your situation.
                            </p>
                            <div
                                role="group"
                                aria-label="Reason for selling"
                                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                            >
                                {REASON_OPTIONS.map((option) => (
                                    <OptionCard
                                        key={option}
                                        label={option}
                                        multi
                                        selected={reasons.includes(option)}
                                        onSelect={() =>
                                            setValue(
                                                "ultimateGoal",
                                                reasons.includes(option)
                                                    ? reasons.filter((r) => r !== option)
                                                    : [...reasons, option],
                                                { shouldValidate: true }
                                            )
                                        }
                                    />
                                ))}
                            </div>
                            <FieldError message={errors.ultimateGoal?.message} />
                        </div>
                    )}

                    {/* ───────── Step 4 — Asking price ───────── */}
                    {formStep === 4 && (
                        <div>
                            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                                This helps us prepare a competitive offer tailored to your needs. No commitment
                                required.
                            </p>
                            <label htmlFor={id("askingPrice")} className="block text-xs text-gray-400 mb-1.5">
                                How much are you looking to get for your property?{" "}
                                <span className="text-red-400" aria-hidden="true">*</span>
                            </label>
                            <p className="text-xs text-gray-500 mb-2">
                                Enter the amount you have in mind. You can always adjust it later.
                            </p>
                            <Input
                                id={id("askingPrice")}
                                type="number"
                                inputMode="numeric"
                                step="1000"
                                min={0}
                                placeholder="e.g. 150000"
                                {...register("askingPrice")}
                                className={inputClass}
                                aria-invalid={!!errors.askingPrice}
                            />
                            <FieldError message={errors.askingPrice?.message} />
                        </div>
                    )}

                    {/* ───────── Step 5 — Confirm the address ───────── */}
                    {formStep === 5 && (
                        <div className="flex flex-col gap-4">
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Make sure this is the property you want an offer on. Not quite right? Use{" "}
                                <span className="font-semibold text-[#f59e0b]">Edit</span> to correct it.
                            </p>

                            {(localAddress || localCity) && (
                                <div className="rounded-lg overflow-hidden border border-[var(--color-primary)]/40 h-64 sm:h-80 w-full">
                                    <iframe
                                        title="Property location on map"
                                        width="100%"
                                        height="100%"
                                        loading="lazy"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                        src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${mapQuery}&zoom=15`}
                                    />
                                </div>
                            )}

                            <div className="rounded-lg bg-white/[0.03] border border-[var(--color-primary)]/60 p-3">
                                <div className="flex items-center justify-between gap-3 mb-2">
                                    <p className="text-xs font-semibold text-[var(--color-primary-dark)] uppercase tracking-wider">
                                        Address
                                    </p>
                                    {/* A plain text link read as a caption here. Given a border, a
                                        pencil and a real tap target it reads as the control it is —
                                        this is the seller's only chance to fix a wrong address. */}
                                    {!editMode && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                loadGoogleMaps()
                                                setEditMode(true)
                                            }}
                                            aria-label="Edit the property address"
                                            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-[#f59e0b]/50 bg-[#f59e0b]/10 px-3 text-xs font-bold uppercase tracking-wide text-[#f59e0b] transition-colors cursor-pointer hover:border-[#f59e0b] hover:bg-[#f59e0b]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]/60"
                                        >
                                            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                                            Edit
                                        </button>
                                    )}
                                </div>

                                {editMode ? (
                                    <div className="space-y-3">
                                        <Input
                                            placeholder="Property address"
                                            autoComplete="off"
                                            value={localAddress}
                                            ref={addressInputRef}
                                            onFocus={loadGoogleMaps}
                                            onChange={(e) => {
                                                setLocalAddress(e.target.value)
                                                setAddressError(null)
                                            }}
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
                                                onClick={confirmAddressEdit}
                                                className="h-10 px-4 bg-[#f59e0b] text-[#0f0f23]"
                                            >
                                                Save
                                            </Button>
                                            <button
                                                type="button"
                                                onClick={cancelAddressEdit}
                                                className="h-10 px-4 rounded-lg border border-white/10 text-sm text-white"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <SummaryRow
                                            icon={<MapPin className="h-4 w-4" />}
                                            label="Address"
                                            value={localAddress}
                                        />
                                        <SummaryRow
                                            icon={<Building2 className="h-4 w-4" />}
                                            label="City"
                                            value={localCity}
                                        />
                                        <SummaryRow
                                            icon={<Building2 className="h-4 w-4" />}
                                            label="State"
                                            value={localState}
                                        />
                                        <SummaryRow
                                            icon={<Hash className="h-4 w-4" />}
                                            label="Zip Code"
                                            value={localZipCode}
                                        />
                                    </>
                                )}
                            </div>

                            <FieldError message={addressError ?? undefined} />
                        </div>
                    )}

                    {/* ───────── Step 6 — Confirm the property details ───────── */}
                    {formStep === 6 && (
                        <div className="flex flex-col gap-4">
                            {isLookingUp ? (
                                <div className="flex items-center gap-2 rounded-md bg-[#0f1724] p-3 text-sm text-gray-200 border border-white/10">
                                    <Loader2 className="h-4 w-4 animate-spin text-[#f59e0b]" aria-hidden="true" />
                                    <span>Looking up public records for your property…</span>
                                </div>
                            ) : recordsFound ? (
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    We found these details in public records. Just check they look right — correct
                                    anything that doesn&apos;t.
                                </p>
                            ) : (
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    We couldn&apos;t find public records for this address. Fill in whatever you
                                    know — every field here is optional.
                                </p>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <ConfirmField
                                    id={id("bedrooms")}
                                    label="Bedrooms"
                                    autoFilled={autoFilled.bedrooms}
                                >
                                    <Input
                                        id={id("bedrooms")}
                                        type="number"
                                        inputMode="numeric"
                                        step="1"
                                        min={0}
                                        placeholder="e.g. 3"
                                        {...register("bedrooms", { onChange: () => clearAutoFilled("bedrooms") })}
                                        className={inputClass}
                                    />
                                </ConfirmField>

                                <ConfirmField
                                    id={id("bathrooms")}
                                    label="Bathrooms"
                                    autoFilled={autoFilled.bathrooms}
                                >
                                    <Input
                                        id={id("bathrooms")}
                                        type="number"
                                        inputMode="decimal"
                                        step="0.25"
                                        min={0}
                                        placeholder="e.g. 2.5"
                                        {...register("bathrooms", { onChange: () => clearAutoFilled("bathrooms") })}
                                        className={inputClass}
                                    />
                                </ConfirmField>

                                <ConfirmField
                                    id={id("squareFootage")}
                                    label="Square footage"
                                    autoFilled={autoFilled.squareFootage}
                                >
                                    <Input
                                        id={id("squareFootage")}
                                        type="number"
                                        inputMode="numeric"
                                        step="1"
                                        min={0}
                                        placeholder="e.g. 1450"
                                        {...register("squareFootage", {
                                            onChange: () => clearAutoFilled("squareFootage"),
                                        })}
                                        className={inputClass}
                                    />
                                </ConfirmField>

                                <ConfirmField
                                    id={id("yearBuilt")}
                                    label="Year built"
                                    autoFilled={autoFilled.yearBuilt}
                                >
                                    <Input
                                        id={id("yearBuilt")}
                                        type="number"
                                        inputMode="numeric"
                                        step="1"
                                        min={0}
                                        placeholder="e.g. 1973"
                                        {...register("yearBuilt", { onChange: () => clearAutoFilled("yearBuilt") })}
                                        className={inputClass}
                                    />
                                </ConfirmField>
                            </div>

                            {/* Only shown when public records actually knew the last sale — no point
                                asking a seller to recall a year we have no reason to expect. */}
                            {hasLastSold && (
                                <ConfirmField
                                    id={id("lastSoldYear")}
                                    label="Last sold"
                                    autoFilled={autoFilled.lastSoldYear}
                                >
                                    <Input
                                        id={id("lastSoldYear")}
                                        type="number"
                                        inputMode="numeric"
                                        step="1"
                                        min={0}
                                        placeholder="e.g. 2018"
                                        {...register("lastSoldYear", {
                                            onChange: () => clearAutoFilled("lastSoldYear"),
                                        })}
                                        className={inputClass}
                                    />
                                </ConfirmField>
                            )}
                        </div>
                    )}

                    {/* ───────── Back / advance / submit ─────────
                        Both buttons are always type="button". Swapping a single button between
                        "button" and "submit" makes React patch the `type` on the very same DOM
                        node before the browser runs the click's default action — so the click
                        that leaves step 5 would also submit the form and skip step 6 entirely. */}
                    <div className="flex items-stretch gap-3">
                        {formStep > 1 && (
                            <Button
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => goToStep(formStep - 1)}
                                className={backButtonClass}
                            >
                                <ArrowLeft className="h-5 w-5 sm:mr-2" aria-hidden="true" />
                                <span className="hidden sm:inline">BACK</span>
                                <span className="sr-only sm:hidden">Go back</span>
                            </Button>
                        )}
                        <Button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => {
                                if (formStep < LAST_STEP) {
                                    void handleNext()
                                } else {
                                    void handleSubmit(onSubmit, onInvalid)()
                                }
                            }}
                            className={`${nextButtonClass} flex-1`}
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

                    {/* A form with several inputs and no submit button ignores the Enter key.
                        This one exists only to keep that shortcut working; its type never
                        changes, so it can't cause the skip described above. */}
                    <button type="submit" hidden tabIndex={-1} aria-hidden="true" />
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center flex items-center justify-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    Your information is secure and never shared with third parties.
                </p>
            </motion.form>
        </AnimatePresence>
    )
}
