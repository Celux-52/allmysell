# Etsy Sniper & Viral Trend Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, data-driven "Etsy Sniper" dashboard that integrates real-time market research, multi-AI consensus scores, and verified supplier insights.

**Architecture:**
- **Frontend**: Next.js 15 (App Router) using Tailwind CSS for a premium dark-themed UI.
- **State Management**: Server Components for data fetching, Client Components for interactive elements.
- **Database**: Prisma ORM fetching from `AutoTrend` and `EtsyProduct` models.
- **Icons**: Lucide React for consistent UI language.

---

### Task 1: Dashboard Page Structure
**Files:**
- Create: `app/dashboard/research/page.tsx`
- Modify: `components/DashboardNav.tsx` (if exists)

- [ ] **Step 1: Create the research dashboard page**
```tsx
import { prisma } from "@/lib/prisma";
import { TrendingUp, Sparkles, Zap, Search } from "lucide-react";
import { Particles } from "@/components/ui/particles";

export default async function ResearchDashboard() {
  const trends = await prisma.autoTrend.findMany({
    orderBy: { createdAt: 'desc' },
    take: 12
  });

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20 relative overflow-hidden">
      <Particles className="absolute inset-0 z-0" quantity={100} color="#F97316" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              AI Research <span className="text-orange-500">Cockpit</span>
            </h1>
            <p className="text-slate-400">Real-time market intelligence and viral trend detection.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">{trends.length} Trends Live</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {/* Trend cards will go here */}
        </div>
      </div>
    </div>
  );
}
```

### Task 2: Premium Trend Card Component
**Files:**
- Create: `components/research/TrendCard.tsx`

- [ ] **Step 1: Build the TrendCard with high-end aesthetics**
```tsx
'use client';
import { TrendingUp, ExternalLink, BrainCircuit, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function TrendCard({ trend }: { trend: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden hover:border-orange-500/30 transition-all hover:shadow-[0_0_40px_rgba(249,115,22,0.05)]"
    >
      <div className="aspect-square relative overflow-hidden">
        <img src={trend.thumbnailUrl || "/placeholder.jpg"} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-black/60 backdrop-blur-md border-white/10 uppercase text-[10px] tracking-widest">{trend.platform}</Badge>
        </div>
        <div className="absolute bottom-4 right-4">
           <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <span className="font-bold text-sm">{trend.consensusScore}%</span>
           </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{trend.title}</h3>
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
           <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3 text-green-400" /> {trend.views.toLocaleString()} Views</span>
           <span className="flex items-center gap-1"><BrainCircuit className="h-3 w-3 text-blue-400" /> AI Verified</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
           <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs font-semibold">
              <ExternalLink className="h-3 w-3" /> View Source
           </button>
           <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 transition-all text-xs font-bold text-white shadow-lg shadow-orange-500/20">
              <ShoppingCart className="h-3 w-3" /> Find Supplier
           </button>
        </div>
      </div>
    </motion.div>
  );
}
```

### Task 3: Integration and Data Fetching
**Files:**
- Modify: `app/dashboard/research/page.tsx`

- [ ] **Step 1: Map real data to components**
```tsx
import { TrendCard } from "@/components/research/TrendCard";
// ... existing imports

export default async function ResearchDashboard() {
  const trends = await prisma.autoTrend.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20
  });

  return (
    // ... existing wrapper
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {trends.map((trend) => (
        <TrendCard key={trend.id} trend={trend} />
      ))}
      {trends.length === 0 && (
        <div className="col-span-full py-20 text-center bg-white/5 rounded-[3rem] border border-dashed border-white/10">
           <p className="text-slate-500">Initiate your first research scan to see viral trends.</p>
        </div>
      )}
    </div>
    // ...
  );
}
```

### Task 4: Automation Control Panel
**Files:**
- Create: `components/research/ScanButton.tsx`
- Modify: `app/dashboard/research/page.tsx`

- [ ] **Step 1: Build the trigger button**
```tsx
'use client';
import { useState } from 'react';
import { Rocket, Loader2 } from 'lucide-react';

export function ScanButton() {
  const [loading, setLoading] = useState(false);

  const startScan = async () => {
    setLoading(true);
    try {
      await fetch('/api/automation/process-trend', {
        method: 'POST',
        body: JSON.stringify({
          title: "Viral Galaxy Projector",
          videoUrl: "https://tiktok.com/dummy",
          platform: "TikTok",
          platformId: `scan-${Date.now()}`
        })
      });
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={startScan}
      disabled={loading}
      className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-xl shadow-orange-500/20 hover:scale-105 transition-all disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
      {loading ? "AI is Scanning..." : "Run AI Research Bot"}
    </button>
  );
}
```

### Task 5: Final Polish and Navigation
**Files:**
- Modify: `components/Navbar.tsx` or navigation links

- [ ] **Step 1: Add link to the new dashboard**
- [ ] **Step 2: Verify all animations and hover states**
- [ ] **Step 3: Test mobile responsiveness**
