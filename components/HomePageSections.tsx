'use client';

import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { ArrowRight, BarChart3, Globe, LineChart, Cpu, LayoutDashboard, ShoppingCart, Zap, Terminal, Shield } from "lucide-react";
import Link from "next/link";
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
      {/* SaaS Dashboard Preview Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 mb-6">
                <Terminal className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">{t('section.commandBadge')}</span>
             </div>
            <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tighter">
              COMMAND CENTER FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-600">{t('section.commandTitle')}</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium">
              {t('section.commandSubtitle')}
            </p>
          </div>

          <div className="relative mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-[#0d111c]/40 p-2 shadow-2xl backdrop-blur-xl group transition-all hover:border-orange-500/30">
            <BorderBeam size={400} duration={15} delay={9} colorFrom="#f97316" colorTo="#a855f7" />
            <div className="relative rounded-[2rem] overflow-hidden border border-white/5 bg-[#050810]">
              <div className="flex h-[400px] sm:h-[600px] flex-col">
                <div className="flex items-center gap-4 border-b border-white/5 p-4 bg-white/5">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/40" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/40" />
                    <div className="h-3 w-3 rounded-full bg-green-500/40" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <LayoutDashboard className="h-3 w-3" />
                      ALLMYSELL.DASHBOARD
                    </div>
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="hidden sm:flex w-56 flex-col gap-2 border-r border-white/5 p-6 bg-white/[0.02]">
                    {[
                      { icon: LayoutDashboard, label: t('dash.intelligence'), active: true },
                      { icon: BarChart3, label: t('dash.analytics') },
                      { icon: ShoppingCart, label: t('dash.inventory') },
                      { icon: Cpu, label: t('dash.neuralForge') },
                      { icon: Shield, label: t('dash.security') },
                    ].map((item, i) => (
                      <div key={i} className={`flex items-center gap-4 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest transition-all ${item.active ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'text-slate-600 hover:bg-white/5 hover:text-white'}`}>
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 p-8 bg-[#050810]">
                    <div className="mb-8 h-10 w-64 rounded-xl bg-white/5 border border-white/5 animate-pulse" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 rounded-[1.5rem] bg-white/[0.03] border border-white/5 p-6 flex flex-col justify-between group hover:bg-white/[0.05] transition-all">
                          <div className="h-3 w-24 rounded-full bg-white/10" />
                          <div className="h-8 w-20 rounded-xl bg-orange-500/10 border border-orange-500/20" />
                        </div>
                      ))}
                    </div>
                    <div className="h-64 rounded-[2rem] bg-white/[0.02] border border-white/5 relative overflow-hidden">
                       <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(249,115,22,0.05)_50%,transparent_100%)] bg-[length:4px_100%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Magic Cards */}
      <section className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-black mb-4 tracking-tighter">
              {t('section.opAdvantage')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-600">{t('section.opAdvantageHL')}</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">
              {t('section.opAdvantageDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {saasFeatures.map((feature, idx) => (
              <MagicCard key={idx} className="p-10 rounded-[2.5rem] bg-[#0d111c]/40 border-white/10">
                <div className="h-16 w-16 rounded-[1.25rem] bg-orange-500/10 flex items-center justify-center mb-8 border border-orange-500/20 shadow-2xl shadow-orange-500/10">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{feature.description}</p>
              </MagicCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-600/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">
            {t('section.ctaTitle1')} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600">{t('section.ctaTitle2')}</span>
          </h2>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium">
            {t('section.ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/register"
              className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 px-10 py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(249,115,22,0.4)]"
            >
              {t('section.ctaBtn1')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-10 py-5 text-sm font-black uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              {t('section.ctaBtn2')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
