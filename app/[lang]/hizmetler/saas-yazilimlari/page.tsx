import { Metadata } from 'next';
import { ArrowLeft, ShieldCheck, Cpu, Cloud, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const content = {
  en: {
    meta: {
      title: 'Custom SaaS Software | Allmysell LLC',
      description: 'We develop custom, highly secure, instantly scalable and cloud-based B2B/B2C SaaS (Software as a Service) architectures for your business.',
      keywords: 'saas development, custom software solutions, cloud-based software, b2b saas, software agency, miami saas developer',
    },
    back: 'Back to Services',
    tag: 'Cloud & Security',
    title: 'Custom SaaS Software',
    p1: 'Off-the-shelf software packages cannot keep up with the growth rate of your company. Meet cloud-based custom SaaS (Software as a Service) architectures that perfectly adapt to your company\'s unique workflows and maximize efficiency.',
    h2_1: 'Liberate Your Business Processes',
    p2: 'Maintenance costs of on-premise servers, data loss risks, and office-dependent working models are a thing of the past. Modern companies are moving all their operations, such as CRM, ERP, project management, or sectoral data analysis, to cloud-based systems. The closed-circuit or globally open SaaS projects we develop are accessible in seconds from anywhere in the world and are protected with bank-level security standards.',
    f1_title: 'Seamless Cloud Architecture',
    f1_desc: 'We provide a 99.9% uptime guarantee by hosting your application on giant infrastructures like AWS, Google Cloud, or Azure.',
    f2_title: 'API and Microservices',
    f2_desc: 'Independent yet compatible microservice architectures that provide full integration with your existing tools (accounting, cargo, communication).',
    h2_2: 'Flawless Data Security',
    p3: 'The most critical leg of SaaS projects is undoubtedly data security. We encrypt all data traffic end-to-end, apply regular penetration tests, and deliver an infrastructure fully compliant with international legal regulations like GDPR and KVKK. Your data is kept in a digital safe with AI-supported firewalls that prevent unauthorized access.',
    h2_3: 'Go-To-Market (GTM) Strategy',
    p4: 'If you are building a B2B or B2C SaaS startup, we don\'t just develop software; we also provide consultancy on right pricing models (Subscription, freemium, etc.), multi-tenant database management, and business models that optimize user onboarding.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'Which cloud providers do you use for SaaS architectures?',
    faq_1_a: 'We build scalable infrastructures primarily on AWS, Google Cloud, and Microsoft Azure, choosing the best fit for your specific requirements.',
    faq_2_q: 'Do you handle multi-tenant databases?',
    faq_2_a: 'Yes, we architect highly secure multi-tenant databases ensuring absolute data isolation between your different clients or organizations.'
  },
  tr: {
    meta: {
      title: 'Özel SaaS Yazılımları | Allmysell LLC',
      description: 'İşletmenize özel, yüksek güvenlikli, anında ölçeklenebilen ve bulut tabanlı B2B/B2C SaaS (Software as a Service) mimarileri geliştiriyoruz.',
      keywords: 'saas geliştirme, özel yazılım çözümleri, bulut tabanlı yazılımlar, b2b saas, yazılım ajansı, miami saas geliştirici',
    },
    back: 'Hizmetlere Dön',
    tag: 'Bulut & Güvenlik',
    title: 'Özel SaaS Yazılımları',
    p1: 'Hazır paket yazılımlar şirketinizin büyüme hızına ayak uyduramaz. Şirketinizin benzersiz iş akışlarına tam uyum sağlayan, verimliliği en üst düzeye çıkaran bulut tabanlı özel SaaS (Hizmet olarak Yazılım) mimarileriyle tanışın.',
    h2_1: 'İş Süreçlerinizi Özgürleştirin',
    p2: 'Şirket içi sunucuların bakım maliyetleri, veri kaybı riskleri ve ofise bağımlı çalışma modelleri geride kaldı. Modern şirketler; CRM, ERP, proje yönetimi veya sektörel veri analizi gibi tüm operasyonlarını bulut tabanlı sistemlere taşıyor. Geliştirdiğimiz kapalı devre veya globale açık SaaS projeleri, dünyanın her yerinden saniyeler içinde erişilebilir, banka düzeyinde güvenlik standartlarıyla korunur.',
    f1_title: 'Kesintisiz Bulut Mimarisi',
    f1_desc: 'Uygulamanızı AWS, Google Cloud veya Azure gibi dev altyapılarda barındırarak %99.9 çalışma süresi (uptime) garantisi sağlıyoruz.',
    f2_title: 'API ve Mikroservisler',
    f2_desc: 'Mevcut araçlarınızla (muhasebe, kargo, iletişim) tam entegrasyon sağlayan, bağımsız ancak uyumlu mikroservis mimarileri.',
    h2_2: 'Kusursuz Veri Güvenliği',
    p3: 'SaaS projelerinin en kritik bacağı hiç şüphesiz veri güvenliğidir. Tüm veri trafiğini uçtan uca şifreliyor (End-to-End Encryption), düzenli sızma (Penetration) testleri uyguluyor ve GDPR, KVKK gibi uluslararası yasal regülasyonlara tam uyumlu bir altyapı teslim ediyoruz. İzinsiz girişleri engelleyen yapay zeka destekli güvenlik duvarlarıyla verileriniz dijital bir kasanın içinde tutulur.',
    h2_3: 'Pazara Çıkış (GTM) Stratejisi',
    p4: 'Eğer bir B2B veya B2C SaaS girişimi kuruyorsanız, yalnızca yazılım geliştirmekle kalmıyor; doğru fiyatlandırma modelleri (Abonelik, freemium vb.), çoklu kiracı (multi-tenant) veritabanı yönetimi ve kullanıcı katılımlarını (onboarding) optimize eden iş modelleri üzerine danışmanlık da veriyoruz.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'SaaS mimarileri için hangi bulut sağlayıcıları kullanıyorsunuz?',
    faq_1_a: 'Öncelikle gereksinimlerinize en uygun olanı seçerek AWS, Google Cloud ve Microsoft Azure üzerinde ölçeklenebilir altyapılar kuruyoruz.',
    faq_2_q: 'Çok kiracılı (multi-tenant) veritabanı altyapılarını yönetebiliyor musunuz?',
    faq_2_a: 'Evet, farklı müşterileriniz veya organizasyonlarınız arasında mutlak veri izolasyonu sağlayan son derece güvenli multi-tenant veritabanları tasarlıyoruz.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  return data.meta;
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
            <Link href={`/${lang}/#services`} className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
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
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
