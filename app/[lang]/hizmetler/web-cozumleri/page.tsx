import { Metadata } from 'next';
import { ArrowLeft, Globe, Zap, Search, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'Enterprise Web Platform Development',
      description: 'We build enterprise-level, hyper-performance, and fully SEO-compliant modern web platforms. Rebuild your digital identity with Next.js and React.',
      keywords: 'enterprise web design, web platform development, seo compliant website, st petersburg web agency, high performance sites, digital transformation',
    },
    back: 'Back to Services',
    tag: 'Technology & Design',
    title: 'Comprehensive Web Platforms',
    p1: 'In today\'s competitive conditions, having a standard website is no longer enough. As consumer habits change rapidly, your digital presence must be a living platform that can react in milliseconds, dominate search engine rankings, and convert casual visitors into loyal customers.',
    h2_1: 'Our Architectural Approach',
    p2: 'At Allmysell LLC, we take web platforms far beyond being just a "digital business card". We build our enterprise projects exclusively on modern, performance-oriented frameworks like Next.js and React, targeting zero latency with Server-Side Rendering (SSR) and Static Site Generation (SSG) capabilities. This architectural approach not only perfects the user experience but also significantly increases your organic traffic by guaranteeing top scores (95+) in Google\'s critical Core Web Vitals metrics.',
    f1_title: 'Hyper Performance & Edge Networking',
    f1_desc: 'With static generation and global Edge Network CDN usage, we offer buttery-smooth interfaces that load instantly from anywhere in the world, drastically reducing bounce rates.',
    f2_title: 'Built-in Technical SEO Infrastructure',
    f2_desc: 'We maximize your visibility with semantic HTML5, automated canonical tags, microdata (Schema.org), and dynamic meta tags that search engine bots crawl flawlessly.',
    h2_2: 'Data-Driven User-Centric Design (UX/UI)',
    p3: 'A perfectly coded infrastructure reaches its true potential only when combined with a flawless, psychologically optimized design. Through our data-driven User Experience (UX) testing and industry-standard User Interface (UI) design principles, we architect "conversion funnels" designed to generate revenue. The position of each Call-To-Action (CTA) button, the psychology behind the color palette, and the typographic hierarchy are specifically structured to reflect the corporate weight and authority of your brand.',
    h2_3: 'Sustainability, Modularity, and Security',
    p4: 'The platforms we develop are structured in a headless, modular way that can seamlessly integrate into the technologies of the future. When your business needs grow, the system scales horizontally; there is no need for a total rewrite. Moreover, your corporate data and customer information are protected with the latest encryption protocols, strict Content Security Policies (CSP), and wrapped in a complete digital armor against common web vulnerabilities.',
    h2_4: 'Our Technology Stack',
    tech_1_title: 'Core Frameworks',
    tech_1_desc: 'Next.js (App Router), React, and TypeScript for robust, type-safe, and infinitely scalable front-end architectures.',
    tech_2_title: 'Styling & Animation',
    tech_2_desc: 'TailwindCSS for utility-first styling, and Framer Motion for buttery-smooth, hardware-accelerated micro-animations.',
    tech_3_title: 'CMS & Infrastructure',
    tech_3_desc: 'Headless CMS integrations (Sanity, Strapi), Vercel/AWS Edge deployment, and advanced Redis caching mechanisms.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'Why do you use Next.js instead of traditional CMS like WordPress?',
    faq_1_a: 'Next.js provides Server-Side Rendering (SSR) and Static Site Generation (SSG) which result in instant page loads and vastly superior SEO performance compared to traditional, often bloated, monolithic CMS platforms like WordPress.',
    faq_2_q: 'Will my website be mobile-responsive?',
    faq_2_a: 'Absolutely. We design and develop with a strict "mobile-first" philosophy, ensuring your platform looks and performs perfectly on all device sizes and orientations.',
    faq_3_q: 'Do you provide SEO services along with the web development?',
    faq_3_a: 'We provide comprehensive Technical SEO (schema markup, semantic HTML, core web vitals optimization) out of the box. We also structure the content architecture to make your on-page SEO highly effective.',
    faq_4_q: 'Can we integrate third-party tools into the new platform?',
    faq_4_a: 'Yes, thanks to our headless and API-first approach, we can easily integrate any modern third-party service (CRMs like Salesforce/HubSpot, payment gateways, marketing tools).'
  },
  tr: {
    meta: {
      title: 'Kurumsal Web Platformu Geliştirme',
      description: 'Kurumsal seviyede, hiper performanslı ve tam anlamıyla teknik SEO uyumlu modern web platformları inşa ediyoruz. Next.js ile dijital kimliğinizi baştan kurgulayın.',
      keywords: 'kurumsal web tasarımı, web platformu geliştirme, seo uyumlu web sitesi, st petersburg web ajansı, yüksek performanslı siteler, dijital dönüşüm',
    },
    back: 'Hizmetlere Dön',
    tag: 'Teknoloji & Tasarım',
    title: 'Kapsamlı Web Platformları',
    p1: 'Günümüz rekabet koşullarında standart, şablondan bozma bir web sitesine sahip olmak artık yeterli değil. Tüketici alışkanlıkları hızla değişirken, dijital varlığınızın milisaniyeler içinde reaksiyon verebilen, arama motorlarında dominasyon kuran ve ziyaretçiyi müşteriye dönüştüren yaşayan bir platform olması şart.',
    h2_1: 'Mimari Yaklaşımımız',
    p2: 'Allmysell LLC olarak web platformlarını sıradan birer "dijital kartvizit" olmaktan çıkarıyoruz. Projelerimizi Next.js ve React gibi modern, performans odaklı framework\'ler üzerine inşa ediyor, sunucu tarafı render etme (SSR) ve statik üretim (SSG) yetenekleriyle sıfır gecikme (zero-latency) hedefliyoruz. Bu mimari yaklaşım, sadece kullanıcı deneyimini kusursuzlaştırmakla kalmıyor; Google\'ın en çok önem verdiği Core Web Vitals metriklerinde en üst skorları (95+) almanızı garantileyerek organik SEO trafiğinizi ciddi oranda artırıyor.',
    f1_title: 'Hiper Performans ve Edge Ağları',
    f1_desc: 'Statik üretim ve global Edge Network CDN kullanımıyla dünyanın her yerinden anında yüklenen, pürüzsüz arayüzler sunarak sayfadan çıkma (bounce) oranlarını düşürüyoruz.',
    f2_title: 'Yerleşik Teknik SEO Altyapısı',
    f2_desc: 'Arama motoru botlarının kusursuzca okuyup tarayabileceği semantik HTML5, otomatik canonical etiketleri, Schema.org mikro verileri ve dinamik meta etiketleriyle görünürlüğünüzü maksimize ediyoruz.',
    h2_2: 'Kullanıcı Odaklı Veri Tasarımı (UX/UI)',
    p3: 'Mükemmel kodlanmış bir altyapı, ancak kusursuz ve psikolojik olarak optimize edilmiş bir tasarımla birleştiğinde gerçek potansiyeline ulaşır. Veri odaklı kullanıcı deneyimi (UX) testlerimiz ve endüstri standartlarını belirleyen arayüz (UI) tasarım prensiplerimizle, ziyaretçileri müşteriye dönüştüren "dönüşüm hunileri" tasarlıyoruz. Her bir aksiyon butonunun (CTA) konumu, renk psikolojisi, boşluk (whitespace) kullanımı ve tipografik hiyerarşi, markanızın kurumsal ağırlığını yansıtacak şekilde özel olarak kurgulanıyor.',
    h2_3: 'Sürdürülebilirlik, Modülerlik ve Güvenlik',
    p4: 'Geliştirdiğimiz platformlar, geleceğin teknolojilerine entegre olabilecek modüler (headless) yapıda kurgulanır. İhtiyaçlarınız büyüdüğünde sistem yatay olarak ölçeklenir, baştan yazılmasına gerek kalmaz. Üstelik kurumsal verileriniz ve müşteri bilgileriniz, en güncel şifreleme protokolleriyle korunarak tam bir dijital zırh içine alınır, modern web zafiyetlerine karşı (XSS, CSRF) sıkı Güvenlik Politikaları (CSP) uygulanır.',
    h2_4: 'Kullandığımız Teknolojiler (Tech Stack)',
    tech_1_title: 'Temel Framework\'ler',
    tech_1_desc: 'Sağlam, tip güvenli (type-safe) ve sonsuz ölçeklenebilir frontend mimarileri için Next.js (App Router), React ve TypeScript.',
    tech_2_title: 'Stil ve Animasyon',
    tech_2_desc: 'Utility-first modern tasarım için TailwindCSS ve donanım hızlandırmalı, pürüzsüz mikro animasyonlar için Framer Motion.',
    tech_3_title: 'CMS ve Altyapı',
    tech_3_desc: 'Headless CMS entegrasyonları (Sanity, Strapi), Vercel/AWS Edge dağıtımı ve gelişmiş Redis önbellekleme mekanizmaları.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'Neden WordPress gibi geleneksel CMS\'ler yerine Next.js kullanıyorsunuz?',
    faq_1_a: 'Next.js, sunucu tarafı oluşturma (SSR) ve statik site oluşturma (SSG) sunarak, geleneksel, genellikle hantal olan WordPress gibi monolitik CMS platformlarına kıyasla anında sayfa yüklemeleri ve çok daha üstün SEO performansı sağlar.',
    faq_2_q: 'Web sitem mobil uyumlu (responsive) olacak mı?',
    faq_2_a: 'Kesinlikle. Platformunuzun tüm cihaz boyutlarında ve ekran yönelimlerinde mükemmel görünmesini ve çalışmasını sağlayacak şekilde katı bir "mobile-first" felsefesiyle tasarlıyor ve geliştiriyoruz.',
    faq_3_q: 'Web geliştirme ile birlikte SEO hizmeti de sağlıyor musunuz?',
    faq_3_a: 'Projelerimizde kapsamlı "Teknik SEO" (schema markup, semantik HTML, Core Web Vitals optimizasyonu) mimarisini kutudan çıktığı haliyle sunuyoruz. Ayrıca On-Page SEO performansınızın yüksek olması için içerik mimarisini doğru kurguluyoruz.',
    faq_4_q: 'Yeni platforma üçüncü parti (third-party) araçları entegre edebilir miyiz?',
    faq_4_a: 'Evet, headless ve API-first (önce API) yaklaşımımız sayesinde, modern üçüncü parti servisleri (Salesforce/HubSpot gibi CRM\'ler, ödeme geçitleri, pazarlama araçları) kolaylıkla entegre edebiliyoruz.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  return {
    ...data.meta,
    alternates: constructAlternates('services/web-solutions', 'hizmetler/web-cozumleri', lang)
  };
}

export default async function WebCozumleri({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params)?.lang || 'en';
  const dict = content[lang as keyof typeof content] || content.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": dict.title,
    "provider": {
      "@type": "Organization",
      "name": "Allmysell LLC"
    },
    "description": dict.meta.description,
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Platform Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": dict.f1_title,
            "description": dict.f1_desc
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": dict.f2_title,
            "description": dict.f2_desc
          }
        }
      ]
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": dict.faq_1_q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": dict.faq_1_a
        }
      },
      {
        "@type": "Question",
        "name": dict.faq_2_q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": dict.faq_2_a
        }
      },
      {
        "@type": "Question",
        "name": dict.faq_3_q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": dict.faq_3_a
        }
      },
      {
        "@type": "Question",
        "name": dict.faq_4_q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": dict.faq_4_a
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="min-h-screen bg-[#FAFAFA] text-[#0A192F] selection:bg-[#0A192F] selection:text-white pb-32">
        <div className="w-full h-[40vh] bg-[#0A192F] relative overflow-hidden flex items-end">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-blue-500/20 rounded-full blur-[120px]"></div>
          <div className="max-w-4xl mx-auto w-full px-6 lg:px-12 pb-16 relative z-10">
            <Link prefetch={false} href={`/${lang}/#services`} className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
              <ArrowLeft className="w-4 h-4" /> {dict.back}
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                <Globe className="w-6 h-6 text-blue-300" />
              </div>
              <span className="text-blue-300 font-semibold tracking-widest uppercase text-xs">{dict.tag}</span>
            </div>
            <h1 className="font-sans text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              {dict.title}
            </h1>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-6 lg:px-12 mt-16 font-sans">
          <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
            <p className="text-2xl font-light text-[#0A192F] leading-relaxed mb-10 border-l-4 border-blue-600 pl-6">
              {dict.p1}
            </p>

            <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">{dict.h2_1}</h2>
            <p>{dict.p2}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <Zap className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-[#0A192F] mb-3">{dict.f1_title}</h3>
                <p className="text-slate-500">{dict.f1_desc}</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <Search className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-[#0A192F] mb-3">{dict.f2_title}</h3>
                <p className="text-slate-500">{dict.f2_desc}</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">{dict.h2_2}</h2>
            <p>{dict.p3}</p>

            <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">{dict.h2_3}</h2>
            <p>{dict.p4}</p>
            
            <hr className="my-16 border-slate-200" />
            
            <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">{dict.h2_4}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-[#0A192F] p-6 rounded-2xl border border-[#0A192F]/20 text-white shadow-lg hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg font-bold text-blue-400 mb-2">{dict.tech_1_title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{dict.tech_1_desc}</p>
              </div>
              <div className="bg-[#0A192F] p-6 rounded-2xl border border-[#0A192F]/20 text-white shadow-lg hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg font-bold text-blue-400 mb-2">{dict.tech_2_title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{dict.tech_2_desc}</p>
              </div>
              <div className="bg-[#0A192F] p-6 rounded-2xl border border-[#0A192F]/20 text-white shadow-lg hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg font-bold text-blue-400 mb-2">{dict.tech_3_title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{dict.tech_3_desc}</p>
              </div>
            </div>

            <hr className="my-16 border-slate-200" />

            <h2 className="text-3xl font-bold text-[#0A192F] mb-8 tracking-tight flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-blue-600" />
              {dict.faq_title}
            </h2>
            <div className="space-y-6 not-prose">
              <details className="group bg-white p-6 rounded-2xl border border-slate-200 cursor-pointer">
                <summary className="text-lg font-bold text-[#0A192F] font-sans list-none flex justify-between items-center">
                  {dict.faq_1_q}
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-slate-500 mt-4 leading-relaxed font-sans">{dict.faq_1_a}</p>
              </details>
              <details className="group bg-white p-6 rounded-2xl border border-slate-200 cursor-pointer">
                <summary className="text-lg font-bold text-[#0A192F] font-sans list-none flex justify-between items-center">
                  {dict.faq_2_q}
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-slate-500 mt-4 leading-relaxed font-sans">{dict.faq_2_a}</p>
              </details>
              <details className="group bg-white p-6 rounded-2xl border border-slate-200 cursor-pointer">
                <summary className="text-lg font-bold text-[#0A192F] font-sans list-none flex justify-between items-center">
                  {dict.faq_3_q}
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-slate-500 mt-4 leading-relaxed font-sans">{dict.faq_3_a}</p>
              </details>
              <details className="group bg-white p-6 rounded-2xl border border-slate-200 cursor-pointer">
                <summary className="text-lg font-bold text-[#0A192F] font-sans list-none flex justify-between items-center">
                  {dict.faq_4_q}
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-slate-500 mt-4 leading-relaxed font-sans">{dict.faq_4_a}</p>
              </details>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
