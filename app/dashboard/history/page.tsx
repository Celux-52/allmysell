"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Search, ArrowRight, Trash2, Clock } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Storage, SearchHistoryItem } from "@/lib/storage";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
        setHistory(Storage.getHistory(user.email));
      }
    };
    init();
  }, []);

  const handleClearHistory = () => {
    if (!userEmail) return;
    Storage.clearHistory(userEmail);
    setHistory([]);
  };

  const formatRelativeTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return date.toLocaleDateString();
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
          <p className="text-slate-400 mt-1">View your past product research queries and consensus runs.</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={handleClearHistory}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
          >
            <Trash2 className="h-4 w-4" /> Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
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
        <div className="space-y-4">
          <AnimatePresence>
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="p-4 rounded-xl border border-white/5 bg-[#080c16] hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 mt-1 sm:mt-0 flex-shrink-0">
                      <Search className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-white mb-1">"{item.query}"</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {formatRelativeTime(item.timestamp)}</span>
                        <span>•</span>
                        <span className="text-slate-400">{item.resultCount} products analyzed</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => router.push(`/dashboard/research?q=${encodeURIComponent(item.query)}`)}
                    className="flex-shrink-0 text-sm bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors border border-white/10 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    Run Again
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
