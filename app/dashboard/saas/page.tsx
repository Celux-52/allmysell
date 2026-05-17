"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Zap, ArrowRight, Shield, Globe, 
  Brain, Crosshair, ShoppingBag, Store,
  Search, TrendingUp, BarChart3, Cpu,
  Sparkles, Target, Rocket, Crown
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function SaaSPanelPage() {
  const { t } = useI18n();

  const modules = [
    {
      name: t('modules.smartResearch'),
      subtitle: t('dash.smartAlphaSub'),
      description: t('modules.smartResearchDesc'),
      href: "/dashboard/saas/research",
      icon: Cpu,
      gradient: "from-indigo-600 to-violet-600",
      glowColor: "indigo",
      stats: [
        { label: t('feat.multiAI'), value: "1 Model", icon: Brain },
        { label: "Trends API", value: "Live", icon: TrendingUp },
        { label: t('res.research'), value: "Active", icon: Search },
      ],
      badge: "CORE",
      badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/20",
      borderHover: "hover:border-indigo-500/30",
    },
    {
      name: t('modules.etsyAutomation'),
      subtitle: t('dash.etsyAlphaSub'),
      description: t('modules.etsyAutomationDesc'),
      href: "/dashboard/saas/etsy",
      icon: Crosshair,
      gradient: "from-orange-600 to-amber-600",
      glowColor: "orange",
      stats: [
        { label: t('hero.stat1'), value: "1", icon: Brain },
        { label: "Etsy API", value: "Live", icon: Store },
        { label: "SEO Engine", value: "Active", icon: ShoppingBag },
      ],
      badge: "NEW",
      badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/20",
      borderHover: "hover:border-orange-500/30",
    },
    {
      name: "eBay Sniper",
      subtitle: "ZERO-INTEGRATION RISK ANALYZER",
      description: "Analyze eBay products without store integration. Validates VeRO risk, dropshipping policies, market saturation, and ROI instantly.",
      href: "/dashboard/saas/ebay",
      icon: Target,
      gradient: "from-blue-600 to-cyan-600",
      glowColor: "blue",
      stats: [
        { label: "VeRO Guard", value: "Active", icon: Shield },
        { label: "Policy Scan", value: "Active", icon: Shield },
        { label: "ROI Engine", value: "Live", icon: Zap },
      ],
      badge: "NEW",
      badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/20",
      borderHover: "hover:border-blue-500/30",
    },
  ];

  const platformFeatures = [
    { icon: Brain, label: t('feat.multiAI'), desc: t('feat.multiAIDesc') },
    { icon: Globe, label: t('feat.trends'), desc: t('feat.trendsDesc') },
    { icon: Shield, label: t('feat.risk'), desc: t('feat.riskDesc') },
    { icon: Target, label: t('feat.supplier'), desc: t('feat.supplierDesc') },
  ];
  return (
    <div className="space-y-16 pb-20 max-w-6xl mx-auto">

      {/* --- HERO SECTION --- */}
      <div className="relative pt-8 pb-4 overflow-hidden">
        {/* Atmospheric Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-orange-600/10 via-violet-600/10 to-orange-600/10 blur-[120px] rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-green-400 text-[10px] font-black uppercase tracking-widest">
              {t('dash.systemsOperational')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-black text-white tracking-tighter"
          >
            AllMySell{" "}
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent italic">
              {t('dash.intelligenceTitle')}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {t('dash.subtitle')}
          </motion.p>

          {/* Platform Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mt-2"
          >
            {platformFeatures.map((feat, i) => (
              <div key={feat.label} className="flex items-center gap-3 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-2xl backdrop-blur-sm">
                <feat.icon className="w-4 h-4 text-orange-500/70" />
                <div className="text-left">
                  <span className="block text-[10px] font-bold text-white uppercase tracking-wider">{feat.label}</span>
                  <span className="block text-[9px] text-slate-500">{feat.desc}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- MODULE CARDS --- */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-sm font-black text-slate-500 uppercase tracking-[0.3em]">
            {t('dash.selectModule')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
            >
              <Link href={mod.href} className="block group">
                <div className={`relative rounded-2xl border border-white/10 bg-[#080c16] p-8 overflow-hidden ${mod.borderHover} transition-all duration-500 h-full`}>
                  {/* Hover Glow */}
                  <div className={`absolute -top-20 -right-20 w-60 h-60 bg-${mod.glowColor}-600/5 rounded-full blur-[80px] group-hover:bg-${mod.glowColor}-600/15 transition-all duration-700`} />

                  {/* Badge */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${mod.gradient} flex items-center justify-center shadow-2xl`}>
                      <mod.icon className="h-7 w-7 text-white" />
                    </div>
                    <span className={`text-xs font-bold tracking-widest px-3 py-1 rounded-full border ${mod.badgeColor}`}>
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
                    {t('dash.launchModule')}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- BOTTOM CTA --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center space-y-4 pt-6"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl backdrop-blur-sm">
          <Crown className="w-5 h-5 text-amber-500" />
          <span className="text-sm text-slate-400">
            {t('dash.unlockAll')}{" "}
            <Link href="/pricing" className="text-orange-400 font-bold hover:text-orange-300 transition-colors border-b border-orange-500/20">
              {t('dash.proAccess')} →
            </Link>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
