'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@/app/generated/prisma/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { deleteS3Object } from './s3-actions';

// ─────────────────────────────────────────────
// CREATE POST
// ─────────────────────────────────────────────
export async function createPost(formData: FormData) {
  const rawTitle = formData.get('title') as string;
  const rawSlug = formData.get('slug') as string;

  const isExplicitSlug = Boolean(rawSlug?.trim());
  let slug: string;

  if (isExplicitSlug) {
    // User explicitly typed a slug — normalize it and reject if already taken
    slug = rawSlug.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) {
      throw new Error(`The slug "${slug}" is already in use. Please choose a different one.`);
    }
  } else {
    // Auto-generate from title, appending a numeric suffix until unique
    const baseSlug = rawTitle.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    slug = baseSlug;
    let suffix = 1;
    while (await prisma.post.findUnique({ where: { slug } })) {
      suffix += 1;
      slug = `${baseSlug}-${suffix}`;
    }
  }

  // Validate JSON-LD if provided
  const rawJsonLd = (formData.get('jsonLd') as string)?.trim() || null;
  if (rawJsonLd) {
    const scriptMatch = rawJsonLd.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
    if (scriptMatch) {
      try { JSON.parse(scriptMatch[1].trim()); }
      catch { throw new Error('Invalid JSON-LD: the JSON inside the <script> tag is not valid.'); }
    } else if (rawJsonLd.trimStart().startsWith('{') || rawJsonLd.trimStart().startsWith('[')) {
      try { JSON.parse(rawJsonLd); }
      catch { throw new Error('Invalid JSON-LD: the content is not valid JSON.'); }
    }
    // Pure HTML blocks (e.g. <div>) are allowed through without JSON validation
  }

  try {
    await prisma.post.create({
      data: {
        title: rawTitle,
        slug,
        content: formData.get('content') as string,
        mainImage: (formData.get('mainImage') as string) || null,

        // Author
        authorName: (formData.get('authorName') as string) || null,
        authorImage: (formData.get('authorImage') as string) || null,
        authorBio: (formData.get('authorBio') as string) || null,

        // SEO
        seoTitle: (formData.get('seoTitle') as string) || null,
        seoDesc: (formData.get('seoDesc') as string) || null,
        focusKeyword: (formData.get('focusKeyword') as string) || null,

        // Structured Data
        json_ld: rawJsonLd,

        // Video
        videoUrl: (formData.get('videoUrl') as string) || null,
        videoTitle: (formData.get('videoTitle') as string) || null,

        // Classification
        category: (formData.get('category') as string)?.trim() || 'general',
        tags: ((formData.get('tags') as string) || '')
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      },
    });
  } catch (err) {
    // P2002 = unique constraint violation — a concurrent request already created
    // a post with this slug (race condition between the loop check and the INSERT).
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new Error(
        'A post with this slug already exists. Please change the slug or title and try again.',
      );
    }
    throw err;
  }

  revalidatePath('/dashboard/blog');
  redirect('/dashboard/blog');
}

// ─────────────────────────────────────────────
// CHECK SLUG AVAILABILITY
// ─────────────────────────────────────────────
export async function checkSlugAvailable(raw: string): Promise<boolean> {
  const slug = raw.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  if (!slug) return true;
  const existing = await prisma.post.findUnique({ where: { slug }, select: { id: true } });
  return existing === null;
}

// ─────────────────────────────────────────────
// UPDATE POST
// ─────────────────────────────────────────────
export async function updatePost(formData: FormData) {
  const id = formData.get('id') as string;

  // Validate JSON-LD if provided
  const rawJsonLd = (formData.get('jsonLd') as string)?.trim() || null;
  if (rawJsonLd) {
    const scriptMatch = rawJsonLd.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
    if (scriptMatch) {
      try { JSON.parse(scriptMatch[1].trim()); }
      catch { throw new Error('Invalid JSON-LD: the JSON inside the <script> tag is not valid.'); }
    } else if (rawJsonLd.trimStart().startsWith('{') || rawJsonLd.trimStart().startsWith('[')) {
      try { JSON.parse(rawJsonLd); }
      catch { throw new Error('Invalid JSON-LD: the content is not valid JSON.'); }
    }
    // Pure HTML blocks (e.g. <div>) are allowed through without JSON validation
  }

  await prisma.post.update({
    where: { id },
    data: {
      title: formData.get('title') as string,
      slug: (formData.get('slug') as string).trim(),
      content: formData.get('content') as string,
      mainImage: (formData.get('mainImage') as string) || null,

      // Author
      authorName: (formData.get('authorName') as string) || null,
      authorImage: (formData.get('authorImage') as string) || null,
      authorBio: (formData.get('authorBio') as string) || null,

      // SEO
      seoTitle: (formData.get('seoTitle') as string) || null,
      seoDesc: (formData.get('seoDesc') as string) || null,
      focusKeyword: (formData.get('focusKeyword') as string) || null,

      // Structured Data
      json_ld: rawJsonLd,

      // Video
      videoUrl: (formData.get('videoUrl') as string) || null,
      videoTitle: (formData.get('videoTitle') as string) || null,

      // Classification
      category: (formData.get('category') as string)?.trim() || 'general',
      tags: ((formData.get('tags') as string) || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    },
  });

  revalidatePath('/dashboard/blog');
  revalidatePath(`/blog/${formData.get('slug')}`);
  redirect('/dashboard/blog');
}


// ─────────────────────────────────────────────
// DELETE POST
// ─────────────────────────────────────────────
export async function deletePost(formData: FormData) {
  const id = formData.get('id') as string;

  // 1. Fetch post to get image URLs
  const post = await prisma.post.findUnique({
    where: { id },
    include: { postImages: true },
  });

  if (post) {
    // 2. Delete main images from S3
    if (post.mainImage) await deleteS3Object(post.mainImage);
    if (post.authorImage) await deleteS3Object(post.authorImage);

    // 3. Delete inline images if any
    for (const img of post.postImages) {
      await deleteS3Object(img.url);
    }
  }

  // 4. Delete from Prisma (cascades to PostImage)
  await prisma.post.delete({ where: { id } });

  revalidatePath('/dashboard/blog');
  redirect('/dashboard/blog');
}
