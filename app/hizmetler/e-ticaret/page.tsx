import { Metadata } from 'next';
import { ArrowLeft, ShoppingCart, Box, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'E-Ticaret Otonomisi | Allmysell LLC',
  description: 'Satış, lojistik ve stok süreçlerinizi yapay zeka ve otomasyonlarla yöneten yenilikçi e-ticaret altyapıları kuruyoruz.',
  keywords: 'e-ticaret altyapısı, e-ticaret otomasyonu, b2b e-ticaret, b2c e-ticaret çözümleri, miami yazılım ajansı, otonom ticaret',
};

export default function ETicaret() {
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
              <ShoppingCart className="w-6 h-6 text-indigo-300" />
            </div>
            <span className="text-indigo-300 font-semibold tracking-widest uppercase text-xs">Satış & Dönüşüm</span>
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            E-Ticaret Otonomisi
          </h1>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 lg:px-12 mt-16 font-sans">
        <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
          <p className="text-2xl font-light text-[#0A192F] leading-relaxed mb-10 border-l-4 border-indigo-600 pl-6">
            E-ticaret yalnızca ürünleri listelemekten ibaret değildir. Siparişten kargolamaya, müşteri ilişkilerinden iade yönetimine kadar uzanan devasa bir operasyondur. Başarılı markalar, bu süreçleri insan hatalarından arındırarak otonom sistemlere emanet edenlerdir.
          </p>

          <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">İnsansız ve Kayıpsız Operasyonlar</h2>
          <p>
            Geleneksel e-ticaret sitelerinin en büyük problemi, işletmeyi manuel süreçlerin yavaşlığına mahkum etmesidir. Allmysell LLC olarak kurduğumuz otonom e-ticaret mimarileri; ERP yazılımlarınız, kargo firmalarınız ve tedarik zincirinizle tam entegre çalışır. Bir sipariş geldiği anda fatura otomatik kesilir, kargo barkodu basılır ve stoklar tüm pazaryerlerinde (marketplace) eş zamanlı olarak güncellenir.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <Box className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">Entegre Stok Yönetimi</h3>
              <p className="text-slate-500">Tüm satış kanallarınızdaki verileri tek bir merkezden, sıfır hata toleransıyla anlık olarak yönetin ve analiz edin.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <TrendingUp className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">Yüksek Dönüşüm Optimizasyonu</h3>
              <p className="text-slate-500">Sepeti terk etme oranlarını düşüren akıllı ödeme (checkout) sayfaları ve yapay zeka destekli ürün önerileri.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">Kişiselleştirilmiş Alışveriş Deneyimi</h2>
          <p>
            Standart ve herkese aynı görünen mağazalar dönemi sona erdi. Müşterilerinizin geçmiş davranışlarını, incelediği kategorileri ve demografik yapılarını analiz eden yapay zeka algoritmalarımız sayesinde, mağazanız her ziyaretçiye özel bir vitrin sunar. Bu hiper-kişiselleştirme stratejisi, müşteri sadakatini (LTV) ve ortalama sepet tutarını (AOV) ciddi ölçüde yukarı çeker.
          </p>

          <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">Ölçeklenebilirlik</h2>
          <p>
            Kampanya dönemlerinde, Black Friday gibi yüksek trafikli günlerde sisteminizin çökmesi, ciro kaybından çok marka itibarınıza zarar verir. Kurduğumuz bulut tabanlı e-ticaret altyapıları, trafik aniden 100 katına çıksa bile sunucu kaynaklarını otomatik olarak artırır (auto-scaling) ve müşterilerinize kesintisiz bir deneyim sunmaya devam eder.
          </p>
        </div>
      </article>
    </div>
  );
}
