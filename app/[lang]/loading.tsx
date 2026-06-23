import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center">
      {/* Modern Spinner Container */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Glow - Removed blur/pulse on mobile to prevent GPU lockups */}
        <div className="absolute w-32 h-32 bg-indigo-500/10 rounded-full hidden md:block blur-[40px]"></div>
        
        {/* Core Loader */}
        <div className="w-16 h-16 bg-white rounded-2xl shadow-xl shadow-indigo-900/5 border border-slate-200 flex items-center justify-center relative z-10">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
      </div>
      
      {/* Text Element */}
      <h2 className="mt-8 text-xl font-bold text-[#0A192F] tracking-tight animate-pulse">
        Loading Platform...
      </h2>
      <p className="text-slate-500 text-sm mt-2 font-medium">
        Connecting to edge servers
      </p>
    </div>
  );
}
