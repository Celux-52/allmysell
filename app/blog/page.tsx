"use client";

import { motion } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { Hammer, Wrench, Lock, BookOpen } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center relative overflow-hidden selection:bg-orange-500/30">
      <Particles className="absolute inset-0 z-0" quantity={100} color="#F97316" ease={50} />
      
      {/* Heavy Glowing Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/10 rounded-full filter blur-[150px] animate-pulse-glow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/10 rounded-full filter blur-[100px] animate-pulse-glow delay-700 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.5 }}
        className="relative z-10 p-8 md:p-16 rounded-3xl bg-slate-950/60 border border-white/10 backdrop-blur-xl shadow-2xl max-w-3xl w-full mx-4 text-center overflow-hidden"
      >
        <BorderBeam size={300} duration={8} delay={0} colorFrom="#f97316" colorTo="#fbbf24" />
        
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="inline-block mb-6"
        >
          <div className="relative">
            <BookOpen className="h-20 w-20 text-orange-500 opacity-50" />
            <Lock className="h-10 w-10 text-white absolute bottom-0 right-0" />
          </div>
        </motion.div>

        <AnimatedGradientText className="mb-6 mx-auto">
          <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
            <Hammer className="h-4 w-4" />
            Under Construction
            <Wrench className="h-4 w-4" />
          </span>
        </AnimatedGradientText>

        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          The Blog is <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 animate-text-shimmer">
            Getting a Makeover
          </span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          We're writing the most actionable e-commerce strategies and guides. Our knowledge hub will be unlocked very soon. Stay tuned!
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center"
        >
          <Link 
            href="/"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all hover:bg-slate-200 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            Return Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
