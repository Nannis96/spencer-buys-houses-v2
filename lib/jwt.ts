import { SignJWT, jwtVerify } from "jose"

const secretString =
    (process.env.API_JWT_SECRET && process.env.API_JWT_SECRET.trim()) ||
    (process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_SECRET.trim()) ||
    "change-me-in-production"

const SECRET = new TextEncoder().encode(secretString)

const ALGORITHM = "HS256"
const EXPIRATION = "7d"

export interface JWTPayload {
    sub: string
    email: string
    name?: string | null
    role?: string
}

export async function signToken(payload: JWTPayload): Promise<string> {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: ALGORITHM })
        .setIssuedAt()
        .setExpirationTime(EXPIRATION)
        .sign(SECRET)
}

export async function verifyToken(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, SECRET, {
        algorithms: [ALGORITHM],
    })

    return payload as unknown as JWTPayload
}
