'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Flame, ArrowUpRight, ArrowDownRight, Minus, Loader2, RefreshCw, Search, Sparkles } from 'lucide-react';
import { gamificationEvents } from '@/lib/gamification';

interface TrendItem {
  keyword: string;
  volume: string;
  growth: string;
  status: 'rising' | 'stable' | 'declining';
  insight?: string;
}

interface TrendCategory {
  name: string;
  emoji: string;
  trends: TrendItem[];
}

export default function TrendsPage() {
  const [categories, setCategories] = useState<TrendCategory[]>([]);
  const [summary, setSummary] = useState('');
  const [topOpportunity, setTopOpportunity] = useState('');
  const [trendSources, setTrendSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [niche, setNiche] = useState('');
  const [error, setError] = useState('');
  const [fetched, setFetched] = useState(false);

  const fetchTrends = async (nicheQuery?: string) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/ai/trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: nicheQuery || undefined }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to load trends');
        return;
      }

      if (data.trends) {
        setCategories(data.trends.categories || []);
        setSummary(data.trends.summary || '');
        setTopOpportunity(data.trends.topOpportunity || '');
        setTrendSources(data.trends.sources || []);
      }
      setFetched(true);

      // Award gamification check
      gamificationEvents.checkFirstTrend();

    } catch (err) {
      setError('Failed to connect to AI service');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-1">Trend Analysis</h1>
          <p className="text-stone-500 text-sm">AI-powered real-time market trend detection</p>
        </div>
      </div>

      {/* Search / Niche Filter */}
      <div className="bg-stone-50 rounded-xl p-4 border border-white/5 mb-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchTrends(niche)}
            placeholder="Enter a niche (optional) or leave empty for general trends..."
            className="w-full pl-10 pr-4 py-3 bg-[#FAFAF9] border border-white/10 rounded-lg text-stone-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-sm"
          />
        </div>
        <button
          onClick={() => fetchTrends(niche)}
          disabled={loading}
          className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-stone-900 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap text-sm"
        >
          {loading ? (
            <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Loading...</span>
          ) : fetched ? (
            <span className="flex items-center gap-2"><RefreshCw size={16} /> Refresh</span>
          ) : (
            <span className="flex items-center gap-2"><Flame size={16} /> Discover Trends</span>
          )}
        </button>
      </div>

      {/* Quick Niches */}
      {!fetched && !loading && (
        <div className="flex flex-wrap gap-2 mb-8">
          {['Electronics', 'Home & Garden', 'Fashion', 'Pet Supplies', 'Fitness', 'Kitchen', 'Auto Accessories', 'Beauty'].map((n) => (
            <button
              key={n}
              onClick={() => { setNiche(n); fetchTrends(n); }}
              className="px-3 py-1.5 bg-stone-50 border border-white/5 rounded-full text-xs text-stone-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
            >
              {n}
            </button>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-400 text-sm">{error}</div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center py-16">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            <Flame className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-400" size={20} />
          </div>
          <p className="text-stone-500 mt-4 animate-pulse">Analyzing market trends with AI...</p>
        </div>
      )}

      {/* Top Opportunity */}
      {!loading && topOpportunity && (
        <div className="bg-gradient-to-r from-emerald-600/10 to-emerald-400/5 rounded-xl p-4 border border-emerald-500/20 mb-6 flex items-start gap-3">
          <Sparkles className="text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-xs font-semibold text-emerald-400 uppercase mb-1">🏆 Top Opportunity</p>
            <p className="text-sm text-stone-600">{topOpportunity}</p>
          </div>
        </div>
      )}

      {/* Summary */}
      {!loading && summary && (
        <div className="bg-stone-50 rounded-xl p-4 border border-white/5 mb-6">
          <p className="text-sm text-stone-600">{summary}</p>
        </div>
      )}

      {/* Trend Categories */}
      {!loading && categories.length > 0 && (
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.name}>
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                {category.emoji} {category.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(category.trends || []).map((trend) => (
                  <div
                    key={trend.keyword}
                    className="bg-stone-50 rounded-xl p-4 border border-white/5 hover:border-emerald-500/20 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          trend.status === 'rising' ? 'bg-emerald-500/10' :
                          trend.status === 'stable' ? 'bg-blue-500/10' : 'bg-red-500/10'
                        }`}>
                          {trend.status === 'rising' ? <ArrowUpRight className="text-emerald-400" size={18} /> :
                           trend.status === 'stable' ? <Minus className="text-blue-400" size={18} /> :
                           <ArrowDownRight className="text-red-400" size={18} />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-stone-900 group-hover:text-emerald-400 transition-colors">{trend.keyword}</p>
                          <p className="text-xs text-stone-400">Volume: {trend.volume}/mo</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-bold ${
                          trend.status === 'rising' ? 'text-emerald-400' :
                          trend.status === 'stable' ? 'text-blue-400' : 'text-red-400'
                        }`}>
                          {trend.growth}
                        </span>
                      </div>
                    </div>
                    {trend.insight && (
                      <div className="mt-2 pl-[52px]">
                        <p className="text-xs text-stone-400 mb-2">{trend.insight}</p>
                        <div className="flex flex-wrap gap-2">
                          <a href={`https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(trend.keyword)}`} target="_blank" rel="noopener noreferrer" className="text-[9px] px-2 py-1 bg-stone-50 border border-white/10 hover:border-[#ff4747]/50 hover:text-[#ff4747] text-stone-500 rounded transition-all">
                            AliExpress Ara
                          </a>
                          <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent(trend.keyword)}`} target="_blank" rel="noopener noreferrer" className="text-[9px] px-2 py-1 bg-stone-50 border border-white/10 hover:border-[#4285F4]/50 hover:text-[#4285F4] text-stone-500 rounded transition-all">
                            Google Trends
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Initial State */}
      {!loading && !fetched && !error && (
        <div className="text-center py-12">
          <TrendingUp className="mx-auto text-gray-600 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-stone-900 mb-2">Discover Market Trends</h3>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            Click &quot;Discover Trends&quot; to get AI-powered analysis of current market trends, or enter a specific niche to focus on.
          </p>
        </div>
      )}
    </div>
  );
}
