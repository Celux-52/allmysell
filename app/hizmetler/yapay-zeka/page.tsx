import { Metadata } from 'next';
import { ArrowLeft, Bot, Sparkles, Database } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Yapay Zeka ve Otomasyon | Allmysell LLC',
  description: 'İşletmenize özel eğitilmiş yapay zeka asistanları (RAG) ve makine öğrenimi algoritmalarıyla veri işleme süreçlerinizi otomatikleştirin.',
  keywords: 'yapay zeka entegrasyonu, makine öğrenimi, kurumsal yapay zeka, rag sistemleri, veri analitiği, miami teknoloji ajansı, otomasyon çözümleri',
};

export default function YapayZeka() {
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
              <Bot className="w-6 h-6 text-blue-300" />
            </div>
            <span className="text-blue-300 font-semibold tracking-widest uppercase text-xs">Yenilik & Gelecek</span>
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Yapay Zeka & Otomasyon
          </h1>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 lg:px-12 mt-16 font-sans">
        <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
          <p className="text-2xl font-light text-[#0A192F] leading-relaxed mb-10 border-l-4 border-blue-600 pl-6">
            Yapay zeka (AI) artık bilim kurgu filmlerinin senaryosu değil, rekabetin en acımasız kuralı. İnsan gücüyle günlerce süren veri analizi ve müşteri hizmetleri operasyonlarını, saniyenin onda biri süresine indiren akıllı sistemlerle tanışın.
          </p>

          <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">Kusursuz Veri Entegrasyonu (RAG)</h2>
          <p>
            Şirketinize ChatGPT gibi genel bir bot değil, kurum içi belgelerinizi, geçmiş satış verilerinizi ve şirket manifestonuzu harfiyen bilen özel bir zeka eğitiyoruz. Retrieval-Augmented Generation (RAG) teknolojisi sayesinde; şirket içi politikalarınızdan haberdar olan asistanlar, çalışanlarınıza veya müşterilerinize sıfır hata toleransıyla anında yanıt verir.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <Database className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">Akıllı Veri İşleme</h3>
              <p className="text-slate-500">Binlerce satırlık Excel veya CRM verisini saniyeler içinde analiz edip, şirketinize doğrudan gelir kazandıracak stratejik içgörüler sunar.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <Sparkles className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">Otonom Müşteri İlişkileri</h3>
              <p className="text-slate-500">Klasik "Şu tuşa basın" diyen robotların aksine; niyet okuyabilen, duygu analizi yapabilen, gerçek bir insan gibi satış kapatan akıllı agent'lar kuruyoruz.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">Maliyet ve Zaman Optimizasyonu</h2>
          <p>
            Kurumsal ölçekte bir yapay zeka entegrasyonu, personel sayısını azaltmak değil; personelinizi monoton işlerden kurtarıp yaratıcı ve stratejik alanlara odaklamanızı sağlar. Otomatize edilen her bir operasyonel süreç, doğrudan şirketinizin kar marjına ve büyüme hızına ivme kazandırır.
          </p>
        </div>
      </article>
    </div>
  );
}
