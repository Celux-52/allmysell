"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Wand2, Database, Loader2, Plus, Zap, ArrowUp, Star, AlertCircle, TrendingUp } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { useState } from "react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

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
  marketingTips: string[];
  sources: string[];
}

interface ResearchResults {
  products: Product[];
  summary: string;
}

export default function ResearchPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResearchResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [engine, setEngine] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || query.trim().length < 3) return;
    
    setIsSearching(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/ai/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), mode: "product" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      if (data.success && data.results) {
        setResults(data.results);
        setEngine(data.engine || null);
      } else {
        setError("No results found. Try a different query.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-orange-400";
    return "text-slate-400";
  };

  const getCompetitionColor = (c: string) => {
    if (c === "Low") return "text-green-400 bg-green-500/10 border-green-500/20";
    if (c === "Medium") return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-red-400 bg-red-500/10 border-red-500/20";
  };

  const getTrendIcon = (t: string) => {
    if (t === "Rising") return <TrendingUp className="h-3 w-3 text-green-400" />;
    if (t === "Declining") return <ArrowUp className="h-3 w-3 text-red-400 rotate-180" />;
    return <span className="h-3 w-3 text-slate-400">—</span>;
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
        <AnimatedGradientText className="mb-4">
          <span className="flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-orange-400" />
            AI Researcher
          </span>
        </AnimatedGradientText>
        <h1 className="text-4xl font-bold text-white tracking-tight">Smart Product Research</h1>
        <p className="text-lg text-slate-400">Describe what you&apos;re looking for, and our AI will analyze and present the best product opportunities.</p>
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
              {isSearching ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </form>

        <div className="flex gap-3 justify-center mt-6 flex-wrap">
          <span className="text-sm text-slate-500 px-3 py-1">Try asking:</span>
          {["Trending personalized jewelry", "Bestselling phone cases 2026", "Low competition desk gadgets"].map((suggestion) => (
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

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Display */}
      <AnimatePresence>
        {results && results.products && results.products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto space-y-6"
          >
            {/* Summary */}
            <div className="p-6 rounded-xl border border-white/10 bg-[#080c16]">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-white">Market Analysis Summary</h2>
                {engine && (
                  <span className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-full text-slate-400">
                    Powered by {engine.charAt(0).toUpperCase() + engine.slice(1)}
                  </span>
                )}
              </div>
              <p className="text-slate-400 leading-relaxed">{results.summary}</p>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.products.map((product, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <MagicCard className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`text-3xl font-extrabold ${getScoreColor(product.score)}`}>
                        {product.score}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {getTrendIcon(product.trend)}
                        <span className="text-xs text-slate-400">{product.trend}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                    <p className="text-sm text-slate-500 mb-3">{product.category}</p>
                    <p className="text-sm text-slate-400 mb-4 leading-relaxed flex-1">{product.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Wholesale</span>
                        <span className="text-slate-300 font-medium">{product.wholesalePrice}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Retail</span>
                        <span className="text-white font-medium">{product.retailPrice}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Margin</span>
                        <span className="text-green-400 font-bold">{product.profitMargin}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getCompetitionColor(product.competition)}`}>
                        {product.competition} Competition
                      </span>
                    </div>

                    {product.platforms && product.platforms.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                        {product.platforms.map((p, j) => (
                          <span key={j} className="text-xs bg-white/5 px-2 py-0.5 rounded text-slate-400">
                            {p}
                          </span>
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

      {/* Feature Cards - show when no results */}
      {!results && !isSearching && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <MagicCard className="p-6 text-center flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/20">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Deep Web Scraping</h3>
              <p className="text-sm text-slate-400">Pulls data from multiple marketplaces, supplier databases, and social trends simultaneously.</p>
            </MagicCard>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <MagicCard className="p-6 text-center flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4 border border-orange-500/20">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instant Analysis</h3>
              <p className="text-sm text-slate-400">Evaluates competition, estimated margins, and historical sales volume in seconds.</p>
            </MagicCard>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <MagicCard className="p-6 text-center flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 mb-4 border border-green-500/20">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">One-Click Import</h3>
              <p className="text-sm text-slate-400">Send winning products directly to your saved list or automate listing creation.</p>
            </MagicCard>
          </motion.div>
        </div>
      )}
    </div>
  );
}
