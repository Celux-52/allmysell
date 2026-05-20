'use client';

import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { ArrowRight, BarChart3, Globe, LineChart, Cpu, LayoutDashboard, ShoppingCart, Zap, Terminal, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n/context";

export default function HomePageSections() {
  const { t } = useI18n();

  const saasFeatures = [
    { title: t('feat.aiTrend'), description: t('feat.aiTrendDesc'), icon: <Cpu className="h-6 w-6 text-orange-400" /> },
    { title: t('feat.autoList'), description: t('feat.autoListDesc'), icon: <Zap className="h-6 w-6 text-amber-400" /> },
    { title: t('feat.marketIntel'), description: t('feat.marketIntelDesc'), icon: <LineChart className="h-6 w-6 text-orange-500" /> },
    { title: t('feat.crossPlatform'), description: t('feat.crossPlatformDesc'), icon: <Globe className="h-6 w-6 text-amber-500" /> },
  ];

  return (
    <>
      {/* ═══════════════════════════════════════════
          COMMAND CENTER — Dashboard Preview
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-purple-500/3 pointer-events-none" />
        
        {/* Background orbs for depth */}
        <div className="absolute top-[20%] right-[-100px] w-[300px] h-[300px] bg-orange-600/5 blur-[120px] rounded-full animate-orb-float pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[-100px] w-[250px] h-[250px] bg-violet-600/5 blur-[120px] rounded-full animate-orb-float pointer-events-none" style={{ animationDelay: '-6s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 mb-6">
                <Terminal className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">{t('section.commandBadge')}</span>
              </div>
              <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tighter">
                {t('section.commandPrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-600 animate-text-glow">{t('section.commandTitle')}</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium">
                {t('section.commandSubtitle')}
              </p>
            </motion.div>
          </div>

          {/* Dashboard Mockup — Premium Floating Frame */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="perspective-container"
          >
            <div className="relative mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-[#0d111c]/50 p-2.5 shadow-2xl backdrop-blur-xl group transition-all duration-500 hover:border-orange-500/25 hover-glow-orange perspective-card">
              <BorderBeam size={400} duration={15} delay={9} colorFrom="#f97316" colorTo="#a855f7" />
              
              <div className="relative rounded-[2rem] overflow-hidden border border-white/5 bg-[#050810] shadow-inner">
                {/* Browser Chrome Bar */}
                <div className="flex items-center gap-4 border-b border-white/5 p-4 bg-white/[0.03]">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/50 hover:bg-yellow-500 transition-colors" />
                    <div className="h-3 w-3 rounded-full bg-green-500/50 hover:bg-green-500 transition-colors" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <LayoutDashboard className="h-3 w-3" />
                      {t('section.dashboardLabel')}
                    </div>
                  </div>
                </div>
                
                {/* Dashboard Mockup Image */}
                <div className="relative overflow-hidden">
                  <Image 
                    src="/dashboard_mockup.png" 
                    alt="AllMySell E-commerce Sniper Dashboard"
                    width={1200}
                    height={700}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  
                  {/* HUD Scanline overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_0%,rgba(249,115,22,0.015)_50%,transparent_100%)] bg-[length:100%_6px] opacity-40"></div>
                  
                  {/* Bottom gradient fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050810] to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OPERATIONAL ADVANTAGE — Features Grid
          ═══════════════════════════════════════════ */}
      <section className="py-24 relative border-t border-white/5">
        {/* Subtle background texture */}
        <div className="absolute inset-0 animate-cyber-grid opacity-20 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-6xl font-black mb-4 tracking-tighter">
              {t('section.opAdvantage')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-600">{t('section.opAdvantageHL')}</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">
              {t('section.opAdvantageDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {saasFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.7 }}
              >
                <MagicCard className="p-10 rounded-[2.5rem] bg-[#0d111c]/40 border-white/10 group hover:border-orange-500/20 transition-all duration-500">
                  <div className="h-16 w-16 rounded-[1.25rem] bg-orange-500/10 flex items-center justify-center mb-8 border border-orange-500/20 shadow-2xl shadow-orange-500/10 group-hover:scale-110 group-hover:bg-orange-500/15 transition-all duration-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-medium">{feature.description}</p>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CALL TO ACTION — Deploy Revenue Empire
          ═══════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-600/8 via-transparent to-transparent pointer-events-none" />
        
        {/* CTA background orb */}
        <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-orange-500/8 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">
              {t('section.ctaTitle1')} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 animate-text-glow">{t('section.ctaTitle2')}</span>
            </h2>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium">
              {t('section.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/register"
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 px-10 py-5 text-sm font-black uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(249,115,22,0.4)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center gap-3">
                  {t('section.ctaBtn1')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-10 py-5 text-sm font-black uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-orange-500/25"
              >
                {t('section.ctaBtn2')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
