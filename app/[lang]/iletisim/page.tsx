import { Metadata } from 'next';
import { ArrowLeft, MapPin, Mail, Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { constructAlternates } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

const content = {
  en: {
    meta: {
      title: 'Contact Us',
      description: 'Get in touch with Allmysell LLC. Schedule a B2B discovery call or reach out for enterprise digital transformation projects.',
      keywords: 'contact allmysell, st petersburg software agency contact, b2b discovery call, reach out software developers',
    },
    back: 'Back to Home',
    tag: 'Let\'s Connect',
    title: 'Start Your Digital Transformation',
    p1: 'Whether you need a full-scale Headless e-commerce rebuild or an autonomous AI agent for your SaaS platform, our engineering team is ready to analyze your bottleneck and propose a robust architecture.',
    address_title: 'Global Headquarters',
    address_desc: 'St. Petersburg, Florida, USA',
    email_title: 'Direct Email',
    email_desc: 'info@allmysell.com',
    phone_title: 'Turkey Operations Center',
    phone_desc: '+90 553 706 59 12\n+90 551 834 30 30',
    form_title: 'Request a Discovery Call',
    form_desc: 'Fill out the form below. Our lead architects will get back to you within 24 hours with an initial technical assessment.',
    form_name: 'Full Name',
    form_company: 'Company Name',
    form_email: 'Corporate Email',
    form_message: 'Project Details & Bottlenecks',
    form_submit: 'Send Request',
    form_success_title: 'Message Sent!',
    form_success_desc: 'Thank you for reaching out. Our architects will contact you shortly.',
    form_success_another: 'Send another message',
    form_error: 'An error occurred while sending your message. Please try again later.',
    form_sending: 'Sending...'
  },
  tr: {
    meta: {
      title: 'İletişim',
      description: 'Allmysell LLC ile iletişime geçin. B2B keşif toplantısı (Discovery Call) planlayın veya kurumsal projeleriniz için bize ulaşın.',
      keywords: 'allmysell iletişim, st petersburg yazılım ajansı iletişim, b2b toplantı, yazılım şirketi iletişim',
    },
    back: 'Anasayfaya Dön',
    tag: 'Bizimle İletişime Geçin',
    title: 'Dijital Dönüşümünüzü Başlatın',
    p1: 'İster kapsamlı bir Headless e-ticaret altyapısı, ister SaaS platformunuz için otonom bir yapay zeka asistanı (RAG) olsun; mühendislik ekibimiz darboğazınızı analiz etmeye ve size en sağlam mimariyi sunmaya hazır.',
    address_title: 'Global Merkez',
    address_desc: 'St. Petersburg, Florida, ABD',
    email_title: 'Doğrudan E-Posta',
    email_desc: 'info@allmysell.com',
    phone_title: 'Türkiye Operasyon Merkezi',
    phone_desc: '+90 553 706 59 12\n+90 551 834 30 30',
    form_title: 'Keşif Toplantısı (Discovery Call) Talep Edin',
    form_desc: 'Aşağıdaki formu doldurun. Baş mimarlarımız 24 saat içinde ilk teknik değerlendirmeyle size geri dönüş yapacaktır.',
    form_name: 'Adınız Soyadınız',
    form_company: 'Şirket Adı',
    form_email: 'Kurumsal E-Posta',
    form_message: 'Proje Detayları ve Mevcut Sorunlar',
    form_submit: 'Talebi Gönder',
    form_success_title: 'Mesajınız Gönderildi!',
    form_success_desc: 'Bizimle iletişime geçtiğiniz için teşekkürler. Mimarlarımız en kısa sürede sizinle iletişime geçecektir.',
    form_success_another: 'Yeni mesaj gönder',
    form_error: 'Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
    form_sending: 'Gönderiliyor...'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  return {
    ...data.meta,
    alternates: constructAlternates('contact', 'iletisim', lang)
  };
}

export default async function Iletisim({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params)?.lang || 'en';
  const dict = content[lang as keyof typeof content] || content.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Allmysell LLC",
    "image": "https://allmysell.com/logo.png",
    "@id": "https://allmysell.com",
    "url": "https://allmysell.com",
    "telephone": "+905537065912",
    "email": "info@allmysell.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "St. Petersburg",
      "addressRegion": "FL",
      "addressCountry": "US"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-[#FAFAFA] text-[#0A192F] selection:bg-[#0A192F] selection:text-white pb-32">
        <div className="w-full h-[40vh] bg-[#0A192F] relative overflow-hidden flex items-end">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-indigo-500/20 rounded-full blur-[120px]"></div>
          <div className="max-w-4xl mx-auto w-full px-6 lg:px-12 pb-16 relative z-10">
            <Link prefetch={false} href={`/${lang}`} className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
              <ArrowLeft className="w-4 h-4" /> {dict.back}
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                <MessageSquare className="w-6 h-6 text-indigo-300" />
              </div>
              <span className="text-indigo-300 font-semibold tracking-widest uppercase text-xs">{dict.tag}</span>
            </div>
            <h1 className="font-sans text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              {dict.title}
            </h1>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-12 mt-16 font-sans">
          <p className="text-xl text-slate-600 leading-relaxed mb-16 max-w-3xl">
            {dict.p1}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm shrink-0">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0A192F]">{dict.address_title}</h3>
                  <p className="text-slate-500 mt-1">{dict.address_desc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm shrink-0">
                  <Mail className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0A192F]">{dict.email_title}</h3>
                  <p className="text-slate-500 mt-1">{dict.email_desc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm shrink-0">
                  <Phone className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0A192F]">{dict.phone_title}</h3>
                  <p className="text-slate-500 mt-1 whitespace-pre-line">{dict.phone_desc}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40">
                <h2 className="text-2xl font-bold text-[#0A192F] mb-2">{dict.form_title}</h2>
                <p className="text-slate-500 mb-8">{dict.form_desc}</p>
                
                <ContactForm dict={dict} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
