import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer({ lang, dict }: { lang: string, dict: any }) {
  const getAboutLink = () => {
    switch (lang) {
      case 'tr': return '/tr/hakkimizda';
      case 'ru': return '/ru/o-nas';
      case 'uz': return '/uz/biz-haqimizda';
      default: return '/en/about-us';
    }
  };

  const getCoursesLink = () => {
    switch (lang) {
      case 'tr': return '/tr/egitimler/ebay-dropshipping';
      case 'ru': return '/ru/kursy/ebay-dropshipping';
      case 'uz': return '/uz/kurslar/ebay-dropshipping';
      default: return '/en/courses/ebay-dropshipping';
    }
  };

  const getContactLink = () => {
    switch (lang) {
      case 'tr': return '/tr/iletisim';
      case 'ru': return '/ru/kontakty';
      case 'uz': return '/uz/aloqa';
      default: return '/en/contact';
    }
  };

  const getPrivacyLink = () => {
    switch (lang) {
      case 'tr': return '/tr/gizlilik-politikasi';
      case 'ru': return '/ru/politika-konfidencialnosti';
      case 'uz': return '/uz/maxfiylik-siyosati';
      default: return '/en/privacy-policy';
    }
  };

  const getCookieLink = () => {
    switch (lang) {
      case 'tr': return '/tr/cerez-politikasi';
      case 'ru': return '/ru/politika-kuki';
      case 'uz': return '/uz/kuki-siyosati';
      default: return '/en/cookie-policy';
    }
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
      case 'ai':
        return lang === 'tr' ? '/tr/hizmetler/yapay-zeka' : lang === 'ru' ? '/ru/uslugi/iskusstvenniy-intellekt' : lang === 'uz' ? '/uz/xizmatlar/suniy-idrok' : '/en/services/artificial-intelligence';
      case 'mobile':
        return lang === 'tr' ? '/tr/hizmetler/mobil-uygulama' : lang === 'ru' ? '/ru/uslugi/mobilnye-prilozheniya' : lang === 'uz' ? '/uz/xizmatlar/mobil-ilovalar' : '/en/services/mobile-application';
      default:
        return `/${lang}`;
    }
  };

  const desc = 
    lang === 'tr' ? "Kurumsal yazılım geliştirme, B2B SaaS otomasyonu ve yapay zeka ajansı." :
    lang === 'ru' ? "Корпоративная разработка ПО, автоматизация B2B SaaS и агентство искусственного интеллекта." :
    lang === 'uz' ? "Korporativ dasturiy ta'minot yaratish, B2B SaaS avtomatlashtirish va sun'iy intellekt agentligi." :
    "Enterprise software development, B2B SaaS automation, and AI agency.";

  const servicesHeading = 
    lang === 'tr' ? "Hizmetler" :
    lang === 'ru' ? "Услуги" :
    lang === 'uz' ? "Xizmatlar" : "Services";

  const companyHeading = 
    lang === 'tr' ? "Şirket" :
    lang === 'ru' ? "Компания" :
    lang === 'uz' ? "Kompaniya" : "Company";

  const legalHeading = 
    lang === 'tr' ? "Yasal" :
    lang === 'ru' ? "Правовая информация" :
    lang === 'uz' ? "Huquqiy" : "Legal";

  return (
    <footer className="bg-[#020A16] pt-20 pb-10 px-6 lg:px-12 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Company Info & NAP */}
        <div>
          <p className="text-white font-bold text-xl mb-6">Allmysell LLC</p>
          <p className="text-white/60 font-light leading-relaxed mb-6">
            {desc}
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-white/70">
              <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-sm">7901 4th St N, Ste 300<br/>St. Petersburg, FL 33702, US</span>
            </div>
            <div className="flex items-start gap-3 text-white/70">
              <Phone className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-sm">
                <a href="tel:+905537065912" className="hover:text-white transition-colors">+90 553 706 59 12</a><br/>
                <a href="tel:+905518343030" className="hover:text-white transition-colors">+90 551 834 30 30</a>
              </span>
            </div>
            <div className="flex items-start gap-3 text-white/70">
              <Mail className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-sm">info@allmysell.com</span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">{servicesHeading}</p>
          <ul className="space-y-3">
            <li><Link href={getServiceLink('web')} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.services?.web?.title || "Web Solutions"}</Link></li>
            <li><Link href={getServiceLink('ecommerce')} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.services?.ecommerce?.title || "E-commerce"}</Link></li>
            <li><Link href={getServiceLink('saas')} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.services?.saas?.title || "SaaS Development"}</Link></li>
            <li><Link href={getServiceLink('consulting')} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.services?.consulting?.title || "Strategic Consulting"}</Link></li>
            <li><Link href={getServiceLink('ai')} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.services?.ai?.title || "Artificial Intelligence"}</Link></li>
            <li><Link href={getServiceLink('mobile')} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.services?.mobile?.title || "Mobile Apps"}</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">{companyHeading}</p>
          <ul className="space-y-3">
            <li><Link href={getAboutLink()} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.nav?.about || (lang === 'tr' ? "Hakkımızda" : lang === 'ru' ? "О нас" : lang === 'uz' ? "Biz Haqimizda" : "About Us")}</Link></li>
            <li><Link href={getCoursesLink()} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.nav?.courses || (lang === 'tr' ? "Eğitimler" : lang === 'ru' ? "Курсы" : lang === 'uz' ? "Kurslar" : "Courses")}</Link></li>
            <li><Link href={`/${lang}/blog`} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.nav?.blog || "Blog"}</Link></li>
            <li><Link href={getContactLink()} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.nav?.contact || (lang === 'tr' ? "İletişim" : lang === 'ru' ? "Контакты" : lang === 'uz' ? "Aloqa" : "Contact")}</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <p className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">{legalHeading}</p>
          <ul className="space-y-3 mb-8">
            <li><Link href={getPrivacyLink()} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.footer?.privacy || "Privacy Policy"}</Link></li>
            <li><Link href={getCookieLink()} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.footer?.cookie || "Cookie Policy"}</Link></li>
          </ul>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center">
        <p className="text-xs md:text-sm text-white/30 font-semibold tracking-[0.2em] uppercase">
          &copy; 2026 {dict?.footer?.text || "Allmysell LLC. All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
