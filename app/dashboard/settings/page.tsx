"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Settings, User, Bell, Shield, CreditCard, Key, CheckCircle, Save, Eye, EyeOff, Copy, AlertCircle, Trash2, Plus } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { useState } from "react";

type Tab = "profile" | "apikeys" | "billing" | "notifications" | "security";

const tabs: { id: Tab; name: string; icon: any }[] = [
  { id: "profile", name: "Profile", icon: User },
  { id: "apikeys", name: "API Keys", icon: Key },
  { id: "billing", name: "Billing", icon: CreditCard },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "security", name: "Security", icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [toast, setToast] = useState<string | null>(null);

  // Profile state
  const [fullName, setFullName] = useState("Admin User");
  const [email, setEmail] = useState("admin@allmysell.com");

  // API Keys state
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [apiKeys, setApiKeys] = useState([
    { id: "groq", name: "Groq API Key", value: "gsk_avNMA5K...wgPHun", status: "active" },
    { id: "gemini", name: "Gemini API Key", value: "AQ.Ab8RN6...hCUJhA", status: "active" },
    { id: "openai", name: "OpenAI API Key", value: "sk-proj-pZ...Q1AA", status: "active" },
  ]);

  // Notifications state
  const [notifs, setNotifs] = useState({
    emailAlerts: true,
    trendAlerts: true,
    automationAlerts: false,
    weeklyReport: true,
    priceDrops: false,
  });

  // Security state
  const [twoFA, setTwoFA] = useState(false);

  // Marketplace state
  const [marketplaces, setMarketplaces] = useState([
    { id: "ebay", name: "eBay Account", icon: "🛍️", connected: false, detail: "Not connected" },
    { id: "shopify", name: "Shopify Store", icon: "🏪", connected: true, detail: "allmysell.myshopify.com" },
    { id: "etsy", name: "Etsy Shop", icon: "🎨", connected: false, detail: "Not connected" },
    { id: "amazon", name: "Amazon Seller", icon: "📦", connected: false, detail: "Not connected" },
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleMarketplace = (id: string) => {
    setMarketplaces(prev => prev.map(m =>
      m.id === id ? {
        ...m,
        connected: !m.connected,
        detail: m.connected ? "Not connected" : `Connected to allmysell.${m.id}.com`,
      } : m
    ));
    const mp = marketplaces.find(m => m.id === id);
    showToast(mp?.connected ? `${mp.name} disconnected.` : `${mp?.name} connected!`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    showToast("Copied to clipboard!");
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <AnimatedGradientText className="mb-2 !mx-0 !justify-start">
          <span className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-orange-400" />
            Preferences
          </span>
        </AnimatedGradientText>
        <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        <p className="text-slate-400 mt-1">Manage your API keys, billing, and profile details.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="md:col-span-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3 space-y-6"
        >
          {/* ===== PROFILE TAB ===== */}
          {activeTab === "profile" && (
            <>
              <div className="rounded-2xl border border-white/10 bg-[#080c16] p-6 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Profile Information</h2>

                <div className="flex items-center gap-6 mb-8">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                    {fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <button
                      onClick={() => showToast("Avatar upload coming soon!")}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors mb-2 text-white"
                    >
                      Change Avatar
                    </button>
                    <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
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
              </div>

              {/* Connected Marketplaces */}
              <div className="rounded-2xl border border-white/10 bg-[#080c16] p-6 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Connected Marketplaces</h2>
                <div className="space-y-4">
                  {marketplaces.map((mp) => (
                    <div
                      key={mp.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        mp.connected ? "border-green-500/20 bg-green-500/5" : "border-white/5 bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{mp.icon}</div>
                        <div>
                          <p className="font-medium text-white">{mp.name}</p>
                          <p className={`text-xs ${mp.connected ? "text-green-400" : "text-slate-400"}`}>
                            {mp.connected ? `Connected to ${mp.detail}` : mp.detail}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleMarketplace(mp.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          mp.connected
                            ? "bg-white/5 border border-white/10 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/20 text-white"
                            : "bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500/20"
                        }`}
                      >
                        {mp.connected ? "Disconnect" : "Connect"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ===== API KEYS TAB ===== */}
          {activeTab === "apikeys" && (
            <div className="rounded-2xl border border-white/10 bg-[#080c16] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <h2 className="text-xl font-bold text-white">API Keys</h2>
                <button
                  onClick={() => showToast("Add your key in .env.local file on your server.")}
                  className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-lg text-sm hover:bg-orange-500/20"
                >
                  <Plus className="h-3 w-3" /> Add Key
                </button>
              </div>
              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div key={key.id} className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-white">{key.name}</p>
                        <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">{key.status}</span>
                      </div>
                      <p className="text-sm text-slate-400 font-mono truncate">
                        {showKeys[key.id] ? key.value : "•••••••••••••••••••••"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => setShowKeys(prev => ({ ...prev, [key.id]: !prev[key.id] }))}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400"
                        title={showKeys[key.id] ? "Hide" : "Show"}
                      >
                        {showKeys[key.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(key.value)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400"
                        title="Copy"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                <p className="text-xs text-blue-300">💡 API keys are stored securely in your server environment variables (.env.local). Never expose them in client-side code.</p>
              </div>
            </div>
          )}

          {/* ===== BILLING TAB ===== */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-amber-500/5 p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">Pro Plan</h2>
                    <p className="text-slate-400 text-sm">Unlimited AI research, automations, and marketplace integrations.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">$29<span className="text-sm text-slate-400">/mo</span></p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => showToast("Billing portal coming soon!")}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors text-white"
                  >
                    Manage Plan
                  </button>
                  <button
                    onClick={() => showToast("Invoice download coming soon!")}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors text-white"
                  >
                    Download Invoice
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#080c16] p-6 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-4">Usage This Month</h2>
                <div className="space-y-4">
                  {[
                    { name: "AI Research Queries", used: 142, limit: 500, pct: 28 },
                    { name: "Trend Scans", used: 38, limit: 100, pct: 38 },
                    { name: "Active Automations", used: 3, limit: 20, pct: 15 },
                    { name: "API Calls", used: 1240, limit: 10000, pct: 12 },
                  ].map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">{item.name}</span>
                        <span className="text-slate-300 font-medium">{item.used} / {item.limit}</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500" style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== NOTIFICATIONS TAB ===== */}
          {activeTab === "notifications" && (
            <div className="rounded-2xl border border-white/10 bg-[#080c16] p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { key: "emailAlerts", name: "Email Alerts", desc: "Receive important updates via email" },
                  { key: "trendAlerts", name: "Trend Alerts", desc: "Get notified when a tracked niche spikes" },
                  { key: "automationAlerts", name: "Automation Status", desc: "Alerts when automations fail or complete" },
                  { key: "weeklyReport", name: "Weekly Report", desc: "Summary of your activity every Monday" },
                  { key: "priceDrops", name: "Price Drop Alerts", desc: "Notify when tracked products drop in price" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => {
                        setNotifs(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }));
                        showToast(`${item.name} ${notifs[item.key as keyof typeof notifs] ? "disabled" : "enabled"}.`);
                      }}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifs[item.key as keyof typeof notifs] ? "bg-orange-500" : "bg-white/10"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow ${
                          notifs[item.key as keyof typeof notifs] ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== SECURITY TAB ===== */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#080c16] p-6 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Security Settings</h2>

                <div className="space-y-6">
                  {/* Password */}
                  <div className="p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Password</p>
                        <p className="text-xs text-slate-400">Last changed 30 days ago</p>
                      </div>
                      <button
                        onClick={() => showToast("Password change email sent!")}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors text-white"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>

                  {/* 2FA */}
                  <div className="p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Two-Factor Authentication</p>
                        <p className="text-xs text-slate-400">{twoFA ? "Enabled — your account is extra secure" : "Not enabled — add an extra layer of security"}</p>
                      </div>
                      <button
                        onClick={() => {
                          setTwoFA(!twoFA);
                          showToast(twoFA ? "2FA disabled." : "2FA enabled successfully!");
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          twoFA
                            ? "bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400"
                            : "bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500/20"
                        }`}
                      >
                        {twoFA ? "Disable 2FA" : "Enable 2FA"}
                      </button>
                    </div>
                  </div>

                  {/* Sessions */}
                  <div className="p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Active Sessions</p>
                        <p className="text-xs text-slate-400">1 active session (this device)</p>
                      </div>
                      <button
                        onClick={() => showToast("All other sessions signed out.")}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/20 transition-colors text-white"
                      >
                        Sign Out Others
                      </button>
                    </div>
                  </div>

                  {/* Delete Account */}
                  <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-400">Delete Account</p>
                        <p className="text-xs text-slate-400">Permanently delete your account and all data</p>
                      </div>
                      <button
                        onClick={() => showToast("Account deletion requires email confirmation.")}
                        className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
