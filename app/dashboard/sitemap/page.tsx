import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getAllCitySlugs } from '@/lib/cities';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { SitemapRevalidateButton } from '@/components/dashboard/SitemapRevalidateButton';
import { Globe, FileText, Wrench, MapPin, Info } from 'lucide-react';

const BASE_URL = 'https://www.spencerbuyshouses.com';
const STATIC_PAGES = 11; // matches sitemap.ts staticRoutes count

export default async function SitemapPage() {
    const [publishedPosts, publishedServices] = await Promise.all([
        prisma.post.count(),
        prisma.service.count({ where: { status: 'published' } }),
    ]);

    const cityCount = getAllCitySlugs().length;
    const totalEntries = STATIC_PAGES + publishedPosts + publishedServices + cityCount;

    const stats = [
        { label: 'Static pages', value: STATIC_PAGES, icon: Globe, color: 'text-blue-400' },
        { label: 'Blog posts', value: publishedPosts, icon: FileText, color: 'text-green-400' },
        { label: 'Services', value: publishedServices, icon: Wrench, color: 'text-yellow-400' },
        { label: 'City pages', value: cityCount, icon: MapPin, color: 'text-purple-400' },
    ];

    return (
        <div className="mx-auto max-w-7xl px-4 lg:px-10">

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 border-b border-[var(--color-primary)]/60 pb-8">
                <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                        <span>/</span>
                        <span className="text-[var(--color-text-yellow)]">Sitemap</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">
                        Sitemap
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {totalEntries} total entries · auto-revalidates every hour
                    </p>
                </div>
                <a
                    href={`${BASE_URL}/sitemap.xml`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white underline underline-offset-4 transition-colors"
                >
                    View sitemap.xml ↗
                </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <DashboardSidebar />
                </div>

                {/* Main */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {stats.map(({ label, value, icon: Icon, color }) => (
                            <div
                                key={label}
                                className="bg-white/5 border border-gray-800 rounded-2xl p-5 flex flex-col gap-2 hover:border-[var(--color-primary)]/40 transition-colors"
                            >
                                <Icon className={`h-5 w-5 ${color}`} />
                                <span className="text-2xl font-black text-white">{value}</span>
                                <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Regenerate card */}
                    <div className="bg-white/5 border border-gray-800 rounded-2xl p-8 hover:border-[var(--color-primary)]/60 transition-colors space-y-6">
                        <div>
                            <h2 className="text-xl font-bold mb-1">Manual Regeneration</h2>
                            <p className="text-gray-400 text-sm">
                                Forces Next.js to rebuild <code className="text-gray-300 bg-white/10 px-1 rounded">/sitemap.xml</code> on the next request,
                                pulling the latest published posts and services from the database.
                            </p>
                        </div>

                        <SitemapRevalidateButton />

                        {/* Info note */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-white/3 border border-gray-800 text-xs text-gray-500">
                            <Info className="h-4 w-4 shrink-0 mt-0.5 text-gray-600" />
                            <p>
                                The sitemap is automatically revalidated every <strong className="text-gray-400">hour</strong> via ISR.
                                Use this button after publishing new content to update it immediately without waiting.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
