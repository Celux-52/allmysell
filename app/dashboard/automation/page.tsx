"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { Zap, Play, Pause, Settings2, Plus, ArrowRight, Loader2, CheckCircle, Trash2, X, Edit3, Save, Clock, Target, RefreshCw } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Automation {
  id: number;
  name: string;
  status: "Active" | "Paused";
  target: string;
  frequency: string;
  icon: string;
  lastRun: string;
  runs: number;
}

const PLATFORMS = ["Etsy", "Amazon", "eBay", "Shopify", "TikTok Shop", "All Platforms"];
const FREQUENCIES = ["Every 6h", "Every 12h", "Daily", "Every 3 days", "Weekly"];
const ICONS = ["🔥", "💰", "📈", "🛒", "🎯", "⚡", "🚀", "🔍", "📦", "🏷️"];

const initialAutomations: Automation[] = [
  { id: 1, name: "Auto-Scrape Bestsellers", status: "Active", target: "Etsy", frequency: "Every 12h", icon: "🔥", lastRun: "2 hours ago", runs: 48 },
  { id: 2, name: "Price Tracker", status: "Paused", target: "Amazon", frequency: "Daily", icon: "💰", lastRun: "1 day ago", runs: 31 },
  { id: 3, name: "Keyword Rank Check", status: "Active", target: "Shopify", frequency: "Weekly", icon: "📈", lastRun: "3 days ago", runs: 12 },
];

export default function AutomationPage() {
  const router = useRouter();
  const [automations, setAutomations] = useState<Automation[]>(initialAutomations);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // New form state
  const [newName, setNewName] = useState("");
  const [newTarget, setNewTarget] = useState("All Platforms");
  const [newFreq, setNewFreq] = useState("Daily");
  const [newIcon, setNewIcon] = useState("⚡");

  // Edit state
  const [editName, setEditName] = useState("");
  const [editTarget, setEditTarget] = useState("");
  const [editFreq, setEditFreq] = useState("");

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleStatus = async (id: number) => {
    setTogglingId(id);
    await new Promise(r => setTimeout(r, 600));
    setAutomations(prev => prev.map(a =>
      a.id === id ? { ...a, status: a.status === "Active" ? "Paused" : "Active" } : a
    ));
    const auto = automations.find(a => a.id === id);
    showToast(`"${auto?.name}" ${auto?.status === "Active" ? "paused" : "activated"}.`);
    setTogglingId(null);
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    await new Promise(r => setTimeout(r, 500));
    const name = automations.find(a => a.id === id)?.name;
    setAutomations(prev => prev.filter(a => a.id !== id));
    showToast(`"${name}" deleted.`);
    setDeletingId(null);
  };

  const handleCreate = () => {
    if (!newName.trim()) {
      showToast("Please enter a name.", "error");
      return;
    }
    const newAuto: Automation = {
      id: Date.now(),
      name: newName.trim(),
      status: "Active",
      target: newTarget,
      frequency: newFreq,
      icon: newIcon,
      lastRun: "Just created",
      runs: 0,
    };
    setAutomations(prev => [newAuto, ...prev]);
    setNewName("");
    setShowNewForm(false);
    showToast(`"${newAuto.name}" created and activated!`);
  };

  const startEdit = (auto: Automation) => {
    setEditingId(auto.id);
    setEditName(auto.name);
    setEditTarget(auto.target);
    setEditFreq(auto.frequency);
  };

  const saveEdit = (id: number) => {
    if (!editName.trim()) return;
    setAutomations(prev => prev.map(a =>
      a.id === id ? { ...a, name: editName.trim(), target: editTarget, frequency: editFreq } : a
    ));
    setEditingId(null);
    showToast("Automation updated.");
  };

  const activeCount = automations.filter(a => a.status === "Active").length;

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
          onClick={() => setShowNewForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg text-sm font-medium hover:from-orange-500 hover:to-amber-500 transition-colors shadow-[0_0_20px_rgba(249,115,22,0.3)] text-white"
        >
          <Plus className="h-4 w-4" /> New Automation
        </button>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`flex items-center gap-3 p-3 rounded-xl ${
              toast.type === "success"
                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}
          >
            <CheckCircle className="h-5 w-5" />
            <p className="text-sm font-medium">{toast.msg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Automation Form */}
      <AnimatePresence>
        {showNewForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 rounded-xl border border-orange-500/20 bg-[#080c16] shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Create New Automation</h3>
                <button onClick={() => setShowNewForm(false)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Etsy Trend Scanner"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Target Platform</label>
                  <select
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50 appearance-none"
                  >
                    {PLATFORMS.map(p => <option key={p} value={p} className="bg-[#0a0f1a]">{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Frequency</label>
                  <select
                    value={newFreq}
                    onChange={(e) => setNewFreq(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50 appearance-none"
                  >
                    {FREQUENCIES.map(f => <option key={f} value={f} className="bg-[#0a0f1a]">{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Icon</label>
                  <div className="flex gap-2 flex-wrap">
                    {ICONS.map(icon => (
                      <button
                        key={icon}
                        onClick={() => setNewIcon(icon)}
                        className={`h-9 w-9 rounded-lg flex items-center justify-center text-lg border transition-colors ${
                          newIcon === icon ? "bg-orange-500/20 border-orange-500/40" : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowNewForm(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-white">Cancel</button>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg text-sm font-medium text-white hover:from-orange-500 hover:to-amber-500"
                >
                  Create & Activate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Automation List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-4"
        >
          {automations.length === 0 && (
            <div className="p-12 text-center rounded-xl border border-white/10 bg-[#080c16]">
              <Zap className="h-10 w-10 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No Automations Yet</h3>
              <p className="text-sm text-slate-400 mb-4">Create your first automation to get started.</p>
              <button onClick={() => setShowNewForm(true)} className="px-4 py-2 bg-orange-600 rounded-lg text-sm font-medium text-white hover:bg-orange-500">
                <Plus className="h-4 w-4 inline mr-1" /> Create Automation
              </button>
            </div>
          )}

          <AnimatePresence>
            {automations.map((auto, i) => (
              <motion.div
                key={auto.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ delay: i * 0.05 }}
                layout
              >
                <MagicCard className="p-6 group hover:border-orange-500/30">
                  {editingId === auto.id ? (
                    /* Edit Mode */
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs text-slate-400 mb-1 block">Name</label>
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 mb-1 block">Target</label>
                          <select
                            value={editTarget}
                            onChange={(e) => setEditTarget(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none appearance-none"
                          >
                            {PLATFORMS.map(p => <option key={p} value={p} className="bg-[#0a0f1a]">{p}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 mb-1 block">Frequency</label>
                          <select
                            value={editFreq}
                            onChange={(e) => setEditFreq(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none appearance-none"
                          >
                            {FREQUENCIES.map(f => <option key={f} value={f} className="bg-[#0a0f1a]">{f}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setEditingId(null)} className="px-3 py-1.5 text-xs text-slate-400 hover:text-white">Cancel</button>
                        <button onClick={() => saveEdit(auto.id)} className="px-3 py-1.5 bg-orange-600 rounded-lg text-xs font-medium text-white hover:bg-orange-500 flex items-center gap-1">
                          <Save className="h-3 w-3" /> Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-inner flex-shrink-0">
                        {auto.icon}
                      </div>
                      <div className="flex-1 text-center sm:text-left min-w-0">
                        <h3 className="text-lg font-bold text-white mb-1">{auto.name}</h3>
                        <div className="flex items-center justify-center sm:justify-start gap-3 text-sm text-slate-400 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" /> <strong className="text-slate-300">{auto.target}</strong>
                          </span>
                          <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
                          <span className="flex items-center gap-1">
                            <RefreshCw className="h-3 w-3" /> <strong className="text-slate-300">{auto.frequency}</strong>
                          </span>
                          <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {auto.lastRun}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Status Toggle */}
                        <button
                          onClick={() => toggleStatus(auto.id)}
                          disabled={togglingId === auto.id}
                        >
                          {togglingId === auto.id ? (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm">
                              <Loader2 className="h-3 w-3 animate-spin" />
                            </div>
                          ) : auto.status === "Active" ? (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium cursor-pointer hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-colors group/btn">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 group-hover/btn:bg-red-400"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 group-hover/btn:bg-red-500"></span>
                              </span>
                              <span className="group-hover/btn:hidden">Active</span>
                              <span className="hidden group-hover/btn:inline">Pause</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-500/10 border border-slate-500/20 text-slate-400 text-sm font-medium cursor-pointer hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/20 transition-colors">
                              <Play className="h-3 w-3" /> Resume
                            </div>
                          )}
                        </button>
                        {/* Edit */}
                        <button
                          onClick={() => startEdit(auto)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-orange-400"
                          title="Edit"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(auto.id)}
                          disabled={deletingId === auto.id}
                          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-slate-400 hover:text-red-400"
                          title="Delete"
                        >
                          {deletingId === auto.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  )}
                </MagicCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* System Status */}
          <div className="rounded-xl border border-white/5 bg-[#080c16] p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="h-32 w-32 text-orange-500" />
            </div>
            <h3 className="font-semibold text-white mb-4 relative z-10">System Status</h3>
            <div className="space-y-4 relative z-10">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Active Automations</span>
                  <span className="text-orange-400 font-bold">{activeCount} / {automations.length}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
                    style={{ width: `${automations.length > 0 ? (activeCount / automations.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Total Runs</span>
                  <span className="text-green-400 font-bold">{automations.reduce((s, a) => s + a.runs, 0)}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-full" />
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

          {/* Quick Links */}
          <div className="rounded-xl border border-white/5 bg-gradient-to-b from-[#080c16] to-transparent p-6 shadow-xl flex flex-col gap-4">
            <h3 className="font-semibold text-white">Quick Actions</h3>
            <button
              onClick={() => setShowNewForm(true)}
              className="flex items-center justify-between p-3 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 transition-colors border border-orange-500/20 group"
            >
              <span className="text-sm text-orange-400 font-medium">Create New Automation</span>
              <Plus className="h-4 w-4 text-orange-500 group-hover:rotate-90 transition-transform" />
            </button>
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
            <button
              onClick={() => router.push('/dashboard/history')}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group"
            >
              <span className="text-sm text-slate-300">View Run History</span>
              <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-orange-400" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
