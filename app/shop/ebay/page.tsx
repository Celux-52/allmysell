"use client";

import { motion } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import { BorderBeam } from "@/components/ui/border-beam";
import { Lock, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

export default function EbayShopPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center relative overflow-hidden pt-20">
      <Particles className="absolute inset-0 z-0" quantity={150} color="#3b82f6" ease={40} />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full filter blur-[150px] animate-pulse-glow pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.5 }}
        className="relative z-10 p-8 md:p-16 rounded-3xl bg-slate-950/60 border border-white/10 backdrop-blur-xl shadow-2xl max-w-3xl w-full mx-4 text-center overflow-hidden"
      >
        <BorderBeam size={400} duration={8} colorFrom="#3b82f6" colorTo="#8b5cf6" />
        
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="inline-block mb-6"
        >
          <div className="relative">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 flex items-center justify-center shadow-2xl">
              <span className="text-5xl">🛍️</span>
            </div>
            <Lock className="h-10 w-10 text-blue-500 absolute -bottom-2 -right-2" />
          </div>
        </motion.div>

        <AnimatedGradientText className="mb-6 mx-auto">
          <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
            <Wrench className="h-4 w-4" />
            Integration In Progress
          </span>
        </AnimatedGradientText>

        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
        >
          eBay Module is <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500 animate-text-shimmer">
            Under Construction
          </span>
        </motion.h1>

        <motion.p className="text-lg md:text-xl text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed">
          We are building the ultimate eBay synchronization engine. Automatic listings, dynamic pricing, and inventory management will be available here soon.
        </motion.p>

        <motion.div className="flex justify-center gap-4 flex-wrap">
          <Link 
            href="/shop"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
          >
            Back to Integrations
          </Link>
          <Link 
            href="/dashboard"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all hover:bg-slate-200"
          >
            Dashboard
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
