'use client';

import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">Analytics</h1>
        <p className="text-stone-500 text-sm">Platform performance and user insights</p>
      </div>

      {/* Placeholder Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Page Views Today', value: '—', icon: Eye, color: 'from-blue-600 to-blue-400' },
          { label: 'Active Users', value: '—', icon: Users, color: 'from-emerald-600 to-emerald-400' },
          { label: 'Searches Today', value: '—', icon: BarChart3, color: 'from-purple-600 to-purple-400' },
          { label: 'Conversion Rate', value: '—', icon: TrendingUp, color: 'from-amber-600 to-amber-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-stone-50 rounded-xl p-5 border border-white/5">
            <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <stat.icon className="text-stone-900" size={20} />
            </div>
            <p className="text-2xl font-bold text-stone-900 mb-1">{stat.value}</p>
            <p className="text-sm text-stone-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="bg-stone-50 rounded-xl border border-white/5 p-8">
        <h2 className="text-lg font-semibold text-stone-900 mb-6">User Growth</h2>
        <div className="flex items-end justify-between h-48 gap-2 px-4">
          {Array.from({ length: 12 }).map((_, i) => {
            const height = Math.random() * 80 + 20;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-sm opacity-30 hover:opacity-100 transition-opacity"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-[10px] text-gray-600">
                  {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-center text-gray-600 text-xs mt-6">
          Real analytics data will be populated once the analytics_events table is active
        </p>
      </div>
    </div>
  );
}
