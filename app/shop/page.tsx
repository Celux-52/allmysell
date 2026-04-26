"use client";

import { motion } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { Lock, Zap, Server, Globe } from "lucide-react";
import Link from "next/link";
import { MagicCard } from "@/components/ui/magic-card";

const integrations = [
  { name: "eBay API", icon: Zap, delay: 0.1 },
  { name: "Etsy Sync", icon: Server, delay: 0.2 },
  { name: "Shopify Hub", icon: Globe, delay: 0.3 },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center relative overflow-hidden selection:bg-orange-500/30 pt-20">
      <Particles className="absolute inset-0 z-0" quantity={150} color="#F59E0B" ease={40} />
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-orange-600/15 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-amber-500/15 rounded-full blur-[150px] animate-pulse-glow delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl pb-20">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="mb-12 inline-block"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/30 blur-2xl rounded-full animate-pulse-glow" />
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 flex items-center justify-center shadow-2xl relative z-10">
              <Lock className="h-10 w-10 text-orange-400" />
              <BorderBeam size={100} duration={4} colorFrom="#f97316" colorTo="#ef4444" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedGradientText className="mb-6 mx-auto">
            <span className="flex items-center gap-2 font-bold tracking-widest uppercase">
              System Update in Progress
            </span>
          </AnimatedGradientText>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Stores Module <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 animate-text-shimmer">
              Under Construction
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            We are heavily upgrading our cross-platform integration engine. The APIs are currently being wired for eBay, Etsy, and Shopify.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {integrations.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + item.delay, type: "spring" }}
            >
              <MagicCard className="p-8 flex flex-col items-center text-center group cursor-not-allowed h-full bg-slate-950/40 backdrop-blur-md">
                <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="h-8 w-8 text-slate-500 group-hover:text-orange-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-300 mb-2">{item.name}</h3>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <p className="text-xs text-orange-400 mt-2 font-medium tracking-wider uppercase">Wiring API...</p>
              </MagicCard>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Link 
            href="/dashboard"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-orange-500/30"
          >
            Go to SaaS Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
