"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { TrendingUp, BarChart, Search, Filter, Loader2, AlertCircle, Globe2, Sparkles, Shield, Brain, Info, Zap } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { useState, useEffect } from "react";
import { ViralTrendFeed } from "@/components/research/ViralTrendFeed";

export default function ResearchDashboard() {
  const [activeTab, setActiveTab] = useState<'market' | 'viral'>('market');
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trendData, setTrendData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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
      if (!res.ok) throw new Error(data.error || "Failed to load trends.");
      if (data.success) setTrendData(data.trends);
    } catch (e: any) {
      setError(e.message || "Network error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <AnimatedGradientText className="mb-2 !mx-0 !justify-start">
            <span className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-400" />
              Smart Research Engine
            </span>
          </AnimatedGradientText>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            AI Research <span className="text-orange-500">Cockpit</span>
          </h1>
          <p className="text-slate-400 mt-1">
            Analyze market trends and discover viral products autonomously.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#080c16] border border-white/10 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('market')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'market' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Market Trends
          </button>
          <button
            onClick={() => setActiveTab('viral')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'viral' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Viral Feed
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'viral' ? (
          <motion.div key="viral" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <ViralTrendFeed />
          </motion.div>
        ) : (
          <motion.div key="market" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
            <div className="flex gap-3 justify-end">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Analyze niche..."
                  className="pl-9 pr-4 py-2 bg-[#080c16] border border-white/10 rounded-lg text-sm text-white focus:border-orange-500/50 outline-none w-64"
                />
              </div>
              <button onClick={() => fetchTrends(searchQuery)} className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors">
                Run AI Scan
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-3">
                <AlertCircle className="h-5 w-5" /> {error}
              </div>
            )}

            {isLoading && (
              <div className="relative rounded-2xl border border-white/10 bg-[#080c16] p-12 text-center overflow-hidden">
                <BorderBeam size={300} duration={4} colorFrom="#f97316" colorTo="#fbbf24" />
                <Loader2 className="h-10 w-10 animate-spin text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Deep Scanning Market...</h3>
                <p className="text-sm text-slate-400">Our AI agents are cross-referencing live data sources.</p>
              </div>
            )}

            {trendData && !isLoading && (
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {trendData.categories.map((cat: any, i: number) => (
                   <MagicCard key={i} className="p-6">
                     <div className="flex items-center gap-2 mb-4">
                       <span className="text-2xl">{cat.emoji}</span>
                       <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                     </div>
                     <div className="space-y-3">
                       {cat.trends.map((trend: any, j: number) => (
                         <div key={j} className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                           <div className="flex justify-between mb-1">
                             <span className="text-sm font-medium text-white">{trend.keyword}</span>
                             <span className="text-xs font-bold text-green-400">{trend.growth}</span>
                           </div>
                           <p className="text-xs text-slate-400">{trend.insight}</p>
                         </div>
                       ))}
                     </div>
                   </MagicCard>
                 ))}
               </div>
            )}

            {!trendData && !isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-8 bg-[#080c16] border-white/10 flex flex-col items-center text-center">
                  <BarChart className="h-12 w-12 text-orange-500/50 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Market Sentiment</h3>
                  <p className="text-slate-400 text-sm mb-6">Enter a niche above to run a deep AI analysis on current market demand.</p>
                  <button onClick={() => fetchTrends()} className="text-orange-500 text-sm font-bold flex items-center gap-2 hover:underline">
                    Quick Global Scan <ArrowRight className="h-4 w-4" />
                  </button>
                </Card>
                <div className="p-8 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
                  <Sparkles className="h-10 w-10 text-slate-700 mb-4" />
                  <p className="text-slate-500 text-sm">Waiting for your first command...</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`rounded-2xl border ${className}`}>
      {children}
    </div>
  );
}

function ArrowRight(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  );
}
