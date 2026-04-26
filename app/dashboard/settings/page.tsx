"use client";

import { motion } from "framer-motion";
import { Settings, Brain, Sparkles, Lock } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

// AI Models used in the platform
const AI_MODELS = [
  { name: "Groq — Llama 3.3 70B", provider: "Groq", role: "Primary research engine", status: "active" },
  { name: "Gemini 2.0 Flash", provider: "Google", role: "Secondary analysis + fallback", status: "active" },
  { name: "DeepSeek R1", provider: "DeepSeek", role: "Best reasoning model for consensus", status: "active" },
  { name: "Qwen 3 72B", provider: "Alibaba", role: "Cross-validation + consensus", status: "active" },
  { name: "Llama 4 Scout 17B", provider: "Meta", role: "Fast consensus participant", status: "active" },
  { name: "Google Trends API", provider: "Google", role: "Real search volume & trend data", status: "active" },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-10 max-w-4xl">
      <div>
        <AnimatedGradientText className="mb-2 !mx-0 !justify-start">
          <span className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-orange-400" />
            Platform Settings
          </span>
        </AnimatedGradientText>
        <h1 className="text-3xl font-bold text-white">System Information</h1>
        <p className="text-slate-400 mt-1">View the active capabilities and models powering the platform.</p>
      </div>

      {/* AI Models Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-white/10 bg-[#080c16] p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4 flex items-center gap-2">
          <Brain className="h-5 w-5 text-orange-400" />
          Active AI Models
        </h2>
        <p className="text-sm text-slate-400 mb-6">These are the highly advanced AI models currently powering your Smart Research, Trend Analysis, and Consensus Engine. They run in parallel to guarantee high-accuracy results.</p>

        <div className="space-y-3">
          {AI_MODELS.map((model) => (
            <div
              key={model.name}
              className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{model.name}</p>
                  <p className="text-xs text-slate-400">{model.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded">{model.provider}</span>
                <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </span>
                  Online
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Admin Access Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 rounded-xl border border-white/5 bg-white/[0.02]"
      >
        <div className="flex items-center gap-2 mb-2">
          <Lock className="h-4 w-4 text-slate-400" />
          <p className="text-sm font-semibold text-slate-300">Admin Access Only</p>
        </div>
        <p className="text-xs text-slate-500">This dashboard and its AI capabilities are currently restricted to authorized administrators.</p>
      </motion.div>
    </div>
  );
}
