"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface RehabLevel {
    id: string
    level: number
    name: string
    cost: string
    description: string
    tags: string[]
    color: string
    textColor: string
}

const rehabLevels: RehabLevel[] = [
    {
        id: "turnkey",
        level: 0,
        name: "Turnkey",
        cost: "No rehab cost",
        description: "Move-in ready. No repairs needed. Perfect condition with modern finishes throughout. Ideal for rental properties or quick resales.",
        tags: [],
        color: "#2D5016",
        textColor: "#ffffff",
    },
    {
        id: "cosmetic",
        level: 1,
        name: "Cosmetic",
        cost: "~$10 / sqft",
        description: "Light refresh only. Structurally sound with dated finishes. Great for quick flips.",
        tags: ["Paint", "Flooring"],
        color: "#4CAF50",
        textColor: "#ffffff",
    },
    {
        id: "mid-light",
        level: 2,
        name: "Mid-Light",
        cost: "~$20 / sqft",
        description: "Moderate cosmetic work plus minor repairs. May include some fixture updates, minor plumbing, or electrical touch-ups.",
        tags: ["Paint", "Flooring", "Fixtures", "Minor Repairs"],
        color: "#C4B82B",
        textColor: "#1a1a1a",
    },
    {
        id: "mid-heavy",
        level: 3,
        name: "Mid-Heavy",
        cost: "~$30 / sqft",
        description: "Significant updates needed. Kitchen and bath remodels, HVAC work, or roof repairs may be required.",
        tags: ["Kitchen", "Bathrooms", "HVAC", "Roof"],
        color: "#F57C00",
        textColor: "#ffffff",
    },
    {
        id: "major",
        level: 4,
        name: "Major",
        cost: "~$40 / sqft",
        description: "Major renovation required. Structural issues, foundation work, or complete system replacements needed.",
        tags: ["Structural", "Foundation", "Electrical", "Plumbing", "HVAC"],
        color: "#D32F2F",
        textColor: "#ffffff",
    },
    {
        id: "full-gut",
        level: 5,
        name: "Full Gut",
        cost: "~$50 / sqft",
        description: "Complete teardown to studs. Rebuild from the ground up. Typically only walls and foundation remain usable.",
        tags: ["Complete Rebuild", "All Systems", "Permits Required"],
        color: "#7B1FA2",
        textColor: "#ffffff",
    },
]

interface RehabConditionWheelProps {
    value?: string
    onChange?: (value: string) => void
}

export function RehabConditionWheel({ value, onChange }: RehabConditionWheelProps) {
    const [internalValue, setInternalValue] = useState<string>("cosmetic")

    const selectedLevelId = value ?? internalValue
    const selectedLevel = rehabLevels.find((l) => l.id === selectedLevelId) ?? rehabLevels[1]

    const handleSelect = useCallback(
        (id: string) => {
            if (onChange) {
                onChange(id)
            } else {
                setInternalValue(id)
            }
        },
        [onChange]
    )

    // SVG donut chart calculations
    const size = 320
    const strokeWidth = 80
    const radius = (size - strokeWidth) / 2
    const center = size / 2
    const circumference = 2 * Math.PI * radius

    // Calculate slice positions (6 equal slices)
    const sliceAngle = 360 / 6
    const slices = rehabLevels.map((level, index) => {
        const startAngle = index * sliceAngle - 90 // Start from top
        const endAngle = startAngle + sliceAngle
        return { ...level, startAngle, endAngle, index }
    })

    // Helper to convert polar to cartesian
    const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
        const rad = (angle * Math.PI) / 180
        return {
            x: cx + r * Math.cos(rad),
            y: cy + r * Math.sin(rad),
        }
    }

    // Create arc path for a slice
    const createArcPath = (startAngle: number, endAngle: number, innerRadius: number, outerRadius: number) => {
        const start1 = polarToCartesian(center, center, outerRadius, startAngle)
        const end1 = polarToCartesian(center, center, outerRadius, endAngle)
        const start2 = polarToCartesian(center, center, innerRadius, endAngle)
        const end2 = polarToCartesian(center, center, innerRadius, startAngle)

        const largeArc = endAngle - startAngle > 180 ? 1 : 0

        return [
            `M ${start1.x} ${start1.y}`,
            `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${end1.x} ${end1.y}`,
            `L ${start2.x} ${start2.y}`,
            `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${end2.x} ${end2.y}`,
            "Z",
        ].join(" ")
    }

    // Get label position for each slice — uses arc centroid radius for proper centering
    const getLabelPosition = (startAngle: number, endAngle: number) => {
        const midAngle = (startAngle + endAngle) / 2
        const innerRadius = radius - strokeWidth / 2
        const outerRadius = radius + strokeWidth / 2
        // True radial centroid of an annular sector
        const centroidRadius =
            (2 / 3) *
            (outerRadius ** 3 - innerRadius ** 3) /
            (outerRadius ** 2 - innerRadius ** 2)
        return polarToCartesian(center, center, centroidRadius, midAngle)
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-400">Rehab Condition Wheel</h2>
                <p className="text-sm text-[var(--color-text-white)]/70 uppercase tracking-wide">Click a slice to explore each level</p>
            </div>

            {/* Main content - Wheel and List */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12">
                {/* Donut Chart */}
                <div className="relative p-3">
                    <svg width={size} height={size} className="transform -rotate-0" overflow="visible">
                        {slices.map((slice) => {
                            const innerRadius = radius - strokeWidth / 2
                            const outerRadius = radius + strokeWidth / 2
                            const isSelected = slice.id === selectedLevelId

                            return (
                                <g key={slice.id}>
                                    <path
                                        d={createArcPath(slice.startAngle, slice.endAngle - 1, innerRadius, outerRadius)}
                                        fill={slice.color}
                                        className={cn(
                                            "cursor-pointer transition-all duration-200",
                                            isSelected ? "opacity-100 drop-shadow-lg" : "opacity-90 hover:opacity-100"
                                        )}
                                        onClick={() => handleSelect(slice.id)}
                                        style={{
                                            filter: isSelected ? "brightness(1.15) drop-shadow(0 0 6px rgba(0,0,0,0.4))" : undefined,
                                            transform: isSelected ? "scale(1.1)" : "scale(1)",
                                            transformOrigin: `${center}px ${center}px`,
                                            transition: "transform 0.2s ease, filter 0.2s ease",
                                        }}
                                    />
                                </g>
                            )
                        })}
                    </svg>

                    {/* Slice Labels */}
                    <svg
                        width={size}
                        height={size}
                        className="absolute top-0 left-0 pointer-events-none"
                        overflow="visible"
                    >
                        {slices.map((slice) => {
                            const pos = getLabelPosition(slice.startAngle, slice.endAngle)
                            // Small horizontal offset to the right to better center labels visually
                            const dx = 8

                            // Push text down for slices in the upper half of the circle
                            const midAngle = (slice.startAngle + slice.endAngle) / 2
                            const isTopSlice = Math.sin((midAngle * Math.PI) / 180) < -0.1
                            const dy = isTopSlice ? 12 : 0

                            const costDisplay = slice.level === 0 ? "No Rehab" : `$${slice.level * 10}/sqft`

                            return (
                                <g key={slice.id}>
                                    <text
                                        x={pos.x + dx}
                                        y={pos.y - 7 + dy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fontSize={12}
                                        fontWeight="900"
                                        style={{ fill: slice.textColor }}
                                    >
                                        {slice.name}
                                    </text>
                                    <text
                                        x={pos.x + dx}
                                        y={pos.y + 7 + dy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fontSize={12}
                                        fontWeight="700"
                                        style={{ fill: slice.textColor }}
                                    >
                                        {costDisplay}
                                    </text>
                                </g>
                            )
                        })}
                    </svg>

                    {/* Center Circle with Level Info */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-24 h-24 rounded-full bg-white shadow-inner flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-[#1a3a5c]">LVL {selectedLevel.level}</span>
                            <span className="text-xs text-[#1a3a5c]/70 uppercase tracking-wide">Rehab</span>
                        </div>
                    </div>
                </div>

                {/* Selectable List */}
                <div className="flex flex-col gap-1.5 w-full max-w-[220px]">
                    {rehabLevels.map((level) => {
                        const isSelected = level.id === selectedLevelId
                        return (
                            <button
                                key={level.id}
                                type="button"
                                onClick={() => handleSelect(level.id)}
                                className={cn(
                                    "flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 text-left",
                                    isSelected
                                        ? "bg-[white] border-4 border-[var(--color-primary-dark)]"
                                        : "bg-[white] border border-gray-200 hover:bg-gray-50"
                                )}
                            >
                                <div
                                    className="w-4 h-4 rounded-sm shrink-0"
                                    style={{ backgroundColor: level.color }}
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-semibold text-[var(--color-text-black)] truncate">
                                        Level {level.level} — {level.name}
                                    </div>
                                    <div className="text-xs text-gray-500">{level.cost}</div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Detail Card */}
            <div className="mt-8 p-6 rounded-xl bg-[var(--color-background-white)] border-2 border-[var(--color-primary)]">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-[var(--color-text-black)]">
                            Level {selectedLevel.level} — {selectedLevel.name}
                        </h3>
                        <p className="mt-2 text-[#1a3a5c]/80">{selectedLevel.description}</p>
                        {selectedLevel.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {selectedLevel.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-sm rounded-full bg-[var(--color-primary-dark)]/10 text-[var(--color-primary-dark)] font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="text-right shrink-0">
                        <span className="text-xl font-bold text-[var(--color-primary-dark)]">{selectedLevel.cost}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
