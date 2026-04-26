"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trash2, ArrowRight, ExternalLink } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Storage, SavedProduct } from "@/lib/storage";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function SavedItemsPage() {
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
        setSavedProducts(Storage.getSavedProducts(user.email));
      }
    };
    init();
  }, []);

  const handleRemove = (id: string) => {
    if (!userEmail) return;
    Storage.removeProduct(userEmail, id);
    setSavedProducts(prev => prev.filter(p => p.id !== id));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "from-green-400 to-emerald-500";
    if (score >= 70) return "from-orange-400 to-amber-500";
    return "from-slate-400 to-slate-500";
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <AnimatedGradientText className="mb-2 !mx-0 !justify-start">
          <span className="flex items-center gap-2">
            <Star className="h-4 w-4 text-orange-400" />
            Favorites
          </span>
        </AnimatedGradientText>
        <h1 className="text-3xl font-bold text-white">Saved Products</h1>
        <p className="text-slate-400 mt-1">Review your shortlisted products for future sourcing.</p>
      </div>

      {savedProducts.length === 0 ? (
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
                  <div className="flex items-start justify-between mb-4">
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

                  <p className="text-xs text-slate-400 mb-4 line-clamp-3 leading-relaxed flex-1">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-4 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="text-center">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Wholesale</p>
                      <p className="text-sm font-medium text-slate-300">{product.wholesalePrice}</p>
                    </div>
                    <div className="text-center border-l border-white/5">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Margin</p>
                      <p className="text-sm font-bold text-green-400">{product.profitMargin}</p>
                    </div>
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
      )}
    </div>
  );
}
