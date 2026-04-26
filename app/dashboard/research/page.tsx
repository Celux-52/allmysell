"use client";

import { motion, AnimatePresence } from "framer-motion";
// ... earlier imports
import { Search, Sparkles, Wand2, Database, Loader2, Plus, Zap, ArrowUp, Star, AlertCircle, TrendingUp, ExternalLink, Truck, Globe2, Brain, CheckCircle, BarChart } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { useState, useEffect } from "react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { createClient } from "@/lib/supabase/client";
import { Storage, SAVED_LIMIT } from "@/lib/storage";

function calcScores(product: Product) {
  const marginNum = parseInt(product.profitMargin) || 50;
  const profitScore = Math.min(100, Math.max(0, marginNum + 15));
  const competitionScore = product.competition === 'Low' ? 85 : product.competition === 'Medium' ? 55 : 25;
  const opportunityScore = Math.round((profitScore * 0.5) + ((100 - competitionScore + 100) * 0.25) + (product.trend === 'Rising' ? 20 : product.trend === 'Stable' ? 10 : 0));
  return { profitScore: Math.min(100, profitScore), competitionScore, opportunityScore: Math.min(100, opportunityScore) };
}

interface SupplierLink {
  name: string;
  url: string;
}

interface GoogleTrendsData {
  averageInterest: number;
  peakInterest: number;
  trendDirection: string;
  relatedQueries: string[];
  risingQueries: string[];
}

interface Product {
  name: string;
  category: string;
  wholesalePrice: string;
  retailPrice: string;
  profitMargin: string;
  competition: string;
  trend: string;
  score: number;
  description: string;
  platforms: string[];
  whyItWorks: string;
  targetAudience: string;
  painPoint?: string;
  sellingAngle?: string;
  viralPotential?: string;
  marketingTips: string[];
  sources: string[];
  suppliers: SupplierLink[];
  competitorLinks?: { platform: string; url: string; note: string }[];
  googleTrendsInsight: string;
  googleTrendsData: GoogleTrendsData | null;
}

interface ResearchResults {
  products: Product[];
  summary: string;
  aiProviders: string[];
  consensusMethod: string;
}

export default function ResearchPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResearchResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string>("admin@allmysell.com");
  const [savedProducts, setSavedProducts] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [hasAutoRun, setHasAutoRun] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
        const saved = Storage.getSavedProducts(user.email);
        setSavedProducts(new Set(saved.map(p => p.name)));
      }
    };
    fetchUser();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery || searchQuery.trim().length < 3) return;
    
    setIsSearching(true);
    setError(null);
    setResults(null);
    setExpandedCard(null);

    try {
      const res = await fetch("/api/ai/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery.trim(), mode: "product" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      if (data.success && data.results) {
        setResults(data.results);
        const topScore = Math.max(...(data.results.products || []).map((p: any) => p.score || 0), 0);
        Storage.addHistory(userEmail, searchQuery.trim(), data.results.products.length, topScore);
      } else {
        setError("No results found. Try a different query.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (!hasAutoRun && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q');
      if (q) {
        setQuery(q);
        performSearch(q);
      }
      setHasAutoRun(true);
    }
  }, [hasAutoRun, userEmail]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  const handleSaveProduct = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const saved = Storage.getSavedProducts(userEmail);
    if (saved.length >= SAVED_LIMIT) {
      showToast(`Limit reached! Max ${SAVED_LIMIT} saved items. Remove some to add new ones.`);
      return;
    }
    const scores = calcScores(product);
    const success = Storage.saveProduct(userEmail, {
      name: product.name,
      category: product.category,
      wholesalePrice: product.wholesalePrice,
      retailPrice: product.retailPrice,
      profitMargin: product.profitMargin,
      competition: product.competition,
      trend: product.trend || 'Stable',
      score: product.score,
      profitScore: scores.profitScore,
      competitionScore: scores.competitionScore,
      opportunityScore: scores.opportunityScore,
      description: product.description,
      whyItWorks: product.whyItWorks || '',
      targetAudience: product.targetAudience || '',
    });
    
    if (success) {
      setSavedProducts(prev => new Set(prev).add(product.name));
      showToast(`${product.name} saved! (${saved.length + 1}/${SAVED_LIMIT})`);
    } else {
      showToast(`${product.name} is already in your saved items.`);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "from-green-400 to-emerald-500";
    if (score >= 70) return "from-orange-400 to-amber-500";
    return "from-slate-400 to-slate-500";
  };

  const getCompetitionBadge = (c: string) => {
    if (c === "Low") return "text-green-400 bg-green-500/10 border-green-500/20";
    if (c === "Medium") return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-red-400 bg-red-500/10 border-red-500/20";
  };

  return (
    <div className="space-y-8 pb-10 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-24 left-1/2 z-50 flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 shadow-xl backdrop-blur-md"
          >
            <CheckCircle className="h-5 w-5" />
            <p className="text-sm font-medium">{toast}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
        <AnimatedGradientText className="mb-4">
          <span className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-orange-400" />
            Multi-AI Consensus Engine
          </span>
        </AnimatedGradientText>
        <h1 className="text-4xl font-bold text-white tracking-tight">Smart Product Research</h1>
        <p className="text-lg text-slate-400">All AI models analyze your query simultaneously, cross-reference Google Trends, and deliver a consensus with real supplier data.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
          <div className="relative flex items-center bg-[#080c16] rounded-xl border border-white/10 p-2 shadow-2xl">
            <Search className="h-6 w-6 text-slate-400 ml-4" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 'high margin tech accessories on Etsy under $50'" 
              className="w-full bg-transparent border-none text-white px-4 py-4 focus:outline-none text-lg placeholder:text-slate-600"
            />
            <button 
              type="submit"
              disabled={isSearching || !query || query.trim().length < 3}
              className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-500 hover:to-amber-500 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
              {isSearching ? "Consulting AIs..." : "Analyze"}
            </button>
          </div>
        </form>

        <div className="flex gap-3 justify-center mt-6 flex-wrap">
          <span className="text-sm text-slate-500 px-3 py-1">Try asking:</span>
          {["Trending personalized jewelry", "Bestselling phone cases 2026", "Low competition desk gadgets", "High margin pet accessories"].map((suggestion) => (
            <button 
              key={suggestion}
              onClick={() => setQuery(suggestion)}
              className="text-sm text-slate-300 bg-white/5 border border-white/5 px-3 py-1 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl border border-white/10 bg-[#080c16] p-8 text-center overflow-hidden">
              <BorderBeam size={300} duration={4} colorFrom="#f97316" colorTo="#fbbf24" />
              <Loader2 className="h-10 w-10 animate-spin text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Multi-AI Consensus Running</h3>
              <p className="text-sm text-slate-400 mb-6">5 AI providers are analyzing your query in parallel + Google Trends data...</p>
              <div className="flex justify-center gap-3 flex-wrap">
                {["Groq (Llama 70B)", "Gemini Flash", "DeepSeek R1", "Qwen 3 72B", "Llama 4 Scout"].map((ai, i) => (
                  <motion.div 
                    key={ai}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="flex items-center gap-2 text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-slate-300"
                  >
                    <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                    {ai}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {results && results.products && results.products.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-6">
            {/* Summary Card */}
            <div className="p-6 rounded-xl border border-white/10 bg-[#080c16] relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Brain className="h-5 w-5 text-orange-400" />
                  Consensus Analysis
                </h2>
                <div className="flex flex-wrap gap-2">
                  {results.aiProviders && results.aiProviders.map((p) => (
                    <span key={p} className="text-xs bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full text-green-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed">{results.summary}</p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.products.map((product, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <MagicCard 
                    className="p-6 flex flex-col h-full cursor-pointer relative group"
                    onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`text-2xl font-extrabold bg-gradient-to-r ${getScoreColor(product.score)} text-transparent bg-clip-text`}>
                          {product.score}
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div>
                          <h3 className="text-lg font-bold text-white leading-tight pr-10">{product.name}</h3>
                          <p className="text-xs text-slate-500">{product.category}</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={(e) => handleSaveProduct(e, product)}
                        className={`absolute top-6 right-6 p-2 rounded-full border transition-all ${
                          savedProducts.has(product.name) 
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' 
                            : 'bg-white/5 border-white/10 text-slate-400 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/30 opacity-0 group-hover:opacity-100'
                        }`}
                        title="Save to Favorites"
                      >
                        <Star className={`h-4 w-4 ${savedProducts.has(product.name) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getCompetitionBadge(product.competition)}`}>
                        {product.competition} Competition
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${product.trend === 'Rising' ? 'text-green-400 bg-green-500/10 border-green-500/20' : product.trend === 'Declining' ? 'text-red-400 bg-red-500/10 border-red-500/20' : 'text-slate-400 bg-white/5 border-white/10'}`}>
                        {product.trend === 'Rising' ? '↑' : product.trend === 'Declining' ? '↓' : '→'} {product.trend}
                      </span>
                    </div>

                    {/* 3-Score Bars */}
                    {(() => { const s = calcScores(product); return (
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div>
                        <p className="text-[10px] text-slate-500 mb-1">⭐ Profit</p>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{width:`${s.profitScore}%`}} /></div>
                        <p className="text-[10px] text-green-400 mt-0.5 font-bold">{s.profitScore}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 mb-1">🔥 Compete</p>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" style={{width:`${s.competitionScore}%`}} /></div>
                        <p className="text-[10px] text-amber-400 mt-0.5 font-bold">{s.competitionScore}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 mb-1">💎 Opportunity</p>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-purple-500 to-violet-400 rounded-full" style={{width:`${s.opportunityScore}%`}} /></div>
                        <p className="text-[10px] text-purple-400 mt-0.5 font-bold">{s.opportunityScore}</p>
                      </div>
                    </div>
                    ); })()}

                    {/* Why This Will Sell - AI Insight */}
                    {(product.targetAudience || product.painPoint || product.sellingAngle || product.viralPotential) && (
                      <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500/5 to-amber-500/5 border border-orange-500/10 mb-3 space-y-1.5">
                        <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5 mb-2"><Zap className="h-3 w-3" /> Why This Will Sell</p>
                        {product.targetAudience && <p className="text-[11px] text-slate-300 leading-snug">🎯 <span className="text-slate-500">Target:</span> {product.targetAudience}</p>}
                        {product.painPoint && <p className="text-[11px] text-slate-300 leading-snug">💥 <span className="text-slate-500">Pain:</span> {product.painPoint}</p>}
                        {product.sellingAngle && <p className="text-[11px] text-slate-300 leading-snug">📈 <span className="text-slate-500">Angle:</span> {product.sellingAngle}</p>}
                        {product.viralPotential && <p className="text-[11px] text-slate-300 leading-snug">🔥 <span className="text-slate-500">Viral:</span> {product.viralPotential}</p>}
                      </div>
                    )}

                    <p className="text-sm text-slate-400 mb-4 leading-relaxed line-clamp-2">{product.description}</p>

                    {/* Pricing Row */}
                    <div className="grid grid-cols-3 gap-3 mb-4 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">Wholesale</p>
                        <p className="text-sm font-medium text-slate-300">{product.wholesalePrice}</p>
                      </div>
                      <div className="text-center border-x border-white/5">
                        <p className="text-xs text-slate-500 mb-1">Retail</p>
                        <p className="text-sm font-medium text-white">{product.retailPrice}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">Margin</p>
                        <p className="text-sm font-bold text-green-400">{product.profitMargin}</p>
                      </div>
                    </div>

                    {/* Google Trends Insight */}
                    {product.googleTrendsInsight && product.googleTrendsInsight !== 'Data pending' && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 mb-4">
                        <Globe2 className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-300 leading-relaxed">{product.googleTrendsInsight}</p>
                      </div>
                    )}

                    {/* Suppliers */}
                    {product.suppliers && product.suppliers.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Truck className="h-4 w-4 text-orange-400" />
                          <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Suppliers ({product.suppliers.length})</p>
                        </div>
                        <div className="space-y-1">
                          {product.suppliers.slice(0, expandedCard === i ? 10 : 3).map((s, j) => (
                            <a 
                              key={j} 
                              href={s.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-2 text-xs text-slate-400 bg-white/[0.02] p-2 rounded-md border border-white/5 hover:bg-orange-500/10 hover:border-orange-500/20 hover:text-orange-400 transition-colors"
                            >
                              <ExternalLink className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{s.name}</span>
                            </a>
                          ))}
                          {product.suppliers.length > 3 && expandedCard !== i && (
                            <p className="text-xs text-orange-400 mt-1 cursor-pointer hover:underline">+{product.suppliers.length - 3} more — click to expand</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Competitor Sales Data */}
                    {product.competitorLinks && product.competitorLinks.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart className="h-4 w-4 text-emerald-400" />
                          <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Competitor Sales</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {product.competitorLinks.slice(0, expandedCard === i ? 10 : 2).map((link, j) => (
                            <a 
                              key={j} 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex flex-col gap-1 text-xs text-slate-400 bg-emerald-500/5 p-2.5 rounded-md border border-emerald-500/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-300 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-emerald-400">{link.platform}</span>
                                <ExternalLink className="h-3 w-3" />
                              </div>
                              <span className="text-[10px] text-slate-500 leading-tight">{link.note}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {expandedCard === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          {/* Real Google Trends Data */}
                          {product.googleTrendsData && (
                            <div className="mb-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                              <p className="text-xs font-semibold text-blue-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                                <Globe2 className="h-3.5 w-3.5" />
                                Real Google Trends Data
                              </p>
                              <div className="grid grid-cols-3 gap-3 mb-3">
                                <div className="text-center p-2 rounded-md bg-white/[0.03]">
                                  <p className="text-lg font-bold text-white">{product.googleTrendsData.averageInterest}</p>
                                  <p className="text-xs text-slate-500">Avg Interest</p>
                                </div>
                                <div className="text-center p-2 rounded-md bg-white/[0.03]">
                                  <p className="text-lg font-bold text-white">{product.googleTrendsData.peakInterest}</p>
                                  <p className="text-xs text-slate-500">Peak</p>
                                </div>
                                <div className="text-center p-2 rounded-md bg-white/[0.03]">
                                  <p className={`text-lg font-bold capitalize ${
                                    product.googleTrendsData.trendDirection === 'rising' ? 'text-green-400' :
                                    product.googleTrendsData.trendDirection === 'declining' ? 'text-red-400' : 'text-slate-300'
                                  }`}>{product.googleTrendsData.trendDirection}</p>
                                  <p className="text-xs text-slate-500">Direction</p>
                                </div>
                              </div>
                              {product.googleTrendsData.risingQueries && product.googleTrendsData.risingQueries.length > 0 && (
                                <div>
                                  <p className="text-xs text-slate-400 mb-1.5">🔥 Rising Related Searches:</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {product.googleTrendsData.risingQueries.slice(0, 6).map((q, j) => (
                                      <span key={j} className="text-xs bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/20">{q}</span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Why It Works */}
                          <div className="mb-4 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                            <p className="text-xs font-semibold text-slate-300 mb-1">Why It Works</p>
                            <p className="text-sm text-slate-400">{product.whyItWorks}</p>
                          </div>

                          {/* Marketing Tips */}
                          {product.marketingTips && product.marketingTips.length > 0 && (
                            <div className="mb-4">
                              <p className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">Marketing Tips</p>
                              <div className="space-y-1">
                                {product.marketingTips.map((tip, j) => (
                                  <div key={j} className="flex items-start gap-2 text-xs text-slate-400">
                                    <span className="text-orange-400 mt-0.5">▸</span>
                                    {tip}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Target Audience */}
                          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                            <p className="text-xs font-semibold text-slate-300 mb-1">Target Audience</p>
                            <p className="text-sm text-slate-400">{product.targetAudience}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Platforms */}
                    {product.platforms && product.platforms.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 mt-auto border-t border-white/5">
                        {product.platforms.map((p, j) => (
                          <span key={j} className="text-xs bg-white/5 px-2 py-0.5 rounded text-slate-400">{p}</span>
                        ))}
                      </div>
                    )}
                  </MagicCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Cards - show only when no results */}
      {!results && !isSearching && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <MagicCard className="p-6 text-center flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/20">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Multi-AI Consensus</h3>
              <p className="text-sm text-slate-400">5 AI providers (Groq, Gemini, DeepSeek, Qwen, Llama) analyze in parallel and merge their insights into one consensus.</p>
            </MagicCard>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <MagicCard className="p-6 text-center flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4 border border-orange-500/20">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Real Suppliers</h3>
              <p className="text-sm text-slate-400">Every product comes with 3-4+ verified supplier sources from AliExpress, Alibaba, CJ Dropshipping, and more.</p>
            </MagicCard>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <MagicCard className="p-6 text-center flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 mb-4 border border-green-500/20">
                <Globe2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Google Trends Data</h3>
              <p className="text-sm text-slate-400">Each analysis includes Google Trends insights — search volume, seasonal peaks, and regional demand.</p>
            </MagicCard>
          </motion.div>
        </div>
      )}
    </div>
  );
}
