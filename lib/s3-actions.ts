'use server';

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';

const requiredEnvVars = [
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_REGION',
  'AWS_BUCKET_NAME',
] as const;

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * Allowed MIME types
 */
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

/**
 * Max file size (5MB)
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Map MIME → extension
 */
const MIME_EXTENSION: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

/**
 * Sanitizes folder names to avoid path injection
 */
function sanitizeFolder(folder: string) {
  return folder.replace(/[^a-zA-Z0-9-_]/g, '');
}

/**
 * Generates a presigned URL for uploading a file to S3.
 */
export async function getPresignedUrl(
  fileType: string,
  fileSize: number,
  folder: string = 'blog'
) {
  if (!ALLOWED_TYPES.has(fileType)) {
    throw new Error('Invalid file type');
  }

  if (fileSize > MAX_FILE_SIZE) {
    throw new Error('File too large');
  }

  const safeFolder = sanitizeFolder(folder);

  const extension = MIME_EXTENSION[fileType] || 'jpg';

  const fileName = `${safeFolder}/${crypto.randomUUID()}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
  });

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 60,
  });

  const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

  return {
    signedUrl,
    publicUrl,
    key: fileName,
  };
}

/**
 * Deletes an object from S3 given its public URL or key.
 */
export async function deleteS3Object(urlOrKey: string) {
  if (!urlOrKey) return;

  try {
    let key = urlOrKey;

    if (urlOrKey.startsWith('http')) {
      const url = new URL(urlOrKey);
      key = url.pathname.startsWith('/')
        ? url.pathname.substring(1)
        : url.pathname;
    }

    /**
     * Extra protection: only allow deleting inside blog folder
     */
    if (!key.startsWith('blog/')) {
      throw new Error('Invalid key path');
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    });

    await s3.send(command);

    return { success: true };
  } catch (error) {
    console.error('Failed to delete S3 object:', error);

    return {
      success: false,
      error,
    };
  }
}
