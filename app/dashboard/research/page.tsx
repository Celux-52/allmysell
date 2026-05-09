"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { TrendingUp, BarChart, ArrowUp, ArrowDown, Search, Filter, Loader2, AlertCircle, Globe2, Sparkles, ExternalLink, Info, Database, Brain, Shield } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { useState } from "react";
import { ViralTrendFeed } from "@/components/research/ViralTrendFeed";

interface TrendItem {
  keyword: string;
  volume: string;
  growth: string;
  status: string;
  insight: string;
  dataSource?: string;
  reasoning?: string;
}

interface TrendCategory {
  name: string;
  emoji: string;
  trends: TrendItem[];
}

interface SourceInfo {
  name: string;
  url: string;
  type: string;
}

interface GoogleTrendsData {
  averageInterest: number;
  peakInterest: number;
  trendDirection: string;
  relatedQueries: string[];
  risingQueries: string[];
  summary: string;
}

interface TrendData {
  categories: TrendCategory[];
  summary: string;
  topOpportunity: string;
  methodology?: string;
  limitations?: string;
  sources: SourceInfo[] | string[];
}

interface DataSourcesMeta {
  primary: string;
  secondary: string;
  method: string;
  transparency: string;
}

export default function ResearchDashboard() {
  const [activeTab, setActiveTab] = useState<'market' | 'viral'>('market');
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trendData, setTrendData] = useState<TrendData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [engine, setEngine] = useState<string | null>(null);
  const [googleTrends, setGoogleTrends] = useState<GoogleTrendsData | null>(null);
  const [dataSources, setDataSources] = useState<DataSourcesMeta | null>(null);
  const [googleTrendsQuery, setGoogleTrendsQuery] = useState<string>("");
  const [showMethodology, setShowMethodology] = useState(false);

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
        setGoogleTrends(data.googleTrendsData || null);
        setDataSources(data.dataSources || null);
        setGoogleTrendsQuery(data.googleTrendsQuery || "");
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
              {activeTab === 'market' ? 'Live Market Trends' : 'Autonomous Viral Feed'}
            </span>
          </AnimatedGradientText>
          <h1 className="text-3xl font-bold text-white">
            {activeTab === 'market' ? 'Trend Analysis Engine' : 'Viral Product Feed'}
          </h1>
          <p className="text-slate-400 mt-1">
            {activeTab === 'market' 
              ? 'Real Google Trends data + AI analysis — fully transparent.' 
              : 'AI-discovered viral products from TikTok & Facebook, analyzed autonomously.'}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#080c16] border border-white/10 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('market')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'market' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            Market Trends
          </button>
          <button
            onClick={() => setActiveTab('viral')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'viral' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Viral Feed
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'viral' ? (
          <motion.div
            key="viral"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ViralTrendFeed />
          </motion.div>
        ) : (
          <motion.div
            key="market"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <form onSubmit={handleSearch} className="flex gap-3 justify-end">
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

            {/* Loading */}
            <AnimatePresence>
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="relative rounded-2xl border border-white/10 bg-[#080c16] p-8 text-center overflow-hidden">
                    <BorderBeam size={300} duration={4} colorFrom="#f97316" colorTo="#fbbf24" />
                    <Loader2 className="h-10 w-10 animate-spin text-orange-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Analyzing Market Trends</h3>
                    <p className="text-sm text-slate-400 mb-4">Step 1: Fetching real Google Trends data...</p>
                    <p className="text-sm text-slate-400">Step 2: AI cross-referencing with e-commerce platform data...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results */}
            {trendData && !isLoading && (
              <div className="space-y-6">
                {/* Data Sources Transparency Card */}
                <div className="p-5 rounded-xl border border-blue-500/20 bg-blue-500/5 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-bold text-blue-400 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Data Sources & Methodology — Full Transparency
                    </h2>
                    <button
                      onClick={() => setShowMethodology(!showMethodology)}
                      className="text-xs text-blue-300 hover:text-blue-200 flex items-center gap-1"
                    >
                      <Info className="h-3 w-3" />
                      {showMethodology ? "Hide Details" : "Show Details"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="flex items-center gap-2 mb-1">
                        <Globe2 className="h-4 w-4 text-green-400" />
                        <p className="text-xs font-semibold text-green-400">PRIMARY: Real Data</p>
                      </div>
                      <p className="text-xs text-slate-400">{dataSources?.primary || "Google Trends API"}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="h-4 w-4 text-orange-400" />
                        <p className="text-xs font-semibold text-orange-400">SECONDARY: AI Analysis</p>
                      </div>
                      <p className="text-xs text-slate-400">{dataSources?.secondary || engine || "AI Model"}</p>
                    </div>
                  </div>
                </div>

                {/* AI Summary */}
                <div className="p-5 rounded-xl border border-white/10 bg-[#080c16]">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-orange-400" />
                      AI Market Summary
                    </h2>
                  </div>
                  <p className="text-slate-400 leading-relaxed mb-4">{trendData.summary}</p>
                </div>

                {/* Trend Categories */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {trendData.categories.map((cat, i) => (
                    <MagicCard key={i} className="p-6 h-full">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">{cat.emoji}</span>
                        <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                      </div>
                      <div className="space-y-3">
                        {cat.trends.map((trend, j) => (
                          <div key={j} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-white">{trend.keyword}</span>
                              <span className="text-xs font-bold text-green-400">
                                {trend.growth}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400">{trend.insight}</p>
                          </div>
                        ))}
                      </div>
                    </MagicCard>
                  ))}
                </div>
              </div>
            )}

            {/* Default Empty View */}
            {!trendData && !isLoading && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <MagicCard className="lg:col-span-2 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-orange-500/10 rounded-lg text-orange-400">
                      <BarChart className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Market Sentiment</h3>
                      <p className="text-sm text-slate-400">Click &quot;Start Deep Scan&quot; to load live data from Google Trends + AI</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                    <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      How Our Trend Analysis Works
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      We use Google Trends API for real-time search volume and our Multi-AI Consensus engine to analyze product viability across multiple platforms.
                    </p>
                  </div>
                </MagicCard>

                <div className="rounded-xl border border-white/5 bg-gradient-to-b from-[#080c16] to-transparent p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-orange-500 mx-auto mb-4 opacity-50" />
                  <h3 className="font-semibold text-white mb-2">Generate Insights</h3>
                  <button
                    onClick={handleDeepScan}
                    className="w-full py-2.5 bg-orange-500 rounded-lg text-sm font-bold text-white hover:bg-orange-600 transition-colors"
                  >
                    Start Deep Scan
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
