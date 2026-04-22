import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { signToken } from "@/lib/jwt"
import TokenManager from "./TokenManager"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import Link from 'next/link';

export default async function TokenPage() {
    const session = await auth()

    if (!session?.user) {
        return <div className="p-8">Please sign in to access this page.</div>
    }

    // Use the fixed user email instead of the logged-in user
    const targetEmail = "user@example.com"
    const targetUser = await prisma.user.findUnique({ where: { email: targetEmail } })

    if (!targetUser) {
        return <div className="p-8">No user found for {targetEmail}.</div>
    }

    const userId = targetUser.id

    const now = new Date()
    let tokenRecord: { token: string; expiresAt: Date } | null = null

    const hasDelegate = typeof (prisma as any).apiToken?.findFirst === "function"

    if (hasDelegate) {
        tokenRecord = await (prisma as any).apiToken.findFirst({
            where: { userId, revoked: false, expiresAt: { gt: now } },
            orderBy: { createdAt: "desc" },
        })
    } else {
        const rows = await prisma.$queryRaw<{ token: string; expiresAt: string }[]>`
            SELECT "token", "expiresAt" FROM "ApiToken"
            WHERE "userId" = ${userId} AND "revoked" = false AND "expiresAt" > ${now}
            ORDER BY "createdAt" DESC LIMIT 1
        `
        if (rows && rows.length > 0) {
            tokenRecord = { token: rows[0].token, expiresAt: new Date(rows[0].expiresAt) }
        }
    }

    // Create an auth JWT for the current user so client-side fetches can call the API endpoints.
    const apiAuthToken = await signToken({
        sub: targetUser.id,
        email: targetUser.email!,
        name: targetUser.name ?? undefined,
        role: (targetUser as any).role,
    })

    return (
        <div className="mx-auto max-w-7xl px-4 lg:px-10 py-8">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 border-b border-[var(--color-primary)]/60 pb-8">
                <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
                        <Link href="/dashboard" className="hover:text-white transition-colors">
                            Dashboard
                        </Link>
                        <span>/</span>
                        <span className="text-[#f8ed1a]">Token</span>
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Token</h1>
                    <p className="text-gray-400 mb-6">Manage your API token for external integrations ({targetEmail}).</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <DashboardSidebar />
                </div>

                <div className="lg:col-span-2">
                    <div className="mt-0">
                        <TokenManager
                            initialToken={tokenRecord?.token ?? null}
                            initialExpiresAt={tokenRecord?.expiresAt?.toISOString() ?? null}
                            apiAuthToken={apiAuthToken}
                            userEmail={targetEmail}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
