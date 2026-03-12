'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createPost } from '@/lib/blog-actions';
import ImageUpload, { ImageFile } from '../_components/image-upload';

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

const fieldCls =
  'w-full bg-gray-900 rounded p-3 text-white border border-gray-700 focus:border-[#f8ed1a] outline-none text-sm';
const labelCls = 'block text-xs font-bold text-gray-400 uppercase mb-1';
const accentLabelCls = 'block text-xs font-bold text-[#f8ed1a] uppercase mb-1';

// ── Page ─────────────────────────────────────────────────────────────────────
export default function NewPostPage() {
  const [mainImageFiles, setMainImageFiles] = useState<ImageFile[]>([]);
  const [authorImageFiles, setAuthorImageFiles] = useState<ImageFile[]>([]);

  return (
    <div className="max-w-5xl mx-auto">

      {/* ── Header ── */}
      <div className="md:flex md:items-center md:justify-between mb-10 border-b border-gray-800 pb-6">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <Link href="/dashboard/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-[#f8ed1a]">New Post</span>
          </div>
          <h1 className="text-3xl font-black leading-7 text-white uppercase tracking-tight">
            Create New Post
          </h1>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <Link
            href="/dashboard/blog"
            className="inline-flex items-center rounded-lg bg-white/5 border border-gray-600 px-4 py-2 text-sm font-bold text-gray-300 hover:bg-white/10 hover:text-white uppercase transition-colors"
          >
            ← Cancel
          </Link>
        </div>
      </div>

      <form action={createPost} className="space-y-6">
        {/* Hidden inputs for images */}
        <input type="hidden" name="mainImage" value={mainImageFiles[0]?.url || ''} />
        <input type="hidden" name="authorImage" value={authorImageFiles[0]?.url || ''} />

        {/* ── 1. Main Info & Cover ── */}
        <AccordionSection title="Main Info & Cover" icon="📰" defaultOpen>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className={accentLabelCls}>Slug (URL)</label>
                <input
                  type="text"
                  name="slug"
                  placeholder="auto-generated-from-title"
                  className={fieldCls}
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
                placeholder="Max 60 chars"
                maxLength={60}
                className={fieldCls}
              />
            </div>
            <div>
              <label className={labelCls}>Meta Description</label>
              <textarea
                name="seoDesc"
                rows={3}
                placeholder="Max 160 chars"
                maxLength={160}
                className={fieldCls}
              />
            </div>
            <div>
              <label className={labelCls}>Focus Keyword</label>
              <input
                type="text"
                name="focusKeyword"
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
                placeholder="Short author bio..."
                className={fieldCls}
              />
            </div>
          </div>
        </AccordionSection>

        {/* ── 4. Content Editor ── */}
        <div className="border border-gray-800 p-6 rounded-xl bg-[#1a1a1a] shadow-lg pb-20">
          <h3 className="text-sm font-black text-[#f8ed1a] uppercase mb-4">
            📝 Post Content
          </h3>
          <div className="space-y-4">
            <div>
              <label className={accentLabelCls}>Post Title</label>
              <input
                type="text"
                name="title"
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
            className="bg-[#529e14] px-8 py-3 rounded-lg font-black text-white hover:bg-[#458510] uppercase shadow-lg transition-all hover:scale-105"
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
}
