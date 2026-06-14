"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ lang, dict }: { lang: string, dict: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const switchLanguage = (newLocale: string) => {
    if (!pathname) return;
    const newPath = pathname.replace(`/${lang}`, `/${newLocale}`);
    router.push(newPath);
  };

  const navLinks = [
    { name: dict.nav.web, href: lang === 'tr' ? '/tr/hizmetler/web-cozumleri' : '/en/services/web-solutions' },
    { name: dict.nav.ecommerce, href: lang === 'tr' ? '/tr/hizmetler/e-ticaret' : '/en/services/e-commerce' },
    { name: dict.nav.saas, href: lang === 'tr' ? '/tr/hizmetler/saas-yazilimlari' : '/en/services/saas-software' },
    { name: dict.nav.consulting, href: lang === 'tr' ? '/tr/hizmetler/stratejik-danismanlik' : '/en/services/strategic-consulting' },
    { name: dict.nav.about, href: lang === 'tr' ? '/tr/hakkimizda' : '/en/about-us' },
    { name: dict.nav.blog, href: lang === 'tr' ? '/tr/blog' : '/en/blog' },
    { name: dict.nav.contact, href: lang === 'tr' ? '/tr/iletisim' : '/en/contact' },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 border-b ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-sm py-4" 
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link 
          href={`/${lang}`} 
          className="flex items-center gap-2 font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#0A192F] mr-auto relative z-50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="w-8 h-8 rounded-lg bg-[#0A192F] flex items-center justify-center shadow-lg shadow-[#0A192F]/20">
             <span className="text-white text-lg leading-none">A</span>
          </div>
          Allmysell <span className="text-[#0A192F]/40 font-light hidden sm:inline-block">LLC</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 mr-8">
          {navLinks.map((link, idx) => (
            <Link key={idx} href={link.href} prefetch={false} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 relative z-50">
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
            href={lang === 'tr' ? '/tr/iletisim' : '/en/contact'}
            className="hidden sm:flex shrink-0 items-center gap-2 bg-[#0A192F] hover:bg-[#112240] text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all shadow-[0_0_40px_-10px_rgba(10,25,47,0.5)] hover:shadow-[0_0_50px_-10px_rgba(10,25,47,0.6)] hover:-translate-y-0.5 border border-white/10"
          >
            {dict.nav.freeAnalysis} <ArrowRight className="w-4 h-4" />
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 top-[76px] bg-white h-screen transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6 overflow-y-auto h-full pb-32">
          {navLinks.map((link, idx) => (
            <Link 
              key={idx} 
              href={link.href} 
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-bold text-[#0A192F] border-b border-slate-100 pb-4"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href={lang === 'tr' ? '/tr/iletisim' : '/en/contact'}
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 bg-[#0A192F] text-white px-6 py-4 rounded-xl text-lg font-bold w-full"
          >
            {dict.nav.freeAnalysis} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
