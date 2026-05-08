import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
    adapter,
});

async function main() {
    const email = "kanikakanusharma6@gmail.com";
    const password = "8R0qJ?6hsNM6";
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: "Kanika Sharma",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    // Segundo usuario de ejemplo
    const userEmail = "homebuyers901@gmail.com";
    const userPassword = "46q1hj0G5DmU";
    const userHashed = await bcrypt.hash(userPassword, 10);

    const user = await prisma.user.upsert({
        where: { email: userEmail },
        update: {},
        create: {
            email: userEmail,
            name: "Spencer Shadrach",
            password: userHashed,
            role: "USER",
        },
    });

    console.log({ admin, user });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

