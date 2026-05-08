'use client';
import { TrendingUp, ExternalLink, BrainCircuit, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function TrendCard({ trend }: { trend: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden hover:border-orange-500/30 transition-all hover:shadow-[0_0_40px_rgba(249,115,22,0.05)]"
    >
      <div className="aspect-square relative overflow-hidden">
        {trend.thumbnailUrl ? (
          <img 
            src={trend.thumbnailUrl} 
            alt={trend.title}
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
          />
        ) : (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center">
            <ShoppingCart className="h-12 w-12 text-white/10" />
          </div>
        )}
        
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-black/60 backdrop-blur-md border-white/10 uppercase text-[10px] tracking-widest px-2 py-1">
            {trend.platform}
          </Badge>
        </div>
        
        <div className="absolute bottom-4 right-4">
           <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 border-2 border-white/10">
              <span className="font-bold text-sm">{trend.consensusScore}%</span>
           </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-orange-400 transition-colors">
          {trend.title}
        </h3>
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
           <span className="flex items-center gap-1">
             <TrendingUp className="h-3 w-3 text-green-400" /> 
             {trend.views?.toLocaleString() || '0'} Views
           </span>
           <span className="flex items-center gap-1">
             <BrainCircuit className="h-3 w-3 text-blue-400" /> 
             AI Verified
           </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
           <a 
             href={trend.videoUrl} 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs font-semibold text-slate-300"
           >
              <ExternalLink className="h-3 w-3" /> Source
           </a>
           <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 transition-all text-xs font-bold text-white shadow-lg shadow-orange-500/20">
              <ShoppingCart className="h-3 w-3" /> Supplier
           </button>
        </div>
      </div>
    </motion.div>
  );
}
