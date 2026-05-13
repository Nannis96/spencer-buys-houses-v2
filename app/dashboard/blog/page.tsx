import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"

export default async function AdminBlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-10">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 border-b border-[var(--color-primary)]/60 pb-8">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-[#f8ed1a]">Blog</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">
            Blog Posts
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {posts.length} post{posts.length !== 1 ? 's' : ''} total
          </p>
        </div>

        {/* New Post Button */}
        <Link
          href="/dashboard/blog/new"
          className="bg-[#529e14] hover:bg-[#458510] text-white px-6 py-3 rounded-lg font-black uppercase tracking-wide shadow-lg hover:shadow-[#529e14]/40 transition-all flex items-center gap-2 hover:-translate-y-0.5 transform"
        >
          <span>+</span> New Post
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar/Quick Links */}
        <div className="lg:col-span-1 space-y-6">
          <DashboardSidebar />
        </div>

        {/* ── Post List ── */}
        <div className="lg:col-span-2 space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#222222] p-4 border border-gray-800 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-6 hover:border-[var(--color-primary)]/60 transition-colors shadow-md group"
            >
              <div className="flex items-center gap-5 w-full sm:w-auto">

                {/* Thumbnail */}
                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-800 bg-gray-900 group-hover:border-[#f8ed1a]/30 transition-colors">
                  {post.mainImage ? (
                    <Image
                      src={post.mainImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl grayscale opacity-50">
                      📰
                    </div>
                  )}
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:text-[#f8ed1a] transition-colors">
                    {post.title || 'Untitled Post'}
                  </h3>

                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <Link
                href={`/dashboard/blog/${post.id}/edit`}
                className="w-full sm:w-auto text-center text-[#f8ed1a] hover:text-[#1a1a1a] hover:bg-[#f8ed1a] font-black uppercase text-xs tracking-widest border border-[#f8ed1a]/30 hover:border-[#f8ed1a] px-6 py-3 rounded-lg transition-all"
              >
                Edit Post
              </Link>
            </div>
          ))}

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-24 border-2 border-dashed border-gray-800 rounded-xl bg-white/5">
              <div className="text-4xl mb-4 opacity-30">📭</div>
              <p className="text-gray-500 font-bold uppercase tracking-widest">
                No posts found
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Create your first blog post to see it here.
              </p>
              <Link
                href="/dashboard/blog/new"
                className="inline-block mt-6 bg-[#529e14] hover:bg-[#458510] text-white px-6 py-3 rounded-lg font-black uppercase tracking-wide transition-all"
              >
                + Create First Post
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
