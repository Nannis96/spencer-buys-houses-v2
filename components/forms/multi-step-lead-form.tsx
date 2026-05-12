"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { LeadFormConsent } from "./lead-form-consent"

/* ─── Lazy-loaded steps ───────────────────────────────────────────────────── */

function FormSkeleton() {
    return (
        <div className="rounded-2xl bg-[var(--color-background)] p-10 border border-[var(--color-primary)]/60 flex items-center justify-center w-full">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--color-primary)]" />
        </div>
    )
}

const PropertyInfoForm = dynamic(
    () =>
        import("@/app/property-info/property-info-form").then((m) => ({
            default: m.PropertyInfoForm,
        })),
    { ssr: false, loading: () => <FormSkeleton /> }
)

const PropertyDetailsForm = dynamic(
    () =>
        import("@/app/property-details/property-details-form").then((m) => ({
            default: m.PropertyDetailsForm,
        })),
    { ssr: false, loading: () => <FormSkeleton /> }
)

/* ─── Component ───────────────────────────────────────────────────────────── */

export function MultiStepLeadForm() {
    const [step, setStep] = useState<1 | 2 | 3>(1)
    const [step1Params, setStep1Params] = useState<URLSearchParams | null>(null)
    const [step2Params, setStep2Params] = useState<URLSearchParams | null>(null)

    return (
        <>
            {step === 1 && (
                <LeadFormConsent
                    onNext={(params) => {
                        setStep1Params(params)
                        setStep(2)
                    }}
                />
            )}

            {step === 2 && (
                <PropertyInfoForm
                    initialParams={step1Params}
                    onNext={(params) => {
                        setStep2Params(params)
                        setStep(3)
                    }}
                />
            )}

            {step === 3 && <PropertyDetailsForm initialParams={step2Params} />}
        </>
    )
}
