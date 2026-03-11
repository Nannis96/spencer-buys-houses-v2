import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { SignOutButton } from "@/components/dashboard/SignOutButton"
import { User, Settings, LayoutDashboard, Home, ChevronRight } from "lucide-react"
import Link from "next/link"

export default async function Dashboard() {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)] text-white pt-24 pb-12">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                            <Home className="h-4 w-4" />
                            <ChevronRight className="h-3 w-3" />
                            <span className="text-[var(--color-primary)]">Dashboard</span>
                        </div>
                        <h1 className="text-3xl font-bold">Welcome back, {session.user?.name || "User"}!</h1>
                        <p className="text-gray-400 mt-1">{session.user?.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <SignOutButton />
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar/Quick Links */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <LayoutDashboard className="h-5 w-5 text-[var(--color-primary)]" />
                                Navigation
                            </h2>
                            <nav className="space-y-2">
                                <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium transition-colors">
                                    <LayoutDashboard className="h-5 w-5" />
                                    Overview
                                </Link>
                                <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                                    <User className="h-5 w-5" />
                                    Profile Settings
                                </Link>
                                <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                                    <Settings className="h-5 w-5" />
                                    Account Settings
                                </Link>
                            </nav>
                        </div>

                        <div className="bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent border border-[var(--color-primary)]/20 rounded-2xl p-6">
                            <h3 className="font-bold text-[var(--color-primary)] mb-2">Need Help?</h3>
                            <p className="text-sm text-gray-300 mb-4">If you have any questions about your account or our services, don't hesitate to contact us.</p>
                            <Link href="/contact-us" className="text-sm font-bold underline decoration-[var(--color-primary)] underline-offset-4">
                                Contact Support
                            </Link>
                        </div>
                    </div>

                    {/* Dashboard Overview */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer group">
                                <div className="text-gray-400 text-sm mb-1 font-medium">Account Status</div>
                                <div className="text-2xl font-bold text-[var(--color-green)]">Active</div>
                                <div className="mt-4 text-xs text-gray-500 group-hover:text-gray-400">View details →</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer group">
                                <div className="text-gray-400 text-sm mb-1 font-medium">Last Login</div>
                                <div className="text-2xl font-bold">Today</div>
                                <div className="mt-4 text-xs text-gray-500 group-hover:text-gray-400">Security log →</div>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                            <div className="w-16 h-16 bg-[var(--color-background)] rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                                <LayoutDashboard className="h-8 w-8 text-gray-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Your Activity Feed is Empty</h3>
                            <p className="text-gray-400 max-w-md mx-auto">
                                Once you start interacting with the platform, your latest updates and notifications will appear here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}