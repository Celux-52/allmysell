import { Metadata } from 'next';
import { ArrowLeft, Smartphone, Zap, Layers } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mobil Uygulama Geliştirme | Allmysell LLC',
  description: 'iOS ve Android için yüksek performanslı, native hissi veren ve anında ölçeklenebilen kurumsal mobil uygulamalar geliştiriyoruz.',
  keywords: 'mobil uygulama geliştirme, ios uygulama, android uygulama, react native, kurumsal mobil yazılım, miami uygulama geliştirici, mobil ux',
};

export default function MobilUygulama() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A192F] selection:bg-[#0A192F] selection:text-white pb-32">
      {/* Abstract Header Background */}
      <div className="w-full h-[40vh] bg-[#0A192F] relative overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-indigo-500/20 rounded-full blur-[120px]"></div>
        <div className="max-w-4xl mx-auto w-full px-6 lg:px-12 pb-16 relative z-10">
          <Link href="/#services" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
            <ArrowLeft className="w-4 h-4" /> Hizmetlere Dön
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
              <Smartphone className="w-6 h-6 text-indigo-300" />
            </div>
            <span className="text-indigo-300 font-semibold tracking-widest uppercase text-xs">Bağlantı & Deneyim</span>
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Mobil Uygulamalar
          </h1>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 lg:px-12 mt-16 font-sans">
        <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
          <p className="text-2xl font-light text-[#0A192F] leading-relaxed mb-10 border-l-4 border-indigo-600 pl-6">
            Müşterilerinizin cebindeki ekrana ulaşmak, marka bağlılığının en üst noktasıdır. Hantal çalışan, donan, kullanıcıyı yoran uygulamaların aksine; ekranda kayarken su gibi akan, modern ve kararlı mobil ekosistemler inşa ediyoruz.
          </p>

          <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">Kusursuz Mimari ve Performans</h2>
          <p>
            Native (Swift/Kotlin) kalitesinde hissettiren, modern React Native mimarileriyle tek bir kod tabanı üzerinden hem iOS hem de Android için milyonlarca kullanıcıyı anında ağırlayabilecek altyapılar kuruyoruz. Bir mobil uygulamanın en kritik yanı olan cihaz hafızası optimizasyonu ve düşük pil tüketimi metriklerinde her zaman en üst standartları hedefliyoruz.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <Zap className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">60 FPS Akıcı Deneyim</h3>
              <p className="text-slate-500">Ekran geçişleri ve animasyonlar saniyede 60 kare hızında, pürüzsüz ve sıfır gecikme ile çalışacak şekilde optimize edilir.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <Layers className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">Omnichannel Entegrasyonu</h3>
              <p className="text-slate-500">Mevcut web platformunuz, e-ticaret siteniz ve arka plan sistemlerinizle %100 uyumlu çalışan, senkronize mobil uygulamalar.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">UX Öncelikli Tasarım Felsefesi</h2>
          <p>
            Telefon ekranı, hata affetmeyen dar bir alandır. Kullanıcı deneyimi (UX) uzmanlarımız; başparmak erişim alanlarından (Thumb Zone) göz takibi metriklerine kadar her türlü veriyi analiz ederek, kullanıcıların tek elle bile rahatça kullanabileceği arayüzler tasarlar. Uygulamanız sadece kodlanmaz; alışkanlık yapacak şekilde kurgulanır.
          </p>
        </div>
      </article>
    </div>
  );
}
