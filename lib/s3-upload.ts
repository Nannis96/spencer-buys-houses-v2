/**
 * Server-side S3 upload utilities for route handlers.
 *
 * Unlike `s3-actions.ts` (which issues presigned URLs for client-side uploads),
 * this module uploads file buffers directly from the server.
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';

// ─────────────────────────────────────────────────────────────
// Constants (exported so route handlers can reuse them for
// early validation before attempting an upload)
// ─────────────────────────────────────────────────────────────

/** Accepted image MIME types */
export const ALLOWED_IMAGE_TYPES = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
]);

/** Maximum upload size: 5 MB */
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

// ─────────────────────────────────────────────────────────────
// S3 client (lazy – only initialised when this module is used)
// ─────────────────────────────────────────────────────────────

function getS3Client(): S3Client {
    const missing = (
        ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION', 'AWS_BUCKET_NAME'] as const
    ).filter((k) => !process.env[k]);

    if (missing.length) {
        throw new Error(
            `Missing required environment variable(s): ${missing.join(', ')}`
        );
    }

    return new S3Client({
        region: process.env.AWS_REGION!,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    });
}

// ─────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────

const MIME_TO_EXTENSION: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
};

function sanitizeFolder(folder: string): string {
    return folder.replace(/[^a-zA-Z0-9-_]/g, '');
}

// ─────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────

export interface UploadResult {
    /** The public HTTPS URL of the uploaded object */
    publicUrl: string;
    /** The S3 object key (e.g. "blog/uuid.jpg") */
    key: string;
}

/**
 * Validates and uploads a `File` object directly to S3.
 *
 * Throws a descriptive `Error` for validation failures (type/size) and
 * re-throws S3 SDK errors for infrastructure failures so the caller can
 * distinguish between 400 and 500 responses.
 *
 * @param file   The `File` instance from the parsed FormData.
 * @param folder Optional S3 "folder" prefix (default: `"blog"`).
 */
export async function uploadImageToS3(
    file: File,
    folder = 'blog'
): Promise<UploadResult> {
    // ── Validate type ────────────────────────────────────────
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
        throw new Error(
            `Invalid file type "${file.type}". ` +
            `Allowed types: ${[...ALLOWED_IMAGE_TYPES].join(', ')}`
        );
    }

    // ── Validate size ────────────────────────────────────────
    if (file.size > MAX_IMAGE_SIZE) {
        throw new Error(
            `File too large (${(file.size / 1024 / 1024).toFixed(2)} MB). ` +
            `Maximum allowed size is 5 MB.`
        );
    }

    // ── Build S3 key ─────────────────────────────────────────
    const safeFolder = sanitizeFolder(folder);
    const extension = MIME_TO_EXTENSION[file.type] ?? 'jpg';
    const key = `${safeFolder}/${crypto.randomUUID()}.${extension}`;

    // ── Read file buffer ─────────────────────────────────────
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ── Upload ───────────────────────────────────────────────
    const s3 = getS3Client();

    await s3.send(
        new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key,
            Body: buffer,
            ContentType: file.type,
            ContentLength: file.size,
        })
    );

    const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return { publicUrl, key };
}
