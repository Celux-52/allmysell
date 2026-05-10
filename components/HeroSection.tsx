'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Sparkles, TrendingUp, BarChart3, ArrowRight, Zap, 
  ShieldCheck, Loader2, CheckCircle, Store, Tag, Heart, Eye, 
  ExternalLink, PenTool, Factory, Star, Globe, Cpu, Layers, 
  Database, Layout, MousePointer2, X, ShoppingBag
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { EtsyStorage } from "@/modules/etsy-automation/services/etsyStorage";
import { createClient } from "@/lib/supabase/client";

export default function HeroSection({ isPreview = false }: { isPreview?: boolean }) {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discoveredNiches, setDiscoveredNiches] = useState<any[]>([]);
  const [isGeneratingListing, setIsGeneratingListing] = useState(false);
  const [isFindingSupplier, setIsFindingSupplier] = useState(false);
  const [listing, setListing] = useState<any>(null);
  const [supplier, setSupplier] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) setUserEmail(user.email);
    };
    init();
  }, []);

  // Stats for the "SaaS Showcase"
  const stats = [
    { label: 'Active Snipers', value: '1,284', icon: <Cpu className="w-4 h-4" /> },
    { label: 'Niches Analyzed', value: '42.5k', icon: <Database className="w-4 h-4" /> },
    { label: 'Market Velocity', value: 'High', icon: <TrendingUp className="w-4 h-4 text-green-500" /> },
  ];

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    runAnalysis(keyword);
  };

  const runAnalysis = async (query: string) => {
    if (isPreview) {
      // Mock loading for preview
      setIsLoading(true);
      setAnalysisStep(1);
      setTimeout(() => setAnalysisStep(2), 1000);
      setTimeout(() => {
        setIsLoading(false);
        setAnalysisStep(0);
        alert("This is a preview. Please log in to view real market data.");
      }, 2000);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/etsy/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: query }),
      });
      if (!res.ok) throw new Error("Analysis failed");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscover = async (strategy: string) => {
    if (isPreview) {
      alert("Please log in to use autonomous discovery.");
      return;
    }
    setIsDiscovering(true);
    try {
      const res = await fetch("/api/etsy/discover-niches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategy }),
      });
      const data = await res.json();
      if (data.success) setDiscoveredNiches(data.niches);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDiscovering(false);
    }
  };

  const handleSaveProduct = () => {
    if (!result || !userEmail || isSaved) return;
    const success = EtsyStorage.saveProduct(userEmail, {
      keyword,
      title: result.product.title,
      price: result.product.price,
      currency: result.product.currency,
      favorites: result.product.favorites,
      views: result.product.views,
      url: result.product.url,
      imageUrl: result.product.imageUrl,
      shopName: result.product.shopName,
      trendScore: result.analysis.trendScore,
      decision: result.analysis.decision,
    });
    if (success) setIsSaved(true);
  };

  return (
    <div className="space-y-24 pb-32 max-w-7xl mx-auto px-4 sm:px-6 relative overflow-hidden">
      
      {/* --- BACKGROUND CINEMATICS --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-100px] left-[-200px] w-[600px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[-100px] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative pt-20 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,1)]"></div>
          <span className="text-[10px] font-black text-orange-200 uppercase tracking-[0.3em]">Intelligence Core V2.4 Active</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 italic leading-none"
        >
          ALLMY<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]">SELL</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl text-xl text-slate-400 font-medium leading-relaxed mb-12"
        >
          The world&apos;s most advanced e-commerce intelligence platform. 
          Deploy AI agents to analyze markets, find winning products, and generate 
          listings that dominate every marketplace algorithm.
        </motion.p>

        {/* --- MAIN CALL TO ACTION --- */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-2xl mb-24">
          <motion.form 
            onSubmit={handleAnalyze}
            className="flex-1 w-full relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-700 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-[#0d111c]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 pl-6">
              <Search className="w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter Niche or Product URL..."
                className="w-full bg-transparent border-none focus:ring-0 text-white text-base px-4 placeholder:text-slate-600 font-medium"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-orange-500 hover:bg-orange-400 text-white font-black py-4 px-8 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 shadow-xl shadow-orange-500/20 uppercase tracking-widest text-xs"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                <span>{isLoading ? 'INITIATING...' : 'SNIPE'}</span>
              </button>
            </div>
          </motion.form>
          
          <Link href="/register" className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all flex items-center justify-center gap-3">
             GET ACCESS <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* --- SAAS PANEL PREVIEW (THE "AD" STYLE) --- */}
        {!result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="w-full max-w-6xl relative group"
          >
            {/* Decorative Glows */}
            <div className="absolute -top-10 left-1/4 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full animate-pulse"></div>
            <div className="absolute -bottom-10 right-1/4 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>

            <div className="relative bg-[#0d111c] border border-white/10 rounded-[3rem] p-1 shadow-2xl overflow-hidden">
              {/* Header Bar Mockup */}
              <div className="h-14 border-b border-white/5 flex items-center px-8 justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
                  </div>
                  <div className="h-6 w-px bg-white/10 mx-2"></div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                    <Layout className="w-3 h-3 text-slate-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dashboard V2</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                    {stats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-slate-600">{stat.icon}</span>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}:</span>
                        <span className="text-[10px] font-black text-white">{stat.value}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Dashboard Content Mockup */}
              <div className="p-8 grid grid-cols-12 gap-6 bg-gradient-to-b from-transparent to-[#050810]/50">
                {/* Left Sidebar Mockup */}
                <div className="col-span-3 space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`p-4 rounded-2xl border transition-all ${i === 1 ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' : 'bg-white/5 border-white/5 text-slate-600'}`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${i === 1 ? 'bg-orange-500 text-white' : 'bg-white/5'}`}>
                              {i === 1 ? <TrendingUp size={16} /> : i === 2 ? <Zap size={16} /> : i === 3 ? <Layers size={16} /> : <Database size={16} />}
                            </div>
                            <div className="flex-1">
                              <div className="h-2 w-16 bg-current opacity-20 rounded-full"></div>
                            </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Center Grid Mockup */}
                <div className="col-span-9 space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                          <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl relative overflow-hidden group/card">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                                  <Sparkles className="w-5 h-5 text-slate-400" />
                                </div>
                                <span className="text-[9px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">+24%</span>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-white/10 rounded-lg"></div>
                                <div className="h-8 w-16 bg-white/20 rounded-lg"></div>
                            </div>
                          </div>
                      ))}
                    </div>

                    {/* Main Visual Display */}
                    <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] relative overflow-hidden">
                      <div className="flex items-center justify-between mb-8">
                          <div>
                            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-1 italic">Neural Analysis Active</h4>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Scanning Global Marketplace Trends...</p>
                          </div>
                          <div className="flex gap-2">
                            <div className="px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-[9px] font-black text-orange-500 uppercase tracking-widest">High Probability</div>
                          </div>
                      </div>
                      
                      <div className="space-y-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl border border-white/5 group/row hover:bg-white/[0.08] transition-all">
                              <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/5"></div>
                              <div className="flex-1 space-y-2">
                                  <div className="h-3 w-1/3 bg-white/10 rounded-full"></div>
                                  <div className="h-2 w-1/2 bg-white/5 rounded-full"></div>
                              </div>
                              <div className="flex items-center gap-4">
                                  <div className="text-right">
                                    <div className="h-3 w-12 bg-white/10 rounded-full ml-auto mb-1"></div>
                                    <div className="h-2 w-8 bg-white/5 rounded-full ml-auto"></div>
                                  </div>
                                  <div className="w-8 h-8 rounded-full border border-orange-500/30 flex items-center justify-center text-orange-500">
                                    <ArrowRight size={14} />
                                  </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                </div>
              </div>

              {/* Cinematic Overlay */}
              <div className="absolute inset-0 pointer-events-none border-[12px] border-[#0d111c] rounded-[3rem] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
              
              {/* Animated Scanning Pointer */}
              <motion.div 
                animate={{ 
                    x: [100, 800, 300, 700],
                    y: [100, 300, 500, 200]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-20 pointer-events-none"
              >
                <div className="relative">
                    <MousePointer2 className="w-6 h-6 text-orange-500 fill-orange-500/20" />
                    <motion.div 
                      animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-orange-500 rounded-full blur-xl"
                    ></motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* --- QUICK DISCOVERY TABS --- */}
      {!result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { label: 'Mashup Discovery', strategy: 'mashup', icon: <Sparkles className="w-5 h-5" />, color: 'orange', desc: 'Mix unexpected niches' },
            { label: 'Arbitrage Scanner', strategy: 'arbitrage', icon: <TrendingUp className="w-5 h-5" />, color: 'blue', desc: 'TikTok -> Etsy gaps' },
            { label: 'Pain-Point Finder', strategy: 'problem-solver', icon: <PenTool className="w-5 h-5" />, color: 'purple', desc: 'Solve user problems' },
          ].map((item, i) => (
            <motion.button
              key={item.strategy}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (i * 0.1) }}
              onClick={() => handleDiscover(item.strategy)}
              disabled={isDiscovering}
              className="flex flex-col items-center text-center p-6 rounded-3xl border border-white/5 bg-[#0d111c]/50 hover:border-white/20 hover:bg-white/5 transition-all group relative overflow-hidden"
            >
              <div className={`p-3 rounded-2xl bg-${item.color}-500/10 text-${item.color}-400 mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                {item.icon}
              </div>
              <span className="text-white font-bold text-sm mb-1">{item.label}</span>
              <span className="text-slate-500 text-[10px] font-medium">{item.desc}</span>
            </motion.button>
          ))}
        </div>
      )}

      {/* --- DISCOVERED NICHES --- */}
      <AnimatePresence>
        {(isDiscovering || discoveredNiches.length > 0) && !result && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            className="space-y-4 pt-10"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-white font-black tracking-tight flex items-center gap-3 text-xl">
                <Zap className="w-5 h-5 text-orange-500 fill-orange-500/20" /> 
                AUTONOMOUS DISCOVERY FEED
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Updates</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {isDiscovering ? (
                [1, 2, 3, 4].map(i => (
                  <div key={i} className="h-40 bg-white/5 rounded-3xl border border-white/10 relative overflow-hidden group">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-slate-700" />
                      <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Scanning Web...</span>
                    </div>
                  </div>
                ))
              ) : (
                discoveredNiches.map((niche, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card
                      className="p-5 bg-[#0d111c] border-white/10 hover:border-orange-500/40 transition-all cursor-pointer group relative overflow-hidden h-full flex flex-col"
                      onClick={() => { setKeyword(niche.name); runAnalysis(niche.name); }}
                    >
                      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sparkles className="w-12 h-12 text-white" />
                      </div>
                      
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[9px] font-black uppercase text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">HOT Niche</span>
                        <div className="flex items-center gap-1">
                          <BarChart3 className="w-3 h-3 text-green-400" />
                          <span className="text-[10px] font-bold text-green-400">{niche.competitionLevel} Comp</span>
                        </div>
                      </div>
                      
                      <h4 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">{niche.name}</h4>
                      <p className="text-slate-500 text-xs line-clamp-3 mb-4 leading-relaxed italic">&quot;{niche.whyItWorks}&quot;</p>
                      
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                         <span className="text-[10px] font-bold text-slate-400">Match 94%</span>
                         <span className="text-[10px] font-bold text-orange-500 flex items-center gap-1">
                           Snipe Now <ArrowRight className="w-3 h-3" />
                         </span>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LIVE ANALYSIS ENGINE (CINEMATIC LOADING) --- */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050810]/90 backdrop-blur-sm p-4"
          >
            <div className="max-w-xl w-full space-y-12">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                   <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full"></div>
                   <Loader2 className="h-24 w-24 animate-spin text-orange-500 relative z-10 stroke-[1px]" />
                </div>
                <div className="text-center">
                   <h3 className="text-4xl font-black text-white tracking-tighter mb-2 italic">ENGINES FIRING UP</h3>
                   <p className="text-slate-500 font-black tracking-[0.4em] text-[10px] uppercase">Initializing Multi-Agent Intelligence</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { label: 'Scanning global marketplace data', step: 1 },
                  { label: 'Detecting cross-platform trend overlap', step: 2 },
                  { label: 'Analyzing emotional purchase triggers', step: 2 },
                  { label: 'Verifying supply chain viability', step: 3 },
                  { label: 'Calculating algorithmic SEO score', step: 3 },
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: analysisStep >= step.step ? 1 : 0.3,
                      x: 0,
                    }}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-[1.5rem]"
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${analysisStep >= step.step ? 'bg-orange-500 text-white' : 'bg-white/10 text-slate-700'}`}>
                      {analysisStep >= step.step ? <CheckCircle className="w-4 h-4" /> : <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse" />}
                    </div>
                    <span className={`text-xs font-black uppercase tracking-widest ${analysisStep >= step.step ? 'text-white' : 'text-slate-600'}`}>
                      {step.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- RESULTS PANEL (NEXT GEN V2.0) --- */}
      {result && !isLoading && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* --- TOP VERDICT BAR --- */}
          <div className="p-1 rounded-[3rem] bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 shadow-2xl shadow-orange-500/20">
            <div className="bg-[#050810] rounded-[2.9rem] p-12 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">Strategic Decision Engine</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight italic">
                  {result.analysis.verdict}
                </h2>
              </div>
              <div className="flex-shrink-0 flex items-center gap-10">
                <div className="text-center">
                  <div className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-2">Alpha Score</div>
                  <div className="text-6xl font-black text-white italic">{result.analysis.trendScore}</div>
                </div>
                <div className="h-20 w-px bg-white/10"></div>
                <div className="text-center">
                  <div className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-2">Market Status</div>
                  <div className={`px-5 py-2 rounded-xl border font-black text-xs uppercase tracking-widest ${
                    result.analysis.opportunityStatus === 'WINNER' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'
                  }`}>
                    {result.analysis.opportunityStatus}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Data & Product */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Product Dossier */}
              <Card className="overflow-hidden border-white/10 bg-[#0d111c]/60 backdrop-blur-xl rounded-[3.5rem] p-1 shadow-2xl">
                <div className="p-12">
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="w-full md:w-72 shrink-0">
                      <div className="relative group rounded-[2.5rem] overflow-hidden aspect-square shadow-2xl border border-white/5">
                        <img src={result.product.imageUrl} alt={result.product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                           <span className="text-[10px] font-bold text-white uppercase tracking-widest">View Source Listing</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-8">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Store className="w-3 h-3 text-orange-500" />
                            <span className="text-orange-500 font-black text-[10px] uppercase tracking-widest">{result.product.shopName}</span>
                          </div>
                          <h3 className="text-3xl font-bold text-white leading-tight tracking-tight">{result.product.title}</h3>
                        </div>
                        <a href={result.product.url} target="_blank" className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all group">
                          <ExternalLink className="w-6 h-6 text-slate-400 group-hover:text-white" />
                        </a>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                          { label: 'Price Points', val: `${result.product.price} ${result.product.currency}`, icon: <Tag className="w-3 h-3" /> },
                          { label: 'Market Demand', val: result.product.favorites, icon: <Heart className="w-3 h-3" />, sub: 'favorites' },
                          { label: 'Visibility', val: result.product.views, icon: <Eye className="w-3 h-3" />, sub: 'views' },
                          { label: 'Ranking', val: result.product.badge || 'Standard', icon: <Star className="w-3 h-3" /> },
                        ].map((stat, i) => (
                          <div key={i} className="p-5 bg-white/[0.03] rounded-2xl border border-white/5 group hover:bg-white/[0.05] transition-colors">
                            <div className="flex items-center gap-2 text-slate-500 mb-2 group-hover:text-orange-500 transition-colors">
                              {stat.icon}
                              <span className="text-[9px] font-black uppercase tracking-widest">{stat.label}</span>
                            </div>
                            <div className="text-white font-black text-xl">{stat.val}</div>
                            {stat.sub && <div className="text-[8px] font-bold text-slate-600 uppercase mt-0.5">{stat.sub}</div>}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3">
                         {result.product.tags?.slice(0, 6).map((tag: string, i: number) => (
                           <span key={i} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold text-slate-400 hover:text-orange-400 transition-colors cursor-default">#{tag.replace(/\s+/g, '')}</span>
                         ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Advanced Analytics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Revenue Forecast Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <BarChart3 className="w-32 h-32 text-white" />
                  </div>
                  <h4 className="text-white font-black mb-6 flex items-center gap-3 text-sm uppercase tracking-widest italic">
                    <TrendingUp className="w-5 h-5 text-green-500" /> Revenue Forecast
                  </h4>
                  <div className="text-4xl font-black text-white mb-3 italic">{result.analysis.revenueForecast}</div>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">Predicted monthly yield based on current market velocity and competition gaps.</p>
                </motion.div>

                {/* Sniper Strategy Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <Zap className="w-32 h-32 text-white" />
                  </div>
                  <h4 className="text-white font-black mb-6 flex items-center gap-3 text-sm uppercase tracking-widest italic">
                    <Zap className="w-5 h-5 text-orange-500" /> Tactical Move
                  </h4>
                  <div className="text-xl font-bold text-orange-400 mb-3 italic">{result.analysis.sniperStrategy}</div>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium italic">&quot;Execution window is currently optimal.&quot;</p>
                </motion.div>
              </div>

              {/* Execution Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  onClick={async () => {
                    setIsGeneratingListing(true);
                    try {
                      const res = await fetch("/api/etsy/generate-listing", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                          productId: result.product.id, 
                          title: result.product.title, 
                          tags: result.product.tags 
                        }),
                      });
                      const data = await res.json();
                      if (data.success) {
                        setListing(data.listing);
                      } else {
                        alert(data.error || "Failed to generate listing");
                      }
                    } finally {
                      setIsGeneratingListing(false);
                    }
                  }}
                  disabled={isGeneratingListing}
                  className="group relative h-28 bg-[#0d111c] border border-white/10 rounded-[2.5rem] overflow-hidden transition-all hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center justify-between px-10">
                    <div className="flex items-center gap-6 text-left">
                      <div className="p-5 bg-orange-500/10 text-orange-500 rounded-2xl group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-500">
                        {isGeneratingListing ? <Loader2 className="w-7 h-7 animate-spin" /> : <PenTool className="w-7 h-7" />}
                      </div>
                      <div>
                        <div className="text-white font-black text-lg uppercase tracking-wider italic">AI Listing Forge</div>
                        <div className="text-slate-500 text-xs font-medium">Generate SEO-Killer Content</div>
                      </div>
                    </div>
                    <ArrowRight className="w-7 h-7 text-slate-700 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>

                <button 
                  onClick={async () => {
                    setIsFindingSupplier(true);
                    try {
                      const res = await fetch("/api/etsy/find-supplier", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                          productId: result.product.id, 
                          title: result.product.title, 
                          tags: result.product.tags,
                          price: result.product.price
                        }),
                      });
                      const data = await res.json();
                      if (data.success) {
                        setSupplier(data.supplier);
                      } else {
                        alert(data.error || "Failed to find supplier");
                      }
                    } finally {
                      setIsFindingSupplier(false);
                    }
                  }}
                  disabled={isFindingSupplier}
                  className="group relative h-28 bg-[#0d111c] border border-white/10 rounded-[2.5rem] overflow-hidden transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center justify-between px-10">
                    <div className="flex items-center gap-6 text-left">
                      <div className="p-5 bg-blue-500/10 text-blue-400 rounded-2xl group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
                        {isFindingSupplier ? <Loader2 className="w-7 h-7 animate-spin" /> : <Factory className="w-7 h-7" />}
                      </div>
                      <div>
                        <div className="text-white font-black text-lg uppercase tracking-wider italic">Source Nexus</div>
                        <div className="text-slate-500 text-xs font-medium">Discover High-Margin Suppliers</div>
                      </div>
                    </div>
                    <ArrowRight className="w-7 h-7 text-slate-700 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: Execution Dashboard */}
            <div className="lg:col-span-4 space-y-8">
               {/* Risk & Opportunity Radar */}
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 relative overflow-hidden"
               >
                 <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8 italic flex items-center gap-2">
                   <ShieldCheck className="w-4 h-4 text-orange-500" /> Operational Risk Audit
                 </h4>
                 <div className="space-y-6">
                    <div>
                       <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase mb-2">
                          <span>Market Saturation</span>
                          <span className="text-orange-500">LOW</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full w-1/4 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase mb-2">
                          <span>Alpha Opportunity</span>
                          <span className="text-green-500">MAX</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full w-[94%] bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                       </div>
                    </div>
                    
                    <div className="pt-6 border-t border-white/5 space-y-4">
                       <div className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Execution Verdict</span>
                            <span className="text-xs font-bold text-white leading-tight block italic">{result.analysis.riskEvaluation || "Safe entry detected. Deploy resources immediately."}</span>
                          </div>
                       </div>
                    </div>
                 </div>
               </motion.div>

               {/* Buyer Psychology */}
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.1 }}
                 className="p-10 rounded-[3rem] bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 relative overflow-hidden"
               >
                 <div className="relative z-10 space-y-4">
                   <div className="flex items-center gap-3">
                     <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                       <ShoppingBag className="w-4 h-4" />
                     </div>
                     <span className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Neural Triggers</span>
                   </div>
                   <h5 className="text-white font-bold text-lg italic">Why They Buy</h5>
                   <p className="text-indigo-200/60 text-sm leading-relaxed font-medium italic">
                     {result.analysis.buyerPsychology || "Emotional purchase triggers identified in visual aesthetics and scarcity-driven pricing."}
                   </p>
                 </div>
               </motion.div>

               {/* Snipe & Save Button */}
               <button 
                 onClick={handleSaveProduct}
                 disabled={isSaved || !userEmail}
                 className={`w-full py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs transition-all flex flex-col items-center justify-center gap-2 border shadow-2xl ${
                   isSaved ? 'bg-white/5 border-white/10 text-slate-500 cursor-not-allowed' : 
                   !userEmail ? 'bg-white/5 border-white/10 text-slate-500' :
                   'bg-orange-500 border-orange-400 text-white hover:scale-[1.02] active:scale-[0.98] hover:shadow-orange-500/30'
                 }`}
               >
                 <div className="flex items-center gap-3">
                   {isSaved ? <CheckCircle className="w-6 h-6" /> : <ShoppingBag className="w-6 h-6" />}
                   <span>{isSaved ? 'PRODUCT SECURED' : 'SNIPE & SAVE TO VAULT'}</span>
                 </div>
                 {!userEmail && <span className="text-[8px] opacity-50">Log in required to save</span>}
               </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* --- LISTING MODAL --- */}
      <AnimatePresence>
        {listing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              className="bg-[#0d111c] border border-white/10 rounded-[4rem] max-w-6xl w-full max-h-[92vh] overflow-y-auto relative shadow-[0_0_150px_rgba(0,0,0,0.9)]"
            >
               {/* Modal Content - Simplified for Brevity */}
               <div className="p-12 space-y-10">
                 <div className="flex justify-between items-center border-b border-white/5 pb-8">
                    <h2 className="text-3xl font-black text-white italic tracking-tighter">AI LISTING CORE</h2>
                    <button onClick={() => setListing(null)} className="p-4 hover:bg-white/5 rounded-full text-slate-500"><X /></button>
                 </div>
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-5">
                       <img src={result.product.imageUrl} className="w-full aspect-square object-cover rounded-[2.5rem] border border-white/5" />
                    </div>
                    <div className="lg:col-span-7 space-y-6">
                       <h3 className="text-2xl font-bold text-orange-400 italic">{listing.seoTitle}</h3>
                       <p className="text-slate-400 leading-relaxed text-sm whitespace-pre-wrap">{listing.description}</p>
                       <div className="flex flex-wrap gap-2">
                          {listing.tags?.map((t: string, i: number) => <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] text-slate-500">#{t}</span>)}
                       </div>
                    </div>
                 </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- SUPPLIER MODAL --- */}
      <AnimatePresence>
        {supplier && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              className="bg-[#0d111c] border border-white/10 rounded-[4rem] max-w-4xl w-full relative shadow-[0_0_150px_rgba(0,0,0,0.9)]"
            >
               <div className="p-12 space-y-10">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-black text-white italic tracking-tighter">SOURCE NEXUS</h2>
                    <button onClick={() => setSupplier(null)} className="p-4 hover:bg-white/5 rounded-full text-slate-500"><X /></button>
                  </div>
                  <div className="p-10 bg-white/5 border border-white/5 rounded-[3rem] space-y-6">
                     <div className="flex justify-between">
                        <span className="text-slate-500 uppercase font-black text-[10px] tracking-widest">Supplier Name</span>
                        <span className="text-white font-bold">{supplier.supplierName}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-slate-500 uppercase font-black text-[10px] tracking-widest">Type</span>
                        <span className="text-blue-400 font-bold uppercase">{supplier.sourceType}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-slate-500 uppercase font-black text-[10px] tracking-widest">Est. Unit Cost</span>
                        <span className="text-green-500 font-bold">${supplier.estimatedCost}</span>
                     </div>
                     <p className="text-slate-400 text-sm italic pt-6 border-t border-white/5">{supplier.notes}</p>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- FEATURE GRID (STAY CONSISTENT) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { title: 'Market Arbitrage', icon: <Globe className="w-6 h-6" />, desc: 'Identify price gaps between global marketplaces and Etsy in real-time.' },
           { title: 'AI Consensus Score', icon: <Sparkles className="w-6 h-6" />, desc: 'Multi-agent evaluation system gives you a go/no-go verdict on any niche.' },
           { title: 'Autonomous Listing', icon: <PenTool className="w-6 h-6" />, desc: 'Generate complete, SEO-optimized product listings with one click.' },
         ].map((feature, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.1 }}
             className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-orange-500/30 transition-all group"
           >
              <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all">
                 {feature.icon}
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4 italic">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
           </motion.div>
         ))}
      </div>

    </div>
  );
}
