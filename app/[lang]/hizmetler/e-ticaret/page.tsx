import { Metadata } from 'next';
import { ArrowLeft, ShoppingCart, Box, TrendingUp, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const content = {
  en: {
    meta: {
      title: 'E-Commerce Autonomy | Allmysell LLC',
      description: 'We build innovative e-commerce infrastructures that manage your sales, logistics, and inventory processes with AI and automation.',
      keywords: 'e-commerce infrastructure, e-commerce automation, b2b e-commerce, b2c e-commerce solutions, miami software agency, autonomous commerce',
    },
    back: 'Back to Services',
    tag: 'Sales & Conversion',
    title: 'E-Commerce Autonomy',
    p1: 'E-commerce is not just about listing products. It is a massive operation ranging from ordering to shipping, customer relations to return management. Successful brands entrust these processes to autonomous systems by eliminating human errors.',
    h2_1: 'Unmanned and Lossless Operations',
    p2: 'The biggest problem of traditional e-commerce sites is condemning the business to the slowness of manual processes. The autonomous e-commerce architectures we build as Allmysell LLC are fully integrated with your ERP software, cargo companies, and supply chain. The moment an order comes in, the invoice is automatically issued, the cargo barcode is printed, and stocks are updated simultaneously on all marketplaces.',
    f1_title: 'Integrated Inventory Management',
    f1_desc: 'Manage and analyze data from all your sales channels instantly from a single center with zero error tolerance.',
    f2_title: 'High Conversion Optimization',
    f2_desc: 'Smart checkout pages and AI-supported product recommendations that reduce cart abandonment rates.',
    h2_2: 'Personalized Shopping Experience',
    p3: 'The era of standard stores that look the same to everyone is over. Thanks to our AI algorithms that analyze your customers\' past behaviors, your store offers a custom showcase for every visitor. This hyper-personalization strategy significantly increases customer loyalty (LTV) and average order value (AOV).',
    h2_3: 'Scalability',
    p4: 'During campaign periods like Black Friday, your system crashing damages your brand reputation more than revenue loss. The cloud-based e-commerce infrastructures we build automatically scale server resources even if traffic suddenly increases 100 times, continuing to offer a seamless experience to your customers.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'How long does it take to build an autonomous e-commerce system?',
    faq_1_a: 'Depending on the complexity and integrations required, a fully autonomous system usually takes between 4 to 8 weeks to deploy.',
    faq_2_q: 'Does it integrate with our existing ERP?',
    faq_2_a: 'Yes, our architectures are built to seamlessly integrate with most modern ERP and CRM systems via APIs.'
  },
  tr: {
    meta: {
      title: 'E-Ticaret Otonomisi | Allmysell LLC',
      description: 'Satış, lojistik ve stok süreçlerinizi yapay zeka ve otomasyonlarla yöneten yenilikçi e-ticaret altyapıları kuruyoruz.',
      keywords: 'e-ticaret altyapısı, e-ticaret otomasyonu, b2b e-ticaret, b2c e-ticaret çözümleri, miami yazılım ajansı, otonom ticaret',
    },
    back: 'Hizmetlere Dön',
    tag: 'Satış & Dönüşüm',
    title: 'E-Ticaret Otonomisi',
    p1: 'E-ticaret yalnızca ürünleri listelemekten ibaret değildir. Siparişten kargolamaya, müşteri ilişkilerinden iade yönetimine kadar uzanan devasa bir operasyondur. Başarılı markalar, bu süreçleri insan hatalarından arındırarak otonom sistemlere emanet edenlerdir.',
    h2_1: 'İnsansız ve Kayıpsız Operasyonlar',
    p2: 'Geleneksel e-ticaret sitelerinin en büyük problemi, işletmeyi manuel süreçlerin yavaşlığına mahkum etmesidir. Allmysell LLC olarak kurduğumuz otonom e-ticaret mimarileri; ERP yazılımlarınız, kargo firmalarınız ve tedarik zincirinizle tam entegre çalışır. Bir sipariş geldiği anda fatura otomatik kesilir, kargo barkodu basılır ve stoklar tüm pazaryerlerinde eş zamanlı olarak güncellenir.',
    f1_title: 'Entegre Stok Yönetimi',
    f1_desc: 'Tüm satış kanallarınızdaki verileri tek bir merkezden, sıfır hata toleransıyla anlık olarak yönetin ve analiz edin.',
    f2_title: 'Yüksek Dönüşüm Optimizasyonu',
    f2_desc: 'Sepeti terk etme oranlarını düşüren akıllı ödeme (checkout) sayfaları ve yapay zeka destekli ürün önerileri.',
    h2_2: 'Kişiselleştirilmiş Alışveriş Deneyimi',
    p3: 'Standart ve herkese aynı görünen mağazalar dönemi sona erdi. Müşterilerinizin geçmiş davranışlarını analiz eden yapay zeka algoritmalarımız sayesinde, mağazanız her ziyaretçiye özel bir vitrin sunar. Bu hiper-kişiselleştirme stratejisi, müşteri sadakatini (LTV) ve ortalama sepet tutarını (AOV) ciddi ölçüde yukarı çeker.',
    h2_3: 'Ölçeklenebilirlik',
    p4: 'Kampanya dönemlerinde sisteminizin çökmesi, ciro kaybından çok marka itibarınıza zarar verir. Kurduğumuz bulut tabanlı e-ticaret altyapıları, trafik aniden 100 katına çıksa bile sunucu kaynaklarını otomatik olarak artırır (auto-scaling) ve müşterilerinize kesintisiz bir deneyim sunmaya devam eder.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'Otonom bir e-ticaret sisteminin kurulması ne kadar sürer?',
    faq_1_a: 'Karmaşıklığa ve entegrasyonlara bağlı olarak, tam otonom bir sistemin devreye alınması genellikle 4 ila 8 hafta sürer.',
    faq_2_q: 'Mevcut ERP sistemimizle entegre çalışır mı?',
    faq_2_a: 'Evet, mimarilerimiz API\'ler aracılığıyla çoğu modern ERP ve CRM sistemiyle sorunsuz bir şekilde entegre olacak şekilde tasarlanmıştır.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  return data.meta;
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
