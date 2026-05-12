import { PrismaClient } from "@/app/generated/prisma/client";
import { Role } from "@/app/generated/prisma/enums";
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
    // Usuario para el Bot 
    const userEmail = "botia@example.com";
    const userPassword = "7XW4tO6LcyL49!"; // Cambia esto por una contraseña segura
    const userHashed = await bcrypt.hash(userPassword, 10);

    const user = await prisma.user.upsert({
        where: { email: userEmail },
        update: {
            password: userHashed,
        },
        create: {
            email: userEmail,
            name: "BOT IA",
            password: userHashed,
            role: Role.USER,
        },
    });

    console.log({ user });
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

