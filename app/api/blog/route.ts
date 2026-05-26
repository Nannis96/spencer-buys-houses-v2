import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { slugify, jsonError } from '@/lib/api-helpers';
import { verifyToken } from '@/lib/jwt';
import { uploadImageToS3, ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/lib/s3-upload';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

const VALID_STATUSES = ['draft', 'published'] as const;
type PostStatus = (typeof VALID_STATUSES)[number];

interface ParsedPostData {
    title: string;
    slug: string;
    content: string;
    metaTitle: string;
    metaDescription: string;
    category: string;
    status: PostStatus;
    featuredImage?: File | null;
}

interface PostCreateData {
    title: string;
    slug: string;
    content: string;
    seoTitle: string;
    seoDesc: string;
    category: string;
    status: PostStatus;
    mainImage?: string;
}

// ─────────────────────────────────────────────────────────────
// GET /api/blog
// ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest): Promise<Response> {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '10', 10)));

    try {
        const where = {
            ...(status && VALID_STATUSES.includes(status as PostStatus) && { status }),
            ...(category && { category }),
        };

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where,
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    category: true,
                    status: true,
                    mainImage: true,
                    seoTitle: true,
                    seoDesc: true,
                    createdAt: true,
                },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.post.count({ where }),
        ]);

        return Response.json({
            success: true,
            data: posts,
            pagination: { total, page, limit, pages: Math.ceil(total / limit) },
        });
    } catch (err) {
        console.error('[GET /api/blog] Database error:', err);
        return jsonError('Internal server error', 500);
    }
}

// ─────────────────────────────────────────────────────────────
// POST /api/blog
// ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<Response> {
    // ── 1. Auth ───────────────────────────────────────────────
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return jsonError('Unauthorized', 401);
    const tokenRecord = await prisma.apiToken.findFirst({
        where: { token, revoked: false, expiresAt: { gt: new Date() } },
    });
    if (!tokenRecord) return jsonError('Unauthorized', 401);

    // ── 2. Parse multipart/form-data ─────────────────────────
    let formData: FormData;
    try {
        formData = await req.formData();
    } catch {
        return jsonError('Request must be multipart/form-data', 400);
    }

    // ── 3. Validate & extract fields ─────────────────────────
    const validationResult = validateFields(formData);
    if (!validationResult.ok) {
        return jsonError(validationResult.error, 400);
    }
    const data = validationResult.data;

    // ── 4. Ensure slug uniqueness ─────────────────────────────
    const uniqueSlug = await resolveUniqueSlug(data.slug);

    // ── 5. Upload image to S3 (optional) ────────────────────────
    let imageUrl: string | null = null;
    if (data.featuredImage) {
        try {
            const { publicUrl } = await uploadImageToS3(data.featuredImage, 'blog');
            imageUrl = publicUrl;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Image upload failed';
            // Distinguish validation errors (400) from infrastructure errors (500)
            const isValidationError =
                message.startsWith('Invalid file type') ||
                message.startsWith('File too large');
            return jsonError(message, isValidationError ? 400 : 500);
        }
    }

    // ── 6. Persist to database ────────────────────────────────
    let post: { id: string; slug: string };
    try {
        const createData: PostCreateData = {
            title: data.title,
            slug: uniqueSlug,
            content: data.content,
            seoTitle: data.metaTitle,
            seoDesc: data.metaDescription,
            category: data.category,
            status: data.status,
            ...(imageUrl && { mainImage: imageUrl }),
        };

        post = await prisma.post.create({
            data: createData,
            select: { id: true, slug: true },
        });
    } catch (err) {
        console.error('[POST /api/blog] Database error:', err);
        return jsonError('Internal server error', 500);
    }

    // ── 7. Respond ────────────────────────────────────────────
    return Response.json(
        { success: true, id: post.id, url: `/blog/${post.slug}` },
        { status: 201 }
    );
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

type ValidationResult =
    | { ok: true; data: ParsedPostData }
    | { ok: false; error: string };

function validateFields(form: FormData): ValidationResult {
    // Required string fields
    const title = getString(form, 'title');
    const content = getString(form, 'content');
    const metaTitle = getString(form, 'metaTitle');
    const metaDescription = getString(form, 'metaDescription');
    const category = getString(form, 'category');
    const rawStatus = getString(form, 'status');

    if (!title) return { ok: false, error: 'Field "title" is required' };
    if (!content) return { ok: false, error: 'Field "content" is required' };
    if (!metaTitle) return { ok: false, error: 'Field "metaTitle" is required' };
    if (!metaDescription) return { ok: false, error: 'Field "metaDescription" is required' };
    if (!category) return { ok: false, error: 'Field "category" is required' };
    if (!rawStatus) return { ok: false, error: 'Field "status" is required' };

    // Status enum
    if (!VALID_STATUSES.includes(rawStatus as PostStatus)) {
        return {
            ok: false,
            error: `Invalid status "${rawStatus}". Allowed values: ${VALID_STATUSES.join(', ')}`,
        };
    }

    // Slug (optional – derived from title when absent)
    const rawSlug = getString(form, 'slug');
    const baseSlug = rawSlug ? slugify(rawSlug) : slugify(title);
    if (!baseSlug) {
        return { ok: false, error: 'Could not generate a valid slug from the provided title' };
    }

    // Featured image (optional)
    const imageEntry = form.get('featuredImage');
    let parsedFile: File | null = null;
    if (imageEntry instanceof File && imageEntry.size > 0) {
        if (!ALLOWED_IMAGE_TYPES.has(imageEntry.type)) {
            return {
                ok: false,
                error: `Invalid image type "${imageEntry.type}". Allowed: ${[...ALLOWED_IMAGE_TYPES].join(', ')}`,
            };
        }
        if (imageEntry.size > MAX_IMAGE_SIZE) {
            return {
                ok: false,
                error: `Image too large (${(imageEntry.size / 1024 / 1024).toFixed(2)} MB). Maximum: 5 MB`,
            };
        }
        parsedFile = imageEntry;
    } else if (imageEntry !== null && !(imageEntry instanceof File)) {
        return { ok: false, error: '"featuredImage" must be a file upload' };
    }

    return {
        ok: true,
        data: {
            title,
            slug: baseSlug,
            content,
            metaTitle,
            metaDescription,
            category,
            status: rawStatus as PostStatus,
            featuredImage: parsedFile,
        },
    };
}

/** Safely reads a trimmed string from FormData (returns '' when absent or File). */
function getString(form: FormData, key: string): string {
    const value = form.get(key);
    return typeof value === 'string' ? value.trim() : '';
}

/**
 * Returns `baseSlug` if it is not yet taken, otherwise appends an incrementing
 * numeric suffix until a free slug is found.
 */
async function resolveUniqueSlug(baseSlug: string): Promise<string> {
    const exists = await prisma.post.findUnique({ where: { slug: baseSlug } });
    if (!exists) return baseSlug;

    let suffix = 1;
    let slug: string;
    do {
        slug = `${baseSlug}-${suffix}`;
        suffix += 1;
    } while (await prisma.post.findUnique({ where: { slug } }));

    return slug;
}
