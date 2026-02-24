"use client"

import { useState, useEffect } from "react"
import { Phone, Menu, X, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaPinterestP,
    FaGoogle,
} from "react-icons/fa"

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
            itemScope
            itemType="https://schema.org/Organization"
        >
            {/* Organization SEO properties */}
            <meta itemProp="name" content="Sell Your Memphis House Fast | Spencer Buys Houses" />
            <meta itemProp="url" content="https://www.spencerbuyshouses.com" />
            <meta itemProp="telephone" content="+19016218799" />
            <meta itemProp="description" content="Need to sell your Memphis house fast for cash? Spencer Buys Houses offers fair cash offer, no fees and fast closing. Get your free offer today! (901)-979-9848" />

            <div className="mx-auto max-w-7xl px-4 lg:px-8 w-full">
                <div className="flex flex-col py-3">
                    <div className="grid grid-cols-3 items-center">

                        {/* Logo */}
                        <div className="flex justify-start">
                            <Link
                                href="/"
                                itemProp="url"
                                aria-label="Spencer Buys Houses Home"
                            >
                                <Image
                                    src="/SpencerBuysHouses_White.png"
                                    alt="SpencerBuysHouses.com"
                                    width={160}
                                    height={40}
                                    priority
                                    itemProp="logo"
                                />
                            </Link>
                        </div>

                        {/*Call Today (desktop center)*/}
                        <div className="hidden md:flex justify-center">
                            <a
                                href="tel:+19016218799"
                                itemProp="telephone"
                                aria-label="Call Spencer Buys Houses at 901-621-8799"
                                className="text-white font-semibold text-lg"
                            >
                                Call Today: (901) 621-8799
                            </a>
                        </div>

                        <div className="flex items-center ml-auto md:ml-0 md:justify-end gap-4">
                            <div className="hidden md:flex items-center gap-4">
                                <a
                                    href="https://www.facebook.com/spencerbuyshouses"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit Spencer Buys Houses on Facebook"
                                    itemProp="sameAs"
                                    className="text-gray-300 hover:text-white"
                                >
                                    <FaFacebookF size={18} />
                                </a>
                                <a
                                    href="https://www.google.com/search?sca_esv=bcc33a35ba758be7&sxsrf=AHTn8zqZnH3MJTMgocMcMH9qe8pwKbKfmw:1739816269184&kgmid=/g/11jnny9nkl&q=Spencer+Buys+Houses&shndl=30&shem=lcuae,uaasie&source=sh/x/loc/uni/m1/1&kgs=ba24ee0e0bb416e9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit Spencer Buys Houses on Google"
                                    itemProp="sameAs"
                                    className="text-gray-300 hover:text-white transition"
                                >
                                    <FaGoogle size={18} />
                                </a>
                                <a
                                    href="https://www.instagram.com/spen.cershadrach"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit Spencer Buys Houses on Instagram"
                                    itemProp="sameAs"
                                    className="text-gray-300 hover:text-white"
                                >
                                    <FaInstagram size={18} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/spencer-shadrach-0a379b4a"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit Spencer Buys Houses on LinkedIn"
                                    itemProp="sameAs"
                                    className="text-gray-300 hover:text-white"
                                >
                                    <FaLinkedinIn size={18} />
                                </a>
                                <a
                                    href="https://mx.pinterest.com/spencerbuyshouses"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit Spencer Buys Houses on Pinterest"
                                    itemProp="sameAs"
                                    className="text-gray-300 hover:text-white"
                                >
                                    <FaPinterestP size={18} />
                                </a>
                                <a
                                    href="https://www.youtube.com/@spencerbuyshouses"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit Spencer Buys Houses on YouTube"
                                    itemProp="sameAs"
                                    className="text-gray-300 hover:text-white"
                                >
                                    <FaYoutube size={18} />
                                </a>
                            </div>

                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="md:hidden text-white p-2 ml-auto"
                                aria-label="Open navigation menu"
                                aria-expanded={mobileMenuOpen}
                                aria-controls="mobile-navigation"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <nav className="hidden md:flex justify-center pt-3 gap-8">
                        {[
                            { label: "Get your cash offer", href: "/get-a-cash-offer-today/" },
                            { label: "About", href: "/about/" },
                            { label: "How it works", href: "/how-we-buy-houses/" },
                            { label: "Blog", href: "/blog/" },
                            { label: "Contact us", href: "/contact-us/" },
                            { label: "Get paid for referring", href: "/referral-program/" },
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

                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[999] md:hidden">

                    {/* fondo oscuro */}
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* panel */}
                    <div className="absolute top-0 left-0 right-0 bg-[#0f0f23] shadow-lg">

                        {/* header del panel */}
                        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">

                            <span className="text-white font-bold">
                                Spencer Buys Houses
                            </span>

                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                <X className="h-6 w-6 text-white" />
                            </button>

                        </div>

                        {/* links */}
                        <nav className="flex flex-col px-4 py-4">

                            {[
                                { label: "Get your cash offer", href: "/get-a-cash-offer-today/" },
                                { label: "About", href: "/about/" },
                                { label: "How it works", href: "/how-we-buy-houses/" },
                                { label: "Blog", href: "/blog/" },
                                { label: "Contact us", href: "/contact-us/" },
                                { label: "Get paid for referring", href: "/referral-program/" },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="py-4 text-white border-b border-white/10"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}

                            {/* CTA */}
                            <a
                                href="tel:+19016218799"
                                className="mt-4 py-3 text-center font-bold bg-[#f59e0b] text-black rounded-lg"
                            >
                                Call Today: (901) 621-8799
                            </a>

                        </nav>
                    </div>
                </div>
            )}

        </header >
    )
}
