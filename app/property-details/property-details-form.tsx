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
    firstName: z.string().min(2, "Please enter your first name"),
    lastName: z.string().min(2, "Please enter your last name"),
    phone: z
        .string()
        .min(10, "Please enter a valid phone number")
        .regex(/^[\d\s\-().+]+$/, "Please enter a valid phone number"),
    email: z.string().email("Please enter a valid email address"),
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

    const address = searchParams.get("address") ?? ""
    const city = searchParams.get("city") ?? ""
    const state = searchParams.get("state") ?? ""
    const zipCode = searchParams.get("zipCode") ?? ""
    const smsConsent = searchParams.get("smsConsent") ?? "false"

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [editMode, setEditMode] = useState(false)

    // Local editable copies of prior-step values (inline edit)
    const [localAddress, setLocalAddress] = useState(address)
    const [localCity, setLocalCity] = useState(city)
    const [localState, setLocalState] = useState(state)
    const [localZipCode, setLocalZipCode] = useState(zipCode)
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
            address: localAddress,
            city: localCity,
            state: localState,
            zipCode: localZipCode,
            smsConsent: String(localSmsConsent ?? "false"),
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,

        })
        // console.log("Property details submitted:", { firstName: localFirstName, lastName: localLastName, address: localAddress, phone: localPhone, email: localEmail, ...data })
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
                        <SummaryRow icon={<MapPin className="h-4 w-4" />} label="Address" value={localAddress} />
                        <SummaryRow icon={<Building2 className="h-4 w-4" />} label="City" value={localCity} />
                        <SummaryRow icon={<Building2 className="h-4 w-4" />} label="State" value={localState} />
                        <SummaryRow icon={<Hash className="h-4 w-4" />} label="Zip Code" value={localZipCode} />
                    </>
                )}
            </div>

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
