import { Metadata } from 'next';
import { Settings, Cpu, Bot, CheckCircle2, Download } from 'lucide-react';
import Link from 'next/link';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'Business Automation Solutions',
      description: 'Streamline your operations with our custom business automation solutions. Reduce manual work, lower costs, and increase efficiency with AI and workflow automation.',
      keywords: 'business automation, workflow automation, process automation, AI automation, operational efficiency, robotic process automation',
    },
    back: 'Back to Services',
    tag: 'Efficiency & Growth',
    title: 'Business Automation',
    p1: 'In the modern business landscape, manual repetitive tasks are the biggest bottleneck to growth and profitability. We design and implement intelligent automation systems that work 24/7, eliminating human error and freeing up your team to focus on strategic initiatives.',
    h2_1: 'Our Automation Approach',
    p2: 'We do not just provide generic tools; we deeply analyze your current workflows and architect bespoke automation pipelines. From connecting disparate software systems to integrating advanced AI agents, we build seamless, autonomous processes that drastically lower your operational costs and scale effortlessly with your business.',
    f1_title: 'End-to-End Workflow Integration',
    f1_desc: 'We connect your CRM, ERP, and marketing platforms, ensuring data flows instantly and flawlessly across your entire ecosystem without manual intervention.',
    f2_title: 'AI-Powered Process Automation',
    f2_desc: 'Leveraging cutting-edge AI and machine learning, we automate complex decision-making processes, from intelligent customer support routing to predictive data analysis.',
    h2_2: 'Scalable Infrastructure',
    p3: 'Our automation solutions are built on robust, cloud-native architectures that guarantee high availability and security. Whether you are processing a hundred transactions a day or a million, our systems scale dynamically to meet your demands without skipping a beat.',
    h2_3: 'Measurable ROI',
    p4: 'Every automation we implement is designed with clear metrics in mind. We provide comprehensive dashboards to track time saved, error reduction, and overall cost savings, ensuring a rapid and transparent return on your investment.',
    h2_4: 'Automation Technologies',
    tech_1_title: 'Integration Platforms',
    tech_1_desc: 'Make, Zapier, n8n, and custom API development for seamless system connectivity.',
    tech_2_title: 'AI & Machine Learning',
    tech_2_desc: 'OpenAI, Anthropic, and custom LLM integrations for intelligent data processing and autonomous agents.',
    tech_3_title: 'Cloud & Infrastructure',
    tech_3_desc: 'AWS Lambda, Google Cloud Functions, and robust cloud infrastructure for scalable execution.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'How long does it take to implement an automation system?',
    faq_1_a: 'Depending on the complexity of your workflows, basic automations can be deployed in weeks, while comprehensive enterprise systems may take a few months to perfect.',
    faq_2_q: 'Do we need to change our existing software?',
    faq_2_a: 'In most cases, no. Our goal is to connect and optimize the tools you already use, minimizing disruption while maximizing efficiency.',
    faq_3_q: 'Are automated processes secure?',
    faq_3_a: 'Absolutely. We implement enterprise-grade encryption, secure API connections, and strict access controls to ensure your data remains completely secure.',
    faq_4_q: 'What if an automated process fails?',
    faq_4_a: 'We build robust error handling and alerting systems into every automation. If an issue occurs, the system automatically notifies the designated team members while failing gracefully.'
  },
  tr: {
    meta: {
      title: 'İş Süreçleri Otomasyonu',
      description: 'Özel iş otomasyonu çözümlerimizle operasyonlarınızı hızlandırın. Yapay zeka ve iş akışı otomasyonu ile manuel işleri azaltın, maliyetleri düşürün ve verimliliği artırın.',
      keywords: 'iş otomasyonu, iş akışı otomasyonu, süreç otomasyonu, yapay zeka otomasyonu, operasyonel verimlilik, robotik süreç otomasyonu',
    },
    back: 'Hizmetlere Dön',
    tag: 'Verimlilik & Büyüme',
    title: 'Süreç Otomasyonu',
    p1: 'Modern iş dünyasında manuel ve tekrarlayan görevler, büyüme ve karlılığın önündeki en büyük engeldir. İnsan hatasını ortadan kaldıran ve ekibinizin stratejik hedeflere odaklanmasını sağlayan, 7/24 çalışan akıllı otomasyon sistemleri tasarlıyor ve uyguluyoruz.',
    h2_1: 'Otomasyon Yaklaşımımız',
    p2: 'Sadece standart araçlar sunmuyoruz; mevcut iş akışlarınızı derinlemesine analiz ediyor ve size özel otomasyon mimarileri kurguluyoruz. Farklı yazılım sistemlerini birbirine bağlamaktan gelişmiş yapay zeka ajanlarını entegre etmeye kadar, operasyonel maliyetlerinizi ciddi oranda düşüren ve işletmenizle birlikte zahmetsizce ölçeklenen otonom süreçler inşa ediyoruz.',
    f1_title: 'Uçtan Uca İş Akışı Entegrasyonu',
    f1_desc: 'CRM, ERP ve pazarlama platformlarınızı birbirine bağlayarak, verilerin tüm ekosisteminizde manuel müdahale olmadan anında ve kusursuz bir şekilde akmasını sağlıyoruz.',
    f2_title: 'Yapay Zeka Destekli Süreç Otomasyonu',
    f2_desc: 'En yeni yapay zeka ve makine öğrenimi teknolojilerinden yararlanarak, akıllı müşteri destek yönlendirmesinden öngörüsel veri analizine kadar karmaşık karar alma süreçlerini otomatikleştiriyoruz.',
    h2_2: 'Ölçeklenebilir Altyapı',
    p3: 'Otomasyon çözümlerimiz, yüksek erişilebilirlik ve güvenlik garanti eden sağlam, bulut tabanlı mimariler üzerine inşa edilmiştir. İster günde yüz işlem, ister bir milyon işlem yapıyor olun, sistemlerimiz ihtiyaçlarınızı karşılamak için dinamik olarak ölçeklenir.',
    h2_3: 'Ölçülebilir Yatırım Getirisi (ROI)',
    p4: 'Uyguladığımız her otomasyon, net metrikler göz önünde bulundurularak tasarlanır. Kazanılan zamanı, azalan hataları ve genel maliyet tasarruflarını takip etmeniz için kapsamlı gösterge panelleri (dashboard) sunarak, yatırımınızın hızlı ve şeffaf bir şekilde geri dönmesini sağlıyoruz.',
    h2_4: 'Kullandığımız Otomasyon Teknolojileri',
    tech_1_title: 'Entegrasyon Platformları',
    tech_1_desc: 'Kusursuz sistem bağlantısı için Make, Zapier, n8n ve özel API geliştirme.',
    tech_2_title: 'Yapay Zeka & Makine Öğrenimi',
    tech_2_desc: 'Akıllı veri işleme ve otonom ajanlar için OpenAI, Anthropic ve özel LLM entegrasyonları.',
    tech_3_title: 'Bulut & Altyapı',
    tech_3_desc: 'Ölçeklenebilir yürütme için AWS Lambda, Google Cloud Functions ve sağlam bulut altyapısı.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'Bir otomasyon sisteminin uygulanması ne kadar sürer?',
    faq_1_a: 'İş akışlarınızın karmaşıklığına bağlı olarak, temel otomasyonlar haftalar içinde devreye alınabilirken, kapsamlı kurumsal sistemlerin mükemmelleştirilmesi birkaç ay sürebilir.',
    faq_2_q: 'Mevcut yazılımlarımızı değiştirmemiz gerekiyor mu?',
    faq_2_a: 'Çoğu durumda hayır. Amacımız, halihazırda kullandığınız araçları bağlamak ve optimize etmek, böylece kesintileri en aza indirirken verimliliği en üst düzeye çıkarmaktır.',
    faq_3_q: 'Otomatik süreçler güvenli mi?',
    faq_3_a: 'Kesinlikle. Verilerinizin tamamen güvende kalmasını sağlamak için kurumsal düzeyde şifreleme, güvenli API bağlantıları ve sıkı erişim kontrolleri uyguluyoruz.',
    faq_4_q: 'Otomatik bir süreç başarısız olursa ne olur?',
    faq_4_a: 'Her otomasyona sağlam hata ayıklama ve uyarı sistemleri entegre ediyoruz. Bir sorun oluştuğunda, sistem işlemi güvenli bir şekilde durdururken ilgili ekip üyelerini otomatik olarak bilgilendirir.'
  },
  ru: {
    meta: {
      title: 'Автоматизация Бизнес-Процессов',
      description: 'Оптимизируйте операции с помощью заказных решений автоматизации. Сокращайте ручной труд, снижайте расходы и повышайте эффективность с помощью ИИ и n8n.',
      keywords: 'автоматизация бизнеса, автоматизация рабочих процессов, n8n, zapier, rpa, искусственный интеллект для бизнеса, оптимизация операций',
    },
    back: 'К Услугам',
    tag: 'Эффективность и Рост',
    title: 'Автоматизация Процессов',
    p1: 'В современном бизнесе повторяющиеся ручные задачи — главное препятствие для роста. Мы проектируем и внедряем интеллектуальные системы автоматизации, работающие 24/7, исключающие человеческие ошибки и освобождающие команду для стратегических целей.',
    h2_1: 'Наш Подход к Автоматизации',
    p2: 'Мы не просто предлагаем стандартные инструменты, а детально анализируем рабочие процессы и создаем индивидуальные сценарии автоматизации. От объединения разрозненного ПО до внедрения ИИ-агентов — мы строим автономные процессы, масштабируемые вместе с вашим бизнесом.',
    f1_title: 'Сквозная Интеграция Систем',
    f1_desc: 'Связываем CRM, ERP, склад и маркетинг для мгновенной и безошибочной передачи данных без ручного вмешательства.',
    f2_title: 'Автоматизация на Базе ИИ',
    f2_desc: 'Используем технологии искусственного интеллекта для автоматизации сложных решений: от маршрутизации тикетов до предиктивного анализа.',
    h2_2: 'Масштабируемая Инфраструктура',
    p3: 'Решения построены на базе облачных технологий, гарантирующих безопасность и бесперебойность как при сотне, так и при миллионах транзакций в день.',
    h2_3: 'Измеримый ROI',
    p4: 'Каждый сценарий разрабатывается с четкими метриками: экономия времени, снижение числа ошибок и сокращение расходов на операционную деятельность.',
    h2_4: 'Используемые Технологии',
    tech_1_title: 'Платформы Интеграции',
    tech_1_desc: 'Make, Zapier, n8n и заказная разработка REST/GraphQL API.',
    tech_2_title: 'ИИ и Машинное Обучение',
    tech_2_desc: 'OpenAI, Claude и кастомные LLM-агенты для интеллектуальной обработки данных.',
    tech_3_title: 'Облачная Инфраструктура',
    tech_3_desc: 'AWS Lambda, Google Cloud Functions и серверные решения для надежного выполнения задач.',
    faq_title: 'Часто Задаваемые Вопросы',
    faq_1_q: 'Сколько времени занимает внедрение автоматизации?',
    faq_1_a: 'Базовые сценарии внедряются за пару недель, а комплексные корпоративные цепочки — за 1-2 месяца.',
    faq_2_q: 'Нужно ли менять существующее программное обеспечение?',
    faq_2_a: 'В большинстве случаев нет. Мы объединяем и оптимизируем инструменты, которые вы уже используете.',
    faq_3_q: 'Безопасны ли автоматизированные процессы?',
    faq_3_a: 'Да, мы используем шифрование корпоративного уровня, безопасные API и строгие политики доступа.',
    faq_4_q: 'Что происходит при сбое в автоматизации?',
    faq_4_a: 'В каждый процесс встроена система обработки ошибок и оповещений, которая мгновенно информирует ответственных.'
  },
  uz: {
    meta: {
      title: 'Biznes Jarayonlarini Avtomatlashtirish',
      description: 'Maxsus biznes avtomatlashtirish yechimlari orqali operatsiyalarni tezlashtiring. Sun\'iy intellekt va n8n yordamida qo\'l mehnatini kamaytiring va daromadni oshiring.',
      keywords: 'biznesni avtomatlashtirish, ish jarayonlarini avtomatlashtirish, n8n, rpa, suniy intellekt, operatsion samaradorlik',
    },
    back: 'Xizmatlarga Qaytish',
    tag: 'Samaradorlik va O\'sish',
    title: 'Jarayonlar Avtomatizatsiyasi',
    p1: 'Zamonaviy biznesda takrorlanuvchi qo\'l mehnati o\'sish va daromad yo\'lidagi eng katta to\'siqdir. Inson omilini kamaytiruvchi va jamoangizni strategik maqsadlarga yo\'naltiruvchi 24/7 ishlovchi aqlli avtomatlashtirish tizimlarini quramiz.',
    h2_1: 'Avtomatlashtirish Yondashuvimiz',
    p2: 'Biz shunchaki standart vositalarni bermaymiz, balki mavjud ish jarayonlaringizni chuqur tahlil qilib, sizga mos maxsus tizimlarni loyihalashtiramiz. Turli dasturlarni bog\'lashdan tortib sun\'iy intellekt agentlarini ulashgacha bo\'lgan jarayonlar operatsion xarajatlarni sezilarli kamaytiradi.',
    f1_title: 'To\'liq Ish Oqimi Integratsiyasi',
    f1_desc: 'CRM, ERP va marketing platformalarini bir-biriga ulab, ma\'lumotlarning qo\'l aralashuvisiz uzluksiz aylanishini ta\'minlaymiz.',
    f2_title: 'Sun\'iy Intellektli Jarayonlar',
    f2_desc: 'Mijozlar so\'rovlarini yo\'naltirishdan tortib ma\'lumotlar tahliligacha bo\'lgan murakkab qaror qabul qilish jarayonlarini avtomatlashtiramiz.',
    h2_2: 'Kengayuvchi Infratuzilma',
    p3: 'Avtomatlashtirish tizimlarimiz bulutli texnologiyalarga asoslangan bo\'lib, kuniga 100 ta yoki 1 millionta tranzaksiyada ham birdek xavfsiz ishlaydi.',
    h2_3: 'O\'lchanadigan Natija (ROI)',
    p4: 'Tejalgan vaqt, kamaygan xatolar va moliyaviy tejamkorlikni real vaqtda kuzatish uchun qulay dashboardlar taqdim etamiz.',
    h2_4: 'Texnologik Yechimlarimiz',
    tech_1_title: 'Integratsiya Platformalari',
    tech_1_desc: 'Make, Zapier, n8n va maxsus API dasturlash.',
    tech_2_title: 'Sun\'iy Intellekt & Mashinali O\'rganish',
    tech_2_desc: 'OpenAI, Anthropic va maxsus LLM agentlari orqali ma\'lumotlarni qayta ishlash.',
    tech_3_title: 'Bulutli Infratuzilma',
    tech_3_desc: 'AWS Lambda, Google Cloud Functions va ishonchli server arxitekturasi.',
    faq_title: 'Ko\'p Beriladigan Savollar',
    faq_1_q: 'Avtomatlashtirish tizimini joriy qilish qancha vaqt oladi?',
    faq_1_a: 'Oddiy zanjirlar 1-2 haftada, yirik korporativ tizimlar esa 1-2 oyda to\'liq yo\'lga qo\'yiladi.',
    faq_2_q: 'Mavjud dasturlarimizni almashtirishimiz kerakmi?',
    faq_2_a: 'Ko\'p hollarda yo\'q. Biz siz allaqachon ishlatayotgan vositalarni birlashtiramiz va optimallashtiramiz.',
    faq_3_q: 'Avtomatlashgan jarayonlar qanchalik xavfsiz?',
    faq_3_a: 'Korporativ darajadagi shifrlash va xavfsiz API protokollari orqali ma\'lumotlar to\'liq himoyalanadi.',
    faq_4_q: 'Jarayonda xatolik yuz bersa nima bo\'ladi?',
    faq_4_a: 'Tizimga avtomatik ogohlantirish o\'rnatilgan bo\'lib, muammo haqida mas\'ul xodimlarga zudlik bilan xabar beriladi.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  return {
    ...data.meta,
    alternates: constructAlternates('services/automation', 'hizmetler/otomasyon', lang, 'uslugi/avtomatizaciya', 'xizmatlar/avtomatlashtirish')
  };
}

export default async function Otomasyon({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params)?.lang || 'en';
  const dict = content[lang as keyof typeof content] || content.en;

  const automations = {
    tr: [
      { title: "Nostr & AI Raporlama", desc: "Nostr ağındaki etiketleri takip ederek Gemini yapay zeka ile raporlar çıkarır ve Gmail/Telegram'a gönderir.", file: "/workflows/nostr_ai.json" },
      { title: "N8N TOTP Oluşturucu", desc: "İki faktörlü doğrulama (2FA) gerektiren sistemlere otomatik giriş için güvenli şifre üretimi.", file: "/workflows/totp_generator.json" },
      { title: "Bitwarden Yönetimi", desc: "Bitwarden şifre yöneticisi üzerindeki grupları ve üyeleri (members) API üzerinden senkronize eder.", file: "/workflows/bitwarden_sync.json" },
      { title: "Geri Bildirim Yönlendirme", desc: "Typeform anket sonuçlarını puanına göre analiz edip, olumlu ve olumsuz verileri farklı Google Sheets tablolarına ayırır.", file: "/workflows/typeform_routing.json" },
      { title: "Twitter & Airtable Senkronu", desc: "Belirli anahtar kelimelere göre atılan yeni tweetleri analiz edip Airtable veritabanına sadece yeni (daha önce kaydedilmemiş) olanları arşivler.", file: "/workflows/twitter_airtable.json" }
    ],
    ru: [
      { title: "Nostr и ИИ-Отчетность", desc: "Отслеживает хэштеги в сети Nostr, формирует отчеты с помощью Gemini AI и отправляет в Gmail/Telegram.", file: "/workflows/nostr_ai.json" },
      { title: "N8N TOTP Генератор", desc: "Безопасная генерация одноразовых паролей для автоматического входа в системы с 2FA.", file: "/workflows/totp_generator.json" },
      { title: "Управление Bitwarden", desc: "Синхронизация групп и участников менеджера паролей Bitwarden через API.", file: "/workflows/bitwarden_sync.json" },
      { title: "Маршрутизация Отзывов", desc: "Анализирует результаты опросов Typeform и распределяет позитивные и негативные отзывы по разным таблицам.", file: "/workflows/typeform_routing.json" },
      { title: "Синхронизация Twitter и Airtable", desc: "Анализирует публикации по ключевым словам и сохраняет уникальные записи в базу Airtable.", file: "/workflows/twitter_airtable.json" }
    ],
    uz: [
      { title: "Nostr va AI Hisobotlari", desc: "Nostr tarmog'idagi heshteglarni kuzatib, Gemini AI yordamida hisobot tuzadi va Gmail/Telegramga yuboradi.", file: "/workflows/nostr_ai.json" },
      { title: "N8N TOTP Generatori", desc: "2FA talab qiluvchi tizimlarga avtomatik kirish uchun xavfsiz bir martalik parollar yaratish.", file: "/workflows/totp_generator.json" },
      { title: "Bitwarden Boshqaruvi", desc: "Bitwarden parol boshqaruvchisidagi guruhlar va a'zolarni API orqali sinxronlashtirish.", file: "/workflows/bitwarden_sync.json" },
      { title: "Fikr-Mulohazalarni Yo'naltirish", desc: "Typeform so'rovnoma natijalarini tahlil qilib, ijobiy va salbiy javoblarni turli jadvallarga ajratadi.", file: "/workflows/typeform_routing.json" },
      { title: "Twitter va Airtable Sinxronizatsiyasi", desc: "Kalit so'zlar bo'yicha tvitlarni tahlil qilib, faqat yangi yozuvlarni Airtable bazasiga saqlaydi.", file: "/workflows/twitter_airtable.json" }
    ],
    en: [
      { title: "Nostr & AI Reporting", desc: "Tracks hashtags on the Nostr network, generates AI reports using Gemini, and sends them via Gmail/Telegram.", file: "/workflows/nostr_ai.json" },
      { title: "N8N TOTP Generator", desc: "Secure password generation for automated logins to systems requiring two-factor authentication (2FA).", file: "/workflows/totp_generator.json" },
      { title: "Bitwarden Management", desc: "Synchronizes groups and members on the Bitwarden password manager via API.", file: "/workflows/bitwarden_sync.json" },
      { title: "Feedback Routing", desc: "Analyzes Typeform survey results by score and routes positive and negative feedback into different Google Sheets.", file: "/workflows/typeform_routing.json" },
      { title: "Twitter & Airtable Sync", desc: "Analyzes new tweets based on specific keywords and archives only the new ones into an Airtable database.", file: "/workflows/twitter_airtable.json" }
    ]
  };

  const currentAutomations = automations[lang as keyof typeof automations] || automations.en;

  const sectionTitle = 
    lang === 'tr' ? 'Açık Kaynak Örnek Otomasyonlar' : 
    lang === 'ru' ? 'Примеры Open Source Сценариев' : 
    lang === 'uz' ? 'Ochiq Kodli Avtomatlashtirish Namunalari' : 'Open Source Automation Scenarios';

  const downloadLabel = 
    lang === 'tr' ? 'JSON İndir' : 
    lang === 'ru' ? 'Скачать JSON' : 
    lang === 'uz' ? 'JSON Yuklab Olish' : 'Download JSON';

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
      HeaderIcon={Settings}
      Feature1Icon={Bot}
      Feature2Icon={Cpu}
      serviceCta={ctaMap[lang as keyof typeof ctaMap] || ctaMap.en}
    >
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mt-8">
        <h3 className="text-2xl md:text-3xl font-bold text-[#0A192F] mb-8">
          {sectionTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentAutomations.map((auto, idx) => (
            <div key={idx} className="flex flex-col gap-4 p-6 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 transition-colors border border-slate-100">
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">{auto.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{auto.desc}</p>
                </div>
              </div>
              <div className="mt-auto pt-4 flex justify-end">
                <Link href={auto.file} target="_blank" download className="inline-flex items-center gap-2 text-xs font-bold bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  <Download className="w-4 h-4" />
                  {downloadLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ServicePageTemplate>
  );
}
