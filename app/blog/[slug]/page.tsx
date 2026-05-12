import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Particles } from "@/components/ui/particles";
import { TrendingUp, Calendar, ArrowLeft, Target, Sparkles, MessageSquare, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from 'react-markdown';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trend = await prisma.autoTrend.findUnique({
    where: { slug }
  });

  if (!trend) return { title: 'Post Not Found' };

  return {
    title: `${trend.title} | AllMySell Viral Pulse`,
    description: `Analysis of the viral ${trend.platform} trend: ${trend.title}. Multi-AI consensus score: ${trend.consensusScore}%`,
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let trend: any = null;
  let dbError = false;

  try {
    trend = await prisma.autoTrend.findUnique({
      where: { slug }
    });
  } catch (error) {
    console.error("Blog detail DB error:", error);
    dbError = true;
  }

  if (dbError) {
    return (
      <div className="min-h-screen bg-[#030712] text-white pt-32 flex items-center justify-center">
        <p className="text-red-400 font-bold px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
          Veritabanı bağlantı hatası.<br/>
          Lütfen Vercel üzerindeki DATABASE_URL ayarlarını kontrol edin.
        </p>
      </div>
    );
  }

  if (!trend) notFound();

  const insights = trend.insights as any || {};

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-32 pb-20 relative overflow-hidden">
      <Particles className="absolute inset-0 z-0" quantity={80} color="#F97316" ease={50} />

      <div className="container mx-auto px-4 relative z-10">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Pulse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <header className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 px-3 py-1">
                  {trend.platform} Viral
                </Badge>
                <span className="text-sm text-slate-500 flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(trend.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{trend.title}</h1>
            </header>

            {/* Video Preview - Optimized for Vertical (TikTok/Reels) with Artistic Blur Backdrop */}
            <div className="flex justify-center relative">
              {/* Blurred Glow Backdrop */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-full bg-orange-500/20 blur-[100px] rounded-full pointer-events-none opacity-50" />
              
              <div className="w-full max-w-[400px] aspect-[9/16] bg-black rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(249,115,22,0.2)] relative z-10 group">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none z-20" />
                {(() => {
                  const videoIdMatch = trend.videoUrl.match(/video\/(\d+)/);
                  const videoId = videoIdMatch ? videoIdMatch[1] : trend.videoUrl.split('/').filter(Boolean).pop()?.split('?')[0];
                  
                  return (
                    <iframe 
                      src={`https://www.tiktok.com/embed/v2/${videoId}`}
                      className="w-full h-full relative z-10"
                      allowFullScreen
                    />
                  );
                })()}
              </div>
            </div>

            {/* AI Generated Article - Premium Styling */}
            <article className="prose prose-invert prose-orange max-w-none 
              prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-headings:italic
              prose-h1:text-4xl md:prose-h1:text-6xl prose-h1:mb-12
              prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:border-l-4 prose-h2:border-orange-500 prose-h2:pl-6 prose-h2:mt-16
              prose-p:text-slate-400 prose-p:leading-[1.8] prose-p:text-xl prose-p:font-medium
              prose-strong:text-orange-400 prose-strong:font-black
              prose-ul:list-none prose-ul:pl-0 prose-ul:grid prose-ul:grid-cols-1 md:prose-ul:grid-cols-2 prose-ul:gap-4
              prose-li:bg-white/[0.03] prose-li:p-8 prose-li:rounded-[2rem] prose-li:border prose-li:border-white/5 prose-li:mb-0
              prose-blockquote:border-none prose-blockquote:bg-orange-500/5 prose-blockquote:p-8 prose-blockquote:rounded-[2rem] prose-blockquote:italic
              bg-[#0a0f1d] border border-white/5 p-10 md:p-20 rounded-[3.5rem] backdrop-blur-xl shadow-2xl relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
              <ReactMarkdown>{trend.content}</ReactMarkdown>
            </article>
          </div>

          {/* Sidebar Analysis */}
          <div className="space-y-6">
            <div className="sticky top-32 space-y-6">
              {/* Score Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-orange-400 uppercase tracking-widest">Consensus Score</span>
                  <Sparkles className="h-5 w-5 text-orange-400" />
                </div>
                <div className="text-6xl font-black text-white mb-2">{trend.consensusScore}%</div>
                <p className="text-sm text-slate-400">Winning probability based on multi-AI market analysis.</p>
                <div className="mt-6 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: `${trend.consensusScore}%` }} />
                </div>
              </div>

              {/* Insights Card */}
              <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/10 backdrop-blur-sm space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-400" /> Target Audience
                  </h4>
                  <p className="text-sm text-slate-300">{insights.targetAudience || 'General Consumers'}</p>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-green-400" /> Why It Works
                  </h4>
                  <p className="text-sm text-slate-400 italic">"{insights.whyItWorks}"</p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-3">
                  <a 
                    href={trend.videoUrl}
                    target="_blank"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors"
                  >
                    Watch Original <ExternalLink className="h-4 w-4" />
                  </a>
                  <Link 
                    href={`/dashboard/saas/etsy?q=${encodeURIComponent(trend.title)}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-orange-500 rounded-xl text-sm font-black text-white hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
                  >
                    <TrendingUp className="h-4 w-4" /> Start Selling This
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
