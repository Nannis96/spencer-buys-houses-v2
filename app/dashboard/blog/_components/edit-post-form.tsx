'use client';

import Link from 'next/link';
import { useState } from 'react';
import { updatePost } from '@/lib/blog-actions';
import DeletePostButton from './delete-post-button';
import ImageUpload, { ImageFile } from './image-upload';

interface PostData {
  id: string;
  slug: string;
  title: string;
  content: string;
  mainImage: string | null;
  authorName: string | null;
  authorImage: string | null;
  authorBio: string | null;
  seoTitle: string | null;
  seoDesc: string | null;
  focusKeyword: string | null;
}

// ── Accordion helper ──────────────────────────────────────────────────────────
function AccordionSection({
  title,
  icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-700 rounded-lg bg-gray-900/30 overflow-hidden mb-4 transition-all duration-200">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-lg">{icon}</span>}
          <h2 className="text-sm md:text-base font-black text-white uppercase tracking-wide">
            {title}
          </h2>
        </div>
        <span
          className={`transform transition-transform duration-200 text-[#f8ed1a] ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="p-6 border-t border-gray-700">{children}</div>
      )}
    </div>
  );
}

// ── Input / Textarea helpers ──────────────────────────────────────────────────
const fieldCls = 'w-full bg-gray-900 rounded p-3 text-white border border-gray-700 focus:border-[#f8ed1a] outline-none text-sm';
const labelCls = 'block text-xs font-bold text-gray-400 uppercase mb-1';
const accentLabelCls = 'block text-xs font-bold text-[#f8ed1a] uppercase mb-1';

// ── Main Component ─────────────────────────────────────────────────────────────
export default function EditPostForm({ post }: { post: PostData }) {
  const [mainImageFiles, setMainImageFiles] = useState<ImageFile[]>(
    post.mainImage ? [{ url: post.mainImage }] : []
  );
  const [authorImageFiles, setAuthorImageFiles] = useState<ImageFile[]>(
    post.authorImage ? [{ url: post.authorImage }] : []
  );

  return (
    <form action={updatePost} className="space-y-6">
      {/* Hidden IDs */}
      <input type="hidden" name="id" value={post.id} />
      {/* Hidden inputs for images */}
      <input type="hidden" name="mainImage" value={mainImageFiles[0]?.url || ''} />
      <input type="hidden" name="authorImage" value={authorImageFiles[0]?.url || ''} />

      {/* ── Form Header ── */}
      <div className="flex justify-between items-start border-b border-gray-700 pb-6 mb-6">
        <div>
          <h2 className="text-xl font-black text-white uppercase">
            Edit Configuration
          </h2>
          <p className="text-gray-400 text-sm mt-1">Manage URL, content and metadata.</p>
        </div>
        <DeletePostButton id={post.id} />
      </div>

      {/* ── 1. Main Info & Cover ── */}
      <AccordionSection title="Main Info & Cover" icon="📰" defaultOpen>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
              <div>
                <label className={accentLabelCls}>Slug (URL)</label>
                <input
                  type="text"
                  name="slug"
                  defaultValue={post.slug}
                  className={fieldCls}
                  required
                />
              </div>
          </div>
          <div>
            <ImageUpload 
              label="Cover Image" 
              value={mainImageFiles} 
              onChange={setMainImageFiles} 
              multiple={false} 
            />
          </div>
        </div>
      </AccordionSection>

      {/* ── 2. SEO & Metadata ── */}
      <AccordionSection title="SEO & Metadata" icon="🔍">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Meta Title</label>
            <input
              type="text"
              name="seoTitle"
              defaultValue={post.seoTitle || ''}
              placeholder="Max 60 chars"
              className={fieldCls}
              maxLength={60}
            />
          </div>
          <div>
            <label className={labelCls}>Meta Description</label>
            <textarea
              name="seoDesc"
              rows={3}
              defaultValue={post.seoDesc || ''}
              placeholder="Max 160 chars"
              className={fieldCls}
              maxLength={160}
            />
          </div>
          <div>
            <label className={labelCls}>Focus Keyword</label>
            <input
              type="text"
              name="focusKeyword"
              defaultValue={post.focusKeyword || ''}
              className={fieldCls}
            />
          </div>
        </div>
      </AccordionSection>

      {/* ── 3. Author Profile ── */}
      <AccordionSection title="Author Profile" icon="✍️">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className={accentLabelCls}>Author Name</label>
              <input
                type="text"
                name="authorName"
                defaultValue={post.authorName || ''}
                placeholder="e.g. Spencer Sutton"
                className={fieldCls}
              />
            </div>
            <div>
              <ImageUpload 
                label="Author Photo" 
                value={authorImageFiles} 
                onChange={setAuthorImageFiles} 
                multiple={false} 
                disableMetadata={true}
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>Author Bio</label>
            <textarea
              name="authorBio"
              rows={5}
              defaultValue={post.authorBio || ''}
              placeholder="Short author bio..."
              className={fieldCls}
            />
          </div>
        </div>
      </AccordionSection>

      {/* ── 4. Content Editor ── */}
      <div className="border border-gray-800 p-6 rounded-xl bg-[#1a1a1a] shadow-lg">
        <h3 className="text-sm font-black text-[#f8ed1a] uppercase mb-4">
          📝 Post Content
        </h3>
        <div className="space-y-4">
          <div>
            <label className={accentLabelCls}>Post Title</label>
            <input
              type="text"
              name="title"
              defaultValue={post.title}
              placeholder="Post title..."
              className="w-full bg-gray-900 rounded p-3 text-white border border-gray-700 focus:border-[#f8ed1a] outline-none font-bold text-lg"
              required
            />
          </div>
          <div>
            <label className={labelCls}>Body Content (HTML / Markdown)</label>
            <textarea
              name="content"
              rows={20}
              defaultValue={post.content}
              placeholder="Write your article here..."
              className="w-full bg-gray-900 rounded p-3 text-white border border-gray-700 focus:border-[#f8ed1a] outline-none text-sm font-mono"
              required
            />
          </div>
        </div>
      </div>

      {/* ── Footer Actions ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a1a]/95 backdrop-blur py-4 border-t border-gray-800 flex items-center justify-end gap-4 px-8 lg:pr-12">
        <Link
          href="/dashboard/blog"
          className="text-sm font-bold text-gray-400 hover:text-white"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="bg-[#529e14] hover:bg-[#458510] text-white px-8 py-3 rounded-lg font-black uppercase tracking-wide shadow-lg hover:scale-105 transition-all"
        >
          Save Changes
        </button>
      </div>

      {/* Bottom padding to avoid content hidden behind fixed footer */}
      <div className="h-24" />
    </form>
  );
}
