import { Metadata } from 'next';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'Privacy Policy | Allmysell LLC',
      description: 'Privacy Policy and data protection guidelines for Allmysell LLC. We take your corporate data security seriously.',
      keywords: 'privacy policy, data protection, gdpr, ccpa, allmysell privacy',
    },
    back: 'Back to Home',
    tag: 'Legal & Security',
    title: 'Privacy Policy',
    last_updated: 'Last Updated: June 2026',
    sections: [
      {
        title: '1. Introduction',
        content: 'At Allmysell LLC, we respect your privacy and are committed to protecting your personal and corporate data. This Privacy Policy will inform you as to how we look after your data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.'
      },
      {
        title: '2. The Data We Collect About You',
        content: 'We may collect, use, store and transfer different kinds of data about you which we have grouped together follows: Identity Data (first name, last name), Contact Data (email address, telephone numbers), Technical Data (IP address, browser type and version, time zone setting and location), and Usage Data (information about how you use our website and services).'
      },
      {
        title: '3. How We Use Your Data',
        content: 'We will only use your data when the law allows us to. Most commonly, we will use your data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you. Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.'
      },
      {
        title: '4. Data Security',
        content: 'We have put in place appropriate security measures to prevent your data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.'
      },
      {
        title: '5. Your Legal Rights',
        content: 'Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to: Request access to your personal data, Request correction of your personal data, Request erasure of your personal data, Object to processing of your personal data, Request restriction of processing your personal data, Request transfer of your personal data, Right to withdraw consent.'
      }
    ]
  },
  tr: {
    meta: {
      title: 'Gizlilik Politikası | Allmysell LLC',
      description: 'Allmysell LLC Gizlilik Politikası ve veri koruma yönergeleri. Kurumsal veri güvenliğinizi ciddiye alıyoruz.',
      keywords: 'gizlilik politikası, veri koruma, kvkk, gdpr, allmysell gizlilik',
    },
    back: 'Anasayfaya Dön',
    tag: 'Yasal & Güvenlik',
    title: 'Gizlilik Politikası',
    last_updated: 'Son Güncelleme: Haziran 2026',
    sections: [
      {
        title: '1. Giriş',
        content: 'Allmysell LLC olarak gizliliğinize saygı duyuyor ve kişisel ile kurumsal verilerinizi korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde verilerinizi nasıl koruduğumuz konusunda sizi bilgilendirecek ve gizlilik haklarınız ile yasaların sizi nasıl koruduğu hakkında bilgi verecektir.'
      },
      {
        title: '2. Topladığımız Veriler',
        content: 'Hakkınızda farklı türde verileri toplayabilir, kullanabilir, saklayabilir ve aktarabiliriz. Bunlar şu şekilde gruplandırılmıştır: Kimlik Verileri (ad, soyad), İletişim Verileri (e-posta adresi, telefon numaraları), Teknik Veriler (IP adresi, tarayıcı türü ve sürümü, saat dilimi ayarı ve konumu) ve Kullanım Verileri (web sitemizi ve hizmetlerimizi nasıl kullandığınıza dair bilgiler).'
      },
      {
        title: '3. Verilerinizi Nasıl Kullanıyoruz',
        content: 'Verilerinizi yalnızca yasaların izin verdiği durumlarda kullanacağız. En yaygın olarak, verilerinizi şu durumlarda kullanırız: Sizinle girmek üzere olduğumuz veya girdiğimiz sözleşmeyi yerine getirmemiz gerektiğinde. Meşru menfaatlerimiz (veya üçüncü bir tarafın menfaatleri) için gerekli olduğunda ve sizin menfaatleriniz ve temel haklarınız bu menfaatleri geçersiz kılmadığında.'
      },
      {
        title: '4. Veri Güvenliği',
        content: 'Verilerinizin kazara kaybolmasını, yetkisiz bir şekilde kullanılmasını veya bunlara erişilmesini, değiştirilmesini veya ifşa edilmesini önlemek için uygun güvenlik önlemlerini (örneğin uçtan uca şifreleme, sıkı CSP protokolleri) uygulamaya koyduk. Ek olarak, kişisel verilerinize erişimi, iş gereği bilmesi gereken çalışanlar, temsilciler, yükleniciler ve diğer üçüncü taraflarla sınırlandırıyoruz.'
      },
      {
        title: '5. Yasal Haklarınız (KVKK / GDPR)',
        content: 'Belirli koşullar altında, kişisel verilerinize ilişkin veri koruma yasaları (KVKK ve GDPR) kapsamında aşağıdaki haklara sahipsiniz: Kişisel verilerinize erişim talep etme, Kişisel verilerinizin düzeltilmesini talep etme, Kişisel verilerinizin silinmesini talep etme, Kişisel verilerinizin işlenmesine itiraz etme, İşlenmenin kısıtlanmasını talep etme, Kişisel verilerinizin aktarılmasını talep etme ve Rızayı geri çekme hakkı.'
      }
    ]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  const path = lang === 'tr' ? '/tr/gizlilik-politikasi' : '/en/privacy-policy';
  
  return {
    ...data.meta,
    alternates: constructAlternates('privacy-policy', 'gizlilik-politikasi')
  };
}

export default async function GizlilikPolitikasi({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params)?.lang || 'en';
  const dict = content[lang as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A192F] selection:bg-[#0A192F] selection:text-white pb-32">
      <div className="w-full h-[30vh] bg-[#0A192F] relative overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-blue-500/20 rounded-full blur-[120px]"></div>
        <div className="max-w-3xl mx-auto w-full px-6 lg:px-12 pb-16 relative z-10">
          <Link prefetch={false} href={`/${lang}`} className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
            <ArrowLeft className="w-4 h-4" /> {dict.back}
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
              <ShieldCheck className="w-5 h-5 text-blue-300" />
            </div>
            <span className="text-blue-300 font-semibold tracking-widest uppercase text-xs">{dict.tag}</span>
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
