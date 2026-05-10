'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Zap, Shield, Brain, Globe, TrendingUp, 
  Cpu, BarChart3, Target, Sparkles, CheckCircle, Crown,
  Store, Search, Layers
} from 'lucide-react';
import Link from 'next/link';

const platformFeatures = [
  {
    icon: Brain,
    title: "Multi-AI Consensus",
    desc: "5+ AI models analyze every query simultaneously for maximum accuracy.",
    color: "orange"
  },
  {
    icon: TrendingUp,
    title: "Real-Time Trends",
    desc: "Live Google Trends data integrated into every market analysis.",
    color: "green"
  },
  {
    icon: Target,
    title: "Supplier Matching",
    desc: "Verified suppliers from AliExpress, Alibaba, CJ Dropshipping.",
    color: "blue"
  },
  {
    icon: Shield,
    title: "Risk Analysis",
    desc: "Saturation detection, failure mode analysis, profit reality checks.",
    color: "purple"
  },
];

const modules = [
  {
    name: "Smart Research Engine",
    desc: "Multi-AI consensus system finds high-margin products with real-time data.",
    icon: Cpu,
    gradient: "from-indigo-600 to-violet-600",
    badge: "CORE"
  },
  {
    name: "Etsy Automation",
    desc: "AI-powered niche discovery, SEO listing generation, and supplier sourcing.",
    icon: Store,
    gradient: "from-orange-600 to-amber-600",
    badge: "NEW"
  },
  {
    name: "Market Intelligence",
    desc: "Cross-platform competitor tracking, price monitoring, and trend prediction.",
    icon: BarChart3,
    gradient: "from-emerald-600 to-teal-600",
    badge: "SOON"
  },
];

const stats = [
  { value: "5+", label: "AI Models" },
  { value: "99.9%", label: "Data Fidelity" },
  { value: "<2.5s", label: "Analysis Speed" },
  { value: "Global", label: "Market Coverage" },
];

export default function HeroSection({ isPreview = false }: { isPreview?: boolean }) {
  return (
    <div className="space-y-32 pb-32 max-w-7xl mx-auto px-4 sm:px-6 relative overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="relative pt-24 flex flex-col items-center text-center">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-[-100px] left-[-200px] w-[600px] h-[600px] bg-orange-600/8 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[20%] right-[-100px] w-[500px] h-[500px] bg-violet-600/5 blur-[150px] rounded-full"></div>
        </div>

        {/* Status Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
          <span className="text-[10px] font-black text-green-200 uppercase tracking-[0.3em]">Platform Active — All Systems Online</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 italic leading-none"
        >
          ALLMY<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]">SELL</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl text-xl text-slate-400 font-medium leading-relaxed mb-12"
        >
          The AI-powered e-commerce intelligence platform. We deploy autonomous agents to 
          analyze markets, find winning products, and help you scale across every marketplace.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20"
        >
          <Link 
            href="/register"
            className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black uppercase tracking-widest text-xs hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/pricing"
            className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center gap-3"
          >
            <Crown className="w-4 h-4 text-amber-500" />
            View Plans
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
              <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- MODULES SECTION --- */}
      <div className="space-y-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Layers className="h-3 w-3" />
              Intelligence Modules
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              Everything You Need to <span className="text-orange-500 italic">Dominate</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Each module is an autonomous AI system designed to maximize your e-commerce profits.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative rounded-3xl border border-white/10 bg-[#080c16] p-8 overflow-hidden hover:border-white/20 transition-all duration-500 h-full">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/[0.01] rounded-full blur-[60px] group-hover:bg-white/[0.03] transition-all duration-700" />
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${mod.gradient} flex items-center justify-center shadow-2xl`}>
                    <mod.icon className="h-7 w-7 text-white" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                    {mod.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 relative z-10">{mod.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed relative z-10">{mod.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- FEATURES GRID --- */}
      <div className="space-y-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl font-black text-white tracking-tighter">
              Why <span className="text-orange-500 italic">AllMySell</span>?
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Built for serious e-commerce sellers who want data-driven decisions.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {platformFeatures.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-5 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
            >
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex-shrink-0">
                <feat.icon className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">{feat.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- BOTTOM CTA --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
          Ready to Scale Your Business?
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          Join sellers who use AI-powered intelligence to find winning products and dominate marketplaces.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/register"
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black uppercase tracking-widest text-xs hover:shadow-2xl hover:shadow-orange-500/30 transition-all flex items-center gap-3"
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/pricing"
            className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
          >
            Compare Plans
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
