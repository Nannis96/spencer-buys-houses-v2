import { Home, Phone, Mail, MapPin } from "lucide-react"

export function SiteFooter() {
    return (
        <footer className="bg-[#0a0a1a] text-white">
            <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <a href="#" className="flex items-center gap-2 font-bold text-xl mb-4">
                            <Home className="h-6 w-6" />
                            <span>CashHomeBuyers</span>
                        </a>
                        <p className="text-sm leading-relaxed text-gray-500">
                            We are a real estate solutions and investment firm that specializes in helping homeowners get rid of burdensome houses fast. We are investors and problem solvers who can buy your house fast with a fair all cash offer.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <nav className="flex flex-col gap-2">
                            {[
                                { label: "How It Works", href: "#how-it-works" },
                                // { label: "Why Choose Us", href: "#benefits" },
                                // { label: "Testimonials", href: "#testimonials" },
                                // { label: "FAQ", href: "#faq" },
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

                    {/* Areas Served */}
                    {/* <div>
                        <h4 className="font-semibold mb-4">Areas We Serve</h4>
                        <nav className="flex flex-col gap-2">
                            {["Houston, TX", "Dallas, TX", "San Antonio, TX", "Austin, TX"].map((city) => (
                                <span key={city} className="text-sm text-gray-500">
                                    {city}
                                </span>
                            ))}
                        </nav>
                    </div> */}

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4">Contact Us</h4>
                        <div className="flex flex-col gap-3">
                            <a
                                href="tel:+15551234567"
                                className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#f59e0b] transition-colors"
                            >
                                <Phone className="h-4 w-4 shrink-0" />
                                901-621-8799
                            </a>
                            {/* <a
                                href="mailto:info@cashhomebuyers.com"
                                className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#f59e0b] transition-colors"
                            >
                                <Mail className="h-4 w-4 shrink-0" />
                                info@cashhomebuyers.com
                            </a> */}
                            {/* <span className="flex items-center gap-2 text-sm text-gray-500">
                                <MapPin className="h-4 w-4 shrink-0" />
                                123 Main St, Houston, TX 77001
                            </span> */}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-500">
                            {"© 2026 Spencer Buys Houses - Powered by Carrot"}
                        </p>
                        {/* <div className="flex items-center gap-6">
                            <a href="#" className="text-sm text-gray-500 hover:text-[#f59e0b] transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-sm text-gray-500 hover:text-[#f59e0b] transition-colors">
                                Terms of Service
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
        </footer>
    )
}
