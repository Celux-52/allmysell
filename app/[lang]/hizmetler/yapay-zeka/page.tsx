import { Metadata } from 'next';
import { Bot, Sparkles, Database } from 'lucide-react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'Enterprise AI & Automation Solutions',
      description: 'Automate your data processing processes with custom-trained AI assistants (RAG) and machine learning algorithms for your business.',
      keywords: 'ai integration, machine learning, enterprise ai, rag systems, data analytics, st petersburg tech agency, automation solutions, llm integration, custom chatgpt',
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
      keywords: 'yapay zeka entegrasyonu, makine öğrenimi, kurumsal yapay zeka, rag sistemleri, veri analitiği, st petersburg teknoloji ajansı, otomasyon çözümleri, özel chatgpt',
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
  },
  ru: {
    meta: {
      title: 'Корпоративный Искусственный Интеллект и Автоматизация',
      description: 'Автоматизируйте обработку данных с помощью специализированных ИИ-ассистентов (RAG) и алгоритмов машинного обучения для вашего бизнеса.',
      keywords: 'интеграция ии, машинное обучение, корпоративный ии, rag системы, аналитика данных, разработка чатботов, автоматизация бизнеса',
    },
    back: 'К Услугам',
    tag: 'Инновации и Будущее',
    title: 'ИИ и Автоматизация',
    p1: 'Искусственный интеллект — это не фантастика, а главное правило современной конкуренции. Внедряйте интеллектуальные системы, которые сокращают время анализа данных и клиентской поддержки с дней до долей секунды.',
    h2_1: 'Интеграция Данных (RAG)',
    p2: 'Мы обучаем специализированных корпоративных агентов на ваших внутренних документах, истории продаж и регламентах компании. Благодаря технологии RAG ассистенты отвечают с нулевой погрешностью и знают внутренние политики компании.',
    f1_title: 'Интеллектуальная Обработка Данных (BI)',
    f1_desc: 'Анализ миллионов строк логов и таблиц за секунды для формирования прогнозных рекомендаций по увеличению прибыли.',
    f2_title: 'Автономная Поддержка Клиентов',
    f2_desc: 'Умные ИИ-агенты, понимающие контекст и эмоции пользователей, способные консультировать и закрывать сделки как живые специалисты.',
    h2_2: 'Оптимизация Времени и Затрат',
    p3: 'Автоматизация рутины освобождает ключевых сотрудников для решения творческих и стратегических задач, напрямую повышая рентабельность бизнеса.',
    h2_3: 'Предиктивное Машинное Обучение (ML)',
    p4: 'Алгоритмы прогнозируют отток пользователей (Churn), рекомендуют товары для кросс-продаж и динамически управляют ценами в зависимости от спроса.',
    h2_4: 'Стек Технологий ИИ',
    tech_1_title: 'LLM и Языковые Модели',
    tech_1_desc: 'OpenAI (GPT-4), Anthropic (Claude 3) и локально развернутые модели Llama 3 на приватных серверах.',
    tech_2_title: 'Векторные Базы Данных',
    tech_2_desc: 'Pinecone, Qdrant и Milvus для сверхбыстрого семантического поиска по корпоративным массивам данных.',
    tech_3_title: 'Фреймворки и Оркестрация',
    tech_3_desc: 'LangChain, LlamaIndex и микросервисы на Python для сложных сценариев автономных агентов.',
    faq_title: 'Часто Задаваемые Вопросы',
    faq_1_q: 'Защищены ли наши корпоративные данные при обучении ИИ?',
    faq_1_a: 'Да, мы разворачиваем изолированные RAG-системы в защищенном облаке (AWS/Azure). Данные не передаются в публичные модели.',
    faq_2_q: 'Может ли ИИ полностью заменить первую линию поддержки?',
    faq_2_a: 'ИИ-ассистенты закрывают до 80% типовых обращений на разных языках, передавая сложные случаи операторам.',
    faq_3_q: 'Сколько времени занимает внедрение ИИ-ассистента?',
    faq_3_a: 'В зависимости от объема и структуры данных запуск занимает от 4 до 8 недель.',
    faq_4_q: 'Осуществляете ли вы поддержку моделей после запуска?',
    faq_4_a: 'Да, мы проводим регулярный тюнинг промптов, мониторинг точности ответов и обновление базы знаний.'
  },
  uz: {
    meta: {
      title: 'Korporativ Sun\'iy Intellekt va Avtomatlashtirish Yechimlari',
      description: 'Maxsus o\'rgatilgan sun\'iy intellekt yordamchilari (RAG) va mashinali o\'rganish algoritmlari orqali biznes jarayonlaringizni avtomatlashtiring.',
      keywords: 'suniy intellekt integratsiyasi, mashinali organish, korporativ ai, rag tizimlari, ma\'lumotlar tahlili, chatbotlar yaratish',
    },
    back: 'Xizmatlarga Qaytish',
    tag: 'Innovatsiya va Kelajak',
    title: 'Sun\'iy Intellekt & Avtomatlashtirish',
    p1: 'Sun\'iy intellekt (SI) endi kelajak ertagi emas, balki zamonaviy raqobatning eng muhim qoidasidir. Ilgari kunlab vaqt olgan ma\'lumotlar tahlili va mijozlarga xizmat ko\'rsatish jarayonlarini soniya ulushlariga tushiruvchi aqlli tizimlar bilan tanishing.',
    h2_1: 'Ma\'lumotlar Integratsiyasi (RAG)',
    p2: 'Biz kompaniyangiz ichki hujjatlari, sotuvlar tarixi va qoidalarini aniq biladigan maxsus korporativ yordamchilarni o\'rgatamiz. RAG texnologiyasi orqali ushbu yordamchilar nol xato bilan savollarga javob beradi.',
    f1_title: 'Aqlli Ma\'lumotlar Tahlili (BI)',
    f1_desc: 'Millionlab qator ma\'lumotlarni tahlil qilib, daromadni oshiruvchi strategik xulosalar beradi.',
    f2_title: 'Avtonom Mijozlar Xizmati',
    f2_desc: 'Mijozlarning niyatini va his-tuyg\'ularini tushunuvchi, savdoni yopishga qodir aqlli agentlar.',
    h2_2: 'Xarajat va Vaqtni Optimallashtirish',
    p3: 'Xodimlaringizni bir xil takrorlanuvchi ishlardan xalos qilib, ularni ijodiy va strategik vazifalarga yo\'naltirish imkonini beradi.',
    h2_3: 'Bashorat Qiluvchi Mashinali O\'rganish (ML)',
    p4: 'Mijozlarning ketib qolish ehtimolini (churn) oldindan aniqlash, tovarlarni tavsiya qilish va narxlarni dinamik boshqarish.',
    h2_4: 'Sun\'iy Intellekt Texnologiyalarimiz',
    tech_1_title: 'Katta Til Modellari (LLM)',
    tech_1_desc: 'OpenAI (GPT-4), Anthropic (Claude 3) va shaxsiy serverlarda ishlovchi Llama 3 modellari.',
    tech_2_title: 'Vektorli Ma\'lumotlar Bazalari',
    tech_2_desc: 'Katta hajmdagi korporativ ma\'lumotlar ustida tezkor semantik qidiruv uchun Pinecone, Qdrant va Milvus.',
    tech_3_title: 'Freymvorklar va Boshqaruv',
    tech_3_desc: 'Murakkab agentlar yaratish uchun LangChain, LlamaIndex va Python mikroservislari.',
    faq_title: 'Ko\'p Beriladigan Savollar',
    faq_1_q: 'Kompaniyamiz ma\'lumotlari xavfsiz bo\'ladimi?',
    faq_1_a: 'Albatta. Biz ma\'lumotlar ommaviy modellarga chiqib ketmaydigan yopiq va xavfsiz bulutli RAG tizimlarini quramiz.',
    faq_2_q: 'Sun\'iy intellekt mijozlar qo\'llab-quvvatlashini to\'liq bajara oladimi?',
    faq_2_a: 'Ha, standart so\'rovlarning 80% gachasini bir nechta tillarda mustaqil hal qiladi.',
    faq_3_q: 'Yordamchini ishga tushirish qancha vaqt oladi?',
    faq_3_a: 'Ma\'lumotlar hajmiga qarab to\'liq tizim 4 haftadan 8 haftagacha bo\'lgan muddatda ishga tushiriladi.',
    faq_4_q: 'Modellarga keyinchalik xizmat ko\'rsatish bormi?',
    faq_4_a: 'Ha, ma\'lumotlar bazasini yangilab borish va javoblar sifatini nazorat qilish xizmatini taqdim etamiz.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  return {
    ...data.meta,
    alternates: constructAlternates('services/artificial-intelligence', 'hizmetler/yapay-zeka', lang, 'uslugi/iskusstvenniy-intellekt', 'xizmatlar/suniy-idrok')
  };
}

export default async function YapayZeka({ params }: { params: Promise<{ lang: string }> }) {
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
      HeaderIcon={Bot}
      Feature1Icon={Sparkles}
      Feature2Icon={Database}
      serviceCta={ctaMap[lang as keyof typeof ctaMap] || ctaMap.en}
    />
  );
}
