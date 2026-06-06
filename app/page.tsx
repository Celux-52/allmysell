"use client";

import { useEffect, useState } from "react";
import { Compass, Layout, ShoppingCart, Cpu, Mail, Phone, MapPin, ArrowRight, Sparkles, Globe, Layers, ShieldCheck, Activity, Code2, Rocket, CheckCircle2, Search, Bot, Smartphone, TrendingUp, BarChart3 } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const industries = ["E-Ticaret & Perakende", "Finans & Fintech", "Sağlık Teknolojileri", "Lojistik & Tedarik", "B2B SaaS", "Gayrimenkul", "Eğitim Teknolojileri"];

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] overflow-hidden selection:bg-[#0A192F] selection:text-white">
      {/* Modern Dot Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none -z-20"></div>
      
      {/* Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }}></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '14s' }}></div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? "bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-sm py-4" 
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#0A192F] mr-auto">
            <div className="w-8 h-8 rounded-lg bg-[#0A192F] flex items-center justify-center shadow-lg shadow-[#0A192F]/20">
               <span className="text-white text-lg leading-none">A</span>
            </div>
            Allmysell <span className="text-[#0A192F]/40 font-light">LLC</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8 mr-8">
            <Link href="/hizmetler/web-cozumleri" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Web</Link>
            <Link href="/hizmetler/e-ticaret" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">E-Ticaret</Link>
            <Link href="/hizmetler/saas-yazilimlari" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">SaaS</Link>
            <Link href="/hizmetler/stratejik-danismanlik" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Danışmanlık</Link>
            <Link href="/hizmetler/yapay-zeka" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1"><Sparkles className="w-3 h-3 text-blue-500" />Yapay Zeka</Link>
            <Link href="/hizmetler/mobil-uygulama" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Mobil</Link>
          </nav>

          <a
            href="#contact"
            className="flex shrink-0 items-center gap-2 bg-[#0A192F] hover:bg-[#112240] text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all shadow-[0_0_40px_-10px_rgba(10,25,47,0.5)] hover:shadow-[0_0_50px_-10px_rgba(10,25,47,0.6)] hover:-translate-y-0.5 border border-white/10"
          >
            Ücretsiz Analiz <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      <main>
        {/* Modern Hero Section */}
        <section className="relative pt-24 pb-20 px-6 lg:px-12 max-w-7xl mx-auto min-h-[85vh] flex flex-col justify-center">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center relative z-10 max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-blue-200 bg-white/60 backdrop-blur-md text-sm font-semibold text-blue-900 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-500" />
              Büyüme Odaklı Teknoloji Partneriniz
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="font-sans text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.05] font-bold mb-8 text-[#0A192F] tracking-tighter">
              Dijital Altyapınızı <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A192F] via-blue-800 to-[#0A192F]">Satış Makinesine Dönüştürün.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="font-sans text-xl md:text-2xl text-slate-500 font-light max-w-3xl mx-auto leading-relaxed mb-12">
              Sadece güzel görünen siteler değil; şirketinizin operasyonel maliyetlerini düşüren, <span className="font-medium text-[#0A192F]">karlılığı artıran ve tam otonom çalışan</span> sistemler kuruyoruz.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <a href="#contact" className="bg-[#0A192F] text-white px-8 py-4 rounded-2xl text-sm font-semibold tracking-wide transition-all shadow-[0_20px_40px_-15px_rgba(10,25,47,0.5)] hover:bg-[#112240] hover:-translate-y-1 border border-white/10 flex items-center gap-2">
                Sisteminizi İnceleyelim <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#services" className="bg-white/80 backdrop-blur-md border border-slate-200 hover:border-[#0A192F]/30 hover:bg-white text-[#0A192F] px-8 py-4 rounded-2xl text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md">
                Nasıl Yapıyoruz?
              </a>
            </motion.div>
          </motion.div>

          {/* Abstract Dashboard Mockup Graphic */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 relative max-w-5xl mx-auto hidden md:block"
          >
             <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent z-20 h-full w-full pointer-events-none"></div>
             <div className="w-full h-64 bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-t-3xl p-6 relative overflow-hidden">
                <div className="flex gap-2 mb-6 border-b border-slate-200/50 pb-4">
                  <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                   <div className="h-32 bg-slate-100/50 rounded-2xl border border-slate-200/50 flex flex-col justify-center px-6 hover:bg-blue-50/50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-blue-100 mb-3 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-slate-800 mb-1">+210%</div>
                      <div className="text-xs text-slate-500">Dönüşüm Artışı</div>
                   </div>
                   <div className="h-32 bg-slate-100/50 rounded-2xl border border-slate-200/50 flex flex-col justify-center px-6 hover:bg-indigo-50/50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 mb-3 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div className="text-2xl font-bold text-slate-800 mb-1">0.8s</div>
                      <div className="text-xs text-slate-500">Ortalama Yanıt Süresi</div>
                   </div>
                   <div className="h-32 bg-[#0A192F]/5 rounded-2xl border border-[#0A192F]/10 flex flex-col justify-center px-6">
                      <div className="w-8 h-8 rounded-full bg-[#0A192F]/10 mb-3"></div>
                      <div className="w-32 h-2 bg-[#0A192F]/20 rounded-full mb-2"></div>
                      <div className="w-20 h-2 bg-[#0A192F]/20 rounded-full"></div>
                   </div>
                </div>
             </div>
          </motion.div>
        </section>

        {/* Industry Marquee */}
        <section className="py-10 bg-white border-y border-slate-200/60 overflow-hidden relative z-10">
          <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Dijital Dönüşümüne Öncülük Ettiğimiz Sektörler</p>
          </div>
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
          <div className="flex w-[200%] md:w-[100%] overflow-hidden">
            <div className="flex w-max animate-marquee items-center opacity-40">
              {[...industries, ...industries, ...industries].map((ind, idx) => (
                <div key={idx} className="mx-8 md:mx-16 flex items-center text-xl md:text-2xl font-sans text-slate-800 font-bold tracking-tight whitespace-nowrap">
                  {ind}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid Services Section */}
        <section id="services" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto relative">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-16">
              <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A192F] tracking-tight mb-6">
                Dijitalde Sınırları Aşan <br/><span className="text-blue-600">Premium Çözümler.</span>
              </h2>
              <p className="text-slate-500 max-w-2xl text-lg md:text-xl font-light">
                Her projeye özel mimari ve en son teknolojilerle geliştirilmiş sistemler inşa ediyoruz.
              </p>
            </motion.div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
              
              {/* Card 1 - Spans 2 columns */}
              <Link href="/hizmetler/web-cozumleri" className="md:col-span-2 block">
                <motion.div variants={fadeInUp} className="h-full group bg-white p-10 md:p-12 rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
                  <div className="w-14 h-14 bg-white shadow-md border border-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                    <Globe className="w-6 h-6 text-blue-600 stroke-[1.5]" />
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold mb-4 text-[#0A192F] tracking-tight">Kapsamlı Web Platformları</h3>
                  <p className="text-slate-500 leading-relaxed text-lg max-w-md">
                    Gelişmiş performans metriklerine sahip, SEO uyumlu ve eşsiz kullanıcı deneyimi sunan kurumsal seviyede modern web uygulamaları.
                  </p>
                </motion.div>
              </Link>

              {/* Card 2 */}
              <Link href="/hizmetler/e-ticaret" className="block">
                <motion.div variants={fadeInUp} className="h-full group bg-[#0A192F] p-10 md:p-12 rounded-[2rem] border border-[#0A192F] shadow-lg hover:shadow-2xl hover:shadow-[#0A192F]/20 transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-400/30 transition-colors duration-700"></div>
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <ShoppingCart className="w-6 h-6 text-white stroke-[1.5]" />
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight">E-Ticaret Otonomisi</h3>
                  <p className="text-blue-100/70 leading-relaxed text-lg">
                    Satıştan lojistiğe kadar tüm süreçleri insansız yönetebilen akıllı e-ticaret altyapıları.
                  </p>
                </motion.div>
              </Link>

              {/* Card 3 */}
              <Link href="/hizmetler/saas-yazilimlari" className="block">
                <motion.div variants={fadeInUp} className="h-full group bg-white p-10 md:p-12 rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 relative overflow-hidden cursor-pointer">
                   <div className="w-14 h-14 bg-white shadow-md border border-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <ShieldCheck className="w-6 h-6 text-indigo-600 stroke-[1.5]" />
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold mb-4 text-[#0A192F] tracking-tight">Özel SaaS Yazılımları</h3>
                  <p className="text-slate-500 leading-relaxed text-lg">
                    İhtiyaçlarınıza özel, yüksek güvenlikli ve anında ölçeklenebilir bulut mimarileri.
                  </p>
                </motion.div>
              </Link>

              {/* Card 4 - Spans 2 columns */}
              <Link href="/hizmetler/stratejik-danismanlik" className="md:col-span-2 block">
                <motion.div variants={fadeInUp} className="h-full group bg-white p-10 md:p-12 rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-slate-50 rounded-tl-[100px] -z-10 group-hover:bg-blue-50/50 transition-colors duration-700"></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                      <div className="w-14 h-14 bg-white shadow-md border border-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                        <Layers className="w-6 h-6 text-slate-800 stroke-[1.5]" />
                      </div>
                      <h3 className="font-sans text-2xl md:text-3xl font-bold mb-4 text-[#0A192F] tracking-tight">Stratejik Danışmanlık</h3>
                      <p className="text-slate-500 leading-relaxed text-lg max-w-md">
                        Yalnızca kod yazmıyoruz. Projenizin iş modelini, pazar payını ve sürdürülebilir büyüme adımlarını baştan kurguluyoruz.
                      </p>
                    </div>
                    <div className="hidden md:block w-32 h-32 bg-slate-100 rounded-full border-[8px] border-white shadow-inner flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full border border-slate-200 animate-[spin_10s_linear_infinite]"></div>
                      <Compass className="w-8 h-8 text-slate-400" />
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Card 5 - Spans 2 columns */}
              <Link href="/hizmetler/yapay-zeka" className="md:col-span-2 block">
                <motion.div variants={fadeInUp} className="h-full group bg-white p-10 md:p-12 rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
                  <div className="w-14 h-14 bg-white shadow-md border border-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Bot className="w-6 h-6 text-blue-600 stroke-[1.5]" />
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold mb-4 text-[#0A192F] tracking-tight">Yapay Zeka & Otomasyon</h3>
                  <p className="text-slate-500 leading-relaxed text-lg max-w-md">
                    Şirketinize özel eğitilmiş yapay zeka asistanları (RAG) ve veri analiz algoritmalarıyla operasyonel verimliliği zirveye taşıyın.
                  </p>
                </motion.div>
              </Link>

              {/* Card 6 */}
              <Link href="/hizmetler/mobil-uygulama" className="block">
                <motion.div variants={fadeInUp} className="h-full group bg-[#0A192F] p-10 md:p-12 rounded-[2rem] border border-[#0A192F] shadow-lg hover:shadow-2xl hover:shadow-[#0A192F]/20 transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-400/30 transition-colors duration-700"></div>
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Smartphone className="w-6 h-6 text-white stroke-[1.5]" />
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight">Mobil Uygulamalar</h3>
                  <p className="text-indigo-100/70 leading-relaxed text-lg">
                    iOS ve Android ekosistemlerinde milyonlarca kullanıcıyı anında ağırlayabilecek yüksek performanslı native mimariler.
                  </p>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Why Us / Features Section */}
        <section className="py-24 bg-white border-y border-slate-200/60 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none"></div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10"
          >
            <div className="flex flex-col md:flex-row gap-12 items-end mb-16">
              <motion.div variants={fadeInUp} className="flex-1">
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-[#0A192F] tracking-tight mb-6">
                  Neden <span className="text-blue-600">Allmysell LLC?</span>
                </h2>
                <p className="text-slate-500 max-w-xl text-lg font-light">
                  Standartların ötesine geçen performans metrikleri ve üst düzey mühendislik prensiplerimiz.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div variants={fadeInUp} className="group relative bg-[#FAFAFA] rounded-3xl p-10 hover:bg-white transition-colors duration-500 border border-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-[#0A192F] mb-4">Maksimum Performans</h4>
                <p className="text-slate-500 font-light leading-relaxed mb-6">
                  Google Core Web Vitals metriklerinde kusursuz skorlar. Edge network ve SSR mimarisi ile sıfır gecikme.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100/100 Lighthouse Skoru
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Anında Yüklenme (Sub-second)
                  </li>
                </ul>
              </motion.div>

              {/* Feature 2 */}
              <motion.div variants={fadeInUp} className="group relative bg-[#FAFAFA] rounded-3xl p-10 hover:bg-[#0A192F] transition-colors duration-500 border border-slate-200/50 hover:border-[#0A192F] hover:shadow-2xl hover:shadow-[#0A192F]/20 hover:-translate-y-1">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:bg-white/10 group-hover:border-white/10">
                  <ShieldCheck className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                </div>
                <h4 className="text-xl font-bold text-[#0A192F] group-hover:text-white mb-4 transition-colors">Askeri Düzey Güvenlik</h4>
                <p className="text-slate-500 group-hover:text-blue-100/70 font-light leading-relaxed mb-6 transition-colors">
                  Kurumsal verileriniz ve müşteri bilgileriniz uçtan uca şifrelenir. Uluslararası standartlarda veri koruması.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700 group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> End-to-End Encryption
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700 group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> GDPR & KVKK Uyumluluğu
                  </li>
                </ul>
              </motion.div>

              {/* Feature 3 */}
              <motion.div variants={fadeInUp} className="group relative bg-[#FAFAFA] rounded-3xl p-10 hover:bg-white transition-colors duration-500 border border-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Cpu className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-[#0A192F] mb-4">Sınırsız Ölçeklenebilirlik</h4>
                <p className="text-slate-500 font-light leading-relaxed mb-6">
                  Trafik ani olarak 100 katına çıksa bile sistemleriniz çökmek yerine sunucu kaynaklarını anında artırır.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Auto-Scaling Bulut Mimarisi
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Mikroservis Entegrasyonu
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Case Studies / Proof Section */}
        <section className="py-32 bg-[#0A192F] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10"
          >
            <div className="text-center mb-20">
              <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
                Rakamlarla Konuşuyoruz.
              </h2>
              <p className="text-blue-100/60 max-w-2xl mx-auto text-lg md:text-xl font-light">
                Güzel tasarımların ötesinde, şirketlerin bilançosuna doğrudan etki eden ölçülebilir başarı hikayeleri yaratıyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Case 1 */}
              <motion.div variants={fadeInUp} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 transition-colors duration-500">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                     <TrendingUp className="w-8 h-8 text-blue-400" />
                   </div>
                   <div>
                     <div className="text-sm text-blue-300 font-semibold tracking-widest uppercase mb-1">Global Lojistik Firması</div>
                     <div className="text-white font-bold text-xl md:text-2xl">Operasyonel Otomasyon</div>
                   </div>
                </div>
                <div className="space-y-6">
                  <div>
                     <div className="text-white/40 text-sm uppercase tracking-wider font-semibold mb-2">Karşılaşılan Sorun</div>
                     <p className="text-white/80 font-light leading-relaxed text-lg">Manuel sipariş yönetimi ve kargo entegrasyonu eksikliği nedeniyle günlük 4 saatlik veri girişi kaybı.</p>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-8"></div>
                  <div>
                     <div className="text-white/40 text-sm uppercase tracking-wider font-semibold mb-2">Bizim Çözümümüz & Sonuç</div>
                     <div className="flex flex-col sm:flex-row sm:items-end gap-4 mt-4">
                       <span className="text-6xl font-bold text-emerald-400 leading-none">%85</span>
                       <span className="text-white/80 font-light leading-relaxed pb-1 text-lg">Zaman tasarrufu sağlandı. Tüm sipariş ve kargo süreçleri sıfır hata ile otonom hale getirildi.</span>
                     </div>
                  </div>
                </div>
              </motion.div>

              {/* Case 2 */}
              <motion.div variants={fadeInUp} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 transition-colors duration-500">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30">
                     <BarChart3 className="w-8 h-8 text-indigo-400" />
                   </div>
                   <div>
                     <div className="text-sm text-indigo-300 font-semibold tracking-widest uppercase mb-1">Premium E-Ticaret Markası</div>
                     <div className="text-white font-bold text-xl md:text-2xl">Dönüşüm Optimizasyonu</div>
                   </div>
                </div>
                <div className="space-y-6">
                  <div>
                     <div className="text-white/40 text-sm uppercase tracking-wider font-semibold mb-2">Karşılaşılan Sorun</div>
                     <p className="text-white/80 font-light leading-relaxed text-lg">Yüksek trafik alınmasına rağmen hantal altyapı nedeniyle sepette terk edilme (cart abandonment) oranının %70 olması.</p>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-8"></div>
                  <div>
                     <div className="text-white/40 text-sm uppercase tracking-wider font-semibold mb-2">Bizim Çözümümüz & Sonuç</div>
                     <div className="flex flex-col sm:flex-row sm:items-end gap-4 mt-4">
                       <span className="text-6xl font-bold text-emerald-400 leading-none">%210</span>
                       <span className="text-white/80 font-light leading-relaxed pb-1 text-lg">Satış (CR) artışı. Yeni nesil mimari ile sayfa açılış hızları ortalama 0.8 saniyeye düşürüldü.</span>
                     </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Process Section */}
        <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto relative">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <h2 className="font-sans text-4xl md:text-5xl font-bold text-[#0A192F] tracking-tight mb-6">
                Kusursuz İşleyiş, <br/><span className="text-blue-600">Net Sonuçlar.</span>
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">
                Fikirden lansmana kadar her adımı veri odaklı ve şeffaf bir şekilde yönetiyoruz.
              </p>
            </motion.div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-[45px] left-[10%] w-[80%] h-0.5 bg-gradient-to-r from-blue-100 via-blue-500 to-blue-100 z-0 opacity-20"></div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                {[
                  { icon: Search, title: "1. Keşif ve Analiz", desc: "Pazar araştırması, rakip analizi ve ihtiyaçların belirlenmesi." },
                  { icon: Layers, title: "2. Mimari Tasarım", desc: "UI/UX prototiplerinin çizilmesi ve sistem altyapısının kurgulanması." },
                  { icon: Code2, title: "3. Çevik Geliştirme", desc: "Modern teknolojilerle kodlama ve şeffaf test süreçleri." },
                  { icon: Rocket, title: "4. Canlıya Alma", desc: "Sunucu kurulumu, lansman ve sürekli performans optimizasyonu." }
                ].map((step, i) => (
                  <motion.div key={i} variants={fadeInUp} className="relative text-center group">
                    <div className="w-24 h-24 mx-auto bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 group-hover:border-blue-400 group-hover:shadow-xl group-hover:shadow-blue-900/10 transition-all duration-500">
                      <step.icon className="w-8 h-8 text-[#0A192F] group-hover:text-blue-600 transition-colors" />
                    </div>
                    <h4 className="text-xl font-bold text-[#0A192F] mb-3">{step.title}</h4>
                    <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed px-4">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Deep Modern Contact Section */}
        <section id="contact" className="py-32 bg-[#0A192F] px-6 lg:px-12 relative overflow-hidden mt-10">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[150px] pointer-events-none"></div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto relative z-10"
          >
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 md:p-16 lg:p-24 shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                <motion.div variants={fadeInUp}>
                  <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-red-400 uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    Zaman Daralıyor
                  </div>
                  <h2 className="font-sans text-5xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-[1.1]">
                    Projelerinizin <span className="text-red-400">%80'i</span> <br className="hidden md:block"/>
                    Yanlış Başlıyor.
                  </h2>
                  <p className="text-blue-100/60 text-lg md:text-xl font-light mb-12 max-w-md leading-relaxed">
                    Hatalı mimari seçimleriyle bütçenizi yakmadan önce, uzman ekibimizle sisteminizi ücretsiz planlayalım.
                  </p>
                  
                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-4 text-white/70">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 border border-white/10">
                        <MapPin className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Genel Merkez (HQ)</h4>
                        <p className="text-sm leading-relaxed text-white/50">ALLMYSELL LLC<br/>7901 4th St N, Ste 300<br/>St. Petersburg, FL 33702, USA</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 text-white/70">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 border border-white/10">
                        <Phone className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Türkiye Operasyon Merkezi</h4>
                        <p className="text-sm leading-relaxed text-white/50">+90 553 706 59 12<br/>+90 551 834 30 30</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-6">
                  {/* Digital Contact Card */}
                  <div className="bg-[#0A192F]/50 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:bg-white/5 transition-colors duration-500">
                    <h4 className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Kurumsal İletişim</h4>
                    <div className="space-y-6">
                      <a href="mailto:info@allmysell.com" className="flex items-center justify-between text-white hover:text-blue-300 transition-all duration-300 group">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-white/5 rounded-xl group-hover:bg-blue-500/20 group-hover:scale-110 transition-all border border-white/5">
                            <Mail className="w-5 h-5 text-white/60 group-hover:text-blue-300" />
                          </div>
                          <div>
                            <span className="text-lg md:text-xl font-light tracking-wide block">info@allmysell.com</span>
                            <span className="text-xs text-white/40">Sadece kurumsal talepler için</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
                      </a>
                    </div>
                  </div>

                  <a href="mailto:info@allmysell.com" className="group flex items-center justify-center gap-3 w-full py-5 bg-white text-[#0A192F] rounded-2xl font-bold text-lg hover:bg-blue-50 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                    Mimari Analiz Toplantısı Talep Et
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="py-8 bg-[#020A16] px-6 text-center border-t border-white/5">
        <p className="text-xs md:text-sm text-white/30 font-semibold tracking-[0.2em] uppercase">
          &copy; 2026 Allmysell LLC. <span className="mx-2">|</span> Tasarım ve Teknoloji
        </p>
      </footer>
    </div>
  );
}
