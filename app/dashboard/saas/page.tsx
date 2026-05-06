"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Zap, Store, ArrowRight, 
  Brain, Crosshair, ShoppingBag 
} from "lucide-react";

export default function SaaSPanelPage() {
  return (
    <div className="space-y-10 pb-10 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-4"
      >
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-4">
          <Zap className="h-4 w-4 text-orange-400" />
          <span className="text-sm font-medium text-orange-400">SaaS Command Hub</span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight">
          Choose Your Weapon
        </h1>
        <p className="text-slate-400 mt-3 text-lg max-w-xl mx-auto">
          Select a module to launch. Each one is an autonomous AI-powered system designed to maximize your profits.
        </p>
      </motion.div>

      {/* Etsy Sniper Card — Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <Link href="/dashboard/etsy" className="block group">
          <div className="relative rounded-2xl border border-white/10 bg-[#080c16] p-8 overflow-hidden hover:border-orange-500/30 transition-all duration-500">
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500/10 blur-3xl rounded-full group-hover:bg-orange-500/20 transition-all duration-700"></div>
            
            {/* Badge */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center shadow-2xl">
                <Crosshair className="h-7 w-7 text-white" />
              </div>
              <span className="text-xs font-bold tracking-widest px-3 py-1 rounded-full bg-orange-500/20 text-orange-400">
                NEW
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-2 relative z-10 group-hover:text-orange-400 transition-colors">
              Etsy Sniper
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 relative z-10 max-w-xl">
              AI-powered niche hunter — find winning products, get SELL/AVOID decisions &amp; generate SEO listings automatically.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-8 relative z-10 max-w-md">
              <div className="bg-black/40 rounded-lg p-3 border border-white/5 text-center">
                <Brain className="h-4 w-4 text-slate-500 mx-auto mb-1" />
                <div className="text-white font-bold text-sm">3</div>
                <div className="text-slate-500 text-[10px] uppercase tracking-wider">AI Models</div>
              </div>
              <div className="bg-black/40 rounded-lg p-3 border border-white/5 text-center">
                <Store className="h-4 w-4 text-slate-500 mx-auto mb-1" />
                <div className="text-white font-bold text-sm">Live</div>
                <div className="text-slate-500 text-[10px] uppercase tracking-wider">Etsy API</div>
              </div>
              <div className="bg-black/40 rounded-lg p-3 border border-white/5 text-center">
                <ShoppingBag className="h-4 w-4 text-slate-500 mx-auto mb-1" />
                <div className="text-white font-bold text-sm">Active</div>
                <div className="text-slate-500 text-[10px] uppercase tracking-wider">SEO Engine</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold text-sm group-hover:shadow-lg transition-all relative z-10 max-w-xs">
              Launch Etsy Sniper
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
