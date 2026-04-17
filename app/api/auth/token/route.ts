import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { signToken } from "@/lib/jwt"

const BodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const parsed = BodySchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid request body", details: parsed.error.flatten() },
                { status: 400 }
            )
        }

        const { email, password } = parsed.data

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        const valid = await bcrypt.compare(password, user.password)

        if (!valid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        const token = await signToken({
            sub: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        })

        return NextResponse.json({ token }, { status: 200 })
    } catch (error: any) {
        console.error("[POST /api/auth/token]", error)

        // If the body isn't valid JSON, respond with 400 so clients (Postman) see a clear error
        if (error instanceof SyntaxError || /JSON/.test(String(error?.message ?? ""))) {
            return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
        }

        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
