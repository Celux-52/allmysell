// Shared Components — Used across all modules
"use client";

import { Loader2 } from "lucide-react";

// Full-page loading spinner
export function PageLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full"></div>
          <Loader2 className="h-10 w-10 text-orange-500 animate-spin relative z-10" />
        </div>
        <p className="text-slate-400 text-sm animate-pulse">{message}</p>
      </div>
    </div>
  );
}

// Status Badge (ONLINE / OFFLINE / CONNECTED etc.)
export function StatusBadge({ status }: { status: string }) {
  const isActive = ['online', 'connected', 'active', 'live'].includes(status.toLowerCase());
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
      isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
    }`}>
      {status.toUpperCase()}
    </span>
  );
}

// Section Header
export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}

// Empty State
export function EmptyState({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm">{description}</p>
    </div>
  );
}

// Glass Card wrapper
export function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-[#080c16] p-6 shadow-2xl backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}
