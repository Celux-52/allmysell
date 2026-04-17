'use client';

import { useState, useEffect } from 'react';
import { FileText, Plus, Search, Eye, Pencil, Trash2, Calendar } from 'lucide-react';
import Link from 'next/link';

interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt: string | null;
  viewCount: number;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/blog');
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !search || post.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<string, string> = {
    PUBLISHED: 'bg-emerald-500/10 text-emerald-400',
    DRAFT: 'bg-gray-500/10 text-gray-400',
    SCHEDULED: 'bg-blue-500/10 text-blue-400',
    ARCHIVED: 'bg-red-500/10 text-red-400',
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cornsilk mb-1">Blog Posts</h1>
          <p className="text-gray-400 text-sm">{posts.length} total posts</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all font-medium text-sm"
        >
          <Plus size={18} />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-lg text-cornsilk placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/30 text-sm"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-lg text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30"
        >
          <option value="all">All Status</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Drafts</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[#1A1A1A] rounded-xl border border-white/5 p-5">
              <div className="w-2/3 h-4 bg-white/5 rounded animate-pulse mb-3"></div>
              <div className="w-1/3 h-3 bg-white/5 rounded animate-pulse mb-4"></div>
              <div className="w-full h-2 bg-white/5 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="bg-[#1A1A1A] rounded-xl border border-white/5 p-12 text-center">
          <FileText className="mx-auto text-gray-600 mb-3" size={40} />
          <p className="text-gray-400 mb-3">
            {search ? 'No posts matching your search' : 'No blog posts yet'}
          </p>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-colors text-sm"
          >
            <Plus size={16} />
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-[#1A1A1A] rounded-xl border border-white/5 hover:border-purple-500/20 transition-all p-5 group">
              <div className="flex items-start justify-between mb-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[post.status] || statusColors.DRAFT}`}>
                  {post.status}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <Pencil size={14} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-cornsilk mb-2 line-clamp-2">{post.title}</h3>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Eye size={12} /> {post.viewCount} views
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
