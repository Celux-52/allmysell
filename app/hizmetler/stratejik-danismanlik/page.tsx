import { Metadata } from 'next';
import { ArrowLeft, Layers, Compass, Target } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Stratejik Danışmanlık | Allmysell LLC',
  description: 'Projenizin iş modelini, pazar payını ve sürdürülebilir büyüme adımlarını baştan kurguluyoruz. Veri odaklı stratejik teknoloji danışmanlığı.',
  keywords: 'teknoloji danışmanlığı, dijital dönüşüm, stratejik planlama, iş modeli kurgusu, miami danışmanlık firması, sürdürülebilir büyüme',
};

export default function StratejikDanismanlik() {
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
              <Layers className="w-6 h-6 text-blue-300" />
            </div>
            <span className="text-blue-300 font-semibold tracking-widest uppercase text-xs">Yönetim & Büyüme</span>
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Stratejik Danışmanlık
          </h1>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 lg:px-12 mt-16 font-sans">
        <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
          <p className="text-2xl font-light text-[#0A192F] leading-relaxed mb-10 border-l-4 border-blue-600 pl-6">
            Yalnızca kod yazarak devasa markalar yaratamazsınız. Bir teknolojinin başarılı olabilmesi için doğru iş modeline, pazarın ihtiyaçlarına ve sürdürülebilir bir büyüme stratejisine dayanması gerekir. Biz, tam olarak bu köprüyü kuruyoruz.
          </p>

          <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">Kodlamadan Önce Planlama</h2>
          <p>
            Dijital dünyada yapılan en büyük yatırım hatası, pazar araştırması ve iş modeli kurgulanmadan doğrudan yazılıma başlanmasıdır. Allmysell LLC olarak masaya oturduğumuz ilk andan itibaren, kodlama jargonlarını bir kenara bırakıp sizinle birer iş ortağı gibi pazar stratejileri geliştiriyoruz. Ürünün hedef kitlesi kim? Rakipler nerede hata yapıyor? Gelir modeli nasıl oluşturulmalı? Bu soruların net yanıtları olmadan tek bir satır kod yazmıyoruz.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <Compass className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">Dijital Dönüşüm Yol Haritası</h3>
              <p className="text-slate-500">Mevcut sistemlerinizi analiz edip, şirketinizi dijital çağa adapte edecek en doğru teknoloji yığınını (Tech Stack) belirliyoruz.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <Target className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">Pazara Giriş ve Büyüme</h3>
              <p className="text-slate-500">Geliştirdiğimiz ürünlerin pazar entegrasyonu için reklam stratejileri, veri analitiği ve pazarlama otomasyonları kuruyoruz.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">Veri Odaklı Karar Alma</h2>
          <p>
            İçgüdüler ticaretin doğasında vardır, ancak günümüz ekonomisinde kararları veriler vermelidir. Şirketinizin mevcut verilerini yapılandırıyor, anlamlandırıyor ve karmaşık tabloları net içgörülere çeviriyoruz. Satış eğilimleri, müşteri kayıp oranları (Churn Rate) veya maliyet analizleri üzerinden şirketin rotasını yeniden çiziyoruz.
          </p>

          <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">Ekip ve Kültür İnşası</h2>
          <p>
            Yeni kurulan bir sistemin sürdürülebilir olması, ancak o sistemi kullanacak doğru ekiple mümkündür. Teknolojik altyapınızı kurmakla kalmıyor, ekiplerinize bu sistemlerin eğitimi, çevik (Agile) yönetim kültürünün benimsetilmesi ve kurum içi inovasyon süreçlerinin hızlandırılması konusunda aktif mentorluk sağlıyoruz.
          </p>
        </div>
      </article>
    </div>
  );
}
