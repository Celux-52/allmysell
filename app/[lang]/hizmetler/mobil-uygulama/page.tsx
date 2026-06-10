import { Metadata } from 'next';
import { ArrowLeft, Smartphone, Zap, Layers, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const content = {
  en: {
    meta: {
      title: 'Mobile Application Development | Allmysell LLC',
      description: 'We develop enterprise mobile applications for iOS and Android that are high-performance, native-feeling, and instantly scalable.',
      keywords: 'mobile app development, ios app, android app, react native, enterprise mobile software, miami app developer, mobile ux',
    },
    back: 'Back to Services',
    tag: 'Connection & Experience',
    title: 'Mobile Applications',
    p1: 'Reaching the screen in your customers\' pockets is the ultimate point of brand loyalty. Unlike clunky, freezing apps that tire the user; we build modern and stable mobile ecosystems that flow like water as you swipe across the screen.',
    h2_1: 'Flawless Architecture and Performance',
    p2: 'With modern React Native architectures that feel native (Swift/Kotlin) quality, we build infrastructures that can instantly host millions of users for both iOS and Android over a single codebase. We always target the highest standards in device memory optimization and low battery consumption metrics, which are the most critical aspects of a mobile application.',
    f1_title: '60 FPS Smooth Experience',
    f1_desc: 'Screen transitions and animations are optimized to run at 60 frames per second, smoothly and with zero latency.',
    f2_title: 'Omnichannel Integration',
    f2_desc: 'Synchronized mobile applications that work 100% harmoniously with your existing web platform, e-commerce site, and background systems.',
    h2_2: 'UX-First Design Philosophy',
    p3: 'The phone screen is a narrow, unforgiving space. Our user experience (UX) experts analyze all kinds of data, from Thumb Zones to eye-tracking metrics, to design interfaces that users can easily use even with one hand. Your application is not just coded; it is structured to create habits.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'Do you develop natively or cross-platform?',
    faq_1_a: 'We use modern cross-platform technologies like React Native, which provide native-like performance with a single codebase for both iOS and Android.',
    faq_2_q: 'How long does mobile app development take?',
    faq_2_a: 'A minimum viable product (MVP) usually takes 3 to 4 months, while comprehensive enterprise apps can take 6 months or more depending on complexity.'
  },
  tr: {
    meta: {
      title: 'Mobil Uygulama Geliştirme | Allmysell LLC',
      description: 'iOS ve Android için yüksek performanslı, native hissi veren ve anında ölçeklenebilen kurumsal mobil uygulamalar geliştiriyoruz.',
      keywords: 'mobil uygulama geliştirme, ios uygulama, android uygulama, react native, kurumsal mobil yazılım, miami uygulama geliştirici, mobil ux',
    },
    back: 'Hizmetlere Dön',
    tag: 'Bağlantı & Deneyim',
    title: 'Mobil Uygulamalar',
    p1: 'Müşterilerinizin cebindeki ekrana ulaşmak, marka bağlılığının en üst noktasıdır. Hantal çalışan, donan, kullanıcıyı yoran uygulamaların aksine; ekranda kayarken su gibi akan, modern ve kararlı mobil ekosistemler inşa ediyoruz.',
    h2_1: 'Kusursuz Mimari ve Performans',
    p2: 'Native (Swift/Kotlin) kalitesinde hissettiren, modern React Native mimarileriyle tek bir kod tabanı üzerinden hem iOS hem de Android için milyonlarca kullanıcıyı anında ağırlayabilecek altyapılar kuruyoruz. Bir mobil uygulamanın en kritik yanı olan cihaz hafızası optimizasyonu ve düşük pil tüketimi metriklerinde her zaman en üst standartları hedefliyoruz.',
    f1_title: '60 FPS Akıcı Deneyim',
    f1_desc: 'Ekran geçişleri ve animasyonlar saniyede 60 kare hızında, pürüzsüz ve sıfır gecikme ile çalışacak şekilde optimize edilir.',
    f2_title: 'Omnichannel Entegrasyonu',
    f2_desc: 'Mevcut web platformunuz, e-ticaret siteniz ve arka plan sistemlerinizle %100 uyumlu çalışan, senkronize mobil uygulamalar.',
    h2_2: 'UX Öncelikli Tasarım Felsefesi',
    p3: 'Telefon ekranı, hata affetmeyen dar bir alandır. Kullanıcı deneyimi (UX) uzmanlarımız; başparmak erişim alanlarından (Thumb Zone) göz takibi metriklerine kadar her türlü veriyi analiz ederek, kullanıcıların tek elle bile rahatça kullanabileceği arayüzler tasarlar. Uygulamanız sadece kodlanmaz; alışkanlık yapacak şekilde kurgulanır.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'Native (Yerel) mi yoksa çapraz platform (Cross-platform) mu geliştiriyorsunuz?',
    faq_1_a: 'Hem iOS hem de Android için tek bir kod tabanıyla yerel uygulama performansına sahip React Native gibi modern çapraz platform teknolojilerini kullanıyoruz.',
    faq_2_q: 'Mobil uygulama geliştirme süreci ne kadar sürer?',
    faq_2_a: 'Minimum Uygulanabilir Ürün (MVP) genellikle 3 ila 4 ay sürerken, kapsamlı kurumsal uygulamalar karmaşıklığa bağlı olarak 6 ay veya daha fazla sürebilir.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  return data.meta;
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
            <Link href={`/${lang}/#services`} className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
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
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
