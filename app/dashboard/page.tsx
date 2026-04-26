"use client";

import { motion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { BarChart3, TrendingUp, Search, Zap, ArrowRight, Package, DollarSign, Activity } from "lucide-react";
import Link from "next/link";

const stats = [
  { name: "Analyzed Trends", value: "2,845", change: "+14%", icon: TrendingUp, color: "text-orange-400", bg: "bg-orange-500/10" },
  { name: "Active Automations", value: "12", change: "Stable", icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10" },
  { name: "Potential Revenue", value: "$42.5k", change: "+8%", icon: DollarSign, color: "text-green-400", bg: "bg-green-500/10" },
  { name: "Tracked Products", value: "148", change: "+24", icon: Package, color: "text-blue-400", bg: "bg-blue-500/10" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Admin</h1>
          <p className="text-sm text-slate-400">Here's what's happening with your stores today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg text-sm font-medium hover:from-orange-500 hover:to-amber-500 transition-colors shadow-[0_0_20px_rgba(249,115,22,0.3)]">
            New Research
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <MagicCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium text-slate-400 bg-white/5 px-2 py-1 rounded-full border border-white/5">
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.name}</p>
            </MagicCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 rounded-xl border border-white/5 bg-[#080c16] p-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Trend Activity</h2>
            <button className="text-sm text-orange-400 hover:text-orange-300">View Detailed</button>
          </div>
          <div className="h-64 flex items-center justify-center border border-white/5 border-dashed rounded-lg bg-white/[0.02]">
            <div className="text-center text-slate-500 flex flex-col items-center">
              <Activity className="h-8 w-8 mb-2 opacity-50" />
              <p>Live chart visualization active</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-white/5 bg-[#080c16] p-6 shadow-xl flex flex-col"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Quick Actions</h2>
          <div className="space-y-3 flex-1">
            {[
              { title: "Start Etsy Scraper", desc: "Scan new bestselling items", icon: Search },
              { title: "Sync Listings", desc: "Push updates to stores", icon: Zap },
              { title: "Analyze Keywords", desc: "Find high volume tags", icon: BarChart3 },
            ].map((action, i) => (
              <button key={i} className="w-full flex items-center gap-4 p-4 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-orange-500/30 transition-all group">
                <div className="p-2 rounded-md bg-white/5 group-hover:bg-orange-500/20 group-hover:text-orange-400 transition-colors text-slate-400">
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-medium text-white">{action.title}</p>
                  <p className="text-xs text-slate-400">{action.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-orange-400 transition-colors" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
