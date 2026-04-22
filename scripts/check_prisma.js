const { PrismaClient } = require("../app/generated/prisma/client")

async function main() {
    const prisma = new PrismaClient()
    console.log('has apiToken property:', Object.prototype.hasOwnProperty.call(prisma, 'apiToken'))
    console.log('typeof prisma.apiToken:', typeof prisma.apiToken)
    await prisma.$disconnect()
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})
