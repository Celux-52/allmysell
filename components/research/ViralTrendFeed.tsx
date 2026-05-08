"use client";

import { motion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { Play, Sparkles, TrendingUp, Users, Target, MessageSquare, ExternalLink, Calendar, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface AutoTrend {
  id: string;
  title: string;
  content: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  platform: string;
  views: number;
  consensusScore: number;
  insights: {
    whyItWorks: string;
    targetAudience: string;
    marketingTips: string[];
    aiSummary: string;
  };
  createdAt: string;
}

export function ViralTrendFeed() {
  const [trends, setTrends] = useState<AutoTrend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTrend, setSelectedTrend] = useState<AutoTrend | null>(null);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const res = await fetch("/api/dashboard/auto-trends");
        const data = await res.json();
        if (data.success) {
          setTrends(data.trends);
        }
      } catch (error) {
        console.error("Failed to fetch auto trends:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTrends();
  }, []);

  const formatViews = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-96 rounded-2xl bg-white/5 animate-pulse border border-white/10" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trends.map((trend, i) => (
          <motion.div
            key={trend.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <MagicCard className="overflow-hidden group cursor-pointer" onClick={() => setSelectedTrend(trend)}>
              {/* Video Thumbnail / Platform Badge */}
              <div className="relative aspect-video bg-black/40 overflow-hidden">
                {trend.thumbnailUrl ? (
                  <img src={trend.thumbnailUrl} alt={trend.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Play className="h-12 w-12 text-white/20" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-xs py-1">
                    {trend.platform}
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3">
                  <Badge className="bg-orange-500 text-white border-none text-xs font-bold py-1 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    {trend.consensusScore}% Score
                  </Badge>
                </div>
                {/* Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                  <div className="p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                    <Play className="h-6 w-6 text-white fill-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> {formatViews(trend.views)} Views
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {new Date(trend.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-bold text-white line-clamp-2 leading-snug group-hover:text-orange-400 transition-colors">
                  {trend.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {trend.insights.whyItWorks}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-6 w-6 rounded-full border-2 border-[#080c16] bg-slate-800 flex items-center justify-center text-[8px] font-bold text-white">
                        AI
                      </div>
                    ))}
                    <div className="h-6 px-2 rounded-full border-2 border-[#080c16] bg-slate-900 flex items-center justify-center text-[8px] text-slate-400">
                      Consensus
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            </MagicCard>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal (Simplified implementation) */}
      {selectedTrend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0b1221] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-black flex items-center justify-center aspect-[9/16] md:aspect-auto min-h-[400px]">
                {/* Embedded Video Player */}
                <iframe 
                  src={`https://www.tiktok.com/embed/v2/${selectedTrend.videoUrl.split('/').pop()}`}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-white leading-tight">{selectedTrend.title}</h2>
                  <button onClick={() => setSelectedTrend(null)} className="text-slate-500 hover:text-white transition-colors">✕</button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                      <Target className="h-3 w-3 text-orange-400" /> Target Audience
                    </p>
                    <p className="text-sm text-slate-300">{selectedTrend.insights.targetAudience}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                      <MessageSquare className="h-3 w-3 text-blue-400" /> Marketing Angle
                    </p>
                    <p className="text-sm text-slate-300">Viral Hook + Problem/Solution</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-orange-400" /> AI Insights & Strategy
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed italic border-l-2 border-orange-500/30 pl-4">
                    {selectedTrend.insights.aiSummary}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-400" /> Marketing Tips
                  </h4>
                  <ul className="space-y-2">
                    {selectedTrend.insights.marketingTips.map((tip, idx) => (
                      <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/5 flex gap-3">
                  <a 
                    href={selectedTrend.videoUrl}
                    target="_blank"
                    className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    Watch Original <ExternalLink className="h-4 w-4" />
                  </a>
                  <button className="flex-1 py-3 bg-orange-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-colors">
                    Edit Blog Post
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
