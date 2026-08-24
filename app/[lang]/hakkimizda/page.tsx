import { Metadata } from 'next';
import { ArrowLeft, Users, Target, Shield, Rocket } from 'lucide-react';
import Link from 'next/link';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'About Us',
      description: 'We are Allmysell LLC, a St. Petersburg, FL-based enterprise software and digital transformation agency. We act as your fractional CTO and build high-performance scalable systems.',
      keywords: 'about allmysell, software agency st petersburg, enterprise software company, digital transformation team, fractional cto',
    },
    back: 'Back to Home',
    tag: 'Who We Are',
    title: 'Architects of the Digital Future',
    p1: 'Founded in St. Petersburg, Florida, Allmysell LLC was born out of a simple frustration: The market was flooded with "agencies" delivering bloated, slow, and unscalable websites built on outdated templates. We believed B2B enterprises and fast-growing startups deserved better. They deserved engineering, not just design.',
    h2_1: 'More Than Just an Agency',
    p2: 'We do not view ourselves as a traditional software outsourcing agency. When you partner with Allmysell LLC, we become your dedicated Fractional CTO. We embed ourselves into your business model, understand your pain points, and engineer scalable systems (React, Next.js, Headless Architectures) that solve real operational bottlenecks.',
    h2_2: 'Our Core Philosophy',
    f1_title: 'Uncompromising Performance',
    f1_desc: 'We refuse to ship anything that doesn\'t meet the highest Core Web Vitals standards. Speed is not a luxury; it is a fundamental right of modern commerce.',
    f2_title: 'Security by Design',
    f2_desc: 'In an era of relentless cyber threats, we build digital fortresses. From strict CSPs to end-to-end encryption, your corporate data is secured.',
    f3_title: 'Sustainable Scalability',
    f3_desc: 'We build systems that scale horizontally. Whether you have 100 or 1,000,000 concurrent users, the infrastructure auto-scales effortlessly.',
    h2_3: 'Global Vision, Local Expertise',
    p3: 'While our roots are in St. Petersburg, FL, our reach is global. We have successfully led digital transformations for companies across North America, Europe, and Turkey, bridging the gap between cutting-edge Silicon Valley tech and local market dynamics.'
  },
  tr: {
    meta: {
      title: 'Hakkımızda',
      description: 'St. Petersburg, Florida merkezli kurumsal yazılım ve dijital dönüşüm ajansı Allmysell LLC. Fractional CTO\'nuz olarak yüksek performanslı, ölçeklenebilir sistemler inşa ediyoruz.',
      keywords: 'allmysell kimdir, yazılım ajansı st petersburg, kurumsal yazılım şirketi, dijital dönüşüm ekibi, fractional cto',
    },
    back: 'Anasayfaya Dön',
    tag: 'Biz Kimiz?',
    title: 'Dijital Geleceğin Mimarları',
    p1: 'St. Petersburg, Florida merkezli olarak kurulan Allmysell LLC, basit bir hayal kırıklığından doğdu: Piyasa, eski şablonlar üzerine inşa edilmiş hantal, yavaş ve ölçeklenemeyen web siteleri teslim eden "ajanslarla" doluydu. B2B kurumsal şirketlerin ve hızla büyüyen girişimlerin (startup) çok daha iyisini hak ettiğine inandık. Onlar sadece şık bir tasarım değil, gerçek mühendislik hak ediyordu.',
    h2_1: 'Sıradan Bir Ajanstan Çok Daha Fazlası',
    p2: 'Kendimizi geleneksel bir yazılım taşeronu olarak görmüyoruz. Allmysell LLC ile ortaklık kurduğunuzda, sizin atanmış "Fractional CTO"nuz (Yarı Zamanlı Teknoloji Lideri) oluyoruz. İş modelinize entegre oluyor, operasyonel darboğazlarınızı anlıyor ve bu sorunları çözen (React, Next.js, Headless mimariler vb.) ölçeklenebilir sistemler mühendisliği yapıyoruz.',
    h2_2: 'Temel Felsefemiz',
    f1_title: 'Ödün Verilmeyen Performans',
    f1_desc: 'En yüksek Core Web Vitals standartlarını karşılamayan hiçbir işi canlıya almıyoruz. Hız bir lüks değil, modern ticaretin temel kuralıdır.',
    f2_title: 'Tasarım Aşamasında Güvenlik (Security by Design)',
    f2_desc: 'Siber tehditlerin arttığı bir çağda dijital kaleler inşa ediyoruz. Sıkı CSP\'lerden uçtan uca şifrelemeye kadar kurumsal verileriniz güvende.',
    f3_title: 'Sürdürülebilir Ölçeklenebilirlik',
    f3_desc: 'Yatay olarak ölçeklenebilen sistemler kuruyoruz. 100 veya 1.000.000 anlık kullanıcınız olsun, altyapı sorunsuz bir şekilde otomatik olarak ölçeklenir.',
    h2_3: 'Global Vizyon, Yerel Uzmanlık',
    p3: 'Köklerimiz St. Petersburg, Florida\'da olsa da vizyonumuz globaldir. Kuzey Amerika, Avrupa ve Türkiye\'deki şirketler için dijital dönüşümlere başarıyla liderlik ettik; Silikon Vadisi\'nin en son teknolojisi ile yerel pazar dinamikleri arasındaki köprüyü kurduk.'
  },
  ru: {
    meta: {
      title: 'О нас',
      description: 'Allmysell LLC — агентство корпоративного ПО и цифровой трансформации из Сент-Питерсберга, Флорида. Мы выступаем вашим Fractional CTO и создаем высокопроизводительные системы.',
      keywords: 'о компании allmysell, агентство разработки по сент питерсберг, компания корпоративного по, команда цифровой трансформации, fractional cto',
    },
    back: 'На Главную',
    tag: 'Кто Мы',
    title: 'Архитекторы Цифрового Будущего',
    p1: 'Основанная в Сент-Питерсберге, штат Флорида, компания Allmysell LLC родилась из простого разочарования: рынок был переполнен «агентствами», поставлявшими медленные, громоздкие и немасштабируемые сайты на устаревших шаблонах. Мы верили, что B2B-предприятия и быстрорастущие стартапы заслуживают лучшего — настоящей инженерии, а не просто дизайна.',
    h2_1: 'Больше, Чем Просто Агентство',
    p2: 'Мы не считаем себя традиционным аутсорсинговым агентством. Работая с Allmysell LLC, вы получаете выделенного Fractional CTO (технического директора). Мы погружаемся в вашу бизнес-модель, устраняем операционные барьеры и разрабатываем масштабируемые системы (React, Next.js, Headless архитектуры).',
    h2_2: 'Наша Философия',
    f1_title: 'Бескомпромиссная Производительность',
    f1_desc: 'Мы не выпускаем ничего, что не соответствует высочайшим стандартам Core Web Vitals. Скорость — это фундаментальное требование современного бизнеса.',
    f2_title: 'Безопасность на Уровне Архитектуры',
    f2_desc: 'В эпоху киберугроз мы строим цифровые крепости. От строгих CSP до сквозного шифрования — ваши корпоративные данные надежно защищены.',
    f3_title: 'Устойчивая Масштабируемость',
    f3_desc: 'Мы строим горизонтально масштабируемые системы. Будь у вас 100 или 1 000 000 пользователей одновременно — инфраструктура масштабируется без сбоев.',
    h2_3: 'Глобальное Видение, Локальная Экспертиза',
    p3: 'Наши корни находятся во Флориде, но география нашей работы глобальна. Мы успешно реализовали цифровую трансформацию для компаний в Северной Америке, Европе и Центральной Азии.'
  },
  uz: {
    meta: {
      title: 'Biz Haqimizda',
      description: 'Allmysell LLC — Sent-Pitersberg, Florida shtatida joylashgan korporativ dasturiy ta\'minot va raqamli transformatsiya agentligi. Biz sizning Fractional CTO sifatida yuqori samarali tizimlarni quramiz.',
      keywords: 'allmysell haqida, dasturiy ta\'minot agentligi, korporativ dasturiy kompaniya, raqamli transformatsiya jamoasi, fractional cto',
    },
    back: 'Bosh Sahifaga Qaytish',
    tag: 'Biz Kim Funksiyamiz',
    title: 'Raqamli Kelajakning Me\'morlari',
    p1: 'Sent-Pitersberg, Florida shtatida asos solingan Allmysell LLC oddiy ehtiyojdan paydo bo\'lgan: Bozor eskirgan shablonlarga asoslangan sekin, og\'ir va kengaymaydigan veb-saytlarni yetkazib beradigan "agentliklar" bilan to\'la edi. Biz B2B korxonalari va tez rivojlanayotgan startaplar haqiqiy muhandislikka loyiq ekanligiga ishondik.',
    h2_1: 'Oddiy Agentlikdan Ko\'proq',
    p2: 'Biz o\'zimizni an\'anaviy dasturiy autsorsing agentligi deb hisoblamaymiz. Allmysell LLC bilan hamkorlik qilganingizda, biz sizning tayinlangan Fractional CTO (yarim kunlik texnik direktor) bo\'lamiz. Biz sizning biznes modelingizga chuqur kirib boramiz va muammolarni hal qiladigan kengaytiriladigan tizimlarni (React, Next.js, Headless) quramiz.',
    h2_2: 'Bizning Asosiy Falsafamiz',
    f1_title: 'Murosasiz Tezlik va Ishlash',
    f1_desc: 'Biz Core Web Vitals standartlariga javob bermaydigan hech qanday loyihani ishga tushirmaymiz. Tezlik — zamonaviy savdoning asosiy qoidasidir.',
    f2_title: 'Dizayn Bosqichidagi Xavfsizlik',
    f2_desc: 'Kiberxavflar davrida biz raqamli qal\'alarni quramiz. Qat\'iy CSP protokollaridan tortib to\'liq shifrlashgacha sizning korporativ ma\'lumotlaringiz xavfsiz.',
    f3_title: 'Barqaror Kengayuvchanlik',
    f3_desc: 'Biz gorizontal ravishda kengaytiriladigan tizimlarni quramiz. 100 yoki 1 000 000 faol foydalanuvchingiz bo\'lishidan qat\'i nazar, tizim avtomatik kengayadi.',
    h2_3: 'Global Qarash, Mahalliy Tajriba',
    p3: 'Bizning ildizlarimiz Florida shtatida bo\'lsa-da, qamrovimiz globaldir. Biz Shimoliy Amerika, Yevropa va O\'zbekiston bozorlaridagi kompaniyalarga zamonaviy texnologiyalarni muvaffaqiyatli tatbiq etdik.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  return {
    ...data.meta,
    alternates: constructAlternates('about-us', 'hakkimizda', lang, 'o-nas', 'biz-haqimizda')
  };
}

export default async function Hakkimizda({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params)?.lang || 'en';
  const dict = content[lang as keyof typeof content] || content.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Allmysell LLC",
    "url": "https://allmysell.com",
    "logo": "https://allmysell.com/logo.png",
    "description": dict.meta.description,
    "foundingLocation": {
      "@type": "Place",
      "name": "St. Petersburg, FL"
    },
    "sameAs": [
      "https://www.linkedin.com/company/allmysell",
      "https://twitter.com/allmysell"
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-[#FAFAFA] text-[#0A192F] selection:bg-[#0A192F] selection:text-white pb-32">
        <div className="w-full h-[40vh] bg-[#0A192F] relative overflow-hidden flex items-end">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-blue-500/20 rounded-full blur-[120px]"></div>
          <div className="max-w-4xl mx-auto w-full px-6 lg:px-12 pb-16 relative z-10">
            <Link prefetch={false} href={`/${lang}`} className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
              <ArrowLeft className="w-4 h-4" /> {dict.back}
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                <Users className="w-6 h-6 text-blue-300" />
              </div>
              <span className="text-blue-300 font-semibold tracking-widest uppercase text-xs">{dict.tag}</span>
            </div>
            <h1 className="font-sans text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              {dict.title}
            </h1>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-6 lg:px-12 mt-16 font-sans">
          <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
            <p className="text-2xl font-light text-[#0A192F] leading-relaxed mb-10 border-l-4 border-blue-600 pl-6">
              {dict.p1}
            </p>

            <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">{dict.h2_1}</h2>
            <p>{dict.p2}</p>

            <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">{dict.h2_2}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <Rocket className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-[#0A192F] mb-2">{dict.f1_title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{dict.f1_desc}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <Shield className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-[#0A192F] mb-2">{dict.f2_title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{dict.f2_desc}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <Target className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-[#0A192F] mb-2">{dict.f3_title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{dict.f3_desc}</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">{dict.h2_3}</h2>
            <p>{dict.p3}</p>

          </div>
        </article>
      </div>
    </>
  );
}
