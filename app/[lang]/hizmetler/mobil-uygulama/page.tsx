import { Metadata } from 'next';
import { ArrowLeft, Smartphone, Zap, Layers, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'Enterprise Mobile Application Development',
      description: 'We develop enterprise mobile applications for iOS and Android that are high-performance, native-feeling, and instantly scalable.',
      keywords: 'mobile app development, ios app, android app, react native, enterprise mobile software, st petersburg app developer, mobile ux, cross-platform apps, mobile strategy',
    },
    back: 'Back to Services',
    tag: 'Connection & Experience',
    title: 'Mobile Applications',
    p1: 'Reaching the screen in your customers\' pockets is the ultimate point of brand loyalty. Unlike clunky, freezing, and battery-draining apps that tire the user; we build modern, stable, and hyper-optimized mobile ecosystems that flow like water as you swipe across the screen.',
    h2_1: 'Flawless Architecture and Native Performance',
    p2: 'With modern React Native architectures that feel 100% native (Swift/Kotlin) in quality, we build infrastructures that can instantly host millions of concurrent users for both iOS and Android over a single, maintainable codebase. We do not just build UI; we engineer the core. We always target the highest industry standards in device memory optimization (RAM management) and low battery consumption metrics, which are the absolute most critical aspects of user retention in a mobile application.',
    f1_title: '60 FPS Smooth Experience',
    f1_desc: 'Screen transitions, complex gestures, and micro-animations are hardware-accelerated to run at 60 frames per second, smoothly and with zero latency.',
    f2_title: 'Omnichannel & API Integration',
    f2_desc: 'Synchronized mobile applications that work seamlessly with your existing web platform, headless e-commerce site, ERP, and payment gateways via secure REST/GraphQL APIs.',
    h2_2: 'UX-First Design Philosophy',
    p3: 'The phone screen is a narrow, unforgiving space. A poorly placed button can cost you thousands of dollars in drop-offs. Our user experience (UX) experts analyze extensive data—from "Thumb Zones" to eye-tracking heatmaps—to design interfaces that users can effortlessly navigate with one hand. Your application is not just coded; it is psychologically structured to create retention and habit loops.',
    h2_3: 'Security & App Store Compliance',
    p4: 'A great app must be a secure app. We implement end-to-end encryption, biometric authentication (FaceID/TouchID), and strict secure-storage protocols for sensitive user data. Furthermore, we handle the notoriously complex App Store (Apple) and Google Play review processes from start to finish, ensuring your app complies with all global privacy regulations (GDPR/CCPA) and gets published without friction.',
    h2_4: 'Our Mobile Technology Stack',
    tech_1_title: 'Core Frameworks',
    tech_1_desc: 'React Native, Expo, and TypeScript for cross-platform efficiency combined with native-level performance and type safety.',
    tech_2_title: 'State & Data Management',
    tech_2_desc: 'Zustand, Redux Toolkit, and TanStack Query for seamless offline-mode capabilities and instant data synchronization.',
    tech_3_title: 'Backend & Infrastructure',
    tech_3_desc: 'Firebase, Supabase, and AWS Amplify for real-time push notifications, auth, and scalable cloud functions.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'Do you develop natively or cross-platform?',
    faq_1_a: 'We use modern cross-platform technologies like React Native and Expo, which provide native-like 60FPS performance with a single codebase for both iOS and Android, significantly reducing development time and maintenance costs.',
    faq_2_q: 'How long does enterprise mobile app development take?',
    faq_2_a: 'A Minimum Viable Product (MVP) usually takes 3 to 4 months. Comprehensive enterprise apps with complex backend integrations can take 6 months or more depending on scope.',
    faq_3_q: 'Do you handle the App Store and Google Play publishing process?',
    faq_3_a: 'Yes, we manage the entire deployment lifecycle, including app store optimization (ASO), compliance checks, review submissions, and managing certificates.',
    faq_4_q: 'Can the app work offline without an internet connection?',
    faq_4_a: 'Absolutely. We design apps with "Offline-First" architectures using local SQLite databases and async storage, syncing data securely to the cloud once the connection is restored.'
  },
  tr: {
    meta: {
      title: 'Kurumsal Mobil Uygulama Geliştirme (iOS & Android)',
      description: 'iOS ve Android için yüksek performanslı, native hissi veren ve anında ölçeklenebilen kurumsal mobil uygulamalar geliştiriyoruz.',
      keywords: 'mobil uygulama geliştirme, ios uygulama, android uygulama, react native, kurumsal mobil yazılım, st petersburg uygulama geliştirici, mobil ux, cross-platform uygulama',
    },
    back: 'Hizmetlere Dön',
    tag: 'Bağlantı & Deneyim',
    title: 'Mobil Uygulamalar',
    p1: 'Müşterilerinizin cebindeki ekrana ulaşmak, marka bağlılığının (brand loyalty) ulaşılabilecek en üst noktasıdır. Hantal çalışan, donan, pili sömüren ve kullanıcıyı yoran sıradan uygulamaların aksine; ekranda kayarken su gibi akan, modern, kararlı ve hiper-optimize edilmiş mobil ekosistemler inşa ediyoruz.',
    h2_1: 'Kusursuz Mimari ve Native (Yerel) Performans',
    p2: 'Native (Swift/Kotlin) kalitesinde hissettiren modern React Native mimarileriyle, tek bir kod tabanı üzerinden hem iOS hem de Android için milyonlarca anlık kullanıcıyı çökmeden ağırlayabilecek altyapılar kuruyoruz. Biz sadece arayüz çizmiyoruz, çekirdeği mühendislik harikası haline getiriyoruz. Bir mobil uygulamanın cihazda tutulmasını sağlayan en kritik metrikler olan; cihaz hafızası optimizasyonu (RAM yönetimi) ve düşük pil tüketimi konularında her zaman endüstri standartlarının zirvesini hedefliyoruz.',
    f1_title: '60 FPS Akıcı Deneyim',
    f1_desc: 'Ekran geçişleri, karmaşık kaydırma hareketleri (gestures) ve mikro-animasyonlar donanım hızlandırmasıyla (hardware-accelerated) saniyede 60 kare hızında, sıfır gecikmeyle çalışır.',
    f2_title: 'Omnichannel ve API Entegrasyonu',
    f2_desc: 'Mevcut web platformunuz, Headless e-ticaret siteniz, ERP yazılımlarınız ve ödeme geçitlerinizle güvenli REST/GraphQL API\'leri üzerinden %100 senkronize çalışan mobil uygulamalar.',
    h2_2: 'UX (Kullanıcı Deneyimi) Öncelikli Tasarım Felsefesi',
    p3: 'Telefon ekranı, hata affetmeyen çok dar bir alandır. Yanlış konumlandırılmış bir buton, size binlerce dolarlık sepet terkine mal olabilir. Kullanıcı deneyimi (UX) uzmanlarımız; başparmak erişim alanlarından (Thumb Zones) ısı haritalarına (heatmaps) kadar her türlü veriyi analiz ederek, kullanıcıların tek elle bile zahmetsizce kullanabileceği arayüzler tasarlar. Uygulamanız sadece kodlanmaz; psikolojik olarak kullanıcıda alışkanlık (habit loops) yaratacak şekilde kurgulanır.',
    h2_3: 'Güvenlik ve App Store Uyumluluğu',
    p4: 'Mükemmel bir uygulama aynı zamanda güvenli olmalıdır. Hassas kullanıcı verileri için uçtan uca şifreleme, biyometrik doğrulama (FaceID/TouchID) ve katı güvenli depolama protokolleri uyguluyoruz. Ayrıca, oldukça zorlu olan Apple App Store ve Google Play inceleme (review) süreçlerini baştan sona biz yönetiyor, uygulamanızın global gizlilik yasalarına (KVKK/GDPR) uyumlu olmasını ve sorunsuz bir şekilde yayınlanmasını sağlıyoruz.',
    h2_4: 'Mobil Teknoloji Yığınımız (Tech Stack)',
    tech_1_title: 'Temel Framework\'ler',
    tech_1_desc: 'Native seviyesinde performans, tip güvenliği ve hızlı geliştirme süreci için React Native, Expo ve TypeScript.',
    tech_2_title: 'Durum (State) ve Veri Yönetimi',
    tech_2_desc: 'Kusursuz çevrimdışı (offline) mod yetenekleri ve anında veri senkronizasyonu için Zustand, Redux Toolkit ve TanStack Query.',
    tech_3_title: 'Arka Uç (Backend) ve Altyapı',
    tech_3_desc: 'Gerçek zamanlı anlık bildirimler (Push Notifications), güvenli kimlik doğrulama ve ölçeklenebilir bulut fonksiyonları için Firebase, Supabase ve AWS Amplify.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'Native (Yerel) mi yoksa çapraz platform (Cross-platform) mu geliştiriyorsunuz?',
    faq_1_a: 'Hem iOS hem de Android için tek bir kod tabanıyla yerel uygulama performansına (60FPS) sahip React Native ve Expo gibi modern teknolojileri kullanıyoruz. Bu sayede geliştirme süresini ve bakım maliyetlerini önemli ölçüde düşürüyoruz.',
    faq_2_q: 'Kurumsal bir mobil uygulama geliştirme süreci ne kadar sürer?',
    faq_2_a: 'Minimum Uygulanabilir Ürün (MVP) genellikle 3 ila 4 ay sürer. Karmaşık backend entegrasyonlarına sahip kapsamlı kurumsal uygulamalar, projenin kapsamına bağlı olarak 6 ay veya daha fazla sürebilir.',
    faq_3_q: 'App Store ve Google Play yayınlama sürecini siz mi yönetiyorsunuz?',
    faq_3_a: 'Evet, uygulama mağazası optimizasyonu (ASO), uyumluluk kontrolleri, inceleme gönderimleri ve güvenlik sertifikalarının yönetimi dahil olmak üzere tüm yayınlama döngüsünü (deployment) biz yönetiyoruz.',
    faq_4_q: 'Uygulama internet bağlantısı olmadan da (Offline) çalışabilir mi?',
    faq_4_a: 'Kesinlikle. Yerel (local) SQLite veritabanları ve asenkron depolama kullanarak "Önce Çevrimdışı" (Offline-First) mimarisiyle uygulamalar tasarlıyor; bağlantı geri geldiğinde verilerin bulutla güvenli bir şekilde senkronize olmasını sağlıyoruz.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  const path = lang === 'tr' ? '/tr/hizmetler/mobil-uygulama' : '/en/services/mobile-application';
  
  return {
    ...data.meta,
    alternates: constructAlternates('services/mobile-application', 'hizmetler/mobil-uygulama', lang)
  };
}

export default async function MobilUygulama({ params }: { params: Promise<{ lang: string }> }) {
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
      "name": "Mobile Development",
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
          <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-indigo-500/20 rounded-full blur-[120px]"></div>
          <div className="max-w-4xl mx-auto w-full px-6 lg:px-12 pb-16 relative z-10">
            <Link prefetch={false} href={`/${lang}/#services`} className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
              <ArrowLeft className="w-4 h-4" /> {dict.back}
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                <Smartphone className="w-6 h-6 text-indigo-300" />
              </div>
              <span className="text-indigo-300 font-semibold tracking-widest uppercase text-xs">{dict.tag}</span>
            </div>
            <h1 className="font-sans text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              {dict.title}
            </h1>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-6 lg:px-12 mt-16 font-sans">
          <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
            <p className="text-2xl font-light text-[#0A192F] leading-relaxed mb-10 border-l-4 border-indigo-600 pl-6">
              {dict.p1}
            </p>

            <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">{dict.h2_1}</h2>
            <p>{dict.p2}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <Zap className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-[#0A192F] mb-3">{dict.f1_title}</h3>
                <p className="text-slate-500">{dict.f1_desc}</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <Layers className="w-8 h-8 text-indigo-600 mb-4" />
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
                <h3 className="text-lg font-bold text-indigo-400 mb-2">{dict.tech_1_title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{dict.tech_1_desc}</p>
              </div>
              <div className="bg-[#0A192F] p-6 rounded-2xl border border-[#0A192F]/20 text-white shadow-lg hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg font-bold text-indigo-400 mb-2">{dict.tech_2_title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{dict.tech_2_desc}</p>
              </div>
              <div className="bg-[#0A192F] p-6 rounded-2xl border border-[#0A192F]/20 text-white shadow-lg hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg font-bold text-indigo-400 mb-2">{dict.tech_3_title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{dict.tech_3_desc}</p>
              </div>
            </div>

            <hr className="my-16 border-slate-200" />

            <h2 className="text-3xl font-bold text-[#0A192F] mb-8 tracking-tight flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-indigo-600" />
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
