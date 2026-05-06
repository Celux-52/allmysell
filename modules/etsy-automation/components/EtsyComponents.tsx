// Etsy Automation — Reusable Components
"use client";

import { CheckCircle, AlertTriangle, TrendingUp, ShoppingBag } from "lucide-react";

// Decision Badge (SELL / AVOID)
export function DecisionBadge({ decision }: { decision: 'SELL' | 'AVOID' }) {
  const isSell = decision === 'SELL';
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
      isSell ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
    }`}>
      {isSell ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
      {decision}
    </span>
  );
}

// Trend Score Bar
export function TrendScoreBar({ score }: { score: number }) {
  const color = score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-3">
      <TrendingUp className="h-4 w-4 text-slate-400" />
      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-sm font-bold text-white">{score}/100</span>
    </div>
  );
}

// Competition Level Badge
export function CompetitionBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Low: 'bg-green-500/20 text-green-400',
    Medium: 'bg-amber-500/20 text-amber-400',
    High: 'bg-red-500/20 text-red-400',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${colors[level] || 'bg-slate-500/20 text-slate-400'}`}>
      <ShoppingBag className="h-3 w-3" />
      {level}
    </span>
  );
}

// Stat Card (small)
export function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: any }) {
  return (
    <div className="bg-black/40 p-4 rounded-lg border border-white/5 text-center">
      <Icon className="h-4 w-4 text-slate-500 mx-auto mb-1" />
      <div className="text-white font-bold text-sm">{value}</div>
      <div className="text-slate-500 text-[10px] uppercase tracking-wider">{label}</div>
    </div>
  );
}
