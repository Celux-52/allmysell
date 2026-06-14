import { Metadata } from 'next';
import { ArrowLeft, ShoppingCart, Box, TrendingUp, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'B2B & B2C E-Commerce Autonomy',
      description: 'We build innovative, conversion-optimized e-commerce infrastructures that manage your sales, logistics, and multi-channel inventory processes with AI and automation.',
      keywords: 'e-commerce infrastructure, e-commerce automation, b2b e-commerce, b2c e-commerce solutions, miami software agency, autonomous commerce, headless commerce',
    },
    back: 'Back to Services',
    tag: 'Sales & Conversion',
    title: 'E-Commerce Autonomy',
    p1: 'Modern e-commerce is not just about listing products on a website. It is a massive, complex operation ranging from order fulfillment to international shipping, from customer relations to automated return management. Successful brands dominate the market by entrusting these heavy processes to autonomous systems, eliminating human errors entirely.',
    h2_1: 'Unmanned and Lossless Operations',
    p2: 'The biggest bottleneck of traditional monolithic e-commerce platforms is condemning the business to the slowness of manual, repetitive processes. The Headless and autonomous e-commerce architectures we build as Allmysell LLC are fully integrated with your central ERP software, third-party logistics (3PL), cargo companies, and global supply chains. The exact moment an order comes in, the e-invoice is automatically generated, the cargo barcode is printed at the warehouse, and inventory levels are updated simultaneously across all marketplaces (Amazon, Shopify, custom storefronts) in milliseconds.',
    f1_title: 'Omnichannel Inventory Management',
    f1_desc: 'Manage and analyze sales data from all your digital channels instantly from a single source of truth with absolute zero error tolerance.',
    f2_title: 'High Conversion Optimization (CRO)',
    f2_desc: 'Smart checkout pages, dynamic pricing modules, and AI-supported product recommendations designed specifically to reduce cart abandonment rates.',
    h2_2: 'Hyper-Personalized Shopping Experience',
    p3: 'The era of standard storefronts that look identical to every visitor is over. Thanks to our integrated machine learning algorithms that analyze your customers\' past browsing and purchasing behaviors in real-time, your store automatically generates a custom product showcase for every unique visitor. This hyper-personalization strategy significantly increases Customer Lifetime Value (LTV) and boosts the Average Order Value (AOV) by up to 30%.',
    h2_3: 'Infinite Scalability and Uptime',
    p4: 'During peak campaign periods like Black Friday or Cyber Monday, a system crash damages your brand reputation far more than the immediate revenue loss. The cloud-native e-commerce infrastructures we build leverage auto-scaling Kubernetes clusters and Edge caching. Even if traffic suddenly spikes 100x within minutes, the system scales server resources automatically, ensuring your customers never see a loading screen.',
    h2_4: 'Our E-Commerce Technology Stack',
    tech_1_title: 'Headless Storefronts',
    tech_1_desc: 'Next.js Commerce, React, and Hydrogen for blazing-fast, decoupled user interfaces independent of the backend.',
    tech_2_title: 'Backend Platforms',
    tech_2_desc: 'Shopify Plus (Headless API), MedusaJS, and custom Node.js/Go architectures for complex B2B routing.',
    tech_3_title: 'Search & Infrastructure',
    tech_3_desc: 'Algolia for typo-tolerant instant search, Redis for session caching, and AWS/Vercel for global deployment.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'How long does it take to build an autonomous headless e-commerce system?',
    faq_1_a: 'Depending on the complexity, payment gateways, and external ERP integrations required, a fully autonomous Headless system usually takes between 6 to 12 weeks to deploy safely.',
    faq_2_q: 'Does your architecture integrate with our existing ERP (SAP, Microsoft Dynamics)?',
    faq_2_a: 'Yes, our architectures are built "API-first" to seamlessly integrate with major enterprise ERP, PIM (Product Information Management), and CRM systems via secure REST or GraphQL APIs.',
    faq_3_q: 'What is the difference between Headless Commerce and traditional Shopify/WooCommerce?',
    faq_3_a: 'Headless commerce separates the frontend (what the user sees) from the backend (inventory, checkout). This allows for lightning-fast page loads and complete design freedom, overcoming the rigid limitations of traditional themes.',
    faq_4_q: 'Can you handle B2B specific features like tiered pricing and bulk ordering?',
    faq_4_a: 'Absolutely. We develop specialized B2B portals featuring role-based access, tiered discount structures, minimum order quantities (MOQ), and automated quote generation.'
  },
  tr: {
    meta: {
      title: 'B2B & B2C E-Ticaret Otonomisi ve Altyapısı',
      description: 'Satış, lojistik ve çoklu kanal stok süreçlerinizi yapay zeka ve otomasyonlarla yöneten, Headless tabanlı yenilikçi e-ticaret altyapıları kuruyoruz.',
      keywords: 'e-ticaret altyapısı, e-ticaret otomasyonu, b2b e-ticaret, b2c e-ticaret çözümleri, miami yazılım ajansı, otonom ticaret, headless e-ticaret',
    },
    back: 'Hizmetlere Dön',
    tag: 'Satış & Dönüşüm',
    title: 'E-Ticaret Otonomisi',
    p1: 'Modern e-ticaret, yalnızca ürünleri bir web sitesinde listelemekten ibaret değildir. Sipariş anından uluslararası kargolamaya, müşteri ilişkilerinden otomatik iade yönetimine kadar uzanan devasa ve karmaşık bir operasyondur. Sektörü domine eden başarılı markalar, bu ağır süreçleri insan hatalarından tamamen arındırarak otonom sistemlere emanet edenlerdir.',
    h2_1: 'İnsansız ve Kayıpsız Operasyonlar',
    p2: 'Geleneksel ve monolitik e-ticaret platformlarının en büyük problemi, işletmeyi manuel ve tekrarlayan süreçlerin yavaşlığına mahkum etmesidir. Allmysell LLC olarak kurduğumuz Headless (başsız) ve otonom e-ticaret mimarileri; merkez ERP yazılımlarınız, 3PL (üçüncü parti lojistik), kargo firmalarınız ve global tedarik zincirinizle tam entegre çalışır. Bir sipariş geldiği milisaniye içinde e-fatura otomatik kesilir, depoda kargo barkodu basılır ve stok seviyeleri tüm pazaryerlerinde (Amazon, Trendyol, kendi siteniz) eş zamanlı olarak güncellenir.',
    f1_title: 'Omnichannel (Çoklu Kanal) Stok Yönetimi',
    f1_desc: 'Tüm dijital kanallarınızdaki satış ve envanter verilerini tek bir "doğruluk merkezinden" (SSOT), sıfır hata toleransıyla anlık olarak yönetin.',
    f2_title: 'Yüksek Dönüşüm Optimizasyonu (CRO)',
    f2_desc: 'Sepeti terk etme oranlarını minimize etmek için özel tasarlanmış akıllı ödeme sayfaları, dinamik fiyatlandırma modülleri ve yapay zeka destekli çapraz satış (cross-sell) önerileri.',
    h2_2: 'Hiper-Kişiselleştirilmiş Alışveriş Deneyimi',
    p3: 'Standart ve her ziyaretçiye aynı görünen mağazalar dönemi kesin olarak sona erdi. Müşterilerinizin geçmiş gezinme ve satın alma davranışlarını gerçek zamanlı analiz eden makine öğrenimi (AI) algoritmalarımız sayesinde, mağazanız her tekil ziyaretçiye anında özel bir vitrin oluşturur. Bu hiper-kişiselleştirme stratejisi, Müşteri Yaşam Boyu Değerini (LTV) artırırken, Ortalama Sepet Tutarını (AOV) %30\'a kadar yukarı çeker.',
    h2_3: 'Sonsuz Ölçeklenebilirlik ve Kesintisizlik',
    p4: 'Black Friday veya Cyber Monday gibi agresif kampanya dönemlerinde sisteminizin çökmesi, anlık ciro kaybından çok marka itibarınıza ve SEO skorunuza zarar verir. Kurduğumuz bulut tabanlı (cloud-native) e-ticaret altyapıları, Kubernetes ve Edge önbellekleme teknolojilerini kullanır. Trafik dakikalar içinde aniden 100 katına çıksa bile sunucu kaynakları otomatik olarak artırılır (auto-scaling) ve müşterileriniz hiçbir zaman bir "yükleniyor" ekranı görmez.',
    h2_4: 'E-Ticaret Teknoloji Yığınımız (Tech Stack)',
    tech_1_title: 'Headless Vitrin (Frontend)',
    tech_1_desc: 'Backend\'den bağımsız, ışık hızında çalışan ve SEO dostu arayüzler için Next.js Commerce, React ve Hydrogen mimarisi.',
    tech_2_title: 'Backend ve Yönetim Platformları',
    tech_2_desc: 'Yüksek hacimli ve B2B odaklı karmaşık satış rotaları için Shopify Plus (Headless API), MedusaJS ve özel Node.js mimarileri.',
    tech_3_title: 'Arama ve Altyapı',
    tech_3_desc: 'Yazım hatalarını anlayan anında arama (instant search) için Algolia, oturum yönetimi için Redis ve global CDN dağıtımı için AWS/Vercel.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'Otonom ve Headless bir e-ticaret sisteminin kurulması ne kadar sürer?',
    faq_1_a: 'İş mantığının karmaşıklığına, ödeme geçitlerine ve harici ERP entegrasyonlarına bağlı olarak, tam otonom bir sistemin güvenle devreye alınması genellikle 6 ila 12 hafta sürer.',
    faq_2_q: 'Mevcut Kurumsal ERP sistemimizle (SAP, Logo, Microsoft Dynamics) entegre çalışır mı?',
    faq_2_a: 'Evet, mimarilerimiz "API-first" mantığıyla kurulduğu için sektör standartlarındaki tüm ERP, PIM (Ürün Bilgi Yönetimi) ve CRM sistemleriyle güvenli REST veya GraphQL API\'leri üzerinden kusursuz entegre olur.',
    faq_3_q: 'Headless E-Ticaret ile geleneksel Shopify veya WooCommerce arasındaki fark nedir?',
    faq_3_a: 'Headless e-ticaret, vitrini (kullanıcının gördüğü kısım) arka uçtan (veritabanı ve ödeme) ayırır. Bu sayede geleneksel temaların hantal yapısından kurtulur, saniyenin altında sayfa yükleme hızlarına ve %100 özgür tasarıma ulaşırsınız.',
    faq_4_q: 'B2B için toptan sipariş, kademeli fiyatlandırma ve bayilik modülleri yapabiliyor musunuz?',
    faq_4_a: 'Kesinlikle. Rol bazlı erişim, bayilere özel iskonto oranları, minimum sipariş miktarı (MOQ) ve otomatik teklif oluşturma özelliklerine sahip, tamamen kapalı devre veya hibrit B2B portalları geliştiriyoruz.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  const path = lang === 'tr' ? '/tr/hizmetler/e-ticaret' : '/en/services/e-commerce';
  
  return {
    ...data.meta,
    alternates: constructAlternates('services/e-commerce', 'hizmetler/e-ticaret', lang)
  };
}

export default async function ETicaret({ params }: { params: Promise<{ lang: string }> }) {
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
      "name": "E-Commerce Solutions",
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
                <ShoppingCart className="w-6 h-6 text-indigo-300" />
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
                <Box className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-[#0A192F] mb-3">{dict.f1_title}</h3>
                <p className="text-slate-500">{dict.f1_desc}</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <TrendingUp className="w-8 h-8 text-indigo-600 mb-4" />
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
