'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createPost } from '@/lib/blog-actions';
import ImageUpload, { ImageFile } from '../_components/image-upload';
import HtmlEditor from '../_components/html-editor';
import { isValidVideoUrl } from '@/lib/video-utils';

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
          className={`transform transition-transform duration-200 text-[#f8ed1a] ${isOpen ? 'rotate-180' : ''
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
  const [bodyImages, setBodyImages] = useState<ImageFile[]>([]);
  const [jsonLdError, setJsonLdError] = useState<string | null>(null);
  const [videoUrlError, setVideoUrlError] = useState<string | null>(null);

  function validateJsonLd(raw: string): string | null {
    const scriptMatch = raw.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
    if (scriptMatch) {
      try { JSON.parse(scriptMatch[1].trim()); }
      catch { return 'Invalid JSON inside the <script> tag — please fix the syntax.'; }
    } else if (raw.trimStart().startsWith('{') || raw.trimStart().startsWith('[')) {
      try { JSON.parse(raw); }
      catch { return 'Invalid JSON — please fix the syntax before saving.'; }
    }
    return null;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;

    // Validate JSON-LD
    const raw = (form.elements.namedItem('jsonLd') as HTMLTextAreaElement)?.value?.trim();
    if (raw) {
      const err = validateJsonLd(raw);
      if (err) { e.preventDefault(); setJsonLdError(err); return; }
    }
    setJsonLdError(null);

    // Validate video URL
    const videoUrl = (form.elements.namedItem('videoUrl') as HTMLInputElement)?.value?.trim();
    const videoTitle = (form.elements.namedItem('videoTitle') as HTMLInputElement)?.value?.trim();
    if (videoUrl) {
      if (!isValidVideoUrl(videoUrl)) {
        e.preventDefault();
        setVideoUrlError('Must be a valid YouTube or Dailymotion URL.');
        return;
      }
      if (!videoTitle) {
        e.preventDefault();
        setVideoUrlError('Video Title is required when a Video URL is provided.');
        return;
      }
    }
    setVideoUrlError(null);
  }

  const lastUploadedUrl = bodyImages.length > 0 ? bodyImages[bodyImages.length - 1].url : null;

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

      <form action={createPost} onSubmit={handleSubmit} className="space-y-6">
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
              <div>
                <label className={labelCls}>Category</label>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. real estate"
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

        {/* ── 2b. Structured Data (JSON-LD) ── */}
        <AccordionSection title="Structured Data (Script JSON-LD)" icon="🧩">
          <div className="space-y-3">
            <p className="text-xs text-gray-400 leading-relaxed">
              Paste the full block as-is. Accepted formats:
            </p>
            <ul className="text-xs text-gray-400 list-disc list-inside space-y-0.5">
              <li>Full <code className="text-[#f8ed1a] bg-gray-800 px-1 rounded text-[11px]">&lt;script type=&quot;application/ld+json&quot;&gt;...&lt;/script&gt;</code> tag</li>
              <li>Raw JSON array or object (without wrapper)</li>
              <li>Additional HTML blocks (e.g. <code className="text-[#f8ed1a] bg-gray-800 px-1 rounded text-[11px]">&lt;div&gt;</code>, <code className="text-[#f8ed1a] bg-gray-800 px-1 rounded text-[11px]">&lt;audio&gt;</code>, etc.) — can be combined with the script</li>
            </ul>
            <div>
              <label className={accentLabelCls}>JSON-LD / Structured Content</label>
              <textarea
                name="jsonLd"
                rows={14}
                placeholder={'<script type="application/ld+json">\n[\n  {\n    "@context": "https://schema.org",\n    "@type": "Article",\n    "headline": "..."\n  }\n]\n</script>'}
                className={`${fieldCls} font-mono text-xs`}
                onChange={() => jsonLdError && setJsonLdError(null)}
              />
              {jsonLdError && (
                <p className="mt-1 text-xs text-red-400 font-bold">{jsonLdError}</p>
              )}
            </div>
            <div className="bg-amber-950/30 border border-amber-700/40 rounded p-3 text-xs text-amber-300">
              <strong>Note:</strong> If both SEO fields and JSON-LD are filled, both will be active. Make sure the JSON-LD
              metadata (e.g. <code className="bg-amber-900/40 px-1 rounded">headline</code>,{' '}
              <code className="bg-amber-900/40 px-1 rounded">description</code>) is consistent with the meta title and description above.
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

        {/* ── 6. Video ── */}
        <AccordionSection title="Video (Optional)" icon="🎬">
          <div className="space-y-4">
            <p className="text-xs text-gray-400 leading-relaxed">
              Paste a YouTube or Dailymotion URL. The video will appear after the post content.
            </p>
            <div>
              <label className={accentLabelCls}>Video URL</label>
              <input
                type="url"
                name="videoUrl"
                placeholder="https://www.youtube.com/watch?v=..."
                className={fieldCls}
                onChange={() => videoUrlError && setVideoUrlError(null)}
              />
            </div>
            <div>
              <label className={labelCls}>Video Title</label>
              <input
                type="text"
                name="videoTitle"
                placeholder="e.g. How Spencer Buys Houses — Sell Your Memphis Home Fast"
                className={fieldCls}
                onChange={() => videoUrlError && setVideoUrlError(null)}
              />
            </div>
            {videoUrlError && (
              <p className="text-xs text-red-400 font-bold">{videoUrlError}</p>
            )}
            <div className="bg-blue-950/30 border border-blue-700/40 rounded p-3 text-xs text-blue-300">
              <strong>Supported:</strong> youtube.com/watch?v=, youtu.be/, youtube.com/shorts/, dailymotion.com/video/, dai.ly/
            </div>
          </div>
        </AccordionSection>

        {/* ── 4. Body Image Loader ── */}
        <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
            <p className="text-xs font-bold text-[#f8ed1a] uppercase flex items-center gap-2">
              📸 Body Image Loader
            </p>
            <span className="text-[10px] text-gray-500 uppercase font-bold">
              Use this to add images inside the article
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 w-full">
              <ImageUpload
                label=""
                value={bodyImages}
                onChange={setBodyImages}
                multiple={true}
                disableMetadata={true}
              />
            </div>
            <div className="w-full md:w-1/3 bg-[#1a1a1a] p-4 rounded border border-gray-700 text-xs text-gray-400">
              <p className="font-bold text-white mb-2 uppercase">How to insert:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Upload image here.</li>
                <li>Wait for the thumbnail to appear.</li>
                <li>Go to the editor below.</li>
                <li>Click the <span className="text-green-400 font-bold">&quot;Insert Uploaded Img&quot;</span> button.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* ── 5. Content Editor ── */}
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
            <HtmlEditor
              label="Body Content (HTML)"
              name="content"
              placeholder="Write your article here..."
              required
              latestUploadedImageUrl={lastUploadedUrl}
            />
            <div>
              <label className={labelCls}>Tags</label>
              <input
                type="text"
                name="tags"
                placeholder="e.g. real estate, sell fast, Memphis"
                className={fieldCls}
              />
              <p className="mt-1 text-[11px] text-gray-500">Separate tags with commas.</p>
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
