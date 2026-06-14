import Link from 'next/link';
import { ArrowLeft, ServerCrash } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Allmysell LLC',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A192F] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <ServerCrash className="w-10 h-10 text-blue-400" />
        </div>
        
        <h1 className="font-sans text-6xl md:text-8xl font-bold tracking-tighter mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white/80">
          Page Not Found / Sayfa Bulunamadı
        </h2>
        
        <p className="text-blue-100/50 text-lg font-light mb-12 max-w-lg mx-auto">
          The architecture you're looking for seems to have been moved or deleted. Let's get you back to a stable environment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/en" className="bg-white text-[#0A192F] hover:bg-blue-50 px-8 py-3 rounded-full font-bold transition-all shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] hover:scale-105 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Return Home (EN)
          </Link>
          <Link href="/tr" className="bg-white/10 text-white hover:bg-white/20 border border-white/10 px-8 py-3 rounded-full font-bold transition-all hover:scale-105 flex items-center gap-2">
            Ana Sayfaya Dön (TR)
          </Link>
        </div>
      </div>
    </div>
  );
}
