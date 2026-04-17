'use client';

import { useState } from 'react';
import { Save, Eye, ArrowLeft, Image, Tag, Calendar, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('DRAFT');
  const [scheduledDate, setScheduledDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [error, setError] = useState('');

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async (publishStatus?: string) => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const finalStatus = publishStatus || status;
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug: slug || generateSlug(title),
          content,
          excerpt,
          coverImage,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          status: finalStatus,
          publishedAt: finalStatus === 'PUBLISHED' ? new Date().toISOString() : 
                       finalStatus === 'SCHEDULED' && scheduledDate ? new Date(scheduledDate).toISOString() : null,
        }),
      });

      if (res.ok) {
        router.push('/admin/blog');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to save post');
      }
    } catch (err) {
      setError('An error occurred while saving');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleAIGenerate = async () => {
    if (!aiTopic.trim()) return;
    setGenerating(true);
    setError('');
    try {
      const res = await fetch('/api/ai/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTitle(data.title || '');
        setSlug(generateSlug(data.title || ''));
        setContent(data.content || '');
        setExcerpt(data.excerpt || '');
        setTags((data.tags || []).join(', '));
      } else {
        setError(data.error || 'AI generation failed');
      }
    } catch (err) {
      setError('Failed to connect to AI');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-cornsilk transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-cornsilk">New Blog Post</h1>
            <p className="text-gray-500 text-sm">Create and publish content</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave('DRAFT')}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-gray-300 hover:bg-white/5 transition-colors text-sm disabled:opacity-50"
          >
            <Save size={16} />
            Save Draft
          </button>
          <button
            onClick={() => handleSave('PUBLISHED')}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all text-sm disabled:opacity-50"
          >
            <Eye size={16} />
            {saving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* AI Generate */}
        <div className="bg-purple-500/5 border border-purple-500/15 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-purple-400" size={16} />
            <span className="text-sm font-semibold text-purple-400">AI Auto-Generate</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAIGenerate()}
              placeholder='Enter topic: "Top 5 dropshipping trends 2026"'
              className="flex-1 px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-cornsilk text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
            <button
              onClick={handleAIGenerate}
              disabled={generating || !aiTopic.trim()}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
            >
              {generating ? <><Loader2 className="animate-spin" size={14} /> Generating...</> : <><Sparkles size={14} /> Generate</>}
            </button>
          </div>
        </div>

        {/* Title */}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title..."
            className="w-full px-0 py-3 bg-transparent text-3xl font-bold text-cornsilk placeholder-gray-600 border-none focus:outline-none focus:ring-0"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">URL Slug</label>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">/blog/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="post-url-slug"
              className="flex-1 px-3 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-cornsilk text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
            <Image size={14} /> Cover Image URL
          </label>
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-cornsilk text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 placeholder-gray-600"
          />
          {coverImage && (
            <div className="mt-2 rounded-lg overflow-hidden border border-white/5">
              <img src={coverImage} alt="Cover" className="w-full h-48 object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
          )}
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Excerpt / Summary</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="Brief description for search results and social sharing..."
            className="w-full px-3 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-cornsilk text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 placeholder-gray-600 resize-none"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Content (Markdown)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            placeholder="Write your blog post content in Markdown format...

# Heading 1
## Heading 2

**Bold text** and *italic text*

- List item 1
- List item 2

> Blockquote

```code block```"
            className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-cornsilk text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 placeholder-gray-600 resize-y font-mono leading-relaxed"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
            <Tag size={14} /> Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e-commerce, dropshipping, trends"
            className="w-full px-3 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-cornsilk text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 placeholder-gray-600"
          />
        </div>

        {/* Schedule */}
        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
            <Calendar size={14} /> Schedule Publication
          </label>
          <input
            type="datetime-local"
            value={scheduledDate}
            onChange={(e) => {
              setScheduledDate(e.target.value);
              if (e.target.value) setStatus('SCHEDULED');
            }}
            className="px-3 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-cornsilk text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
        </div>
      </div>
    </div>
  );
}
