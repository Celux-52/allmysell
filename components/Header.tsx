"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, ChevronDown, Code, ShoppingCart, Cloud, Briefcase, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ lang, dict }: { lang: string, dict: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      setIsScrolled((prevScrolled) => (prevScrolled !== scrolled ? scrolled : prevScrolled));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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

  const servicesLinks = [
    { name: dict.nav.web, href: lang === 'tr' ? '/tr/hizmetler/web-cozumleri' : '/en/services/web-solutions', icon: Code, desc: lang === 'tr' ? 'Modern ve hızlı siteler' : 'Modern & fast sites' },
    { name: dict.nav.ecommerce, href: lang === 'tr' ? '/tr/hizmetler/e-ticaret' : '/en/services/e-commerce', icon: ShoppingCart, desc: lang === 'tr' ? 'Global satış altyapısı' : 'Global sales platforms' },
    { name: dict.nav.saas, href: lang === 'tr' ? '/tr/hizmetler/saas-yazilimlari' : '/en/services/saas-software', icon: Cloud, desc: lang === 'tr' ? 'Bulut tabanlı ürünler' : 'Cloud-based products' },
    { name: dict.nav.consulting, href: lang === 'tr' ? '/tr/hizmetler/stratejik-danismanlik' : '/en/services/strategic-consulting', icon: Briefcase, desc: lang === 'tr' ? 'Büyüme stratejileri' : 'Growth strategies' },
    { name: dict.nav.automation || (lang === 'tr' ? 'Otomasyon' : 'Automation'), href: lang === 'tr' ? '/tr/hizmetler/otomasyon' : '/en/services/automation', icon: Settings, desc: lang === 'tr' ? 'Süreç ve yapay zeka otomasyonları' : 'Process & AI automation' },
  ];

  const mainLinks = [
    { name: dict.nav.about, href: lang === 'tr' ? '/tr/hakkimizda' : '/en/about-us' },
    { name: dict.nav.courses || (lang === 'tr' ? 'Eğitimler' : 'Courses'), href: lang === 'tr' ? '/tr/egitimler/ebay-dropshipping' : '/en/courses/ebay-dropshipping' },
    { name: dict.nav.blog, href: lang === 'tr' ? '/tr/blog' : '/en/blog' },
    { name: dict.nav.contact, href: lang === 'tr' ? '/tr/iletisim' : '/en/contact' },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 border-b flex flex-col ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/95 md:bg-white/80 backdrop-blur-none md:backdrop-blur-xl border-slate-200/50 shadow-sm" 
          : "bg-transparent border-transparent"
      }`}
    >
      {/* Announcement Bar */}
      {isAnnouncementOpen && (
        <div className="w-full bg-indigo-600 text-white text-xs md:text-sm py-2 px-4 flex items-center justify-between relative z-50">
          <div className="flex-1 text-center font-medium">
            {lang === 'tr' ? (
              <>🚀 Yeni 6 modüllük eBay Dropshipping Eğitimi ve Danışmanlığı yayında! <Link href="/tr/egitimler/ebay-dropshipping" className="underline font-bold ml-2">Hemen İncele</Link></>
            ) : (
              <>🚀 New 6-module eBay Dropshipping Course & Consulting is live! <Link href="/en/courses/ebay-dropshipping" className="underline font-bold ml-2">Check it out</Link></>
            )}
          </div>
          <button onClick={() => setIsAnnouncementOpen(false)} className="text-white/80 hover:text-white transition-colors shrink-0 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className={`max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-4 xl:gap-8 w-full transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'py-4' : 'py-6'}`}>
        <Link 
          href={`/${lang}`} 
          className="flex items-center gap-1.5 md:gap-2 font-sans text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-[#0A192F] mr-auto relative z-50 shrink-0"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-[#0A192F] flex items-center justify-center shadow-lg shadow-[#0A192F]/20">
             <span className="text-white text-[10px] md:text-xs font-bold leading-none tracking-tight">MY</span>
          </div>
          Allmysell <span className="text-[#0A192F]/40 font-light hidden sm:inline-block ml-1">LLC</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4 lg:gap-5 xl:gap-8 mr-2 xl:mr-8">
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors py-2">
              {lang === 'tr' ? 'Hizmetler' : 'Services'}
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
              <div className="w-[500px] bg-white rounded-2xl shadow-xl border border-slate-100 p-3 grid grid-cols-2 gap-2 relative before:content-[''] before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white">
                {servicesLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <Link key={idx} href={link.href} prefetch={false} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group/item">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors">{link.name}</span>
                        <span className="text-xs text-slate-500 mt-0.5">{link.desc}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          
          {mainLinks.map((link, idx) => (
            <Link key={idx} href={link.href} prefetch={false} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3 relative z-50">
          <div className="flex bg-slate-200/50 p-0.5 md:p-1 rounded-full text-[10px] md:text-xs font-semibold">
            <button 
              onClick={() => switchLanguage('en')} 
              className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-all ${lang === 'en' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              EN
            </button>
            <button 
              onClick={() => switchLanguage('tr')} 
              className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-all ${lang === 'tr' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
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
            className="lg:hidden flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 md:w-5 md:h-5" /> : <Menu className="w-4 h-4 md:w-5 md:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 top-[auto] bg-white h-screen transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        style={{ top: isAnnouncementOpen ? (isScrolled ? '110px' : '126px') : (isScrolled ? '76px' : '92px') }}
      >
        <div className="px-6 py-8 flex flex-col gap-6 overflow-y-auto h-full pb-32">
          
          <div className="flex flex-col gap-4 mb-4">
             <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
               {lang === 'tr' ? 'Hizmetler' : 'Services'}
             </span>
             {servicesLinks.map((link, idx) => {
               const Icon = link.icon;
               return (
                  <Link 
                    key={idx} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold text-[#0A192F]">{link.name}</span>
                  </Link>
               );
             })}
          </div>

          <div className="w-full h-px bg-slate-100"></div>

          <div className="flex flex-col gap-4 mt-2">
            {mainLinks.map((link, idx) => (
              <Link 
                key={idx} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-[#0A192F]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link 
            href={lang === 'tr' ? '/tr/iletisim' : '/en/contact'}
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-6 flex items-center justify-center gap-2 bg-[#0A192F] text-white px-6 py-4 rounded-xl text-lg font-bold w-full"
          >
            {dict.nav.freeAnalysis} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
