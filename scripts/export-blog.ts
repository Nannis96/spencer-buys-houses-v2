import 'dotenv/config'
import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import fs from 'fs'
import path from 'path'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {

    const posts = await prisma.post.findMany({
        include: {
            postImages: true
        }
    })

    fs.writeFileSync(
        path.join(process.cwd(), "tmp/blog-export.json"),
        JSON.stringify(posts, null, 2)
    )

    console.log(`Se exportaron ${posts.length} posts`)
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect()
    })