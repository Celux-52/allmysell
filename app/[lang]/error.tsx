"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
        <AlertTriangle className="w-12 h-12" />
      </div>
      <h1 className="text-3xl md:text-5xl font-bold text-[#0A192F] tracking-tight mb-4 font-sans">
        System Error
      </h1>
      <p className="text-slate-500 max-w-md mx-auto mb-8 text-lg">
        An unexpected error occurred while processing your request. Our technical team has been notified.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 bg-[#0A192F] hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl transition-colors duration-300 shadow-xl shadow-indigo-900/10"
      >
        <RefreshCcw className="w-4 h-4" /> Try Again
      </button>
    </div>
  );
}
