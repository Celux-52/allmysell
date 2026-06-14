import { Metadata } from 'next';
import { ArrowLeft, Layers, Compass, Target, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'Digital Transformation & Strategic Technology Consulting',
      description: 'We restructure your project\'s business model, market share, and sustainable growth steps from scratch. Data-driven strategic technology and GTM consulting.',
      keywords: 'technology consulting, digital transformation, strategic planning, business model structure, st petersburg consulting firm, sustainable growth, GTM strategy, saas consulting',
    },
    back: 'Back to Services',
    tag: 'Management & Growth',
    title: 'Strategic Consulting',
    p1: 'You cannot build massive, disruptive brands just by writing code. For a technological product to succeed in today\'s hyper-competitive ecosystem, it must be rooted in the right business model, precise market needs, and an aggressively sustainable growth strategy. We build exactly this bridge between code and commerce.',
    h2_1: 'Architecting Before Coding',
    p2: 'The single biggest investment mistake in the digital world is jumping straight into software development without extensive market research, competitive analysis, and a solid Go-To-Market (GTM) setup. From the moment we sit at the table as Allmysell LLC, we put aside coding jargon and act as your fractional CTO and business partners. Who is the exact target audience? Where are the dominant competitors failing? How should the recurring revenue model be structured to minimize churn? We do not write a single line of code without crystal clear, data-backed answers to these fundamental questions.',
    f1_title: 'Digital Transformation Roadmap',
    f1_desc: 'We audit your existing monolithic systems, identify operational bottlenecks, and determine the exact modern Tech Stack that will adapt your company to the digital age without breaking the bank.',
    f2_title: 'Market Entry (GTM) and Growth',
    f2_desc: 'We architect your pricing strategies, set up advanced data analytics pipelines, and implement marketing automations for the seamless market integration of the products we develop.',
    h2_2: 'Data-Driven Decision Making (DDDM)',
    p3: 'Instincts and gut feelings are in the nature of trade, but in the modern digital economy, crucial business decisions must be dictated by raw data. We structure your company\'s fragmented data, run it through business intelligence (BI) models, and turn complex spreadsheets into clear, actionable insights. We redraw your company\'s roadmap over precise sales velocity trends, Customer Acquisition Cost (CAC) analyses, and early churn indicators.',
    h2_3: 'Agile Team and Culture Building',
    p4: 'The long-term sustainability of a newly established digital infrastructure is only possible with the right internal team equipped to run it. We don\'t just deploy your technological infrastructure and leave; we provide active, hands-on mentoring to your engineering and sales teams on operating these systems, adopting true Agile/Scrum management cultures, and accelerating internal innovation cycles.',
    h2_4: 'Our Consulting Methodology',
    tech_1_title: 'Market & Competitor Analysis',
    tech_1_desc: 'Deep-dive analysis of your industry landscape, identifying gaps in competitors\' offerings and positioning your product for maximum leverage.',
    tech_2_title: 'Financial & Pricing Strategy',
    tech_2_desc: 'Structuring Freemium, Tiered, or Usage-based SaaS pricing models optimized for maximum Annual Recurring Revenue (ARR).',
    tech_3_title: 'Tech Stack Auditing',
    tech_3_desc: 'Evaluating your current infrastructure for scalability, security compliance (GDPR/HIPAA), and cost-efficiency.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'Do you provide long-term consulting or just one-off strategy?',
    faq_1_a: 'We provide both, but we highly recommend long-term strategic partnerships (Retainer or Fractional CTO basis) to continuously monitor metrics and pivot the business model as the market evolves.',
    faq_2_q: 'How do you measure digital transformation success?',
    faq_2_a: 'We define clear, trackable KPIs such as Customer Acquisition Cost (CAC), Lifetime Value (LTV), Monthly Recurring Revenue (MRR) growth, and internal process efficiency metrics before starting any project.',
    faq_3_q: 'Can you consult an existing in-house software team?',
    faq_3_a: 'Absolutely. We frequently act as external technical auditors and Agile mentors to help existing in-house engineering teams overcome technical debt and increase delivery speed.',
    faq_4_q: 'Do you help with investor pitch decks or startup funding strategies?',
    faq_4_a: 'Yes. We help startups translate their technical architectures into business value for investors, ensuring your technical roadmap aligns perfectly with funding milestones.'
  },
  tr: {
    meta: {
      title: 'Dijital Dönüşüm ve Stratejik Teknoloji Danışmanlığı',
      description: 'Projenizin iş modelini, pazar payını ve büyüme adımlarını baştan kurguluyoruz. Veri odaklı stratejik teknoloji ve GTM (Pazara Çıkış) danışmanlığı.',
      keywords: 'teknoloji danışmanlığı, dijital dönüşüm, stratejik planlama, iş modeli kurgusu, st petersburg danışmanlık firması, sürdürülebilir büyüme, saas danışmanlığı, cto hizmeti',
    },
    back: 'Hizmetlere Dön',
    tag: 'Yönetim & Büyüme',
    title: 'Stratejik Danışmanlık',
    p1: 'Yalnızca kod yazarak veya şık tasarımlar yaparak devasa markalar yaratamazsınız. Bir teknolojik ürünün bugünün acımasız rekabet ortamında hayatta kalabilmesi için; doğru iş modeline, pazarın gerçek ihtiyaçlarına ve agresif ama sürdürülebilir bir büyüme stratejisine (Growth Hacking) dayanması gerekir. Biz, teknoloji ile ticaret arasındaki bu hayati köprüyü kuruyoruz.',
    h2_1: 'Kodlamadan Önce Mimarilendirme',
    p2: 'Dijital dünyada yapılan en büyük yatırım hatası, derinlemesine pazar araştırması ve iş modeli (Business Model Canvas) kurgulanmadan doğrudan yazılım geliştirmeye başlanmasıdır. Allmysell LLC olarak masaya oturduğumuz ilk andan itibaren, kodlama jargonlarını bir kenara bırakıp sizinle birer "Fractional CTO" ve iş ortağı gibi pazar stratejileri geliştiriyoruz. Ürünün hedef kitlesi tam olarak kim? Hakim rakipler nerede hata yapıyor? Gelir modeli (Abonelik, komisyon vb.) müşteri kaybını (churn) en aza indirecek şekilde nasıl yapılandırılmalı? Bu soruların veriye dayalı net yanıtları olmadan tek bir satır kod yazmıyoruz.',
    f1_title: 'Dijital Dönüşüm Yol Haritası',
    f1_desc: 'Mevcut hantal sistemlerinizi analiz edip operasyonel darboğazları buluyor ve şirketinizi dijital çağa adapte edecek en uygun maliyetli, modern teknoloji yığınını (Tech Stack) belirliyoruz.',
    f2_title: 'Pazara Giriş (GTM) ve Büyüme',
    f2_desc: 'Geliştirdiğimiz ürünlerin kusursuz pazar entegrasyonu için fiyatlandırma stratejileri, veri analitiği hunileri (funnel) ve otomatik pazarlama altyapıları kuruyoruz.',
    h2_2: 'Veri Odaklı Karar Alma (DDDM)',
    p3: 'İçgüdüler ticaretin doğasında vardır, ancak modern dijital ekonomide kritik şirket kararlarını ham veriler almalıdır. Şirketinizin farklı departmanlara dağılmış verilerini yapılandırıyor, İş Zekası (BI) modelleriyle anlamlandırıyor ve karmaşık Excel tablolarını net, aksiyon alınabilir içgörülere çeviriyoruz. Satış eğilimleri, Müşteri Edinme Maliyeti (CAC) analizleri ve erken Churn (terk) sinyalleri üzerinden şirketin rotasını sürekli olarak optimize ediyoruz.',
    h2_3: 'Çevik (Agile) Ekip ve Kültür İnşası',
    p4: 'Yeni kurulan dijital bir altyapının uzun vadede sürdürülebilir olması, ancak o sistemi kullanacak doğru kurum içi ekiple mümkündür. Teknolojik altyapınızı kurup gitmiyor; mühendislik ve satış ekiplerinize bu sistemlerin eğitimi, gerçek Çevik (Agile/Scrum) yönetim kültürünün benimsetilmesi ve kurum içi inovasyon döngülerinin hızlandırılması konusunda aktif ve uygulamalı mentorluk sağlıyoruz.',
    h2_4: 'Danışmanlık Metodolojimiz',
    tech_1_title: 'Pazar ve Rakip Analizi',
    tech_1_desc: 'Sektörünüzün derinlemesine analizi yapılarak rakiplerinizin ürünlerindeki boşluklar tespit edilir ve ürününüz maksimum pazar avantajı için konumlandırılır.',
    tech_2_title: 'Finansal ve Fiyatlandırma Stratejisi',
    tech_2_desc: 'Yıllık Tekrarlayan Geliri (ARR) maksimize edecek Freemium, Kademeli veya Kullanım Bazlı (Usage-based) SaaS fiyatlandırma modellerinin kurgulanması.',
    tech_3_title: 'Teknoloji (Tech Stack) Denetimi',
    tech_3_desc: 'Mevcut yazılım altyapınızın ölçeklenebilirlik, güvenlik uyumluluğu (KVKK/GDPR) ve sunucu maliyet verimliliği açısından denetlenmesi.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'Uzun vadeli danışmanlık mı yoksa tek seferlik strateji mi sunuyorsunuz?',
    faq_1_a: 'Her ikisini de sunuyoruz, ancak pazar dinamikleri değiştikçe metrikleri sürekli izlemek ve iş modelini anında pivote edebilmek için uzun vadeli stratejik ortaklıkları (Retainer bazlı) şiddetle tavsiye ediyoruz.',
    faq_2_q: 'Dijital dönüşüm başarısını nasıl ölçüyorsunuz?',
    faq_2_a: 'Herhangi bir projeye başlamadan önce Müşteri Edinme Maliyeti (CAC), Müşteri Yaşam Boyu Değeri (LTV), Aylık Tekrarlayan Gelir (MRR) büyümesi ve iç süreç verimliliği gibi net, ölçülebilir KPI\'lar belirliyoruz.',
    faq_3_q: 'Mevcut kurum içi (in-house) yazılım ekibimize danışmanlık verebilir misiniz?',
    faq_3_a: 'Kesinlikle. Genellikle mevcut in-house mühendislik ekiplerinin "teknik borç" (technical debt) sarmalından kurtulmasına ve ürün teslim hızını artırmasına yardımcı olmak için dış denetçi ve Çevik (Agile) mentor olarak görev yapıyoruz.',
    faq_4_q: 'Yatırımcı sunumları (Pitch Deck) veya startup fonlama stratejilerinde yardımcı oluyor musunuz?',
    faq_4_a: 'Evet. Startupların teknik mimarilerini yatırımcılar için "ticari değere" dönüştürmelerine yardımcı oluyor, teknik yol haritanızın yatırım (funding) kilometre taşlarıyla mükemmel bir şekilde uyumlu olmasını sağlıyoruz.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  const path = lang === 'tr' ? '/tr/hizmetler/stratejik-danismanlik' : '/en/services/strategic-consulting';
  
  return {
    ...data.meta,
    alternates: constructAlternates('services/strategic-consulting', 'hizmetler/stratejik-danismanlik', lang)
  };
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
