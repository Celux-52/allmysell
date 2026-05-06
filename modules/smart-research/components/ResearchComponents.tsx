// Smart Research — Reusable Components
"use client";

import { Brain, TrendingUp, TrendingDown, Minus } from "lucide-react";

// Consensus Score Ring
export function ConsensusScore({ confidence }: { confidence: number }) {
  const color = confidence >= 80 ? 'text-green-400' : confidence >= 50 ? 'text-amber-400' : 'text-red-400';
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`text-3xl font-black ${color}`}>{confidence}%</div>
      <span className="text-xs text-slate-500 uppercase tracking-wider">AI Consensus</span>
    </div>
  );
}

// Model Vote Card
export function ModelVoteCard({ name, score, decision }: { name: string; score: number; decision: string }) {
  const isPositive = decision.toLowerCase().includes('sell') || decision.toLowerCase().includes('yes');
  return (
    <div className="flex items-center justify-between bg-black/40 rounded-lg p-3 border border-white/5">
      <div className="flex items-center gap-2">
        <Brain className="h-4 w-4 text-indigo-400" />
        <span className="text-sm text-slate-300 font-medium">{name}</span>
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
        isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
      }`}>
        {decision}
      </span>
    </div>
  );
}

// Trend Indicator
export function TrendIndicator({ trend }: { trend: 'rising' | 'stable' | 'declining' }) {
  const config = {
    rising: { icon: TrendingUp, color: 'text-green-400', label: 'Rising' },
    stable: { icon: Minus, color: 'text-amber-400', label: 'Stable' },
    declining: { icon: TrendingDown, color: 'text-red-400', label: 'Declining' },
  };
  const { icon: Icon, color, label } = config[trend];
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${color}`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
