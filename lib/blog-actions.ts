'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { deleteS3Object } from './s3-actions';

// ─────────────────────────────────────────────
// CREATE POST
// ─────────────────────────────────────────────
export async function createPost(formData: FormData) {
  const rawTitle = formData.get('title') as string;
  const rawSlug = formData.get('slug') as string;

  // Auto-generate slug from title if not provided
  const slug = rawSlug?.trim()
    ? rawSlug.trim().toLowerCase().replace(/\s+/g, '-')
    : rawTitle.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  await prisma.post.create({
    data: {
      title:        rawTitle,
      slug,
      content:      formData.get('content') as string,
      isPublished:  formData.get('isPublished') === 'on',
      isCaseStudy:  formData.get('isCaseStudy') === 'on',
      mainImage:    (formData.get('mainImage') as string) || null,

      // Author
      authorName:  (formData.get('authorName') as string) || null,
      authorImage: (formData.get('authorImage') as string) || null,
      authorBio:   (formData.get('authorBio') as string) || null,

      // SEO
      seoTitle:     (formData.get('seoTitle') as string) || null,
      seoDesc:      (formData.get('seoDesc') as string) || null,
      focusKeyword: (formData.get('focusKeyword') as string) || null,
    },
  });

  revalidatePath('/dashboard/blog');
  redirect('/dashboard/blog');
}

// ─────────────────────────────────────────────
// UPDATE POST
// ─────────────────────────────────────────────
export async function updatePost(formData: FormData) {
  const id = formData.get('id') as string;

  await prisma.post.update({
    where: { id },
    data: {
      title:        formData.get('title') as string,
      slug:         (formData.get('slug') as string).trim(),
      content:      formData.get('content') as string,
      isPublished:  formData.get('isPublished') === 'on',
      isCaseStudy:  formData.get('isCaseStudy') === 'on',
      mainImage:    (formData.get('mainImage') as string) || null,

      // Author
      authorName:  (formData.get('authorName') as string) || null,
      authorImage: (formData.get('authorImage') as string) || null,
      authorBio:   (formData.get('authorBio') as string) || null,

      // SEO
      seoTitle:     (formData.get('seoTitle') as string) || null,
      seoDesc:      (formData.get('seoDesc') as string) || null,
      focusKeyword: (formData.get('focusKeyword') as string) || null,
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
