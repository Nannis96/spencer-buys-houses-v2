import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireApiAuth } from "@/lib/api-auth"
import crypto from "crypto"

const TOKEN_BYTES = 48 // ~96 hex chars
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

function genToken() {
    return crypto.randomBytes(TOKEN_BYTES).toString("hex")
}

export async function GET(req: NextRequest) {
    const auth = await requireApiAuth(req)
    if (auth instanceof NextResponse) return auth

    try {
        const userId = auth.sub

        const now = new Date()

        // Prefer the generated Prisma client model delegate; if it's not available (client not regenerated), fall back to raw SQL.
        const hasDelegate = typeof (prisma as any).apiToken?.findFirst === "function"

        if (hasDelegate) {
            const token = await (prisma as any).apiToken.findFirst({
                where: { userId, revoked: false, expiresAt: { gt: now } },
                orderBy: { createdAt: "desc" },
            })

            if (!token) return NextResponse.json({ token: null }, { status: 200 })

            return NextResponse.json({ token: token.token, expiresAt: token.expiresAt }, { status: 200 })
        }

        // Raw SQL fallback
        const rows: Array<{ token: string; expiresAt: Date }> = await prisma.$queryRaw`
            SELECT "token", "expiresAt" FROM "ApiToken"
            WHERE "userId" = ${userId} AND "revoked" = false AND "expiresAt" > ${now}
            ORDER BY "createdAt" DESC LIMIT 1
        `

        if (!rows || rows.length === 0) return NextResponse.json({ token: null }, { status: 200 })

        return NextResponse.json({ token: rows[0].token, expiresAt: rows[0].expiresAt }, { status: 200 })
    } catch (err) {
        console.error("[GET /api/token]", err)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const auth = await requireApiAuth(req)
    if (auth instanceof NextResponse) return auth

    try {
        const userId = auth.sub
        const now = new Date()
        const expiresAt = new Date(now.getTime() + TOKEN_TTL_MS)

        const hasDelegate = typeof (prisma as any).apiToken?.updateMany === "function"

        if (hasDelegate) {
            await (prisma as any).apiToken.updateMany({ where: { userId, revoked: false }, data: { revoked: true } })

            const tokenValue = genToken()
            const record = await (prisma as any).apiToken.create({ data: { userId, token: tokenValue, expiresAt } })
            return NextResponse.json({ token: record.token, expiresAt: record.expiresAt }, { status: 201 })
        }

        // Raw SQL fallback: revoke and insert
        await prisma.$executeRaw`
            UPDATE "ApiToken" SET "revoked" = true WHERE "userId" = ${userId} AND "revoked" = false
        `

        const tokenValue = genToken()
        const id = crypto.randomUUID()
        await prisma.$executeRaw`
            INSERT INTO "ApiToken" ("id", "userId", "token", "expiresAt") VALUES (${id}, ${userId}, ${tokenValue}, ${expiresAt})
        `

        return NextResponse.json({ token: tokenValue, expiresAt }, { status: 201 })
    } catch (err) {
        console.error("[POST /api/token]", err)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
