const { PrismaClient } = require("@prisma/client")
const crypto = require("crypto")

const prisma = new PrismaClient()
const TOKEN_BYTES = 48
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000

function genToken() {
    return crypto.randomBytes(TOKEN_BYTES).toString("hex")
}

async function main() {
    const now = new Date()
    // Find tokens that are expired or will expire within 24h
    const threshold = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    const expiring = await prisma.apiToken.findMany({
        where: {
            revoked: false,
            expiresAt: { lte: threshold },
        },
    })

    console.log(`Found ${expiring.length} tokens to rotate`)

    const groupedByUser = new Map()
    for (const t of expiring) {
        groupedByUser.set(t.userId, true)
    }

    for (const userId of groupedByUser.keys()) {
        // Revoke previous tokens
        await prisma.apiToken.updateMany({ where: { userId, revoked: false }, data: { revoked: true } })

        const tokenValue = genToken()
        const expiresAt = new Date(Date.now() + TOKEN_TTL_MS)

        await prisma.apiToken.create({ data: { userId, token: tokenValue, expiresAt } })
        console.log(`Rotated token for user ${userId}`)
    }

    await prisma.$disconnect()
}

main()
    .then(() => console.log("Done"))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
