"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, Wand2, Database, Loader2, Plus, Zap } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { useState } from "react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

export default function ResearchPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 2000);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <AnimatedGradientText className="mb-4">
          <span className="flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-orange-400" />
            AI Researcher
          </span>
        </AnimatedGradientText>
        <h1 className="text-4xl font-bold text-white tracking-tight">Smart Product Research</h1>
        <p className="text-lg text-slate-400">Describe what you're looking for, and our AI will scrape, analyze, and present the best product opportunities across the web.</p>
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
              disabled={isSearching || !query}
              className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-500 hover:to-amber-500 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20">
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
    </div>
  );
}
