import { Compass, Layout, ShoppingCart, Cpu, Mail, Phone, MapPin, ArrowRight, Sparkles, Globe, Layers, ShieldCheck, Activity, Code2, Rocket, CheckCircle2, Search, Bot, Smartphone, TrendingUp, BarChart3 } from "lucide-react";
import Link from "next/link";
import { dictionaries, Locale } from "@/dictionaries";
import Header from "@/components/Header";
import { StaggerWrapper, FadeInUpWrapper, FadeInUpWrapperInitialHidden, DashboardMockupWrapper } from "@/components/MotionWrappers";
import { constructAlternates } from '@/lib/seo';
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: constructAlternates('', '')
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || "en";
  const dict = dictionaries[lang];

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] overflow-hidden selection:bg-[#0A192F] selection:text-white">
      {/* Modern Dot Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none -z-20"></div>
      
      {/* Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }}></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '14s' }}></div>

      {/* Header - Interactive Client Component */}
      <Header lang={lang} dict={dict} />

      <main>
        {/* Modern Hero Section */}
        <section className="relative pt-24 pb-20 px-6 lg:px-12 max-w-7xl mx-auto min-h-[85vh] flex flex-col justify-center">
          <StaggerWrapper className="text-center relative z-10 max-w-5xl mx-auto">
            <FadeInUpWrapper className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-blue-200 bg-white/60 backdrop-blur-md text-sm font-semibold text-blue-900 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-500" />
              {dict.hero.badge}
            </FadeInUpWrapper>
            
            <FadeInUpWrapper className="font-sans text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.05] font-bold mb-8 text-[#0A192F] tracking-tighter flex flex-col">
              <span className="text-sm md:text-base font-semibold text-blue-600 tracking-widest uppercase mb-4 opacity-80">{dict.hero.seoH1}</span>
              <span>
                {dict.hero.title1} <br className="md:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A192F] via-blue-800 to-[#0A192F]">{dict.hero.title2}</span>
              </span>
            </FadeInUpWrapper>
            
            <FadeInUpWrapper className="font-sans text-xl md:text-2xl text-slate-500 font-light max-w-3xl mx-auto leading-relaxed mb-12">
              {dict.hero.description}
            </FadeInUpWrapper>
            
            <FadeInUpWrapper className="flex flex-wrap justify-center gap-4">
              <a href="#contact" className="bg-[#0A192F] text-white px-8 py-4 rounded-2xl text-sm font-semibold tracking-wide transition-all shadow-[0_20px_40px_-15px_rgba(10,25,47,0.5)] hover:bg-[#112240] hover:-translate-y-1 border border-white/10 flex items-center gap-2">
                {dict.hero.cta1} <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#services" className="bg-white/80 backdrop-blur-md border border-slate-200 hover:border-[#0A192F]/30 hover:bg-white text-[#0A192F] px-8 py-4 rounded-2xl text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md">
                {dict.hero.cta2}
              </a>
            </FadeInUpWrapper>
          </StaggerWrapper>

          {/* Abstract Dashboard Mockup Graphic */}
          <DashboardMockupWrapper>
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
                      <div className="text-xs text-slate-500">{dict.metrics.conversionIncrease}</div>
                   </div>
                   <div className="h-32 bg-slate-100/50 rounded-2xl border border-slate-200/50 flex flex-col justify-center px-6 hover:bg-indigo-50/50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 mb-3 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div className="text-2xl font-bold text-slate-800 mb-1">0.8s</div>
                      <div className="text-xs text-slate-500">{dict.metrics.avgResponseTime}</div>
                   </div>
                   <div className="h-32 bg-[#0A192F]/5 rounded-2xl border border-[#0A192F]/10 flex flex-col justify-center px-6">
                      <div className="w-8 h-8 rounded-full bg-[#0A192F]/10 mb-3"></div>
                      <div className="w-32 h-2 bg-[#0A192F]/20 rounded-full mb-2"></div>
                      <div className="w-20 h-2 bg-[#0A192F]/20 rounded-full"></div>
                   </div>
                </div>
             </div>
          </DashboardMockupWrapper>
        </section>

        {/* Industry Marquee */}
        <section className="py-10 bg-white border-y border-slate-200/60 overflow-hidden relative z-10">
          <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">{dict.industries.title}</p>
          </div>
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
          <div className="flex w-[200%] md:w-[100%] overflow-hidden">
            <div className="flex w-max animate-marquee items-center opacity-40">
              {[...dict.industries.list, ...dict.industries.list, ...dict.industries.list].map((ind, idx) => (
                <div key={idx} className="mx-8 md:mx-16 flex items-center text-xl md:text-2xl font-sans text-slate-800 font-bold tracking-tight whitespace-nowrap">
                  {ind}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid Services Section */}
        <section id="services" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto relative">
          <StaggerWrapper>
            <FadeInUpWrapper className="mb-16">
              <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A192F] tracking-tight mb-6">
                {dict.services.title1} <br/><span className="text-blue-600">{dict.services.title2}</span>
              </h2>
              <p className="text-slate-500 max-w-2xl text-lg md:text-xl font-light">
                {dict.services.subtitle}
              </p>
            </FadeInUpWrapper>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
              
              <Link prefetch={false} href={lang === 'tr' ? '/tr/hizmetler/web-cozumleri' : '/en/services/web-solutions'} className="md:col-span-2 block">
                <FadeInUpWrapper className="h-full group bg-white p-10 md:p-12 rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
                  <div className="w-14 h-14 bg-white shadow-md border border-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                    <Globe className="w-6 h-6 text-blue-600 stroke-[1.5]" />
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold mb-4 text-[#0A192F] tracking-tight">{dict.services.web.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-lg max-w-md">
                    {dict.services.web.desc}
                  </p>
                </FadeInUpWrapper>
              </Link>

              <Link prefetch={false} href={lang === 'tr' ? '/tr/hizmetler/e-ticaret' : '/en/services/e-commerce'} className="block">
                <FadeInUpWrapper className="h-full group bg-[#0A192F] p-10 md:p-12 rounded-[2rem] border border-[#0A192F] shadow-lg hover:shadow-2xl hover:shadow-[#0A192F]/20 transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-400/30 transition-colors duration-700"></div>
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <ShoppingCart className="w-6 h-6 text-white stroke-[1.5]" />
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight">{dict.services.ecommerce.title}</h3>
                  <p className="text-blue-100/70 leading-relaxed text-lg">
                    {dict.services.ecommerce.desc}
                  </p>
                </FadeInUpWrapper>
              </Link>

              <Link prefetch={false} href={lang === 'tr' ? '/tr/hizmetler/saas-yazilimlari' : '/en/services/saas-software'} className="block">
                <FadeInUpWrapper className="h-full group bg-white p-10 md:p-12 rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 relative overflow-hidden cursor-pointer">
                   <div className="w-14 h-14 bg-white shadow-md border border-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <ShieldCheck className="w-6 h-6 text-indigo-600 stroke-[1.5]" />
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold mb-4 text-[#0A192F] tracking-tight">{dict.services.saas.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-lg">
                    {dict.services.saas.desc}
                  </p>
                </FadeInUpWrapper>
              </Link>

              <Link prefetch={false} href={lang === 'tr' ? '/tr/hizmetler/stratejik-danismanlik' : '/en/services/strategic-consulting'} className="md:col-span-2 block">
                <FadeInUpWrapper className="h-full group bg-white p-10 md:p-12 rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-slate-50 rounded-tl-[100px] -z-10 group-hover:bg-blue-50/50 transition-colors duration-700"></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                      <div className="w-14 h-14 bg-white shadow-md border border-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                        <Layers className="w-6 h-6 text-slate-800 stroke-[1.5]" />
                      </div>
                      <h3 className="font-sans text-2xl md:text-3xl font-bold mb-4 text-[#0A192F] tracking-tight">{dict.services.consulting.title}</h3>
                      <p className="text-slate-500 leading-relaxed text-lg max-w-md">
                        {dict.services.consulting.desc}
                      </p>
                    </div>
                    <div className="hidden md:block w-32 h-32 bg-slate-100 rounded-full border-[8px] border-white shadow-inner flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full border border-slate-200 animate-[spin_10s_linear_infinite]"></div>
                      <Compass className="w-8 h-8 text-slate-400" />
                    </div>
                  </div>
                </FadeInUpWrapper>
              </Link>

              <Link prefetch={false} href={lang === 'tr' ? '/tr/hizmetler/yapay-zeka' : '/en/services/artificial-intelligence'} className="md:col-span-2 block">
                <FadeInUpWrapper className="h-full group bg-white p-10 md:p-12 rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
                  <div className="w-14 h-14 bg-white shadow-md border border-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Bot className="w-6 h-6 text-blue-600 stroke-[1.5]" />
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold mb-4 text-[#0A192F] tracking-tight">{dict.services.ai.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-lg max-w-md">
                    {dict.services.ai.desc}
                  </p>
                </FadeInUpWrapper>
              </Link>

              <Link prefetch={false} href={lang === 'tr' ? '/tr/hizmetler/mobil-uygulama' : '/en/services/mobile-application'} className="block">
                <FadeInUpWrapper className="h-full group bg-[#0A192F] p-10 md:p-12 rounded-[2rem] border border-[#0A192F] shadow-lg hover:shadow-2xl hover:shadow-[#0A192F]/20 transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-400/30 transition-colors duration-700"></div>
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Smartphone className="w-6 h-6 text-white stroke-[1.5]" />
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight">{dict.services.mobile.title}</h3>
                  <p className="text-indigo-100/70 leading-relaxed text-lg">
                    {dict.services.mobile.desc}
                  </p>
                </FadeInUpWrapper>
              </Link>
            </div>
          </StaggerWrapper>
        </section>

        {/* Why Us / Features Section */}
        <section className="py-24 bg-white border-y border-slate-200/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none"></div>
          
          <StaggerWrapper className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-end mb-16">
              <FadeInUpWrapper className="flex-1">
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-[#0A192F] tracking-tight mb-6">
                  {dict.features.title1} <span className="text-blue-600">{dict.features.title2}</span>
                </h2>
                <p className="text-slate-500 max-w-xl text-lg font-light">
                  {dict.features.subtitle}
                </p>
              </FadeInUpWrapper>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <FadeInUpWrapper className="group relative bg-[#FAFAFA] rounded-3xl p-10 hover:bg-white transition-colors duration-500 border border-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-[#0A192F] mb-4">{dict.features.f1.title}</h4>
                <p className="text-slate-500 font-light leading-relaxed mb-6">
                  {dict.features.f1.desc}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {dict.features.f1.b1}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {dict.features.f1.b2}
                  </li>
                </ul>
              </FadeInUpWrapper>

              {/* Feature 2 */}
              <FadeInUpWrapper className="group relative bg-[#FAFAFA] rounded-3xl p-10 hover:bg-[#0A192F] transition-colors duration-500 border border-slate-200/50 hover:border-[#0A192F] hover:shadow-2xl hover:shadow-[#0A192F]/20 hover:-translate-y-1">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:bg-white/10 group-hover:border-white/10">
                  <ShieldCheck className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                </div>
                <h4 className="text-xl font-bold text-[#0A192F] group-hover:text-white mb-4 transition-colors">{dict.features.f2.title}</h4>
                <p className="text-slate-500 group-hover:text-blue-100/70 font-light leading-relaxed mb-6 transition-colors">
                  {dict.features.f2.desc}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700 group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {dict.features.f2.b1}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700 group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {dict.features.f2.b2}
                  </li>
                </ul>
              </FadeInUpWrapper>

              {/* Feature 3 */}
              <FadeInUpWrapper className="group relative bg-[#FAFAFA] rounded-3xl p-10 hover:bg-white transition-colors duration-500 border border-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Cpu className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-[#0A192F] mb-4">{dict.features.f3.title}</h4>
                <p className="text-slate-500 font-light leading-relaxed mb-6">
                  {dict.features.f3.desc}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {dict.features.f3.b1}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {dict.features.f3.b2}
                  </li>
                </ul>
              </FadeInUpWrapper>
            </div>
          </StaggerWrapper>
        </section>

        {/* Case Studies / Proof Section */}
        <section className="py-32 bg-[#0A192F] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
          <StaggerWrapper className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="text-center mb-20">
              <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
                {dict.cases.title}
              </h2>
              <p className="text-blue-100/60 max-w-2xl mx-auto text-lg md:text-xl font-light">
                {dict.cases.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Case 1 */}
              <FadeInUpWrapper className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 transition-colors duration-500">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                     <TrendingUp className="w-8 h-8 text-blue-400" />
                   </div>
                   <div>
                     <div className="text-sm text-blue-300 font-semibold tracking-widest uppercase mb-1">{dict.cases.c1.tag}</div>
                     <div className="text-white font-bold text-xl md:text-2xl">{dict.cases.c1.title}</div>
                   </div>
                </div>
                <div className="space-y-6">
                  <div>
                     <div className="text-white/40 text-sm uppercase tracking-wider font-semibold mb-2">{dict.cases.c1.problem}</div>
                     <p className="text-white/80 font-light leading-relaxed text-lg">{dict.cases.c1.problemDesc}</p>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-8"></div>
                  <div>
                     <div className="text-white/40 text-sm uppercase tracking-wider font-semibold mb-2">{dict.cases.c1.solution}</div>
                     <div className="flex flex-col sm:flex-row sm:items-end gap-4 mt-4">
                       <span className="text-6xl font-bold text-emerald-400 leading-none">%85</span>
                       <span className="text-white/80 font-light leading-relaxed pb-1 text-lg">{dict.cases.c1.solutionDesc}</span>
                     </div>
                  </div>
                </div>
              </FadeInUpWrapper>

              {/* Case 2 */}
              <FadeInUpWrapper className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 transition-colors duration-500">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30">
                     <BarChart3 className="w-8 h-8 text-indigo-400" />
                   </div>
                   <div>
                     <div className="text-sm text-indigo-300 font-semibold tracking-widest uppercase mb-1">{dict.cases.c2.tag}</div>
                     <div className="text-white font-bold text-xl md:text-2xl">{dict.cases.c2.title}</div>
                   </div>
                </div>
                <div className="space-y-6">
                  <div>
                     <div className="text-white/40 text-sm uppercase tracking-wider font-semibold mb-2">{dict.cases.c2.problem}</div>
                     <p className="text-white/80 font-light leading-relaxed text-lg">{dict.cases.c2.problemDesc}</p>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-8"></div>
                  <div>
                     <div className="text-white/40 text-sm uppercase tracking-wider font-semibold mb-2">{dict.cases.c2.solution}</div>
                     <div className="flex flex-col sm:flex-row sm:items-end gap-4 mt-4">
                       <span className="text-6xl font-bold text-emerald-400 leading-none">%210</span>
                       <span className="text-white/80 font-light leading-relaxed pb-1 text-lg">{dict.cases.c2.solutionDesc}</span>
                     </div>
                  </div>
                </div>
              </FadeInUpWrapper>
            </div>
          </StaggerWrapper>
        </section>

        {/* Process Section */}
        <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto relative">
          <StaggerWrapper>
            <FadeInUpWrapper className="text-center mb-20">
              <h2 className="font-sans text-4xl md:text-5xl font-bold text-[#0A192F] tracking-tight mb-6">
                {dict.process.title1} <br/><span className="text-blue-600">{dict.process.title2}</span>
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">
                {dict.process.subtitle}
              </p>
            </FadeInUpWrapper>

            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-[45px] left-[10%] w-[80%] h-0.5 bg-gradient-to-r from-blue-100 via-blue-500 to-blue-100 z-0 opacity-20"></div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                {[
                  { icon: Search, title: dict.process.steps.s1.title, desc: dict.process.steps.s1.desc },
                  { icon: Layers, title: dict.process.steps.s2.title, desc: dict.process.steps.s2.desc },
                  { icon: Code2, title: dict.process.steps.s3.title, desc: dict.process.steps.s3.desc },
                  { icon: Rocket, title: dict.process.steps.s4.title, desc: dict.process.steps.s4.desc }
                ].map((step, i) => (
                  <FadeInUpWrapper key={i} className="relative text-center group">
                    <div className="w-24 h-24 mx-auto bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 group-hover:border-blue-400 group-hover:shadow-xl group-hover:shadow-blue-900/10 transition-all duration-500">
                      <step.icon className="w-8 h-8 text-[#0A192F] group-hover:text-blue-600 transition-colors" />
                    </div>
                    <h4 className="text-xl font-bold text-[#0A192F] mb-3">{step.title}</h4>
                    <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed px-4">
                      {step.desc}
                    </p>
                  </FadeInUpWrapper>
                ))}
              </div>
            </div>
          </StaggerWrapper>
        </section>

        {/* Deep Modern Contact Section */}
        <section id="contact" className="py-32 bg-[#0A192F] px-6 lg:px-12 relative overflow-hidden mt-10">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[150px] pointer-events-none"></div>
          
          <StaggerWrapper className="max-w-7xl mx-auto relative z-10">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 md:p-16 lg:p-24 shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                <FadeInUpWrapper>
                  <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-red-400 uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    {dict.contact.badge}
                  </div>
                  <h2 className="font-sans text-5xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-[1.1]">
                    {dict.contact.title1} <br className="hidden md:block"/>
                    {dict.contact.title2}
                  </h2>
                  <p className="text-blue-100/60 text-lg md:text-xl font-light mb-12 max-w-md leading-relaxed">
                    {dict.contact.subtitle}
                  </p>
                  
                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-4 text-white/70">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 border border-white/10">
                        <MapPin className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{dict.contact.hq.title}</h4>
                        <p className="text-sm leading-relaxed text-white/50">ALLMYSELL LLC<br/>7901 4th St N, Ste 300<br/>St. Petersburg, FL 33702, USA</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 text-white/70">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 border border-white/10">
                        <Phone className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{dict.contact.tr.title}</h4>
                        <p className="text-sm leading-relaxed text-white/50">+90 553 706 59 12<br/>+90 551 834 30 30</p>
                      </div>
                    </div>
                  </div>
                </FadeInUpWrapper>

                <FadeInUpWrapper className="space-y-6">
                  {/* Digital Contact Card */}
                  <div className="bg-[#0A192F]/50 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:bg-white/5 transition-colors duration-500">
                    <h4 className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">{dict.contact.card.title}</h4>
                    <div className="space-y-6">
                      <a href="mailto:info@allmysell.com" className="flex items-center justify-between text-white hover:text-blue-300 transition-all duration-300 group">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-white/5 rounded-xl group-hover:bg-blue-500/20 group-hover:scale-110 transition-all border border-white/5">
                            <Mail className="w-5 h-5 text-white/60 group-hover:text-blue-300" />
                          </div>
                          <div>
                            <span className="text-lg md:text-xl font-light tracking-wide block">info@allmysell.com</span>
                            <span className="text-xs text-white/40">{dict.contact.card.desc}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
                      </a>
                    </div>
                  </div>

                  <a href="mailto:info@allmysell.com" className="group flex items-center justify-center gap-3 w-full py-5 bg-white text-[#0A192F] rounded-2xl font-bold text-lg hover:bg-blue-50 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                    {dict.contact.cta}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </FadeInUpWrapper>
              </div>
            </div>
          </StaggerWrapper>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="py-12 bg-[#020A16] px-6 text-center border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
          <Link href={lang === 'tr' ? '/tr/hakkimizda' : '/en/about-us'} prefetch={false} className="text-sm font-medium text-white/50 hover:text-white transition-colors">{dict.nav.about}</Link>
          <Link href={lang === 'tr' ? '/tr/iletisim' : '/en/contact'} prefetch={false} className="text-sm font-medium text-white/50 hover:text-white transition-colors">{dict.nav.contact}</Link>
          <Link href={lang === 'tr' ? '/tr/gizlilik-politikasi' : '/en/privacy-policy'} prefetch={false} className="text-sm font-medium text-white/50 hover:text-white transition-colors">{dict.footer.privacy}</Link>
          <Link href={lang === 'tr' ? '/tr/cerez-politikasi' : '/en/cookie-policy'} prefetch={false} className="text-sm font-medium text-white/50 hover:text-white transition-colors">{dict.footer.cookie}</Link>
        </div>
        <p className="text-xs md:text-sm text-white/30 font-semibold tracking-[0.2em] uppercase">
          &copy; 2026 {dict.footer.text}
        </p>
      </footer>
    </div>
  );
}
