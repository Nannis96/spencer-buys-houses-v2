import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import DOMPurify from 'isomorphic-dompurify';

// Pages are cached and revalidated every hour (ISR)
export const revalidate = 3600;

// ── SEO Metadata ───────────────────────────────────────────────────────────────
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) {
    return { title: 'Post Not Found | Spencer Buys Houses' };
  }

  return {
    title: `${post.seoTitle || post.title} | Spencer Buys Houses`,
    description: post.seoDesc || undefined,
    keywords: post.focusKeyword || undefined,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDesc || undefined,
      images: post.mainImage ? [{ url: post.mainImage }] : [],
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
    },
  };
}

// ── Page Component ─────────────────────────────────────────────────────────────
export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) notFound();

  // Sanitize HTML content for safe rendering
  const sanitizedContent = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'a', 'p',
      'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'br', 'img', 'blockquote', 'code', 'pre', 'hr', 'span', 'div',
    ],
    ALLOWED_ATTR: ['href', 'target', 'src', 'alt', 'class', 'width', 'height', 'rel'],
    ADD_ATTR: ['target'],
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-gray-200 font-sans"
      style={{ paddingTop: 'calc(var(--app-header-height) / 3)' }}>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest mb-10">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-[#f8ed1a] truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* ── Title ── */}
        <h1 className="text-3xl md:text-5xl font-black text-white uppercase leading-tight tracking-tight mb-6">
          {post.title}
        </h1>

        {/* ── Meta Row ── */}
        <div className="flex items-center gap-4 mb-10 pb-8 border-b border-[var(--color-primary)]/60">
          {post.authorImage && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#529e14] flex-shrink-0">
              <Image src={post.authorImage} alt={post.authorName || 'Author'} fill sizes="40px" className="object-cover" />
            </div>
          )}
          <div>
            {post.authorName && (
              <p className="text-sm font-black text-white uppercase">
                {post.authorName}
              </p>
            )}
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* ── Cover Image ── */}
        {post.mainImage && (
          <div className="relative w-full h-64 md:h-[420px] rounded-2xl overflow-hidden mb-12 shadow-2xl border border-gray-800">
            <Image
              src={post.mainImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 85vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* ── Body Content ── */}
        <div
          className="
            prose prose-invert prose-lg max-w-none
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
            prose-h2:text-[#f8ed1a] prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-white prose-h3:mt-8 prose-h3:mb-3
            prose-a:text-[#529e14] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:marker:text-[#529e14]
            prose-blockquote:border-l-[#529e14] prose-blockquote:bg-[#242424] prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
            prose-code:bg-[#242424] prose-code:text-[#f8ed1a] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-[#242424] prose-pre:border prose-pre:border-gray-800
            prose-hr:border-gray-800
            prose-img:rounded-xl prose-img:border prose-img:border-gray-800
          "
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        {/* ── Author Bio Section ── */}
        {(post.authorName || post.authorBio) && (
          <div className="mt-16 p-6 rounded-2xl bg-[#242424] border border-gray-800 flex items-start gap-5">
            {post.authorImage && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#529e14] flex-shrink-0">
                <Image src={post.authorImage} alt={post.authorName || 'Author'} fill sizes="64px" className="object-cover" />
              </div>
            )}
            <div>
              <p className="text-[10px] font-black text-[#529e14] uppercase tracking-widest mb-1">
                About the Author
              </p>
              {post.authorName && (
                <h3 className="text-white font-black uppercase text-lg mb-2">
                  {post.authorName}
                </h3>
              )}
              {post.authorBio && (
                <p className="text-gray-400 text-sm leading-relaxed">{post.authorBio}</p>
              )}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/20 bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary)]/80 font-semibold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            ← Back to All Articles
          </Link>
        </div>
      </main>
    </div>
  );
}
