import { Metadata } from 'next';
import { Globe, Zap, Search } from 'lucide-react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'Enterprise Web Platform Development',
      description: 'We build enterprise-level, hyper-performance, and fully SEO-compliant modern web platforms. Rebuild your digital identity with Next.js and React.',
      keywords: 'enterprise web design, web platform development, seo compliant website, st petersburg web agency, high performance sites, digital transformation',
    },
    back: 'Back to Services',
    tag: 'Technology & Design',
    title: 'Comprehensive Web Platforms',
    p1: 'In today\'s competitive conditions, having a standard website is no longer enough. As consumer habits change rapidly, your digital presence must be a living platform that can react in milliseconds, dominate search engine rankings, and convert casual visitors into loyal customers.',
    h2_1: 'Our Architectural Approach',
    p2: 'At Allmysell LLC, we take web platforms far beyond being just a "digital business card". We build our enterprise projects exclusively on modern, performance-oriented frameworks like Next.js and React, targeting zero latency with Server-Side Rendering (SSR) and Static Site Generation (SSG) capabilities. This architectural approach not only perfects the user experience but also significantly increases your organic traffic by guaranteeing top scores (95+) in Google\'s critical Core Web Vitals metrics.',
    f1_title: 'Hyper Performance & Edge Networking',
    f1_desc: 'With static generation and global Edge Network CDN usage, we offer buttery-smooth interfaces that load instantly from anywhere in the world, drastically reducing bounce rates.',
    f2_title: 'Built-in Technical SEO Infrastructure',
    f2_desc: 'We maximize your visibility with semantic HTML5, automated canonical tags, microdata (Schema.org), and dynamic meta tags that search engine bots crawl flawlessly.',
    h2_2: 'Data-Driven User-Centric Design (UX/UI)',
    p3: 'A perfectly coded infrastructure reaches its true potential only when combined with a flawless, psychologically optimized design. Through our data-driven User Experience (UX) testing and industry-standard User Interface (UI) design principles, we architect "conversion funnels" designed to generate revenue. The position of each Call-To-Action (CTA) button, the psychology behind the color palette, and the typographic hierarchy are specifically structured to reflect the corporate weight and authority of your brand.',
    h2_3: 'Sustainability, Modularity, and Security',
    p4: 'The platforms we develop are structured in a headless, modular way that can seamlessly integrate into the technologies of the future. When your business needs grow, the system scales horizontally; there is no need for a total rewrite. Moreover, your corporate data and customer information are protected with the latest encryption protocols, strict Content Security Policies (CSP), and wrapped in a complete digital armor against common web vulnerabilities.',
    h2_4: 'Our Technology Stack',
    tech_1_title: 'Core Frameworks',
    tech_1_desc: 'Next.js (App Router), React, and TypeScript for robust, type-safe, and infinitely scalable front-end architectures.',
    tech_2_title: 'Styling & Animation',
    tech_2_desc: 'TailwindCSS for utility-first styling, and Framer Motion for buttery-smooth, hardware-accelerated micro-animations.',
    tech_3_title: 'CMS & Infrastructure',
    tech_3_desc: 'Headless CMS integrations (Sanity, Strapi), Vercel/AWS Edge deployment, and advanced Redis caching mechanisms.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'Why do you use Next.js instead of traditional CMS like WordPress?',
    faq_1_a: 'Next.js provides Server-Side Rendering (SSR) and Static Site Generation (SSG) which result in instant page loads and vastly superior SEO performance compared to traditional, often bloated, monolithic CMS platforms like WordPress.',
    faq_2_q: 'Will my website be mobile-responsive?',
    faq_2_a: 'Absolutely. We design and develop with a strict "mobile-first" philosophy, ensuring your platform looks and performs perfectly on all device sizes and orientations.',
    faq_3_q: 'Do you provide SEO services along with the web development?',
    faq_3_a: 'We provide comprehensive Technical SEO (schema markup, semantic HTML, core web vitals optimization) out of the box. We also structure the content architecture to make your on-page SEO highly effective.',
    faq_4_q: 'Can we integrate third-party tools into the new platform?',
    faq_4_a: 'Yes, thanks to our headless and API-first approach, we can easily integrate any modern third-party service (CRMs like Salesforce/HubSpot, payment gateways, marketing tools).'
  },
  tr: {
    meta: {
      title: 'Kurumsal Web Platformu Geliştirme',
      description: 'Kurumsal seviyede, hiper performanslı ve tam anlamıyla teknik SEO uyumlu modern web platformları inşa ediyoruz. Next.js ile dijital kimliğinizi baştan kurgulayın.',
      keywords: 'kurumsal web tasarımı, web platformu geliştirme, seo uyumlu web sitesi, st petersburg web ajansı, yüksek performanslı siteler, dijital dönüşüm',
    },
    back: 'Hizmetlere Dön',
    tag: 'Teknoloji & Tasarım',
    title: 'Kapsamlı Web Platformları',
    p1: 'Günümüz rekabet koşullarında standart, şablondan bozma bir web sitesine sahip olmak artık yeterli değil. Tüketici alışkanlıkları hızla değişirken, dijital varlığınızın milisaniyeler içinde reaksiyon verebilen, arama motorlarında dominasyon kuran ve ziyaretçiyi müşteriye dönüştüren yaşayan bir platform olması şart.',
    h2_1: 'Mimari Yaklaşımımız',
    p2: 'Allmysell LLC olarak web platformlarını sıradan birer "dijital kartvizit" olmaktan çıkarıyoruz. Projelerimizi Next.js ve React gibi modern, performans odaklı framework\'ler üzerine inşa ediyor, sunucu tarafı render etme (SSR) ve statik üretim (SSG) yetenekleriyle sıfır gecikme (zero-latency) hedefliyoruz. Bu mimari yaklaşım, sadece kullanıcı deneyimini kusursuzlaştırmakla kalmıyor; Google\'ın en çok önem verdiği Core Web Vitals metriklerinde en üst skorları (95+) almanızı garantileyerek organik SEO trafiğinizi ciddi oranda artırıyor.',
    f1_title: 'Hiper Performans ve Edge Ağları',
    f1_desc: 'Statik üretim ve global Edge Network CDN kullanımıyla dünyanın her yerinden anında yüklenen, pürüzsüz arayüzler sunarak sayfadan çıkma (bounce) oranlarını düşürüyoruz.',
    f2_title: 'Yerleşik Teknik SEO Altyapısı',
    f2_desc: 'Arama motoru botlarının kusursuzca okuyup tarayabileceği semantik HTML5, otomatik canonical etiketleri, Schema.org mikro verileri ve dinamik meta etiketleriyle görünürlüğünüzü maksimize ediyoruz.',
    h2_2: 'Kullanıcı Odaklı Veri Tasarımı (UX/UI)',
    p3: 'Mükemmel kodlanmış bir altyapı, ancak kusursuz ve psikolojik olarak optimize edilmiş bir tasarımla birleştiğinde gerçek potansiyeline ulaşır. Veri odaklı kullanıcı deneyimi (UX) testlerimiz ve endüstri standartlarını belirleyen arayüz (UI) tasarım prensiplerimizle, ziyaretçileri müşteriye dönüştüren "dönüşüm hunileri" tasarlıyoruz. Her bir aksiyon butonunun (CTA) konumu, renk psikolojisi, boşluk (whitespace) kullanımı ve tipografik hiyerarşi, markanızın kurumsal ağırlığını yansıtacak şekilde özel olarak kurgulanıyor.',
    h2_3: 'Sürdürülebilirlik, Modülerlik ve Güvenlik',
    p4: 'Geliştirdiğimiz platformlar, geleceğin teknolojilerine entegre olabilecek modüler (headless) yapıda kurgulanır. İhtiyaçlarınız büyüdüğünde sistem yatay olarak ölçeklenir, baştan yazılmasına gerek kalmaz. Üstelik kurumsal verileriniz ve müşteri bilgileriniz, en güncel şifreleme protokolleriyle korunarak tam bir dijital zırh içine alınır, modern web zafiyetlerine karşı (XSS, CSRF) sıkı Güvenlik Politikaları (CSP) uygulanır.',
    h2_4: 'Kullandığımız Teknolojiler (Tech Stack)',
    tech_1_title: 'Temel Framework\'ler',
    tech_1_desc: 'Sağlam, tip güvenli (type-safe) ve sonsuz ölçeklenebilir frontend mimarileri için Next.js (App Router), React ve TypeScript.',
    tech_2_title: 'Stil ve Animasyon',
    tech_2_desc: 'Utility-first modern tasarım için TailwindCSS ve donanım hızlandırmalı, pürüzsüz mikro animasyonlar için Framer Motion.',
    tech_3_title: 'CMS ve Altyapı',
    tech_3_desc: 'Headless CMS entegrasyonları (Sanity, Strapi), Vercel/AWS Edge dağıtımı ve gelişmiş Redis önbellekleme mekanizmaları.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'Neden WordPress gibi geleneksel CMS\'ler yerine Next.js kullanıyorsunuz?',
    faq_1_a: 'Next.js, sunucu tarafı oluşturma (SSR) ve statik site oluşturma (SSG) sunarak, geleneksel, genellikle hantal olan WordPress gibi monolitik CMS platformlarına kıyasla anında sayfa yüklemeleri ve çok daha üstün SEO performansı sağlar.',
    faq_2_q: 'Web sitem mobil uyumlu (responsive) olacak mı?',
    faq_2_a: 'Kesinlikle. Platformunuzun tüm cihaz boyutlarında ve ekran yönelimlerinde mükemmel görünmesini ve çalışmasını sağlayacak şekilde katı bir "mobile-first" felsefesiyle tasarlıyor ve geliştiriyoruz.',
    faq_3_q: 'Web geliştirme ile birlikte SEO hizmeti de sağlıyor musunuz?',
    faq_3_a: 'Projelerimizde kapsamlı "Teknik SEO" (schema markup, semantik HTML, Core Web Vitals optimizasyonu) mimarisini kutudan çıktığı haliyle sunuyoruz. Ayrıca On-Page SEO performansınızın yüksek olması için içerik mimarisini doğru kurguluyoruz.',
    faq_4_q: 'Yeni platforma üçüncü parti (third-party) araçları entegre edebilir miyiz?',
    faq_4_a: 'Evet, headless ve API-first (önce API) yaklaşımımız sayesinde, modern üçüncü parti servisleri (Salesforce/HubSpot gibi CRM\'ler, ödeme geçitleri, pazarlama araçları) kolaylıkla entegre edebiliyoruz.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  return {
    ...data.meta,
    alternates: constructAlternates('services/web-solutions', 'hizmetler/web-cozumleri', lang)
  };
}

export default async function WebCozumleri({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params)?.lang || 'en';
  const dict = content[lang as keyof typeof content] || content.en;

  return (
    <ServicePageTemplate 
      lang={lang}
      dict={dict}
      HeaderIcon={Globe}
      Feature1Icon={Zap}
      Feature2Icon={Search}
      serviceCta={lang === 'tr' 
        ? { title: "Bu Hizmeti Projenizde Kullanmak İster misiniz?", desc: "Ekibimiz, projenize özel bir teknik değerlendirme hazırlamak için hazır. İlk görüşme ücretsizdir.", cta: "Ücretsiz Keşif Toplantısı" }
        : { title: "Want to Use This Service for Your Project?", desc: "Our team is ready to prepare a custom technical assessment for your project. First consultation is free.", cta: "Free Discovery Call" }
      }
    />
  );
}
