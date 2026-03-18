import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { SignOutButton } from "@/components/dashboard/SignOutButton"
import { User, Settings, LayoutDashboard, Home, ChevronRight, FileText } from "lucide-react"
import Link from "next/link"

export default async function Dashboard() {
    const session = await auth()

    // Fetch latest 3 posts
    const latestPosts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        take: 3,
    })

    return (
        <div className="mx-auto max-w-7xl px-4 lg:px-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 border-b border-[var(--color-primary)]/60 pb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <Home className="h-4 w-4" />
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-[var(--color-primary)]">Dashboard</span>
                    </div>
                    <h1 className="text-3xl font-bold">
                        Welcome back, {" "}
                        <span className="text-[var(--color-text-yellow)]">{session?.user?.name || "User"}!</span>
                    </h1>
                    <p className="text-gray-400 mt-1">{session?.user?.email}</p>
                </div>
                <div className="flex items-center gap-3">
                    <SignOutButton />
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar/Quick Links */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white/5 border border-[var(--color-primary)]/60 rounded-2xl p-6 backdrop-blur-sm">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <LayoutDashboard className="h-5 w-5 text-[var(--color-primary)]" />
                            Navigation
                        </h2>
                        <nav className="space-y-2">
                            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium transition-colors">
                                <LayoutDashboard className="h-5 w-5" />
                                Overview
                            </Link>
                            <Link href="/dashboard/blog" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                                <FileText className="h-5 w-5" />
                                Blog
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Dashboard Overview */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white/5 border border-gray-800 rounded-2xl p-8 hover:border-[var(--color-primary)]/60">
                        <h2 className="text-xl font-bold mb-4">Latest Posts</h2>

                        {latestPosts.length === 0 ? (
                            <div className="text-center p-8">
                                <div className="w-16 h-16 bg-[var(--color-background)] rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--color-primary)]/60">
                                    <LayoutDashboard className="h-8 w-8 text-gray-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Your Activity Feed is Empty</h3>
                                <p className="text-gray-400 max-w-md mx-auto">
                                    Once you start interacting with the platform, your latest updates and notifications will appear here.
                                </p>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {latestPosts.map((post) => (
                                    <li key={post.id} className="flex items-center justify-between p-4 rounded-lg bg-white/3 border border-gray-800 hover:border-[var(--color-primary)]/60 transition-colors shadow-md group">
                                        <div>
                                            <Link href={`/blog/${post.slug}`} className="text-sm font-semibold hover:underline">
                                                {post.title}
                                            </Link>
                                            <div className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</div>
                                        </div>
                                        {post.mainImage ? (
                                            <img src={post.mainImage} alt={post.title} className="w-16 h-10 object-cover rounded-md ml-4" />
                                        ) : null}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}