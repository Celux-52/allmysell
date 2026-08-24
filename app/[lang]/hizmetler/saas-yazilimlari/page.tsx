import { Metadata } from 'next';
import { ShieldCheck, Cpu, Cloud } from 'lucide-react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'Custom B2B SaaS Software Development',
      description: 'We develop custom, highly secure, instantly scalable and cloud-based B2B/B2C SaaS (Software as a Service) architectures for your business. Enterprise solutions.',
      keywords: 'saas development, custom software solutions, cloud-based software, b2b saas, software agency, st petersburg saas developer',
    },
    back: 'Back to Services',
    tag: 'Cloud & Security',
    title: 'Custom SaaS Software',
    p1: 'Off-the-shelf software packages cannot keep up with the growth rate of your company. Meet cloud-based custom SaaS (Software as a Service) architectures that perfectly adapt to your company\'s unique workflows, optimize operations, and maximize your profitability metrics.',
    h2_1: 'Liberate Your Business Processes',
    p2: 'Maintenance costs of on-premise servers, data loss risks, and office-dependent working models are a thing of the past. Modern companies are moving all their complex operations—such as CRM (Customer Relationship Management), ERP (Enterprise Resource Planning), automated billing, human resources management, or sectoral data analysis—to cloud-based systems. The closed-circuit or globally open scalable SaaS projects we develop are accessible in milliseconds from anywhere in the world and are protected with bank-level military-grade security standards. By minimizing human error through autonomous workflows, we ensure your business engine runs 24/7 without interruptions.',
    f1_title: 'Seamless Cloud Architecture',
    f1_desc: 'We provide a 99.9% uptime guarantee by hosting your application on giant infrastructures like AWS, Google Cloud, or Microsoft Azure with auto-scaling capabilities.',
    f2_title: 'API and Microservices',
    f2_desc: 'Independent yet compatible microservice architectures that provide seamless integration with your existing external tools (accounting, shipping, third-party analytics).',
    h2_2: 'Flawless Data Security & Isolation',
    p3: 'The most critical leg of SaaS projects is undoubtedly data security and user isolation. We encrypt all internal and external data traffic end-to-end (E2EE), apply regular automated penetration tests, and deliver an infrastructure fully compliant with international legal regulations like GDPR, HIPAA, and KVKK. Using strict multi-tenant database isolation strategies (row-level security or separate schemas), we guarantee that one client\'s data can never bleed into another\'s. Your proprietary data is kept in a digital vault with AI-supported Web Application Firewalls (WAF) that actively prevent SQL injections, DDoS attacks, and unauthorized access attempts.',
    h2_3: 'Go-To-Market (GTM) Strategy',
    p4: 'If you are building a B2B or B2C SaaS startup from scratch, we don\'t just write code; we architect your success. We provide comprehensive consultancy on establishing the right pricing models (Subscription, Freemium, Tiered), optimizing the conversion funnels, architecting the multi-tenant database management, and developing onboarding workflows that drastically reduce churn rates. A great SaaS must not only work perfectly but also sell itself effortlessly.',
    h2_4: 'Our Technology Stack',
    tech_1_title: 'Frontend Architecture',
    tech_1_desc: 'Next.js, React, TailwindCSS for lightning-fast, SSR-optimized, and highly interactive user interfaces.',
    tech_2_title: 'Backend & APIs',
    tech_2_desc: 'Node.js, Python (FastAPI/Django), and Go for building resilient, high-throughput RESTful or GraphQL APIs.',
    tech_3_title: 'Cloud & Database',
    tech_3_desc: 'AWS, Google Cloud, PostgreSQL, MongoDB, and Redis caching for auto-scaling multi-tenant environments.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'Which cloud providers do you use for SaaS architectures?',
    faq_1_a: 'We build scalable infrastructures primarily on AWS, Google Cloud, and Microsoft Azure, choosing the best fit for your specific requirements (compliance, region, pricing).',
    faq_2_q: 'Do you handle multi-tenant databases?',
    faq_2_a: 'Yes, we architect highly secure multi-tenant databases ensuring absolute data isolation between your different clients or organizations, using strategies like shared-database/separate-schema or fully isolated instances.',
    faq_3_q: 'How long does it take to develop a custom SaaS MVP?',
    faq_3_a: 'A solid Minimum Viable Product (MVP) typically takes 3 to 5 months to develop, depending on feature complexity, third-party integrations, and security requirements.',
    faq_4_q: 'Do you offer ongoing maintenance after launch?',
    faq_4_a: 'Absolutely. We offer SLA-backed maintenance packages including server monitoring, security patching, and continuous feature development.'
  },
  tr: {
    meta: {
      title: 'Kurumsal B2B SaaS Geliştirme',
      description: 'İşletmenize özel, yüksek güvenlikli, anında ölçeklenebilen ve bulut tabanlı B2B/B2C SaaS (Software as a Service) mimarileri geliştiriyoruz.',
      keywords: 'saas geliştirme, özel yazılım çözümleri, bulut tabanlı yazılımlar, b2b saas, yazılım ajansı, st petersburg saas geliştirici',
    },
    back: 'Hizmetlere Dön',
    tag: 'Bulut & Güvenlik',
    title: 'Özel SaaS Yazılımları',
    p1: 'Piyasada satılan hazır paket yazılımlar şirketinizin agresif büyüme hızına ve operasyonel dinamiklerine ayak uyduramaz. Şirketinizin benzersiz iş akışlarına tam uyum sağlayan, karlılık metriklerinizi optimize eden ve verimliliği en üst düzeye çıkaran bulut tabanlı özel SaaS (Hizmet olarak Yazılım) mimarileriyle tanışın.',
    h2_1: 'İş Süreçlerinizi Özgürleştirin',
    p2: 'Şirket içi fiziksel sunucuların (on-premise) yüksek bakım maliyetleri, donanım arızalarından kaynaklı veri kaybı riskleri ve ofise bağımlı çalışma modelleri geride kaldı. Modern ve vizyoner şirketler; CRM (Müşteri İlişkileri Yönetimi), ERP (Kurumsal Kaynak Planlama), otomatik faturalandırma, insan kaynakları veya sektörel veri analizi gibi tüm kritik operasyonlarını bulut tabanlı sistemlere taşıyor. Geliştirdiğimiz kapalı devre (in-house) veya globale açık, milyonlarca trafiği kaldırabilen SaaS projeleri, dünyanın her yerinden milisaniyeler içinde erişilebilir ve banka düzeyinde güvenlik standartlarıyla korunur. İş süreçlerinizi otonom hale getirerek insan hatasını sıfıra indiriyoruz.',
    f1_title: 'Kesintisiz Bulut Mimarisi',
    f1_desc: 'Uygulamanızı AWS, Google Cloud veya Microsoft Azure gibi dev altyapılarda barındırarak, otomatik ölçeklenme (auto-scaling) yeteneğiyle %99.9 çalışma süresi (uptime) garantisi sağlıyoruz.',
    f2_title: 'API ve Mikroservisler',
    f2_desc: 'Mevcut üçüncü parti araçlarınızla (muhasebe, kargo, ERP, pazarlama) kusursuz entegrasyon sağlayan, bağımsız ancak birbiriyle haberleşen mikroservis mimarileri.',
    h2_2: 'Kusursuz Veri Güvenliği ve İzolasyon',
    p3: 'B2B ve B2C SaaS projelerinin en kritik bacağı hiç şüphesiz veri güvenliği ve kullanıcı izolasyonudur (multi-tenancy). Tüm iç ve dış veri trafiğini uçtan uca şifreliyor (E2EE), düzenli sızma (Penetration) testleri uyguluyor ve GDPR, KVKK, HIPAA gibi uluslararası yasal regülasyonlara tam uyumlu bir altyapı teslim ediyoruz. Row-level security (satır bazlı güvenlik) veya ayrı şema mimarileri kullanarak bir müşterinin verisinin diğerine karışmamasını %100 garanti altına alıyoruz. İzinsiz girişleri, SQL Injection ve DDoS saldırılarını engelleyen yapay zeka destekli güvenlik duvarlarıyla (WAF) verileriniz dijital bir kasanın içinde tutulur.',
    h2_3: 'Pazara Çıkış (GTM) Stratejisi',
    p4: 'Eğer sıfırdan bir B2B veya B2C SaaS girişimi (startup) kuruyorsanız, yalnızca yazılım geliştirmekle (kod yazmakla) kalmıyor; başarınızı da mimarilendiriyoruz. Doğru fiyatlandırma modelleri (Aylık Abonelik, Freemium, Kullanım Bazlı vs.), çoklu kiracı (multi-tenant) veritabanı optimizasyonu, churn oranlarını düşüren kullanıcı katılım (onboarding) senaryoları ve dönüşüm hunileri üzerine kapsamlı danışmanlık veriyoruz. Harika bir SaaS projesi sadece kusursuz çalışmamalı, aynı zamanda kendi kendini satabilmelidir.',
    h2_4: 'Kullandığımız Teknolojiler (Tech Stack)',
    tech_1_title: 'Frontend Mimarisi',
    tech_1_desc: 'Işık hızında, SSR optimizasyonlu ve etkileşimi yüksek arayüzler için Next.js, React ve TailwindCSS.',
    tech_2_title: 'Backend ve API\'lar',
    tech_2_desc: 'Yüksek trafik ve veri işleme kapasitesine sahip RESTful veya GraphQL API\'lar için Node.js, Python (FastAPI) ve Go.',
    tech_3_title: 'Bulut ve Veritabanı',
    tech_3_desc: 'Otomatik ölçeklenen sistemler için AWS, Google Cloud, PostgreSQL, MongoDB ve Redis önbellekleme (caching) mimarileri.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'SaaS mimarileri için hangi bulut sağlayıcıları kullanıyorsunuz?',
    faq_1_a: 'Öncelikle yasal gereksinimlerinize ve hedef bölgenize en uygun olanı seçerek AWS, Google Cloud ve Microsoft Azure üzerinde ölçeklenebilir, modern altyapılar kuruyoruz.',
    faq_2_q: 'Çok kiracılı (multi-tenant) veritabanı altyapılarını yönetebiliyor musunuz?',
    faq_2_a: 'Kesinlikle. Farklı müşterileriniz veya organizasyonlarınız arasında mutlak veri izolasyonu sağlayan, shared-database/separate-schema (ortak veritabanı/ayrı şema) gibi stratejilerle son derece güvenli multi-tenant veritabanları tasarlıyoruz.',
    faq_3_q: 'Özel bir SaaS projesinin (MVP) geliştirilmesi ne kadar sürer?',
    faq_3_a: 'Özelliklerin karmaşıklığına, üçüncü parti entegrasyonlara ve güvenlik gereksinimlerine bağlı olarak sağlam bir Minimum Uygulanabilir Ürün (MVP) geliştirmek genellikle 3 ila 5 ay sürer.',
    faq_4_q: 'Canlıya aldıktan sonra sunucu bakım ve destek hizmeti sunuyor musunuz?',
    faq_4_a: 'Evet. SLA (Hizmet Seviyesi Sözleşmesi) destekli bakım paketlerimizle 7/24 sunucu izleme (monitoring), güvenlik yamaları ve sürekli yeni özellik geliştirme (continuous development) hizmeti sunuyoruz.'
  },
  ru: {
    meta: {
      title: 'Разработка B2B SaaS Программного Обеспечения',
      description: 'Разрабатываем индивидуальные, масштабируемые и безопасные облачные платформы B2B/B2C SaaS (Software as a Service).',
      keywords: 'разработка saas, заказное программное обеспечение, облачное по, b2b saas, разработка софта',
    },
    back: 'К Услугам',
    tag: 'Облако и Безопасность',
    title: 'Индивидуальное SaaS ПО',
    p1: 'Готовые коробочные решения не успевают за темпами роста вашего бизнеса. Откройте для себя облачные заказные SaaS архитектуры, адаптированные под ваши уникальные рабочие процессы и максимизирующие показатели рентабельности.',
    h2_1: 'Автономия Ваших Бизнес-Процессов',
    p2: 'Дорогое обслуживание локальных серверов и риски потери данных ушли в прошлое. Современные компании переносят CRM, ERP, биллинг и аналитику в облако. Разрабатываемые нами SaaS решения доступны за миллисекунды из любой точки планеты и защищены по банковским стандартам.',
    f1_title: 'Бесшовная Облачная Архитектура',
    f1_desc: 'Гарантия доступности 99.9% (Uptime) благодаря размещению на мощностях AWS, Google Cloud или Azure с авто-масштабированием.',
    f2_title: 'API и Микросервисы',
    f2_desc: 'Микросервисная архитектура для мгновенной интеграции со сторонними сервисами (бухгалтерия, логистика, аналитика).',
    h2_2: 'Абсолютная Безопасность и Изоляция Данных',
    p3: 'Мы шифруем весь трафик end-to-end (E2EE), проводим тесты на проникновение и гарантируем соответствие стандартам GDPR и HIPAA. Многопользовательская архитектура (multi-tenancy) с изоляцией на уровне строк обеспечивает надежную защиту данных каждого клиента.',
    h2_3: 'Стратегия Выхода на Рынок (GTM)',
    p4: 'Для стартапов мы не просто пишем код, а выстраиваем бизнес-модель: консультируем по тарифным сеткам, подпискам, онбордингу пользователей и снижению оттока (churn rate).',
    h2_4: 'Стек Технологий',
    tech_1_title: 'Frontend Архитектура',
    tech_1_desc: 'Next.js, React, TailwindCSS для быстрых и отзывчивых пользовательских интерфейсов.',
    tech_2_title: 'Backend и API',
    tech_2_desc: 'Node.js, Python (FastAPI) и Go для высоконагруженных RESTful и GraphQL API.',
    tech_3_title: 'Облако и Базы Данных',
    tech_3_desc: 'AWS, Google Cloud, PostgreSQL, MongoDB и кэширование в Redis для масштабируемых сред.',
    faq_title: 'Часто Задаваемые Вопросы',
    faq_1_q: 'Какие облачные платформы вы используете для SaaS?',
    faq_1_a: 'В зависимости от ваших требований мы строим архитектуру на AWS, Google Cloud или Microsoft Azure.',
    faq_2_q: 'Реализуете ли вы multi-tenant базы данных?',
    faq_2_a: 'Да, мы проектируем безопасные multi-tenant структуры с полной изоляцией клиентских данных.',
    faq_3_q: 'Сколько времени занимает разработка SaaS MVP?',
    faq_3_a: 'Разработка надежного MVP обычно занимает от 3 до 5 месяцев в зависимости от функционала.',
    faq_4_q: 'Предоставляете ли вы поддержку после релиза?',
    faq_4_a: 'Да, мы предоставляем SLA пакеты обслуживания: мониторинг серверов 24/7, патчи безопасности и развитие продукта.'
  },
  uz: {
    meta: {
      title: 'Maxsus B2B SaaS Dasturiy Ta\'minot Yaratish',
      description: 'Kompaniyangiz uchun maxsus, yuqori xavfsizlikka ega, tez kengayuvchi bulutli B2B/B2C SaaS (Software as a Service) tizimlarini ishlab chiqamiz.',
      keywords: 'saas dasturlash, maxsus dasturiy ta\'minot, bulutli dasturlar, b2b saas, dasturiy ta\'minot agentligi',
    },
    back: 'Xizmatlarga Qaytish',
    tag: 'Bulut va Xavfsizlik',
    title: 'Maxsus SaaS Dasturlari',
    p1: 'Tayyor qolip dasturlar kompaniyangizning o\'sish tezligiga yetib bora olmaydi. Biznes jarayonlaringizga to\'liq moslashuvchi, xarajatlarni kamaytiruvchi va daromadni oshiruvchi maxsus bulutli SaaS tizimlari bilan tanishing.',
    h2_1: 'Biznes Jarayonlaringizni Erkinlashtiring',
    p2: 'Jismoniy serverlarga xizmat ko\'rsatish xarajatlari va ma\'lumotlar yo\'qolish xavfi o\'tmishda qoldi. Zamonaviy kompaniyalar CRM, ERP, avtomatlashgan hisob-kitob va tahlil tizimlarini bulutga o\'tkazmoqda. Biz yaratgan SaaS tizimlari bank darajasidagi xavfsizlik bilan himoyalangan bo\'lib, dunyoning istalgan nuqtasidan ochiladi.',
    f1_title: 'Uzluksiz Bulut Arxitekturasi',
    f1_desc: 'AWS, Google Cloud yoki Microsoft Azure infratuzilmasida avtomatik kengayish orqali 99.9% uzluksiz ishlash (uptime) kafolati.',
    f2_title: 'API va Mikroservislar',
    f2_desc: 'Mavjud hisob-kitob, logistika va to\'lov tizimlari bilan oson bog\'lanuvchi mustaqil mikroservislar.',
    h2_2: 'Mukammal Ma\'lumotlar Xavfsizligi va Izolyatsiyasi',
    p3: 'Biz barcha ma\'lumotlar oqimini to\'liq shifrlaymiz (E2EE), xavfsizlik sinovlarini o\'tkazamiz va GDPR qoidalariga rioya qilamiz. Multi-tenancy tizimi orqali bir mijozning ma\'lumotlari boshqasiga aralashmasligi 100% kafolatlanadi.',
    h2_3: 'Bozorga Chiqish (GTM) Strategiyasi',
    p4: 'Startaplar uchun biz nafaqat kod yozamiz, balki to\'g\'ri narx belgilash (obuna modellari), foydalanuvchilarni jalb qilish va mijozlarni saqlab qolish bo\'yicha to\'liq konsalting beramiz.',
    h2_4: 'Texnologik Yechimlarimiz',
    tech_1_title: 'Frontend Arxitekturasi',
    tech_1_desc: 'Next.js, React va TailwindCSS orqali tezkor va qulay interfeyslar.',
    tech_2_title: 'Backend va API',
    tech_2_desc: 'Yuqori yuklamali tizimlar uchun Node.js, Python (FastAPI) va Go dasturlash tillari.',
    tech_3_title: 'Bulut va Ma\'lumotlar Bazasi',
    tech_3_desc: 'AWS, Google Cloud, PostgreSQL, MongoDB va Redis kesh tizimlari.',
    faq_title: 'Ko\'p Beriladigan Savollar',
    faq_1_q: 'SaaS uchun qaysi bulutli serverlardan foydalanasiz?',
    faq_1_a: 'Talablaringizga qarab AWS, Google Cloud yoki Microsoft Azure bulutli infratuzilmasini quramiz.',
    faq_2_q: 'Multi-tenant (ko\'p foydalanuvchili) bazalarni tuza olasizmi?',
    faq_2_a: 'Ha, mijozlar ma\'lumotlari bir-biridan to\'liq ajratilgan yuqori xavfsiz arxitekturani quramiz.',
    faq_3_q: 'SaaS MVP ni ishlab chiqish qancha vaqt oladi?',
    faq_3_a: 'Funksiyalar hajmiga qarab sifatli MVP 3 oydan 5 oygacha bo\'lgan muddatda tayyorlanadi.',
    faq_4_q: 'Loyihadan keyin texnik qo\'llab-quvvatlash bormi?',
    faq_4_a: 'Albatta, 24/7 server monitoringi, xavfsizlik yangilanishlari va doimiy rivojlantirish xizmatlarini taqdim etamiz.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  return {
    ...data.meta,
    alternates: constructAlternates('services/saas-software', 'hizmetler/saas-yazilimlari', lang, 'uslugi/saas-programmnoe-obespechenie', 'xizmatlar/saas-dasturiy-taminot')
  };
}

export default async function SaaS({ params }: { params: Promise<{ lang: string }> }) {
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
      HeaderIcon={ShieldCheck}
      Feature1Icon={Cpu}
      Feature2Icon={Cloud}
      serviceCta={ctaMap[lang as keyof typeof ctaMap] || ctaMap.en}
    />
  );
}
