"use client";

import { motion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { TrendingUp, BarChart, ArrowUp, Star, Search, Filter } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

const trendingProducts = [
  { id: 1, name: "Minimalist Leather Wallet", score: 98, searches: "125k", price: "$45", platform: "Etsy", trend: "+24%" },
  { id: 2, name: "Ergonomic Laptop Stand", score: 94, searches: "89k", price: "$65", platform: "Amazon", trend: "+18%" },
  { id: 3, name: "Wireless Charging Pad", score: 88, searches: "210k", price: "$35", platform: "eBay", trend: "+12%" },
  { id: 4, name: "Custom Name Necklace", score: 85, searches: "45k", price: "$28", platform: "Etsy", trend: "+42%" },
  { id: 5, name: "Mechanical Keyboard", score: 82, searches: "150k", price: "$120", platform: "Shopify", trend: "+8%" },
];

export default function TrendsPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <AnimatedGradientText className="mb-2 !mx-0 !justify-start">
            <span className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-400" />
              Live Trends
            </span>
          </AnimatedGradientText>
          <h1 className="text-3xl font-bold text-white">Trend Analysis Engine</h1>
          <p className="text-slate-400 mt-1">Real-time market intelligence across major e-commerce platforms.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search niche or product..." 
              className="pl-9 pr-4 py-2 bg-[#080c16] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500/50 w-full sm:w-64 transition-colors"
            />
          </div>
          <button className="p-2 bg-[#080c16] border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
            <Filter className="h-5 w-5 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 rounded-xl border border-white/5 bg-[#080c16] overflow-hidden"
        >
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="font-semibold text-white">Hot Opportunities</h2>
            <button className="text-sm font-medium text-orange-400 hover:text-orange-300">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.02] text-slate-400 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 font-medium">Product Name</th>
                  <th className="px-6 py-4 font-medium">Platform</th>
                  <th className="px-6 py-4 font-medium">Trend Score</th>
                  <th className="px-6 py-4 font-medium">Est. Price</th>
                  <th className="px-6 py-4 font-medium">Growth</th>
                  <th className="px-6 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {trendingProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 text-white font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-slate-400">{product.platform}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-orange-500 to-amber-500" 
                            style={{ width: `${product.score}%` }}
                          />
                        </div>
                        <span className="text-white">{product.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{product.price}</td>
                    <td className="px-6 py-4 text-green-400 flex items-center gap-1">
                      <ArrowUp className="h-3 w-3" /> {product.trend}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-slate-500 hover:text-orange-400 opacity-0 group-hover:opacity-100 transition-all">
                        <Star className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <MagicCard className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-orange-500/10 rounded-lg text-orange-400">
                  <BarChart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Market Sentiment</h3>
                  <p className="text-sm text-slate-400">Overall AI Analysis</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Tech Accessories</span>
                    <span className="text-green-400">+14%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[75%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Home Decor</span>
                    <span className="text-orange-400">-5%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[45%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Personalized Gifts</span>
                    <span className="text-green-400">+32%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[90%]" />
                  </div>
                </div>
              </div>
            </MagicCard>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-white/5 bg-gradient-to-b from-[#080c16] to-transparent p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="h-24 w-24 text-orange-500" />
            </div>
            <h3 className="font-semibold text-white mb-2 relative z-10">Generate New Insights</h3>
            <p className="text-sm text-slate-400 mb-4 relative z-10">Run a deep AI analysis on a specific niche to find hidden gems.</p>
            <button className="w-full py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-orange-500 hover:border-orange-500 transition-colors relative z-10 text-white shadow-[0_0_15px_rgba(249,115,22,0)] hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              Start Deep Scan
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
