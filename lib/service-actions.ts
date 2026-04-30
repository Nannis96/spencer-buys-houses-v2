'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { deleteS3Object } from './s3-actions';

// ─────────────────────────────────────────────
// CREATE SERVICE
// ─────────────────────────────────────────────
export async function createService(formData: FormData) {
    const rawTitle = formData.get('title') as string;
    const rawSlug = formData.get('slug') as string;

    // Auto-generate slug from title if not provided
    const baseSlug = rawSlug?.trim()
        ? rawSlug.trim().toLowerCase().replace(/\s+/g, '-')
        : rawTitle.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    // Ensure slug uniqueness by appending a numeric suffix when needed
    let slug = baseSlug;
    let suffix = 1;
    while (await prisma.service.findUnique({ where: { slug } })) {
        suffix += 1;
        slug = `${baseSlug}-${suffix}`;
    }

    await prisma.service.create({
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

            // Category
            category: (formData.get('category') as string) || 'Other',
            status: 'published',
        },
    });

    revalidatePath('/dashboard/services');
    redirect('/dashboard/services');
}
// ─────────────────────────────────────────────
export async function updateService(formData: FormData) {
    const id = formData.get('id') as string;
    const rawSlug = (formData.get('slug') as string).trim();

    // Ensure slug uniqueness, excluding the current service
    let slug = rawSlug;
    let suffix = 1;
    while (await prisma.service.findFirst({ where: { slug, NOT: { id } } })) {
        suffix += 1;
        slug = `${rawSlug}-${suffix}`;
    }

    await prisma.service.update({
        where: { id },
        data: {
            title: formData.get('title') as string,
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

            // Category
            category: (formData.get('category') as string) || 'Other',
            status: 'published',
        },
    });

    revalidatePath('/dashboard/services');
    redirect('/dashboard/services');
}

// ─────────────────────────────────────────────
// DELETE SERVICE
// ─────────────────────────────────────────────
export async function deleteService(formData: FormData) {
    const id = formData.get('id') as string;

    // 1. Fetch service to get image URLs
    const service = await prisma.service.findUnique({
        where: { id },
        include: { serviceImages: true },
    });

    if (service) {
        // 2. Delete main images from S3
        if (service.mainImage) await deleteS3Object(service.mainImage);
        if (service.authorImage) await deleteS3Object(service.authorImage);

        // 3. Delete inline images if any
        for (const img of service.serviceImages) {
            await deleteS3Object(img.url);
        }
    }

    // 4. Delete from Prisma (cascades to ServiceImage)
    await prisma.service.delete({ where: { id } });

    revalidatePath('/dashboard/services');
    redirect('/dashboard/services');
}
