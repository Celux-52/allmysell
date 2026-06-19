import { Metadata } from 'next';
import { ShoppingCart, Box, TrendingUp } from 'lucide-react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'B2B & B2C E-Commerce Autonomy',
      description: 'We build innovative, conversion-optimized e-commerce infrastructures that manage your sales, logistics, and multi-channel inventory processes with AI and automation.',
      keywords: 'e-commerce infrastructure, e-commerce automation, b2b e-commerce, b2c e-commerce solutions, st petersburg software agency, autonomous commerce, headless commerce',
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
      keywords: 'e-ticaret altyapısı, e-ticaret otomasyonu, b2b e-ticaret, b2c e-ticaret çözümleri, st petersburg yazılım ajansı, otonom ticaret, headless e-ticaret',
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

  return (
    <ServicePageTemplate 
      lang={lang}
      dict={dict}
      HeaderIcon={ShoppingCart}
      Feature1Icon={Box}
      Feature2Icon={TrendingUp}
      serviceCta={lang === 'tr' 
        ? { title: "Bu Hizmeti Projenizde Kullanmak İster misiniz?", desc: "Ekibimiz, projenize özel bir teknik değerlendirme hazırlamak için hazır. İlk görüşme ücretsizdir.", cta: "Ücretsiz Keşif Toplantısı" }
        : { title: "Want to Use This Service for Your Project?", desc: "Our team is ready to prepare a custom technical assessment for your project. First consultation is free.", cta: "Free Discovery Call" }
      }
    />
  );
}
