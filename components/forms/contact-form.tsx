"use client"

import { useId, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, User, ArrowRight, Loader2, CheckCircle2, ShieldCheck, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/* ─── Schema ──────────────────────────────────────────────────────────────── */

const contactSchema = z.object({
    firstName: z.string().min(2, "Please enter your first name"),
    lastName: z.string().min(2, "Please enter your last name"),
    phone: z
        .string()
        .min(10, "Please enter a valid phone number")
        .regex(/^[\d\s\-().+]+$/, "Please enter a valid phone number"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Please enter your question or comments (at least 10 characters)"),
    smsConsent: z.boolean().optional(),
    privacyConsent: z
        .boolean()
        .refine((val) => val === true, {
            message: "You must agree to the Terms & Conditions and Privacy Policy",
        }),
})

type ContactFormData = z.infer<typeof contactSchema>

/* ─── Field wrapper ───────────────────────────────────────────────────────── */

function FieldError({ message, id }: { message?: string; id?: string }) {
    if (!message) return null
    return (
        <p id={id} role="alert" className="mt-1.5 text-xs text-red-400">
            {message}
        </p>
    )
}

/* ─── Component ───────────────────────────────────────────────────────────── */

export function ContactForm() {
    const uid = useId()
    const fid = (field: string) => `${uid}-${field}`

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            smsConsent: false,
            privacyConsent: false,
        },
    })

    const onSubmit = (data: ContactFormData) => {
        setIsSubmitting(true)
        console.log("Contact form submitted:", data)
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
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        Thanks for reaching out! We{"'"}ll get back to you within{" "}
                        <strong className="text-white">48 hours</strong>. If you need a faster
                        response, give us a call at{" "}
                        <a
                            href="tel:+19016218799"
                            className="text-[#f59e0b] hover:underline"
                        >
                            (901) 621-8799
                        </a>
                        .
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
                    aria-label="Contact Spencer Buys Houses"
                    className="rounded-2xl bg-[#1a1a2e] p-6 md:p-8 border border-white/10"
                >
                    <h3 className="text-xl font-bold text-white mb-1">Send Us a Message</h3>
                    <p className="text-gray-400 text-sm mb-6">
                        We{"'"}ll respond within 48 hours — or call for a faster reply.
                    </p>

                    <div className="flex flex-col gap-4">

                        {/* ── Name row ── */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor={fid("firstName")} className="sr-only">First name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f59e0b]" aria-hidden="true" />
                                    <Input
                                        id={fid("firstName")}
                                        placeholder="First Name"
                                        autoComplete="given-name"
                                        {...register("firstName")}
                                        className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                        aria-invalid={!!errors.firstName}
                                        aria-describedby={errors.firstName ? fid("firstName-err") : undefined}
                                    />
                                </div>
                                <FieldError id={fid("firstName-err")} message={errors.firstName?.message} />
                            </div>
                            <div>
                                <label htmlFor={fid("lastName")} className="sr-only">Last name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f59e0b]" aria-hidden="true" />
                                    <Input
                                        id={fid("lastName")}
                                        placeholder="Last Name"
                                        autoComplete="family-name"
                                        {...register("lastName")}
                                        className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                        aria-invalid={!!errors.lastName}
                                        aria-describedby={errors.lastName ? fid("lastName-err") : undefined}
                                    />
                                </div>
                                <FieldError id={fid("lastName-err")} message={errors.lastName?.message} />
                            </div>
                        </div>

                        {/* ── Phone ── */}
                        <div>
                            <label htmlFor={fid("phone")} className="sr-only">Phone number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f59e0b]" aria-hidden="true" />
                                <Input
                                    id={fid("phone")}
                                    type="tel"
                                    placeholder="Phone Number"
                                    autoComplete="tel"
                                    {...register("phone")}
                                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                    aria-invalid={!!errors.phone}
                                    aria-describedby={errors.phone ? fid("phone-err") : undefined}
                                />
                            </div>
                            <FieldError id={fid("phone-err")} message={errors.phone?.message} />
                        </div>

                        {/* ── Email ── */}
                        <div>
                            <label htmlFor={fid("email")} className="sr-only">Email address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f59e0b]" aria-hidden="true" />
                                <Input
                                    id={fid("email")}
                                    type="email"
                                    placeholder="Email Address"
                                    autoComplete="email"
                                    {...register("email")}
                                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#f59e0b] focus-visible:border-[#f59e0b]"
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? fid("email-err") : undefined}
                                />
                            </div>
                            <FieldError id={fid("email-err")} message={errors.email?.message} />
                        </div>

                        {/* ── Message ── */}
                        <div>
                            <label htmlFor={fid("message")} className="sr-only">Your questions or comments</label>
                            <div className="relative">
                                <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-[#f59e0b]" aria-hidden="true" />
                                <textarea
                                    id={fid("message")}
                                    placeholder="Type your questions or comments here…"
                                    rows={5}
                                    {...register("message")}
                                    className="w-full pl-11 pr-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-[#f59e0b] resize-none text-sm"
                                    aria-invalid={!!errors.message}
                                    aria-describedby={errors.message ? fid("message-err") : undefined}
                                />
                            </div>
                            <FieldError id={fid("message-err")} message={errors.message?.message} />
                        </div>

                        {/* ── SMS Consent (optional) ── */}
                        <div className="rounded-lg bg-white/[0.03] border border-white/10 p-3">
                            <label htmlFor={fid("smsConsent")} className="flex items-start gap-3 cursor-pointer">
                                <input
                                    id={fid("smsConsent")}
                                    type="checkbox"
                                    {...register("smsConsent")}
                                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/10 accent-[#f59e0b] cursor-pointer"
                                />
                                <span className="text-xs text-gray-400 leading-relaxed">
                                    <span className="font-semibold text-gray-300">SMS &amp; Communications Consent (optional)</span>
                                    {" — "}By checking this box you consent to receive SMS messages, emails, and calls from Spencer Buys Houses. Message frequency varies. Msg &amp; data rates may apply. Text{" "}
                                    <strong className="text-gray-300">HELP</strong> for help,{" "}
                                    <strong className="text-gray-300">STOP</strong> to cancel. Your information will not be sold to third parties.
                                </span>
                            </label>
                        </div>

                        {/* ── Privacy Consent (required) ── */}
                        <div>
                            <label htmlFor={fid("privacyConsent")} className="flex items-start gap-3 cursor-pointer">
                                <input
                                    id={fid("privacyConsent")}
                                    type="checkbox"
                                    {...register("privacyConsent")}
                                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/10 accent-[#f59e0b] cursor-pointer"
                                    aria-required="true"
                                    aria-invalid={!!errors.privacyConsent}
                                    aria-describedby={errors.privacyConsent ? fid("privacy-err") : undefined}
                                />
                                <span className="text-xs text-gray-400 leading-relaxed">
                                    I agree to the{" "}
                                    <a
                                        href="/terms/"
                                        className="text-[#f59e0b] hover:underline focus:outline-none focus:ring-1 focus:ring-[#f59e0b] rounded"
                                    >
                                        Terms &amp; Conditions
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="/privacy/"
                                        className="text-[#f59e0b] hover:underline focus:outline-none focus:ring-1 focus:ring-[#f59e0b] rounded"
                                    >
                                        Privacy Policy
                                    </a>.{" "}
                                    <span className="text-red-400" aria-hidden="true">*</span>
                                    <span className="sr-only">(required)</span>
                                </span>
                            </label>
                            {errors.privacyConsent && (
                                <p id={fid("privacy-err")} role="alert" className="mt-1.5 text-xs text-red-400 ml-7">
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
                                    <span className="sr-only">Sending…</span>
                                </>
                            ) : (
                                <>
                                    SEND MY MESSAGE
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
