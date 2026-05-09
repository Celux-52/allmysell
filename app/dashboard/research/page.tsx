"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Brain, Truck, Globe2, Loader2, AlertCircle, TrendingUp, BarChart3, Zap, ArrowRight, ShieldCheck } from "lucide-react";
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
          {/* Result cards would go here */}
          <div className="p-8 rounded-2xl border border-white/10 bg-[#0d1117] text-center">
             <h2 className="text-2xl font-bold text-white mb-4">Research Complete</h2>
             <p className="text-slate-400">Analysis for &quot;{searchQuery}&quot; is ready.</p>
             {/* Simplified for now to match UI focus */}
             <button onClick={() => setResearchData(null)} className="mt-4 text-orange-500 hover:underline">Start New Search</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
