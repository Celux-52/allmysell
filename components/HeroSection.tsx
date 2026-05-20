'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Zap, Shield, Brain, Globe, TrendingUp, 
  Cpu, BarChart3, Target, Sparkles, CheckCircle, Crown,
  Store, Search, Layers
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function HeroSection({ isPreview = false }: { isPreview?: boolean }) {
  const { t } = useI18n();

  const localModules = [
    { name: t('modules.smartResearch'), desc: t('modules.smartResearchDesc'), icon: Cpu, gradient: 'from-indigo-600 to-violet-600', badge: 'CORE' },
    { name: t('modules.etsyAutomation'), desc: t('modules.etsyAutomationDesc'), icon: Store, gradient: 'from-orange-600 to-amber-600', badge: 'NEW' },
    { name: t('modules.marketIntel'), desc: t('modules.marketIntelDesc'), icon: BarChart3, gradient: 'from-emerald-600 to-teal-600', badge: 'SOON' },
  ];

  const localFeatures = [
    { icon: Brain, title: t('feat.multiAI'), desc: t('feat.multiAIDesc'), color: 'orange' },
    { icon: TrendingUp, title: t('feat.trends'), desc: t('feat.trendsDesc'), color: 'green' },
    { icon: Target, title: t('feat.supplier'), desc: t('feat.supplierDesc'), color: 'blue' },
    { icon: Shield, title: t('feat.risk'), desc: t('feat.riskDesc'), color: 'purple' },
  ];

  const localStats = [
    { value: '2', label: t('hero.stat1') },
    { value: '99.9%', label: t('hero.stat2') },
    { value: '<2.5s', label: t('hero.stat3') },
    { value: 'Global', label: t('hero.stat4') },
  ];

  return (
    <div className="space-y-32 pb-32 max-w-7xl mx-auto px-4 sm:px-6 relative overflow-hidden">
      
      {/* ═══════════════════════════════════════════
          CYBER-SAAS BACKGROUND LAYER
          ═══════════════════════════════════════════ */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Cyber Grid */}
        <div className="absolute inset-0 animate-cyber-grid opacity-40"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-[-120px] left-[-180px] w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] bg-orange-600/10 blur-[100px] sm:blur-[160px] rounded-full animate-orb-float"></div>
        <div className="absolute bottom-[10%] right-[-120px] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-violet-600/8 blur-[100px] sm:blur-[160px] rounded-full animate-orb-float" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute top-[40%] left-[30%] w-[200px] h-[200px] bg-amber-500/5 blur-[120px] rounded-full animate-orb-float" style={{ animationDelay: '-8s' }}></div>
        
        {/* Scan Line */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent animate-scan-line"></div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          HERO SECTION — Two-Column Layout
          ═══════════════════════════════════════════ */}
      <motion.div 
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative pt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        {/* LEFT COLUMN: Text Content */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Status Badge */}
          <motion.div 
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl mb-8 hover-glow-orange"
          >
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.7)]"></div>
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping-slow"></div>
            </div>
            <span className="text-[10px] font-black text-green-200 uppercase tracking-[0.3em]">{t('hero.status')}</span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 italic leading-[0.9]"
          >
            ALLMY<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 drop-shadow-[0_0_30px_rgba(249,115,22,0.3)] animate-text-glow">SELL</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={fadeUp}
            className="max-w-2xl text-lg sm:text-xl text-slate-400 font-medium leading-relaxed mb-12"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto"
          >
            <Link 
              href="/register"
              className="w-full sm:w-auto group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black uppercase tracking-widest text-xs hover:shadow-[0_0_40px_rgba(249,115,22,0.45)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
            >
              {/* Shimmer overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center gap-3">
                {t('hero.cta1')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </Link>
            <Link 
              href="/pricing"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/[0.04] border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/[0.08] hover:border-orange-500/30 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Crown className="w-4 h-4 text-amber-500" />
              {t('hero.cta2')}
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-xl"
          >
            {localStats.map((stat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05, borderColor: 'rgba(249, 115, 22, 0.3)' }}
                className="text-center p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl backdrop-blur-sm transition-colors duration-300"
              >
                <div className="text-xl sm:text-2xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Glowing AI Core Sphere */}
        <motion.div 
          variants={scaleIn}
          className="lg:col-span-5 flex justify-center relative group"
        >
          {/* Animated Background Glow */}
          <div className="absolute inset-[-40px] bg-gradient-to-tr from-orange-500/15 via-purple-500/10 to-amber-500/5 rounded-full blur-[80px] group-hover:from-orange-500/25 group-hover:via-purple-500/15 group-hover:to-amber-500/10 transition-all duration-1000 -z-10"></div>
          
          {/* Pulsing Ring */}
          <div className="absolute inset-[-20px] rounded-[3rem] border border-orange-500/10 animate-neon-border -z-10"></div>
          
          <motion.div 
            animate={{ y: [0, -14, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative rounded-[3rem] border border-white/10 bg-slate-950/50 backdrop-blur-2xl shadow-2xl overflow-hidden hover-glow-orange"
          >
            <Image 
              src="/ai_core.png" 
              alt="AllMySell AI Neural Engine Core"
              width={400}
              height={400}
              className="w-full max-w-[380px] h-auto object-contain rounded-[2.5rem] drop-shadow-[0_0_60px_rgba(249,115,22,0.3)] p-4" 
              priority
            />
            
            {/* HUD Scan overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_0%,rgba(249,115,22,0.02)_50%,transparent_100%)] bg-[length:100%_6px] opacity-30 rounded-[2.5rem]"></div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════════
          MODULES SECTION
          ═══════════════════════════════════════════ */}
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
              {t('modules.badge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              {t('modules.title1')} <span className="text-orange-500 italic">{t('modules.title2')}</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {t('modules.subtitle')}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {localModules.map((mod, i) => (
            <motion.div
              key={mod.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group"
            >
              <div className="relative rounded-3xl border border-white/10 bg-[#080c16] p-8 overflow-hidden hover:border-orange-500/25 transition-all duration-500 h-full hover-glow-orange">
                {/* Ambient glow on hover */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/[0.01] rounded-full blur-[60px] group-hover:bg-orange-500/[0.04] transition-all duration-700" />
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${mod.gradient} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
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

      {/* ═══════════════════════════════════════════
          FEATURES GRID
          ═══════════════════════════════════════════ */}
      <div className="space-y-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl font-black text-white tracking-tighter">
              {t('feat.whyTitle')} <span className="text-orange-500 italic">AllMySell</span>?
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              {t('feat.whySubtitle')}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {localFeatures.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex items-start gap-5 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-orange-500/20 transition-all duration-400"
            >
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex-shrink-0 group-hover:scale-110 group-hover:bg-orange-500/15 transition-all duration-300">
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

      {/* ═══════════════════════════════════════════
          BOTTOM CTA
          ═══════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
          {t('cta.title1')}
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          {t('cta.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/register"
            className="group px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black uppercase tracking-widest text-xs hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:scale-[1.03] transition-all duration-300 flex items-center gap-3 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10 flex items-center gap-3">
              {t('cta.button1')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link 
            href="/pricing"
            className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 hover:border-orange-500/25 transition-all duration-300"
          >
            {t('cta.button2')}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
