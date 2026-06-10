import { Metadata } from 'next';
import { ArrowLeft, Bot, Sparkles, Database, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const content = {
  en: {
    meta: {
      title: 'AI and Automation | Allmysell LLC',
      description: 'Automate your data processing processes with custom-trained AI assistants (RAG) and machine learning algorithms for your business.',
      keywords: 'ai integration, machine learning, enterprise ai, rag systems, data analytics, miami tech agency, automation solutions',
    },
    back: 'Back to Services',
    tag: 'Innovation & Future',
    title: 'AI & Automation',
    p1: 'Artificial Intelligence (AI) is no longer a sci-fi movie scenario; it is the most ruthless rule of competition. Meet smart systems that reduce data analysis and customer service operations, which take days with human power, to a fraction of a second.',
    h2_1: 'Flawless Data Integration (RAG)',
    p2: 'We train a custom intelligence for your company, not a general bot like ChatGPT, but one that knows your internal documents, past sales data, and company manifesto verbatim. Thanks to Retrieval-Augmented Generation (RAG) technology; assistants aware of your internal policies respond to your employees or customers instantly with zero error tolerance.',
    f1_title: 'Smart Data Processing',
    f1_desc: 'Analyzes thousands of rows of Excel or CRM data in seconds and offers strategic insights that will directly bring revenue to your company.',
    f2_title: 'Autonomous Customer Relations',
    f2_desc: 'Unlike classic robots that say "Press this button"; we build smart agents that can read intentions, analyze emotions, and close sales like a real human.',
    h2_2: 'Cost and Time Optimization',
    p3: 'An enterprise-scale AI integration is not about reducing the number of personnel; it allows you to save your personnel from monotonous tasks and focus them on creative and strategic areas. Every automated operational process directly accelerates your company\'s profit margin and growth rate.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'Is our company data safe when training custom AI models?',
    faq_1_a: 'Absolutely. We build private RAG (Retrieval-Augmented Generation) systems within secure enterprise cloud environments where your data is never used to train public models.',
    faq_2_q: 'Can AI assistants handle customer support fully autonomously?',
    faq_2_a: 'Yes, our AI agents can resolve up to 80% of customer inquiries autonomously, seamlessly transferring complex edge cases to human representatives.'
  },
  tr: {
    meta: {
      title: 'Yapay Zeka ve Otomasyon | Allmysell LLC',
      description: 'İşletmenize özel eğitilmiş yapay zeka asistanları (RAG) ve makine öğrenimi algoritmalarıyla veri işleme süreçlerinizi otomatikleştirin.',
      keywords: 'yapay zeka entegrasyonu, makine öğrenimi, kurumsal yapay zeka, rag sistemleri, veri analitiği, miami teknoloji ajansı, otomasyon çözümleri',
    },
    back: 'Hizmetlere Dön',
    tag: 'Yenilik & Gelecek',
    title: 'Yapay Zeka & Otomasyon',
    p1: 'Yapay zeka (AI) artık bilim kurgu filmlerinin senaryosu değil, rekabetin en acımasız kuralı. İnsan gücüyle günlerce süren veri analizi ve müşteri hizmetleri operasyonlarını, saniyenin onda biri süresine indiren akıllı sistemlerle tanışın.',
    h2_1: 'Kusursuz Veri Entegrasyonu (RAG)',
    p2: 'Şirketinize ChatGPT gibi genel bir bot değil, kurum içi belgelerinizi, geçmiş satış verilerinizi ve şirket manifestonuzu harfiyen bilen özel bir zeka eğitiyoruz. Retrieval-Augmented Generation (RAG) teknolojisi sayesinde; şirket içi politikalarınızdan haberdar olan asistanlar, çalışanlarınıza veya müşterilerinize sıfır hata toleransıyla anında yanıt verir.',
    f1_title: 'Akıllı Veri İşleme',
    f1_desc: 'Binlerce satırlık Excel veya CRM verisini saniyeler içinde analiz edip, şirketinize doğrudan gelir kazandıracak stratejik içgörüler sunar.',
    f2_title: 'Otonom Müşteri İlişkileri',
    f2_desc: 'Klasik "Şu tuşa basın" diyen robotların aksine; niyet okuyabilen, duygu analizi yapabilen, gerçek bir insan gibi satış kapatan akıllı agent\'lar kuruyoruz.',
    h2_2: 'Maliyet ve Zaman Optimizasyonu',
    p3: 'Kurumsal ölçekte bir yapay zeka entegrasyonu, personel sayısını azaltmak değil; personelinizi monoton işlerden kurtarıp yaratıcı ve stratejik alanlara odaklamanızı sağlar. Otomatize edilen her bir operasyonel süreç, doğrudan şirketinizin kar marjına ve büyüme hızına ivme kazandırır.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'Özel yapay zeka modelleri eğitilirken şirket verilerimiz güvende mi?',
    faq_1_a: 'Kesinlikle. Verilerinizin hiçbir zaman herkese açık modelleri eğitmek için kullanılmadığı, son derece güvenli kurumsal bulut ortamlarında özel RAG (Retrieval-Augmented Generation) sistemleri kuruyoruz.',
    faq_2_q: 'Yapay zeka asistanları müşteri desteğini tamamen otonom bir şekilde yönetebilir mi?',
    faq_2_a: 'Evet, yapay zeka asistanlarımız müşteri taleplerinin %80\'e kadarını kendi başına çözebilir ve karmaşık vakaları insan temsilcilere sorunsuz bir şekilde aktarabilir.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  return data.meta;
}

export default async function YapayZeka({ params }: { params: Promise<{ lang: string }> }) {
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
      "name": "AI Integration",
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
                <Bot className="w-6 h-6 text-blue-300" />
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
                <Database className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-[#0A192F] mb-3">{dict.f1_title}</h3>
                <p className="text-slate-500">{dict.f1_desc}</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <Sparkles className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-[#0A192F] mb-3">{dict.f2_title}</h3>
                <p className="text-slate-500">{dict.f2_desc}</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">{dict.h2_2}</h2>
            <p>{dict.p3}</p>
            
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
