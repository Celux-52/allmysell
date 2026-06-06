import { Metadata } from 'next';
import { ArrowLeft, ShieldCheck, Cpu, Cloud } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Özel SaaS Yazılımları | Allmysell LLC',
  description: 'İşletmenize özel, yüksek güvenlikli, anında ölçeklenebilir ve bulut tabanlı B2B/B2C SaaS (Software as a Service) mimarileri geliştiriyoruz.',
  keywords: 'saas geliştirme, özel yazılım çözümleri, bulut tabanlı yazılımlar, b2b saas, yazılım ajansı, miami saas geliştirici',
};

export default function SaaS() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A192F] selection:bg-[#0A192F] selection:text-white pb-32">
      {/* Abstract Header Background */}
      <div className="w-full h-[40vh] bg-[#0A192F] relative overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-emerald-500/20 rounded-full blur-[120px]"></div>
        <div className="max-w-4xl mx-auto w-full px-6 lg:px-12 pb-16 relative z-10">
          <Link href="/#services" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
            <ArrowLeft className="w-4 h-4" /> Hizmetlere Dön
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <span className="text-emerald-300 font-semibold tracking-widest uppercase text-xs">Bulut & Güvenlik</span>
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Özel SaaS Yazılımları
          </h1>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 lg:px-12 mt-16 font-sans">
        <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
          <p className="text-2xl font-light text-[#0A192F] leading-relaxed mb-10 border-l-4 border-emerald-600 pl-6">
            Hazır paket yazılımlar şirketinizin büyüme hızına ayak uyduramaz. Şirketinizin benzersiz iş akışlarına tam uyum sağlayan, verimliliği en üst düzeye çıkaran bulut tabanlı özel SaaS (Hizmet olarak Yazılım) mimarileriyle tanışın.
          </p>

          <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">İş Süreçlerinizi Özgürleştirin</h2>
          <p>
            Şirket içi sunucuların bakım maliyetleri, veri kaybı riskleri ve ofise bağımlı çalışma modelleri geride kaldı. Modern şirketler; CRM, ERP, proje yönetimi veya sektörel veri analizi gibi tüm operasyonlarını bulut tabanlı sistemlere taşıyor. Geliştirdiğimiz kapalı devre veya globale açık SaaS projeleri, dünyanın her yerinden saniyeler içinde erişilebilir, banka düzeyinde güvenlik standartlarıyla korunur.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <Cloud className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">Kesintisiz Bulut Mimarisi</h3>
              <p className="text-slate-500">Uygulamanızı AWS, Google Cloud veya Azure gibi dev altyapılarda barındırarak %99.9 çalışma süresi (uptime) garantisi sağlıyoruz.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <Cpu className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">API ve Mikroservisler</h3>
              <p className="text-slate-500">Mevcut araçlarınızla (muhasebe, kargo, iletişim) tam entegrasyon sağlayan, bağımsız ancak uyumlu mikroservis mimarileri.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">Kusursuz Veri Güvenliği</h2>
          <p>
            SaaS projelerinin en kritik bacağı hiç şüphesiz veri güvenliğidir. Tüm veri trafiğini uçtan uca şifreliyor (End-to-End Encryption), düzenli sızma (Penetration) testleri uyguluyor ve GDPR, KVKK gibi uluslararası yasal regülasyonlara tam uyumlu bir altyapı teslim ediyoruz. İzinsiz girişleri engelleyen yapay zeka destekli güvenlik duvarlarıyla verileriniz dijital bir kasanın içinde tutulur.
          </p>

          <h2 className="text-3xl font-bold text-[#0A192F] mt-16 mb-6 tracking-tight">Pazara Çıkış (GTM) Stratejisi</h2>
          <p>
            Eğer bir B2B veya B2C SaaS girişimi kuruyorsanız, yalnızca yazılım geliştirmekle kalmıyor; doğru fiyatlandırma modelleri (Abonelik, freemium vb.), çoklu kiracı (multi-tenant) veritabanı yönetimi ve kullanıcı katılımlarını (onboarding) optimize eden iş modelleri üzerine danışmanlık da veriyoruz.
          </p>
        </div>
      </article>
    </div>
  );
}
