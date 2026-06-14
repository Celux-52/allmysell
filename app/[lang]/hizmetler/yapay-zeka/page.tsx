import { Metadata } from 'next';
import { ArrowLeft, Bot, Sparkles, Database, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'Enterprise AI & Automation Solutions',
      description: 'Automate your data processing processes with custom-trained AI assistants (RAG) and machine learning algorithms for your business.',
      keywords: 'ai integration, machine learning, enterprise ai, rag systems, data analytics, miami tech agency, automation solutions, llm integration, custom chatgpt',
    },
    back: 'Back to Services',
    tag: 'Innovation & Future',
    title: 'AI & Automation',
    p1: 'Artificial Intelligence (AI) is no longer a sci-fi movie scenario; it is the most ruthless rule of modern competition. Meet smart systems that reduce data analysis, operational workflows, and customer service operations, which previously took days with human power, to a fraction of a second. Brands that fail to adopt AI will inevitably lose against competitors operating at 100x speed.',
    h2_1: 'Flawless Data Integration (RAG)',
    p2: 'We train a custom intelligence for your company. Not a general-purpose bot like ChatGPT that hallucinates, but an enterprise-grade agent that knows your internal documents, past sales data, CRM histories, and company manifesto verbatim. Thanks to advanced Retrieval-Augmented Generation (RAG) technology, these assistants are fully aware of your internal policies and respond to your employees or customers instantly with absolute zero error tolerance.',
    f1_title: 'Smart Data Processing & BI',
    f1_desc: 'Analyzes millions of rows of unstructured data, Excel sheets, or CRM logs in seconds to offer predictive strategic insights that will directly generate revenue.',
    f2_title: 'Autonomous Customer Relations',
    f2_desc: 'Unlike classic, frustrating robots that force users to "Press this button"; we build smart agents that can read semantic intentions, analyze user emotions, and close sales like an elite human representative.',
    h2_2: 'Operational Cost & Time Optimization',
    p3: 'An enterprise-scale AI integration is not merely about reducing headcount. It is about saving your highly-paid personnel from monotonous, repetitive tasks and focusing their cognitive load on creative, strategic, and high-impact areas. Every automated operational process directly accelerates your company\'s profit margin, operational efficiency, and overall growth rate.',
    h2_3: 'Predictive Machine Learning (ML)',
    p4: 'We do not just look at the past; we predict the future. By integrating Machine Learning algorithms directly into your e-commerce or SaaS platform, we can accurately predict when a user is likely to churn, which product they will likely buy next (recommendation engines), and dynamically adjust your pricing in real-time based on supply and demand fluctuations.',
    h2_4: 'Our AI Technology Stack',
    tech_1_title: 'LLMs & Foundation Models',
    tech_1_desc: 'OpenAI (GPT-4), Anthropic (Claude 3), and open-source models like Llama 3 hosted securely on private servers.',
    tech_2_title: 'Vector Databases & RAG',
    tech_2_desc: 'Pinecone, Qdrant, and Milvus for ultra-fast semantic search and context retrieval over massive corporate datasets.',
    tech_3_title: 'Frameworks & Orchestration',
    tech_3_desc: 'LangChain, LlamaIndex, and custom Python microservices for complex agentic workflows and tool-calling capabilities.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'Is our company data safe when training custom AI models?',
    faq_1_a: 'Absolutely. We build private RAG systems within highly secure enterprise cloud environments (AWS/Azure). Your proprietary data is strictly isolated and never used to train public models like ChatGPT.',
    faq_2_q: 'Can AI assistants handle customer support fully autonomously?',
    faq_2_a: 'Yes, our AI agents can resolve up to 80% of Tier-1 and Tier-2 customer inquiries autonomously in multiple languages, seamlessly transferring highly complex edge cases to human representatives.',
    faq_3_q: 'How long does it take to deploy a custom AI agent?',
    faq_3_a: 'Depending on the amount of data we need to ingest and clean, a robust internal RAG agent or customer-facing chatbot can usually be deployed within 4 to 8 weeks.',
    faq_4_q: 'Do you offer ongoing maintenance for the AI models?',
    faq_4_a: 'Yes. AI models and vector databases require constant tuning and updates as your company data grows. We provide continuous maintenance, prompt engineering, and performance monitoring.'
  },
  tr: {
    meta: {
      title: 'Kurumsal Yapay Zeka ve Otomasyon Çözümleri',
      description: 'İşletmenize özel eğitilmiş yapay zeka asistanları (RAG) ve makine öğrenimi algoritmalarıyla veri işleme süreçlerinizi otomatikleştirin.',
      keywords: 'yapay zeka entegrasyonu, makine öğrenimi, kurumsal yapay zeka, rag sistemleri, veri analitiği, miami teknoloji ajansı, otomasyon çözümleri, özel chatgpt',
    },
    back: 'Hizmetlere Dön',
    tag: 'Yenilik & Gelecek',
    title: 'Yapay Zeka & Otomasyon',
    p1: 'Yapay zeka (AI) artık bilim kurgu filmlerinin ütopik bir senaryosu değil, modern rekabetin en acımasız kuralı. İnsan gücüyle günlerce süren veri analizlerini, karmaşık operasyonel iş akışlarını ve müşteri hizmetleri operasyonlarını saniyenin onda biri süresine indiren akıllı sistemlerle tanışın. Yapay zekayı süreçlerine entegre etmeyen markalar, 100 kat daha hızlı çalışan rakiplerine karşı kaybetmeye mahkumdur.',
    h2_1: 'Kusursuz Veri Entegrasyonu (RAG)',
    p2: 'Şirketinize ChatGPT gibi halüsinasyon gören (hallucinate) genel bir bot değil; kurum içi belgelerinizi, geçmiş satış verilerinizi, CRM geçmişinizi ve şirket manifestonuzu harfiyen bilen kurumsal seviyede özel bir zeka eğitiyoruz. Gelişmiş Retrieval-Augmented Generation (RAG) teknolojisi sayesinde; şirket içi politikalarınızdan tam anlamıyla haberdar olan bu asistanlar, çalışanlarınıza veya müşterilerinize sıfır hata toleransıyla anında yanıt verir.',
    f1_title: 'Akıllı Veri İşleme ve İş Zekası (BI)',
    f1_desc: 'Milyonlarca satırlık yapılandırılmamış veriyi, Excel tablolarını veya CRM loglarını saniyeler içinde analiz edip, şirketinize doğrudan gelir kazandıracak öngörüsel stratejik içgörüler sunar.',
    f2_title: 'Otonom Müşteri İlişkileri',
    f2_desc: 'Kullanıcıyı sinir eden klasik "Şu tuşa basın" diyen robotların aksine; anlamsal (semantic) niyet okuyabilen, duygu analizi yapabilen ve elit bir insan temsilci gibi satış kapatan akıllı agent\'lar kuruyoruz.',
    h2_2: 'Maliyet ve Zaman Optimizasyonu',
    p3: 'Kurumsal ölçekte bir yapay zeka entegrasyonu, yalnızca personel sayısını (headcount) azaltmakla ilgili değildir. Asıl amaç; yüksek maaşlı personelinizi monoton, tekrarlayan işlerden kurtarıp onların zihinsel kapasitelerini yaratıcı, stratejik ve yüksek etkili alanlara odaklamanızı sağlamaktır. Otomatize edilen her bir operasyonel süreç, doğrudan şirketinizin kar marjına, operasyonel verimliliğine ve büyüme hızına ivme kazandırır.',
    h2_3: 'Öngörücü Makine Öğrenimi (ML)',
    p4: 'Biz sadece geçmişe bakmıyoruz; geleceği tahmin ediyoruz. E-ticaret veya SaaS platformunuza entegre edeceğimiz Makine Öğrenimi (ML) algoritmaları sayesinde; hangi müşterinin aboneliği iptal edeceğini (churn prediction) önceden bilebilir, sıradaki satın alma ihtimali en yüksek ürünü önerebilir (recommendation engine) ve arz-talep dalgalanmalarına göre fiyatlarınızı saniyeler içinde dinamik olarak güncelleyebilirsiniz.',
    h2_4: 'Yapay Zeka Teknoloji Yığınımız (Tech Stack)',
    tech_1_title: 'LLM ve Temel Modeller',
    tech_1_desc: 'Özel sunucularda güvenle barındırılan OpenAI (GPT-4), Anthropic (Claude 3) ve Llama 3 gibi açık kaynaklı güçlü dil modelleri.',
    tech_2_title: 'Vektör Veritabanları ve RAG',
    tech_2_desc: 'Devasa kurumsal veriler üzerinde ışık hızında anlamsal (semantic) arama ve bağlam çıkarma işlemleri için Pinecone, Qdrant ve Milvus.',
    tech_3_title: 'Framework ve Orkestrasyon',
    tech_3_desc: 'Karmaşık "agent" (ajan) iş akışları ve harici araç (API) çağırma yetenekleri için LangChain, LlamaIndex ve özel Python mikro servisleri.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'Özel yapay zeka modelleri eğitilirken şirket verilerimiz güvende mi?',
    faq_1_a: 'Kesinlikle. Verilerinizin hiçbir zaman ChatGPT gibi herkese açık modelleri eğitmek için kullanılmadığı, son derece güvenli kurumsal bulut ortamlarında (AWS/Azure) size tamamen özel izole RAG sistemleri kuruyoruz.',
    faq_2_q: 'Yapay zeka asistanları müşteri desteğini tamamen otonom bir şekilde yönetebilir mi?',
    faq_2_a: 'Evet, yapay zeka asistanlarımız birden fazla dilde gelen Tier-1 ve Tier-2 müşteri taleplerinin %80\'e kadarını kendi başına çözebilir. Çözemediği yüksek karmaşıklıktaki "edge case" vakaları bağlamıyla birlikte insan temsilcilere sorunsuz bir şekilde aktarır.',
    faq_3_q: 'Özel bir yapay zeka asistanının devreye alınması ne kadar sürer?',
    faq_3_a: 'İşlememiz ve temizlememiz gereken veri miktarına bağlı olarak, sağlam bir kurum içi RAG asistanı veya müşteriye dönük bir chatbot genellikle 4 ila 8 hafta içinde yayına alınabilir.',
    faq_4_q: 'Yapay zeka modelleri için sürekli bakım ve güncelleme hizmeti sunuyor musunuz?',
    faq_4_a: 'Evet. Şirket verileriniz büyüdükçe yapay zeka modellerinin ve vektör veritabanlarının sürekli ayarlanması gerekir. Sürekli bakım, prompt mühendisliği optimizasyonu ve performans izleme (monitoring) sağlıyoruz.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  const path = lang === 'tr' ? '/tr/hizmetler/yapay-zeka' : '/en/services/artificial-intelligence';
  
  return {
    ...data.meta,
    alternates: constructAlternates('services/artificial-intelligence', 'hizmetler/yapay-zeka', lang)
  };
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
