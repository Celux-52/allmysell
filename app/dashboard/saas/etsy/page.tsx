"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, Sparkles, TrendingUp, AlertTriangle, CheckCircle, Tag, Store, Eye, Heart, ShoppingBag, PenTool, Truck, Factory, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EtsyStorage } from "@/modules/etsy-automation/services/etsyStorage";
import { createClient } from "@/lib/supabase/client";

export default function EtsySaaSPanel() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  // Auto-run from ?q= parameter (e.g. from History "Run Again")
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
    setResult(null);
    setListing(null);
    setSupplier(null);
    setIsSaved(false);

    try {
      const res = await fetch("/api/etsy/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: searchKeyword }),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to fetch data (${res.status})`);
      }

      const data = await res.json();
      setResult(data);
      
      // Save to history
      if (userEmail) {
        EtsyStorage.addHistory(
          userEmail, 
          searchKeyword, 
          data.analysis.decision, 
          data.analysis.trendScore
        );
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Something went wrong. Please check your API connections.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    runAnalysis(keyword);
  };

  const handleGenerateListing = async () => {
    if (!result?.product) return;

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
        alert(data.error || "Listing generation failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setIsGeneratingListing(false);
    }
  };

  const handleFindSupplier = async () => {
    if (!result?.product) return;

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
        alert(data.error || "Supplier search failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setIsFindingSupplier(false);
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
    
    if (success) {
      setIsSaved(true);
    } else {
      alert("This product is already saved or your limit (20) has been reached.");
    }
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
      if (data.success) {
        setDiscoveredNiches(data.niches);
      } else {
        alert(data.error || "Discovery failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error.");
    } finally {
      setIsDiscovering(false);
    }
  };

  return (
    <div className="space-y-8 pb-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Store className="h-8 w-8 text-orange-500" />
          Etsy Sniper
        </h1>
        <p className="text-slate-400">AI-powered niche hunter, decision engine & autonomous listing generator.</p>
      </div>

      {/* Search Input */}
      <motion.form 
        onSubmit={handleAnalyze}
        className="relative group"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
        </div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter a niche or product to research (e.g. Custom leather wallet)"
          className="w-full bg-[#080c16] border border-white/10 rounded-xl py-4 pl-12 pr-32 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all shadow-xl"
        />
        <button
          type="submit"
          disabled={isLoading || !keyword}
          className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-lg font-medium transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Analyze
        </button>
      </motion.form>

      {/* Niche Discovery Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-orange-500" />
            AI Niche Discovery
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={() => handleDiscover('mashup')} 
              disabled={isDiscovering}
              className="text-xs bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 px-3 py-1.5 rounded-lg border border-orange-500/20 transition-all flex items-center gap-1"
            >
              Mix Categories
            </button>
            <button 
              onClick={() => handleDiscover('arbitrage')}
              disabled={isDiscovering}
              className="text-xs bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg border border-blue-500/20 transition-all"
            >
              Trend Arbitrage
            </button>
            <button 
              onClick={() => handleDiscover('problem-solver')}
              disabled={isDiscovering}
              className="text-xs bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 px-3 py-1.5 rounded-lg border border-purple-500/20 transition-all"
            >
              Solve Problems
            </button>
          </div>
        </div>

        {isDiscovering && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-[#080c16] border border-white/5 rounded-xl animate-pulse flex items-center justify-center">
                <Loader2 className="h-5 w-5 text-slate-700 animate-spin" />
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {discoveredNiches.map((niche, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#080c16] border border-white/10 rounded-xl p-4 hover:border-orange-500/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-1">
                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${niche.competitionLevel === 'Low' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                   {niche.competitionLevel}
                 </span>
              </div>
              <h4 className="text-white font-bold text-sm mb-1 group-hover:text-orange-400 transition-colors">{niche.name}</h4>
              <p className="text-slate-500 text-[11px] line-clamp-2 mb-3">{niche.whyItWorks}</p>
              <button 
                onClick={() => {
                  setKeyword(niche.name);
                  runAnalysis(niche.name);
                }}
                className="w-full py-1.5 bg-white/5 hover:bg-orange-500 text-white text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1"
              >
                <Search className="h-3 w-3" />
                Analyze This
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col items-center justify-center py-20 space-y-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full"></div>
              <Loader2 className="h-12 w-12 text-orange-500 animate-spin relative z-10" />
            </div>
            <p className="text-orange-400 font-medium animate-pulse">Running AI Market Analysis...</p>
            <p className="text-slate-500 text-sm">Evaluating competition, pricing & trends.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* BIG DECISION CARD */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className={`col-span-1 md:col-span-2 p-8 border ${result.analysis.decision === 'SELL' ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'} bg-[#080c16] shadow-2xl relative overflow-hidden`}>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  {result.analysis.decision === 'SELL' ? <CheckCircle className="w-48 h-48 text-green-500" /> : <AlertTriangle className="w-48 h-48 text-red-500" />}
                </div>
                
                <div className="absolute top-6 right-6 z-20">
                  <button 
                    onClick={handleSaveProduct}
                    disabled={isSaved}
                    className={`p-3 rounded-xl border transition-all ${
                      isSaved 
                        ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' 
                        : 'bg-black/40 border-white/10 text-slate-400 hover:text-amber-400 hover:border-amber-500/30'
                    }`}
                    title="Save to Favorites"
                  >
                    <Star className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <div className="relative z-10">
                  <span className={`text-sm font-bold tracking-widest uppercase ${result.analysis.decision === 'SELL' ? 'text-green-400' : 'text-red-400'}`}>
                    AI DECISION ENGINE
                  </span>
                  <h2 className={`text-6xl font-black mt-2 mb-6 ${result.analysis.decision === 'SELL' ? 'text-green-500' : 'text-red-500'}`}>
                    {result.analysis.decision}
                  </h2>
                  <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                    {result.analysis.summary}
                  </p>

                  <div className="flex gap-4 mt-8 flex-wrap">
                    <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/5">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-medium">Trend Score: {result.analysis.trendScore}/100</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/5">
                      <ShoppingBag className="w-5 h-5 text-purple-400" />
                      <span className="text-white font-medium">Competition: {result.analysis.competitionLevel}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Product Info Card */}
              <Card className="col-span-1 p-6 border-white/10 bg-[#080c16] shadow-xl flex flex-col">
                <h3 className="text-slate-400 text-sm font-semibold mb-4">REFERENCE PRODUCT (TOP SELLER)</h3>
                {result.product.imageUrl && (
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-4 border border-white/5 relative">
                    <img src={result.product.imageUrl} alt="Product" className="object-cover w-full h-full" />
                  </div>
                )}
                <h4 className="text-white font-medium line-clamp-2 mb-2">{result.product.title}</h4>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">Price</span>
                    <span className="text-green-400 font-bold text-lg">{result.product.price} {result.product.currency}</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <Eye className="w-4 h-4 text-slate-400" />
                      <span className="text-xs text-slate-300 mt-1">{result.product.views}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-xs text-slate-300 mt-1">{result.product.favorites}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* AI LISTING & SUPPLIER GENERATORS */}
            {result.analysis.decision === 'SELL' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {!listing && (
                  <button
                    onClick={handleGenerateListing}
                    disabled={isGeneratingListing}
                    className="w-full py-4 border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-xl font-bold transition-all flex justify-center items-center gap-2 shadow-lg shadow-orange-500/5 disabled:opacity-50"
                  >
                    {isGeneratingListing ? <Loader2 className="w-5 h-5 animate-spin" /> : <PenTool className="w-5 h-5" />}
                    {isGeneratingListing ? "Generating Human-Like SEO Copy..." : "Generate SEO Listing"}
                  </button>
                )}

                {!supplier && (
                  <button
                    onClick={handleFindSupplier}
                    disabled={isFindingSupplier}
                    className="w-full py-4 border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-xl font-bold transition-all flex justify-center items-center gap-2 shadow-lg shadow-cyan-500/5 disabled:opacity-50"
                  >
                    {isFindingSupplier ? <Loader2 className="w-5 h-5 animate-spin" /> : <Factory className="w-5 h-5" />}
                    {isFindingSupplier ? "Scanning Supply Networks..." : "Find Supplier & Production Strategy"}
                  </button>
                )}
              </motion.div>
            )}

            {/* GENERATED LISTING RESULT */}
            <AnimatePresence>
              {listing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="p-8 border border-purple-500/20 bg-gradient-to-br from-[#080c16] to-purple-900/10 shadow-2xl relative">
                    <div className="absolute top-0 right-0 p-2 bg-purple-500/20 text-purple-400 text-xs font-bold px-4 py-1 rounded-bl-lg">
                      AI Trace Removed
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xs text-slate-500 font-semibold mb-2 uppercase">Optimized Title</h3>
                        <p className="text-xl text-white font-medium leading-relaxed bg-black/40 p-4 rounded-lg border border-white/5">
                          {listing.seoTitle}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xs text-slate-500 font-semibold mb-2 uppercase">Product Description (Seller Voice)</h3>
                        <div 
                          className="text-slate-300 leading-relaxed bg-black/40 p-6 rounded-lg border border-white/5 prose prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: listing.description }}
                        />
                      </div>

                      <div>
                        <h3 className="text-xs text-slate-500 font-semibold mb-3 uppercase flex items-center gap-2">
                          <Tag className="w-4 h-4" /> 13 Golden Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {listing.tags.map((tag: string, i: number) => (
                            <span key={i} className="bg-purple-500/10 border border-purple-500/20 text-purple-300 px-3 py-1.5 rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SUPPLIER STRATEGY RESULT */}
            <AnimatePresence>
              {supplier && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="p-8 border border-cyan-500/20 bg-gradient-to-br from-[#080c16] to-cyan-900/10 shadow-2xl relative">
                    <div className="absolute top-0 right-0 p-2 bg-cyan-500/20 text-cyan-400 text-xs font-bold px-4 py-1 rounded-bl-lg flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Supply Strategy
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="col-span-1 space-y-4">
                        <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                          <span className="text-xs text-slate-500 font-semibold uppercase block mb-1">Production Model</span>
                          <span className="text-cyan-400 font-bold text-lg">{supplier.sourceType}</span>
                        </div>
                        <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                          <span className="text-xs text-slate-500 font-semibold uppercase block mb-1">Recommended Source</span>
                          <span className="text-white font-medium">{supplier.supplierName}</span>
                        </div>
                        <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                          <span className="text-xs text-slate-500 font-semibold uppercase block mb-1">Risk Level</span>
                          <span className={`font-bold ${supplier.riskLevel === 'Low' ? 'text-green-400' : supplier.riskLevel === 'Medium' ? 'text-amber-400' : 'text-red-400'}`}>
                            {supplier.riskLevel}
                          </span>
                        </div>
                      </div>
                      
                      <div className="col-span-1 md:col-span-2">
                        <div className="bg-black/40 p-6 rounded-lg border border-white/5 h-full">
                          <h3 className="text-xs text-slate-500 font-semibold mb-3 uppercase flex items-center gap-2">
                            <Factory className="w-4 h-4" /> 
                            AI Supply Report
                          </h3>
                          <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                            {supplier.notes}
                          </p>
                          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Estimated Production Cost:</span>
                            <span className="text-cyan-400 font-bold text-xl">${supplier.estimatedCost}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
