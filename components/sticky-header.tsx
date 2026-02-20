"use client"

import { useState, useEffect } from "react"
import { Phone, Menu, X, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export function StickyHeader() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-[#0f0f23]/98 backdrop-blur-md shadow-lg"
                : "bg-[#0f0f23]/90 backdrop-blur-sm"
                }`}
        >
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <a href="#" className="flex items-center gap-2 font-bold text-xl text-white">
                        <Home className="h-6 w-6" />
                        <span>CashHomeBuyers</span>
                    </a>

                    <nav className="hidden md:flex items-center gap-8">
                        {[
                            { label: "How It Works", href: "#how-it-works" },
                            // { label: "Why Us", href: "#benefits" },
                            // { label: "Reviews", href: "#testimonials" },
                            // { label: "FAQ", href: "#faq" },
                        ].map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <Button
                            asChild
                            className="hidden sm:inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f0f23] font-bold"
                        >
                            <a href="tel:+15551234567">
                                <Phone className="h-4 w-4" />
                                <span>(555) 123-4567</span>
                            </a>
                        </Button>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-white"
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#0f0f23] border-t border-white/10">
                    <div className="flex flex-col px-4 py-4 gap-1">
                        {[
                            { label: "How It Works", href: "#how-it-works" },
                            { label: "Why Us", href: "#benefits" },
                            { label: "Reviews", href: "#testimonials" },
                            { label: "FAQ", href: "#faq" },
                        ].map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                        <Button asChild className="mt-2 w-full bg-[#f59e0b] hover:bg-[#d97706] text-[#0f0f23] font-bold">
                            <a href="tel:+15551234567">
                                <Phone className="h-4 w-4 mr-2" />
                                Call (555) 123-4567
                            </a>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}
