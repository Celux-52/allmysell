'use client';

import { Settings, Globe, Bell, Shield, Database } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">Settings</h1>
        <p className="text-stone-500 text-sm">Platform configuration and preferences</p>
      </div>

      <div className="space-y-6">
        {/* General */}
        <div className="bg-stone-50 rounded-xl border border-white/5 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-900 mb-4">
            <Globe size={20} className="text-purple-400" />
            General
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-stone-500 mb-1.5">Site Name</label>
              <input type="text" defaultValue="AllMySell" className="w-full px-3 py-2 bg-[#FAFAF9] border border-white/10 rounded-lg text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30" />
            </div>
            <div>
              <label className="block text-sm text-stone-500 mb-1.5">Site URL</label>
              <input type="url" defaultValue="https://allmysell.com" className="w-full px-3 py-2 bg-[#FAFAF9] border border-white/10 rounded-lg text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-stone-50 rounded-xl border border-white/5 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-900 mb-4">
            <Bell size={20} className="text-purple-400" />
            Notifications
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Email on new user registration', checked: true },
              { label: 'Email on new subscription', checked: true },
              { label: 'Weekly analytics digest', checked: false },
            ].map((item) => (
              <label key={item.label} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked={item.checked} className="w-4 h-4 rounded border-white/20 bg-[#FAFAF9] text-purple-600 focus:ring-purple-500" />
                <span className="text-sm text-stone-600">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-stone-50 rounded-xl border border-white/5 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-900 mb-4">
            <Shield size={20} className="text-purple-400" />
            Security
          </h2>
          <p className="text-sm text-stone-500 mb-4">Authentication managed by Supabase Auth</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between py-2">
              <span className="text-stone-600">Email/Password Login</span>
              <span className="text-emerald-400 text-xs">Enabled</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-white/5">
              <span className="text-stone-600">Google OAuth</span>
              <span className="text-amber-400 text-xs">Configure in Supabase</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-white/5">
              <span className="text-stone-600">GitHub OAuth</span>
              <span className="text-amber-400 text-xs">Configure in Supabase</span>
            </div>
          </div>
        </div>

        {/* Database */}
        <div className="bg-stone-50 rounded-xl border border-white/5 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-900 mb-4">
            <Database size={20} className="text-purple-400" />
            Database
          </h2>
          <p className="text-sm text-stone-500">Supabase PostgreSQL — Northeast Asia (Tokyo)</p>
          <p className="text-xs text-gray-600 mt-1">Project: cadmemzncpvbarvgklsa</p>
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-stone-900 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all opacity-50 cursor-not-allowed" disabled>
          Save Settings (Coming Soon)
        </button>
      </div>
    </div>
  );
}
