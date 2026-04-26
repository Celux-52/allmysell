"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Settings, User, CheckCircle, Save, Brain, Sparkles, Crown, Lock } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { useState } from "react";

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
  const [toast, setToast] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-8 pb-10 max-w-4xl">
      <div>
        <AnimatedGradientText className="mb-2 !mx-0 !justify-start">
          <span className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-orange-400" />
            Account
          </span>
        </AnimatedGradientText>
        <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        <p className="text-slate-400 mt-1">Manage your profile and view platform capabilities.</p>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400"
          >
            <CheckCircle className="h-5 w-5" />
            <p className="text-sm font-medium">{toast}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-[#080c16] p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-orange-400" />
          Profile Information
        </h2>

        <div className="flex items-center gap-6 mb-8">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]">
            {fullName ? fullName.charAt(0).toUpperCase() : "A"}
          </div>
          <div>
            <p className="text-white font-semibold text-lg">{fullName || "Admin User"}</p>
            <p className="text-sm text-slate-400">{email || "Set your email below"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50 transition-colors placeholder:text-slate-600"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50 transition-colors placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-white/5">
          <button
            onClick={() => showToast("Profile saved successfully!")}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg text-sm font-medium hover:from-orange-500 hover:to-amber-500 transition-colors text-white shadow-lg shadow-orange-500/20"
          >
            <Save className="h-4 w-4" /> Save Changes
          </button>
        </div>
      </motion.div>

      {/* AI Models Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-white/10 bg-[#080c16] p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4 flex items-center gap-2">
          <Brain className="h-5 w-5 text-orange-400" />
          AI Models Used
        </h2>
        <p className="text-sm text-slate-400 mb-6">These are the AI models powering your Smart Research, Trend Analysis, and Consensus Engine.</p>

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
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Premium Plan Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-amber-500/5 p-6 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-4 right-4 opacity-10">
          <Crown className="h-24 w-24 text-orange-500" />
        </div>

        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2 relative z-10">
          <Crown className="h-5 w-5 text-orange-400" />
          Premium Plan
        </h2>
        <p className="text-sm text-slate-400 mb-6 relative z-10">Unlock unlimited AI research, automations, and marketplace integrations.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 relative z-10">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
            <p className="text-2xl font-bold text-white mb-1">Free</p>
            <p className="text-xs text-slate-400 mb-3">Current Plan</p>
            <ul className="text-xs text-slate-400 space-y-1 text-left">
              <li>• 5 AI searches / day</li>
              <li>• 2 trend scans / day</li>
              <li>• 1 automation</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs px-3 py-0.5 rounded-full font-bold">POPULAR</div>
            <p className="text-2xl font-bold text-white mb-1">$29<span className="text-sm text-slate-400">/mo</span></p>
            <p className="text-xs text-orange-400 mb-3 font-semibold">Pro Plan</p>
            <ul className="text-xs text-slate-300 space-y-1 text-left">
              <li>• Unlimited AI research</li>
              <li>• Unlimited trend scans</li>
              <li>• 20 automations</li>
              <li>• Priority support</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
            <p className="text-2xl font-bold text-white mb-1">$79<span className="text-sm text-slate-400">/mo</span></p>
            <p className="text-xs text-slate-400 mb-3">Enterprise</p>
            <ul className="text-xs text-slate-400 space-y-1 text-left">
              <li>• Everything in Pro</li>
              <li>• Custom AI models</li>
              <li>• Unlimited automations</li>
              <li>• Dedicated support</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => showToast("Stripe payment integration coming soon!")}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg text-sm font-medium hover:from-orange-500 hover:to-amber-500 transition-colors text-white shadow-lg shadow-orange-500/20"
          >
            <Crown className="h-4 w-4" /> Upgrade to Pro
          </button>
          <p className="text-xs text-slate-500">Payments powered by Stripe • Cancel anytime</p>
        </div>
      </motion.div>

      {/* Admin Access Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 rounded-xl border border-white/5 bg-white/[0.02]"
      >
        <div className="flex items-center gap-2 mb-2">
          <Lock className="h-4 w-4 text-slate-400" />
          <p className="text-sm font-semibold text-slate-300">Admin Access</p>
        </div>
        <p className="text-xs text-slate-500">This dashboard is currently restricted to admin accounts only. Public access will be available after Stripe integration is complete.</p>
      </motion.div>
    </div>
  );
}
