"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        try {
            const res: any = await signIn('credentials', {
                redirect: false,
                email,
                password,
            })

            // If there's an error, show message and stay on page
            if (res?.error) {
                setError('Invalid username or password.')
                return
            }

            // Successful sign in: navigate to dashboard
            router.push('/dashboard')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4 py-12">
            <div className="w-full max-w-md space-y-8">
                {/* Branding */}
                <div className="flex flex-col items-center">
                    <Link href="/">
                        <Image
                            src="/SpencerBuysHouses_yellow.png"
                            alt="Spencer Buys Houses"
                            width={220}
                            height={55}
                            priority
                            className="mb-8"
                        />
                    </Link>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-gray-400">
                        Sign in to your account
                    </p>
                </div>

                {/* Login Form Card */}
                <div className="bg-[#1a1a2e]/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-xl">
                    {error && (
                        <div role="alert" className="mb-4 text-sm text-red-300 bg-red-900/20 border border-red-600 p-3 rounded">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-300">
                                Email Address
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-[var(--color-primary)] hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-black font-bold py-6 text-lg transition-transform active:scale-[0.98]"
                        >
                            {isLoading ? "Signing in..." : "Login"}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm">
                        <span className="text-gray-400">Don't have an account?</span>{" "}
                        <Link href="/contact-us" className="text-[var(--color-primary)] hover:underline font-medium">
                            Contact support
                        </Link>
                    </div>
                </div>

                {/* Footer simple */}
                <p className="text-center text-xs text-gray-500 mt-8">
                    &copy; {new Date().getFullYear()} Spencer Buys Houses. All rights reserved.
                </p>
            </div>
        </main>
    )
}