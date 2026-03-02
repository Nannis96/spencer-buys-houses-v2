"use client"

import { useSearchParams } from "next/navigation"

interface PropertyProgressProps {
    /** Which funnel step is currently active (2 = Property Location, 3 = Property Info). */
    activeStep?: 2 | 3
}

export default function PropertyProgress({ activeStep = 3 }: PropertyProgressProps) {
    const searchParams = useSearchParams()
    // `submitted` is only relevant on step 3 (success state after final form submit)
    const submitted = activeStep === 3 && searchParams.get("submitted") === "true"

    /* ── Derived state ─────────────────────────────────────────────────── */
    const step2Done = activeStep > 2 // true when on step 3
    const connector2Color = activeStep === 2 ? "bg-white/20" : submitted ? "bg-[#22c55e]" : "bg-[#f59e0b]"

    return (
        <div className="w-full max-w-2xl mb-8">
            <div className="flex items-center gap-2 sm:gap-3">
                {/* Step 1 – always done */}
                <div className="flex items-center gap-1.5 shrink-0">
                    <div className="h-7 w-7 rounded-full bg-[#22c55e] flex items-center justify-center text-xs font-bold text-white">
                        ✓
                    </div>
                    <span className="hidden sm:inline text-sm text-[#22c55e] font-medium">Your Info</span>
                </div>

                {/* Connector 1 → 2 */}
                <div className={`flex-1 h-0.5 ${activeStep === 2 ? "bg-[#f59e0b]" : "bg-[#22c55e]"}`} />

                {/* Step 2 – active on step 2, done on step 3 */}
                <div className="flex items-center gap-1.5 shrink-0">
                    {step2Done ? (
                        <>
                            <div className="h-7 w-7 rounded-full bg-[#22c55e] flex items-center justify-center text-xs font-bold text-white">
                                ✓
                            </div>
                            <span className="hidden sm:inline text-sm text-[#22c55e] font-medium">Location</span>
                        </>
                    ) : (
                        <>
                            <div className="h-7 w-7 rounded-full bg-[#f59e0b] flex items-center justify-center text-xs font-bold text-[#0f0f23]">
                                2
                            </div>
                            <span className="hidden sm:inline text-sm text-[#f59e0b] font-medium">Location</span>
                        </>
                    )}
                </div>

                {/* Connector 2 → 3 */}
                <div className={`flex-1 h-0.5 ${connector2Color}`} />

                {/* Step 3 – inactive on step 2, active/done on step 3 */}
                <div className="flex items-center gap-1.5 shrink-0">
                    {activeStep === 2 ? (
                        <>
                            <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
                                3
                            </div>
                            <span className="hidden sm:inline text-sm text-gray-400 font-medium">Property Info</span>
                        </>
                    ) : (
                        <>
                            <div
                                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${submitted ? "bg-[#22c55e] text-white" : "bg-[#f59e0b] text-[#0f0f23]"}`}>
                                {submitted ? "✓" : "3"}
                            </div>
                            <span className={`hidden sm:inline text-sm font-medium ${submitted ? "text-[#22c55e]" : "text-[#f59e0b]"}`}>
                                Property Info
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
