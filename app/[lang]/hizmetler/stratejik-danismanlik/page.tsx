import { Metadata } from 'next';
import { ArrowLeft, Layers, Compass, Target, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const content = {
  en: {
    meta: {
      title: 'Strategic Consulting | Allmysell LLC',
      description: 'We restructure your project\'s business model, market share, and sustainable growth steps from scratch. Data-driven strategic technology consulting.',
      keywords: 'technology consulting, digital transformation, strategic planning, business model structure, miami consulting firm, sustainable growth',
    },
    back: 'Back to Services',
    tag: 'Management & Growth',
    title: 'Strategic Consulting',
    p1: 'You cannot build massive brands just by writing code. For a technology to be successful, it must be based on the right business model, market needs, and a sustainable growth strategy. We build exactly this bridge.',
    h2_1: 'Planning Before Coding',
    p2: 'The biggest investment mistake in the digital world is starting software directly without market research and business model setup. From the moment we sit at the table as Allmysell LLC, we put aside coding jargon and develop market strategies with you like business partners. Who is the target audience of the product? Where are the competitors making mistakes? How should the revenue model be structured? We do not write a single line of code without clear answers to these questions.',
    f1_title: 'Digital Transformation Roadmap',
    f1_desc: 'We analyze your existing systems and determine the right technology stack that will adapt your company to the digital age.',
    f2_title: 'Market Entry and Growth',
    f2_desc: 'We set up advertising strategies, data analytics, and marketing automations for the market integration of the products we develop.',
    h2_2: 'Data-Driven Decision Making',
    p3: 'Instincts are in the nature of trade, but in today\'s economy, decisions must be made by data. We structure your company\'s existing data, make sense of it, and turn complex tables into clear insights. We redraw the company\'s route over sales trends, churn rates, or cost analysis.',
    h2_3: 'Team and Culture Building',
    p4: 'The sustainability of a newly established system is only possible with the right team to use that system. We don\'t just set up your technological infrastructure; we also provide active mentoring to your teams on training these systems, adopting agile management culture, and accelerating internal innovation processes.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'Do you provide long-term consulting or just one-off strategy?',
    faq_1_a: 'We provide both, but we highly recommend long-term strategic partnerships to continuously monitor metrics and adjust the business model as the market evolves.',
    faq_2_q: 'How do you measure digital transformation success?',
    faq_2_a: 'We define clear KPIs such as Customer Acquisition Cost (CAC), Lifetime Value (LTV), and internal process efficiency metrics before starting any project.'
  },
  tr: {
    meta: {
      title: 'Stratejik Danışmanlık | Allmysell LLC',
      description: 'Projenizin iş modelini, pazar payını ve sürdürülebilir büyüme adımlarını baştan kurguluyoruz. Veri odaklı stratejik teknoloji danışmanlığı.',
      keywords: 'teknoloji danışmanlığı, dijital dönüşüm, stratejik planlama, iş modeli kurgusu, miami danışmanlık firması, sürdürülebilir büyüme',
    },
    back: 'Hizmetlere Dön',
    tag: 'Yönetim & Büyüme',
    title: 'Stratejik Danışmanlık',
    p1: 'Yalnızca kod yazarak devasa markalar yaratamazsınız. Bir teknolojinin başarılı olabilmesi için doğru iş modeline, pazarın ihtiyaçlarına ve sürdürülebilir bir büyüme stratejisine dayanması gerekir. Biz, tam olarak bu köprüyü kuruyoruz.',
    h2_1: 'Kodlamadan Önce Planlama',
    p2: 'Dijital dünyada yapılan en büyük yatırım hatası, pazar araştırması ve iş modeli kurgulanmadan doğrudan yazılıma başlanmasıdır. Allmysell LLC olarak masaya oturduğumuz ilk andan itibaren, kodlama jargonlarını bir kenara bırakıp sizinle birer iş ortağı gibi pazar stratejileri geliştiriyoruz. Ürünün hedef kitlesi kim? Rakipler nerede hata yapıyor? Gelir modeli nasıl oluşturulmalı? Bu soruların net yanıtları olmadan tek bir satır kod yazmıyoruz.',
    f1_title: 'Dijital Dönüşüm Yol Haritası',
    f1_desc: 'Mevcut sistemlerinizi analiz edip, şirketinizi dijital çağa adapte edecek en doğru teknoloji yığınını (Tech Stack) belirliyoruz.',
    f2_title: 'Pazara Giriş ve Büyüme',
    f2_desc: 'Geliştirdiğimiz ürünlerin pazar entegrasyonu için reklam stratejileri, veri analitiği ve pazarlama otomasyonları kuruyoruz.',
    h2_2: 'Veri Odaklı Karar Alma',
    p3: 'İçgüdüler ticaretin doğasında vardır, ancak günümüz ekonomisinde kararları veriler vermelidir. Şirketinizin mevcut verilerini yapılandırıyor, anlamlandırıyor ve karmaşık tabloları net içgörülere çeviriyoruz. Satış eğilimleri, müşteri kayıp oranları (Churn Rate) veya maliyet analizleri üzerinden şirketin rotasını yeniden çiziyoruz.',
    h2_3: 'Ekip ve Kültür İnşası',
    p4: 'Yeni kurulan bir sistemin sürdürülebilir olması, ancak o sistemi kullanacak doğru ekiple mümkündür. Teknolojik altyapınızı kurmakla kalmıyor, ekiplerinize bu sistemlerin eğitimi, çevik (Agile) yönetim kültürünün benimsetilmesi ve kurum içi inovasyon süreçlerinin hızlandırılması konusunda aktif mentorluk sağlıyoruz.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'Uzun vadeli danışmanlık mı yoksa tek seferlik strateji mi sunuyorsunuz?',
    faq_1_a: 'Her ikisini de sunuyoruz, ancak pazar geliştikçe metrikleri sürekli izlemek ve iş modelini ayarlamak için uzun vadeli stratejik ortaklıkları şiddetle tavsiye ediyoruz.',
    faq_2_q: 'Dijital dönüşüm başarısını nasıl ölçüyorsunuz?',
    faq_2_a: 'Herhangi bir projeye başlamadan önce Müşteri Edinme Maliyeti (CAC), Müşteri Yaşam Boyu Değeri (LTV) ve iç süreç verimliliği gibi net KPI\'lar belirliyoruz.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  return data.meta;
}

export default async function StratejikDanismanlik({ params }: { params: Promise<{ lang: string }> }) {
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
      "name": "Strategic Consulting",
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
                <Layers className="w-6 h-6 text-blue-300" />
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
                <Compass className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-[#0A192F] mb-3">{dict.f1_title}</h3>
                <p className="text-slate-500">{dict.f1_desc}</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <Target className="w-8 h-8 text-blue-600 mb-4" />
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
