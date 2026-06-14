import { Metadata } from 'next';
import { ArrowLeft, ShieldCheck, Cpu, Cloud, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'Custom B2B SaaS Software Development',
      description: 'We develop custom, highly secure, instantly scalable and cloud-based B2B/B2C SaaS (Software as a Service) architectures for your business. Enterprise solutions.',
      keywords: 'saas development, custom software solutions, cloud-based software, b2b saas, software agency, st petersburg saas developer',
    },
    back: 'Back to Services',
    tag: 'Cloud & Security',
    title: 'Custom SaaS Software',
    p1: 'Off-the-shelf software packages cannot keep up with the growth rate of your company. Meet cloud-based custom SaaS (Software as a Service) architectures that perfectly adapt to your company\'s unique workflows, optimize operations, and maximize your profitability metrics.',
    h2_1: 'Liberate Your Business Processes',
    p2: 'Maintenance costs of on-premise servers, data loss risks, and office-dependent working models are a thing of the past. Modern companies are moving all their complex operations—such as CRM (Customer Relationship Management), ERP (Enterprise Resource Planning), automated billing, human resources management, or sectoral data analysis—to cloud-based systems. The closed-circuit or globally open scalable SaaS projects we develop are accessible in milliseconds from anywhere in the world and are protected with bank-level military-grade security standards. By minimizing human error through autonomous workflows, we ensure your business engine runs 24/7 without interruptions.',
    f1_title: 'Seamless Cloud Architecture',
    f1_desc: 'We provide a 99.9% uptime guarantee by hosting your application on giant infrastructures like AWS, Google Cloud, or Microsoft Azure with auto-scaling capabilities.',
    f2_title: 'API and Microservices',
    f2_desc: 'Independent yet compatible microservice architectures that provide seamless integration with your existing external tools (accounting, shipping, third-party analytics).',
    h2_2: 'Flawless Data Security & Isolation',
    p3: 'The most critical leg of SaaS projects is undoubtedly data security and user isolation. We encrypt all internal and external data traffic end-to-end (E2EE), apply regular automated penetration tests, and deliver an infrastructure fully compliant with international legal regulations like GDPR, HIPAA, and KVKK. Using strict multi-tenant database isolation strategies (row-level security or separate schemas), we guarantee that one client\'s data can never bleed into another\'s. Your proprietary data is kept in a digital vault with AI-supported Web Application Firewalls (WAF) that actively prevent SQL injections, DDoS attacks, and unauthorized access attempts.',
    h2_3: 'Go-To-Market (GTM) Strategy',
    p4: 'If you are building a B2B or B2C SaaS startup from scratch, we don\'t just write code; we architect your success. We provide comprehensive consultancy on establishing the right pricing models (Subscription, Freemium, Tiered), optimizing the conversion funnels, architecting the multi-tenant database management, and developing onboarding workflows that drastically reduce churn rates. A great SaaS must not only work perfectly but also sell itself effortlessly.',
    h2_4: 'Our Technology Stack',
    tech_1_title: 'Frontend Architecture',
    tech_1_desc: 'Next.js, React, TailwindCSS for lightning-fast, SSR-optimized, and highly interactive user interfaces.',
    tech_2_title: 'Backend & APIs',
    tech_2_desc: 'Node.js, Python (FastAPI/Django), and Go for building resilient, high-throughput RESTful or GraphQL APIs.',
    tech_3_title: 'Cloud & Database',
    tech_3_desc: 'AWS, Google Cloud, PostgreSQL, MongoDB, and Redis caching for auto-scaling multi-tenant environments.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'Which cloud providers do you use for SaaS architectures?',
    faq_1_a: 'We build scalable infrastructures primarily on AWS, Google Cloud, and Microsoft Azure, choosing the best fit for your specific requirements (compliance, region, pricing).',
    faq_2_q: 'Do you handle multi-tenant databases?',
    faq_2_a: 'Yes, we architect highly secure multi-tenant databases ensuring absolute data isolation between your different clients or organizations, using strategies like shared-database/separate-schema or fully isolated instances.',
    faq_3_q: 'How long does it take to develop a custom SaaS MVP?',
    faq_3_a: 'A solid Minimum Viable Product (MVP) typically takes 3 to 5 months to develop, depending on feature complexity, third-party integrations, and security requirements.',
    faq_4_q: 'Do you offer ongoing maintenance after launch?',
    faq_4_a: 'Absolutely. We offer SLA-backed maintenance packages including server monitoring, security patching, and continuous feature development.'
  },
  tr: {
    meta: {
      title: 'Kurumsal B2B SaaS Geliştirme',
      description: 'İşletmenize özel, yüksek güvenlikli, anında ölçeklenebilen ve bulut tabanlı B2B/B2C SaaS (Software as a Service) mimarileri geliştiriyoruz.',
      keywords: 'saas geliştirme, özel yazılım çözümleri, bulut tabanlı yazılımlar, b2b saas, yazılım ajansı, st petersburg saas geliştirici',
    },
    back: 'Hizmetlere Dön',
    tag: 'Bulut & Güvenlik',
    title: 'Özel SaaS Yazılımları',
    p1: 'Piyasada satılan hazır paket yazılımlar şirketinizin agresif büyüme hızına ve operasyonel dinamiklerine ayak uyduramaz. Şirketinizin benzersiz iş akışlarına tam uyum sağlayan, karlılık metriklerinizi optimize eden ve verimliliği en üst düzeye çıkaran bulut tabanlı özel SaaS (Hizmet olarak Yazılım) mimarileriyle tanışın.',
    h2_1: 'İş Süreçlerinizi Özgürleştirin',
    p2: 'Şirket içi fiziksel sunucuların (on-premise) yüksek bakım maliyetleri, donanım arızalarından kaynaklı veri kaybı riskleri ve ofise bağımlı çalışma modelleri geride kaldı. Modern ve vizyoner şirketler; CRM (Müşteri İlişkileri Yönetimi), ERP (Kurumsal Kaynak Planlama), otomatik faturalandırma, insan kaynakları veya sektörel veri analizi gibi tüm kritik operasyonlarını bulut tabanlı sistemlere taşıyor. Geliştirdiğimiz kapalı devre (in-house) veya globale açık, milyonlarca trafiği kaldırabilen SaaS projeleri, dünyanın her yerinden milisaniyeler içinde erişilebilir ve banka düzeyinde güvenlik standartlarıyla korunur. İş süreçlerinizi otonom hale getirerek insan hatasını sıfıra indiriyoruz.',
    f1_title: 'Kesintisiz Bulut Mimarisi',
    f1_desc: 'Uygulamanızı AWS, Google Cloud veya Microsoft Azure gibi dev altyapılarda barındırarak, otomatik ölçeklenme (auto-scaling) yeteneğiyle %99.9 çalışma süresi (uptime) garantisi sağlıyoruz.',
    f2_title: 'API ve Mikroservisler',
    f2_desc: 'Mevcut üçüncü parti araçlarınızla (muhasebe, kargo, ERP, pazarlama) kusursuz entegrasyon sağlayan, bağımsız ancak birbiriyle haberleşen mikroservis mimarileri.',
    h2_2: 'Kusursuz Veri Güvenliği ve İzolasyon',
    p3: 'B2B ve B2C SaaS projelerinin en kritik bacağı hiç şüphesiz veri güvenliği ve kullanıcı izolasyonudur (multi-tenancy). Tüm iç ve dış veri trafiğini uçtan uca şifreliyor (E2EE), düzenli sızma (Penetration) testleri uyguluyor ve GDPR, KVKK, HIPAA gibi uluslararası yasal regülasyonlara tam uyumlu bir altyapı teslim ediyoruz. Row-level security (satır bazlı güvenlik) veya ayrı şema mimarileri kullanarak bir müşterinin verisinin diğerine karışmamasını %100 garanti altına alıyoruz. İzinsiz girişleri, SQL Injection ve DDoS saldırılarını engelleyen yapay zeka destekli güvenlik duvarlarıyla (WAF) verileriniz dijital bir kasanın içinde tutulur.',
    h2_3: 'Pazara Çıkış (GTM) Stratejisi',
    p4: 'Eğer sıfırdan bir B2B veya B2C SaaS girişimi (startup) kuruyorsanız, yalnızca yazılım geliştirmekle (kod yazmakla) kalmıyor; başarınızı da mimarilendiriyoruz. Doğru fiyatlandırma modelleri (Aylık Abonelik, Freemium, Kullanım Bazlı vs.), çoklu kiracı (multi-tenant) veritabanı optimizasyonu, churn oranlarını düşüren kullanıcı katılım (onboarding) senaryoları ve dönüşüm hunileri üzerine kapsamlı danışmanlık veriyoruz. Harika bir SaaS projesi sadece kusursuz çalışmamalı, aynı zamanda kendi kendini satabilmelidir.',
    h2_4: 'Kullandığımız Teknolojiler (Tech Stack)',
    tech_1_title: 'Frontend Mimarisi',
    tech_1_desc: 'Işık hızında, SSR optimizasyonlu ve etkileşimi yüksek arayüzler için Next.js, React ve TailwindCSS.',
    tech_2_title: 'Backend ve API\'lar',
    tech_2_desc: 'Yüksek trafik ve veri işleme kapasitesine sahip RESTful veya GraphQL API\'lar için Node.js, Python (FastAPI) ve Go.',
    tech_3_title: 'Bulut ve Veritabanı',
    tech_3_desc: 'Otomatik ölçeklenen sistemler için AWS, Google Cloud, PostgreSQL, MongoDB ve Redis önbellekleme (caching) mimarileri.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'SaaS mimarileri için hangi bulut sağlayıcıları kullanıyorsunuz?',
    faq_1_a: 'Öncelikle yasal gereksinimlerinize ve hedef bölgenize en uygun olanı seçerek AWS, Google Cloud ve Microsoft Azure üzerinde ölçeklenebilir, modern altyapılar kuruyoruz.',
    faq_2_q: 'Çok kiracılı (multi-tenant) veritabanı altyapılarını yönetebiliyor musunuz?',
    faq_2_a: 'Kesinlikle. Farklı müşterileriniz veya organizasyonlarınız arasında mutlak veri izolasyonu sağlayan, shared-database/separate-schema (ortak veritabanı/ayrı şema) gibi stratejilerle son derece güvenli multi-tenant veritabanları tasarlıyoruz.',
    faq_3_q: 'Özel bir SaaS projesinin (MVP) geliştirilmesi ne kadar sürer?',
    faq_3_a: 'Özelliklerin karmaşıklığına, üçüncü parti entegrasyonlara ve güvenlik gereksinimlerine bağlı olarak sağlam bir Minimum Uygulanabilir Ürün (MVP) geliştirmek genellikle 3 ila 5 ay sürer.',
    faq_4_q: 'Canlıya aldıktan sonra sunucu bakım ve destek hizmeti sunuyor musunuz?',
    faq_4_a: 'Evet. SLA (Hizmet Seviyesi Sözleşmesi) destekli bakım paketlerimizle 7/24 sunucu izleme (monitoring), güvenlik yamaları ve sürekli yeni özellik geliştirme (continuous development) hizmeti sunuyoruz.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  const path = lang === 'tr' ? '/tr/hizmetler/saas-yazilimlari' : '/en/services/saas-software';
  
  return {
    ...data.meta,
    alternates: constructAlternates('services/saas-software', 'hizmetler/saas-yazilimlari', lang)
  };
}

export default async function SaaS({ params }: { params: Promise<{ lang: string }> }) {
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
      "name": "SaaS Solutions",
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
          <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-emerald-500/20 rounded-full blur-[120px]"></div>
          <div className="max-w-4xl mx-auto w-full px-6 lg:px-12 pb-16 relative z-10">
            <Link prefetch={false} href={`/${lang}/#services`} className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
              <ArrowLeft className="w-4 h-4" /> {dict.back}
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                <ShieldCheck className="w-6 h-6 text-emerald-300" />
              </div>
              <span className="text-emerald-300 font-semibold tracking-widest uppercase text-xs">{dict.tag}</span>
            </div>
            <h1 className="font-sans text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              {dict.title}
            </h1>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-6 lg:px-12 mt-16 font-sans">
          <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
            <p className="text-2xl font-light text-[#0A192F] leading-relaxed mb-10 border-l-4 border-emerald-600 pl-6">
              {dict.p1}
            </p>

            <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">{dict.h2_1}</h2>
            <p>{dict.p2}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <Cloud className="w-8 h-8 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold text-[#0A192F] mb-3">{dict.f1_title}</h3>
                <p className="text-slate-500">{dict.f1_desc}</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <Cpu className="w-8 h-8 text-emerald-600 mb-4" />
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
                <h3 className="text-lg font-bold text-emerald-400 mb-2">{dict.tech_1_title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{dict.tech_1_desc}</p>
              </div>
              <div className="bg-[#0A192F] p-6 rounded-2xl border border-[#0A192F]/20 text-white shadow-lg hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg font-bold text-emerald-400 mb-2">{dict.tech_2_title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{dict.tech_2_desc}</p>
              </div>
              <div className="bg-[#0A192F] p-6 rounded-2xl border border-[#0A192F]/20 text-white shadow-lg hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg font-bold text-emerald-400 mb-2">{dict.tech_3_title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{dict.tech_3_desc}</p>
              </div>
            </div>

            <hr className="my-16 border-slate-200" />
            
            <h2 className="text-3xl font-bold text-[#0A192F] mb-8 tracking-tight flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-emerald-600" />
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
