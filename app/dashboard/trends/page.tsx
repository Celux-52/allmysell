"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { TrendingUp, BarChart, ArrowUp, ArrowDown, Star, Search, Filter, Loader2, AlertCircle, Globe2, Sparkles } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { useState } from "react";

interface TrendItem {
  keyword: string;
  volume: string;
  growth: string;
  status: string;
  insight: string;
}

interface TrendCategory {
  name: string;
  emoji: string;
  trends: TrendItem[];
}

interface TrendData {
  categories: TrendCategory[];
  summary: string;
  topOpportunity: string;
  sources: string[];
}

export default function TrendsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trendData, setTrendData] = useState<TrendData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [engine, setEngine] = useState<string | null>(null);

  const fetchTrends = async (niche?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/trends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: niche || undefined }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to load trends.");
        return;
      }

      if (data.success && data.trends) {
        setTrendData(data.trends);
        setEngine(data.engine || null);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchTrends(searchQuery.trim());
    }
  };

  const handleDeepScan = () => {
    fetchTrends(searchQuery.trim() || undefined);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <AnimatedGradientText className="mb-2 !mx-0 !justify-start">
            <span className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-400" />
              Live Trends
            </span>
          </AnimatedGradientText>
          <h1 className="text-3xl font-bold text-white">Trend Analysis Engine</h1>
          <p className="text-slate-400 mt-1">Real-time market intelligence powered by AI across major e-commerce platforms.</p>
        </div>
        
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search niche or product..." 
              className="pl-9 pr-4 py-2 bg-[#080c16] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500/50 w-full sm:w-64 transition-colors"
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className="p-2 bg-[#080c16] border border-white/10 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-5 w-5 text-orange-400 animate-spin" /> : <Filter className="h-5 w-5 text-slate-400" />}
          </button>
        </form>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="relative rounded-2xl border border-white/10 bg-[#080c16] p-8 text-center overflow-hidden">
              <BorderBeam size={300} duration={4} colorFrom="#f97316" colorTo="#fbbf24" />
              <Loader2 className="h-10 w-10 animate-spin text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Analyzing Market Trends</h3>
              <p className="text-sm text-slate-400">AI is scanning e-commerce platforms and Google Trends data...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI-Powered Results */}
      <AnimatePresence>
        {trendData && !isLoading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Summary */}
            <div className="p-6 rounded-xl border border-white/10 bg-[#080c16]">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-orange-400" />
                  AI Market Summary
                </h2>
                {engine && (
                  <span className="text-xs bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full text-green-400">
                    via {engine}
                  </span>
                )}
              </div>
              <p className="text-slate-400 leading-relaxed mb-4">{trendData.summary}</p>
              {trendData.topOpportunity && (
                <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                  <p className="text-xs font-semibold text-orange-400 mb-1">🏆 Top Opportunity</p>
                  <p className="text-sm text-slate-300">{trendData.topOpportunity}</p>
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {trendData.categories.map((cat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <MagicCard className="p-6 h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">{cat.emoji}</span>
                      <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                    </div>
                    <div className="space-y-3">
                      {cat.trends.map((trend, j) => (
                        <div key={j} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-white">{trend.keyword}</span>
                            <span className={`text-xs font-bold flex items-center gap-1 ${
                              trend.status === 'rising' ? 'text-green-400' : 
                              trend.status === 'declining' ? 'text-red-400' : 'text-slate-400'
                            }`}>
                              {trend.status === 'rising' ? <ArrowUp className="h-3 w-3" /> : 
                               trend.status === 'declining' ? <ArrowDown className="h-3 w-3" /> : null}
                              {trend.growth}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">Vol: {trend.volume}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1.5">{trend.insight}</p>
                        </div>
                      ))}
                    </div>
                  </MagicCard>
                </motion.div>
              ))}
            </div>

            {/* Sources */}
            {trendData.sources && trendData.sources.length > 0 && (
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Data Sources</p>
                <div className="flex flex-wrap gap-2">
                  {trendData.sources.map((s, i) => (
                    <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded text-slate-500">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Default View — when no AI data loaded */}
      {!trendData && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <MagicCard className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-orange-500/10 rounded-lg text-orange-400">
                  <BarChart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Market Sentiment</h3>
                  <p className="text-sm text-slate-400">Click &quot;Start Deep Scan&quot; to load live AI-powered trends</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Tech Accessories", pct: 75, color: "bg-green-500", label: "+14%" },
                  { name: "Home Decor", pct: 45, color: "bg-orange-500", label: "-5%" },
                  { name: "Personalized Gifts", pct: 90, color: "bg-green-500", label: "+32%" },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">{item.name}</span>
                      <span className={item.pct > 60 ? "text-green-400" : "text-orange-400"}>{item.label}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </MagicCard>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-white/5 bg-gradient-to-b from-[#080c16] to-transparent p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="h-24 w-24 text-orange-500" />
            </div>
            <h3 className="font-semibold text-white mb-2 relative z-10">Generate New Insights</h3>
            <p className="text-sm text-slate-400 mb-4 relative z-10">Run a deep AI analysis on a specific niche to find hidden gems.</p>
            <button 
              onClick={handleDeepScan}
              disabled={isLoading}
              className="w-full py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-orange-500 hover:border-orange-500 transition-colors relative z-10 text-white shadow-[0_0_15px_rgba(249,115,22,0)] hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Scanning..." : "Start Deep Scan"}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
