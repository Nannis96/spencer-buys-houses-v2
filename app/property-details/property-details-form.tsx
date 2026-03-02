"use client"

import { useId, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, User, Phone, Mail, ArrowRight, Loader2, ShieldCheck, Building2, Hash } from "lucide-react"
import { motion } from "framer-motion"

/* ─── Schema ──────────────────────────────────────────────────────────────── */

const propertyDetailsSchema = z.object({
    city: z.string().min(2, "Please enter your city"),
    state: z.string().min(2, "Please enter your state"),
    zipCode: z
        .string()
        .min(5, "Please enter a valid ZIP code")
        .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
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

/* ─── Component ───────────────────────────────────────────────────────────── */

export function PropertyDetailsForm() {
    const uid = useId()
    const id = (field: string) => `${uid}-${field}`
    const searchParams = useSearchParams()
    const router = useRouter()

    const firstName = searchParams.get("firstName") ?? ""
    const lastName = searchParams.get("lastName") ?? ""
    const address = searchParams.get("address") ?? ""
    const phone = searchParams.get("phone") ?? ""
    const email = searchParams.get("email") ?? ""
    const smsConsent = searchParams.get("smsConsent") ?? "false"

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [editMode, setEditMode] = useState(false)

    // Local editable copies of prior-step values (inline edit)
    const [localFirstName, setLocalFirstName] = useState(firstName)
    const [localLastName, setLocalLastName] = useState(lastName)
    const [localAddress, setLocalAddress] = useState(address)
    const [localPhone, setLocalPhone] = useState(phone)
    const [localEmail, setLocalEmail] = useState(email)
    const [localSmsConsent, setLocalSmsConsent] = useState(smsConsent)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PropertyDetailsFormData>({
        resolver: zodResolver(propertyDetailsSchema),
    })

    const onSubmit = (data: PropertyDetailsFormData) => {
        setIsSubmitting(true)
        const params = new URLSearchParams({
            firstName: localFirstName,
            lastName: localLastName,
            address: localAddress,
            phone: localPhone,
            email: localEmail,
            smsConsent: String(localSmsConsent ?? "false"),
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
        })
        console.log("Property details submitted:", { firstName: localFirstName, lastName: localLastName, address: localAddress, phone: localPhone, email: localEmail, ...data })
        // Proceed to final step
        setTimeout(() => {
            router.push(`/property-info?${params.toString()}`)
        }, 1500)
    }

    return (
        <motion.form
            key="property-details-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-label="Property details"
            className="rounded-2xl bg-[#1a1a2e] p-6 md:p-8 border border-white/10 w-full max-w-lg mx-auto"
        >
            <h3 className="text-xl font-bold text-white mb-1">
                One More Step — Tell Us About The Property
            </h3>
            <p className="text-gray-400 text-sm mb-6">
                100% free. Zero obligation. Results in 24&nbsp;hours.
            </p>

            {/* ── Summary of previous step (inline editable) ── */}
            <div className="rounded-lg bg-white/[0.03] border border-white/10 p-3 mb-6">
                <div className="flex items-start justify-between mb-2">
                    <p className="text-xs font-semibold text-[#f59e0b] uppercase tracking-wider">
                        Your information
                    </p>
                    {!editMode && (
                        <button
                            type="button"
                            onClick={() => setEditMode(true)}
                            className="text-xs text-[#f59e0b] hover:underline focus:outline-none"
                        >
                            Edit
                        </button>
                    )}
                </div>

                {editMode ? (
                    <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Input
                                placeholder="First name"
                                value={localFirstName}
                                onChange={(e) => setLocalFirstName(e.target.value)}
                                className="h-10 bg-white/5 text-white placeholder:text-gray-400"
                            />
                            <Input
                                placeholder="Last name"
                                value={localLastName}
                                onChange={(e) => setLocalLastName(e.target.value)}
                                className="h-10 bg-white/5 text-white placeholder:text-gray-400"
                            />
                        </div>

                        <Input
                            placeholder="Property address"
                            value={localAddress}
                            onChange={(e) => setLocalAddress(e.target.value)}
                            className="h-10 bg-white/5 text-white placeholder:text-gray-400"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Input
                                placeholder="Phone"
                                value={localPhone}
                                onChange={(e) => setLocalPhone(e.target.value)}
                                className="h-10 bg-white/5 text-white placeholder:text-gray-400"
                            />
                            <Input
                                placeholder="Email"
                                value={localEmail}
                                onChange={(e) => setLocalEmail(e.target.value)}
                                className="h-10 bg-white/5 text-white placeholder:text-gray-400"
                            />
                        </div>

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
                                    // revert to original values
                                    setLocalFirstName(firstName)
                                    setLocalLastName(lastName)
                                    setLocalAddress(address)
                                    setLocalPhone(phone)
                                    setLocalEmail(email)
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
                        <SummaryRow icon={<User className="h-4 w-4" />} label="Name" value={`${localFirstName} ${localLastName}`} />
                        <SummaryRow icon={<MapPin className="h-4 w-4" />} label="Address" value={localAddress} />
                        <SummaryRow icon={<Phone className="h-4 w-4" />} label="Phone" value={localPhone} />
                        <SummaryRow icon={<Mail className="h-4 w-4" />} label="Email" value={localEmail} />
                    </>
                )}
            </div>

            <div className="flex flex-col gap-4">

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
    )
}
