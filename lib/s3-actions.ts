'use server';

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';

// Validate required environment variables at module load time (server-side only).
// This surfaces missing config immediately instead of failing silently at runtime.
const requiredEnvVars = [
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_REGION',
  'AWS_BUCKET_NAME',
] as const;

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}. Check your .env file.`);
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
 * Generates a presigned URL for uploading a file to S3.
 */
export async function getPresignedUrl(fileType: string, folder: string = 'blog') {
  const fileExtension = fileType.split('/')[1] || 'jpg';
  const fileName = `${folder}/${crypto.randomUUID()}.${fileExtension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
  const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;

  return { signedUrl, publicUrl };
}

/**
 * Deletes an object from S3 given its public URL or key.
 */
export async function deleteS3Object(urlOrKey: string) {
  if (!urlOrKey) return;

  try {
    let key = urlOrKey;
    
    // If it's a full URL, extract the key
    if (urlOrKey.startsWith('http')) {
      const url = new URL(urlOrKey);
      // Remove leading slash if present
      key = url.pathname.startsWith('/') ? url.pathname.substring(1) : url.pathname;
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    });

    await s3.send(command);
    return { success: true };
  } catch (error) {
    console.error('Failed to delete S3 object:', error);
    return { success: false, error };
  }
}
