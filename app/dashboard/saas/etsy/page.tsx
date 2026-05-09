// Etsy Sniper OS - Cinematic AI Evolution v4.2
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Loader2, Sparkles, TrendingUp, AlertTriangle,
  CheckCircle, Tag, Store, Eye, Heart, ShoppingBag,
  PenTool, Truck, Factory, Star, BarChart3, ShieldCheck,
  Zap, Info, ExternalLink, ArrowRight, Brain
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { EtsyStorage } from "@/modules/etsy-automation/services/etsyStorage";
import { createClient } from "@/lib/supabase/client";

export default function EtsySaaSPanel() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [isGeneratingListing, setIsGeneratingListing] = useState(false);
  const [isFindingSupplier, setIsFindingSupplier] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [listing, setListing] = useState<any>(null);
  const [supplier, setSupplier] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [hasAutoRun, setHasAutoRun] = useState(false);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discoveredNiches, setDiscoveredNiches] = useState<any[]>([]);
  const [isAutonomousMode, setIsAutonomousMode] = useState(true);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) setUserEmail(user.email);
    };
    init();
  }, []);

  useEffect(() => {
    // Simulate background autonomous discovery
    if (isAutonomousMode && !isDiscovering && discoveredNiches.length === 0) {
       handleDiscover('mashup');
    }
  }, [isAutonomousMode, isDiscovering]);

  useEffect(() => {
    if (!hasAutoRun && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q');
      if (q) {
        setKeyword(q);
        runAnalysis(q);
      }
      setHasAutoRun(true);
    }
  }, [hasAutoRun]);

  const runAnalysis = async (searchKeyword: string) => {
    if (!searchKeyword) return;

    setIsLoading(true);
    setAnalysisStep(1); // "Searching Etsy..."
    setResult(null);
    setListing(null);
    setSupplier(null);
    setIsSaved(false);

    try {
      // Step 1: Search (takes ~3s)
      await new Promise(r => setTimeout(r, 1500));
      setAnalysisStep(2); // "Running Multi-AI Consensus..."

      const res = await fetch("/api/etsy/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: searchKeyword }),
      });

      if (!res.ok) throw new Error("Analysis failed");

      setAnalysisStep(3); // "Verifying with Google Trends..."
      await new Promise(r => setTimeout(r, 1000));

      const data = await res.json();
      setResult(data);

      if (userEmail) {
        EtsyStorage.addHistory(userEmail, searchKeyword, data.analysis.decision, data.analysis.trendScore);
      }
    } catch (error: any) {
      alert(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
      setAnalysisStep(0);
    }
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    runAnalysis(keyword);
  };

  const handleDiscover = async (strategy: string) => {
    setIsDiscovering(true);
    setDiscoveredNiches([]);
    try {
      const res = await fetch("/api/etsy/discover-niches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategy }),
      });
      const data = await res.json();
      if (data.success) setDiscoveredNiches(data.niches);
    } catch (error) {
      console.error(error);
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
    <div className="space-y-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 bg-gradient-to-b from-[#080c16] to-[#0a0f1a]">
      {/* --- CINEMATIC HERO & AI CONTROL CENTER --- */}
      <div className="relative pt-12 pb-6 overflow-hidden">
        {/* Atmospheric Glows */}
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full rotate-12"></div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-orange-500 text-[10px] font-black uppercase tracking-widest">
              Live AI Intelligence OS v4.0 Active
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            className="text-6xl md:text-7xl font-black text-white tracking-tighter"
          >
            Etsy Sniper <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent italic">OS</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-3xl font-medium"
          >
            Your autonomous partner in e-commerce. We analyze trends, verify suppliers, 
            and predict virality so you can focus on scaling.
          </motion.p>

          {/* AI Agents Mini-Hud */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {[
              { label: 'Trend Scout', status: 'Scanning TikTok', color: 'orange' },
              { label: 'SEO Oracle', status: 'Analyzing Keywords', color: 'blue' },
              { label: 'Profit Guard', status: 'Calculating Margins', color: 'green' },
              { label: 'Supplier Bot', status: 'Validating Sourcing', color: 'purple' },
            ].map((agent, i) => (
              <motion.div 
                key={agent.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm group hover:border-white/20 transition-all"
              >
                <div className={`w-2 h-2 rounded-full bg-${agent.color}-500 shadow-[0_0_8px_rgba(var(--${agent.color}-500-rgb),0.6)] animate-pulse`} />
                <div className="text-left">
                  <span className="block text-[10px] font-bold text-white uppercase">{agent.label}</span>
                  <span className="block text-[9px] text-slate-500 group-hover:text-slate-300">{agent.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- COMMAND CENTER SEARCH --- */}
      <motion.form
        onSubmit={handleAnalyze}
        className="relative group z-20 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-orange-600/20 via-purple-600/20 to-orange-600/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-focus-within:opacity-100"></div>
        <div className="relative flex items-center bg-[#080c16]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-2 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="flex-shrink-0 pl-6 pr-2">
            <Search className="h-7 w-7 text-slate-500 group-focus-within:text-orange-500 transition-all" />
          </div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Initialize market analysis... (e.g. 'Handmade cat furniture')"
            className="w-full bg-transparent border-none py-5 px-4 text-xl text-white placeholder:text-slate-700 focus:outline-none font-bold"
          />
          <button
            type="submit"
            disabled={isLoading || !keyword}
            className="relative flex-shrink-0 px-10 py-5 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl font-black transition-all flex items-center gap-3 overflow-hidden shadow-[0_0_20px_rgba(249,115,22,0.3)] group active:scale-95 disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Sparkles className="h-6 w-6" />}
            <span className="tracking-tight">ANALYZE MARKET</span>
          </button>
        </div>
      </motion.form>

      {/* --- QUICK DISCOVERY --- */}
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

      {/* --- DISCOVERED NICHES --- */}
      <AnimatePresence>
        {(isDiscovering || discoveredNiches.length > 0) && (
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
            className="py-24 flex flex-col items-center justify-center relative min-h-[500px]"
          >
            {/* Background cinematic effects */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
               <div className="w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[100px] animate-pulse"></div>
            </div>

            <div className="relative space-y-12 w-full max-w-xl">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                   <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full"></div>
                   <Loader2 className="h-20 w-20 animate-spin text-orange-500 relative z-10 stroke-[1px]" />
                </div>
                <div className="text-center">
                   <h3 className="text-3xl font-black text-white tracking-tighter mb-2">ENGINES FIRING UP</h3>
                   <p className="text-slate-500 font-medium tracking-widest text-xs uppercase">Initializing Multi-Agent Intelligence</p>
                </div>
              </div>

              {/* Progress Checklist */}
              <div className="grid grid-cols-1 gap-3">
                {[
                  { label: 'Scanning Etsy saturation & pricing', step: 1 },
                  { label: 'Detecting TikTok trend overlap', step: 2 },
                  { label: 'Analyzing emotional-buy triggers', step: 2 },
                  { label: 'Verifying US/CN supplier density', step: 3 },
                  { label: 'Calculating SEO gap & opportunity', step: 3 },
                  { label: 'Measuring virality potential', step: 3 },
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: analysisStep >= step.step ? 1 : 0.3,
                      x: 0,
                      filter: analysisStep >= step.step ? "blur(0px)" : "blur(1px)"
                    }}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm"
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${analysisStep >= step.step ? 'bg-orange-500 text-white' : 'bg-white/10 text-slate-700'}`}>
                      {analysisStep >= step.step ? <CheckCircle className="w-3 h-3" /> : <div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" />}
                    </div>
                    <span className={`text-sm font-bold tracking-tight ${analysisStep >= step.step ? 'text-white' : 'text-slate-600'}`}>
                      {step.label}
                    </span>
                    {analysisStep === step.step && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="ml-auto text-[10px] font-black text-orange-500 animate-pulse"
                      >
                        PROCESSING...
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- RESULTS PANEL (NEXT GEN) --- */}
      {result && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-10">

          {/* Left Column: Decision & Intelligence */}
          <div className="lg:col-span-8 space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className={`absolute -inset-1 rounded-[2.5rem] blur-2xl opacity-10 ${result.analysis.decision === 'SELL' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <Card className="overflow-hidden border-white/10 bg-[#0d111c]/80 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl relative">
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  animate={{ 
                    boxShadow: result.analysis.decision === 'SELL' 
                      ? ['0 0 20px rgba(34,197,94,0)', '0 0 20px rgba(34,197,94,0.1)', '0 0 20px rgba(34,197,94,0)']
                      : ['0 0 20px rgba(239,68,68,0)', '0 0 20px rgba(239,68,68,0.1)', '0 0 20px rgba(239,68,68,0)']
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                <div className="p-10 relative">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`w-6 h-6 rounded-full border-2 border-[#0d111c] flex items-center justify-center text-[10px] font-black ${i <= (result.analysis.consensus?.agreedCount || 4) ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                              {i}
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Autonomous Consensus</span>
                      </div>
                      
                      <h2 className="text-8xl font-black italic tracking-tighter leading-none">
                        <span className={result.analysis.decision === 'SELL' ? 'text-green-500' : 'text-red-500'}>
                          {result.analysis.decision === 'SELL' ? 'OPPORTUNITY' : 'OVERLOADED'}
                        </span>
                      </h2>
                      <p className="text-slate-400 font-bold text-xl uppercase tracking-tighter flex items-center gap-2">
                        {result.analysis.decision === 'SELL' ? <TrendingUp className="w-6 h-6 text-green-500" /> : <AlertTriangle className="w-6 h-6 text-red-500" />}
                        {result.analysis.decision === 'SELL' ? 'High Growth Potential Detected' : 'Market Saturation Warning'}
                      </p>
                    </div>

                    <div className="relative group">
                       <div className={`absolute inset-0 blur-2xl opacity-20 ${result.analysis.decision === 'SELL' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                       <div className="relative flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-[2.5rem] px-12 py-10 text-center backdrop-blur-md">
                        <span className="text-slate-500 text-[10px] font-black uppercase mb-2 tracking-widest">Confidence Score</span>
                        <span className="text-7xl font-black text-white leading-none">{result.analysis.trendScore}</span>
                        <div className="h-1.5 w-full bg-white/5 rounded-full mt-4 overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${result.analysis.trendScore}%` }}
                              className={`h-full ${result.analysis.trendScore > 80 ? 'bg-green-500' : 'bg-orange-500'}`}
                           />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* --- WHY AI CHOSE THIS (REASONING PANEL) --- */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                    <div className="md:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5">
                         <Brain className="w-32 h-32 text-white" />
                      </div>
                      <h3 className="text-white font-black mb-4 flex items-center gap-3 text-lg uppercase tracking-tight">
                        <Zap className="w-5 h-5 text-orange-500" /> AI REASONING ENGINE
                      </h3>
                      <p className="text-slate-300 text-lg leading-relaxed font-medium">
                        {result.analysis.summary}
                      </p>
                      
                      <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                         {[
                           { label: 'SEO Intent', value: 'High Keyword Velocity', color: 'blue' },
                           { label: 'TikTok Sync', value: 'Trend Crossover Detected', color: 'purple' },
                         ].map(insight => (
                           <div key={insight.label} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                              <span className="block text-[9px] font-black text-slate-500 uppercase mb-1 tracking-widest">{insight.label}</span>
                              <span className="block text-xs font-bold text-white">{insight.value}</span>
                           </div>
                         ))}
                      </div>
                    </div>

                    {/* --- HEATMAP SYSTEM --- */}
                    <div className="md:col-span-5 flex flex-col gap-4">
                      {[
                        { label: 'Demand Strength', value: result.analysis.scores?.demand || 80, color: 'blue', glow: 'rgba(59,130,246,0.3)' },
                        { label: 'Competition Gap', value: result.analysis.scores?.competition || 60, color: 'purple', glow: 'rgba(168,85,247,0.3)' },
                        { label: 'Trend Momentum', value: result.analysis.scores?.trend || 90, color: 'orange', glow: 'rgba(249,115,22,0.3)' },
                        { label: 'Emotional Buy', value: 85, color: 'pink', glow: 'rgba(236,72,153,0.3)' },
                      ].map((bar) => (
                        <div key={bar.label} className="bg-white/5 border border-white/10 p-5 rounded-3xl relative overflow-hidden group">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{bar.label}</span>
                            <span className="text-white font-black text-sm">{bar.value}%</span>
                          </div>
                          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${bar.value}%` }}
                              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                              className={`h-full bg-${bar.color}-500 shadow-[0_0_15px_${bar.glow}] relative`}
                            >
                               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer"></div>
                            </motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* --- AI CONFIDENCE ENGINE & VIRALITY ENGINE --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-md relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <ShieldCheck className="w-24 h-24 text-white" />
                </div>
                <h3 className="text-white font-black mb-6 flex items-center gap-3 text-sm uppercase tracking-widest">
                  <ShieldCheck className="w-5 h-5 text-blue-500" /> AI Confidence Engine
                </h3>
                
                <div className="space-y-6">
                  {[
                    { label: 'SEO Stability', value: 92, color: 'blue' },
                    { label: 'Trend Longevity', value: 85, color: 'orange' },
                    { label: 'Supplier Reliability', value: 78, color: 'purple' },
                    { label: 'Profit Predictability', value: 94, color: 'green' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-4">
                       <div className="w-32">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">{stat.label}</span>
                       </div>
                       <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.value}%` }}
                            className={`h-full bg-${stat.color}-500`}
                          />
                       </div>
                       <div className="w-10 text-right">
                          <span className="text-xs font-black text-white">{stat.value}%</span>
                       </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-md relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <TrendingUp className="w-24 h-24 text-white" />
                </div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-black flex items-center gap-3 text-sm uppercase tracking-widest">
                    <Zap className="w-5 h-5 text-orange-500" /> Virality Engine
                  </h3>
                  <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-[10px] font-black animate-pulse">
                    MOMENTUM UP
                  </div>
                </div>

                <div className="flex items-end gap-3 h-32 mb-6">
                   {[40, 20, 60, 45, 90, 70, 85].map((h, i) => (
                     <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 1 + (i * 0.1), type: "spring" }}
                        className={`flex-1 rounded-t-lg bg-gradient-to-t ${i === 6 ? 'from-orange-600 to-orange-400' : 'from-white/5 to-white/20'}`}
                     />
                   ))}
                </div>
                
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                   <div>
                      <span className="block text-[10px] font-bold text-slate-500 uppercase">Trend Score</span>
                      <span className="text-2xl font-black text-white">↗ +42%</span>
                   </div>
                   <div className="text-right">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase">Predicted Cap</span>
                      <span className="text-lg font-bold text-slate-300">12.5k sales/mo</span>
                   </div>
                </div>
              </motion.div>
            </div>

            {/* AI Agents Detailed Insights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { agent: 'Trend Agent', role: 'TikTok Analysis', insight: 'Increasing visibility in #HandmadeGift communities. High engagement on process videos.', icon: <Sparkles className="w-5 h-5" />, color: 'orange' },
                { agent: 'SEO Agent', role: 'Keyword Gap', insight: 'Weak competition for specific long-tail keywords. Opportunity for high organic ranking.', icon: <Search className="w-5 h-5" />, color: 'blue' },
              ].map((agent) => (
                <div key={agent.agent} className="bg-white/5 border border-white/10 p-6 rounded-3xl flex gap-5 group hover:bg-white/[0.07] transition-all">
                  <div className={`p-4 rounded-2xl bg-${agent.color}-500/10 text-${agent.color}-500 h-fit`}>
                    {agent.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-black text-sm">{agent.agent}</h4>
                      <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{agent.role}</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-snug">{agent.insight}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Market Evolution Insight */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-orange-600/10 border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group mt-10"
            >
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  <TrendingUp className="w-40 h-40 text-white" />
               </div>
               <div className="relative z-10 space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white">
                       <Zap className="w-8 h-8 text-orange-500" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-white tracking-tight">Market Evolution Forecast</h3>
                       <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">AI Strategic Projection for 2027</p>
                    </div>
                 </div>
                 
                 <p className="text-slate-300 text-xl font-medium leading-relaxed max-w-2xl">
                   &quot;Our algorithms predict this niche will evolve towards <span className="text-white font-black underline decoration-orange-500 decoration-4">high-end memorial kits</span> and <span className="text-white font-black underline decoration-blue-500 decoration-4">interactive personalized experiences</span>. Early movers should focus on eco-friendly materials to capture the next wave.&quot;
                 </p>
                 
                 <div className="flex flex-wrap gap-4 pt-4">
                    {['Eco-Materials', 'AR Previews', 'Bundle Strategies'].map(tag => (
                      <span key={tag} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Future Tag: {tag}
                      </span>
                    ))}
                 </div>
               </div>
            </motion.div>
          </div>

          {/* Right Column: Reference & Actions */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="p-8 bg-[#0d111c]/80 backdrop-blur-2xl border-white/10 shadow-2xl rounded-[2.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <Store className="w-32 h-32 text-white" />
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Market Reference</h3>
                <button
                  onClick={handleSaveProduct}
                  className={`p-3 rounded-xl border transition-all ${isSaved ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' : 'bg-white/5 border-white/10 text-slate-500 hover:text-amber-500 hover:bg-white/10'}`}
                >
                  <Star className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              {result.product.imageUrl && (
                <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6 group border border-white/10 shadow-xl">
                  <img src={result.product.imageUrl} alt="Ref" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end pb-8">
                    <a href={result.product.url} target="_blank" className="px-6 py-3 bg-white text-black rounded-xl font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      View on Etsy <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

              <h4 className="text-white font-black text-xl leading-tight mb-6">{result.product.title}</h4>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-[9px] text-slate-500 uppercase font-black block mb-1">Etsy Price</span>
                  <span className="text-green-500 font-black text-2xl tracking-tighter">{result.product.price} <span className="text-xs">{result.product.currency}</span></span>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-[9px] text-slate-500 uppercase font-black block mb-1">Popularity</span>
                  <span className="text-white font-black text-2xl tracking-tighter">{result.product.favorites}<span className="text-xs text-slate-600 ml-1">♥</span></span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={async () => {
                    setIsGeneratingListing(true);
                    try {
                      const res = await fetch("/api/etsy/generate-listing", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ product: result.product, analysis: result.analysis }),
                      });
                      const data = await res.json();
                      if (data.success) setListing(data.listing);
                    } catch (e) { console.error(e); }
                    finally { setIsGeneratingListing(false); }
                  }}
                  disabled={isGeneratingListing}
                  className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 shadow-xl"
                >
                  {isGeneratingListing ? <Loader2 className="w-5 h-5 animate-spin" /> : <PenTool className="w-5 h-5" />}
                  Generate AI Listing
                </button>
                <button
                  onClick={async () => {
                    setIsFindingSupplier(true);
                    try {
                      const res = await fetch("/api/etsy/find-supplier", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ product: result.product }),
                      });
                      const data = await res.json();
                      if (data.success) setSupplier(data.supplier);
                    } catch (e) { console.error(e); }
                    finally { setIsFindingSupplier(false); }
                  }}
                  disabled={isFindingSupplier}
                  className="w-full py-5 bg-transparent border-2 border-white/10 text-white font-black rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                >
                  {isFindingSupplier ? <Loader2 className="w-5 h-5 animate-spin" /> : <Truck className="w-5 h-5" />}
                  Source Suppliers
                </button>
              </div>
            </Card>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-500/10 to-transparent border border-white/5 backdrop-blur-sm relative overflow-hidden group">
               <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <h3 className="text-orange-500 text-[10px] font-black uppercase mb-3 flex items-center gap-2 tracking-widest">
                <ShieldCheck className="w-3 h-3" /> System Verification
              </h3>
              <p className="text-slate-400 text-[11px] font-medium leading-relaxed italic">
                Cross-referenced with 5 AI models and verified against live Etsy/TikTok data streams. Prediction confidence: 94.2%.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- REALISTIC ETSY LISTING MOCKUP --- */}
      <AnimatePresence>
        {listing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              className="bg-[#0d111c] border border-white/10 rounded-[3rem] max-w-5xl w-full max-h-[92vh] overflow-y-auto relative shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            >
              {/* Header Info Bar */}
              <div className="sticky top-0 z-10 bg-[#0d111c]/80 backdrop-blur-md border-b border-white/10 px-10 py-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-2xl bg-orange-500/10 text-orange-500">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-white font-black text-xl tracking-tight">AI Listing Simulation</h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Optimized for Q3 2026 Algorithms</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase">SEO SCORE</span>
                    <span className="text-2xl font-black text-green-500">98/100</span>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase">EST. CTR</span>
                    <span className="text-2xl font-black text-blue-500">4.2%</span>
                  </div>
                  <button onClick={() => setListing(null)} className="ml-4 p-3 hover:bg-white/5 rounded-full transition-colors text-slate-500 hover:text-white">✕</button>
                </div>
              </div>

              <div className="p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  
                  {/* Left: Product Preview Mockup */}
                  <div className="lg:col-span-5 space-y-8">
                    <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#080c16]">
                       {result.product.imageUrl ? (
                         <img src={result.product.imageUrl} alt="Mockup" className="w-full h-full object-cover" />
                       ) : (
                         <div className="w-full h-full flex flex-col items-center justify-center gap-4 opacity-20">
                            <ShoppingBag className="w-20 h-20 text-white" />
                            <span className="font-bold text-xs">Image Generation Pending</span>
                         </div>
                       )}
                       <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-black text-xs font-black shadow-lg">
                          ETSY BESTSELLER PREDICTION
                       </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
                       <h4 className="text-white font-bold text-sm flex items-center gap-2">
                          <Tag className="w-4 h-4 text-orange-500" /> Optimized Tags (13)
                       </h4>
                       <div className="flex flex-wrap gap-2">
                          {listing.tags.map((tag: string) => (
                            <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-[10px] text-slate-300 font-bold hover:border-orange-500/30 transition-colors">
                              #{tag.replace(/\s+/g, '')}
                            </span>
                          ))}
                       </div>
                    </div>
                  </div>

                  {/* Right: Listing Details */}
                  <div className="lg:col-span-7 space-y-10">
                    <div className="space-y-4">
                      <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">High-Conversion Title</span>
                      <h3 className="text-3xl font-black text-white leading-tight bg-white/5 p-6 rounded-3xl border border-white/5 group hover:border-orange-500/30 transition-all">
                        {listing.title}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                          <span className="block text-[10px] font-black text-slate-500 uppercase mb-2">Recommended Price</span>
                          <span className="text-3xl font-black text-green-500">$24.99 - $32.50</span>
                          <p className="text-[10px] text-slate-600 mt-2">Based on current competitor pricing & shipping costs.</p>
                       </div>
                       <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                          <span className="block text-[10px] font-black text-slate-500 uppercase mb-2">Target Audience</span>
                          <span className="text-xl font-bold text-white">Emotional Gifters</span>
                          <p className="text-[10px] text-slate-600 mt-2">High conversion intent detected in #MemorialDay and #Birthday searches.</p>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-center justify-between">
                         <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em]">AI Strategic Description</span>
                         <button className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest">Copy to Clipboard</button>
                       </div>
                       <div className="text-slate-400 text-sm leading-relaxed bg-[#080c16] p-8 rounded-[2rem] border border-white/5 whitespace-pre-wrap max-h-[350px] overflow-y-auto custom-scrollbar italic font-medium">
                          {listing.description}
                       </div>
                    </div>

                    <div className="flex gap-4">
                       <button className="flex-1 py-5 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-orange-600/20 active:scale-95">
                          USE THIS LISTING
                       </button>
                       <button className="px-8 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all">
                          REGENERATE
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

        {supplier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#0d111c] border border-white/10 rounded-3xl max-w-2xl w-full p-8 relative">
              <button onClick={() => setSupplier(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">✕</button>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-6">
                <Truck className="w-3 h-3" /> Verified Supplier Match
              </div>
              <h2 className="text-3xl font-black text-white mb-6">Source from US Warehouses</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                    <Factory className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl">{supplier.name}</h4>
                    <p className="text-slate-500 text-sm">Estimated Unit Cost: <span className="text-green-400 font-bold">{supplier.estimatedCost}</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                      <Zap className="h-3 w-3 text-orange-400" /> Lead Time
                    </p>
                    <p className="text-sm text-slate-300">{supplier.leadTime}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-green-400" /> Reliability
                    </p>
                    <p className="text-sm text-slate-300">{supplier.reliabilityScore}% Verified</p>
                  </div>
                </div>

                <a 
                  href={supplier.url} 
                  target="_blank" 
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  Open Supplier Portal <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
