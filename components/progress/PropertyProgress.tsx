"use client"

import { Fragment } from "react"
import { useSearchParams } from "next/navigation"

interface PropertyProgressProps {
    /** Which funnel page is rendering the bar (2 = /property-info, 3 = /property-details). */
    activeStep?: 2 | 3
}

/**
 * The seven steps a seller walks through. Steps 1-6 all live inside
 * /property-info and are driven by the `propInfoStep` query param; step 7 is
 * the contact form on /property-details.
 */
const STEPS = ["Condition", "Timeline", "Reason", "Price", "Address", "Details", "Your Info"] as const

/** Steps 1-6 are the /property-info sub-steps; the last one is /property-details. */
const CONTACT_STEP = STEPS.length
const LAST_INFO_STEP = STEPS.length - 1

type StepState = "done" | "active" | "todo"

const DOT_CLASS: Record<StepState, string> = {
    done: "bg-[#22c55e] text-white",
    active: "bg-[#f59e0b] text-[#0f0f23]",
    todo: "bg-white/10 text-gray-400",
}

const LABEL_CLASS: Record<StepState, string> = {
    done: "text-[#22c55e]",
    active: "text-[var(--color-primary)]",
    todo: "text-gray-400",
}

const CONNECTOR_CLASS: Record<StepState, string> = {
    done: "bg-[#22c55e]",
    active: "bg-[#f59e0b]",
    todo: "bg-white/20",
}

export default function PropertyProgress({ activeStep = 3 }: PropertyProgressProps) {
    const searchParams = useSearchParams()

    const subStep = Number(searchParams.get("propInfoStep"))
    const current =
        activeStep === 3
            ? CONTACT_STEP
            : Math.min(LAST_INFO_STEP, Math.max(1, Number.isFinite(subStep) && subStep > 0 ? subStep : 1))

    const stateOf = (step: number): StepState =>
        step < current ? "done" : step === current ? "active" : "todo"

    return (
        <div className="w-full max-w-2xl lg:max-w-6xl mb-8">
            {/* Plain-language position — the rail below hides its labels on small screens,
                so this line is what tells the seller how much is left on mobile. */}
            <p className="mb-3 text-center text-sm font-medium text-gray-300">
                Step <span className="text-[var(--color-primary)]">{current}</span> of {STEPS.length}
                <span className="text-gray-500"> — {STEPS[current - 1]}</span>
            </p>

            <div className="flex items-center gap-2 sm:gap-3 flex-nowrap">
                {STEPS.map((label, index) => {
                    const step = index + 1
                    const state = stateOf(step)

                    return (
                        <Fragment key={label}>
                            {index > 0 && <div className={`flex-1 h-0.5 ${CONNECTOR_CLASS[state]}`} />}

                            <div className="flex items-center gap-1.5 shrink-0">
                                <div
                                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${DOT_CLASS[state]}`}
                                    aria-current={state === "active" ? "step" : undefined}
                                >
                                    {state === "done" ? "✓" : step}
                                </div>
                                <span className={`hidden lg:inline text-sm font-medium ${LABEL_CLASS[state]}`}>
                                    {label}
                                </span>
                            </div>
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}
