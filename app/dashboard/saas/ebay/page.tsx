// eBay Sniper OS - Cinematic AI Evolution
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Sparkles, TrendingUp, Zap, 
  ShieldCheck, Loader2, CheckCircle, Store, Tag,  
  ExternalLink, Star, DollarSign, Activity, Globe,
  ShieldAlert, Box, Scale, MapPin, AlertTriangle, X
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";

export default function EbaySaaSPanel() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    soldVolume: "",
    condition: "New",
    supplierName: "",
    supplierCost: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [usage, setUsage] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      const usageRes = await fetch("/api/user/usage");
      if (usageRes.ok) {
        const usageData = await usageRes.json();
        setUsage(usageData);
      }
    };
    init();
  }, []);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    setIsLoading(true);
    setAnalysisStep(1); // "Initializing Engines..."
    setResult(null);
    setErrorMsg(null);

    try {
      await new Promise(r => setTimeout(r, 1000));
      setAnalysisStep(2); // "Running AI Sniper Analysis..."

      const res = await fetch("/api/ebay/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price) || 0,
          supplierCost: parseFloat(formData.supplierCost) || 0
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Analysis failed");
      }

      setAnalysisStep(3); // "Finalizing report..."
      await new Promise(r => setTimeout(r, 800));

      const data = await res.json();
      setResult(data.analysis);

    } catch (error: any) {
      console.error("[Analysis] Failed:", error);
      setErrorMsg(error.message || "An unexpected error occurred during analysis.");
    } finally {
      setIsLoading(false);
      setAnalysisStep(0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 bg-gradient-to-b from-[#080c16] to-[#0a0f1a]">
      {/* --- CINEMATIC HERO & AI CONTROL CENTER --- */}
      <div className="relative pt-12 pb-6 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-600/5 blur-[120px] rounded-full rotate-12"></div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest">
              EBAY INTELLIGENCE ACTIVE
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            className="text-6xl md:text-7xl font-black text-white tracking-tighter"
          >
            eBay <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent italic">Sniper OS</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-3xl font-medium"
          >
            Zero-Integration Product Analysis. Evaluate margins, VeRO risks, supplier trust, and market saturation before listing.
          </motion.p>
        </div>
      </div>

      {/* --- COMMAND CENTER SEARCH --- */}
      <motion.form
        onSubmit={handleAnalyze}
        className="relative group z-20 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-[#080c16]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Product Title (Required)</label>
               <input
                 type="text"
                 name="title"
                 value={formData.title}
                 onChange={handleInputChange}
                 placeholder="e.g. Wireless Portable Charger 10000mAh"
                 className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
               />
            </div>
            
            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Selling Price ($)</label>
               <input
                 type="number"
                 name="price"
                 step="0.01"
                 value={formData.price}
                 onChange={handleInputChange}
                 placeholder="24.99"
                 className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
               />
            </div>

            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Supplier Cost ($)</label>
               <input
                 type="number"
                 name="supplierCost"
                 step="0.01"
                 value={formData.supplierCost}
                 onChange={handleInputChange}
                 placeholder="8.50"
                 className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
               />
            </div>

            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Supplier Name</label>
               <input
                 type="text"
                 name="supplierName"
                 value={formData.supplierName}
                 onChange={handleInputChange}
                 placeholder="e.g. CJ Dropshipping"
                 className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
               />
            </div>

            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">30-Day Sold Volume</label>
               <input
                 type="text"
                 name="soldVolume"
                 value={formData.soldVolume}
                 onChange={handleInputChange}
                 placeholder="e.g. 150"
                 className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
               />
            </div>

            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Condition</label>
               <select
                 name="condition"
                 value={formData.condition}
                 onChange={handleInputChange}
                 className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium appearance-none"
               >
                 <option value="New" className="bg-[#080c16]">New</option>
                 <option value="Used" className="bg-[#080c16]">Used</option>
                 <option value="Refurbished" className="bg-[#080c16]">Refurbished</option>
                 <option value="Open Box" className="bg-[#080c16]">Open Box</option>
               </select>
            </div>
            
            <div className="flex items-end">
              <button
                type="submit"
                disabled={isLoading || !formData.title || !formData.price}
                className="w-full h-[54px] bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black transition-all flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                <span className="tracking-widest uppercase">Analyze Target</span>
              </button>
            </div>
          </div>
        </div>
      </motion.form>

      {/* --- ERROR MESSAGE --- */}
      <AnimatePresence>
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }} 
            className="max-w-4xl mx-auto mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3 backdrop-blur-md"
          >
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{errorMsg}</span>
            <button onClick={() => setErrorMsg(null)} className="ml-auto text-red-500 hover:text-red-400">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LIVE ANALYSIS ENGINE (CINEMATIC LOADING) --- */}
      <AnimatePresence>
      {isLoading ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
          className="py-24 flex flex-col items-center justify-center relative min-h-[400px]"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
             <div className="w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
          </div>

          <div className="relative space-y-12 w-full max-w-xl">
            <div className="flex flex-col items-center space-y-6">
               <Loader2 className="h-16 w-16 animate-spin text-blue-500 relative z-10 stroke-[1px]" />
               <h3 className="text-2xl font-black text-white tracking-tighter mb-2">Analyzing Target Variables</h3>
               <p className="text-slate-500 font-medium tracking-widest text-xs uppercase">Please hold...</p>
            </div>
          </div>
        </motion.div>
      ) : null}
      </AnimatePresence>

      {/* --- RESULTS PANEL --- */}
      {result && !isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8 pt-10"
        >
          {/* TOP VERDICT BAR */}
          <motion.div className="relative p-1 rounded-[2rem] bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 shadow-2xl shadow-blue-500/20">
            <div className="bg-[#050810] rounded-[1.9rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
              <div className="flex-1 space-y-2 relative z-10 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">AI VERDICT</span>
                </div>
                <h2 className={`text-4xl md:text-5xl font-black leading-tight ${result.decision === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>
                  {result.decision}
                </h2>
              </div>
              <div className="flex-shrink-0 flex items-center gap-8 relative z-10">
                <div className="text-center">
                  <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Safety Score</div>
                  <div className="text-3xl font-black text-white">{result.policyRisk?.accountSafetyScore || result.score || 0}</div>
                </div>
                <div className="h-12 w-px bg-white/10 hidden md:block"></div>
                <div className="text-center">
                  <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">ROI</div>
                  <div className="text-3xl font-black text-green-400">{result.financials?.roi || 0}%</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Financials */}
            <Card className="bg-[#0b0f19] border-white/10 p-6 rounded-[2rem]">
               <h4 className="text-green-400 font-black mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
                 <DollarSign className="w-5 h-5" /> Financial Simulation
               </h4>
               <div className="space-y-4">
                 <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                   <span className="text-xs text-slate-400 font-bold uppercase">Net Profit</span>
                   <span className="text-sm text-green-400 font-black">${result.financials?.netProfit?.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                   <span className="text-xs text-slate-400 font-bold uppercase">Profit Margin</span>
                   <span className="text-sm text-white font-black">{result.financials?.profitMargin}%</span>
                 </div>
                 <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                   <span className="text-xs text-slate-400 font-bold uppercase">Estimated eBay Fee</span>
                   <span className="text-sm text-red-400 font-black">-${result.financials?.estimatedEbayFee?.toFixed(2)}</span>
                 </div>
               </div>
            </Card>

            {/* Risk & Safety */}
            <Card className="bg-[#0b0f19] border-white/10 p-6 rounded-[2rem]">
               <h4 className="text-red-400 font-black mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
                 <ShieldAlert className="w-5 h-5" /> Account Safety
               </h4>
               <div className="space-y-4">
                 <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                   <span className="text-xs text-slate-400 font-bold uppercase">VeRO / IP Risk</span>
                   <span className={`text-xs px-2 py-1 rounded-lg font-black ${result.riskAnalysis?.veroRisk === 'HIGH' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>{result.riskAnalysis?.veroRisk}</span>
                 </div>
                 <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                   <span className="text-xs text-slate-400 font-bold uppercase">DropShipping Policy</span>
                   <span className={`text-xs px-2 py-1 rounded-lg font-black ${result.policyRisk?.dropShippingRisk === 'HIGH' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>{result.policyRisk?.dropShippingRisk}</span>
                 </div>
                 <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                   <span className="text-xs text-slate-400 font-bold uppercase">Return Risk</span>
                   <span className={`text-xs px-2 py-1 rounded-lg font-black ${result.riskAnalysis?.returnRisk === 'HIGH' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>{result.riskAnalysis?.returnRisk}</span>
                 </div>
               </div>
            </Card>

            {/* Supplier Check */}
            <Card className="bg-[#0b0f19] border-white/10 p-6 rounded-[2rem]">
               <h4 className="text-purple-400 font-black mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
                 <Box className="w-5 h-5" /> Supplier Trust
               </h4>
               <div className="space-y-4">
                 <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                   <span className="text-xs text-slate-400 font-bold uppercase">Status</span>
                   <span className={`text-xs px-2 py-1 rounded-lg font-black ${result.supplierCheck?.status === 'APPROVED' ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-500'}`}>{result.supplierCheck?.status}</span>
                 </div>
                 <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                   <span className="text-xs text-slate-400 font-bold uppercase">Trust Score</span>
                   <span className="text-sm text-white font-black">{result.supplierCheck?.supplierTrustScore}/100</span>
                 </div>
                 <p className="text-xs text-slate-500 italic mt-2">&quot;{result.supplierCheck?.note}&quot;</p>
               </div>
            </Card>

          </div>

          {/* AI Reasoning & Optimizations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <Card className="bg-[#0b0f19] border-white/10 p-8 rounded-[2rem]">
                <h4 className="text-cyan-400 font-black mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                  <Activity className="w-5 h-5" /> Engine Reasoning
                </h4>
                <ul className="space-y-3">
                  {result.aiReasoning?.map((reason: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                      <span className="text-sm text-slate-300 font-medium leading-relaxed">{reason}</span>
                    </li>
                  ))}
                </ul>
             </Card>

             <Card className="bg-[#0b0f19] border-white/10 p-8 rounded-[2rem]">
                <h4 className="text-yellow-400 font-black mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                  <Star className="w-5 h-5" /> Listing Optimization
                </h4>
                <div className="space-y-5">
                  <div>
                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">SEO Title</div>
                    <div className="text-white text-sm font-bold bg-white/5 p-3 rounded-xl border border-white/5">{result.optimizations?.seoTitle}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Bullet Points</div>
                    <ul className="space-y-2">
                      {result.optimizations?.bulletPoints?.map((bp: string, i: number) => (
                        <li key={i} className="text-xs text-slate-400 bg-white/5 p-2 rounded-lg border border-white/5">✓ {bp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
             </Card>
          </div>

        </motion.div>
      )}
    </div>
  );
}
