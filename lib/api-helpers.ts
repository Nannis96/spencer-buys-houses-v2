/**
 * API helper utilities shared across route handlers.
 * No external dependencies – pure Node / Web API only.
 */

// ─────────────────────────────────────────────────────────────
// Auth
// ─────────────────────────────────────────────────────────────

/**
 * Validates a `Bearer <token>` Authorization header against
 * the `API_TOKEN` environment variable.
 *
 * Returns `true` when the token is present and matches.
 */
export async function validateBearerToken(
    authorizationHeader: string | null
): Promise<boolean> {
    const apiToken = process.env.API_TOKEN;

    if (!apiToken) {
        console.error('[api-helpers] API_TOKEN environment variable is not set');
        return false;
    }

    if (!authorizationHeader) return false;

    const parts = authorizationHeader.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') return false;

    const token = parts[1];

    // Constant-time comparison to prevent timing attacks
    return timingSafeEqual(token, apiToken);
}

/**
 * Constant-time string comparison.
 * Falls back to a simple equality check when TextEncoder is unavailable.
 */
function timingSafeEqual(a: string, b: string): boolean {
    const encoder = new TextEncoder();
    const bufA = encoder.encode(a);
    const bufB = encoder.encode(b);

    if (bufA.length !== bufB.length) {
        // Still iterate to avoid short-circuit timing leaks
        let diff = 0;
        for (let i = 0; i < Math.max(bufA.length, bufB.length); i++) {
            diff |= (bufA[i] ?? 0) ^ (bufB[i] ?? 0);
        }
        return false;
    }

    let diff = 0;
    for (let i = 0; i < bufA.length; i++) {
        diff |= bufA[i] ^ bufB[i];
    }
    return diff === 0;
}

// ─────────────────────────────────────────────────────────────
// Slug
// ─────────────────────────────────────────────────────────────

/**
 * Converts an arbitrary string into a URL-safe slug.
 *
 * Examples:
 *   slugify("Hello World!")   → "hello-world"
 *   slugify("  Foo  BAR  ")   → "foo-bar"
 *   slugify("Cañón del río")  → "canon-del-rio"
 */
export function slugify(input: string): string {
    return input
        .normalize('NFD')                       // decompose accented chars
        .replace(/[\u0300-\u036f]/g, '')        // strip diacritic marks
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')          // keep alphanumeric, spaces, hyphens
        .replace(/[\s]+/g, '-')                 // spaces → hyphens
        .replace(/-{2,}/g, '-')                 // collapse consecutive hyphens
        .replace(/^-+|-+$/g, '');              // strip leading/trailing hyphens
}

// ─────────────────────────────────────────────────────────────
// Response helpers
// ─────────────────────────────────────────────────────────────

/**
 * Returns a JSON error response with a consistent `{ error: message }` shape.
 */
export function jsonError(message: string, status: number): Response {
    return Response.json({ error: message }, { status });
}
