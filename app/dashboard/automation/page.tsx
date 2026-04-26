"use client";

import { motion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { Zap, Play, Pause, Settings2, Plus, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Automation {
  id: number;
  name: string;
  status: string;
  target: string;
  frequency: string;
  icon: string;
}

const initialAutomations: Automation[] = [
  { id: 1, name: "Auto-Scrape Bestsellers", status: "Active", target: "Etsy", frequency: "Every 12h", icon: "🔥" },
  { id: 2, name: "Price Tracker", status: "Paused", target: "Amazon", frequency: "Daily", icon: "💰" },
  { id: 3, name: "Keyword Rank Check", status: "Active", target: "Shopify", frequency: "Weekly", icon: "📈" },
];

export default function AutomationPage() {
  const router = useRouter();
  const [automations, setAutomations] = useState<Automation[]>(initialAutomations);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [showCreated, setShowCreated] = useState(false);

  const toggleStatus = async (id: number) => {
    setTogglingId(id);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setAutomations(prev => prev.map(a => 
      a.id === id ? { ...a, status: a.status === "Active" ? "Paused" : "Active" } : a
    ));
    setTogglingId(null);
  };

  const handleNewAutomation = () => {
    const newAuto: Automation = {
      id: Date.now(),
      name: "New Custom Automation",
      status: "Active",
      target: "All Platforms",
      frequency: "Daily",
      icon: "⚡",
    };
    setAutomations(prev => [newAuto, ...prev]);
    setShowCreated(true);
    setTimeout(() => setShowCreated(false), 3000);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <AnimatedGradientText className="mb-2 !mx-0 !justify-start">
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-400" />
              Automations
            </span>
          </AnimatedGradientText>
          <h1 className="text-3xl font-bold text-white">Workflow Engine</h1>
          <p className="text-slate-400 mt-1">Set up background tasks to run your e-commerce operations automatically.</p>
        </div>
        <button 
          onClick={handleNewAutomation}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg text-sm font-medium hover:from-orange-500 hover:to-amber-500 transition-colors shadow-[0_0_20px_rgba(249,115,22,0.3)] text-white"
        >
          <Plus className="h-4 w-4" /> New Automation
        </button>
      </div>

      {/* Success toast */}
      {showCreated && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400"
        >
          <CheckCircle className="h-5 w-5" />
          <p className="text-sm font-medium">New automation created and activated!</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-4"
        >
          {automations.map((auto, i) => (
            <motion.div
              key={auto.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <MagicCard className="p-6 flex flex-col sm:flex-row items-center gap-6 group hover:border-orange-500/30">
                <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-inner">
                  {auto.icon}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-white mb-1">{auto.name}</h3>
                  <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">Target: <strong className="text-slate-300">{auto.target}</strong></span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>Run: <strong className="text-slate-300">{auto.frequency}</strong></span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => toggleStatus(auto.id)}
                    disabled={togglingId === auto.id}
                  >
                    {togglingId === auto.id ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm">
                        <Loader2 className="h-3 w-3 animate-spin" /> Updating...
                      </div>
                    ) : auto.status === "Active" ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium cursor-pointer hover:bg-green-500/20 transition-colors">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Active
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-500/10 border border-slate-500/20 text-slate-400 text-sm font-medium cursor-pointer hover:bg-orange-500/10 hover:text-orange-400 transition-colors">
                        <Play className="h-3 w-3" /> Resume
                      </div>
                    )}
                  </button>
                  <button 
                    onClick={() => router.push('/dashboard/settings')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400"
                  >
                    <Settings2 className="h-5 w-5" />
                  </button>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="rounded-xl border border-white/5 bg-[#080c16] p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="h-32 w-32 text-orange-500" />
            </div>
            <h3 className="font-semibold text-white mb-4 relative z-10">System Load</h3>
            <div className="space-y-4 relative z-10">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">API Usage</span>
                  <span className="text-orange-400">75%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 w-[75%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Queue Status</span>
                  <span className="text-green-400">Healthy</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[20%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-gradient-to-b from-[#080c16] to-transparent p-6 shadow-xl flex flex-col gap-4">
            <h3 className="font-semibold text-white">Recommended Actions</h3>
            <button 
              onClick={() => router.push('/dashboard/research')}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group"
            >
              <span className="text-sm text-slate-300">Smart Product Research</span>
              <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-orange-400" />
            </button>
            <button 
              onClick={() => router.push('/dashboard/trends')}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group"
            >
              <span className="text-sm text-slate-300">View Live Trends</span>
              <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-orange-400" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
