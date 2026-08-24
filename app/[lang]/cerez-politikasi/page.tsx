import { Metadata } from 'next';
import { ArrowLeft, Cookie } from 'lucide-react';
import Link from 'next/link';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'Cookie Policy',
      description: 'Cookie Policy and usage guidelines for Allmysell LLC. Learn how we use cookies to improve your experience.',
      keywords: 'cookie policy, tracking, cookies, allmysell cookies, user experience',
    },
    back: 'Back to Home',
    tag: 'Transparency',
    title: 'Cookie Policy',
    last_updated: 'Last Updated: June 2026',
    sections: [
      {
        title: '1. What are Cookies?',
        content: 'Cookies are small text files that are placed on your computer or mobile device when you browse websites. Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.'
      },
      {
        title: '2. How We Use Cookies',
        content: 'We use cookies to: Make our website work as you\'d expect, Remember your settings during and between visits, Improve the speed/security of the site, Allow you to share pages with social networks, and Continuously improve our website for you.'
      },
      {
        title: '3. Types of Cookies We Use',
        content: 'Strictly Necessary Cookies: These are cookies that are required for the operation of our website. Analytical/Performance Cookies: They allow us to recognise and count the number of visitors and to see how visitors move around our website. Functionality Cookies: These are used to recognise you when you return to our website.'
      },
      {
        title: '4. Managing Cookies',
        content: 'You can block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our website.'
      }
    ]
  },
  tr: {
    meta: {
      title: 'Çerez Politikası',
      description: 'Allmysell LLC Çerez Politikası ve kullanım yönergeleri. Deneyiminizi iyileştirmek için çerezleri nasıl kullandığımızı öğrenin.',
      keywords: 'çerez politikası, izleme, çerezler, allmysell çerezleri, kullanıcı deneyimi',
    },
    back: 'Anasayfaya Dön',
    tag: 'Şeffaflık',
    title: 'Çerez Politikası',
    last_updated: 'Son Güncelleme: Haziran 2026',
    sections: [
      {
        title: '1. Çerezler Nedir?',
        content: 'Çerezler, web sitelerini taradığınızda bilgisayarınıza veya mobil cihazınıza yerleştirilen küçük metin dosyalarıdır. Web sitemiz, sizi web sitemizin diğer kullanıcılarından ayırmak için çerezler kullanır. Bu, web sitemizde gezinirken size iyi bir deneyim sunmamıza ve sitemizi geliştirmemize yardımcı olur.'
      },
      {
        title: '2. Çerezleri Nasıl Kullanıyoruz',
        content: 'Çerezleri şu amaçlarla kullanırız: Web sitemizin beklediğiniz gibi çalışmasını sağlamak, Ziyaretler sırasında ve ziyaretler arasında ayarlarınızı hatırlamak, Sitenin hızını/güvenliğini artırmak, Sayfaları sosyal ağlarda paylaşmanıza izin vermek ve Web sitemizi sizin için sürekli iyileştirmek.'
      },
      {
        title: '3. Kullandığımız Çerez Türleri',
        content: 'Kesinlikle Gerekli Çerezler: Bunlar web sitemizin çalışması için gerekli olan çerezlerdir. Analitik/Performans Çerezleri: Ziyaretçileri tanımamızı, saymamızı ve ziyaretçilerin web sitemizde nasıl gezindiğini görmemizi sağlar. İşlevsellik Çerezleri: Bunlar, web sitemize döndüğünüzde sizi tanımak için kullanılır.'
      },
      {
        title: '4. Çerezleri Yönetme',
        content: 'Tarayıcınızda tüm veya bazı çerezlerin ayarlanmasını reddetmenize olanak tanıyan ayarı etkinleştirerek çerezleri engelleyebilirsiniz. Ancak, tarayıcı ayarlarınızı kullanarak tüm çerezleri (temel çerezler dahil) engellerseniz web sitemizin tamamına veya bazı bölümlerine erişemeyebilirsiniz.'
      }
    ]
  },
  ru: {
    meta: {
      title: 'Политика Файлов Cookie',
      description: 'Политика использования файлов cookie компании Allmysell LLC. Узнайте, как мы используем cookie для улучшения вашего опыта.',
      keywords: 'политика cookie, файлы cookie, отслеживание, пользовательский опыт, allmysell',
    },
    back: 'На Главную',
    tag: 'Прозрачность',
    title: 'Политика Файлов Cookie',
    last_updated: 'Последнее обновление: Июнь 2026',
    sections: [
      {
        title: '1. Что такое файлы Cookie?',
        content: 'Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем компьютере или мобильном устройстве при посещении веб-сайтов. Наш сайт использует файлы cookie, чтобы отличать вас от других пользователей.'
      },
      {
        title: '2. Как мы используем файлы Cookie',
        content: 'Мы используем файлы cookie для: обеспечения корректной работы сайта, сохранения ваших настроек, повышения скорости и безопасности, а также непрерывного улучшения интерфейса.'
      },
      {
        title: '3. Типы используемых файлов Cookie',
        content: 'Строго необходимые cookie (для базовой работы сайта), аналитические cookie (для подсчета посещаемости и оптимизации страниц) и функциональные cookie (для сохранения ваших персональных предпочтений).'
      },
      {
        title: '4. Управление файлами Cookie',
        content: 'Вы можете заблокировать файлы cookie в настройках вашего браузера. Однако отключение всех файлов cookie может привести к ограничению доступа к некоторым функциям сайта.'
      }
    ]
  },
  uz: {
    meta: {
      title: 'Kuki Siyosati',
      description: 'Allmysell LLC Kuki siyosati va ulardan foydalanish qoidalari. Foydalanuvchi tajribasini oshirish haqida ma\'lumot oling.',
      keywords: 'kuki siyosati, cookie fayllari, kuzatuv, foydalanuvchi tajribasi, allmysell',
    },
    back: 'Bosh Sahifaga Qaytish',
    tag: 'Shaffoflik',
    title: 'Kuki Siyosati',
    last_updated: 'Oxirgi yangilanish: Iyun 2026',
    sections: [
      {
        title: '1. Kuki nima?',
        content: 'Kukilar (cookies) — veb-saytlarni ko\'rib chiqqaningizda kompyuteringiz yoki mobil qurilmangizga joylashtiriladigan kichik matnli fayllar. Saytimiz sizni boshqa foydalanuvchilardan ajratish uchun kukilardan foydalanadi.'
      },
      {
        title: '2. Kukilardan qanday foydalanamiz',
        content: 'Biz kukilardan saytning to\'g\'ri ishlashini ta\'minlash, sozlamalarni eslab qolish, sayt tezligi va xavfsizligini oshirish hamda xizmatlarimizni doimiy yaxshilash uchun foydalanamiz.'
      },
      {
        title: '3. Foydalaniladigan kuki turlari',
        content: 'Majburiy kukilar (sayt ishlashi uchun zarur), tahliliy kukilar (tashrif buyuruvchilar sonini hisoblash va saytni yaxshilash uchun) va funksional kukilar (tanlagan sozlamalaringizni eslab qolish uchun).'
      },
      {
        title: '4. Kukilarni boshqarish',
        content: 'Brauzeringiz sozlamalarida kukilarni bloklashingiz mumkin. Biroq, barcha kukilarni bloklash saytning ayrim funksiyalaridan foydalanishni cheklashi mumkin.'
      }
    ]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  return {
    ...data.meta,
    alternates: constructAlternates('cookie-policy', 'cerez-politikasi', lang, 'politika-kuki', 'kuki-siyosati')
  };
}

export default async function CerezPolitikasi({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params)?.lang || 'en';
  const dict = content[lang as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A192F] selection:bg-[#0A192F] selection:text-white pb-32">
      <div className="w-full h-[30vh] bg-[#0A192F] relative overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-indigo-500/20 rounded-full blur-[120px]"></div>
        <div className="max-w-3xl mx-auto w-full px-6 lg:px-12 pb-16 relative z-10">
          <Link prefetch={false} href={`/${lang}`} className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
            <ArrowLeft className="w-4 h-4" /> {dict.back}
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
              <Cookie className="w-5 h-5 text-indigo-300" />
            </div>
            <span className="text-indigo-300 font-semibold tracking-widest uppercase text-xs">{dict.tag}</span>
          </div>
          <h1 className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {dict.title}
          </h1>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 lg:px-12 mt-16 font-sans">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-indigo-600 mb-8 pb-8 border-b border-slate-100 uppercase tracking-widest">
            {dict.last_updated}
          </p>
          
          <div className="space-y-10">
            {dict.sections.map((section, idx) => (
              <section key={idx}>
                <h2 className="text-xl font-bold text-[#0A192F] mb-4">{section.title}</h2>
                <p className="text-slate-600 leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
