"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CreditCard, DollarSign, Users, Zap, TrendingUp, Database, Wifi, Brain, Store, Loader2 } from 'lucide-react';

interface StatsData {
  users: { total: number; recent: any[] };
  operations: { totalApiCalls: number; etsyProducts: number; etsyAnalyses: number; etsyListings: number; etsySuppliers: number };
  revenue: { total: number; currency: string; note: string };
  system: { database: string; etsyApi: string; aiEngine: string; supabase: string };
}

export default function NerveCenterPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/saas/stats")
      .then(res => res.json())
      .then(data => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-orange-500 animate-spin" />
          <p className="text-slate-400 text-sm">Loading real-time data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Nerve Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Live system metrics — all data pulled from Supabase &amp; database
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-medium text-green-400">LIVE DATA</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#080c16] border-white/5 shadow-2xl hover:border-blue-500/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Registered Users</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.users.total ?? 0}</div>
            <p className="text-xs text-blue-400 mt-1 flex items-center">
              <Wifi className="h-3 w-3 mr-1" /> Supabase Auth — Real-time
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#080c16] border-white/5 shadow-2xl hover:border-orange-500/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total AI Operations</CardTitle>
            <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Activity className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.operations.totalApiCalls ?? 0}</div>
            <p className="text-xs text-orange-400 mt-1 flex items-center">
              <Zap className="h-3 w-3 mr-1" /> Products + Analyses + Listings
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#080c16] border-white/5 shadow-2xl hover:border-purple-500/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Etsy Analyses</CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Brain className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.operations.etsyAnalyses ?? 0}</div>
            <p className="text-xs text-purple-400 mt-1 flex items-center">
              <Store className="h-3 w-3 mr-1" /> SELL/AVOID decisions made
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#080c16] border-white/5 shadow-2xl hover:border-green-500/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Revenue</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${stats?.revenue.total ?? 0}</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center">
              <CreditCard className="h-3 w-3 mr-1" /> Stripe integration pending
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Health + Recent Users */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* System Health */}
        <Card className="col-span-4 bg-[#080c16] border-white/5 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">System Health</CardTitle>
            <CardDescription>Real-time status of all connected services</CardDescription>
          </CardHeader>
          <CardContent className="border-t border-white/5 pt-6">
            <div className="grid grid-cols-2 gap-4">
              {stats?.system && Object.entries(stats.system).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between bg-black/40 rounded-lg p-4 border border-white/5">
                  <div className="flex items-center gap-3">
                    <Database className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    value === 'online' || value === 'connected' || value === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {value.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>

            {/* Etsy Breakdown */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <h3 className="text-xs text-slate-500 font-semibold uppercase mb-3">Etsy Operations Breakdown</h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Products", value: stats?.operations.etsyProducts ?? 0 },
                  { label: "Analyses", value: stats?.operations.etsyAnalyses ?? 0 },
                  { label: "Listings", value: stats?.operations.etsyListings ?? 0 },
                  { label: "Suppliers", value: stats?.operations.etsySuppliers ?? 0 },
                ].map(item => (
                  <div key={item.label} className="text-center bg-black/30 rounded-lg p-3 border border-white/5">
                    <div className="text-white font-bold text-lg">{item.value}</div>
                    <div className="text-slate-500 text-[10px] uppercase tracking-wider">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card className="col-span-3 bg-[#080c16] border-white/5 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Recent Users</CardTitle>
            <CardDescription>Latest registered accounts from Supabase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.users.recent && stats.users.recent.length > 0 ? (
                stats.users.recent.map((user, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-9 w-9 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-orange-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none text-white truncate max-w-[180px]">
                        {user.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full">Active</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 text-center py-8">No users found — database may be offline</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
