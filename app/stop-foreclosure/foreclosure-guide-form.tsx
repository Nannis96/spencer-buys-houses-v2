"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowRight, Loader2, CheckCircle2, ShieldCheck } from "lucide-react"
import Link from "next/link"

const guideSchema = z.object({
    firstName: z.string().min(2, "Please enter your first name"),
    email: z.string().email("Please enter a valid email address"),
    consent: z.boolean().refine((v) => v === true, {
        message: "You must agree to the Terms & Conditions and Privacy Policy",
    }),
})

type GuideFormData = z.infer<typeof guideSchema>

export function ForeclosureGuideForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<GuideFormData>({
        resolver: zodResolver(guideSchema),
        defaultValues: { consent: false },
    })

    const onSubmit = (data: GuideFormData) => {
        setIsSubmitting(true)
        console.log("Foreclosure guide form submitted:", data)
        // TODO: wire up to your email / CRM integration
        setTimeout(() => {
            setIsSubmitting(false)

            try {
                const fileUrl = encodeURI("/TheMemphisHomeowners_Straight-Talk_ Guide.pdf")
                const a = document.createElement("a")
                a.href = fileUrl
                a.download = "TheMemphisHomeowners_Straight-Talk_Guide.pdf"
                document.body.appendChild(a)
                a.click()
                a.remove()
            } catch {
                window.open(encodeURI("/TheMemphisHomeowners_Straight-Talk_ Guide.pdf"), "_blank")
            }

            setSubmitted(true)
        }, 1500)
    }

    if (submitted) {
        return (
            <div className="rounded-2xl bg-[var(--color-background)] border border-[#22c55e]/40 p-8 text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#22c55e]/10">
                    <CheckCircle2 className="h-10 w-10 text-[#22c55e]" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Check Your Inbox!</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                    Your FREE foreclosure guide is on its way. Have questions in the meantime? Call us at{" "}
                    <a
                        href="tel:+19016218799"
                        className="text-[var(--color-text-yellow)] hover:underline"
                    >
                        (901) 621-8799
                    </a>
                    .
                </p>
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-4 py-2 text-sm font-medium text-[var(--color-primary)]">
                    <ShieldCheck className="h-4 w-4" />
                    Your information is 100% secure
                </div>
            </div>
        )
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl bg-[#1a1a2e] border border-white/10 p-6 md:p-8 space-y-5"
            aria-label="Download free foreclosure guide form"
            noValidate
        >
            <div className="text-center mb-2">
                <p className="text-sm font-semibold text-[var(--color-primary-dark)] uppercase tracking-wide mb-1">
                    Free Download
                </p>
                <h3 className="text-xl font-bold text-white">Get Your Free Foreclosure Guide</h3>
                <p className="text-gray-400 text-sm mt-1">
                    Enter your info below and we&apos;ll send it right away.
                </p>
            </div>

            {/* First Name */}
            <div>
                <label htmlFor="guide-firstName" className="block text-sm font-medium text-gray-300 mb-1.5">
                    First Name <span className="text-red-400" aria-hidden="true">*</span>
                </label>
                <input
                    id="guide-firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder="Your first name"
                    {...register("firstName")}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
                />
                {errors.firstName && (
                    <p className="mt-1.5 text-sm text-red-400" role="alert">
                        {errors.firstName.message}
                    </p>
                )}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="guide-email" className="block text-sm font-medium text-gray-300 mb-1.5">
                    Email <span className="text-red-400" aria-hidden="true">*</span>
                </label>
                <input
                    id="guide-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
                />
                {errors.email && (
                    <p className="mt-1.5 text-sm text-red-400" role="alert">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Privacy Consent */}
            <div>
                <div className="flex items-start gap-3">
                    <input
                        id="guide-consent"
                        type="checkbox"
                        {...register("consent")}
                        className="mt-1 h-4 w-4 accent-[var(--color-primary)] cursor-pointer flex-shrink-0"
                    />
                    <label htmlFor="guide-consent" className="text-sm text-gray-400 leading-relaxed cursor-pointer">
                        I agree to the{" "}
                        <Link href="/terms/" className="text-[var(--color-text-yellow)] hover:underline">
                            Terms &amp; Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy/" className="text-[var(--color-text-yellow)] hover:underline">
                            Privacy Policy
                        </Link>
                        .
                    </label>
                </div>
                {errors.consent && (
                    <p className="mt-1.5 text-sm text-red-400" role="alert">
                        {errors.consent.message}
                    </p>
                )}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 flex items-center justify-center gap-2 rounded-lg bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/80 text-white font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <>
                        DOWNLOAD MY FREE GUIDE
                        <ArrowRight className="h-5 w-5" />
                    </>
                )}
            </button>

            <p className="text-xs text-gray-500 text-center">
                Your information is secure and never shared with third parties.
            </p>
        </form>
    )
}
