const fs = require('fs');
const path = require('path');

const TRANSLATIONS = {
  "agentic-ai-2026nin-en-onemli-teknoloji-trendi": {
    ru: {
      title: "Agentic AI: Главный технологический тренд 2026 года",
      excerpt: "Автономные ИИ-агенты меняют правила игры в разработке ПО, бизнес-аналитике и операционном управлении.",
      category: "Искусственный интеллект",
      date: "18 июня 2026 г."
    },
    uz: {
      title: "Agentic AI: 2026 yilning eng muhim texnologik trendi",
      excerpt: "Avtonom sun'iy intellekt agentlari dasturlash, biznes tahlil va boshqaruv qoidalarini tubdan o'zgartirmoqda.",
      category: "Sun'iy intellekt",
      date: "18-iyun, 2026"
    }
  },
  "ai-agents-customer-support": {
    ru: {
      title: "ИИ-агенты в клиентской поддержке: Автономия 24/7",
      excerpt: "Как автономные агенты поддержки обрабатывают до 80% запросов клиентов без участия человека.",
      category: "Искусственный интеллект",
      date: "15 июня 2026 г."
    },
    uz: {
      title: "Mijozlar xizmatida AI agentlari: 24/7 to'liq avtonomiya",
      excerpt: "Sun'iy intellekt yordamchilari mijozlar so'rovlarining 80 foizini inson aralashuvisiz qanday hal qilmoqda.",
      category: "Sun'iy intellekt",
      date: "15-iyun, 2026"
    }
  },
  "ai-automation-for-singapore-startups-2026": {
    ru: {
      title: "ИИ и автоматизация для стартапов 2026",
      excerpt: "Практическое руководство по внедрению современных технологий автоматизации для быстрорастущих технологических компаний.",
      category: "Автоматизация",
      date: "12 июня 2026 г."
    },
    uz: {
      title: "Startaplar uchun AI va avtomatlashtirish 2026",
      excerpt: "Tez o'suvchi texnologik kompaniyalar uchun zamonaviy avtomatlashtirish yechimlarini joriy etish qo'llanmasi.",
      category: "Avtomatlashtirish",
      date: "12-iyun, 2026"
    }
  },
  "ai-seo-geo-veri-cekme": {
    ru: {
      title: "AI SEO и Геотаргетинг: Сбор данных нового поколения",
      excerpt: "Использование алгоритмов машинного обучения для гео-сегментации и глубокого SEO-анализа поисковой выдачи.",
      category: "SEO и Аналитика",
      date: "10 июня 2026 г."
    },
    uz: {
      title: "AI SEO va Geo-ma'lumotlarni yig'ish",
      excerpt: "Qidiruv tizimlarida geo-segmentatsiya va chuqur SEO tahlili uchun mashinali o'rganishdan foydalanish.",
      category: "SEO va Tahlil",
      date: "10-iyun, 2026"
    }
  },
  "b2b-digital-transformation-strategy": {
    ru: {
      title: "Стратегия цифровой трансформации B2B в 2026 году",
      excerpt: "Пошаговая дорожная карта перехода от устаревших монолитных систем к гибким облачным архитектурам.",
      category: "Консалтинг",
      date: "8 июня 2026 г."
    },
    uz: {
      title: "2026 yilda B2B raqamli transformatsiya strategiyasi",
      excerpt: "Eskirgan og'ir tizimlardan zamonaviy moslashuvchan bulutli arxitekturalarga o'tish bo'yicha bosqichma-bosqich reja.",
      category: "Konsalting",
      date: "8-iyun, 2026"
    }
  },
  "b2b-saas-development-2026": {
    ru: {
      title: "Разработка B2B SaaS в 2026 году: Архитектура и Масштабирование",
      excerpt: "Полное руководство по созданию масштабируемых облачных сервисов корпоративного уровня с подписочной моделью.",
      category: "SaaS",
      date: "5 июня 2026 г."
    },
    uz: {
      title: "2026 yilda B2B SaaS ishlab chiqish: Arxitektura va Kengayish",
      excerpt: "Obuna modeliga ega korporativ darajadagi kengayuvchi bulutli xizmatlarni yaratish bo'yicha to'liq qo'llanma.",
      category: "SaaS",
      date: "5-iyun, 2026"
    }
  },
  "b2b-saas-multi-tenant-architecture": {
    ru: {
      title: "Multi-Tenant Архитектура для B2B SaaS",
      excerpt: "Как спроектировать надежную изоляцию баз данных и безопасность для тысяч корпоративных клиентов в единой системе.",
      category: "SaaS",
      date: "2 июня 2026 г."
    },
    uz: {
      title: "B2B SaaS uchun Multi-Tenant arxitekturasi",
      excerpt: "Yagona tizimda minglab korporativ mijozlar uchun ma'lumotlar xavfsizligi va bazalar izolyatsiyasini to'g'ri loyihalash.",
      category: "SaaS",
      date: "2-iyun, 2026"
    }
  },
  "e-ticaret-sitesi-kurma-rehberi": {
    ru: {
      title: "Руководство по созданию современного интернет-магазина 2026",
      excerpt: "От выбора Headless архитектуры до интеграции платежей и логистических цепочек.",
      category: "Электронная коммерция",
      date: "30 мая 2026 г."
    },
    uz: {
      title: "Zamonaviy internet do'kon yaratish qo'llanmasi 2026",
      excerpt: "Headless arxitekturani tanlashdan tortib to'lov tizimlari va logistika integratsiyasigacha.",
      category: "Elektron tijorat",
      date: "30-may, 2026"
    }
  },
  "ebay-dijital-ticaretin-oncusu": {
    ru: {
      title: "eBay: Пионер цифровой коммерции и будущее глобальных продаж",
      excerpt: "Глубокий анализ эволюции экосистемы eBay и возможностей для масштабирования международного бизнеса.",
      category: "Электронная коммерция",
      date: "28 мая 2026 г."
    },
    uz: {
      title: "eBay: Raqamli tijorat kashshofi va global savdo kelajagi",
      excerpt: "eBay ekotizimi evolyutsiyasi va xalqaro biznesni kengaytirish imkoniyatlarining chuqur tahlili.",
      category: "Elektron tijorat",
      date: "28-may, 2026"
    }
  },
  "edge-computing-in-web-development": {
    ru: {
      title: "Edge Computing в современной веб-разработке",
      excerpt: "Как распределенные вычисления на границе сети (Edge) снижают задержку до миллисекунд и ускоряют работу сайтов.",
      category: "Технологии",
      date: "24 мая 2026 г."
    },
    uz: {
      title: "Zamonaviy veb dasturlashda Edge Computing texnologiyasi",
      excerpt: "Edge tarmoqlari orqali hisoblashlar sahifa ochilish tezligini qanday qilib millisekundlarga tushirishi haqida.",
      category: "Texnologiyalar",
      date: "24-may, 2026"
    }
  },
  "global-business-2026-ai-ecommerce-startup-revolution": {
    ru: {
      title: "Глобальный бизнес 2026: Революция ИИ и стартапов в E-Commerce",
      excerpt: "Как искусственный интеллект и автономные микросервисы трансформируют международную торговлю.",
      category: "Электронная коммерция",
      date: "20 мая 2026 г."
    },
    uz: {
      title: "Global biznes 2026: E-tijorat va startaplarda sun'iy intellekt inqilobi",
      excerpt: "Sun'iy intellekt va avtonom mikroservislar xalqaro savdoni qanday o'zgartirmoqda.",
      category: "Elektron tijorat",
      date: "20-may, 2026"
    }
  },
  "headless-commerce-vs-traditional": {
    ru: {
      title: "Headless Commerce против традиционных монолитных платформ",
      excerpt: "Сравнение производительности, масштабируемости и конверсии современных Headless решений с классическими CMS.",
      category: "Электронная коммерция",
      date: "16 мая 2026 г."
    },
    uz: {
      title: "Headless Commerce va an'anaviy og'ir platformalar taqqosi",
      excerpt: "Zamonaviy Headless yechimlarning tezligi, kengayuvchanligi va konversiyasi an'anaviy CMS lardan nega ustun?",
      category: "Elektron tijorat",
      date: "16-may, 2026"
    }
  },
  "iklim-krizi-surdurulebilir-is-modelleri-2026": {
    ru: {
      title: "Устойчивые бизнес-модели и зеленые технологии 2026",
      excerpt: "Как снижение углеродного следа цифровых серверов становится конкурентным преимуществом для технологических компаний.",
      category: "Устойчивость",
      date: "12 мая 2026 г."
    },
    uz: {
      title: "2026 yilda barqaror biznes modellari va yashil texnologiyalar",
      excerpt: "Raqamli serverlar sarfini kamaytirish qanday qilib texnologik kompaniyalar uchun raqobat ustunligiga aylanmoqda.",
      category: "Barqarorlik",
      date: "12-may, 2026"
    }
  },
  "isletmenize-yapay-zeka-entegre-etmek": {
    ru: {
      title: "Как безопасно интегрировать искусственный интеллект в ваш бизнес",
      excerpt: "Практическое руководство по внедрению RAG-систем и корпоративных LLM без риска утечки конфиденциальных данных.",
      category: "Искусственный интеллект",
      date: "8 мая 2026 г."
    },
    uz: {
      title: "Biznesga sun'iy intellektni xavfsiz integratsiya qilish yo'llari",
      excerpt: "Maxfiy ma'lumotlar xavfsizligini ta'minlagan holda RAG tizimlari va korporativ LLM larni joriy etish amaliyoti.",
      category: "Sun'iy intellekt",
      date: "8-may, 2026"
    }
  },
  "kod-bilmeden-mobil-uygulama": {
    ru: {
      title: "Разработка мобильных приложений: Мифы и Реальность 2026",
      excerpt: "Почему надежным корпоративным продуктам необходима профессиональная инженерная архитектура React Native.",
      category: "Мобильная разработка",
      date: "4 мая 2026 г."
    },
    uz: {
      title: "Mobil ilovalar ishlab chiqish: Afsonalar va Haqiqat 2026",
      excerpt: "Nima uchun ishonchli korporativ tizimlarga professional React Native muhandislik arxitekturasi zarur.",
      category: "Mobil ilovalar",
      date: "4-may, 2026"
    }
  },
  "kuresel-ekonomi-sirket-birlesmeleri-2026": {
    ru: {
      title: "Слияния и поглощения (M&A) в технологическом секторе 2026",
      excerpt: "Анализ глобальных сделок и влияние консолидации ИИ-стартапов на мировую экономику.",
      category: "Экономика",
      date: "1 мая 2026 г."
    },
    uz: {
      title: "2026 yilda texnologiya sektorida kompaniyalar birlashishi (M&A)",
      excerpt: "Global bitimlar tahlili va sun'iy intellekt startaplarining yiriklashuvi jahon iqtisodiyotiga qanday ta'sir qilmoqda.",
      category: "Iqtisodiyot",
      date: "1-may, 2026"
    }
  },
  "kurumsal-web-sitesi-maliyeti": {
    ru: {
      title: "Сколько стоит разработка корпоративного веб-сайта в 2026 году?",
      excerpt: "Подробный разбор факторов ценообразования: дизайн, Next.js архитектура, безопасность, SEO и интеграции.",
      category: "Веб-разработка",
      date: "26 апреля 2026 г."
    },
    uz: {
      title: "2026 yilda korporativ veb-sayt yaratish narxi qancha?",
      excerpt: "Narxni belgilovchi asosiy omillar: dizayn, Next.js arxitekturasi, xavfsizlik, SEO va integratsiyalar tahlili.",
      category: "Veb dasturlash",
      date: "26-aprel, 2026"
    }
  },
  "kurumsal-web-sitesi-ux-hatalari": {
    ru: {
      title: "7 фатальных UX-ошибок корпоративных сайтов, убивающих конверсию",
      excerpt: "Как неудачные интерфейсные решения и сложная навигация снижают доверие клиентов и приводят к потере лидов.",
      category: "UX/UI Дизайн",
      date: "22 апреля 2026 г."
    },
    uz: {
      title: "Korporativ saytlarda konversiyani yo'qotuvchi 7 ta jiddiy UX xatosi",
      excerpt: "Noto'g'ri interfeys yechimlari va murakkab navigatsiya mijozlar ishonchini qanday kamaytirishi haqida.",
      category: "UX/UI Dizayn",
      date: "22-aprel, 2026"
    }
  },
  "microservices-vs-monolith-b2b": {
    ru: {
      title: "Микросервисы против Монолита: Что выбрать для B2B в 2026 году?",
      excerpt: "Плюсы, минусы и критерии выбора архитектуры для масштабируемых корпоративных платформ.",
      category: "Архитектура",
      date: "18 апреля 2026 г."
    },
    uz: {
      title: "Mikroservislar yoki Monolit: 2026 yilda B2B uchun qaysi biri to'g'ri?",
      excerpt: "Kengayuvchi korporativ platformalar uchun dasturiy arxitektura tanlash mezonlari va afzalliklari.",
      category: "Arxitektura",
      date: "18-aprel, 2026"
    }
  },
  "mobil-uygulama-gelistirme-sureci": {
    ru: {
      title: "Этапы разработки корпоративного мобильного приложения",
      excerpt: "От идеи и прототипирования до релиза в App Store и масштабирования серверной части.",
      category: "Мобильная разработка",
      date: "14 апреля 2026 г."
    },
    uz: {
      title: "Korporativ mobil ilovalarni ishlab chiqish bosqichlari",
      excerpt: "G'oyadan boshlab prototiplash, App Store ga joylash va server infratuzilmasini kengaytirishgacha.",
      category: "Mobil ilovalar",
      date: "14-aprel, 2026"
    }
  },
  "nextjs-core-web-vitals": {
    ru: {
      title: "Оптимизация Core Web Vitals в Next.js: Скорость 95+",
      excerpt: "Практические советы по оптимизации LCP, FID и CLS для достижения максимальных результатов в Google.",
      category: "Веб-разработка",
      date: "10 апреля 2026 г."
    },
    uz: {
      title: "Next.js da Core Web Vitals optimizatsiyasi: 95+ tezlik",
      excerpt: "Google qidiruvida eng yuqori o'rinlarni olish uchun LCP, FID va CLS ko'rsatkichlarini to'g'ri sozlash.",
      category: "Veb dasturlash",
      date: "10-aprel, 2026"
    }
  },
  "rag-architecture-enterprise-ai": {
    ru: {
      title: "Архитектура RAG: Корпоративный ИИ без галлюцинаций",
      excerpt: "Как Retrieval-Augmented Generation соединяет векторные базы данных с языковыми моделями для точных ответов.",
      category: "Искусственный интеллект",
      date: "6 апреля 2026 г."
    },
    uz: {
      title: "RAG arxitekturasi: Aniq va xatosiz korporativ AI tizimlari",
      excerpt: "Retrieval-Augmented Generation texnologiyasi vektorli bazalarni til modellari bilan qanday bog'laydi.",
      category: "Sun'iy intellekt",
      date: "6-aprel, 2026"
    }
  },
  "saas-nedir-b2b-rehberi": {
    ru: {
      title: "Что такое SaaS? Полное B2B руководство по модели программного обеспечения",
      excerpt: "Преимущества облачных подписок, метрики MRR/ARR, снижение оттока (Churn) и модели монетизации.",
      category: "SaaS",
      date: "2 апреля 2026 г."
    },
    uz: {
      title: "SaaS nima? Dasturiy ta'minot modeli bo'yicha to'liq B2B qo'llanma",
      excerpt: "Bulutli obunalar afzalligi, MRR/ARR metrikalari, mijozlarni saqlab qolish va monetizatsiya yo'llari.",
      category: "SaaS",
      date: "2-aprel, 2026"
    }
  },
  "seo-automation-nextjs": {
    ru: {
      title: "Автоматизация SEO в Next.js: Динамические карты сайта и Schema.org",
      excerpt: "Как настроить автоматическую генерацию метаданных, OpenGraph изображений и микроразметки для тысяч страниц.",
      category: "SEO и Аналитика",
      date: "28 марта 2026 г."
    },
    uz: {
      title: "Next.js da SEO avtomatlashtirish: Dinamik sayt xaritalari va Schema.org",
      excerpt: "Minglab sahifalar uchun metadata, OpenGraph rasmlari va mikroma'lumotlarni avtomatik yaratish.",
      category: "SEO va Tahlil",
      date: "28-mart, 2026"
    }
  },
  "teknik-yigini-isinizi-neden-yavaslatiyor": {
    ru: {
      title: "Почему устаревший технологический стек тормозит ваш бизнес?",
      excerpt: "Скрытые затраты на технический долг, риски безопасности и потеря клиентов из-за медленных систем.",
      category: "Консалтинг",
      date: "24 марта 2026 г."
    },
    uz: {
      title: "Nima uchun eskirgan texnologik tizim biznesingizni sekinlashtiradi?",
      excerpt: "Texnik qarzlar, xavfsizlik xatarlari va sekin tizimlar sababli mijozlarni yo'qotishning yashirin xarajatlari.",
      category: "Konsalting",
      date: "24-mart, 2026"
    }
  },
  "typescript-enterprise-codebases": {
    ru: {
      title: "TypeScript в масштабных корпоративных кодовых базах",
      excerpt: "Строгая типизация, предотвращение багов на этапе сборки и ускорение командной разработки.",
      category: "Технологии",
      date: "20 марта 2026 г."
    },
    uz: {
      title: "Yirik korporativ loyihalarda TypeScript dan foydalanish",
      excerpt: "Qat'iy turlash, xatolarni oldindan aniqlash va dasturchilar jamoasining ish unumdorligini oshirish.",
      category: "Texnologiyalar",
      date: "20-mart, 2026"
    }
  },
  "walmart-perakende-devinin-hikayesi": {
    ru: {
      title: "История Walmart: От первого магазина до гиганта глобального ритейла",
      excerpt: "Уроки управления цепочками поставок, ценообразования и цифровой трансформации для современного e-commerce.",
      category: "Электронная коммерция",
      date: "16 марта 2026 г."
    },
    uz: {
      title: "Walmart tarixi: Kichik do'kondan global savdo gigantigacha",
      excerpt: "Yetkazib berish zanjiri, narx belgilash va raqamli transformatsiya bo'yicha zamonaviy savdo darslari.",
      category: "Elektron tijorat",
      date: "16-mart, 2026"
    }
  },
  "walmart-vs-ebay-karsilastirma": {
    ru: {
      title: "Walmart против eBay: Сравнение маркетплейсов для онлайн-продаж 2026",
      excerpt: "Комиссии, требования к продавцам, объемы трафика и прибыльность: где выгоднее развивать бизнес?",
      category: "Электронная коммерция",
      date: "12 марта 2026 г."
    },
    uz: {
      title: "Walmart va eBay: 2026 yilda onlayn savdo platformalarini taqqoslash",
      excerpt: "Komissiyalar, sotuvchilarga qo'yiladigan talablar va daromadlilik: biznesni qayerda boshlagan ma'qul?",
      category: "Elektron tijorat",
      date: "12-mart, 2026"
    }
  },
  "xiaomi-mimo-code-acik-kaynak": {
    ru: {
      title: "Xiaomi Mimo Code и развитие Open Source решений в 2026 году",
      excerpt: "Влияние открытого исходного кода на разработку корпоративного ПО и оптимизацию аппаратных средств.",
      category: "Технологии",
      date: "8 марта 2026 г."
    },
    uz: {
      title: "Xiaomi Mimo Code va 2026 yilda Open Source yechimlarning rivoji",
      excerpt: "Ochiq kodli dasturlar korporativ tizimlar va apparat optimizatsiyasiga qanday ta'sir ko'rsatmoqda.",
      category: "Texnologiyalar",
      date: "8-mart, 2026"
    }
  },
  "yapay-zeka-calisma-arkadasi-2026": {
    ru: {
      title: "ИИ как ваш коллега в 2026 году: Новые стандарты продуктивности",
      excerpt: "Как искусственный интеллект становится персональным ассистентом инженеров, маркетологов и менеджеров.",
      category: "Искусственный интеллект",
      date: "4 марта 2026 г."
    },
    uz: {
      title: "2026 yilda AI sizning hamkasbingiz: Yangi unumdorlik standartlari",
      excerpt: "Sun'iy intellekt muhandislar, marketologlar va rahbarlar uchun qanday qilib shaxsiy yordamchiga aylanmoqda.",
      category: "Sun'iy intellekt",
      date: "4-mart, 2026"
    }
  },
  "yapay-zeka-is-dunyasi-2026": {
    ru: {
      title: "Искусственный интеллект и трансформация бизнеса в 2026 году",
      excerpt: "Главные направления внедрения машинного обучения для оптимизации затрат и повышения рентабельности.",
      category: "Искусственный интеллект",
      date: "1 марта 2026 г."
    },
    uz: {
      title: "2026 yilda sun'iy intellekt va biznes olamining transformatsiyasi",
      excerpt: "Xarajatlarni kamaytirish va daromadni oshirish uchun mashinali o'rganishni joriy etishning asosiy yo'nalishlari.",
      category: "Sun'iy intellekt",
      date: "1-mart, 2026"
    }
  }
};

function updateAll() {
  const enDir = path.join(process.cwd(), 'content', 'blog', 'en');
  const ruDir = path.join(process.cwd(), 'content', 'blog', 'ru');
  const uzDir = path.join(process.cwd(), 'content', 'blog', 'uz');

  const files = fs.readdirSync(enDir).filter(f => f.endsWith('.mdx'));

  for (const f of files) {
    const slug = f.replace('.mdx', '');
    const enFile = fs.readFileSync(path.join(enDir, f), 'utf-8');
    const fmMatch = enFile.match(/---\n([\s\S]*?)\n---/);
    const body = fmMatch ? enFile.replace(fmMatch[0], '').trim() : enFile;
    
    if (TRANSLATIONS[slug]) {
      const t = TRANSLATIONS[slug];
      
      const ruContent = `---
title: "${t.ru.title}"
excerpt: "${t.ru.excerpt}"
date: "${t.ru.date}"
category: "${t.ru.category}"
author: "Melih Bıçak"
dateISO: "2026-06-24"
---
${body}`;
      fs.writeFileSync(path.join(ruDir, f), ruContent.trim() + '\n', 'utf-8');

      const uzContent = `---
title: "${t.uz.title}"
excerpt: "${t.uz.excerpt}"
date: "${t.uz.date}"
category: "${t.uz.category}"
author: "Melih Bıçak"
dateISO: "2026-06-24"
---
${body}`;
      fs.writeFileSync(path.join(uzDir, f), uzContent.trim() + '\n', 'utf-8');
    }
  }

  console.log(`Updated frontmatter metadata for ${Object.keys(TRANSLATIONS).length} articles in RU and UZ!`);
}

updateAll();
