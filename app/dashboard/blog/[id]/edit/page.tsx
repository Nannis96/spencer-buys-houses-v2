import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import EditPostForm from '../../_components/edit-post-form';

export default async function EditPostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    notFound();
  }

  return (
    <div className="font-sans text-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-10 border-b border-gray-800 pb-6">
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
              <Link href="/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              <span>/</span>
              <Link href="/dashboard/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-[#f8ed1a]">Edit</span>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              Edit Blog Post
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Modifying:{' '}
              <span className="text-[#f8ed1a] font-bold">{post.title}</span>
            </p>
          </div>
          <Link
            href="/dashboard/blog"
            className="inline-flex items-center rounded-lg bg-white/5 border border-gray-600 px-4 py-2 text-sm font-bold text-gray-300 shadow-sm hover:bg-white/10 hover:text-white transition-colors"
          >
            ← Back to List
          </Link>
        </div>

        {/* ── Form ── */}
        <div className="relative">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#f8ed1a] opacity-5 rounded-full blur-3xl pointer-events-none" />
          <EditPostForm post={post} />
        </div>

      </div>
    </div>
  );
}
