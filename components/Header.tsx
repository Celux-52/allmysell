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

  const getServiceLink = (serviceKey: string) => {
    switch (serviceKey) {
      case 'web':
        return lang === 'tr' ? '/tr/hizmetler/web-cozumleri' : lang === 'ru' ? '/ru/uslugi/veb-resheniya' : lang === 'uz' ? '/uz/xizmatlar/veb-yechimlar' : '/en/services/web-solutions';
      case 'ecommerce':
        return lang === 'tr' ? '/tr/hizmetler/e-ticaret' : lang === 'ru' ? '/ru/uslugi/elektronnaya-kommerciya' : lang === 'uz' ? '/uz/xizmatlar/elektron-tijorat' : '/en/services/e-commerce';
      case 'saas':
        return lang === 'tr' ? '/tr/hizmetler/saas-yazilimlari' : lang === 'ru' ? '/ru/uslugi/saas-programmnoe-obespechenie' : lang === 'uz' ? '/uz/xizmatlar/saas-dasturiy-taminot' : '/en/services/saas-software';
      case 'consulting':
        return lang === 'tr' ? '/tr/hizmetler/stratejik-danismanlik' : lang === 'ru' ? '/ru/uslugi/strategicheskiy-konsalting' : lang === 'uz' ? '/uz/xizmatlar/strategik-konsalting' : '/en/services/strategic-consulting';
      case 'automation':
        return lang === 'tr' ? '/tr/hizmetler/otomasyon' : lang === 'ru' ? '/ru/uslugi/avtomatizaciya' : lang === 'uz' ? '/uz/xizmatlar/avtomatlashtirish' : '/en/services/automation';
      default:
        return `/${lang}`;
    }
  };

  const getServiceDesc = (serviceKey: string) => {
    const descs: Record<string, Record<string, string>> = {
      web: { tr: 'Modern ve hızlı siteler', en: 'Modern & fast sites', ru: 'Современные и быстрые сайты', uz: 'Zamonaviy va tezkor saytlar' },
      ecommerce: { tr: 'Global satış altyapısı', en: 'Global sales platforms', ru: 'Глобальные продажи и логистика', uz: 'Global savdo platformalari' },
      saas: { tr: 'Bulut tabanlı ürünler', en: 'Cloud-based products', ru: 'Облачные SaaS решения', uz: 'Bulutga asoslangan mahsulotlar' },
      consulting: { tr: 'Büyüme stratejileri', en: 'Growth strategies', ru: 'Стратегии масштабирования', uz: 'O\'sish strategiyalari' },
      automation: { tr: 'Süreç ve yapay zeka otomasyonları', en: 'Process & AI automation', ru: 'Автоматизация процессов и ИИ', uz: 'Jarayon va SI avtomatlashtirish' },
    };
    return descs[serviceKey]?.[lang] || descs[serviceKey]?.['en'] || '';
  };

  const servicesLinks = [
    { name: dict?.nav?.web || 'Web', href: getServiceLink('web'), icon: Code, desc: getServiceDesc('web') },
    { name: dict?.nav?.ecommerce || 'E-Commerce', href: getServiceLink('ecommerce'), icon: ShoppingCart, desc: getServiceDesc('ecommerce') },
    { name: dict?.nav?.saas || 'SaaS', href: getServiceLink('saas'), icon: Cloud, desc: getServiceDesc('saas') },
    { name: dict?.nav?.consulting || 'Consulting', href: getServiceLink('consulting'), icon: Briefcase, desc: getServiceDesc('consulting') },
    { name: dict?.nav?.automation || (lang === 'tr' ? 'Otomasyon' : lang === 'ru' ? 'Автоматизация' : lang === 'uz' ? 'Avtomatlashtirish' : 'Automation'), href: getServiceLink('automation'), icon: Settings, desc: getServiceDesc('automation') },
  ];

  const mainLinks = [
    { 
      name: dict?.nav?.about || (lang === 'tr' ? 'Hakkımızda' : lang === 'ru' ? 'О нас' : lang === 'uz' ? 'Biz Haqimizda' : 'About Us'), 
      href: lang === 'tr' ? '/tr/hakkimizda' : lang === 'ru' ? '/ru/o-nas' : lang === 'uz' ? '/uz/biz-haqimizda' : '/en/about-us' 
    },
    { 
      name: dict?.nav?.courses || (lang === 'tr' ? 'Eğitimler' : lang === 'ru' ? 'Курсы' : lang === 'uz' ? 'Kurslar' : 'Courses'), 
      href: lang === 'tr' ? '/tr/egitimler/ebay-dropshipping' : lang === 'ru' ? '/ru/kursy/ebay-dropshipping' : lang === 'uz' ? '/uz/kurslar/ebay-dropshipping' : '/en/courses/ebay-dropshipping' 
    },
    { 
      name: dict?.nav?.blog || 'Blog', 
      href: `/${lang}/blog` 
    },
    { 
      name: dict?.nav?.contact || (lang === 'tr' ? 'İletişim' : lang === 'ru' ? 'Контакты' : lang === 'uz' ? 'Aloqa' : 'Contact'), 
      href: lang === 'tr' ? '/tr/iletisim' : lang === 'ru' ? '/ru/kontakty' : lang === 'uz' ? '/uz/aloqa' : '/en/contact' 
    },
  ];

  const servicesLabel = 
    lang === 'tr' ? 'Hizmetler' : 
    lang === 'ru' ? 'Услуги' : 
    lang === 'uz' ? 'Xizmatlar' : 'Services';

  const coursesHref = 
    lang === 'tr' ? '/tr/egitimler/ebay-dropshipping' : 
    lang === 'ru' ? '/ru/kursy/ebay-dropshipping' : 
    lang === 'uz' ? '/uz/kurslar/ebay-dropshipping' : '/en/courses/ebay-dropshipping';

  const contactHref = 
    lang === 'tr' ? '/tr/iletisim' : 
    lang === 'ru' ? '/ru/kontakty' : 
    lang === 'uz' ? '/uz/aloqa' : '/en/contact';

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
              <>🚀 Yeni 6 modüllük eBay Dropshipping Eğitimi ve Danışmanlığı yayında! <Link href={coursesHref} className="underline font-bold ml-2">Hemen İncele</Link></>
            ) : lang === 'ru' ? (
              <>🚀 Новый 6-модульный курс и консалтинг по eBay Dropshipping запущен! <Link href={coursesHref} className="underline font-bold ml-2">Узнать больше</Link></>
            ) : lang === 'uz' ? (
              <>🚀 Yangi 6 modulli eBay Dropshipping kursi va konsaltingi ishga tushdi! <Link href={coursesHref} className="underline font-bold ml-2">Batafsil ko'ring</Link></>
            ) : (
              <>🚀 New 6-module eBay Dropshipping Course & Consulting is live! <Link href={coursesHref} className="underline font-bold ml-2">Check it out</Link></>
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
              {servicesLabel}
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
            <button 
              onClick={() => switchLanguage('ru')} 
              className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-all ${lang === 'ru' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              RU
            </button>
            <button 
              onClick={() => switchLanguage('uz')} 
              className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-all ${lang === 'uz' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              UZ
            </button>
          </div>
          
          <Link
            href={contactHref}
            className="hidden sm:flex shrink-0 items-center gap-2 bg-[#0A192F] hover:bg-[#112240] text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all shadow-[0_0_40px_-10px_rgba(10,25,47,0.5)] hover:shadow-[0_0_50px_-10px_rgba(10,25,47,0.6)] hover:-translate-y-0.5 border border-white/10"
          >
            {dict?.nav?.freeAnalysis || (lang === 'tr' ? 'Ücretsiz Analiz' : lang === 'ru' ? 'Бесплатный Анализ' : lang === 'uz' ? 'Bepul Tahlil' : 'Free Analysis')} <ArrowRight className="w-4 h-4" />
          </Link>

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
               {servicesLabel}
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
            href={contactHref}
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-6 flex items-center justify-center gap-2 bg-[#0A192F] text-white px-6 py-4 rounded-xl text-lg font-bold w-full"
          >
            {dict?.nav?.freeAnalysis || (lang === 'tr' ? 'Ücretsiz Analiz' : lang === 'ru' ? 'Бесплатный Анализ' : lang === 'uz' ? 'Bepul Tahlil' : 'Free Analysis')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
