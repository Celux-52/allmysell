'use client';

import { useState, useEffect } from 'react';
import { Users, FileText, TrendingUp, Eye, UserPlus, Activity } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalUsers: number;
  newUsersThisMonth: number;
  totalPageViews: number;
  recentUsers: Array<{
    id: string;
    email: string;
    fullName: string | null;
    createdAt: string;
  }>;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    newUsersThisMonth: 0,
    totalPageViews: 0,
    recentUsers: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'from-purple-600 to-purple-400', href: '/admin/users' },
    { label: 'New This Month', value: stats.newUsersThisMonth, icon: UserPlus, color: 'from-blue-600 to-blue-400', href: '/admin/users' },
    { label: 'Page Views', value: stats.totalPageViews, icon: Eye, color: 'from-amber-600 to-amber-400', href: '/admin/analytics' },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">Dashboard</h1>
        <p className="text-stone-500">Welcome to the AllMySell Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-stone-50 rounded-xl p-5 border border-white/5 hover:border-purple-500/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center`}>
                <card.icon className="text-stone-900" size={20} />
              </div>
              <TrendingUp className="text-gray-600 group-hover:text-purple-400 transition-colors" size={16} />
            </div>
            <p className="text-2xl font-bold text-stone-900 mb-1">
              {loading ? (
                <span className="inline-block w-12 h-7 bg-white/5 rounded animate-pulse"></span>
              ) : (
                card.value.toLocaleString()
              )}
            </p>
            <p className="text-sm text-stone-400">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-stone-50 rounded-xl border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="font-semibold text-stone-900 flex items-center gap-2">
              <Users size={18} className="text-purple-400" />
              Recent Users
            </h2>
            <Link href="/admin/users" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
              View All →
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-5 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/5 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="w-24 h-3 bg-white/5 rounded animate-pulse mb-1"></div>
                    <div className="w-32 h-2 bg-white/5 rounded animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : stats.recentUsers.length === 0 ? (
              <div className="px-5 py-8 text-center text-stone-400 text-sm">
                No users registered yet
              </div>
            ) : (
              stats.recentUsers.map((user) => (
                <div key={user.id} className="px-5 py-3 flex items-center gap-3 hover:bg-white/[0.02] transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center text-stone-900 text-xs font-bold">
                    {(user.fullName || user.email)[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 truncate">{user.fullName || 'No Name'}</p>
                    <p className="text-xs text-stone-400 truncate">{user.email}</p>
                  </div>
                  <p className="text-xs text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-stone-50 rounded-xl border border-white/5 overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5">
            <h2 className="font-semibold text-stone-900 flex items-center gap-2">
              <Activity size={18} className="text-purple-400" />
              Quick Actions
            </h2>
          </div>
          <div className="p-5 space-y-3">

            <Link
              href="/admin/users"
              className="flex items-center gap-3 p-4 rounded-lg bg-[#FAFAF9] border border-white/5 hover:border-purple-500/30 transition-all group"
            >
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                <Users className="text-blue-400" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-stone-900">Manage Users</p>
                <p className="text-xs text-stone-400">View and manage user accounts</p>
              </div>
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center gap-3 p-4 rounded-lg bg-[#FAFAF9] border border-white/5 hover:border-purple-500/30 transition-all group"
            >
              <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center group-hover:bg-amber-600/30 transition-colors">
                <TrendingUp className="text-amber-400" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-stone-900">Digital Products</p>
                <p className="text-xs text-stone-400">Manage SaaS packages and pricing</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
