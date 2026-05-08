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

            {/* Video Preview */}
            <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
              <iframe 
                src={`https://www.tiktok.com/embed/v2/${trend.videoUrl.split('/').pop()}`}
                className="w-full h-full"
                allowFullScreen
              />
            </div>

            {/* AI Generated Article */}
            <article className="prose prose-invert prose-orange max-w-none">
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
