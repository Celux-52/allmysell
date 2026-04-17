'use client';

import { Bookmark, Trash2, ExternalLink, Filter } from 'lucide-react';
import { useState } from 'react';

export default function SavedProductsPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cornsilk mb-1">Saved Products</h1>
          <p className="text-gray-400 text-sm">Your curated product research workspace</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8750A]/30"
          >
            <option value="all">All Status</option>
            <option value="saved">Saved</option>
            <option value="listed">Listed</option>
            <option value="sold">Sold</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-12 text-center">
        <Bookmark className="mx-auto text-gray-600 mb-4" size={48} />
        <h3 className="text-xl font-semibold text-cornsilk mb-2">No saved products yet</h3>
        <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
          When you find interesting products through AI Research, click the bookmark icon to save them here.
          Track their status from saved → listed → sold.
        </p>
        <a
          href="/dashboard/research"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#E8750A] to-[#F59E0B] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#E8750A]/20 transition-all text-sm"
        >
          Start Researching Products
        </a>
      </div>
    </div>
  );
}
