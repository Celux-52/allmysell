import { Metadata } from 'next';
import { ArrowLeft, Globe, Zap, Search, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const content = {
  en: {
    meta: {
      title: 'Comprehensive Web Platforms | Allmysell LLC',
      description: 'We build enterprise-level, high-performance, and fully SEO-compliant modern web platforms. Rebuild your digital identity.',
      keywords: 'enterprise web design, web platform development, seo compliant website, miami web agency, high performance sites, digital transformation',
    },
    back: 'Back to Services',
    tag: 'Technology & Design',
    title: 'Comprehensive Web Platforms',
    p1: 'In today\'s competitive conditions, having a standard website is no longer enough. As consumer habits change rapidly, your digital presence must be a living platform that can react in milliseconds and dominate search engines.',
    h2_1: 'Our Architectural Approach',
    p2: 'As Allmysell LLC, we take web platforms beyond being just a "digital business card". We build our projects on modern frameworks like Next.js and React, targeting zero latency with server-side rendering (SSR) capabilities. This architectural approach not only perfects the user experience; it also significantly increases your organic traffic by guaranteeing top scores in Google\'s Core Web Vitals metrics.',
    f1_title: 'Hyper Performance',
    f1_desc: 'With static generation and edge network usage, we offer smooth interfaces that load instantly from anywhere in the world.',
    f2_title: 'Built-in SEO Infrastructure',
    f2_desc: 'We maximize your visibility with semantic HTML and dynamic meta tags that search engine bots can read perfectly.',
    h2_2: 'User-Centric Design (UX/UI)',
    p3: 'A perfectly coded infrastructure reaches its true potential only when combined with a flawless design. With our data-driven user experience (UX) tests and industry-standard user interface (UI) designs, we design "conversion funnels" that turn visitors into customers. The position of each button, color psychology, and typographic hierarchy are specifically structured to reflect the corporate weight of your brand.',
    h2_3: 'Sustainability and Security',
    p4: 'The platforms we develop are structured in a modular way that can integrate into the technologies of the future. When your needs grow, the system does not need to be rewritten. Moreover, your corporate data and customer information are protected with the latest encryption protocols, wrapped in a complete digital armor.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'Why do you use Next.js instead of traditional CMS like WordPress?',
    faq_1_a: 'Next.js provides server-side rendering (SSR) and static site generation (SSG) which result in instant page loads and vastly superior SEO performance compared to traditional CMS platforms.',
    faq_2_q: 'Will my website be mobile-responsive?',
    faq_2_a: 'Absolutely. We design and develop with a mobile-first philosophy, ensuring your platform looks and performs perfectly on all device sizes.'
  },
  tr: {
    meta: {
      title: 'Kapsamlı Web Platformları | Allmysell LLC',
      description: 'Kurumsal seviyede, yüksek performanslı ve tam anlamıyla SEO uyumlu modern web platformları inşa ediyoruz. Dijital kimliğinizi baştan kurgulayın.',
      keywords: 'kurumsal web tasarımı, web platformu geliştirme, seo uyumlu web sitesi, miami web ajansı, yüksek performanslı siteler, dijital dönüşüm',
    },
    back: 'Hizmetlere Dön',
    tag: 'Teknoloji & Tasarım',
    title: 'Kapsamlı Web Platformları',
    p1: 'Günümüz rekabet koşullarında standart bir web sitesine sahip olmak artık yeterli değil. Tüketici alışkanlıkları hızla değişirken, dijital varlığınızın milisaniyeler içinde reaksiyon verebilen, arama motorlarında dominasyon kuran yaşayan bir platform olması şart.',
    h2_1: 'Mimari Yaklaşımımız',
    p2: 'Allmysell LLC olarak web platformlarını sıradan birer "dijital kartvizit" olmaktan çıkarıyoruz. Projelerimizi Next.js ve React gibi modern framework\'ler üzerine inşa ediyor, sunucu tarafı render etme (SSR) yetenekleriyle sıfır gecikme hedefliyoruz. Bu mimari yaklaşım, sadece kullanıcı deneyimini kusursuzlaştırmakla kalmıyor; Google\'ın Core Web Vitals metriklerinde en üst skorları almanızı garantileyerek organik trafiğinizi ciddi oranda artırıyor.',
    f1_title: 'Hiper Performans',
    f1_desc: 'Statik üretim ve edge network kullanımıyla dünyanın her yerinden anında yüklenen, pürüzsüz arayüzler sunuyoruz.',
    f2_title: 'Yerleşik SEO Altyapısı',
    f2_desc: 'Arama motoru botlarının kusursuzca okuyabileceği semantik HTML ve dinamik meta etiketleriyle görünürlüğünüzü maksimize ediyoruz.',
    h2_2: 'Kullanıcı Odaklı Tasarım (UX/UI)',
    p3: 'Mükemmel kodlanmış bir altyapı, ancak kusursuz bir tasarımla birleştiğinde gerçek potansiyeline ulaşır. Veri odaklı kullanıcı deneyimi (UX) testlerimiz ve endüstri standartlarını belirleyen arayüz (UI) tasarımlarımızla, ziyaretçileri müşteriye dönüştüren "dönüşüm hunileri" tasarlıyoruz. Her bir butonun konumu, renk psikolojisi ve tipografik hiyerarşi, markanızın kurumsal ağırlığını yansıtacak şekilde özel olarak kurgulanıyor.',
    h2_3: 'Sürdürülebilirlik ve Güvenlik',
    p4: 'Geliştirdiğimiz platformlar, geleceğin teknolojilerine entegre olabilecek modüler yapıda kurgulanır. İhtiyaçlarınız büyüdüğünde sistemin yeniden yazılmasına gerek kalmaz. Üstelik kurumsal verileriniz ve müşteri bilgileriniz, en güncel şifreleme protokolleriyle korunarak tam bir dijital zırh içine alınır.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'Neden WordPress gibi geleneksel CMS\'ler yerine Next.js kullanıyorsunuz?',
    faq_1_a: 'Next.js, sunucu tarafı oluşturma (SSR) ve statik site oluşturma (SSG) sunarak, geleneksel CMS platformlarına kıyasla anında sayfa yüklemeleri ve çok daha üstün SEO performansı sağlar.',
    faq_2_q: 'Web sitem mobil uyumlu olacak mı?',
    faq_2_a: 'Kesinlikle. Platformunuzun tüm cihaz boyutlarında mükemmel görünmesini ve çalışmasını sağlayacak şekilde "mobile-first" felsefesiyle tasarlıyor ve geliştiriyoruz.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  return data.meta;
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
            <Link href={`/${lang}/#services`} className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
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
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
