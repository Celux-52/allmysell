"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trash2, ArrowRight, ExternalLink, Pencil, Check, X, Zap } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Storage, SavedProduct, SAVED_LIMIT } from "@/lib/storage";
import { EtsyStorage, SavedEtsyProduct, ETSY_SAVED_LIMIT } from "@/modules/etsy-automation/services/etsyStorage";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function SavedItemsPage() {
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
  const [etsySavedProducts, setEtsySavedProducts] = useState<SavedEtsyProduct[]>([]);
  const [activeTab, setActiveTab] = useState<'research' | 'etsy'>('research');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
        setEtsySavedProducts(EtsyStorage.getSavedProducts(user.email));
        try {
          const { getSavedProductsAction } = await import('@/app/actions/savedProducts');
          const res = await getSavedProductsAction();
          if (res.success && res.data) {
            // Map DB format to UI format
            const formatted = res.data.map((p: any) => {
              let parsed = {};
              try { if (p.notes) parsed = JSON.parse(p.notes); } catch(e) {}
              return {
                id: p.id,
                name: p.productName,
                category: p.category,
                wholesalePrice: (parsed as any).wholesalePrice || "N/A",
                retailPrice: (parsed as any).retailPrice || "N/A",
                profitMargin: `${p.profitMargin}%`,
                competition: p.competition,
                trend: (parsed as any).trend || "Stable",
                score: p.aiScore,
                profitScore: (parsed as any).profitScore,
                competitionScore: (parsed as any).competitionScore,
                opportunityScore: (parsed as any).opportunityScore,
                description: (parsed as any).description,
                whyItWorks: (parsed as any).whyItWorks,
                targetAudience: (parsed as any).targetAudience,
                note: (parsed as any).userNote || "",
                savedAt: p.createdAt.toISOString ? p.createdAt.toISOString() : p.createdAt
              };
            });
            setSavedProducts(formatted);
          }
        } catch(err) {}
      }
    };
    init();
  }, []);

  const handleRemove = async (id: string) => {
    if (!userEmail) return;
    if (activeTab === 'research') {
      try {
        const { removeSavedProductAction } = await import('@/app/actions/savedProducts');
        await removeSavedProductAction(id);
        setSavedProducts(prev => prev.filter(p => p.id !== id));
      } catch(err) {}
    } else {
      EtsyStorage.removeProduct(userEmail, id);
      setEtsySavedProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const startEditNote = (product: any) => {
    setEditingNote(product.id);
    setNoteText(product.note || "");
  };

  const saveNote = async (id: string) => {
    if (!userEmail) return;
    if (activeTab === 'research') {
      try {
        const { updateSavedProductNoteAction } = await import('@/app/actions/savedProducts');
        await updateSavedProductNoteAction(id, noteText);
        setSavedProducts(prev => prev.map(p => p.id === id ? { ...p, note: noteText } : p));
        setEditingNote(null);
        setNoteText("");
      } catch(err) {}
    } else {
      EtsyStorage.updateNote(userEmail, id, noteText);
      setEtsySavedProducts(prev => prev.map(p => p.id === id ? { ...p, note: noteText } : p));
      setEditingNote(null);
      setNoteText("");
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "from-green-400 to-emerald-500";
    if (score >= 70) return "from-orange-400 to-amber-500";
    return "from-slate-400 to-slate-500";
  };

  const usedSlots = activeTab === 'research' ? savedProducts.length : etsySavedProducts.length;
  const currentLimit = activeTab === 'research' ? SAVED_LIMIT : ETSY_SAVED_LIMIT;
  const limitPercent = (usedSlots / currentLimit) * 100;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <AnimatedGradientText className="mb-2 !mx-0 !justify-start">
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 text-orange-400" />
              Favorites
            </span>
          </AnimatedGradientText>
          <h1 className="text-3xl font-bold text-white">Saved Products</h1>
          <p className="text-slate-400 mt-1">Your shortlisted high-potential products.</p>
        </div>
        {/* Limit Indicator */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#080c16] border border-white/10">
          <div className="flex-1 min-w-[120px]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-400">Saved Slots</span>
              <span className={`text-xs font-bold ${usedSlots >= currentLimit ? 'text-red-400' : 'text-white'}`}>{usedSlots}/{currentLimit}</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${usedSlots >= currentLimit ? 'bg-red-500' : usedSlots >= currentLimit * 0.7 ? 'bg-amber-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'}`} style={{width: `${limitPercent}%`}} />
            </div>
          </div>
          {usedSlots >= currentLimit && <span className="text-[10px] text-red-400 font-medium whitespace-nowrap">Full!</span>}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-black/40 border border-white/5 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('research')}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'research' 
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Smart Research
        </button>
        <button
          onClick={() => setActiveTab('etsy')}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'etsy' 
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Etsy Automation
        </button>
      </div>

      {activeTab === 'research' && (
        savedProducts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/5 bg-[#080c16] p-12 text-center"
        >
          <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
            <Star className="h-8 w-8 text-slate-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No saved items yet</h2>
          <p className="text-slate-400 mb-6 max-w-sm mx-auto">When you find an interesting product during your research, click the star icon to save it here.</p>
          <Link href="/dashboard/research" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-colors">
            Start Research <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {savedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                layout
              >
                <MagicCard className="p-5 flex flex-col h-full relative group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`text-xl font-extrabold bg-gradient-to-r ${getScoreColor(product.score)} text-transparent bg-clip-text`}>
                        {product.score}
                      </div>
                      <div className="h-6 w-px bg-white/10" />
                      <div>
                        <h3 className="text-base font-bold text-white leading-tight pr-8 line-clamp-1">{product.name}</h3>
                        <p className="text-xs text-slate-500">{product.category}</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleRemove(product.id)}
                      className="absolute top-5 right-5 p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove from Saved"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* 3-Score Bars */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div>
                      <p className="text-[10px] text-slate-500 mb-1">⭐ Profit</p>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{width:`${product.profitScore || 50}%`}} /></div>
                      <p className="text-[10px] text-green-400 mt-0.5 font-bold">{product.profitScore || '—'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 mb-1">🔥 Compete</p>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" style={{width:`${product.competitionScore || 50}%`}} /></div>
                      <p className="text-[10px] text-amber-400 mt-0.5 font-bold">{product.competitionScore || '—'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 mb-1">💎 Opportunity</p>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-purple-500 to-violet-400 rounded-full" style={{width:`${product.opportunityScore || 50}%`}} /></div>
                      <p className="text-[10px] text-purple-400 mt-0.5 font-bold">{product.opportunityScore || '—'}</p>
                    </div>
                  </div>

                  {/* Why This Will Sell */}
                  {product.whyItWorks && (
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-orange-500/5 border border-orange-500/10 mb-3">
                      <Zap className="h-3.5 w-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <p className="text-[11px] text-orange-300/90 leading-relaxed line-clamp-2">{product.whyItWorks}</p>
                    </div>
                  )}

                  <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed flex-1">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-3 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="text-center">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Wholesale</p>
                      <p className="text-sm font-medium text-slate-300">{product.wholesalePrice}</p>
                    </div>
                    <div className="text-center border-l border-white/5">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Margin</p>
                      <p className="text-sm font-bold text-green-400">{product.profitMargin}</p>
                    </div>
                  </div>

                  {/* Note Section */}
                  <div className="mb-3">
                    {editingNote === product.id ? (
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Add a note..."
                          maxLength={80}
                          autoFocus
                          className="flex-1 bg-white/5 border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500/50"
                        />
                        <button onClick={() => saveNote(product.id)} className="p-1.5 rounded-md bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"><Check className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setEditingNote(null)} className="p-1.5 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"><X className="h-3.5 w-3.5" /></button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditNote(product)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md border transition-colors text-xs ${product.note ? 'bg-violet-500/5 border-violet-500/15 text-violet-300' : 'bg-white/[0.02] border-white/5 text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
                      >
                        {product.note ? (
                          <span className="flex items-center gap-1.5"><Pencil className="h-3 w-3 flex-shrink-0" />{product.note}</span>
                        ) : (
                          <span className="flex items-center gap-1.5"><Pencil className="h-3 w-3" />Add a note...</span>
                        )}
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                    <span className="text-[10px] text-slate-500">
                      Saved {new Date(product.savedAt).toLocaleDateString()}
                    </span>
                    <Link 
                      href="/dashboard/research" 
                      className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
                    >
                      Research Similar <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ))}

      {activeTab === 'etsy' && (
        etsySavedProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/5 bg-[#080c16] p-12 text-center"
          >
            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Star className="h-8 w-8 text-slate-500" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No Etsy items saved yet</h2>
            <p className="text-slate-400 mb-6 max-w-sm mx-auto">When you analyze a product in the Etsy Sniper, click the star icon to save it here.</p>
            <Link href="/dashboard/saas/etsy" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-colors">
              Snipe a Product <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {etsySavedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  layout
                >
                  <MagicCard className="p-5 flex flex-col h-full relative group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`text-sm font-extrabold px-2 py-1 rounded-full ${product.decision === 'SELL' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                          {product.decision}
                        </div>
                        <div className="h-6 w-px bg-white/10" />
                        <div>
                          <h3 className="text-base font-bold text-white leading-tight pr-8 line-clamp-1">{product.title}</h3>
                          <p className="text-xs text-slate-500">{product.shopName || "Unknown Shop"}</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleRemove(product.id)}
                        className="absolute top-5 right-5 p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove from Saved"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {product.imageUrl && (
                      <div className="w-full h-32 rounded-lg overflow-hidden mb-4 border border-white/5 relative">
                        <img src={product.imageUrl} alt="Product" className="object-cover w-full h-full" />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className="text-[10px] text-slate-500 mb-1">⭐ Trend Skoru</p>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" style={{width:`${product.trendScore || 50}%`}} /></div>
                        <p className="text-[10px] text-amber-400 mt-0.5 font-bold">{product.trendScore || '—'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 mb-1">👀 Views</p>
                        <p className="text-sm text-white font-bold">{product.views}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                      <div className="text-center">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Fiyat</p>
                        <p className="text-sm font-bold text-green-400">{product.price} {product.currency}</p>
                      </div>
                      <div className="text-center border-l border-white/5">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Favoriler</p>
                        <p className="text-sm font-bold text-red-400">{product.favorites}</p>
                      </div>
                    </div>

                    {/* Note Section */}
                    <div className="mb-3 mt-auto">
                      {editingNote === product.id ? (
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Add a note..."
                            maxLength={80}
                            autoFocus
                            className="flex-1 bg-white/5 border border-white/10 rounded-md px-2.5 py-1.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500/50"
                          />
                          <button onClick={() => saveNote(product.id)} className="p-1.5 rounded-md bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"><Check className="h-3.5 w-3.5" /></button>
                          <button onClick={() => setEditingNote(null)} className="p-1.5 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"><X className="h-3.5 w-3.5" /></button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditNote(product)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-md border transition-colors text-xs ${product.note ? 'bg-violet-500/5 border-violet-500/15 text-violet-300' : 'bg-white/[0.02] border-white/5 text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
                        >
                          {product.note ? (
                            <span className="flex items-center gap-1.5"><Pencil className="h-3 w-3 flex-shrink-0" />{product.note}</span>
                          ) : (
                            <span className="flex items-center gap-1.5"><Pencil className="h-3 w-3" />Add a note...</span>
                          )}
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-[10px] text-slate-500">
                        Saved {new Date(product.savedAt).toLocaleDateString()}
                      </span>
                      <a 
                        href={product.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
                      >
                        View on Etsy <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </MagicCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )
      )}
    </div>
  );
}
