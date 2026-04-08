"use client"

import { useId, useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Phone, Mail, ArrowRight, Loader2, ShieldCheck, CheckCircle2, DollarSign, Clock, Wrench, Home, BadgeCheck, HeartHandshake } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { CallButton } from "@/components/ui/call-button"

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function fmt(val: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val)
}

function calcMonthlyPayment(principal: number, annualRatePct: number, years: number): number {
    const r = annualRatePct / 100 / 12
    const n = years * 12
    if (r === 0) return principal / n
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

interface StrategyCardProps {
    accent: string
    icon: React.ReactNode
    tag: string
    title: string
    subtitle: string
    mainLabel: string
    mainValue: string | null
    mainSize?: string
    rows: { label: string; value: string }[]
    note?: string
    centered?: boolean
    prominent?: boolean
    highlighted?: boolean
}

function StrategyCard({ accent, icon, tag, title, subtitle, mainLabel, mainValue, rows, note, centered, prominent, highlighted, mainSize }: StrategyCardProps) {
    const baseClasses = `rounded-xl border ${accent} p-5 flex flex-col gap-3 h-full`
    // allow highlighting to override visuals for hero offer
    const highlight = highlighted ?? prominent ?? false
    const highlightedBg = highlight
        ? 'bg-gradient-to-br from-[#f59e0b]/10 via-[#f59e0b]/6 to-white/5 shadow-xl'
        : 'bg-white/[0.03]'

    return (
        <div className={`${baseClasses} ${highlightedBg} ${highlight ? 'ring-2 ring-[#f59e0b]/20 scale-[1.01]' : ''}`}>
            <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 ${centered ? "justify-center" : ""}`}>
                <span className="text-lg">{icon}</span>
                <span>{tag}</span>
                {highlight && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 text-xs font-semibold text-[#78350f] bg-[#fef3c7] rounded-full">Best For Quick Sale</span>
                )}
            </div>
            <div className={centered ? "text-center" : ""}>
                <p className="text-base font-bold text-white leading-tight">{title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
            </div>

            <div className="flex flex-col gap-1.5 mt-1">
                {rows.map((r) => (
                    <div key={r.label} className="flex justify-between text-xs">
                        <span className="text-gray-400">{r.label}</span>
                        <span className="text-white font-semibold">{r.value}</span>
                    </div>
                ))}
            </div>

            {mainValue !== null ? (
                <div className="rounded-lg bg-white/5 p-3 text-center mt-auto">
                    <p className="text-xs text-gray-400 mb-0.5">{mainLabel}</p>
                    {(() => {
                        const sizeClass = mainSize ?? (highlight ? 'text-3xl' : 'text-2xl')
                        return (
                            <p className={`${sizeClass} font-extrabold ${highlight ? 'text-[#f59e0b]' : 'text-white'}`}>{mainValue}</p>
                        )
                    })()}
                </div>
            ) : (
                <div className="rounded-lg bg-white/5 p-3 text-center mt-auto">
                    <p className="text-xs text-gray-400 italic">Data unavailable</p>
                </div>
            )}

            {note && <p className="text-[10px] text-gray-500 leading-relaxed pt-2 border-t border-white/10">{note}</p>}
        </div>
    )
}

interface OfferStrategiesGridProps {
    cashOffer: number | null
    repairCosts: number | null
    arv: number | null
    estimatedRent: number | null
    annualTaxes: number | null
    insuranceAnnual: number | null
    sellerName?: string | null
    localAddress?: string
    localCity?: string
    localState?: string
    localZipCode?: string
}

function OfferStrategiesGrid({ cashOffer, repairCosts, arv, estimatedRent, annualTaxes, insuranceAnnual, sellerName, localAddress, localCity, localState, localZipCode }: OfferStrategiesGridProps) {
    const [isGeocoding, setIsGeocoding] = useState(false)
    const [geoLatLng, setGeoLatLng] = useState<{ lat: number; lng: number } | null>(null)
    const [geocodeError, setGeocodeError] = useState<string | null>(null)

    const geocodeAddress = async (addr: string) => {
        setIsGeocoding(true)
        setGeocodeError(null)
        try {
            const res = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addr)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
            )
            const data = await res.json()
            if (data.status === "OK" && data.results?.[0]?.geometry?.location) {
                const { lat, lng } = data.results[0].geometry.location
                setGeoLatLng({ lat, lng })
            } else {
                setGeocodeError("Could not resolve address.")
            }
        } catch {
            setGeocodeError("Geocoding request failed.")
        } finally {
            setIsGeocoding(false)
        }
    }

    useEffect(() => {
        const addr = [localAddress, localCity, localState, localZipCode].filter(Boolean).join(", ")
        if (addr) geocodeAddress(addr)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localAddress, localCity, localState, localZipCode])

    const repairs = repairCosts ?? 0
    const arvVal = arv ?? 0

    // 1. Fast Cash Sale - compute a range based on ARV and rehab cost variations
    const fastCash = cashOffer
    let fastCashRange: { min: number; max: number } | null = null
    if (arvVal > 0) {
        const repairsLow = repairs * 0.85
        const repairsHigh = repairs * 1.15
        const arvLow = arvVal * 0.95
        const arvHigh = arvVal * 1.05

        const baseNetLow = Math.max(0, arvLow - repairsHigh)
        const baseNetHigh = Math.max(0, arvHigh - repairsLow)

        // assume investor purchase at ~70% of net after repairs
        const cashMin = Math.round(baseNetLow * 0.7)
        const cashMax = Math.round(baseNetHigh * 0.7)
        fastCashRange = { min: cashMin, max: cashMax }
    } else if (fastCash != null) {
        // fallback: +/-10% around provided offer
        const min = Math.round(fastCash * 0.9)
        const max = Math.round(fastCash * 1.1)
        fastCashRange = { min, max }
    }

    // 2. Fix & List (Rehab & Sell) — include realistic holding and closing costs
    const realtorFee = arvVal * 0.06
    const buyerPrepayPct = 0.05
    const closingCostPct = 0.01
    const domDays = 90
    const holdingMonths = domDays / 30
    const monthlyTaxes = (annualTaxes ?? 0) / 12
    const monthlyInsurance = (insuranceAnnual ?? 0) / 12
    const utilitiesMonthly = 150 // assumed average utilities while holding
    const monthlyMortgage = 0 // placeholder — set >0 if you want to include carrying mortgage

    const buyerPrepay = arvVal * buyerPrepayPct
    const closingCosts = arvVal * closingCostPct
    const holdingCosts = utilitiesMonthly * holdingMonths + monthlyTaxes * holdingMonths + monthlyInsurance * holdingMonths + monthlyMortgage * holdingMonths

    // Deduct all costs before computing the net profit
    const fixListNet = arvVal > 0 ? arvVal - repairs - realtorFee - buyerPrepay - closingCosts - holdingCosts : null

    // 3. Seller Financing (Become the Bank)
    const sfSalePrice = arvVal
    const sfDownPayment = sfSalePrice * 0.10
    const sfLoan = sfSalePrice - sfDownPayment
    const sfMonthly = arvVal > 0 ? calcMonthlyPayment(sfLoan, 6.5, 30) : null
    const sfTotalYield = sfMonthly !== null ? sfDownPayment + sfMonthly * 360 : null

    // 4. Rent It Out
    const rent = estimatedRent ?? 0
    const taxes = annualTaxes ?? 0
    const insurance = insuranceAnnual ?? 0
    const monthlyExpenses = taxes / 12 + insurance / 12 + 150 + 100  // admin $150 + maintenance $100
    const netMonthlyRent = rent > 0 ? rent - monthlyExpenses : null
    const netAnnualRent = netMonthlyRent !== null ? netMonthlyRent * 12 : null

    return (
        <div className="text-left">
            {sellerName ? (
                <div className="mb-3 text-center">
                    <div className="inline-flex items-baseline justify-center gap-4 flex-wrap">
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-tight">{sellerName}</p>
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-400 leading-tight">Weigh your options</p>
                    </div>
                </div>
            ) : (
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">Your 3 Options — Estimated</p>
            )}

            {/* ── Street View + Map ── */}
            {(localAddress || localCity) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {/* Street View */}
                    <div className="flex flex-col gap-1.5">
                        <p className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
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

                    {/* Map */}
                    <div className="flex flex-col gap-1.5">
                        <p className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
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
                                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${geoLatLng
                                    ? `${geoLatLng.lat},${geoLatLng.lng}`
                                    : encodeURIComponent([localAddress, localCity, localState, localZipCode].filter(Boolean).join(", "))
                                    }&zoom=15`}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Offers grid: show three equal-width, equal-height cards aligned */}
            <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
                <motion.div
                    aria-hidden
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    className="h-full"
                >
                    <StrategyCard
                        accent="border-[#f59e0b]/40"
                        icon="⚡"
                        tag="Fast Cash Sale"
                        title="Sell As-Is to Cash Spencer Buys Houses"
                        subtitle="Close in days, zero repairs needed"
                        centered
                        mainLabel="Offer Range From Spencer"
                        mainValue={
                            fastCashRange
                                ? `${fmt(fastCashRange.min)} - ${fmt(fastCashRange.max)}`
                                : fastCash !== null
                                    ? fmt(fastCash)
                                    : null
                        }
                        mainSize="text-2xl"
                        prominent
                        highlighted
                        rows={[
                            { label: "Estimated value based upon comps (ARV)", value: arvVal > 0 ? fmt(arvVal) : "—" },
                            { label: "Estimated Repair Costs (materials, labor, permits, disposal)", value: arvVal > 0 ? fmt(repairs) : "—" },
                            { label: "Investor Discount (30%)", value: arvVal > 0 ? fmt((arvVal - repairs) * 0.3) : "—" },
                        ]}
                        note="Book an hour for Spencer’s team to walk your home and deliver your cash within 7–10 days."
                    />
                </motion.div>

                <div className="h-full transform-gpu transition-transform lg:scale-95">
                    <StrategyCard
                        accent="border-blue-500/40"
                        icon="🔨"
                        tag="Fix & List"
                        title="Rehab &amp; Sell on Market"
                        subtitle="Invest in repairs to get top dollar"
                        mainLabel="Estimated Net Profit"
                        mainValue={fixListNet !== null && fixListNet > 0 ? fmt(fixListNet) : null}
                        rows={[
                            { label: "Estimated value based upon comps (ARV)", value: arvVal > 0 ? fmt(arvVal) : "—" },
                            { label: "Rehab Investment", value: repairs > 0 ? fmt(repairs) : "—" },
                            { label: "Realtor Fees (6%)", value: arvVal > 0 ? fmt(realtorFee) : "—" },
                            { label: "Buyer Prepay (5%)", value: arvVal > 0 ? fmt(buyerPrepay) : "—" },
                            { label: "Closing Costs (1%)", value: arvVal > 0 ? fmt(closingCosts) : "—" },
                            { label: `Holding Costs (${domDays} days)`, value: arvVal > 0 ? fmt(Math.round(holdingCosts)) : "—" },
                        ]}
                    />
                </div>

                <div className="h-full transform-gpu transition-transform lg:scale-95">
                    <StrategyCard
                        accent="border-purple-500/40"
                        icon="🏠"
                        tag="Rent It Out"
                        title="Traditional Rental"
                        subtitle="Hold the property and earn monthly rent"
                        mainLabel="Est. Net Monthly Cashflow"
                        mainValue={netMonthlyRent !== null ? fmt(netMonthlyRent) + "/mo" : null}
                        rows={[
                            { label: "Gross Monthly Rent", value: rent > 0 ? fmt(rent) : "—" },
                            { label: "Est. Monthly Expenses", value: rent > 0 ? fmt(monthlyExpenses) : "—" },
                            { label: "Net Annual Cashflow", value: netAnnualRent !== null ? fmt(netAnnualRent) : "—" },
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

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

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    // Offer may have been precomputed in property-info-form and passed via URL params
    const precomputedCashOffer = searchParams.get("cashOffer") !== null ? Number(searchParams.get("cashOffer")) : null
    const precomputedRepairCosts = searchParams.get("repairCosts") !== null ? Number(searchParams.get("repairCosts")) : null
    const precomputedArv = searchParams.get("arv") !== null ? Number(searchParams.get("arv")) : null
    const precomputedEstimatedRent = searchParams.get("estimatedRent") !== null ? Number(searchParams.get("estimatedRent")) : null
    const precomputedAnnualTaxes = searchParams.get("annualTaxes") !== null ? Number(searchParams.get("annualTaxes")) : null
    const precomputedInsuranceAnnual = searchParams.get("insuranceAnnual") !== null ? Number(searchParams.get("insuranceAnnual")) : null
    console.log('Precomputed offer (from URL):', { precomputedCashOffer, precomputedRepairCosts })

    const [offerLoading, setOfferLoading] = useState(false)
    const [repairCost, setRepairCost] = useState<number | null>(precomputedRepairCosts)
    const [finalOffer, setFinalOffer] = useState<number | null>(precomputedCashOffer)
    const [arv, setArv] = useState<number | null>(precomputedArv)
    const [estimatedRent, setEstimatedRent] = useState<number | null>(precomputedEstimatedRent)
    const [annualTaxes, setAnnualTaxes] = useState<number | null>(precomputedAnnualTaxes)
    const [insuranceAnnual, setInsuranceAnnual] = useState<number | null>(precomputedInsuranceAnnual)

    // store seller's name to personalize the offer heading after submit
    const [sellerName, setSellerName] = useState<string | null>(null)

    // Local copies of prior-step address values
    const [localAddress, setLocalAddress] = useState(address)
    const [localCity, setLocalCity] = useState(city)
    const [localState, setLocalState] = useState(state)
    const [localZipCode, setLocalZipCode] = useState(zipCode)

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

        // persist seller name for the success screen header
        setSellerName(`${data.firstName} ${data.lastName}`)

        // Update URL to reflect completion
        const outParams = new URLSearchParams(Array.from(searchParams.entries()))
        outParams.set("submitted", "true")
        outParams.set("step3Complete", "true")
        const qs = outParams.toString()

        // If offer was precomputed in the previous step, show success immediately — no spinner needed
        if (precomputedCashOffer !== null) {
            setIsSubmitting(false)
            setSubmitted(true)
            // ensure URL reflects submission and name is available on success screen
            router.replace(`${pathname}${qs ? `?${qs}` : ""}`)
            return
        }

        // Otherwise show success screen with spinner and fetch offer in the background
        setIsSubmitting(false)
        setOfferLoading(true)
        setSubmitted(true)
        router.replace(`${pathname}${qs ? `?${qs}` : ""}`)

        try {
            const fullAddress = [localAddress, localCity, localState, localZipCode]
                .filter(Boolean)
                .join(", ")

            const condRaw = searchParams.get("condition")
            const conditionScale = condRaw !== null ? Math.max(0, Math.min(5, Number(condRaw))) : 3

            const res = await fetch("/api/offers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address: fullAddress, conditionScale }),
            })

            if (res.ok) {
                const offerData = await res.json()
                const cashOffer = offerData?.cashOffer ?? null
                const repairCosts = offerData?.repairCosts ?? 0
                setRepairCost(repairCosts)
                if (cashOffer !== null) setFinalOffer(cashOffer)
                if (offerData.arv != null) setArv(offerData.arv)
                if (offerData.estimatedRent != null) setEstimatedRent(offerData.estimatedRent)
                if (offerData.annualTaxes != null) setAnnualTaxes(offerData.annualTaxes)
                if (offerData.insuranceAnnual != null) setInsuranceAnnual(offerData.insuranceAnnual)
                console.log("Offer API response:", offerData)
                console.log('Offer calc (client):', {
                    baseAvmPrice: offerData.baseAvmPrice,
                    repairCosts: offerData.repairCosts,
                    netBefore70: (offerData.baseAvmPrice ?? 0) - (offerData.repairCosts ?? 0),
                    cashOffer: offerData.cashOffer,
                })
            } else {
                console.error("Offer fetch failed:", res.status)
            }
        } catch (err) {
            console.error("Offer calculation failed:", err)
        } finally {
            setOfferLoading(false)
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
        // Use history.replaceState here to update the query string without triggering
        // a navigation/scroll to top when the user simply checks the consent checkbox.
        if (typeof window !== "undefined" && newUrl !== window.location.pathname + window.location.search) {
            try {
                window.history.replaceState({}, "", newUrl)
            } catch (e) {
                // fallback to router.replace if replaceState is unavailable
                router.replace(newUrl)
            }
        }
    }, [isValid, pathname, router, spString])

    if (submitted) {
        return (
            <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-3xl lg:max-w-4xl mx-auto"
            >
                <div
                    className="rounded-2xl bg-[var(--color-background)] p-4 sm:p-6 md:p-8 lg:p-10 text-center border border-[var(--color-primary)]/60 mb-8"
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

                    {/* Primary: -strategy offer grid */}
                    <div className="mt-4">
                        {offerLoading ? (
                            <div className="inline-flex items-center gap-3 text-sm text-gray-300 justify-center w-full">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Calculating your options…
                            </div>
                        ) : (
                            <OfferStrategiesGrid
                                cashOffer={finalOffer}
                                repairCosts={repairCost}
                                arv={arv}
                                estimatedRent={estimatedRent}
                                annualTaxes={annualTaxes}
                                insuranceAnnual={insuranceAnnual}
                                sellerName={sellerName}
                                localAddress={localAddress}
                                localCity={localCity}
                                localState={localState}
                                localZipCode={localZipCode}
                            />
                        )}
                    </div>

                    {/* Secondary: confirmation copy and security badge */}
                    <h3 className="text-xl md:text-2xl font-semibold text-white mt-6 mb-2">You're All Set!</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed max-w-md mx-auto text-sm">
                        We've received your information — one of our home buying specialists will reach out soon with details and next steps.
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
                className="rounded-2xl bg-[var(--color-background)] p-4 sm:p-6 md:p-8 lg:p-10 border border-[var(--color-primary)]/60 w-full max-w-3xl lg:max-w-4xl mx-auto"
            >
                <h3 className="text-xl font-bold text-white mb-1">
                    One More Step — {" "}
                    <span className="text-[var(--color-text-yellow)]">To See Your <span className="font-bold underline">OFFER</span></span>
                </h3>
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
