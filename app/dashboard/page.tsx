"use client";

import { motion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { BarChart3, TrendingUp, Search, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardOverview() {
  const router = useRouter();
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            Welcome to AllMySell AI <Shield className="h-5 w-5 text-green-400" />
          </h1>
          <p className="text-sm text-slate-400">Your live AI trend analysis and e-commerce research dashboard.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-amber-500/5 p-8 shadow-xl flex flex-col"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-500/20 rounded-lg text-orange-400">
              <Search className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Smart Research</h2>
              <p className="text-sm text-slate-400">Multi-AI Consensus Engine</p>
            </div>
          </div>
          <p className="text-slate-300 mb-8 leading-relaxed flex-1">
            Generate fully automated, data-driven product research using 5 parallel AI models (Groq, Gemini, DeepSeek R1, Qwen 3, and Llama 4). Find high-margin products shipped from US warehouses.
          </p>
          <button 
            onClick={() => router.push('/dashboard/research')}
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg font-medium hover:from-orange-500 hover:to-amber-500 transition-colors shadow-lg shadow-orange-500/20 text-white flex justify-center items-center gap-2"
          >
            Start Smart Research <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 p-8 shadow-xl flex flex-col"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Live Trend Analysis</h2>
              <p className="text-sm text-slate-400">Google Trends API Integration</p>
            </div>
          </div>
          <p className="text-slate-300 mb-8 leading-relaxed flex-1">
            Fetch real-time interest data directly from Google Trends. Cross-reference search volume and rising queries with AI analysis to validate your product ideas before sourcing.
          </p>
          <button 
            onClick={() => router.push('/dashboard/trends')}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-medium hover:from-blue-500 hover:to-cyan-500 transition-colors shadow-lg shadow-blue-500/20 text-white flex justify-center items-center gap-2"
          >
            View Live Trends <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-white/5 bg-[#080c16] p-6 shadow-xl"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Live System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <span className="text-slate-400 text-sm">Consensus Engine</span>
            <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full">
              <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span></span>
              Online
            </span>
          </div>
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <span className="text-slate-400 text-sm">Google Trends API</span>
            <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full">
              <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span></span>
              Connected
            </span>
          </div>
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <span className="text-slate-400 text-sm">Automations Beta</span>
            <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-full">
              In Development
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
