"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Particles } from "@/components/ui/particles";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { 
  Users, Target, Rocket, Sparkles, Brain, Zap, Globe, 
  Shield, TrendingUp, Code2, Cpu, BarChart3, ArrowRight,
  CheckCircle, Star, Activity
} from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";

// AI-powered dynamic insight fetcher
async function fetchAIInsight(apiKey: string): Promise<string> {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "You are the AI brain of AllMySell, an e-commerce intelligence SaaS platform. Generate a single powerful, futuristic and inspiring 1-2 sentence insight about the future of AI-powered e-commerce automation in 2026. Make it sound premium, visionary and bold. No quotes. Keep it concise. Reply ONLY with the insight text, nothing else."
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 100,
          }
        })
      }
    );
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "The future of e-commerce belongs to those who harness AI to decode market signals before they become trends.";
  } catch {
    return "The future of e-commerce belongs to those who harness AI to decode market signals before they become trends.";
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

// Milestones are defined inside the component to access t()


const techStack = [
  { name: "Next.js 15", desc: "React Framework", icon: Code2 },
  { name: "Gemini AI", desc: "AI Engine", icon: Brain },
  { name: "Supabase", desc: "Auth & Database", icon: Shield },
  { name: "Framer Motion", desc: "Animations", icon: Zap },
];

export default function AboutPage() {
  const { t } = useI18n();
  const [aiInsight, setAiInsight] = useState<string>("");
  const [isLoadingInsight, setIsLoadingInsight] = useState(true);

  const milestones = [
    { year: "2024", title: t('about.ms1Title'), desc: t('about.ms1Desc'), icon: Rocket, color: "from-orange-500 to-amber-500" },
    { year: "2025", title: t('about.ms2Title'), desc: t('about.ms2Desc'), icon: Brain, color: "from-violet-500 to-purple-500" },
    { year: "2025", title: t('about.ms3Title'), desc: t('about.ms3Desc'), icon: Code2, color: "from-emerald-500 to-teal-500" },
    { year: "2026", title: t('about.ms4Title'), desc: t('about.ms4Desc'), icon: Globe, color: "from-blue-500 to-indigo-500" },
  ];

  useEffect(() => {
    const API_KEY = "10081deaa1142882e35e0e864fac5e52866642ac22a7a5e01557bae0ad209f24";
    fetchAIInsight(API_KEY).then((insight) => {
      setAiInsight(insight);
      setIsLoadingInsight(false);
    });
  }, []);

  return (
    <div className="bg-[#020510] min-h-screen text-white selection:bg-orange-500/30 relative overflow-hidden">
      
      {/* ═══ BACKGROUND LAYERS ═══ */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 animate-cyber-grid opacity-25"></div>
        <Particles quantity={60} color="#F97316" />
        <div className="absolute top-[10%] left-[-100px] w-[400px] h-[400px] bg-orange-600/8 blur-[140px] rounded-full animate-orb-float"></div>
        <div className="absolute top-[50%] right-[-80px] w-[350px] h-[350px] bg-violet-600/6 blur-[140px] rounded-full animate-orb-float" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute bottom-[10%] left-[30%] w-[250px] h-[250px] bg-amber-500/5 blur-[120px] rounded-full animate-orb-float" style={{ animationDelay: '-9s' }}></div>
      </div>

      <div className="relative z-10 pt-28 pb-24">
        
        {/* ═══════════════════════════════════════════
            HERO SECTION
            ═══════════════════════════════════════════ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 max-w-6xl text-center mb-24"
        >
          <motion.div variants={fadeUp}>
            <AnimatedGradientText className="mb-6">
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
                <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                {t('about.badge')}
              </span>
            </AnimatedGradientText>
          </motion.div>
          
          <motion.h1 
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.9]"
          >
            {t('about.title1')} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 animate-text-glow">{t('about.title2')}</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeUp}
            className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            {t('about.subtitle')}
          </motion.p>
        </motion.div>

        {/* ═══════════════════════════════════════════
            FOUNDERS STORY — Two Column
            ═══════════════════════════════════════════ */}
        <div className="container mx-auto px-4 max-w-6xl mb-32">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Rocket className="h-3 w-3" />
                {t('about.journeyTitle')}
              </div>
              <div className="space-y-5 text-slate-300 leading-relaxed text-[15px]">
                <p>{t('about.founderStory1')}</p>
                <p>{t('about.founderStory2')}</p>
                <p>{t('about.founderStory3')}</p>
              </div>
            </motion.div>

            {/* Visual Side — Founders Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-[-20px] bg-gradient-to-tr from-orange-500/10 to-purple-500/5 rounded-[2.5rem] blur-[60px] group-hover:from-orange-500/15 group-hover:to-purple-500/10 transition-all duration-700 -z-10"></div>
              
              <div className="relative rounded-[2.5rem] border border-white/10 bg-slate-950/50 backdrop-blur-xl overflow-hidden hover-glow-orange">
                <BorderBeam size={300} duration={12} colorFrom="#f97316" colorTo="#a855f7" />
                <Image
                  src="/founders_vision.png"
                  alt="AllMySell Founders - Melih & Şükür Yunus"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-[2.3rem]"
                />
                
                {/* Quote overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8">
                  <p className="text-sm font-medium text-slate-300 italic leading-relaxed">
                    &quot;{t('about.founderQuote')}&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            AI LIVE INSIGHT — Powered by Gemini
            ═══════════════════════════════════════════ */}
        <div className="container mx-auto px-4 max-w-5xl mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-[2.5rem] border border-white/10 bg-[#0a0d18]/60 p-10 md:p-14 backdrop-blur-2xl overflow-hidden">
              <BorderBeam size={500} duration={18} colorFrom="#f97316" colorTo="#8b5cf6" />
              
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none"></div>
              
              <div className="relative z-10 text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
                  <Activity className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                  <span className="text-[10px] font-black text-orange-400 uppercase tracking-[0.25em]">{t('about.aiInsightBadge')}</span>
                </div>
                
                <div className="max-w-3xl mx-auto">
                  {isLoadingInsight ? (
                    <div className="space-y-3">
                      <div className="h-6 w-3/4 mx-auto rounded-full bg-white/5 animate-pulse"></div>
                      <div className="h-6 w-1/2 mx-auto rounded-full bg-white/5 animate-pulse"></div>
                    </div>
                  ) : (
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-relaxed">
                      {aiInsight}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                  <Brain className="w-3 h-3" />
                  <span>{t('about.aiInsightPowered')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════
            MISSION / WHO / VISION CARDS
            ═══════════════════════════════════════════ */}
        <div className="container mx-auto px-4 max-w-6xl mb-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
              {t('about.knowUs')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">{t('about.knowUsHL')}</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: Target, titleKey: 'about.mission', descKey: 'about.missionDesc', gradient: 'from-orange-600 to-amber-600' },
              { icon: Users, titleKey: 'about.whoWeAre', descKey: 'about.whoWeAreDesc', gradient: 'from-violet-600 to-purple-600' },
              { icon: Sparkles, titleKey: 'about.vision', descKey: 'about.visionDesc', gradient: 'from-emerald-600 to-teal-600' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <MagicCard className="p-8 rounded-[2rem] bg-[#0d111c]/40 border-white/10 h-full group hover:border-orange-500/20 transition-all duration-500">
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{t(item.titleKey)}</h3>
                  <p className="text-slate-400 leading-relaxed">{t(item.descKey)}</p>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            TIMELINE — Company Milestones
            ═══════════════════════════════════════════ */}
        <div className="container mx-auto px-4 max-w-5xl mb-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
              {t('about.timelineTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">{t('about.timelineHL')}</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-500/30 via-purple-500/20 to-transparent hidden md:block"></div>
            
            <div className="space-y-12">
              {milestones.map((ms, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7 }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="flex-1">
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-orange-500/20 transition-all duration-400 hover-glow-orange">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${ms.color} flex items-center justify-center shadow-lg`}>
                          <ms.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest bg-orange-500/10 px-2.5 py-1 rounded-full">{ms.year}</span>
                      </div>
                      <h4 className="text-lg font-black text-white mb-1">{ms.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{ms.desc}</p>
                    </div>
                  </div>
                  
                  {/* Center dot (hidden mobile) */}
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)] flex-shrink-0 z-10"></div>
                  
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            TECH STACK
            ═══════════════════════════════════════════ */}
        <div className="container mx-auto px-4 max-w-5xl mb-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
              {t('about.techTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">{t('about.techHL')}</span>
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">{t('about.techSubtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(249, 115, 22, 0.3)' }}
                className="text-center p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4">
                  <tech.icon className="h-6 w-6 text-orange-400" />
                </div>
                <h4 className="text-sm font-black text-white mb-1">{tech.name}</h4>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            CTA — Join the Mission
            ═══════════════════════════════════════════ */}
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              {t('about.ctaTitle1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 animate-text-glow">{t('about.ctaHL')}</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              {t('about.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/register"
                className="group px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black uppercase tracking-widest text-xs hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:scale-[1.03] transition-all duration-300 flex items-center gap-3 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center gap-3">
                  {t('about.ctaBtn1')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                href="/pricing"
                className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 hover:border-orange-500/25 transition-all duration-300"
              >
                {t('about.ctaBtn2')}
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
