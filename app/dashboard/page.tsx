'use client';

import { useState, useEffect } from 'react';
import { Search, TrendingUp, Bookmark, Clock, Sparkles, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function DashboardOverview() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) setUser(authUser);
    }
    getUser();
  }, []);

  const quickActions = [
    { name: 'AI Product Research', description: 'Find winning products with AI', icon: Search, href: '/dashboard/research', color: 'from-[#E8750A] to-[#F59E0B]' },
    { name: 'Trend Analysis', description: 'Discover what\'s trending now', icon: TrendingUp, href: '/dashboard/trends', color: 'from-emerald-600 to-emerald-400' },
    { name: 'Saved Products', description: 'Your curated product list', icon: Bookmark, href: '/dashboard/saved', color: 'from-blue-600 to-blue-400' },
    { name: 'Search History', description: 'Past searches and results', icon: Clock, href: '/dashboard/history', color: 'from-purple-600 to-purple-400' },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">
          Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(' ')[0]}` : ''} 👋
        </h1>
        <p className="text-stone-500">Here&apos;s your product research dashboard</p>
      </div>

      {/* AI Search Hero */}
      <div className="relative bg-gradient-to-br from-[#1A1A1A] to-[#111111] rounded-2xl p-6 lg:p-8 border border-[#E8750A]/20 mb-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8750A]/5 rounded-full blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-stone-500" size={20} />
            <span className="text-sm font-semibold text-stone-500">AI-Powered Research</span>
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-3">What problem does your customer have?</h2>
          <p className="text-stone-500 text-sm mb-5 max-w-lg">
            Describe a problem, niche, or category — our AI will find winning products with profit analysis, competition data, and supplier recommendations.
          </p>
          <Link
            href="/dashboard/research"
            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 !text-white hover:bg-stone-800 text-stone-900 rounded-xl font-semibold hover:shadow-lg hover:shadow-stone-200/50 transition-all hover:scale-[1.02]"
          >
            <Zap size={18} />
            Start Researching
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'AI Searches', value: '0', sub: 'this month' },
          { label: 'Saved Products', value: '0', sub: 'total' },
          { label: 'Trends Found', value: '0', sub: 'active' },
          { label: 'Plan', value: 'Free', sub: 'upgrade for more' },
        ].map((stat) => (
          <div key={stat.label} className="bg-stone-50 rounded-xl p-4 border border-white/5">
            <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
            <p className="text-sm text-stone-500">{stat.label}</p>
            <p className="text-[10px] text-gray-600 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h3 className="text-lg font-semibold text-stone-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className="bg-stone-50 rounded-xl p-5 border border-white/5 hover:border-[#E8750A]/20 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className={`w-11 h-11 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <action.icon className="text-stone-900" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 mb-0.5 group-hover:text-stone-800 transition-colors">{action.name}</h4>
                <p className="text-sm text-stone-400">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
