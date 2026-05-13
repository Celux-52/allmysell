"use client";

import { motion } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { CheckCircle, XCircle, Code, Rocket, Shield, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const plans = [
  {
    id: 'basic',
    badge: '🥉',
    level: 'Level 1',
    name: 'Basic Setup',
    subtitle: '"Build & Deliver"',
    price: '$135',
    delivery: '3–5 days',
    highlight: false,
    color: "from-blue-500/20 to-cyan-500/10",
    border: "border-blue-500/20",
    features: [
      { text: 'Professional Homepage', included: true },
      { text: 'About & Services Pages', included: true },
      { text: 'Mobile Responsive', included: true },
      { text: 'SEO Optimization', included: false },
      { text: 'E-Commerce / Admin', included: false },
    ],
  },
  {
    id: 'professional',
    badge: '🥈',
    level: 'Level 2',
    name: 'Professional Growth',
    subtitle: '"In-Depth Work"',
    price: '$285',
    delivery: '7–12 days',
    highlight: true,
    color: "from-orange-500/20 to-amber-500/10",
    border: "border-orange-500/40",
    features: [
      { text: 'Everything in Basic', included: true },
      { text: 'Advanced SEO (Rank on Google)', included: true },
      { text: 'Site Speed Optimization', included: true },
      { text: 'Google Analytics 4', included: true },
      { text: 'E-Commerce / Stock', included: false },
    ],
  },
  {
    id: 'ecosystem',
    badge: '🥇',
    level: 'Level 3',
    name: 'Full Ecosystem',
    subtitle: '"Automation + Conversion"',
    price: '$585',
    delivery: '15–25 days',
    highlight: false,
    color: "from-purple-500/20 to-pink-500/10",
    border: "border-purple-500/20",
    features: [
      { text: 'Everything in Level 1 & 2', included: true },
      { text: 'Full E-Commerce Infrastructure', included: true },
      { text: 'AI Bot Integration', included: true },
      { text: 'Abandoned Cart Automations', included: true },
      { text: 'Conversion Tracking', included: true },
    ],
  },
];

export default function WebSolutionsPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center relative overflow-hidden selection:bg-orange-500/30 pt-24 pb-32">
      <Particles className="absolute inset-0 z-0" quantity={120} color="#F97316" ease={60} />
      
      <div className="absolute top-0 w-full h-[600px] overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[150px] mix-blend-screen animate-pulse-glow" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <AnimatedGradientText className="mb-6">
            <span className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
              <Globe className="h-4 w-4" />
              Professional Web Solutions
            </span>
          </AnimatedGradientText>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Build Your <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 animate-text-shimmer">
              Digital Empire
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            {t('web.subtitle')}
          </p>

          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-5 py-3 rounded-full text-sm font-medium backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.2)]">
            <span>⚠️</span>
            {t('web.domainNote')}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch mb-24">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, type: "spring", bounce: 0.4 }}
              className="h-full"
            >
              <MagicCard className={`h-full flex flex-col p-8 bg-slate-950/60 border ${plan.border} ${plan.highlight ? 'scale-105 shadow-2xl shadow-orange-500/20' : ''}`}>
                {plan.highlight && (
                  <div className="absolute top-0 inset-x-0">
                    <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white text-center py-1.5 text-xs font-bold uppercase tracking-widest rounded-t-xl">
                      ⭐ Most Popular
                    </div>
                  </div>
                )}
                {plan.highlight && <BorderBeam size={200} duration={12} delay={0} colorFrom="#f97316" colorTo="#f59e0b" />}

                <div className={`mt-${plan.highlight ? '6' : '0'} mb-6`}>
                  <div className="text-4xl mb-3">{plan.badge}</div>
                  <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-slate-400 text-sm italic mb-6">{plan.subtitle}</p>
                  
                  <div className="pb-6 border-b border-white/10">
                    <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 mb-1">{plan.price}</div>
                    <div className="text-slate-500 text-sm">{t('web.oneTime')}</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-1.5 rounded-full flex items-center gap-1"><Rocket className="h-3 w-3"/> {plan.delivery}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className={`flex items-start gap-3 text-sm ${feature.included ? 'text-slate-300' : 'text-slate-600'}`}>
                        {feature.included ? (
                          <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-slate-700 flex-shrink-0" />
                        )}
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  className={`block text-center py-4 rounded-xl font-semibold transition-all ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-[1.02]'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-orange-500/30'
                  }`}
                >
                  {t('web.getQuote')}
                </a>
              </MagicCard>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div 
          id="contact"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-950/80 p-8 md:p-12 text-center backdrop-blur-xl">
            <BorderBeam size={400} duration={15} colorFrom="#3b82f6" colorTo="#8b5cf6" />
            <Shield className="w-16 h-16 text-blue-500 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{t('web.readyToStart')}</h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
              {t('web.readyDesc')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href="https://wa.me/905537065912"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-white/5 border border-white/10 px-8 py-4 font-semibold text-white transition-all hover:bg-green-500/10 hover:border-green-500/50"
              >
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black">M</div>
                Message Melih
              </a>
              <a
                href="https://wa.me/905518343030"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-white/5 border border-white/10 px-8 py-4 font-semibold text-white transition-all hover:bg-orange-500/10 hover:border-orange-500/50"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-black">Y</div>
                Message Yunus
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
