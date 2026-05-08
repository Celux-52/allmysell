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
      where: { isPublished: true },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trends.length === 0 ? (
            <div className="col-span-full py-20 text-center border border-white/5 bg-white/[0.02] rounded-3xl">
              <p className="text-slate-500">No viral trends discovered yet. Our agents are scanning the web...</p>
            </div>
          ) : (
            trends.map((trend) => (
              <Link 
                key={trend.id} 
                href={`/blog/${trend.slug}`}
                className="group relative flex flex-col bg-slate-950/40 border border-white/10 rounded-3xl overflow-hidden hover:border-orange-500/50 transition-all hover:shadow-[0_0_30px_rgba(249,115,22,0.1)]"
              >
                <div className="aspect-video relative overflow-hidden">
                  {trend.thumbnailUrl ? (
                    <img 
                      src={trend.thumbnailUrl} 
                      alt={trend.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                      <Play className="h-10 w-10 text-white/20" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/60 backdrop-blur-md border-white/10">{trend.platform}</Badge>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(trend.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-orange-400" />
                      {trend.consensusScore}% Potential
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-orange-400 transition-colors">
                    {trend.title}
                  </h2>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                    <span className="text-sm font-semibold text-slate-300">Read Analysis</span>
                    <ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
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
