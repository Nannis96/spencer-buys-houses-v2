import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { buildBreadcrumbList, SITE_URL } from '@/lib/schema';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog & News | Spencer Buys Houses',
  description:
    'Latest articles, tips and news about selling your house fast in Central Alabama.',
};

const breadcrumbSchema = buildBreadcrumbList([
  { name: 'Home', item: `${SITE_URL}/` },
  { name: 'Blog', item: `${SITE_URL}/blog/` },
]);

export default async function BlogIndexPage() {
  // During Docker build the DB is not yet available — return empty list.
  // ISR (revalidate = 3600) will re-render with real data on the first request.
  let posts: Awaited<ReturnType<typeof prisma.post.findMany>> = [];
  try {
    posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  } catch {
    // DB unreachable at build time — handled by ISR at runtime
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div
        className="min-h-screen bg-[var(--color-background)] text-white font-sans"
        style={{ paddingTop: 'calc(var(--app-header-height) / 3)' }}
      >
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* ── Page Header ── */}
          <div className="text-center mb-16">
            <p className="text-[#529e14] font-black uppercase text-sm tracking-widest mb-3">
              Knowledge Base
            </p>
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase leading-none tracking-tight">
              Blog &{' '}
              <span className="text-[#f8ed1a]">News</span>
            </h1>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto text-lg">
              Tips, guides and market insights to help you sell your house fast.
            </p>
          </div>

          {/* ── Post Grid ── */}
          {posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-gray-800 bg-[#242424] hover:border-[#f8ed1a]/60 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[#f8ed1a]/5"
                >
                  {/* Thumbnail */}
                  <div className="relative h-52 w-full overflow-hidden bg-gray-900">
                    {post.mainImage ? (
                      <Image
                        src={post.mainImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">
                        📰
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#242424] via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <h2 className="text-lg font-black text-white uppercase leading-snug tracking-tight group-hover:text-[#f8ed1a] transition-colors mb-3">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
                      {post.seoDesc || post.content.replace(/<[^>]+>/g, '').substring(0, 120) + '…'}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[#529e14] font-black text-xs uppercase tracking-wider group-hover:gap-4 transition-all">
                      Read Article <span>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 border-2 border-dashed border-gray-800 rounded-2xl">
              <div className="text-5xl mb-4 opacity-20">📭</div>
              <p className="text-gray-500 font-bold uppercase tracking-widest">
                No articles yet. Check back soon!
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
