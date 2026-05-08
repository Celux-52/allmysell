'use client';
import { useState } from 'react';
import { Rocket, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ScanButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const startScan = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/automation/process-trend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: "Viral Trending Product Sample",
          videoUrl: "https://tiktok.com/dummy",
          platform: "TikTok",
          platformId: `scan-${Date.now()}`,
          viewsText: "1.2M"
        })
      });
      
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Scan failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={startScan}
      disabled={loading}
      className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
      {loading ? "AI is Scanning..." : "Run AI Research Bot"}
    </button>
  );
}
