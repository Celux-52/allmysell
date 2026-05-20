# Web Solutions Elite Outreach Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the existing `/web-solutions` route to deliver an ultra-premium, high-converting agency landing page for businesses receiving custom outreach.

**Architecture:** Create a bilingual, component-driven, responsive dashboard landing page using `framer-motion` for micro-interactions, `Particles` and `BorderBeam` for premium aesthetics, and direct WhatsApp lead triggers targeting Melih and Yunus. Leverage active language context (`lang`) from `useI18n` to swap between Turkish and English copywriting natively.

**Tech Stack:** Next.js 15, React 19, TailwindCSS, Framer Motion, Lucide Icons, and pre-built AllMySell UI assets (`Particles`, `BorderBeam`, `MagicCard`, `Button`).

---

### Task 1: Re-compile and Verify Current Baseline
Before modifying any files, verify that the project currently builds cleanly and has zero compilation issues.

**Files:**
- Modify: None.
- Test: Verify project compiles.

- [ ] **Step 1: Run TypeScript compilation check**
  Run: `npx tsc --noEmit`
  Expected: Successful exit with no output (0 errors).

---

### Task 2: Implement Premium Web Solutions Page Structure
Overhaul the `app/web-solutions/page.tsx` file with a completely redesigned, premium layout using interactive components and bilingual high-end copywriting.

**Files:**
- Modify: `app/web-solutions/page.tsx`
- Test: Compile and render checking.

- [ ] **Step 1: Replace entire contents of page.tsx**
  Replace the contents of `app/web-solutions/page.tsx` with the following clean, highly interactive React component code:

```typescript
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Particles } from "@/components/ui/particles";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  X, 
  Smartphone, 
  Search, 
  Cpu, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare, 
  Layers, 
  Activity,
  Maximize2
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function WebSolutionsPage() {
  const { lang } = useI18n();
  const isTr = lang === "tr";

  // State for simulated interactive phone mockup (salon page vs clinik preview)
  const [mockupType, setMockupType] = useState<"salon" | "clinic">("salon");

  // Copywriting content dictionary for TR / EN
  const copy = {
    badge: isTr ? "ÖZEL BÖLGESEL PRESTİJ PROJESİ" : "EXCLUSIVE REGIONAL PRESTIGE PROJECT",
    heroTitle1: isTr ? "Modern İşletmeler İçin" : "Bespoke Digital Prestige",
    heroTitle2: isTr ? "Kusursuz Dijital Prestij" : "For Modern Businesses",
    heroDesc: isTr 
      ? "AllMySell LLC olarak yerel işletmelerin dijital saygınlığını yeniden tanımlıyoruz. WordPress şablonlarından uzak, işletmenizin kalitesini birebir yansıtan, hız ve dönüşüm odaklı özel web mühendisliği sistemleri sunuyoruz."
      : "At AllMySell LLC, we redefine digital prestige for premium local businesses. Zero templates. Zero compromises. We build bespoke, lightning-fast web systems engineered to turn search traffic into loyal customers.",
    ctaDiscover: isTr ? "Hizmeti Keşfedin" : "Explore Solutions",
    ctaShowcase: isTr ? "Örnek Tasarımı İnceleyin" : "View Showcases",
    
    whyTitle: isTr ? "Neden Profesyonel Bir Web Sistemi?" : "Why Custom Web Infrastructure Matters",
    whyDesc: isTr
      ? "Web siteniz, markanızın dijital dünyadaki ana giriş kapısıdır. Yavaş, özensiz veya ucuz bir şablonla kurulmuş bir site; sunduğunuz üstün hizmet kalitesine gölge düşürür ve müşterilerinizde güvensizlik yaratır. Biz, işletmenizin el emeğini ve prestijini dijitalde hak ettiği saygınlıkla sergiliyoruz."
      : "Your website is the single most important trust factor for a new customer. A slow, outdated, or template-based page actively bleeds authority and pushes high-intent leads to your competitors. We construct elite digital facades that command premium value.",
    
    pillarsTitle: isTr ? "Mühendislik ve Güven Standartlarımız" : "Our Engineering & Performance Standards",
    pillarsSub: isTr ? "Sadece güzel görünmeyen, işletmenizi büyüten altyapı özellikleri" : "Infrastructure engineered to convert visitors into booked appointments",
    
    pillar1Title: isTr ? "Kusursuz Mobil Deneyim" : "Mobile-First UX",
    pillar1Desc: isTr ? "Yerel aramaların %85'inden fazlası mobil cihazlardan gelir. Telefon ekranlarında yağ gibi akan özel mobil akışlar tasarlıyoruz." : "Over 85% of local discovery happens on mobile. We handcraft responsive mobile-first journeys built for smartphone conversions.",
    
    pillar2Title: isTr ? "Google Yerel SEO Hakimiyeti" : "Local SEO Engine",
    pillar2Desc: isTr ? "'Bölgemdeki en iyi salon', 'yakınımdaki klinik' aramalarında Google'da ilk sıralarda görünmenizi sağlayan yapısal SEO kodlaması." : "Dominate local searches like 'best clinic near me' or 'premium salon'. We embed schema markup and semantic SEO directly into the core code.",
    
    pillar3Title: isTr ? "Milisaniyelik Açılış Hızları" : "Sub-Second Speed",
    pillar3Desc: isTr ? "Next.js 15 ve Vercel Edge sunucuları ile 0.8 saniyenin altında yüklenme hızları. Yavaş açılan sitelerin aksine sıfır müşteri kaybı." : "Built on Next.js 15 and serverless edge deployment. 0.8s load times guarantee zero drop-offs and flawless search indexing.",
    
    pillar4Title: isTr ? "Dönüşüm Odaklı Mimari" : "Conversion Engineering",
    pillar4Desc: isTr ? "Sıradan sayfaların aksine, ziyaretçiyi anında WhatsApp randevu hattına veya rezervasyon sistemine bağlayan sıfır sürtünmeli CTA'ler." : "Zero-friction client loops connecting visitors instantly to your direct booking system or high-velocity WhatsApp channels.",
    
    contrastTitle: isTr ? "Farkı Kendi Gözlerinizle Görün" : "The Architectural Contrast",
    contrastSub: isTr ? "Neden ucuz şablonların size müşteri kaybettirdiğini görün" : "Understand why amateur templates actively damage your business authority",
    contrastBadTitle: isTr ? "Diğerleri (Standart Şablon & WordPress)" : "The Template Approach (Generic WordPress)",
    contrastGoodTitle: isTr ? "AllMySell Premium Standartı" : "The AllMySell Standard",
    
    timelineTitle: isTr ? "Yaratım ve Yayına Alım Süreci" : "The Engineering Roadmap",
    timelineSub: isTr ? "Fikir aşamasından yayına kadar tamamen şeffaf süreç" : "A fully-managed, frictionless deployment process from audit to launch",
    
    step1Title: isTr ? "1. Keşif & Bölgesel Analiz" : "1. Local Discovery & Audit",
    step1Desc: isTr ? "Bölgenizdeki rakipleri, müşteri arama alışkanlıklarını ve hedef kelimeleri inceliyoruz." : "We analyze regional competitors, map local search volume, and define high-value search keywords.",
    step2Title: isTr ? "2. Özel Arayüz Tasarımı" : "2. Bespoke UI/UX Design",
    step2Desc: isTr ? "Şablon kullanmadan, markanızın prestijini ve kalitesini tam yansıtan el yapımı tasarım taslakları sunuyoruz." : "Zero standard templates. We build custom design drafts reflecting the luxury character of your physical location.",
    step3Title: isTr ? "3. SEO & Altyapı Mühendisliği" : "3. Performance Engineering",
    step3Desc: isTr ? "Tasarımı en güncel kodlama standartlarıyla Next.js'e döküyor, Lighthouse skorlarını 100'e sabitliyoruz." : "We hardcode your site into high-performance Next.js 15, securing perfect 100/100 Lighthouse performance metrics.",
    step4Title: isTr ? "4. Bölgesel Lansman & Canlı" : "4. Regional Launch & Scaling",
    step4Desc: isTr ? "Sitenizi global bulut sunucularda yayına alıyor, Google Haritalar profilinizle entegre ederek dönüşümü başlatıyoruz." : "Deploy to absolute high availability, link with Google Maps/Places profiles, and open instant booking pipelines.",
    
    finalBadge: isTr ? "🔴 SINIRLI BÖLGESEL KONTENJAN" : "🔴 STRICT REGIONAL LIMITATION",
    finalTitle: isTr ? "Bölgemizdeki Tek Lider İşletme Siz Olun" : "Claim Market Dominance in Your Area",
    finalDesc: isTr
      ? "Hizmet ve operasyon kalitemizi en üst düzeyde tutmak amacıyla, her bölgede sadece TEK bir işletmenin kurumsal web tasarım projesini üstleniyoruz. Diğer rakipleriniz harekete geçmeden önce prestijli yerinizi ayırtın."
      : "To maintain absolute engineering and service quality, we execute web solutions for ONLY ONE premium business per sector in each region. Secure your digital monopoly before a competitor does.",
    finalCta: isTr ? "WhatsApp ile 'BAŞLAYALIM' Yazın" : "Text 'START' on WhatsApp",
    finalSubCta: isTr ? "Ön görüşme tamamen ücretsizdir. Taahhüt gerektirmez." : "Discovery consult is 100% free. Zero obligation."
  };

  return (
    <div className="bg-[#02040a] min-h-screen text-white selection:bg-orange-500/30 relative overflow-hidden pb-32">
      {/* Dynamic Ambient Particles Grid */}
      <Particles className="absolute inset-0 z-0 pointer-events-none" quantity={140} color="#F97316" ease={70} />

      {/* Cyberpunk Scanline HUD Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(249,115,22,0.02)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-orange-500/5 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 pt-36 pb-20 relative z-10 max-w-7xl">
        
        {/* --- 1. HERO SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-36">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <AnimatedGradientText className="inline-flex">
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
                <Sparkles className="h-3 w-3 text-orange-400" />
                {copy.badge}
              </span>
            </AnimatedGradientText>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.9]">
              {copy.heroTitle1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">
                {copy.heroTitle2}
              </span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl font-medium leading-relaxed max-w-xl">
              {copy.heroDesc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#cta-section" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black uppercase tracking-widest px-8 py-7 shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all">
                  {copy.finalCta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#showcase-section" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black uppercase tracking-widest px-8 py-7 active:scale-[0.98] transition-all">
                  {copy.ctaShowcase}
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Dynamic Interactive Phone & Performance Simulator */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[420px] rounded-[3rem] border border-white/10 bg-slate-950/80 p-4 shadow-2xl backdrop-blur-3xl">
              <BorderBeam size={300} duration={14} colorFrom="#f97316" colorTo="#fbbf24" />
              
              {/* Internal Simulator Frame */}
              <div className="rounded-[2.5rem] bg-[#03060f] border border-white/5 p-6 overflow-hidden relative">
                {/* HUD Top Bar */}
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">UX SIMULATOR</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setMockupType("salon")}
                      className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-md transition-all ${mockupType === "salon" ? "bg-orange-500 text-white" : "bg-white/5 text-slate-400"}`}
                    >
                      SALON
                    </button>
                    <button 
                      onClick={() => setMockupType("clinic")}
                      className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-md transition-all ${mockupType === "clinic" ? "bg-orange-500 text-white" : "bg-white/5 text-slate-400"}`}
                    >
                      CLINIC
                    </button>
                  </div>
                </div>

                {/* Lighthouse Stats Cards */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {[
                    { label: "PERF", val: "100", col: "text-green-400 border-green-500/20" },
                    { label: "SEO", val: "100", col: "text-green-400 border-green-500/20" },
                    { label: "UX", val: "100", col: "text-green-400 border-green-500/20" },
                    { label: "SEC", val: "SSL", col: "text-orange-400 border-orange-500/20" },
                  ].map((stat, i) => (
                    <div key={i} className={`border rounded-xl p-2 text-center bg-slate-900/50 backdrop-blur ${stat.col}`}>
                      <p className="text-[9px] font-black text-slate-500 tracking-wider uppercase">{stat.label}</p>
                      <p className="text-sm font-black mt-0.5">{stat.val}</p>
                    </div>
                  ))}
                </div>

                {/* Wireframe Mockup Visual */}
                <div className="rounded-2xl border border-white/5 bg-slate-950/90 p-4 space-y-4 relative min-h-[220px] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center font-black text-xs text-black">
                      {mockupType === "salon" ? "H" : "M"}
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider">
                        {mockupType === "salon" ? "HAIR MESS BOMONTI" : "MEDICINE LUX CLINIC"}
                      </h4>
                      <p className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">
                        {mockupType === "salon" ? "Premium Beauty Lab" : "Bespoke Aesthetics"}
                      </p>
                    </div>
                  </div>

                  {/* Wireframe Hero Banner */}
                  <div className="h-20 w-full rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/5 border border-orange-500/20 flex flex-col justify-center px-4 relative overflow-hidden">
                    <div className="absolute right-2 top-2 h-1 w-8 rounded-full bg-white/10" />
                    <p className="text-[10px] font-black text-white leading-none">
                      {mockupType === "salon" ? "Kusursuz Değişim," : "Prestige Aesthetics,"}
                    </p>
                    <p className="text-[10px] font-black text-orange-400 mt-1 leading-none">
                      {mockupType === "salon" ? "Hak Ettiğiniz İlgi." : "Hardcoded Excellence."}
                    </p>
                  </div>

                  {/* Booking Simulation Action */}
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-2 flex items-center justify-center">
                      <div className="h-1.5 w-12 rounded-full bg-slate-600" />
                    </div>
                    <div className="flex-1 bg-orange-500/20 border border-orange-500/30 rounded-xl p-2 flex items-center justify-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-ping" />
                      <span className="text-[8px] font-black text-orange-400 uppercase tracking-widest">BOOK NOW</span>
                    </div>
                  </div>

                  {/* Floating Analytics HUD Card */}
                  <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-white/10 rounded-xl p-3 shadow-2xl flex items-center gap-3">
                    <Activity className="h-4 w-4 text-green-400" />
                    <div>
                      <p className="text-[8px] font-black text-slate-500 uppercase leading-none">CONVERSIONS</p>
                      <p className="text-[11px] font-black text-white mt-1 leading-none">+285% MONTHLY</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>


        {/* --- 2. WHY IT MATTERS SECTION (Psychological Shift) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-36"
        >
          <div className="rounded-[2.5rem] border border-white/5 bg-slate-950/40 p-8 md:p-16 backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[120px]" />
            <div className="max-w-4xl mx-auto space-y-6 text-center">
              <span className="text-orange-500 font-black text-xs uppercase tracking-[0.2em]">{copy.whyTitle}</span>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-relaxed">
                "{copy.whyDesc}"
              </p>
            </div>
          </div>
        </motion.div>


        {/* --- 3. CORE PILLARS SECTION (Mühendislik Standartları) --- */}
        <div className="mb-36 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">{copy.pillarsTitle}</h2>
            <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">{copy.pillarsSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: copy.pillar1Title, desc: copy.pillar1Desc, icon: Smartphone, glow: "#f97316", badge: "MOBILE-FIRST" },
              { title: copy.pillar2Title, desc: copy.pillar2Desc, icon: Search, glow: "#3b82f6", badge: "LOCAL SEO" },
              { title: copy.pillar3Title, desc: copy.pillar3Desc, icon: Cpu, glow: "#a855f7", badge: "NEXT.JS 15" },
              { title: copy.pillar4Title, desc: copy.pillar4Desc, icon: TrendingUp, glow: "#10b981", badge: "CRO SYSTEM" }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <MagicCard className="p-8 rounded-[2.5rem] bg-[#0a0d18]/40 border-white/5 flex flex-col justify-between h-full relative overflow-hidden hover:border-white/10 transition-all group">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                        <pillar.icon className="h-6 w-6" />
                      </div>
                      <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase bg-white/5 px-2.5 py-1 rounded-md">{pillar.badge}</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-black uppercase tracking-tight text-white">{pillar.title}</h3>
                      <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>


        {/* --- 4. SHOWCASE SECTION (Before & After) --- */}
        <div id="showcase-section" className="mb-36 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">{copy.contrastTitle}</h2>
            <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">{copy.contrastSub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* The Bad Template Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2.5rem] border border-red-500/20 bg-slate-950/20 p-8 space-y-6 relative overflow-hidden group"
            >
              <div className="flex justify-between items-center">
                <span className="text-red-500 font-black text-xs uppercase tracking-widest">{copy.contrastBadTitle}</span>
                <X className="h-6 w-6 text-red-500" />
              </div>

              <div className="space-y-4 opacity-70 group-hover:opacity-100 transition-opacity">
                {[
                  isTr ? "Sıradan WordPress şablonları (Yavaş, güvensiz, eski)" : "Slow WordPress templates with excessive plugins",
                  isTr ? "Müşteriyi kaçıran 4.5 saniye üzeri yüklenme süreleri" : "Load times exceeding 4.5 seconds driving users away",
                  isTr ? "Telefonlarda kırılan ekran tasarımları ve kayan butonlar" : "Broken responsive views and sliding layouts on phones",
                  isTr ? "Google aramalarında görünmeyen, özensiz SEO kodlaması" : "Unoptimized site metadata rendering you invisible on Google",
                  isTr ? "Güven vermeyen, amatör görünümlü iletişim formları" : "Unprofessional, friction-heavy contact fields that drop leads"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-sm font-medium text-slate-400">
                    <span className="h-5 w-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 flex-shrink-0 mt-0.5">✕</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* The Good Custom Code Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2.5rem] border border-green-500/30 bg-slate-950/60 p-8 space-y-6 relative overflow-hidden group shadow-2xl"
            >
              <BorderBeam size={400} duration={12} colorFrom="#10b981" colorTo="#34d399" />
              <div className="flex justify-between items-center">
                <span className="text-green-400 font-black text-xs uppercase tracking-widest">{copy.contrastGoodTitle}</span>
                <Check className="h-6 w-6 text-green-400 animate-pulse" />
              </div>

              <div className="space-y-4">
                {[
                  isTr ? "Tamamen el yapımı, size özel modern tasarımlar" : "Bespoke custom aesthetics unique to your premium brand",
                  isTr ? "Next.js 15 altyapısı ile 0.8 saniyenin altında açılış hızları" : "Next.js 15 edge compilations providing <0.8s delivery",
                  isTr ? "Telefon ekranları için tasarlanmış yağ gibi akan mobil UX" : "Silky-smooth, responsive viewport engineering on smartphones",
                  isTr ? "Semantik schema verileri ile entegre, tam Google uyumu" : "Hardcoded structured data blueprints for SEO index dominance",
                  isTr ? "Ziyaretçiyi anında randevuya bağlayan sıfır sürtünmeli WhatsApp akışı" : "Zero-friction CTAs connecting leads instantly to direct agents"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-sm font-medium text-slate-200">
                    <span className="h-5 w-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>


        {/* --- 5. THE PROCESS SECTION (Roadmap) --- */}
        <div className="mb-36 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">{copy.timelineTitle}</h2>
            <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">{copy.timelineSub}</p>
          </div>

          <div className="max-w-3xl mx-auto relative pl-8 border-l border-white/10 space-y-12">
            {[
              { title: copy.step1Title, desc: copy.step1Desc },
              { title: copy.step2Title, desc: copy.step2Desc },
              { title: copy.step3Title, desc: copy.step3Desc },
              { title: copy.step4Title, desc: copy.step4Desc }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative"
              >
                {/* Glowing Node on Timeline */}
                <div className="absolute -left-[41px] top-1.5 h-6 w-6 rounded-full border border-orange-500 bg-[#02040a] flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase text-white tracking-tight">{step.title}</h3>
                  <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* --- 6. EXCLUSIVE CTA SECTION (Scarcity & Conversion) --- */}
        <motion.div 
          id="cta-section"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-slate-950/60 p-8 md:p-16 text-center backdrop-blur-3xl shadow-2xl">
            <BorderBeam size={500} duration={15} colorFrom="#f97316" colorTo="#a855f7" />
            
            <div className="space-y-8 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em]">
                {copy.finalBadge}
              </span>

              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
                {copy.finalTitle}
              </h2>

              <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed">
                {copy.finalDesc}
              </p>

              {/* Seamless Double Lead Dispatch Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                <a
                  href={`https://wa.me/905537065912?text=${encodeURIComponent(isTr ? "BAŞLAYALIM" : "START")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-8 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-green-500/10 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]"
                >
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-black text-sm">M</div>
                  <span>Melih • WhatsApp</span>
                </a>
                <a
                  href={`https://wa.me/905518343030?text=${encodeURIComponent(isTr ? "BAŞLAYALIM" : "START")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-8 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-orange-500/10 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-black font-black text-sm">Y</div>
                  <span>Yunus • WhatsApp</span>
                </a>
              </div>

              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                {copy.finalSubCta}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
```

- [ ] **Step 2: Save the file**
  Save the completed file to `c:\Users\melih\OneDrive\Desktop\AllMysell\app\web-solutions\page.tsx`.

- [ ] **Step 3: Verify no syntax or import errors**
  Run: `npx tsc --noEmit`
  Expected: Successful exit code 0.

---

### Task 3: Local Dev Validation
Verify that the route compiles and loads perfectly in the local environment without runtime issues.

**Files:**
- Test: Local browser loading verification.

- [ ] **Step 1: Check server access and page response**
  Wait 3 seconds for the dev server to hot-reload, and then fetch `http://localhost:3000/web-solutions` to confirm successful compile.
  Run: `npx next-router-mock` or simple curl fetch via `read_url_content`
  Expected: Return HTML with successful 200 OK status containing the newly written copy.
