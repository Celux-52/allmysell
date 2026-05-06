"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Zap, ArrowRight, 
  Brain, Crosshair, ShoppingBag, Store,
  Search, TrendingUp, BarChart3, Cpu
} from "lucide-react";

const modules = [
  {
    name: "Etsy Automation",
    subtitle: "AI-Powered Product Sniper",
    description: "Find winning Etsy niches, get instant SELL/AVOID decisions, generate human-like SEO listings & discover suppliers — all autonomous.",
    href: "/dashboard/etsy",
    icon: Crosshair,
    gradient: "from-orange-600 to-amber-600",
    stats: [
      { label: "AI Models", value: "3", icon: Brain },
      { label: "Etsy API", value: "Live", icon: Store },
      { label: "SEO Engine", value: "Active", icon: ShoppingBag },
    ],
    badge: "NEW",
    badgeColor: "bg-orange-500/20 text-orange-400",
    borderHover: "hover:border-orange-500/30",
  },
  {
    name: "Smart Research Engine",
    subtitle: "Multi-AI Consensus System",
    description: "5 parallel AI models (Groq, Gemini, DeepSeek, Qwen, Claude) analyze trends, find high-margin products from US warehouses with real-time Google Trends data.",
    href: "/dashboard",
    icon: Cpu,
    gradient: "from-indigo-600 to-violet-600",
    stats: [
      { label: "AI Consensus", value: "5 Models", icon: Brain },
      { label: "Trends API", value: "Live", icon: TrendingUp },
      { label: "Research", value: "Active", icon: Search },
    ],
    badge: "CORE",
    badgeColor: "bg-indigo-500/20 text-indigo-400",
    borderHover: "hover:border-indigo-500/30",
  },
];

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

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {modules.map((mod, i) => (
          <motion.div
            key={mod.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            <Link href={mod.href} className="block group">
              <div className={`relative rounded-2xl border border-white/10 bg-[#080c16] p-8 overflow-hidden ${mod.borderHover} transition-all duration-500 h-full`}>
                {/* Badge */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${mod.gradient} flex items-center justify-center shadow-2xl`}>
                    <mod.icon className="h-7 w-7 text-white" />
                  </div>
                  <span className={`text-xs font-bold tracking-widest px-3 py-1 rounded-full ${mod.badgeColor}`}>
                    {mod.badge}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-1 relative z-10">
                  {mod.name}
                </h2>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3 relative z-10">{mod.subtitle}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 relative z-10">
                  {mod.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-8 relative z-10">
                  {mod.stats.map((stat) => (
                    <div key={stat.label} className="bg-black/40 rounded-lg p-3 border border-white/5 text-center">
                      <stat.icon className="h-4 w-4 text-slate-500 mx-auto mb-1" />
                      <div className="text-white font-bold text-sm">{stat.value}</div>
                      <div className="text-slate-500 text-[10px] uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className={`flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r ${mod.gradient} text-white font-semibold text-sm group-hover:shadow-lg transition-all relative z-10`}>
                  Launch Module
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
