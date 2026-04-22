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
    const email = "admin@example.com";
    const password = "password123"; // Cambia esto en producción
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: "Admin User",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    // Segundo usuario de ejemplo
    const userEmail = "user@example.com";
    const userPassword = "userpass123"; // Cambia esto en producción
    const userHashed = await bcrypt.hash(userPassword, 10);

    const user = await prisma.user.upsert({
        where: { email: userEmail },
        update: {},
        create: {
            email: userEmail,
            name: "Test User",
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

