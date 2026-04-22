import { NextRequest, NextResponse } from "next/server"
import { verifyToken, JWTPayload } from "@/lib/jwt"

/**
 * Extracts and verifies the Bearer token from an incoming request.
 * Returns the decoded payload or throws a NextResponse with 401.
 *
 * Usage in a protected route:
 *
 *   export async function GET(req: NextRequest) {
 *     const auth = await requireApiAuth(req)
 *     if (auth instanceof NextResponse) return auth   // 401 short-circuit
 *     // auth is JWTPayload — use auth.sub, auth.email, etc.
 *   }
 */
export async function requireApiAuth(
    req: NextRequest
): Promise<JWTPayload | NextResponse> {
    const authHeader = req.headers.get("authorization") ?? ""
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null

    if (!token) {
        return NextResponse.json(
            { error: "Missing Authorization header" },
            { status: 401 }
        )
    }

    try {
        return await verifyToken(token)
    } catch {
        return NextResponse.json(
            { error: "Invalid or expired token" },
            { status: 401 }
        )
    }
}
