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
  },
  ru: {
    meta: {
      title: 'Разработка Корпоративных Веб-Платформ',
      description: 'Создаем корпоративные, высокопроизводительные и оптимизированные для SEO веб-платформы на базе Next.js и React.',
      keywords: 'корпоративный веб дизайн, разработка веб платформ, seo оптимизация сайтов, агентство разработки по, высокопроизводительные сайты',
    },
    back: 'К Услугам',
    tag: 'Технологии и Дизайн',
    title: 'Комплексные Веб-Платформы',
    p1: 'В современных конкурентных условиях простого шаблонного сайта уже недостаточно. Ваше цифровое присутствие должно быть живой системой, реагирующей за миллисекунды, доминирующей в поисковой выдаче и превращающей посетителей в лояльных клиентов.',
    h2_1: 'Наш Архитектурный Подход',
    p2: 'Allmysell LLC создает проекты на Next.js и React, ориентируясь на нулевую задержку с помощью Server-Side Rendering (SSR) и Static Site Generation (SSG). Это не только гарантирует безупречный опыт пользователей, но и обеспечивает наивысшие оценки (95+) в Google Core Web Vitals.',
    f1_title: 'Максимальная Скорость и Edge Сети',
    f1_desc: 'Мгновенная загрузка страниц из любой точки мира через глобальные сети Edge CDN, снижающая показатель отказов.',
    f2_title: 'Встроенное Техническое SEO',
    f2_desc: 'Семантический HTML5, микроразметка Schema.org и динамические метатеги для идеальной индексации поисковыми роботами.',
    h2_2: 'Ориентированный на Данные Дизайн (UX/UI)',
    p3: 'Мы проектируем интерфейсы, превращающие посетителей в покупателей. Расположение кнопок CTA, психология цветовой гаммы и типографика подчеркивают авторитет вашего бренда.',
    h2_3: 'Масштабируемость и Безопасность',
    p4: 'Модульная архитектура систем позволяет легко расширять функционал. Данные защищены строгими политиками Content Security Policy (CSP) и сквозным шифрованием.',
    h2_4: 'Используемый Стек Технологий',
    tech_1_title: 'Основные Фреймворки',
    tech_1_desc: 'Next.js (App Router), React и TypeScript для безопасного и масштабируемого фронтенда.',
    tech_2_title: 'Стили и Анимация',
    tech_2_desc: 'TailwindCSS для быстрой стилизации и Framer Motion для плавных аппаратных микроанимаций.',
    tech_3_title: 'CMS и Инфраструктура',
    tech_3_desc: 'Headless CMS (Sanity, Strapi), деплой на Vercel/AWS Edge и кэширование в Redis.',
    faq_title: 'Часто Задаваемые Вопросы',
    faq_1_q: 'Почему Next.js, а не WordPress?',
    faq_1_a: 'Next.js обеспечивает моментальную загрузку страниц и непревзойденное SEO благодаря SSR и SSG, исключая тяжеловесность традиционных CMS.',
    faq_2_q: 'Будет ли сайт адаптирован под мобильные устройства?',
    faq_2_a: 'Да, мы следуем принципу Mobile-First, гарантируя идеальное отображение на экранах любых размеров.',
    faq_3_q: 'Входит ли SEO оптимизация в разработку?',
    faq_3_a: 'Да, мы закладываем полное техническое SEO (Schema markup, Core Web Vitals, семантику) в базовую архитектуру.',
    faq_4_q: 'Можно ли интегрировать сторонние сервисы?',
    faq_4_a: 'Благодаря подходу API-First мы легко подключаем любые CRM, платежные системы и маркетинговые инструменты.'
  },
  uz: {
    meta: {
      title: 'Korporativ Veb Platformalar Yaratish',
      description: 'Next.js va React asosida korporativ darajadagi, yuqori tezlikdagi va to\'liq SEO talablariga javob beruvchi zamonaviy veb platformalar quramiz.',
      keywords: 'korporativ veb dizayn, veb platformalar yaratish, seo talablariga mos sayt, veb dasturlash agentligi, tezkor saytlar',
    },
    back: 'Xizmatlarga Qaytish',
    tag: 'Texnologiya va Dizayn',
    title: 'Keng Qamrovli Veb Platformalar',
    p1: 'Bugungi raqobat sharoitida oddiy shablon saytga ega bo\'lish yetarli emas. Sizning raqamli tizimingiz millisekundlarda ishlaydigan, qidiruv tizimlarida yetakchi o\'rinlarni egallaydigan va tashrif buyuruvchilarni mijozga aylantiradigan platforma bo\'lishi shart.',
    h2_1: 'Arxitektura Yondashuvimiz',
    p2: 'Allmysell LLC loyihalarni Next.js va React texnologiyalarida yaratib, serverda renderlash (SSR) va statik generatsiya (SSG) orqali nol kechikishni maqsad qiladi. Bu Google Core Web Vitals ko\'rsatkichlarida eng yuqori ballarni (95+) ta\'minlab, organik qidiruv trafigini oshiradi.',
    f1_title: 'Yuqori Tezlik va Edge Tarmoqlari',
    f1_desc: 'Dunyoning istalgan nuqtasidan bir zumda ochiluvchi interfeyslar orqali saytdan chiqib ketish foizini kamaytiramiz.',
    f2_title: 'O\'rnatilgan Texnik SEO',
    f2_desc: 'Semantik HTML5, Schema.org mikro-ma\'lumotlari va dinamik meta teglari orqali qidiruv tizimlarida maksimal ko\'rinuvchanlik.',
    h2_2: 'Foydalanuvchiga Yo\'naltirilgan Dizayn (UX/UI)',
    p3: 'Ma\'lumotlarga asoslangan UX sinovlari va zamonaviy UI prinsiplari orqali tashrif buyuruvchilarni xaridorga aylantiruvchi qulay yo\'nalishlarni loyihalashtiramiz.',
    h2_3: 'Barqarorlik va Xavfsizlik',
    p4: 'Modulli (headless) arxitektura biznesingiz o\'sishi bilan tizimni qayta yozmasdan kengaytirish imkonini beradi. Ma\'lumotlar CSP protokollari bilan himoyalangan.',
    h2_4: 'Texnologiyalarimiz',
    tech_1_title: 'Asosiy Freymvorklar',
    tech_1_desc: 'Next.js (App Router), React va TypeScript ishonchli va xavfsiz frontend uchun.',
    tech_2_title: 'Uslub va Animatsiya',
    tech_2_desc: 'TailwindCSS va silliq apparat tezlashuviga ega Framer Motion animatsiyalari.',
    tech_3_title: 'CMS va Infratuzilma',
    tech_3_desc: 'Headless CMS (Sanity, Strapi), Vercel/AWS Edge serverlari va Redis kesh tizimi.',
    faq_title: 'Ko\'p Beriladigan Savollar',
    faq_1_q: 'Nega WordPress o\'rniga Next.js ishlatasiz?',
    faq_1_a: 'Next.js bir zumda ochilish tezligi va WordPress kabi og\'ir CMS larga qaraganda ancha ustun SEO ko\'rsatkichlarini taqdim etadi.',
    faq_2_q: 'Sayt telefonlarga moslashuvchan (responsive) bo\'ladimi?',
    faq_2_a: 'Albatta. Biz Mobile-First falsafasiga tayangan holda barcha ekran o\'lchamlariga mos dizayn yaratamiz.',
    faq_3_q: 'Dasturlash bilan birga SEO xizmati ham taqdim etiladimi?',
    faq_3_a: 'Ha, barcha loyihalarimiz to\'liq texnik SEO (schema, core web vitals optimizatsiyasi) bilan birga yetkaziladi.',
    faq_4_q: 'Uchinchi tomon xizmatlarini (CRM, to\'lov tizimlari) ulash mumkinmi?',
    faq_4_a: 'Ha, API-first yondashuvimiz orqali har qanday zamonaviy CRM va to\'lov tizimlari oson ulanadi.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  return {
    ...data.meta,
    alternates: constructAlternates('services/web-solutions', 'hizmetler/web-cozumleri', lang, 'uslugi/veb-resheniya', 'xizmatlar/veb-yechimlar')
  };
}

export default async function WebCozumleri({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params)?.lang || 'en';
  const dict = content[lang as keyof typeof content] || content.en;

  const ctaMap = {
    tr: { title: "Bu Hizmeti Projenizde Kullanmak İster misiniz?", desc: "Ekibimiz, projenize özel bir teknik değerlendirme hazırlamak için hazır. İlk görüşme ücretsizdir.", cta: "Ücretsiz Keşif Toplantısı" },
    ru: { title: "Хотите использовать эту услугу в своем проекте?", desc: "Наша команда готова подготовить индивидуальную техническую оценку для вашего проекта. Первая встреча бесплатна.", cta: "Бесплатная Консультация" },
    uz: { title: "Ushbu xizmatdan loyihangizda foydalanmoqchimisiz?", desc: "Bizning jamoamiz loyihangiz uchun maxsus texnik baholash tayyorlashga tayyor. Birinchi uchrashuv bepul.", cta: "Bepul Konsultatsiya" },
    en: { title: "Want to Use This Service for Your Project?", desc: "Our team is ready to prepare a custom technical assessment for your project. First consultation is free.", cta: "Free Discovery Call" }
  };

  return (
    <ServicePageTemplate 
      lang={lang}
      dict={dict}
      HeaderIcon={Globe}
      Feature1Icon={Zap}
      Feature2Icon={Search}
      serviceCta={ctaMap[lang as keyof typeof ctaMap] || ctaMap.en}
    />
  );
}
