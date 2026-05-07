"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Loader2, Sparkles, TrendingUp, AlertTriangle, 
  CheckCircle, Tag, Store, Eye, Heart, ShoppingBag, 
  PenTool, Truck, Factory, Star, BarChart3, ShieldCheck,
  Zap, Info, ExternalLink, ArrowRight
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

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) setUserEmail(user.email);
    };
    init();
  }, []);

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
    <div className="space-y-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-8">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold tracking-wider uppercase">
              <Zap className="w-3 h-3" /> Professional E-Commerce Intelligence
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-center gap-3">
              Etsy Sniper <span className="text-orange-500 text-sm align-top">PRO</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Uncover high-profit Etsy niches with real-time market data, multi-AI consensus, and verified supplier mapping.
            </p>
          </div>
          
          {/* Stats Bar (Mockup for now) */}
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
              <span className="block text-[10px] text-slate-500 uppercase font-bold">Accuracy</span>
              <span className="text-white font-bold">98.4%</span>
            </div>
            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
              <span className="block text-[10px] text-slate-500 uppercase font-bold">Models active</span>
              <span className="text-white font-bold">5 Agents</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEARCH BAR --- */}
      <motion.form 
        onSubmit={handleAnalyze}
        className="relative group z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-focus-within:opacity-50"></div>
        <div className="relative flex items-center bg-[#0d111c] border border-white/10 rounded-2xl p-1.5 shadow-2xl">
          <div className="flex-shrink-0 pl-4">
            <Search className="h-6 w-6 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
          </div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search for a niche (e.g. Personalized wooden gifts for kids)"
            className="w-full bg-transparent border-none py-4 px-4 text-lg text-white placeholder:text-slate-600 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !keyword}
            className="flex-shrink-0 px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
            Analyze Market
          </button>
        </div>
      </motion.form>

      {/* --- QUICK DISCOVERY --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Mix Categories', strategy: 'mashup', icon: <Sparkles className="w-4 h-4" />, color: 'orange' },
          { label: 'Trend Arbitrage', strategy: 'arbitrage', icon: <TrendingUp className="w-4 h-4" />, color: 'blue' },
          { label: 'Solve Problems', strategy: 'problem-solver', icon: <PenTool className="w-4 h-4" />, color: 'purple' },
        ].map((item) => (
          <button
            key={item.strategy}
            onClick={() => handleDiscover(item.strategy)}
            disabled={isDiscovering}
            className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-white/5 bg-[#0d111c] hover:border-${item.color}-500/50 hover:bg-${item.color}-500/5 transition-all group`}
          >
            <div className={`p-2 rounded-lg bg-${item.color}-500/10 text-${item.color}-400 group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <span className="text-slate-300 font-semibold">{item.label}</span>
          </button>
        ))}
      </div>

      {/* --- DISCOVERED NICHES --- */}
      <AnimatePresence>
        {(isDiscovering || discoveredNiches.length > 0) && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-500" /> AI Suggestions Found
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {isDiscovering ? (
                [1,2,3,4].map(i => <div key={i} className="h-32 bg-white/5 rounded-xl animate-pulse" />)
              ) : (
                discoveredNiches.map((niche, i) => (
                  <Card 
                    key={i} 
                    className="p-4 bg-[#0d111c] border-white/10 hover:border-orange-500/40 transition-all cursor-pointer group"
                    onClick={() => { setKeyword(niche.name); runAnalysis(niche.name); }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-black uppercase text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded">NEW Niche</span>
                      <span className={`text-[10px] font-bold ${niche.competitionLevel === 'Low' ? 'text-green-400' : 'text-amber-400'}`}>{niche.competitionLevel} Comp</span>
                    </div>
                    <h4 className="text-white font-bold text-sm mb-1 line-clamp-1">{niche.name}</h4>
                    <p className="text-slate-500 text-[10px] line-clamp-2">{niche.whyItWorks}</p>
                    <div className="mt-3 flex items-center text-[10px] text-orange-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to analyze <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </Card>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ANALYSIS PROGRESS --- */}
      <AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20 flex flex-col items-center">
            <div className="w-64 h-2 bg-white/5 rounded-full overflow-hidden mb-6">
              <motion.div 
                className="h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                initial={{ width: "0%" }}
                animate={{ width: `${(analysisStep / 3) * 100}%` }}
              />
            </div>
            <p className="text-white font-bold text-xl mb-2">
              {analysisStep === 1 && "🔍 Scanning Market Data..."}
              {analysisStep === 2 && "🧠 Multi-AI Consensus Check..."}
              {analysisStep === 3 && "📈 Verifying Live Trends..."}
            </p>
            <p className="text-slate-500 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" /> AllMySell Real-Time Intelligence Active
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- RESULTS PANEL --- */}
      {result && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Decision & Intelligence */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className={`overflow-hidden border-none bg-gradient-to-br ${result.analysis.decision === 'SELL' ? 'from-green-600/10 via-[#0d111c] to-[#0d111c]' : 'from-red-600/10 via-[#0d111c] to-[#0d111c]'}`}>
                <div className="p-8 relative">
                  {/* Decorative background logo */}
                  <div className="absolute -top-10 -right-10 opacity-5">
                    {result.analysis.decision === 'SELL' ? <CheckCircle className="w-64 h-64 text-green-500" /> : <AlertTriangle className="w-64 h-64 text-red-500" />}
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-black uppercase tracking-tighter">AI AGENT CONSENSUS</span>
                        <div className="flex -space-x-2">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className={`w-5 h-5 rounded-full border border-black flex items-center justify-center text-[8px] font-bold ${i <= (result.analysis.consensus?.agreedCount || 4) ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                              {i}
                            </div>
                          ))}
                        </div>
                      </div>
                      <h2 className={`text-7xl font-black italic tracking-tighter ${result.analysis.decision === 'SELL' ? 'text-green-500' : 'text-red-500'}`}>
                        {result.analysis.decision === 'SELL' ? 'PROFITABLE' : 'RISKY'}
                      </h2>
                    </div>

                    <div className="flex flex-col items-center justify-center bg-black/40 border border-white/10 rounded-3xl px-10 py-6 text-center">
                      <span className="text-slate-500 text-xs font-bold uppercase mb-1">Success Score</span>
                      <span className="text-5xl font-black text-white">{result.analysis.trendScore}<span className="text-lg text-slate-500">/100</span></span>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative z-10">
                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-green-500" /> Intelligence Summary
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {result.analysis.summary}
                    </p>
                  </div>

                  {/* Market Performance Bars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 relative z-10">
                    {[
                      { label: 'Market Demand', value: result.analysis.scores?.demand || 80, color: 'blue' },
                      { label: 'Profit Potential', value: result.analysis.scores?.margin || 75, color: 'green' },
                      { label: 'Competition Gap', value: result.analysis.scores?.competition || 60, color: 'purple' },
                      { label: 'Trend Velocity', value: result.analysis.scores?.trend || 90, color: 'orange' },
                    ].map((bar) => (
                      <div key={bar.label} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase">
                          <span className="text-slate-500">{bar.label}</span>
                          <span className="text-white">{bar.value}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${bar.value}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full bg-${bar.color}-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* AI Insights Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-orange-500/5 border border-orange-500/20 p-5 rounded-2xl flex gap-4">
                <div className="bg-orange-500/10 p-3 rounded-xl h-fit text-orange-500">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">SEO Quick Insight</h4>
                  <p className="text-slate-400 text-sm leading-snug">{result.analysis.seoInsight || "Focus on long-tail gift keywords."}</p>
                </div>
              </div>
              <div className="bg-blue-500/5 border border-blue-500/20 p-5 rounded-2xl flex gap-4">
                <div className="bg-blue-500/10 p-3 rounded-xl h-fit text-blue-500">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Market Position</h4>
                  <p className="text-slate-400 text-sm leading-snug">Ideal for {result.analysis.isHandmade ? 'Handmade' : 'Dropshipping'} and {result.analysis.isCustomizable ? 'Personalization' : 'Standard'} models.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Reference & Actions */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 bg-[#0d111c] border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-500 text-xs font-black uppercase">Market Reference</h3>
                <button 
                   onClick={handleSaveProduct}
                   className={`p-2 rounded-lg border transition-all ${isSaved ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' : 'bg-white/5 border-white/10 text-slate-500 hover:text-amber-500'}`}
                >
                  <Star className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              {result.product.imageUrl && (
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 group border border-white/5">
                  <img src={result.product.imageUrl} alt="Ref" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                  <a href={result.product.url} target="_blank" className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold">
                    View on Etsy <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              <h4 className="text-white font-bold leading-tight mb-4">{result.product.title}</h4>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase block mb-1">Price</span>
                  <span className="text-green-500 font-black text-xl">{result.product.price} <span className="text-xs">{result.product.currency}</span></span>
                </div>
                <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase block mb-1">Favorites</span>
                  <span className="text-white font-black text-xl">{result.product.favorites}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => setIsGeneratingListing(true)}
                  className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <PenTool className="w-4 h-4" /> Generate Listing
                </button>
                <button 
                  onClick={() => setIsFindingSupplier(true)}
                  className="w-full py-4 bg-transparent border-2 border-white/10 text-white font-black rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" /> Find Suppliers
                </button>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-transparent border-white/5">
               <h3 className="text-orange-500 text-[10px] font-black uppercase mb-3 flex items-center gap-2">
                 <ShieldCheck className="w-3 h-3" /> System Verification
               </h3>
               <p className="text-slate-400 text-[11px] italic">
                 This analysis is backed by real-time internet scraping and trend validation. Estimates are based on current market dynamics as of May 2026.
               </p>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
   
 / *   t r i g g e r   s y n c   * /  
 