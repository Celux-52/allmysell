import { Metadata } from 'next';
import { Smartphone, Zap, Layers } from 'lucide-react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'Enterprise Mobile Application Development',
      description: 'We develop enterprise mobile applications for iOS and Android that are high-performance, native-feeling, and instantly scalable.',
      keywords: 'mobile app development, ios app, android app, react native, enterprise mobile software, st petersburg app developer, mobile ux, cross-platform apps, mobile strategy',
    },
    back: 'Back to Services',
    tag: 'Connection & Experience',
    title: 'Mobile Applications',
    p1: 'Reaching the screen in your customers\' pockets is the ultimate point of brand loyalty. Unlike clunky, freezing, and battery-draining apps that tire the user; we build modern, stable, and hyper-optimized mobile ecosystems that flow like water as you swipe across the screen.',
    h2_1: 'Flawless Architecture and Native Performance',
    p2: 'With modern React Native architectures that feel 100% native (Swift/Kotlin) in quality, we build infrastructures that can instantly host millions of concurrent users for both iOS and Android over a single, maintainable codebase. We do not just build UI; we engineer the core. We always target the highest industry standards in device memory optimization (RAM management) and low battery consumption metrics, which are the absolute most critical aspects of user retention in a mobile application.',
    f1_title: '60 FPS Smooth Experience',
    f1_desc: 'Screen transitions, complex gestures, and micro-animations are hardware-accelerated to run at 60 frames per second, smoothly and with zero latency.',
    f2_title: 'Omnichannel & API Integration',
    f2_desc: 'Synchronized mobile applications that work seamlessly with your existing web platform, headless e-commerce site, ERP, and payment gateways via secure REST/GraphQL APIs.',
    h2_2: 'UX-First Design Philosophy',
    p3: 'The phone screen is a narrow, unforgiving space. A poorly placed button can cost you thousands of dollars in drop-offs. Our user experience (UX) experts analyze extensive data—from "Thumb Zones" to eye-tracking heatmaps—to design interfaces that users can effortlessly navigate with one hand. Your application is not just coded; it is psychologically structured to create retention and habit loops.',
    h2_3: 'Security & App Store Compliance',
    p4: 'A great app must be a secure app. We implement end-to-end encryption, biometric authentication (FaceID/TouchID), and strict secure-storage protocols for sensitive user data. Furthermore, we handle the notoriously complex App Store (Apple) and Google Play review processes from start to finish, ensuring your app complies with all global privacy regulations (GDPR/CCPA) and gets published without friction.',
    h2_4: 'Our Mobile Technology Stack',
    tech_1_title: 'Core Frameworks',
    tech_1_desc: 'React Native, Expo, and TypeScript for cross-platform efficiency combined with native-level performance and type safety.',
    tech_2_title: 'State & Data Management',
    tech_2_desc: 'Zustand, Redux Toolkit, and TanStack Query for seamless offline-mode capabilities and instant data synchronization.',
    tech_3_title: 'Backend & Infrastructure',
    tech_3_desc: 'Firebase, Supabase, and AWS Amplify for real-time push notifications, auth, and scalable cloud functions.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'Do you develop natively or cross-platform?',
    faq_1_a: 'We use modern cross-platform technologies like React Native and Expo, which provide native-like 60FPS performance with a single codebase for both iOS and Android, significantly reducing development time and maintenance costs.',
    faq_2_q: 'How long does enterprise mobile app development take?',
    faq_2_a: 'A Minimum Viable Product (MVP) usually takes 3 to 4 months. Comprehensive enterprise apps with complex backend integrations can take 6 months or more depending on scope.',
    faq_3_q: 'Do you handle the App Store and Google Play publishing process?',
    faq_3_a: 'Yes, we manage the entire deployment lifecycle, including app store optimization (ASO), compliance checks, review submissions, and managing certificates.',
    faq_4_q: 'Can the app work offline without an internet connection?',
    faq_4_a: 'Absolutely. We design apps with "Offline-First" architectures using local SQLite databases and async storage, syncing data securely to the cloud once the connection is restored.'
  },
  tr: {
    meta: {
      title: 'Kurumsal Mobil Uygulama Geliştirme (iOS & Android)',
      description: 'iOS ve Android için yüksek performanslı, native hissi veren ve anında ölçeklenebilen kurumsal mobil uygulamalar geliştiriyoruz.',
      keywords: 'mobil uygulama geliştirme, ios uygulama, android uygulama, react native, kurumsal mobil yazılım, st petersburg uygulama geliştirici, mobil ux, cross-platform uygulama',
    },
    back: 'Hizmetlere Dön',
    tag: 'Bağlantı & Deneyim',
    title: 'Mobil Uygulamalar',
    p1: 'Müşterilerinizin cebindeki ekrana ulaşmak, marka bağlılığının (brand loyalty) ulaşılabilecek en üst noktasıdır. Hantal çalışan, donan, pili sömüren ve kullanıcıyı yoran sıradan uygulamaların aksine; ekranda kayarken su gibi akan, modern, kararlı ve hiper-optimize edilmiş mobil ekosistemler inşa ediyoruz.',
    h2_1: 'Kusursuz Mimari ve Native (Yerel) Performans',
    p2: 'Native (Swift/Kotlin) kalitesinde hissettiren modern React Native mimarileriyle, tek bir kod tabanı üzerinden hem iOS hem de Android için milyonlarca anlık kullanıcıyı çökmeden ağırlayabilecek altyapılar kuruyoruz. Biz sadece arayüz çizmiyoruz, çekirdeği mühendislik harikası haline getiriyoruz. Bir mobil uygulamanın cihazda tutulmasını sağlayan en kritik metrikler olan; cihaz hafızası optimizasyonu (RAM yönetimi) ve düşük pil tüketimi konularında her zaman endüstri standartlarının zirvesini hedefliyoruz.',
    f1_title: '60 FPS Akıcı Deneyim',
    f1_desc: 'Ekran geçişleri, karmaşık kaydırma hareketleri (gestures) ve mikro-animasyonlar donanım hızlandırmasıyla (hardware-accelerated) saniyede 60 kare hızında, sıfır gecikmeyle çalışır.',
    f2_title: 'Omnichannel ve API Entegrasyonu',
    f2_desc: 'Mevcut web platformunuz, Headless e-ticaret siteniz, ERP yazılımlarınız ve ödeme geçitlerinizle güvenli REST/GraphQL API\'leri üzerinden %100 senkronize çalışan mobil uygulamalar.',
    h2_2: 'UX (Kullanıcı Deneyimi) Öncelikli Tasarım Felsefesi',
    p3: 'Telefon ekranı, hata affetmeyen çok dar bir alandır. Yanlış konumlandırılmış bir buton, size binlerce dolarlık sepet terkine mal olabilir. Kullanıcı deneyimi (UX) uzmanlarımız; başparmak erişim alanlarından (Thumb Zones) ısı haritalarına (heatmaps) kadar her türlü veriyi analiz ederek, kullanıcıların tek elle bile zahmetsizce kullanabileceği arayüzler tasarlar. Uygulamanız sadece kodlanmaz; psikolojik olarak kullanıcıda alışkanlık (habit loops) yaratacak şekilde kurgulanır.',
    h2_3: 'Güvenlik ve App Store Uyumluluğu',
    p4: 'Mükemmel bir uygulama aynı zamanda güvenli olmalıdır. Hassas kullanıcı verileri için uçtan uca şifreleme, biyometrik doğrulama (FaceID/TouchID) ve katı güvenli depolama protokolleri uyguluyoruz. Ayrıca, oldukça zorlu olan Apple App Store ve Google Play inceleme (review) süreçlerini baştan sona biz yönetiyor, uygulamanızın global gizlilik yasalarına (KVKK/GDPR) uyumlu olmasını ve sorunsuz bir şekilde yayınlanmasını sağlıyoruz.',
    h2_4: 'Mobil Teknoloji Yığınımız (Tech Stack)',
    tech_1_title: 'Temel Framework\'ler',
    tech_1_desc: 'Native seviyesinde performans, tip güvenliği ve hızlı geliştirme süreci için React Native, Expo ve TypeScript.',
    tech_2_title: 'Durum (State) ve Veri Yönetimi',
    tech_2_desc: 'Kusursuz çevrimdışı (offline) mod yetenekleri ve anında veri senkronizasyonu için Zustand, Redux Toolkit ve TanStack Query.',
    tech_3_title: 'Arka Uç (Backend) ve Altyapı',
    tech_3_desc: 'Gerçek zamanlı anlık bildirimler (Push Notifications), güvenli kimlik doğrulama ve ölçeklenebilir bulut fonksiyonları için Firebase, Supabase ve AWS Amplify.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'Native (Yerel) mi yoksa çapraz platform (Cross-platform) mu geliştiriyorsunuz?',
    faq_1_a: 'Hem iOS hem de Android için tek bir kod tabanıyla yerel uygulama performansına (60FPS) sahip React Native ve Expo gibi modern teknolojileri kullanıyoruz. Bu sayede geliştirme süresini ve bakım maliyetlerini önemli ölçüde düşürüyoruz.',
    faq_2_q: 'Kurumsal bir mobil uygulama geliştirme süreci ne kadar sürer?',
    faq_2_a: 'Minimum Uygulanabilir Ürün (MVP) genellikle 3 ila 4 ay sürer. Karmaşık backend entegrasyonlarına sahip kapsamlı kurumsal uygulamalar, projenin kapsamına bağlı olarak 6 ay veya daha fazla sürebilir.',
    faq_3_q: 'App Store ve Google Play yayınlama sürecini siz mi yönetiyorsunuz?',
    faq_3_a: 'Evet, uygulama mağazası optimizasyonu (ASO), uyumluluk kontrolleri, inceleme gönderimleri ve güvenlik sertifikalarının yönetimi dahil olmak üzere tüm yayınlama döngüsünü (deployment) biz yönetiyoruz.',
    faq_4_q: 'Uygulama internet bağlantısı olmadan da (Offline) çalışabilir mi?',
    faq_4_a: 'Kesinlikle. Yerel (local) SQLite veritabanları ve asenkron depolama kullanarak "Önce Çevrimdışı" (Offline-First) mimarisiyle uygulamalar tasarlıyor; bağlantı geri geldiğinde verilerin bulutla güvenli bir şekilde senkronize olmasını sağlıyoruz.'
  },
  ru: {
    meta: {
      title: 'Разработка Корпоративных Мобильных Приложений',
      description: 'Создаем высокопроизводительные мобильные приложения для iOS и Android на базе React Native с нативной плавностью 60 FPS.',
      keywords: 'разработка мобильных приложений, приложения для ios и android, react native, мобильный ux, агентство мобильной разработки',
    },
    back: 'К Услугам',
    tag: 'Связь и Опыт',
    title: 'Мобильные Приложения',
    p1: 'Экран смартфона в кармане клиента — высшая точка лояльности бренду. Мы создаем плавные, стабильные и оптимизированные мобильные приложения, которые работают быстро и экономно расходуют заряд батареи.',
    h2_1: 'Нативная Производительность и Архитектура',
    p2: 'Используя современный стек React Native, мы создаем приложения для iOS и Android из единой кодовой базы с качеством и скоростью чисто нативного кода (Swift/Kotlin), выдерживающие миллионы одновременных пользователей.',
    f1_title: 'Плавность 60 FPS',
    f1_desc: 'Аппаратное ускорение анимаций и жестов без задержек и подергиваний экрана.',
    f2_title: 'Омниканальная Интеграция API',
    f2_desc: 'Синхронизация в реальном времени с вашей веб-платформой, ERP и платежными шлюзами через REST/GraphQL.',
    h2_2: 'UX-First Дизайн',
    p3: 'Мы проектируем интерфейсы с учетом анатомии хвата смартфона (Thumb Zones), делая навигацию одной рукой максимально удобной и повышая конверсию в целевые действия.',
    h2_3: 'Безопасность и Публикация в Сторе',
    p4: 'Сквозное шифрование данных, биометрическая авторизация (FaceID/TouchID) и полное сопровождение модерации в Apple App Store и Google Play.',
    h2_4: 'Стек Технологий',
    tech_1_title: 'Фреймворки',
    tech_1_desc: 'React Native, Expo и TypeScript для быстрого запуска кроссплатформенных продуктов.',
    tech_2_title: 'Управление Данными',
    tech_2_desc: 'Zustand, Redux Toolkit и TanStack Query для работы в режиме Offline-First.',
    tech_3_title: 'Backend и Облако',
    tech_3_desc: 'Firebase, Supabase и AWS Amplify для push-уведомлений и масштабируемых облачных функций.',
    faq_title: 'Часто Задаваемые Вопросы',
    faq_1_q: 'Разрабатываете ли вы нативные или кроссплатформенные приложения?',
    faq_1_a: 'Мы используем React Native и Expo, что дает скорость нативного приложения при сокращении затрат на разработку.',
    faq_2_q: 'Сколько времени занимает разработка мобильного приложения?',
    faq_2_a: 'MVP обычно разрабатывается за 3-4 месяца, полномасштабные корпоративные системы — от 6 месяцев.',
    faq_3_q: 'Берете ли вы на себя публикацию в App Store и Google Play?',
    faq_3_a: 'Да, мы полностью ведем процесс подготовки сертификатов, прохождения проверок и ASO оптимизации.',
    faq_4_q: 'Может ли приложение работать без интернета?',
    faq_4_a: 'Да, архитектура Offline-First с локальной базой SQLite синхронизирует данные при появлении сети.'
  },
  uz: {
    meta: {
      title: 'Korporativ Mobil Ilovalar Ishlab Chiqish (iOS & Android)',
      description: 'iOS va Android uchun yuqori tezlikdagi, qulay va tez kengayuvchi korporativ mobil ilovalarni ishlab chiqamiz.',
      keywords: 'mobil ilovalar yaratish, ios ilova, android ilova, react native, mobil dasturlash agentligi, cross-platform ilovalar',
    },
    back: 'Xizmatlarga Qaytish',
    tag: 'Aloqa va Tajriba',
    title: 'Mobil Ilovalar',
    p1: 'Mijozingizning cho\'ntagidagi smartfon ekranida bo\'lish — brendga bo\'lgan sodiqlikning eng yuqori cho\'qqisidir. Biz qotmaydigan, batareyani tejaydigan va suvdek ravon ishlovchi zamonaviy mobil ilovalarni yaratamiz.',
    h2_1: 'Mukammal Arxitektura va Tezlik',
    p2: 'React Native texnologiyasi orqali yagona kod bazasidan iOS va Android uchun alohida ilovalar tezligida (60 FPS) ishlovchi hamda millionlab foydalanuvchilarni ko\'tara oladigan tizimlar quramiz.',
    f1_title: '60 FPS Ravon Tajriba',
    f1_desc: 'Ekran o\'tishlari va mikro-animatsiyalar qurilma tezlashuvidan foydalanib hech qanday kechikishsiz ishlaydi.',
    f2_title: 'Ko\'p Kanalli API Integratsiyasi',
    f2_desc: 'Mavjud veb-saytingiz, ERP va to\'lov tizimlari bilan real vaqtda to\'liq sinxron ishlash.',
    h2_2: 'UX (Qulaylik) Birinchi O\'rinda',
    p3: 'Bitta qo\'l bilan boshqarish qulayligini (Thumb Zones) hisobga olgan holda foydalanuvchilarni xarid qilishga undovchi interfeyslar yaratamiz.',
    h2_3: 'Xavfsizlik va Do\'konlarga Joylash',
    p4: 'Biometrik kirish (FaceID/TouchID), ma\'lumotlarni to\'liq shifrlash hamda App Store va Google Play ga rasmiy joylash jarayonini to\'liq boshqaramiz.',
    h2_4: 'Mobil Texnologiyalarimiz',
    tech_1_title: 'Asosiy Freymvorklar',
    tech_1_desc: 'React Native, Expo va TypeScript tezkor va xavfsiz dasturlash uchun.',
    tech_2_title: 'Holat va Ma\'lumotlar Boshqaruvi',
    tech_2_desc: 'Zustand, Redux Toolkit va TanStack Query internetsiz (Offline-First) ishlash imkoniyati uchun.',
    tech_3_title: 'Backend va Infratuzilma',
    tech_3_desc: 'Firebase, Supabase va AWS Amplify bildirishnomalar (Push) va bulutli xizmatlar uchun.',
    faq_title: 'Ko\'p Beriladigan Savollar',
    faq_1_q: 'Cross-platform yoki Native ilovalar qurasizmi?',
    faq_1_a: 'Biz React Native va Expo orqali bitta kod bilan ikkala platforma (iOS/Android) uchun yuqori sifatli ilovalar yaratamiz.',
    faq_2_q: 'Mobil ilovani ishlab chiqish qancha vaqt oladi?',
    faq_2_a: 'MVP odatda 3-4 oyda, murakkab korporativ tizimlar 6 oy yoki undan ko\'proq vaqtda tayyorlanadi.',
    faq_3_q: 'App Store va Google Play ga joylashni o\'zingiz bajarasizmi?',
    faq_3_a: 'Ha, ro\'yxatdan o\'tkazish, tekshiruvlardan o\'tish va ASO sozlamalarini to\'liq o\'z zimmamizga olamiz.',
    faq_4_q: 'Ilova internetsiz ham ishlay oladimi?',
    faq_4_a: 'Albatta, Offline-First arxitekturasi orqali internet bo\'lmaganda ma\'lumotlar saqlanib, tarmoq ulanganda yangilanadi.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  return {
    ...data.meta,
    alternates: constructAlternates('services/mobile-application', 'hizmetler/mobil-uygulama', lang, 'uslugi/mobilnye-prilozheniya', 'xizmatlar/mobil-ilovalar')
  };
}

export default async function MobilUygulama({ params }: { params: Promise<{ lang: string }> }) {
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
      HeaderIcon={Smartphone}
      Feature1Icon={Zap}
      Feature2Icon={Layers}
      serviceCta={ctaMap[lang as keyof typeof ctaMap] || ctaMap.en}
    />
  );
}
