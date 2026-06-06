import { Metadata } from 'next';
import { ArrowLeft, Globe, Zap, Search } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kapsamlı Web Platformları | Allmysell LLC',
  description: 'Kurumsal seviyede, yüksek performanslı ve tam anlamıyla SEO uyumlu modern web platformları inşa ediyoruz. Dijital kimliğinizi baştan kurgulayın.',
  keywords: 'kurumsal web tasarımı, web platformu geliştirme, seo uyumlu web sitesi, miami web ajansı, yüksek performanslı siteler, dijital dönüşüm',
};

export default function WebCozumleri() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A192F] selection:bg-[#0A192F] selection:text-white pb-32">
      {/* Abstract Header Background */}
      <div className="w-full h-[40vh] bg-[#0A192F] relative overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-blue-500/20 rounded-full blur-[120px]"></div>
        <div className="max-w-4xl mx-auto w-full px-6 lg:px-12 pb-16 relative z-10">
          <Link href="/#services" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
            <ArrowLeft className="w-4 h-4" /> Hizmetlere Dön
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
              <Globe className="w-6 h-6 text-blue-300" />
            </div>
            <span className="text-blue-300 font-semibold tracking-widest uppercase text-xs">Teknoloji & Tasarım</span>
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Kapsamlı Web Platformları
          </h1>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 lg:px-12 mt-16 font-sans">
        <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
          <p className="text-2xl font-light text-[#0A192F] leading-relaxed mb-10 border-l-4 border-blue-600 pl-6">
            Günümüz rekabet koşullarında standart bir web sitesine sahip olmak artık yeterli değil. Tüketici alışkanlıkları hızla değişirken, dijital varlığınızın milisaniyeler içinde reaksiyon verebilen, arama motorlarında dominasyon kuran yaşayan bir platform olması şart.
          </p>

          <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">Mimari Yaklaşımımız</h2>
          <p>
            Allmysell LLC olarak web platformlarını sıradan birer "dijital kartvizit" olmaktan çıkarıyoruz. Projelerimizi Next.js ve React gibi modern framework'ler üzerine inşa ediyor, sunucu tarafı render etme (SSR) yetenekleriyle sıfır gecikme hedefliyoruz. Bu mimari yaklaşım, sadece kullanıcı deneyimini kusursuzlaştırmakla kalmıyor; Google'ın Core Web Vitals metriklerinde en üst skorları almanızı garantileyerek organik trafiğinizi ciddi oranda artırıyor.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <Zap className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">Hiper Performans</h3>
              <p className="text-slate-500">Statik üretim ve edge network kullanımıyla dünyanın her yerinden anında yüklenen, pürüzsüz arayüzler sunuyoruz.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <Search className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">Yerleşik SEO Altyapısı</h3>
              <p className="text-slate-500">Arama motoru botlarının kusursuzca okuyabileceği semantik HTML ve dinamik meta etiketleriyle görünürlüğünüzü maksimize ediyoruz.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">Kullanıcı Odaklı Tasarım (UX/UI)</h2>
          <p>
            Mükemmel kodlanmış bir altyapı, ancak kusursuz bir tasarımla birleştiğinde gerçek potansiyeline ulaşır. Veri odaklı kullanıcı deneyimi (UX) testlerimiz ve endüstri standartlarını belirleyen arayüz (UI) tasarımlarımızla, ziyaretçileri müşteriye dönüştüren "dönüşüm hunileri" tasarlıyoruz. Her bir butonun konumu, renk psikolojisi ve tipografik hiyerarşi, markanızın kurumsal ağırlığını yansıtacak şekilde özel olarak kurgulanıyor.
          </p>

          <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">Sürdürülebilirlik ve Güvenlik</h2>
          <p>
            Geliştirdiğimiz platformlar, geleceğin teknolojilerine entegre olabilecek modüler yapıda kurgulanır. İhtiyaçlarınız büyüdüğünde sistemin yeniden yazılmasına gerek kalmaz. Üstelik kurumsal verileriniz ve müşteri bilgileriniz, en güncel şifreleme protokolleriyle korunarak tam bir dijital zırh içine alınır.
          </p>
        </div>
      </article>
    </div>
  );
}
