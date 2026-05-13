"use client";

import { motion } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Users, Target, Rocket, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function AboutPage() {
  const { t } = useI18n();
  return (
    <div className="bg-[#030712] min-h-screen text-white pt-24 selection:bg-orange-500/30">
      <div className="absolute inset-0 z-0 h-[50vh] overflow-hidden pointer-events-none">
        <Particles quantity={40} color="#F97316" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-5xl pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <AnimatedGradientText className="mb-6">
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-400" />
              <span>{t('about.badge')}</span>
            </span>
          </AnimatedGradientText>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            {t('about.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">{t('about.title2')}</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">{t('about.journeyTitle')}</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                The story of Melih and Şükür Yunus did not begin with big plans, ready capital, or long-term startup dreams. It started in a much more ordinary way: they met while working at the same workplace. Different lives, different paths, but very similar struggles.
              </p>
              <p>
                At that time, Şükür Yunus was attending his own university while actively working in e-commerce. He didn&apos;t learn this business from theory alone; he learned it by being inside it. He tested products, made sales, lost money, adjusted, and tried again.
              </p>
              <p>
                Melih&apos;s situation followed a different rhythm. He was also attending university under heavy conditions. The thought that &quot;this cannot be it&quot; became impossible to ignore. Watching Şükür Yunus operate in e-commerce opened a door in Melih&apos;s mind.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-tr from-orange-500/20 to-amber-500/5 border border-white/10 p-2 overflow-hidden backdrop-blur-sm relative">
              <div className="absolute inset-0 bg-slate-950/80 rounded-xl m-2 flex items-center justify-center border border-white/5">
                <div className="text-center p-8">
                  <Rocket className="w-16 h-16 text-orange-400 mx-auto mb-4 opacity-50" />
                  <p className="text-xl font-medium text-slate-400 italic">&quot;AllMySell is not a story that was told. It is a process that was lived.&quot;</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-32">
          {[
            { icon: Target, titleKey: 'about.mission', descKey: 'about.missionDesc' },
            { icon: Users, titleKey: 'about.whoWeAre', descKey: 'about.whoWeAreDesc' },
            { icon: Sparkles, titleKey: 'about.vision', descKey: 'about.visionDesc' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 hover:bg-white/10 transition-all group"
            >
              <item.icon className="h-10 w-10 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3">{t(item.titleKey)}</h3>
              <p className="text-slate-400">{t(item.descKey)}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
