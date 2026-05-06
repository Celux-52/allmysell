"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Search, ArrowRight, Trash2, Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Storage, SearchHistoryItem } from "@/lib/storage";
import { EtsyStorage, EtsySearchHistoryItem } from "@/modules/etsy-automation/services/etsyStorage";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [etsyHistory, setEtsyHistory] = useState<EtsySearchHistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<'research' | 'etsy'>('research');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
        setHistory(Storage.getHistory(user.email));
        setEtsyHistory(EtsyStorage.getHistory(user.email));
      }
    };
    init();
  }, []);

  const handleClearHistory = () => {
    if (!userEmail) return;
    if (activeTab === 'research') {
      Storage.clearHistory(userEmail);
      setHistory([]);
    } else {
      EtsyStorage.clearHistory(userEmail);
      setEtsyHistory([]);
    }
  };

  const formatRelativeTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 172800) return "Yesterday";
    return date.toLocaleDateString();
  };

  // Find if same query was run before (for trend comparison)
  const getTrend = (item: SearchHistoryItem, index: number) => {
    const sameQueryItems = history.filter((h, i) => i > index && h.query.toLowerCase() === item.query.toLowerCase());
    if (sameQueryItems.length === 0) return null; // first time
    const prevScore = sameQueryItems[0].topScore || 0;
    const currentScore = item.topScore || 0;
    if (currentScore > prevScore) return 'up';
    if (currentScore < prevScore) return 'down';
    return 'same';
  };

  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <AnimatedGradientText className="mb-2 !mx-0 !justify-start">
            <span className="flex items-center gap-2">
              <History className="h-4 w-4 text-orange-400" />
              Activity
            </span>
          </AnimatedGradientText>
          <h1 className="text-3xl font-bold text-white">Search History</h1>
          <p className="text-slate-400 mt-1">Track your research queries and spot trends over time.</p>
        </div>
        {(activeTab === 'research' ? history.length > 0 : etsyHistory.length > 0) && (
          <button 
            onClick={handleClearHistory}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
          >
            <Trash2 className="h-4 w-4" /> Clear History
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-black/40 border border-white/5 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('research')}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'research' 
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Smart Research
        </button>
        <button
          onClick={() => setActiveTab('etsy')}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'etsy' 
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Etsy Automation
        </button>
      </div>

      {activeTab === 'research' && (
        history.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/5 bg-[#080c16] p-12 text-center"
        >
          <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
            <Search className="h-8 w-8 text-slate-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No research history</h2>
          <p className="text-slate-400 mb-6 max-w-sm mx-auto">Your recent product searches using the Smart AI Consensus Engine will appear here.</p>
          <Link href="/dashboard/research" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg text-white font-medium hover:from-orange-500 hover:to-amber-500 transition-colors shadow-lg shadow-orange-500/20">
            Run a Search <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {history.map((item, index) => {
              const trend = getTrend(item, index);
              return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                transition={{ delay: index * 0.03 }}
              >
                <div className="p-4 rounded-xl border border-white/5 bg-[#080c16] hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 mt-1 sm:mt-0 flex-shrink-0">
                      <Search className="h-5 w-5 text-orange-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-medium text-white mb-1 truncate">&quot;{item.query}&quot;</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {formatRelativeTime(item.timestamp)}</span>
                        <span>•</span>
                        <span className="text-slate-400">{item.resultCount} products</span>
                        {(item.topScore > 0) && (
                          <>
                            <span>•</span>
                            <span className="text-amber-400 font-medium">Top Score: {item.topScore}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Trend Indicator */}
                    {trend && (
                      <div className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${
                        trend === 'up' ? 'text-green-400 bg-green-500/10 border-green-500/20' :
                        trend === 'down' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
                        'text-slate-400 bg-white/5 border-white/10'
                      }`}>
                        {trend === 'up' && <><TrendingUp className="h-3 w-3" /> Better</>}
                        {trend === 'down' && <><TrendingDown className="h-3 w-3" /> Lower</>}
                        {trend === 'same' && <><Minus className="h-3 w-3" /> Same</>}
                      </div>
                    )}
                    <button 
                      onClick={() => router.push(`/dashboard/research?q=${encodeURIComponent(item.query)}`)}
                      className="flex-shrink-0 text-sm bg-white/5 hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-500/20 text-white px-4 py-2 rounded-lg transition-colors border border-white/10 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      Run Again
                    </button>
                  </div>
                </div>
              </motion.div>
            );})}
          </AnimatePresence>
        </div>
      )}

      {activeTab === 'etsy' && (
        etsyHistory.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/5 bg-[#080c16] p-12 text-center"
          >
            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Search className="h-8 w-8 text-slate-500" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No Etsy history</h2>
            <p className="text-slate-400 mb-6 max-w-sm mx-auto">Your recent Etsy product snipes will appear here.</p>
            <Link href="/dashboard/saas/etsy" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg text-white font-medium hover:from-orange-500 hover:to-amber-500 transition-colors shadow-lg shadow-orange-500/20">
              Snipe a Product <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {etsyHistory.map((item, index) => {
                return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  transition={{ delay: index * 0.03 }}
                >
                  <div className="p-4 rounded-xl border border-white/5 bg-[#080c16] hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 mt-1 sm:mt-0 flex-shrink-0">
                        <Search className="h-5 w-5 text-orange-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-medium text-white mb-1 truncate">&quot;{item.query}&quot;</h3>
                        <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {formatRelativeTime(item.timestamp)}</span>
                          {item.decision && (
                            <>
                              <span>•</span>
                              <span className={`font-bold ${item.decision === 'SELL' ? 'text-green-400' : 'text-red-400'}`}>
                                {item.decision}
                              </span>
                            </>
                          )}
                          {item.trendScore !== null && (
                            <>
                              <span>•</span>
                              <span className="text-amber-400 font-medium">Trend: {item.trendScore}/100</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <button 
                        onClick={() => router.push(`/dashboard/saas/etsy?q=${encodeURIComponent(item.query)}`)}
                        className="flex-shrink-0 text-sm bg-white/5 hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-500/20 text-white px-4 py-2 rounded-lg transition-colors border border-white/10 sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        Run Again
                      </button>
                    </div>
                  </div>
                </motion.div>
              );})}
            </AnimatePresence>
          </div>
        )
      )}
    </div>
  );
}
