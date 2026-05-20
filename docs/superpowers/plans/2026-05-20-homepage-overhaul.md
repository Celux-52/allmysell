# Homepage Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the AllMySell landing page to a highly futuristic, premium Cyber-SaaS theme with rich visual assets, modern scroll-reveal animations, and high-tech terminal designs.

**Architecture:** We will use `framer-motion` for scroll reveals and dynamic hover interactions, enrich the background using Tailwind CSS gradients and global scans, copy our high-fidelity generated images into `public/` for fast rendering, and replace skeleton frames with premium UI elements.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS, Framer Motion, Lucide Icons

---

### Task 1: Asset Copy and Setup

**Files:**
- Create: `public/ai_core.png` (copied from generated)
- Create: `public/dashboard_mockup.png` (copied from generated)

- [ ] **Step 1: Copy AI Core image asset**

Run: `Copy-Item "C:\Users\melih\.gemini\antigravity-ide\brain\803e9bf9-6687-4c4d-aa27-28f9e1720dee\ai_core_visual_1779301253083.png" "c:\Users\melih\OneDrive\Desktop\AllMysell\public\ai_core.png"`

- [ ] **Step 2: Copy Dashboard Mockup image asset**

Run: `Copy-Item "C:\Users\melih\.gemini\antigravity-ide\brain\803e9bf9-6687-4c4d-aa27-28f9e1720dee\dashboard_mockup_1779301270737.png" "c:\Users\melih\OneDrive\Desktop\AllMysell\public\dashboard_mockup.png"`

- [ ] **Step 3: Verify assets in public folder**

Run: `Test-Path "c:\Users\melih\OneDrive\Desktop\AllMysell\public\ai_core.png"`
Expected: `True`

Run: `Test-Path "c:\Users\melih\OneDrive\Desktop\AllMysell\public\dashboard_mockup.png"`
Expected: `True`

- [ ] **Step 4: Commit asset changes**

```bash
git add public/ai_core.png public/dashboard_mockup.png
git commit -m "design: add generated cyber-saas assets for hero and dashboard"
```

---

### Task 2: Global Cyber Animations & Styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add scanning grid and glow keyframe definitions**

Add the following animations inside `app/globals.css` at the end of the file:
```css
@keyframes cyber-grid-scroll {
  0% { transform: translateY(0); }
  100% { transform: translateY(40px); }
}

@keyframes text-glow-shimmer {
  0%, 100% { text-shadow: 0 0 10px rgba(249, 115, 22, 0.2), 0 0 20px rgba(249, 115, 22, 0.1); }
  50% { text-shadow: 0 0 25px rgba(249, 115, 22, 0.6), 0 0 45px rgba(249, 115, 22, 0.3); }
}

.animate-cyber-grid {
  background-image: linear-gradient(rgba(249, 115, 22, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: cyber-grid-scroll 20s linear infinite;
}

.animate-text-glow {
  animation: text-glow-shimmer 4s ease-in-out infinite;
}
```

- [ ] **Step 2: Commit global styles**

```bash
git add app/globals.css
git commit -m "style: add custom keyframes and utilities for cyber-grid and text-glow"
```

---

### Task 3: Hero Section Redesign & Animation

**Files:**
- Modify: `components/HeroSection.tsx`

- [ ] **Step 1: Implement AI Core Image and Layout split inside HeroSection**

Modify `components/HeroSection.tsx:94-171` to introduce a two-column grid on desktop: the left side has the text and CTAs, and the right side features the glowing `ai_core.png` with a rich backdrop float animation:

```typescript
  return (
    <div className="space-y-32 pb-32 max-w-7xl mx-auto px-4 sm:px-6 relative overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="relative pt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-[-100px] left-[-200px] w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-orange-600/8 blur-[80px] sm:blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[20%] right-[-100px] w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-violet-600/5 blur-[80px] sm:blur-[150px] rounded-full"></div>
        </div>

        {/* Left Column: Text Content */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
            <span className="text-[10px] font-black text-green-200 uppercase tracking-[0.3em]">{t('hero.status')}</span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 italic leading-none"
          >
            ALLMY<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 drop-shadow-[0_0_30px_rgba(249,115,22,0.3)] animate-text-glow">SELL</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-lg sm:text-xl text-slate-400 font-medium leading-relaxed mb-12"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto"
          >
            <Link 
              href="/register"
              className="w-full sm:w-auto group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black uppercase tracking-widest text-xs hover:shadow-[0_0_35px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              {t('hero.cta1')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/pricing"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              <Crown className="w-4 h-4 text-amber-500" />
              {t('hero.cta2')}
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-xl"
          >
            {localStats.map((stat, i) => (
              <div key={i} className="text-center p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
                <div className="text-xl sm:text-2xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Glowing AI Core Sphere */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-5 flex justify-center relative group"
        >
          {/* Animated Background Rings */}
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-purple-500/10 rounded-full blur-[100px] -z-10 group-hover:from-orange-500/30 group-hover:to-purple-500/20 transition-all duration-700"></div>
          
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative p-6 rounded-[3rem] border border-white/10 bg-slate-950/40 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            <img 
              src="/ai_core.png" 
              alt="AllMySell AI Neural Engine Core" 
              className="w-full max-w-[360px] h-auto object-contain rounded-3xl drop-shadow-[0_0_50px_rgba(249,115,22,0.35)]" 
            />
          </motion.div>
        </motion.div>
      </div>
```

- [ ] **Step 2: Run verification on build**

Run: `npm run build`
Expected: Passes compile without TypeScript errors.

- [ ] **Step 3: Commit Hero redesign**

```bash
git add components/HeroSection.tsx
git commit -m "feat: redesign hero section with glowing 3D AI Core and multi-column grid layout"
```

---

### Task 4: Command Center overhaul with high-fidelity Mockup

**Files:**
- Modify: `components/HomePageSections.tsx`

- [ ] **Step 1: Replace command center layout inside HomePageSections**

Modify `components/HomePageSections.tsx:38-87` to replace the empty skeleton wireframe with a gorgeous floating mockup container showing `/dashboard_mockup.png` enriched with `framer-motion` interactive 3D hover effects:

```typescript
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-[#0d111c]/40 p-2 shadow-2xl backdrop-blur-xl group transition-all hover:border-orange-500/30"
          >
            <BorderBeam size={400} duration={15} delay={9} colorFrom="#f97316" colorTo="#a855f7" />
            <div className="relative rounded-[2rem] overflow-hidden border border-white/5 bg-[#050810] shadow-inner">
              <motion.div 
                whileHover={{ scale: 1.01, rotateX: 2, rotateY: -2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative overflow-hidden"
              >
                <img 
                  src="/dashboard_mockup.png" 
                  alt="AllMySell E-commerce Sniper Dashboard Mockup" 
                  className="w-full h-auto object-cover rounded-[1.8rem] border border-white/5" 
                />
                
                {/* HUD Scanline effect on top */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_0%,rgba(249,115,22,0.02)_50%,transparent_100%)] bg-[length:100%_8px] opacity-30"></div>
              </motion.div>
            </div>
          </motion.div>
```

- [ ] **Step 2: Run verification on build**

Run: `npm run build`
Expected: Compile success.

- [ ] **Step 3: Commit Command Center changes**

```bash
git add components/HomePageSections.tsx
git commit -m "feat: replace skeleton frame with high-fidelity dashboard visual in command center"
```
