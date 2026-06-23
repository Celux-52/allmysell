import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer({ lang, dict }: { lang: string, dict: any }) {
  const isTr = lang === 'tr';
  return (
    <footer className="bg-[#020A16] pt-20 pb-10 px-6 lg:px-12 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Company Info & NAP */}
        <div>
          <p className="text-white font-bold text-xl mb-6">Allmysell LLC</p>
          <p className="text-white/60 font-light leading-relaxed mb-6">
            {isTr ? "Kurumsal yazılım geliştirme, B2B SaaS otomasyonu ve yapay zeka ajansı." : "Enterprise software development, B2B SaaS automation, and AI agency."}
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
                <a href="tel:+905518343030" className="hover:text-white transition-colors">+90 551 834 30 30 (TR)</a>
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
          <p className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">{dict?.nav?.services || (isTr ? "Hizmetler" : "Services")}</p>
          <ul className="space-y-3">
            <li><Link href={isTr ? '/tr/hizmetler/web-cozumleri' : '/en/services/web-solutions'} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.services?.web?.title || (isTr ? "Web Çözümleri" : "Web Solutions")}</Link></li>
            <li><Link href={isTr ? '/tr/hizmetler/e-ticaret' : '/en/services/e-commerce'} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.services?.ecommerce?.title || (isTr ? "E-ticaret" : "E-commerce")}</Link></li>
            <li><Link href={isTr ? '/tr/hizmetler/saas-yazilimlari' : '/en/services/saas-software'} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.services?.saas?.title || (isTr ? "SaaS Yazılımları" : "SaaS Development")}</Link></li>
            <li><Link href={isTr ? '/tr/hizmetler/stratejik-danismanlik' : '/en/services/strategic-consulting'} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.services?.consulting?.title || (isTr ? "Stratejik Danışmanlık" : "Strategic Consulting")}</Link></li>
            <li><Link href={isTr ? '/tr/hizmetler/yapay-zeka' : '/en/services/artificial-intelligence'} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.services?.ai?.title || (isTr ? "Yapay Zeka" : "Artificial Intelligence")}</Link></li>
            <li><Link href={isTr ? '/tr/hizmetler/mobil-uygulama' : '/en/services/mobile-application'} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.services?.mobile?.title || (isTr ? "Mobil Uygulama" : "Mobile Apps")}</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">{dict?.nav?.company || (isTr ? "Şirket" : "Company")}</p>
          <ul className="space-y-3">
            <li><Link href={isTr ? '/tr/hakkimizda' : '/en/about-us'} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.nav?.about || (isTr ? "Hakkımızda" : "About Us")}</Link></li>
            <li><Link href={`/${lang}/blog`} className="text-white/60 hover:text-white transition-colors text-sm">Blog</Link></li>
            <li><Link href={isTr ? '/tr/iletisim' : '/en/contact'} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.nav?.contact || (isTr ? "İletişim" : "Contact")}</Link></li>
          </ul>
        </div>

        {/* Legal & Social */}
        <div>
          <p className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">{dict?.nav?.legal || (isTr ? "Yasal" : "Legal")}</p>
          <ul className="space-y-3 mb-8">
            <li><Link href={isTr ? '/tr/gizlilik-politikasi' : '/en/privacy-policy'} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.footer?.privacy || (isTr ? "Gizlilik Politikası" : "Privacy Policy")}</Link></li>
            <li><Link href={isTr ? '/tr/cerez-politikasi' : '/en/cookie-policy'} className="text-white/60 hover:text-white transition-colors text-sm">{dict?.footer?.cookie || (isTr ? "Çerez Politikası" : "Cookie Policy")}</Link></li>
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
