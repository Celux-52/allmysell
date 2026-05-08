import { prisma } from "@/lib/prisma";
import { TrendingUp, Sparkles, Zap, Search } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { TrendCard } from "@/components/research/TrendCard";
import { ScanButton } from "@/components/research/ScanButton";

export const dynamic = 'force-dynamic';

export default async function ResearchDashboard() {
  const trends = await prisma.autoTrend.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20
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
            <ScanButton />
            <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">{trends.length} Trends Live</span>
            </div>
          </div>
        </div>
        
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
      </div>
    </div>
  );
}
