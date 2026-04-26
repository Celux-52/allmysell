"use client";

import { motion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { Star, ExternalLink, ArrowRight, Trash2 } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

const savedItems = [
  { id: 1, name: "Vintage Leather Bag", platform: "Etsy", date: "2 hours ago", score: 98, tag: "High Margin" },
  { id: 2, name: "Smart Pet Feeder", platform: "Amazon", date: "1 day ago", score: 85, tag: "Trending" },
  { id: 3, name: "LED Desk Lamp", platform: "Shopify", date: "3 days ago", score: 72, tag: "Consistent" },
];

export default function SavedItemsPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <AnimatedGradientText className="mb-2 !mx-0 !justify-start">
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 text-orange-400" />
              Saved Items
            </span>
          </AnimatedGradientText>
          <h1 className="text-3xl font-bold text-white">Your Product Vault</h1>
          <p className="text-slate-400 mt-1">Bookmarked products and research data for future listing.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedItems.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <MagicCard className="p-6 flex flex-col h-full bg-[#080c16] border-white/10 group">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-orange-400">
                  {item.platform}
                </span>
                <button className="text-slate-500 hover:text-red-400 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
              
              <div className="flex items-center gap-3 mb-6 flex-1">
                <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-md">{item.tag}</span>
                <span className="text-xs text-slate-500">Added {item.date}</span>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                    {item.score}
                  </div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Score</span>
                </div>
                <button className="flex items-center gap-1 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors">
                  Analyze <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </MagicCard>
          </motion.div>
        ))}

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="h-full min-h-[250px] border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-6 text-center hover:border-orange-500/30 hover:bg-white/5 transition-all cursor-pointer group">
            <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-orange-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Discover More</h3>
            <p className="text-sm text-slate-500">Head to the Research tab to find new products to save.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
