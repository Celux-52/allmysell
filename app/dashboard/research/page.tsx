'use client';

import { useState } from 'react';
import { Search, Sparkles, Loader2, Bookmark, TrendingUp, DollarSign, AlertTriangle, Lightbulb, Zap, Target, Users } from 'lucide-react';
import { gamificationEvents } from '@/lib/gamification';

interface ProductItem {
  name: string;
  category: string;
  wholesalePrice?: string;
  retailPrice?: string;
  profitMargin: string;
  competition: 'Low' | 'Medium' | 'High';
  trend: 'Rising' | 'Stable' | 'Declining';
  score: number;
  description: string;
  platforms: string[];
  whyItWorks: string;
  targetAudience?: string;
  marketingTips?: string[];
}

interface ProblemSolution {
  product: string;
  description: string;
  whyItSolves: string;
  estimatedDemand: string;
  competitionLevel: string;
  suggestedPrice: string;
  sourcingTip: string;
}

type SearchMode = 'product' | 'problem';

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<SearchMode>('product');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [solutions, setSolutions] = useState<ProblemSolution[]>([]);
  const [summary, setSummary] = useState('');
  const [engine, setEngine] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim() || query.trim().length < 3) return;
    setLoading(true);
    setError('');
    setSearched(true);
    setProducts([]);
    setSolutions([]);
    setSummary('');

    try {
      const res = await fetch('/api/ai/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim(), mode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Research failed');
        return;
      }

      setEngine(data.engine);

      if (data.results?.products) {
        setProducts(data.results.products);
        setSummary(data.results.summary || '');
      } else if (data.results?.solutions) {
        setSolutions(data.results.solutions);
        setSummary(data.results.recommendation || '');
      }

      // Check for first search achievement
      gamificationEvents.checkFirstSearch();

    } catch (err) {
      setError('Failed to connect to AI service. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const competitionColor: Record<string, string> = {
    Low: 'text-emerald-400 bg-emerald-500/10',
    Medium: 'text-amber-400 bg-amber-500/10',
    High: 'text-red-400 bg-red-500/10',
  };

  const trendColor: Record<string, string> = {
    Rising: 'text-emerald-400',
    Stable: 'text-blue-400',
    Declining: 'text-red-400',
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">AI Product Research</h1>
        <p className="text-stone-500 text-sm">Powered by OpenAI GPT-4o + Google Gemini</p>
      </div>

      {/* Search Box */}
      <div className="bg-stone-50 rounded-2xl p-6 border border-[#E8750A]/20 mb-8">
        {/* Mode Toggle */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setMode('product')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'product'
                ? 'bg-[#E8750A]/20 text-stone-800 border border-[#E8750A]/30'
                : 'text-stone-500 hover:text-stone-600 hover:bg-white/5'
            }`}
          >
            <Search size={16} />
            Product Search
          </button>
          <button
            onClick={() => setMode('problem')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'problem'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'text-stone-500 hover:text-stone-600 hover:bg-white/5'
            }`}
          >
            <Lightbulb size={16} />
            Problem → Solution
          </button>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={mode === 'product'
                ? 'Try: "kitchen gadgets", "pet travel", "car phone accessories"...'
                : 'Try: "people lose their keys often", "pets scratch furniture"...'
              }
              className="w-full pl-12 pr-4 py-4 bg-[#FAFAF9] border border-white/10 rounded-xl text-stone-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E8750A]/30 focus:border-[#E8750A]/50 text-sm"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim() || query.trim().length < 3}
            className="px-6 py-4 bg-stone-900 !text-white hover:bg-stone-800 text-stone-900 rounded-xl font-semibold hover:shadow-lg hover:shadow-stone-200/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? (
              <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={18} /> Analyzing...</span>
            ) : (
              <span className="flex items-center gap-2"><Zap size={18} /> Research</span>
            )}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {(mode === 'product'
            ? ['Pet accessories', 'Kitchen gadgets', 'Car tech', 'Home gym', 'Phone cases']
            : ['Tangled earbuds', 'Messy desk cables', 'Cold coffee', 'Pet hair everywhere', 'Phone dies fast']
          ).map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-3 py-1 bg-white/5 rounded-full text-xs text-stone-500 hover:text-stone-800 hover:bg-[#E8750A]/10 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center py-16">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#E8750A]/20 border-t-[#E8750A] rounded-full animate-spin"></div>
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-stone-500" size={20} />
          </div>
          <p className="text-stone-500 mt-4 animate-pulse">
            {mode === 'product' ? 'AI is analyzing markets, trends, and competition...' : 'AI is finding solutions to this problem...'}
          </p>
          <p className="text-gray-600 text-xs mt-1">This usually takes 5-15 seconds</p>
        </div>
      )}

      {/* Summary */}
      {!loading && summary && (
        <div className="bg-[#E8750A]/5 border border-[#E8750A]/15 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Sparkles className="text-stone-500 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-sm text-stone-600">{summary}</p>
            {engine && <p className="text-[10px] text-gray-600 mt-1">Powered by {engine}</p>}
          </div>
        </div>
      )}

      {/* Product Results (OpenAI mode) */}
      {!loading && products.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-stone-900">{products.length} Products Found</h2>
          {products.map((product, idx) => (
            <div key={idx} className="bg-stone-50 rounded-xl border border-white/5 hover:border-[#E8750A]/20 transition-all overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-stone-900">{product.name}</h3>
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-[#E8750A]/10 rounded-full">
                        <Sparkles size={10} className="text-stone-500" />
                        <span className="text-xs font-bold text-stone-500">{product.score}/100</span>
                      </div>
                    </div>
                    <p className="text-sm text-stone-400">{product.category}</p>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-[#E8750A]/10 text-stone-500 hover:text-stone-800 transition-colors" title="Save product">
                    <Bookmark size={18} />
                  </button>
                </div>

                <p className="text-sm text-stone-600 mb-4">{product.description}</p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  <div className="bg-[#FAFAF9] rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <DollarSign size={12} className="text-emerald-400" />
                      <span className="text-[10px] text-stone-400 uppercase">Price Range</span>
                    </div>
                    <p className="text-xs text-stone-900 font-medium">
                      {product.wholesalePrice || ''} → {product.retailPrice || product.profitMargin}
                    </p>
                  </div>
                  <div className="bg-[#FAFAF9] rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <TrendingUp size={12} className="text-blue-400" />
                      <span className="text-[10px] text-stone-400 uppercase">Profit Margin</span>
                    </div>
                    <p className="text-xs text-stone-900 font-medium">{product.profitMargin}</p>
                  </div>
                  <div className="bg-[#FAFAF9] rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <AlertTriangle size={12} className="text-amber-400" />
                      <span className="text-[10px] text-stone-400 uppercase">Competition</span>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${competitionColor[product.competition] || ''}`}>
                      {product.competition}
                    </span>
                  </div>
                  <div className="bg-[#FAFAF9] rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <TrendingUp size={12} className={trendColor[product.trend] || 'text-stone-500'} />
                      <span className="text-[10px] text-stone-400 uppercase">Trend</span>
                    </div>
                    <span className={`text-xs font-medium ${trendColor[product.trend] || 'text-stone-500'}`}>{product.trend}</span>
                  </div>
                </div>

                <div className="bg-[#FAFAF9] rounded-lg p-3 mb-3">
                  <p className="text-[10px] text-stone-400 uppercase mb-1">💡 Why It Works</p>
                  <p className="text-xs text-stone-600">{product.whyItWorks}</p>
                </div>

                {product.targetAudience && (
                  <div className="flex items-center gap-2 mb-3 text-xs text-stone-500">
                    <Target size={12} className="text-stone-800" />
                    <span className="font-medium">Target:</span> {product.targetAudience}
                  </div>
                )}

                {product.marketingTips && product.marketingTips.length > 0 && (
                  <div className="bg-[#FAFAF9] rounded-lg p-3 mb-3">
                    <p className="text-[10px] text-stone-400 uppercase mb-2">📢 Marketing Tips</p>
                    <ul className="space-y-1">
                      {product.marketingTips.map((tip, i) => (
                        <li key={i} className="text-xs text-stone-600 flex items-start gap-2">
                          <span className="text-stone-800 mt-0.5">•</span> {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-stone-400">Source:</span>
                    {(product.platforms || []).map((p) => (
                      <span key={p} className="text-[10px] px-2 py-0.5 bg-white/5 rounded-full text-stone-500">{p}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5 mt-2">
                    <span className="text-[10px] text-stone-400 font-bold uppercase">Gerçek Zamanlı Piyasa Testi:</span>
                    <a href={`https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(product.name)}`} target="_blank" rel="noopener noreferrer" className="text-[10px] px-3 py-1 bg-[#ff4747]/10 text-[#ff4747] rounded-full hover:bg-[#ff4747]/20 transition-colors flex items-center gap-1">
                      🛒 AliExpress'te Canlı Ara
                    </a>
                    <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent(product.name)}`} target="_blank" rel="noopener noreferrer" className="text-[10px] px-3 py-1 bg-[#4285F4]/10 text-[#4285F4] rounded-full hover:bg-[#4285F4]/20 transition-colors flex items-center gap-1">
                      📈 Google Trends Analizi
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Problem-Solution Results (Gemini mode) */}
      {!loading && solutions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
            <Lightbulb className="text-purple-400" size={20} />
            {solutions.length} Solutions Found
          </h2>
          {solutions.map((sol, idx) => (
            <div key={idx} className="bg-stone-50 rounded-xl border border-white/5 hover:border-purple-500/20 transition-all p-5">
              <h3 className="text-lg font-semibold text-stone-900 mb-2">{sol.product}</h3>
              <p className="text-sm text-stone-600 mb-3">{sol.description}</p>

              <div className="bg-purple-500/5 border border-purple-500/10 rounded-lg p-3 mb-3">
                <p className="text-[10px] text-purple-400 uppercase mb-1">How It Solves The Problem</p>
                <p className="text-xs text-stone-600">{sol.whyItSolves}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="bg-[#FAFAF9] rounded-lg p-3 text-center">
                  <p className="text-[10px] text-stone-400 uppercase mb-1">Demand</p>
                  <p className={`text-sm font-bold ${sol.estimatedDemand === 'High' ? 'text-emerald-400' : sol.estimatedDemand === 'Medium' ? 'text-amber-400' : 'text-stone-500'}`}>{sol.estimatedDemand}</p>
                </div>
                <div className="bg-[#FAFAF9] rounded-lg p-3 text-center">
                  <p className="text-[10px] text-stone-400 uppercase mb-1">Competition</p>
                  <p className={`text-sm font-bold ${sol.competitionLevel === 'Low' ? 'text-emerald-400' : sol.competitionLevel === 'Medium' ? 'text-amber-400' : 'text-red-400'}`}>{sol.competitionLevel}</p>
                </div>
                <div className="bg-[#FAFAF9] rounded-lg p-3 text-center">
                  <p className="text-[10px] text-stone-400 uppercase mb-1">Price</p>
                  <p className="text-sm font-bold text-stone-900">{sol.suggestedPrice}</p>
                </div>
              </div>

              <p className="text-xs text-stone-400">📦 <span className="text-stone-500">{sol.sourcingTip}</span></p>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && searched && products.length === 0 && solutions.length === 0 && !error && (
        <div className="text-center py-16">
          <Search className="mx-auto text-gray-600 mb-3" size={40} />
          <p className="text-stone-500">No results found. Try a different search term.</p>
        </div>
      )}
    </div>
  );
}
