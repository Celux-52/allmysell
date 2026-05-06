"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, Sparkles, TrendingUp, AlertTriangle, CheckCircle, Tag, Store, Eye, Heart, ShoppingBag, PenTool, Truck, Factory } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function EtsySaaSPanel() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingListing, setIsGeneratingListing] = useState(false);
  const [isFindingSupplier, setIsFindingSupplier] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [listing, setListing] = useState<any>(null);
  const [supplier, setSupplier] = useState<any>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword) return;

    setIsLoading(true);
    setResult(null);
    setListing(null);
    setSupplier(null);

    try {
      const res = await fetch("/api/etsy/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Bir hata oluştu. Lütfen API bağlantılarınızı (Etsy & OpenAI) kontrol edin.");
    } finally {
      setIsLoading(false);
    }
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
      }
    } catch (error) {
      console.error(error);
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
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFindingSupplier(false);
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
          placeholder="Etsy'de araştırmak istediğiniz nişi veya ürünü yazın (Örn: Custom leather wallet)"
          className="w-full bg-[#080c16] border border-white/10 rounded-xl py-4 pl-12 pr-32 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all shadow-xl"
        />
        <button
          type="submit"
          disabled={isLoading || !keyword}
          className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-lg font-medium transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Analiz Et
        </button>
      </motion.form>

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
            <p className="text-orange-400 font-medium animate-pulse">AI Pazar Analizi Yapıyor...</p>
            <p className="text-slate-500 text-sm">Rekabet, fiyatlama ve trendler hesaplanıyor.</p>
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
                
                <div className="relative z-10">
                  <span className={`text-sm font-bold tracking-widest uppercase ${result.analysis.decision === 'SELL' ? 'text-green-400' : 'text-red-400'}`}>
                    AI KARAR MOTORU
                  </span>
                  <h2 className={`text-6xl font-black mt-2 mb-6 ${result.analysis.decision === 'SELL' ? 'text-green-500' : 'text-red-500'}`}>
                    {result.analysis.decision}
                  </h2>
                  <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                    {result.analysis.summary}
                  </p>

                  <div className="flex gap-4 mt-8">
                    <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/5">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-medium">Trend Skoru: {result.analysis.trendScore}/100</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/5">
                      <ShoppingBag className="w-5 h-5 text-purple-400" />
                      <span className="text-white font-medium">Rekabet: {result.analysis.competitionLevel}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Product Info Card */}
              <Card className="col-span-1 p-6 border-white/10 bg-[#080c16] shadow-xl flex flex-col">
                <h3 className="text-slate-400 text-sm font-semibold mb-4">REFERANS ÜRÜN (TOP SELLER)</h3>
                {result.product.imageUrl && (
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-4 border border-white/5 relative">
                    <img src={result.product.imageUrl} alt="Product" className="object-cover w-full h-full" />
                  </div>
                )}
                <h4 className="text-white font-medium line-clamp-2 mb-2">{result.product.title}</h4>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">Fiyat</span>
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
                    {isGeneratingListing ? "İnsani SEO Metni Üretiliyor..." : "Otonom SEO Listelemesi Oluştur"}
                  </button>
                )}

                {!supplier && (
                  <button
                    onClick={handleFindSupplier}
                    disabled={isFindingSupplier}
                    className="w-full py-4 border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-xl font-bold transition-all flex justify-center items-center gap-2 shadow-lg shadow-cyan-500/5 disabled:opacity-50"
                  >
                    {isFindingSupplier ? <Loader2 className="w-5 h-5 animate-spin" /> : <Factory className="w-5 h-5" />}
                    {isFindingSupplier ? "Tedarik Ağları Taranıyor..." : "Tedarikçi & Üretim Stratejisi Bul"}
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
                      Yapay Zeka İzi Temizlendi
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xs text-slate-500 font-semibold mb-2 uppercase">Optimize Edilmiş Başlık</h3>
                        <p className="text-xl text-white font-medium leading-relaxed bg-black/40 p-4 rounded-lg border border-white/5">
                          {listing.seoTitle}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xs text-slate-500 font-semibold mb-2 uppercase">Satıcı Ağzından Ürün Açıklaması</h3>
                        <div 
                          className="text-slate-300 leading-relaxed bg-black/40 p-6 rounded-lg border border-white/5 prose prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: listing.description }}
                        />
                      </div>

                      <div>
                        <h3 className="text-xs text-slate-500 font-semibold mb-3 uppercase flex items-center gap-2">
                          <Tag className="w-4 h-4" /> 13 Altın Etiket
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
                      Tedarik Stratejisi
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="col-span-1 space-y-4">
                        <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                          <span className="text-xs text-slate-500 font-semibold uppercase block mb-1">Üretim Modeli</span>
                          <span className="text-cyan-400 font-bold text-lg">{supplier.sourceType}</span>
                        </div>
                        <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                          <span className="text-xs text-slate-500 font-semibold uppercase block mb-1">Önerilen Kaynak</span>
                          <span className="text-white font-medium">{supplier.supplierName}</span>
                        </div>
                        <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                          <span className="text-xs text-slate-500 font-semibold uppercase block mb-1">Risk Seviyesi</span>
                          <span className={`font-bold ${supplier.riskLevel === 'Low' ? 'text-green-400' : supplier.riskLevel === 'Medium' ? 'text-amber-400' : 'text-red-400'}`}>
                            {supplier.riskLevel}
                          </span>
                        </div>
                      </div>
                      
                      <div className="col-span-1 md:col-span-2">
                        <div className="bg-black/40 p-6 rounded-lg border border-white/5 h-full">
                          <h3 className="text-xs text-slate-500 font-semibold mb-3 uppercase flex items-center gap-2">
                            <Factory className="w-4 h-4" /> 
                            Yapay Zeka Tedarik Raporu
                          </h3>
                          <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                            {supplier.notes}
                          </p>
                          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Tahmini Üretim Maliyeti:</span>
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
