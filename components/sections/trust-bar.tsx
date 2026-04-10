"use client"

import { Shield, Star, Clock, CheckCircle, MapPin, DollarSign, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

const cards = [
    {
        icon: Star,
        title: "5-Star Google Reviews",
        description: "Trusted by homeowners across Memphis.",
        image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=700&q=80",
    },
    {
        icon: Clock,
        title: "Close in 7 Days",
        description: "Fast and flexible closings on your schedule.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80",
    },
    {
        icon: DollarSign,
        title: "Zero Commissions",
        description: "No agent fees, no hidden costs — ever.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700&q=80",
    },
    {
        icon: Shield,
        title: "No Repairs Needed",
        description: "We buy as-is, no matter the condition.",
        image: "/houses/Houses_Ruins.png",
    },
    {
        icon: MapPin,
        title: "Local Memphis Buyer",
        description: "We're your neighbors, not an investment fund.",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=700&q=80",
    },
    {
        icon: CheckCircle,
        title: "Zero Obligation Offer",
        description: "No pressure, no commitment required.",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80",
    },
]

export function TrustBar() {
    const [current, setCurrent] = useState(0)
    const [itemsPerView, setItemsPerView] = useState(3)
    const [isPaused, setIsPaused] = useState(false)
    const touchStartX = useRef<number | null>(null)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const maxIndex = cards.length - itemsPerView

    const next = useCallback(() => {
        setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, [maxIndex])

    const prev = useCallback(() => {
        setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1))
    }, [maxIndex])

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth
            if (w < 640) setItemsPerView(1)
            else if (w < 1024) setItemsPerView(2)
            else setItemsPerView(3)
        }
        update()
        window.addEventListener("resize", update)
        return () => window.removeEventListener("resize", update)
    }, [])

    useEffect(() => {
        setCurrent((prev) => Math.min(prev, maxIndex < 0 ? 0 : maxIndex))
    }, [maxIndex])

    useEffect(() => {
        if (!isPaused) {
            intervalRef.current = setInterval(next, 3500)
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isPaused, next])

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return
        const diff = touchStartX.current - e.changedTouches[0].clientX
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
        touchStartX.current = null
    }

    const translateX = -(current * (100 / itemsPerView))

    return (
        <section className="bg-[var(--color-background-yellow)] border-t-4 border-[var(--color-secondary)] py-12 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Track */}
                    <div
                        className="overflow-hidden"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(${translateX}%)` }}
                        >
                            {cards.map(({ icon: Icon, title, description, image }) => (
                                <div
                                    key={title}
                                    className="shrink-0 px-3"
                                    style={{ width: `${100 / itemsPerView}%` }}
                                >
                                    <div className="rounded-2xl overflow-hidden shadow-md bg-yellow-50 border border-yellow-200 hover:shadow-lg hover:-translate-y-1 transition-transform transition-shadow flex flex-col h-full">
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={image}
                                                alt={title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        </div>
                                        <div className="p-5 flex flex-col gap-2 flex-1">
                                            <Icon className="h-6 w-6 text-yellow-600" />
                                            <h3 className="font-bold text-base text-[var(--color-text-black)] leading-snug">
                                                {title}
                                            </h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Arrow — left */}
                    <button
                        onClick={prev}
                        aria-label="Previous"
                        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>

                    {/* Arrow — right */}
                    <button
                        onClick={next}
                        aria-label="Next"
                        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${i === current
                                ? "w-6 bg-[var(--color-secondary)]"
                                : "w-2 bg-gray-300 hover:bg-gray-400"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
