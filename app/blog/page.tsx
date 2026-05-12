import { prisma } from "@/lib/prisma";
import { Particles } from "@/components/ui/particles";
import { TrendingUp, Sparkles, Calendar, ChevronRight, Play } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default async function PublicBlogPage() {
  let trends: any[] = [];
  let dbError = false;

  try {
    trends = await prisma.autoTrend.findMany({
      where: { status: "published" },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Blog database error:", error);
    dbError = true;
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-32 pb-20 relative overflow-hidden">
      <Particles className="absolute inset-0 z-0" quantity={80} color="#F97316" ease={50} />
      
      <div className="container mx-auto px-4 relative z-10">
        {dbError && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm">
            Veritabanı bağlantı hatası: Blog içerikleri şu an yüklenemiyor.
          </div>
        )}
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Live Viral Pulse
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Discover What's <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Trending Now</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            Autonomous AI agents tracking TikTok & Facebook 24/7. We analyze the most viral products so you can sell them before they saturate the market.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {trends.length === 0 ? (
            <div className="col-span-full py-24 text-center border border-white/5 bg-white/[0.02] rounded-[3rem] backdrop-blur-md">
              <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="h-10 w-10 text-orange-500 animate-pulse" />
              </div>
              <p className="text-slate-500 font-medium text-lg">Scanning the digital horizon for viral gold...</p>
              <p className="text-slate-600 text-sm mt-2">Our agents are currently processing new trends.</p>
            </div>
          ) : (
            trends.map((trend) => (
              <Link 
                key={trend.id} 
                href={`/blog/${trend.slug}`}
                className="group relative flex flex-col bg-[#0d121f] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-orange-500/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)] hover:-translate-y-2"
              >
                {/* Image Container - Vertical for Reels */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  {trend.thumbnailUrl ? (
                    <img 
                      src={trend.thumbnailUrl} 
                      alt={trend.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white/10" />
                    </div>
                  )}
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d121f] via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute top-5 left-5">
                    <Badge className="bg-black/40 backdrop-blur-xl border-white/10 text-[10px] font-black uppercase tracking-widest px-3 py-1">
                      {trend.platform}
                    </Badge>
                  </div>
                  
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex items-center gap-2">
                       <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" />
                       <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em]">Live Analysis</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 mb-6 uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-orange-500" />
                      {new Date(trend.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-white/10" />
                    <span className="flex items-center gap-2">
                      <TrendingUp className="h-3.5 w-3.5 text-orange-400" />
                      {trend.consensusScore}% Score
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-6 line-clamp-2 leading-tight group-hover:text-orange-400 transition-colors">
                    {trend.title}
                  </h2>
                  
                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">View Intel</span>
                    <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-orange-500 transition-all">
                      <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
