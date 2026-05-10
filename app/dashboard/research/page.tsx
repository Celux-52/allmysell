"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Brain, Truck, Globe2, Loader2, AlertCircle, TrendingUp, BarChart3, Zap, ArrowRight, ShieldCheck, Store, ExternalLink, AlertTriangle, Info, Radio } from "lucide-react";
import { useState } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

export default function ResearchDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [researchData, setResearchData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Research failed.");
      setResearchData(data.results);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Trending personalized jewelry",
    "Bestselling phone cases 2026",
    "Low competition desk gadgets",
    "High margin pet accessories"
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 space-y-4 max-w-3xl"
      >
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            Multi-AI Consensus Engine
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          Smart Product <span className="text-orange-500">Research</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
          All AI models analyze your query simultaneously, cross-reference Google Trends, 
          and deliver a consensus with real supplier data.
        </p>
      </motion.div>

      {/* Search Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-3xl mb-12"
      >
        <form onSubmit={handleResearch} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-[#0d1117] border border-white/10 rounded-2xl p-2 focus-within:border-orange-500/50 transition-all shadow-2xl">
            <div className="pl-4 pr-2">
              <Search className="h-6 w-6 text-slate-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. 'high margin tech accessories on Etsy under $50'"
              className="flex-1 bg-transparent border-none outline-none text-white text-lg py-3 placeholder:text-slate-600"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Analyze
                </>
              )}
            </button>
          </div>
        </form>

        {/* Suggestions */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="text-slate-500 text-sm py-1">Try asking:</span>
          {suggestions.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 hover:text-white hover:border-white/20 transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Feature Grid */}
      {!researchData && !isLoading && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
        >
          <MagicCard className="p-8 text-center flex flex-col items-center space-y-4">
            <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400">
              <Brain className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Multi-AI Consensus</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              5 AI providers (Groq, Gemini, DeepSeek, Qwen, Claude) analyze in parallel and merge their insights into one consensus.
            </p>
          </MagicCard>

          <MagicCard className="p-8 text-center flex flex-col items-center space-y-4">
            <div className="p-4 rounded-2xl bg-orange-500/10 text-orange-400">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Semantic Supplier Match</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI-powered supplier matching uses embeddings to find products with ≥75% semantic similarity — no more random results.
            </p>
          </MagicCard>

          <MagicCard className="p-8 text-center flex flex-col items-center space-y-4">
            <div className="p-4 rounded-2xl bg-green-500/10 text-green-400">
              <Globe2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Google Trends Data</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Each analysis includes Google Trends insights — search volume, seasonal peaks, and regional demand.
            </p>
          </MagicCard>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="w-full max-w-xl mx-auto text-center space-y-6">
          <div className="relative rounded-2xl border border-white/10 bg-[#0d1117] p-12 overflow-hidden shadow-2xl">
            <BorderBeam size={400} duration={4} colorFrom="#f97316" colorTo="#fbbf24" />
            <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">Engines Firing Up</h3>
            <p className="text-slate-400">Querying 5 AI models and fetching real-time market data...</p>
            
            <div className="mt-8 space-y-3">
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
                />
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-slate-600">
                <span>Gathering Intelligence</span>
                <span>85% Complete</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Research Results Display */}
      {researchData && !isLoading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-6xl space-y-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Research Complete</h2>
            <button onClick={() => setResearchData(null)} className="text-sm font-bold text-orange-500 hover:text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 px-4 py-2 rounded-xl transition-all">Start New Search</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {researchData.products?.map((product: any, idx: number) => {
              const profitScore = parseInt(product.profitMargin) || 75;
              const competeScore = product.competition?.toLowerCase().includes('low') ? 25 : product.competition?.toLowerCase().includes('high') ? 85 : 55;
              const isRising = product.trend?.toLowerCase().includes('rising');
              
              return (
                <div key={idx} className={`bg-[#0b0f19] border rounded-3xl p-6 relative overflow-hidden group transition-all ${product.doNotBuild ? 'border-red-500/30 hover:border-red-500/50' : 'border-white/5 hover:border-orange-500/20'}`}>
                  <div className={`absolute inset-0 ${product.doNotBuild ? 'bg-gradient-to-br from-red-500/5 to-transparent opacity-100' : 'bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100'} transition-duration-500 pointer-events-none`}></div>
                  
                  {/* ⛔ DO NOT BUILD Banner */}
                  {product.doNotBuild && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6 flex gap-3 items-start relative z-10">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-400 font-black text-sm uppercase tracking-wider">⛔ DO NOT BUILD</p>
                        <p className="text-red-300/70 text-xs mt-1 leading-relaxed">{product.doNotBuildReason || 'High competition, low margin, declining trend detected.'}</p>
                      </div>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4 items-center">
                      <span className={`font-black text-3xl ${product.doNotBuild ? 'text-red-500' : 'text-orange-500'}`}>{product.score}</span>
                      <div>
                        <h3 className={`font-bold text-xl leading-tight line-clamp-1 ${product.doNotBuild ? 'text-red-300/80 line-through' : 'text-white'}`}>{product.name}</h3>
                        <p className="text-slate-500 text-xs uppercase tracking-widest">{product.category}</p>
                      </div>
                    </div>
                  </div>

                  {/* 📊 Reality Layer: Confidence + Data Source + Traffic */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full border flex items-center gap-1 ${
                      product.confidenceLevel === 'high' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                      product.confidenceLevel === 'low' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                      'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                    }`}>
                      <Info className="w-3 h-3" /> {product.confidencePercent || '?'}% Confidence
                    </span>
                    {product.dataSource && (
                      <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {product.dataSource}
                      </span>
                    )}
                    {product.trafficSource && (
                      <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                        <Radio className="w-3 h-3" /> {product.trafficSource}
                      </span>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="flex justify-between items-center mb-6">
                     <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold rounded-full">
                       {product.competition} Competition
                     </span>
                     <span className={`px-3 py-1 border text-xs font-bold rounded-full flex items-center gap-1 ${isRising ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                       {isRising ? '↑ Rising' : '↓ Declining'}
                     </span>
                  </div>

                  {/* Progress Bars */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                     <div className="space-y-2">
                       <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold"><span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-green-400"/> Profit</span></div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-green-400 to-emerald-400" style={{ width: `${profitScore}%` }}></div></div>
                       <div className="text-[10px] text-slate-500">{profitScore}</div>
                     </div>
                     <div className="space-y-2">
                       <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold"><span className="flex items-center gap-1"><Zap className="w-3 h-3 text-orange-400"/> Compete</span></div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-orange-400 to-amber-400" style={{ width: `${competeScore}%` }}></div></div>
                       <div className="text-[10px] text-slate-500">{competeScore}</div>
                     </div>
                     <div className="space-y-2">
                       <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold"><span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-purple-400"/> Opportunity</span></div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-purple-400 to-indigo-400" style={{ width: `${product.score}%` }}></div></div>
                       <div className="text-[10px] text-slate-500">{product.score}</div>
                     </div>
                  </div>

                  {/* Why it will sell */}
                  <div className="bg-[#121826] rounded-2xl p-4 mb-6 border border-white/5">
                    <h4 className="text-orange-400 text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-3">
                       <Sparkles className="w-3 h-3"/> WHY THIS WILL SELL
                    </h4>
                    <p className="text-sm text-slate-300 flex gap-2"><span className="text-pink-400">🎯</span> <span className="font-bold text-slate-400">Target:</span> {product.targetAudience}</p>
                  </div>

                  <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">{product.description}</p>

                  {/* 💰 Pricing Table — Gross vs Real Profit */}
                  <div className="bg-white/5 rounded-2xl p-4 mb-4 border border-white/5">
                     <div className="grid grid-cols-4 gap-2 text-center">
                       <div>
                         <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Wholesale</p>
                         <p className="text-white font-bold">{product.wholesalePrice}</p>
                       </div>
                       <div>
                         <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Retail</p>
                         <p className="text-white font-bold">{product.retailPrice}</p>
                       </div>
                       <div>
                         <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Gross</p>
                         <p className="text-yellow-400 font-bold">{product.profitMargin}</p>
                       </div>
                       <div>
                         <p className="text-[10px] text-green-400 uppercase tracking-widest mb-1 font-black">NET Profit</p>
                         <p className="text-green-400 font-black text-lg">{product.realProfitMargin || product.profitMargin}</p>
                       </div>
                     </div>
                     {product.platformFees && (
                       <p className="text-[10px] text-slate-600 text-center mt-3 border-t border-white/5 pt-2 italic">
                         💸 {product.platformFees}
                       </p>
                     )}
                  </div>

                  {/* ⚠️ Failure Risks */}
                  {product.failureRisks && product.failureRisks.length > 0 && (
                    <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-3 mb-6">
                      <h4 className="text-red-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 mb-2">
                        <AlertTriangle className="w-3 h-3" /> FAILURE RISKS
                      </h4>
                      <ul className="space-y-1">
                        {product.failureRisks.map((risk: string, i: number) => (
                          <li key={i} className="text-[11px] text-red-300/60 leading-relaxed">• {risk}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 💀 Failure Mode Analysis (Faz 2) */}
                  {product.failureModes && product.failureModes.length > 0 && (
                    <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 mb-6">
                      <h4 className="text-amber-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 mb-3">
                        💀 FAILURE MODE ANALYSIS
                      </h4>
                      <div className="space-y-2">
                        {product.failureModes.map((mode: any, i: number) => (
                          <div key={i} className="flex items-start gap-3 bg-black/20 rounded-lg p-2.5 border border-white/5">
                            <span className={`px-1.5 py-0.5 text-[9px] font-black uppercase rounded ${
                              mode.likelihood === 'High' ? 'bg-red-500/20 text-red-400' :
                              mode.likelihood === 'Low' ? 'bg-green-500/20 text-green-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>{mode.likelihood}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] text-slate-300 leading-relaxed">{mode.scenario}</p>
                              <p className="text-[10px] text-slate-500 mt-0.5 italic">Impact: {mode.impact}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 🧬 Saturation & Copycat Risk (Faz 2) */}
                  {(product.saturationIndex !== undefined || product.copycatRisk !== undefined) && (
                    <div className="bg-white/5 border border-white/5 rounded-xl p-4 mb-6">
                      <h4 className="text-cyan-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 mb-4">
                        🧬 MARKET SATURATION & CLONE RISK
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-slate-400 font-bold">Saturation Index</span>
                            <span className={`font-black ${(product.saturationIndex || 0) > 70 ? 'text-red-400' : (product.saturationIndex || 0) > 40 ? 'text-yellow-400' : 'text-green-400'}`}>{product.saturationIndex || 0}/100</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${(product.saturationIndex || 0) > 70 ? 'bg-gradient-to-r from-red-500 to-red-400' : (product.saturationIndex || 0) > 40 ? 'bg-gradient-to-r from-yellow-500 to-amber-400' : 'bg-gradient-to-r from-green-500 to-emerald-400'}`} style={{ width: `${product.saturationIndex || 0}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-slate-400 font-bold">Copycat Risk</span>
                            <span className={`font-black ${(product.copycatRisk || 0) > 70 ? 'text-red-400' : (product.copycatRisk || 0) > 40 ? 'text-yellow-400' : 'text-green-400'}`}>{product.copycatRisk || 0}/100</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${(product.copycatRisk || 0) > 70 ? 'bg-gradient-to-r from-red-500 to-red-400' : (product.copycatRisk || 0) > 40 ? 'bg-gradient-to-r from-yellow-500 to-amber-400' : 'bg-gradient-to-r from-green-500 to-emerald-400'}`} style={{ width: `${product.copycatRisk || 0}%` }}></div>
                          </div>
                        </div>
                        {product.saturationNote && (
                          <p className="text-[10px] text-slate-500 italic mt-2 leading-relaxed">{product.saturationNote}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ⏱ Trend Lifespan & Scalability (Faz 3) */}
                  {(product.trendLifespan || product.scalabilityScore !== undefined) && (
                    <div className="bg-white/5 border border-white/5 rounded-xl p-4 mb-6">
                      <h4 className="text-indigo-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 mb-4">
                        ⏱ TREND LIFESPAN & SCALABILITY
                      </h4>
                      <div className="flex items-center gap-3 mb-4">
                        {product.trendLifespan && (
                          <span className={`px-3 py-1.5 text-xs font-black uppercase rounded-full border ${
                            product.trendLifespan === 'Evergreen' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                            product.trendLifespan === 'Fad' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                            'bg-blue-500/10 border-blue-500/20 text-blue-400'
                          }`}>
                            {product.trendLifespan === 'Evergreen' ? '🌲' : product.trendLifespan === 'Fad' ? '💨' : '📅'} {product.trendLifespan}
                          </span>
                        )}
                        {product.trendLifespanNote && (
                          <p className="text-[10px] text-slate-500 italic flex-1">{product.trendLifespanNote}</p>
                        )}
                      </div>
                      {product.scalabilityScore !== undefined && (
                        <div>
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-slate-400 font-bold">Scalability (Brand Potential)</span>
                            <span className={`font-black ${product.scalabilityScore > 70 ? 'text-green-400' : product.scalabilityScore > 40 ? 'text-yellow-400' : 'text-red-400'}`}>{product.scalabilityScore}/100</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${product.scalabilityScore > 70 ? 'bg-gradient-to-r from-indigo-500 to-purple-400' : product.scalabilityScore > 40 ? 'bg-gradient-to-r from-yellow-500 to-amber-400' : 'bg-gradient-to-r from-red-500 to-red-400'}`} style={{ width: `${product.scalabilityScore}%` }}></div>
                          </div>
                          {product.scalabilityNote && (
                            <p className="text-[10px] text-slate-500 italic mt-2">{product.scalabilityNote}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Trends & Suppliers */}
                  <div className="space-y-4">
                     <div className="flex gap-3 bg-blue-500/5 border border-blue-500/10 rounded-xl p-4">
                       <Globe2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                       <p className="text-xs text-blue-200 leading-relaxed">{product.googleTrendsInsight}</p>
                     </div>

                     <div className="pt-4 border-t border-white/5">
                       <h4 className="text-orange-400 text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-3">
                         <Truck className="w-4 h-4"/> SUPPLIERS ({product.suppliers?.length || 0})
                       </h4>
                       <div className="space-y-2 mb-4">
                         {product.suppliers?.slice(0,3).map((sup: any, i: number) => (
                           <a key={i} href={sup.url} target="_blank" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
                             <ArrowRight className="w-3 h-3" /> {sup.name}
                           </a>
                         ))}
                       </div>

                       <h4 className="text-pink-400 text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-3 mt-6">
                         <Store className="w-4 h-4"/> MARKETPLACE SPY
                       </h4>
                       <div className="flex flex-wrap gap-2">
                         {product.competitorLinks?.slice(0,4).map((comp: any, i: number) => (
                           <a key={i} href={comp.url} target="_blank" className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-pink-500/30 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-pink-500/10 transition-all flex items-center gap-1.5 shadow-sm shadow-black/20">
                             <ExternalLink className="w-3 h-3" /> {comp.platform}
                           </a>
                         ))}
                       </div>
                     </div>
                  </div>

                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
