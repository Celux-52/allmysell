"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { TrendingUp, BarChart, ArrowUp, ArrowDown, Search, Filter, Loader2, AlertCircle, Globe2, Sparkles, ExternalLink, Info, Database, Brain, Shield } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { useState } from "react";

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

export default function TrendsPage() {
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
              Live Trends
            </span>
          </AnimatedGradientText>
          <h1 className="text-3xl font-bold text-white">Trend Analysis Engine</h1>
          <p className="text-slate-400 mt-1">Real Google Trends data + AI analysis — fully transparent, open-source methodology.</p>
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
              <div className="flex justify-center gap-3 mt-4 flex-wrap">
                {["Google Trends API", "AI Analysis", "Source Verification"].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                    className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-slate-300 flex items-center gap-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                    {step}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {trendData && !isLoading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

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

              <AnimatePresence>
                {showMethodology && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="space-y-3 pt-3 border-t border-blue-500/10">
                      <div className="p-3 rounded-lg bg-white/[0.02]">
                        <p className="text-xs font-semibold text-slate-300 mb-1">📊 How Data Is Collected</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{dataSources?.method || "Google Trends data is fetched via the google-trends-api npm package. AI models analyze platform-specific data."}</p>
                      </div>
                      {trendData.methodology && (
                        <div className="p-3 rounded-lg bg-white/[0.02]">
                          <p className="text-xs font-semibold text-slate-300 mb-1">🔬 AI Methodology</p>
                          <p className="text-xs text-slate-400 leading-relaxed">{trendData.methodology}</p>
                        </div>
                      )}
                      <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                        <p className="text-xs font-semibold text-amber-400 mb-1">⚠️ Limitations & Disclaimer</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{trendData.limitations || dataSources?.transparency || "Google Trends data is real. AI insights are model-generated and should be verified independently before making business decisions."}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Real Google Trends Data Card */}
            {googleTrends && (
              <div className="p-5 rounded-xl border border-green-500/20 bg-green-500/5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-bold text-green-400 flex items-center gap-2">
                    <Globe2 className="h-4 w-4" />
                    Real Google Trends Data — &quot;{googleTrendsQuery}&quot;
                  </h2>
                  <a
                    href={`https://trends.google.com/trends/explore?q=${encodeURIComponent(googleTrendsQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-green-300 hover:text-green-200 flex items-center gap-1"
                  >
                    Verify on Google <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 rounded-lg bg-white/[0.03]">
                    <p className="text-2xl font-bold text-white">{googleTrends.averageInterest}</p>
                    <p className="text-xs text-slate-500">Avg Interest (0-100)</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/[0.03]">
                    <p className="text-2xl font-bold text-white">{googleTrends.peakInterest}</p>
                    <p className="text-xs text-slate-500">Peak Interest</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/[0.03]">
                    <p className={`text-2xl font-bold capitalize ${
                      googleTrends.trendDirection === 'rising' ? 'text-green-400' :
                      googleTrends.trendDirection === 'declining' ? 'text-red-400' : 'text-slate-300'
                    }`}>{googleTrends.trendDirection}</p>
                    <p className="text-xs text-slate-500">Direction</p>
                  </div>
                </div>

                {googleTrends.risingQueries && googleTrends.risingQueries.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-400 mb-2">🔥 Rising Related Searches (from Google):</p>
                    <div className="flex flex-wrap gap-2">
                      {googleTrends.risingQueries.slice(0, 8).map((q, i) => (
                        <a
                          key={i}
                          href={`https://trends.google.com/trends/explore?q=${encodeURIComponent(q)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-green-500/10 text-green-300 px-2.5 py-1 rounded-full border border-green-500/20 hover:bg-green-500/20 transition-colors flex items-center gap-1"
                        >
                          {q} <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {googleTrends.relatedQueries && googleTrends.relatedQueries.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-slate-400 mb-2">📊 Top Related Searches:</p>
                    <div className="flex flex-wrap gap-2">
                      {googleTrends.relatedQueries.slice(0, 8).map((q, i) => (
                        <span key={i} className="text-xs bg-white/5 text-slate-400 px-2 py-0.5 rounded-full">{q}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* AI Summary */}
            <div className="p-5 rounded-xl border border-white/10 bg-[#080c16]">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-orange-400" />
                  AI Market Summary
                </h2>
                {engine && (
                  <span className="text-xs bg-orange-500/10 border border-orange-500/20 px-2 py-1 rounded-full text-orange-400">
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

            {/* Trend Categories */}
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
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs text-slate-500">Vol: {trend.volume}</span>
                          </div>
                          <p className="text-xs text-slate-400">{trend.insight}</p>
                          {/* Data source for this specific trend */}
                          {trend.dataSource && (
                            <p className="text-xs text-blue-400/60 mt-1.5 flex items-center gap-1">
                              <Database className="h-2.5 w-2.5" /> Source: {trend.dataSource}
                            </p>
                          )}
                          {trend.reasoning && (
                            <p className="text-xs text-slate-500 mt-1 italic">{trend.reasoning}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </MagicCard>
                </motion.div>
              ))}
            </div>

            {/* Sources Footer */}
            {trendData.sources && trendData.sources.length > 0 && (
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                  <Database className="h-3 w-3" /> Cited Data Sources
                </p>
                <div className="flex flex-wrap gap-2">
                  {trendData.sources.map((s: any, i: number) => {
                    const isObj = typeof s === 'object';
                    const name = isObj ? s.name : s;
                    const url = isObj ? s.url : null;
                    return url ? (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-xs bg-white/5 px-2 py-1 rounded text-blue-400 hover:bg-blue-500/10 transition-colors flex items-center gap-1">
                        {name} <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    ) : (
                      <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded text-slate-500">{name}</span>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Default View */}
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
                  <p className="text-sm text-slate-400">Click &quot;Start Deep Scan&quot; to load live data from Google Trends + AI</p>
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

              {/* Methodology Explanation */}
              <div className="mt-6 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  How Our Trend Analysis Works
                </h4>
                <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
                  <p><strong className="text-slate-300">1. Google Trends API:</strong> We fetch real search interest data from Google Trends using the open-source <code className="text-blue-300 bg-white/5 px-1 rounded">google-trends-api</code> npm package. This gives us actual search volume, trend direction, and related queries.</p>
                  <p><strong className="text-slate-300">2. AI Analysis:</strong> Our multi-AI consensus engine (Groq/Gemini/DeepSeek) analyzes the data and cross-references with e-commerce platform trends from Etsy, Amazon, and eBay.</p>
                  <p><strong className="text-slate-300">3. Transparency:</strong> Every data point shows its source. Google Trends data includes direct verification links. AI insights are clearly labeled as model-generated.</p>
                </div>
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
            <p className="text-sm text-slate-400 mb-4 relative z-10">Run a deep AI + Google Trends analysis on a specific niche.</p>
            <button
              onClick={handleDeepScan}
              disabled={isLoading}
              className="w-full py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-orange-500 hover:border-orange-500 transition-colors relative z-10 text-white shadow-[0_0_15px_rgba(249,115,22,0)] hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Scanning..." : "Start Deep Scan"}
            </button>

            <div className="mt-6 space-y-3 relative z-10">
              <h4 className="text-sm font-semibold text-slate-300">Open Data Sources</h4>
              <a href="https://trends.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300">
                <Globe2 className="h-3 w-3" /> Google Trends <ExternalLink className="h-2.5 w-2.5" />
              </a>
              <a href="https://www.npmjs.com/package/google-trends-api" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300">
                <Database className="h-3 w-3" /> google-trends-api (npm) <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
