"use client"

import { useSearchParams } from "next/navigation"

export default function PropertyProgress() {
    const searchParams = useSearchParams()
    const submitted = searchParams.get("submitted") === "true"

    return (
        <div className="w-full max-w-2xl mb-8">
            <div className="flex items-center gap-2 sm:gap-3">
                {/* Step 1 – done */}
                <div className="flex items-center gap-1.5 shrink-0">
                    <div className="h-7 w-7 rounded-full bg-[#22c55e] flex items-center justify-center text-xs font-bold text-white">
                        ✓
                    </div>
                    <span className="hidden sm:inline text-sm text-[#22c55e] font-medium">Your Info</span>
                </div>
                <div className="flex-1 h-0.5 bg-[#22c55e]" />

                {/* Step 2 – done */}
                <div className="flex items-center gap-1.5 shrink-0">
                    <div className="h-7 w-7 rounded-full bg-[#22c55e] flex items-center justify-center text-xs font-bold text-white">
                        ✓
                    </div>
                    <span className="hidden sm:inline text-sm text-[#22c55e] font-medium">Location</span>
                </div>

                <div className={`flex-1 h-0.5 ${submitted ? "bg-[#22c55e]" : "bg-[#f59e0b]"}`} />

                {/* Step 3 – active or done */}
                <div className="flex items-center gap-1.5 shrink-0">
                    <div
                        className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${submitted ? "bg-[#22c55e] text-white" : "bg-[#f59e0b] text-[#0f0f23]"}`}>
                        {submitted ? "✓" : "3"}
                    </div>
                    <span className={`hidden sm:inline text-sm font-medium ${submitted ? "text-[#22c55e]" : "text-[#f59e0b]"}`}>
                        Property Info
                    </span>
                </div>
            </div>
        </div>
    )
}
