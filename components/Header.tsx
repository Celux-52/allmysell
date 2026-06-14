"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ lang, dict }: { lang: string, dict: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = (newLocale: string) => {
    if (!pathname) return;
    const newPath = pathname.replace(`/${lang}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? "bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-sm py-4" 
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2 font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#0A192F] mr-auto">
          <div className="w-8 h-8 rounded-lg bg-[#0A192F] flex items-center justify-center shadow-lg shadow-[#0A192F]/20">
             <span className="text-white text-lg leading-none">A</span>
          </div>
          Allmysell <span className="text-[#0A192F]/40 font-light">LLC</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 mr-8">
          <Link href={lang === 'tr' ? '/tr/hizmetler/web-cozumleri' : '/en/services/web-solutions'} prefetch={false} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">{dict.nav.web}</Link>
          <Link href={lang === 'tr' ? '/tr/hizmetler/e-ticaret' : '/en/services/e-commerce'} prefetch={false} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">{dict.nav.ecommerce}</Link>
          <Link href={lang === 'tr' ? '/tr/hizmetler/saas-yazilimlari' : '/en/services/saas-software'} prefetch={false} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">{dict.nav.saas}</Link>
          <Link href={lang === 'tr' ? '/tr/hizmetler/stratejik-danismanlik' : '/en/services/strategic-consulting'} prefetch={false} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">{dict.nav.consulting}</Link>
          <Link href={lang === 'tr' ? '/tr/hakkimizda' : '/en/about-us'} prefetch={false} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">{dict.nav.about}</Link>
          <Link href={lang === 'tr' ? '/tr/blog' : '/en/blog'} prefetch={false} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">{dict.nav.blog}</Link>
          <Link href={lang === 'tr' ? '/tr/iletisim' : '/en/contact'} prefetch={false} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">{dict.nav.contact}</Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex bg-slate-200/50 p-1 rounded-full text-xs font-semibold">
            <button 
              onClick={() => switchLanguage('en')} 
              className={`px-3 py-1.5 rounded-full transition-all ${lang === 'en' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              EN
            </button>
            <button 
              onClick={() => switchLanguage('tr')} 
              className={`px-3 py-1.5 rounded-full transition-all ${lang === 'tr' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              TR
            </button>
          </div>
          
          <a
            href="#contact"
            className="hidden sm:flex shrink-0 items-center gap-2 bg-[#0A192F] hover:bg-[#112240] text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all shadow-[0_0_40px_-10px_rgba(10,25,47,0.5)] hover:shadow-[0_0_50px_-10px_rgba(10,25,47,0.6)] hover:-translate-y-0.5 border border-white/10"
          >
            {dict.nav.freeAnalysis} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
