import type { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { getAllCitySlugs } from '@/lib/cities';

const BASE_URL = 'https://www.spencerbuyshouses.com';

// Revalidate the sitemap every hour alongside ISR pages
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // ── Static pages ─────────────────────────────────────────────────────────
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
        { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/how-it-works`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/contact-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${BASE_URL}/get-a-cash-offer-today`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
        { url: `${BASE_URL}/get-paid`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${BASE_URL}/free-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${BASE_URL}/properties-we-bought`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },

        { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ];

    // ── Service pages from DB (published only) ────────────────────────────────
    // NOTE: blog posts are intentionally NOT listed here. They now live on the
    // separate WordPress site (blog.spencerbuyshouses.com) and are covered by its
    // own sitemap; the old /blog/{slug} URLs 301-redirect there (see next.config.ts).
    // DB may be unavailable at build time; fall back to empty arrays gracefully.
    let serviceRoutes: MetadataRoute.Sitemap = [];

    try {
        const services = await prisma.service.findMany({
            where: { status: 'published' },
            select: { slug: true, updatedAt: true },
            orderBy: { updatedAt: 'desc' },
        });

        serviceRoutes = services.map((service) => ({
            url: `${BASE_URL}/services/${service.slug}`,
            lastModified: service.updatedAt,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }));
    } catch {
        // Database not reachable at build time — sitemap will only include static routes.
    }

    // ── City landing pages (generated from static data in lib/cities.ts) ──────
    const cityRoutes: MetadataRoute.Sitemap = getAllCitySlugs().map(({ state, city }) => ({
        url: `${BASE_URL}/we-serve/${state}/${city}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [...staticRoutes, ...serviceRoutes, ...cityRoutes];
}
