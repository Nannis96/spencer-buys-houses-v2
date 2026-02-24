import { Home, Phone, Mail, MapPin } from "lucide-react"
import {
    FaFacebookF,
    FaGoogle,
    FaInstagram,
    FaLinkedinIn,
    FaPinterestP,
    FaYoutube,
} from "react-icons/fa"

export function SiteFooter() {
    return (
        <footer className="bg-[#0a0a1a] text-white">
            <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <nav className="flex flex-col gap-2">
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
                                    className="text-sm text-gray-500 hover:text-[#f59e0b] transition-colors"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Brand */}
                    <div className="text-center">
                        <a href="/" className="font-bold text-xl mb-4 inline-block">
                            <span>Spencer Buys Houses</span>
                        </a>
                        <p className="text-sm leading-relaxed text-gray-500">
                            We are a real estate solutions and investment firm that specializes in helping homeowners get rid of burdensome houses fast. We are investors and problem solvers who can buy your house fast with a fair all cash offer.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="text-center md:text-right">
                        <h4 className="font-semibold mb-4">Contact Us</h4>
                        <div className="flex flex-col items-center md:items-end gap-3">
                            <a
                                href="tel:+19016218799"
                                className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#f59e0b]"
                            >
                                <Phone className="h-4 w-4" />
                                Call Today: (901) 621-8799
                            </a>
                            <div className="flex items-center gap-4">
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
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-500">
                            {"© 2026 Spencer Buys Houses"}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
