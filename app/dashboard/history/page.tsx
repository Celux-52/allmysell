'use client';

import { Clock, Search } from 'lucide-react';

export default function HistoryPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">Search History</h1>
        <p className="text-stone-500 text-sm">Your past AI research queries and results</p>
      </div>

      {/* Empty State */}
      <div className="bg-stone-50 rounded-2xl border border-white/5 p-12 text-center">
        <Clock className="mx-auto text-gray-600 mb-4" size={48} />
        <h3 className="text-xl font-semibold text-stone-900 mb-2">No search history yet</h3>
        <p className="text-stone-500 text-sm mb-6 max-w-md mx-auto">
          Your AI product research queries will appear here so you can revisit past results and refine your research strategy.
        </p>
        <a
          href="/dashboard/research"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 !text-white hover:bg-stone-800 text-stone-900 rounded-lg font-medium hover:shadow-lg hover:shadow-stone-200/50 transition-all text-sm"
        >
          <Search size={16} />
          Make Your First Search
        </a>
      </div>
    </div>
  );
}
