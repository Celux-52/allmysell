"use client";

import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, CreditCard, Key } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

export default function SettingsPage() {
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2">
          {[
            { name: "Profile", icon: User, active: true },
            { name: "API Keys", icon: Key },
            { name: "Billing", icon: CreditCard },
            { name: "Notifications", icon: Bell },
            { name: "Security", icon: Shield },
          ].map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                item.active 
                  ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </button>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3 space-y-6"
        >
          {/* Profile Section */}
          <div className="rounded-2xl border border-white/10 bg-[#080c16] p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Profile Information</h2>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                A
              </div>
              <div>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors mb-2">
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
                  defaultValue="Admin User"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="admin@allmysell.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-white/5">
              <button className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg text-sm font-medium hover:from-orange-500 hover:to-amber-500 transition-colors text-white shadow-lg shadow-orange-500/20">
                Save Changes
              </button>
            </div>
          </div>

          {/* Connected Accounts placeholder */}
          <div className="rounded-2xl border border-white/10 bg-[#080c16] p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Connected Marketplaces</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">🛍️</div>
                  <div>
                    <p className="font-medium text-white">eBay Account</p>
                    <p className="text-xs text-slate-400">Not connected</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors text-white">
                  Connect
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg border border-green-500/20 bg-green-500/5">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">🏪</div>
                  <div>
                    <p className="font-medium text-white">Shopify Store</p>
                    <p className="text-xs text-green-400">Connected to allmysell.myshopify.com</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-red-500/20 hover:text-red-400 transition-colors text-white">
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
