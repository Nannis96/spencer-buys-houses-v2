"use client"

import { LayoutDashboard, FileText, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/blog", label: "Blog", icon: FileText },
    { href: "/dashboard/token", label: "Token", icon: User },
]

export function DashboardSidebar() {
    const pathname = usePathname()

    return (
        <div className="bg-white/5 border border-[var(--color-primary)]/60 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-[var(--color-primary)]" />
                Navigation
            </h2>
            <nav className="space-y-2">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive
                                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <Icon className="h-5 w-5" />
                            {label}
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
