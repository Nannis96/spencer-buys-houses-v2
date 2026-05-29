import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { citiesData } from '@/lib/cities';

const BASE_URL = 'https://www.spencerbuyshouses.com';

// Refresh cached response every hour (consistent with sitemap & ISR pages)
export const revalidate = 3600;

export async function GET() {
    // ── Dynamic content from DB ───────────────────────────────────────────────
    let blogPosts: { title: string; slug: string }[] = [];
    let services: { title: string; slug: string }[] = [];

    try {
        const posts = await prisma.post.findMany({
            select: { title: true, slug: true },
            orderBy: { updatedAt: 'desc' },
        });
        blogPosts = posts;

        const svcs = await prisma.service.findMany({
            where: { status: 'published' },
            select: { title: true, slug: true },
            orderBy: { updatedAt: 'desc' },
        });
        services = svcs;
    } catch {
        // DB unavailable — proceed with static content only
    }

    // ── Build llms.txt content ────────────────────────────────────────────────
    const lines: string[] = [
        '# Spencer Buys Houses',
        '',
        '> Spencer Buys Houses is a family-owned cash home buying company based in Memphis, TN.',
        '> Founded in 2014, we help homeowners sell their houses fast for cash — in any condition,',
        '> with no fees, no commissions, and no repairs needed. We close in as little as 7 days.',
        '> Over 500 homes purchased. Phone: (901) 621-8799.',
        '',

        '## Main Pages',
        '',
        `- [Home](${BASE_URL}/): Sell your Memphis house fast for cash. Get a free, no-obligation cash offer within 24 hours.`,
        `- [About Us](${BASE_URL}/about/): Learn about Spencer Buys Houses — Memphis's trusted local cash home buyer with over 10 years of experience and 500+ homes purchased.`,
        `- [How It Works](${BASE_URL}/how-it-works/): Our simple 4-step process — request an offer online, get a cash offer within 24 hours, choose your closing date, and get paid.`,
        `- [Get a Cash Offer Today](${BASE_URL}/get-a-cash-offer-today/): Sell your Memphis house without an agent. We buy houses in any condition, as-is. No fees, no commissions.`,
        `- [Contact Us](${BASE_URL}/contact-us/): Reach us by phone at (901) 621-8799 or submit a form for a free, no-obligation cash offer.`,
        `- [Properties We've Bought](${BASE_URL}/properties-we-bought/): Browse 546+ homes we've purchased across Memphis, TN and surrounding areas over 10+ years.`,
        `- [Referral Program](${BASE_URL}/get-paid/): Earn cash by referring homeowners who want to sell their Memphis house fast. We pay when we close the deal.`,
        `- [Free Memphis Homeowners Guide](${BASE_URL}/free-guide/): Download our free straight-talk guide for Memphis homeowners looking to sell quickly and confidently.`,
        '',

        '## Services',
        '',
    ];

    if (services.length > 0) {
        for (const svc of services) {
            lines.push(`- [${svc.title}](${BASE_URL}/services/${svc.slug}/)`);
        }
    } else {
        lines.push(
            `- [Services](${BASE_URL}/services/): We buy houses in any situation — foreclosure, inherited property, divorce, fire damage, problem tenants, code violations, and more.`,
        );
    }

    lines.push(
        '',
        '## Blog',
        '',
        `- [Blog & News](${BASE_URL}/blog/): Tips, guides and market insights to help Memphis homeowners sell their house fast.`,
    );

    if (blogPosts.length > 0) {
        for (const post of blogPosts) {
            lines.push(`- [${post.title}](${BASE_URL}/blog/${post.slug}/)`);
        }
    }

    lines.push(
        '',
        '## Areas We Serve',
        '',
        'Spencer Buys Houses serves the greater Memphis, TN metropolitan area, including communities',
        'across West Tennessee and North Mississippi.',
        '',
    );

    for (const stateData of citiesData) {
        lines.push(`### ${stateData.state}`);
        lines.push('');
        for (const city of stateData.cities) {
            lines.push(
                `- [Sell My House Fast in ${city.name}](${BASE_URL}/we-serve/${stateData.stateSlug}/${city.slug}/): ${city.seoDescription}`,
            );
        }
        lines.push('');
    }

    lines.push(
        '## Resources',
        '',
        `- [Sitemap](${BASE_URL}/sitemap.xml): Complete index of all pages on SpencerBuysHouses.com.`,
        `- [Privacy Policy](${BASE_URL}/privacy/): How Spencer Buys Houses collects and uses your information.`,
        `- [Terms of Service](${BASE_URL}/terms/): Terms and conditions for using SpencerBuysHouses.com.`,
        '',
        '## Business Information',
        '',
        '- Business: Spencer Buys Houses (Volunteer Buyers GP)',
        '- Phone: (901) 621-8799',
        '- Location: Memphis, Tennessee, United States',
        '- Service Area: Memphis, TN and surrounding communities in Tennessee and Mississippi',
        '- Founded: 2014',
        '- Experience: 10+ years, 500+ homes purchased',
        '- Fees: No fees, no commissions, no repairs required',
        '- Closing: As fast as 7 days',
    );

    const content = lines.join('\n') + '\n';

    return new NextResponse(content, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
