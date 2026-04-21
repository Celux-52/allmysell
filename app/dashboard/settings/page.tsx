'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Shield, Clock, Save } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function DashboardSettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        setUser(authUser);
        setFullName(authUser.user_metadata?.full_name || '');
      }
    }
    getUser();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      await supabase.auth.updateUser({
        data: { full_name: fullName },
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">Settings</h1>
        <p className="text-stone-500 text-sm">Manage your account preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <div className="bg-stone-50 rounded-xl border border-white/5 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-900 mb-4">
            <User size={20} className="text-stone-800" />
            Profile
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-stone-500 mb-1.5">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#FAFAF9] border border-white/10 rounded-lg text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8750A]/30"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm text-stone-500 mb-1.5">
                <Mail size={14} /> Email
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-3 py-2.5 bg-[#FAFAF9] border border-white/10 rounded-lg text-stone-400 text-sm cursor-not-allowed"
              />
              <p className="text-[10px] text-gray-600 mt-1">Email cannot be changed</p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-stone-900 !text-white hover:bg-stone-800 text-stone-900 rounded-lg text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-stone-50 rounded-xl border border-white/5 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-900 mb-4">
            <Shield size={20} className="text-stone-800" />
            Account Info
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2">
              <span className="text-stone-500">Provider</span>
              <span className="text-stone-900 capitalize">{user.app_metadata?.provider || 'email'}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-white/5">
              <span className="text-stone-500">Account ID</span>
              <span className="text-stone-400 font-mono text-xs">{user.id.slice(0, 8)}...</span>
            </div>
            <div className="flex justify-between py-2 border-t border-white/5">
              <span className="text-stone-500 flex items-center gap-1"><Clock size={14} /> Member Since</span>
              <span className="text-stone-900">{memberSince}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
