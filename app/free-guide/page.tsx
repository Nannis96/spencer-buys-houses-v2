"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Check, ArrowRight, Loader2, CheckCircle2, ShieldCheck, BookOpen, AlertTriangle, TrendingDown, Home, Users, DollarSign, } from "lucide-react"
import Link from "next/link"

/* ─── Form schema ──────────────────────────────────────────────────────────── */

const guideSchema = z.object({
    firstName: z.string().min(2, "Please enter your first name"),
    email: z.string().email("Please enter a valid email address"),
    consent: z.boolean().refine((v) => v === true, {
        message: "You must agree to the Terms & Conditions and Privacy Policy",
    }),
})

type GuideFormData = z.infer<typeof guideSchema>

/* ─── Guide Form ───────────────────────────────────────────────────────────── */

function GuideForm() {
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
        console.log("Guide form submitted:", data)
        // TODO: wire up to your email / CRM integration
        setTimeout(() => {
            setIsSubmitting(false)

            // Trigger PDF download from public folder. The file currently lives at
            // `/TheMemphisHomeowners_Straight-Talk_ Guide.pdf` (space in name). We use encodeURI to ensure proper URL.
            try {
                const fileUrl = encodeURI("/TheMemphisHomeowners_Straight-Talk_ Guide.pdf")
                const a = document.createElement("a")
                a.href = fileUrl
                // Suggest a clean filename for the downloaded file
                a.download = "TheMemphisHomeowners_Straight-Talk_Guide.pdf"
                document.body.appendChild(a)
                a.click()
                a.remove()
            } catch (e) {
                // Fallback: open the file in a new tab
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
                    Your FREE guide is on its way. Have questions in the meantime? Call us at{" "}
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
            aria-label="Download free guide form"
            noValidate
        >
            {/* First Name */}
            <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1.5">
                    First Name
                </label>
                <input
                    id="firstName"
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                    Email <span className="text-red-400" aria-hidden="true">*</span>
                </label>
                <input
                    id="email"
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
                        id="consent"
                        type="checkbox"
                        {...register("consent")}
                        className="mt-1 h-4 w-4 accent-[var(--color-primary)] cursor-pointer flex-shrink-0"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-400 leading-relaxed cursor-pointer">
                        Privacy Consent — I agree to the{" "}
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

/* ─── Page ─────────────────────────────────────────────────────────────────── */

const pitfalls = [
    "Hidden costs when listing with a real estate agent most sellers never see coming",
    "The FSBO traps that cost homeowners thousands — and months of time",
    "What to watch for when selling to a professional home buyer",
    "Why the highest offer isn't always the best deal",
    "The closing-cost fees that quietly eat into your net proceeds",
]

const sellingOptions = [
    {
        icon: Users,
        title: "List With an Agent",
        items: [
            "6% commission off the top",
            "Months on market — no guarantees",
            "Open houses & strangers in your home",
            "Repair requests after inspection",
            "Financing can fall through last minute",
        ],
    },
    {
        icon: Home,
        title: "Sell It Yourself (FSBO)",
        items: [
            "No commission, but full burden on you",
            "Pricing mistakes are costly",
            "Legal paperwork & negotiation risk",
            "Difficult to attract qualified buyers",
            "Often takes just as long as listing",
        ],
    },
    {
        icon: DollarSign,
        title: "Sell to a Professional Home Buyer",
        items: [
            "Fast cash offer — often in 24 hours",
            "Close in as little as 7–10 days",
            "No repairs, no showings, no fees",
            "We cover all closing costs",
            "Guaranteed sale — no financing contingency",
        ],
        highlight: true,
    },
]

export default function FreeGuidePage() {
    return (
        <main className="bg-[var(--color-background)] min-h-screen pt-10 md:pt-12">

            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <section
                className="relative border-b border-white/10 pt-28 pb-16 overflow-hidden"
                aria-labelledby="guide-hero-heading"
            >
                {/* Ambient glow */}
                <div
                    aria-hidden="true"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#f59e0b]/5 rounded-full blur-3xl pointer-events-none"
                />

                <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                        {/* Left: headlines + benefits */}
                        <div className="flex-1 min-w-0">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-6 uppercase tracking-wide">
                                <BookOpen className="h-4 w-4" aria-hidden="true" />
                                Free Guide
                            </span>

                            <h1
                                id="guide-hero-heading"
                                className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6"
                            >
                                FREE Guide:{" "}
                                <span className="text-[var(--color-text-yellow)]">
                                    Learn The Pros &amp; Cons Of Selling Your House
                                </span>{" "}
                                To Local Memphis Professional Home Buyer
                            </h1>

                            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                                Download our free guide and discover the hidden costs, critical pitfalls,
                                and smart strategies for all 3 ways to sell your Memphis home — so you can
                                make the best decision for your situation.
                            </p>

                            {/* PDF preview / illustration */}
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a2e] p-6 max-w-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--color-primary-dark)]/20 flex-shrink-0">
                                        <BookOpen className="h-7 w-7 text-[var(--color-text-yellow)]" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm leading-tight">
                                            PDF Guide: Pros, Cons &amp; Pitfalls
                                        </p>
                                        <p className="text-gray-400 text-xs mt-0.5">
                                            Selling Your House in Tennessee
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    And What 4 Hidden Costs Creep Up When Listing With An Agent Or Selling It Yourself.
                                </p>
                                <div className="mt-4 flex items-center gap-1.5">
                                    <div className="h-1.5 rounded-full bg-[var(--color-text-yellow)] w-16" />
                                    <div className="h-1.5 rounded-full bg-white/10 flex-1" />
                                </div>
                            </div>
                        </div>

                        {/* Right: form */}
                        <div className="w-full lg:w-[420px] flex-shrink-0">
                            <div className="mb-4">
                                <h2 className="text-xl font-bold text-white">
                                    Download Your FREE &ldquo;Pros, Cons, and Pitfalls&rdquo; Guide Below
                                </h2>
                            </div>
                            <GuideForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Plus Section ──────────────────────────────────────────────── */}
            <section className="py-16 lg:py-20 border-b border-white/10" aria-labelledby="plus-heading">
                <div className="mx-auto max-w-4xl px-4 lg:px-8">
                    <div className="text-center mb-10">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-4 uppercase tracking-wide">
                            PLUS
                        </span>
                        <h2
                            id="plus-heading"
                            className="text-2xl md:text-3xl font-bold text-white leading-tight"
                        >
                            What Big Pitfalls To Watch Out For
                        </h2>
                        <p className="mt-3 text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Whether you&apos;re selling with a real estate agent, by yourself, or to a
                            professional home buyer like Spencer Buys Houses — missing one of these critical
                            &ldquo;pitfalls&rdquo; could mean more stress and expense when your house finally sells.
                        </p>
                    </div>

                    <ul className="space-y-4 max-w-2xl mx-auto" aria-label="Guide pitfalls list">
                        {pitfalls.map((pitfall) => (
                            <li key={pitfall} className="flex items-start gap-3">
                                <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#f59e0b]/10 mt-0.5">
                                    <AlertTriangle className="h-3.5 w-3.5 text-[var(--color-text-yellow)]" aria-hidden="true" />
                                </span>
                                <span className="text-gray-300 text-sm md:text-base leading-relaxed">{pitfall}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── 3 Ways to Sell ────────────────────────────────────────────── */}
            <section className="py-16 lg:py-20 border-b border-white/10" aria-labelledby="options-heading">
                <div className="mx-auto max-w-6xl px-4 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)]/20 text-[var(--color-primary-dark)] text-sm font-semibold mb-4 uppercase tracking-wide">
                            3 Ways to Sell
                        </span>
                        <h2
                            id="options-heading"
                            className="text-2xl md:text-3xl font-bold text-white leading-tight"
                        >
                            There Are 3 Main Ways To Sell Your TN House
                        </h2>
                        <p className="mt-3 text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            All with their own pros and cons. All three options are great in certain situations…
                            and terrible in others. This guide helps you decide which is right for <em>you</em>.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {sellingOptions.map(({ icon: Icon, title, items, highlight }) => (
                            <article
                                key={title}
                                className={`rounded-2xl p-6 border transition-all ${highlight
                                    ? "border-[var(--color-text-yellow)]/40 bg-[#1a1a2e] ring-1 ring-[var(--color-text-yellow)]/20"
                                    : "border-white/10 bg-[#1a1a2e]"
                                    }`}
                            >
                                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${highlight ? "bg-[var(--color-text-yellow)]/10" : "bg-white/5"}`}>
                                    <Icon className={`h-6 w-6 ${highlight ? "text-[var(--color-text-yellow)]" : "text-gray-400"}`} aria-hidden="true" />
                                </div>
                                <h3 className={`text-lg font-bold mb-4 ${highlight ? "text-[var(--color-text-yellow)]" : "text-white"}`}>
                                    {title}
                                    {highlight && (
                                        <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--color-text-yellow)]/10 text-[var(--color-text-yellow)] align-middle">
                                            Best for Speed
                                        </span>
                                    )}
                                </h3>
                                <ul className="space-y-2.5">
                                    {items.map((item) => (
                                        <li key={item} className="flex items-start gap-2.5">
                                            <Check
                                                className={`h-4 w-4 mt-0.5 flex-shrink-0 ${highlight ? "text-[#22c55e]" : "text-gray-500"}`}
                                                aria-hidden="true"
                                            />
                                            <span className={`text-sm leading-relaxed ${highlight ? "text-gray-200" : "text-gray-400"}`}>
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>

                    <p className="mt-8 text-center text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Learn when to list with an agent, when to sell yourself, and when selling to a real
                        estate investor makes the most sense — and learn the costs associated with each option,
                        because you&apos;ll be surprised at what hidden costs most people never even think
                        about until it&apos;s too late.
                    </p>
                </div>
            </section>

            {/* ── Why Download + CTA ────────────────────────────────────────── */}
            <section className="py-16 lg:py-20" aria-labelledby="download-cta-heading">
                <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
                    <div className="mb-4 flex justify-center">
                        <TrendingDown className="h-10 w-10 text-[var(--color-text-yellow)]" aria-hidden="true" />
                    </div>
                    <h2
                        id="download-cta-heading"
                        className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight"
                    >
                        If You Need To Sell Your House Quickly…
                    </h2>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-6">
                        This guide walks you through why real estate agents may end up costing you tens of
                        thousands of dollars — and still end up not getting your house sold.
                    </p>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-10">
                        Enter your name and email in the form above to download this free guide. Or give us
                        a call at{" "}
                        <a
                            href="tel:+19016218799"
                            className="text-[var(--color-text-yellow)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text-yellow)] rounded"
                            aria-label="Call Spencer Buys Houses at 901-621-8799"
                        >
                            (901) 621-8799
                        </a>{" "}
                        — we&apos;d love to discuss what your home is worth and what we can offer with our
                        Cash Offer Program.
                    </p>

                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                        className="inline-block rounded-lg bg-[var(--color-secondary)]/99 hover:bg-[var(--color-secondary)]/80 text-white px-10 py-4 text-base font-bold transition-colors"
                        aria-label="Scroll to top to download the guide"
                    >
                        DOWNLOAD THE GUIDE TODAY
                    </a>
                </div>
            </section>

        </main>
    )
}
