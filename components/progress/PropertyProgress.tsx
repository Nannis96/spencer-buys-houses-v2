"use client"

import { useSearchParams } from "next/navigation"

interface PropertyProgressProps {
    /** Which funnel step is currently active (2 = /property-info, 3 = /property-details). */
    activeStep?: 2 | 3
}

export default function PropertyProgress({ activeStep = 3 }: PropertyProgressProps) {
    const searchParams = useSearchParams()
    const submitted = activeStep === 3 && searchParams.get("submitted") === "true"
    const step2Complete = searchParams.get("step2Complete") === "true"
    const step3Complete = searchParams.get("step3Complete") === "true"
    // Set by the form when the user moves between sub-steps inside /property-info
    const propInfoStep = searchParams.get("propInfoStep")

    /* ── Derived state ─────────────────────────────────────────────────── */
    const step2Done = propInfoStep === "2" || propInfoStep === "3" || activeStep > 2
    const conditionActive = activeStep === 2 && propInfoStep === "2"
    const conditionDone = (activeStep === 2 && propInfoStep === "3") || activeStep > 2
    const situationActive = activeStep === 2 && propInfoStep === "3"
    const situationDone = (activeStep === 2 && step2Complete) || activeStep > 2

    const connector2Color = step2Done
        ? conditionDone ? "bg-[#22c55e]" : "bg-[#f59e0b]"
        : "bg-white/20"
    const connector3Color = conditionDone
        ? situationDone ? "bg-[#22c55e]" : "bg-[#f59e0b]"
        : "bg-white/20"
    const connector4Color = situationDone
        ? submitted || step3Complete ? "bg-[#22c55e]" : "bg-[#f59e0b]"
        : "bg-white/20"

    return (
        <div className="w-full max-w-2xl mb-8">
            <div className="flex items-center gap-2 sm:gap-3">

                {/* Step 1 – always done */}
                <div className="flex items-center gap-1.5 shrink-0">
                    <div className="h-7 w-7 rounded-full bg-[#22c55e] flex items-center justify-center text-xs font-bold text-white">✓</div>
                    <span className="hidden sm:inline text-sm text-[#22c55e] font-medium">Location</span>
                </div>

                {/* Connector 1 → 2 */}
                <div className={`flex-1 h-0.5 ${step2Done ? "bg-[#22c55e]" : "bg-[var(--color-primary)]"}`} />

                {/* Step 2 – Property Info */}
                <div className="flex items-center gap-1.5 shrink-0">
                    {step2Done ? (
                        <>
                            <div className="h-7 w-7 rounded-full bg-[#22c55e] flex items-center justify-center text-xs font-bold text-white">✓</div>
                            <span className="hidden sm:inline text-sm text-[#22c55e] font-medium">Property Info</span>
                        </>
                    ) : (
                        <>
                            <div className="h-7 w-7 rounded-full bg-[#f59e0b] flex items-center justify-center text-xs font-bold text-[#0f0f23]">2</div>
                            <span className="hidden sm:inline text-sm text-[var(--color-primary)] font-medium">Property Info</span>
                        </>
                    )}
                </div>

                {/* Connector 2 → 3 */}
                <div className={`flex-1 h-0.5 ${connector2Color}`} />

                {/* Step 3 – Condition */}
                <div className="flex items-center gap-1.5 shrink-0">
                    {conditionDone ? (
                        <>
                            <div className="h-7 w-7 rounded-full bg-[#22c55e] flex items-center justify-center text-xs font-bold text-white">✓</div>
                            <span className="hidden sm:inline text-sm text-[#22c55e] font-medium">Condition</span>
                        </>
                    ) : conditionActive ? (
                        <>
                            <div className="h-7 w-7 rounded-full bg-[#f59e0b] flex items-center justify-center text-xs font-bold text-[#0f0f23]">3</div>
                            <span className="hidden sm:inline text-sm text-[var(--color-primary)] font-medium">Condition</span>
                        </>
                    ) : (
                        <>
                            <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400">3</div>
                            <span className="hidden sm:inline text-sm text-gray-400 font-medium">Condition</span>
                        </>
                    )}
                </div>

                {/* Connector 3 → 4 */}
                <div className={`flex-1 h-0.5 ${connector3Color}`} />

                {/* Step 4 – Situation */}
                <div className="flex items-center gap-1.5 shrink-0">
                    {situationDone ? (
                        <>
                            <div className="h-7 w-7 rounded-full bg-[#22c55e] flex items-center justify-center text-xs font-bold text-white">✓</div>
                            <span className="hidden sm:inline text-sm text-[#22c55e] font-medium">Situation</span>
                        </>
                    ) : situationActive ? (
                        <>
                            <div className="h-7 w-7 rounded-full bg-[#f59e0b] flex items-center justify-center text-xs font-bold text-[#0f0f23]">4</div>
                            <span className="hidden sm:inline text-sm text-[var(--color-primary)] font-medium">Situation</span>
                        </>
                    ) : (
                        <>
                            <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400">4</div>
                            <span className="hidden sm:inline text-sm text-gray-400 font-medium">Situation</span>
                        </>
                    )}
                </div>

                {/* Connector 4 → 5 */}
                <div className={`flex-1 h-0.5 ${connector4Color}`} />

                {/* Step 5 – Your Info */}
                <div className="flex items-center gap-1.5 shrink-0">
                    {activeStep === 2 ? (
                        <>
                            <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400">5</div>
                            <span className="hidden sm:inline text-sm text-gray-400 font-medium">Your Info</span>
                        </>
                    ) : (
                        <>
                            <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${submitted ? "bg-[#22c55e] text-white" : "bg-[#f59e0b] text-[#0f0f23]"}`}>
                                {submitted ? "✓" : "5"}
                            </div>
                            <span className={`hidden sm:inline text-sm font-medium ${submitted ? "text-[#22c55e]" : "text-[#f59e0b]"}`}>
                                Your Info
                            </span>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}
