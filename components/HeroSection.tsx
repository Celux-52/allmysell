"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, Globe, Terminal, Cpu } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#050810] pt-20">
      <Particles
        className="absolute inset-0 z-0"
        quantity={80}
        ease={80}
        color="#F97316"
        refresh
      />

      {/* Cinematic Lighting */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full filter blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full filter blur-[150px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-200">
              Intelligence OS V2.0 // DEPLOYED
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-white mb-8 leading-[0.85]">
            ETSY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-amber-600 animate-text-shimmer">
              SNIPER
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-14 leading-relaxed font-medium uppercase tracking-tight">
            Deploy autonomous AI agents to scan market gaps and <br className="hidden md:block" /> 
            generate high-yield listings in <span className="text-white">milliseconds.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/login"
            className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-white px-10 py-5 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-orange-500 hover:text-white overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center gap-2">
               Initialize Panel <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-10 py-5 text-sm font-black uppercase tracking-widest text-white backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20"
          >
            <Terminal className="w-4 h-4 text-orange-500" />
            Register Identity
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {[
            { icon: Globe, label: "Market Nexus" },
            { icon: Cpu, label: "Neural Forge" },
            { icon: Shield, label: "Alpha Security" },
            { icon: Zap, label: "Instant Output" },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center justify-center gap-4 group">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-orange-500/10 group-hover:border-orange-500/20 transition-all duration-500">
                <feature.icon className="h-6 w-6 text-orange-500" />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-white transition-colors">{feature.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-slate-700"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-black">Downlink</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-orange-500/50 via-orange-500/10 to-transparent" />
      </motion.div>
    </section>
  );
}
