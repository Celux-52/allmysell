"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { trackNewsletterSubscribe } from "@/lib/gtag";

export default function Newsletter({ lang }: { lang: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const isTr = lang === "tr";

  const dict = {
    title: isTr ? "SaaS ve Yapay Zeka Bülteni" : "SaaS & AI Newsletter",
    desc: isTr 
      ? "Sektörel trendler, vaka analizleri ve yazılım mühendisliği içgörüleri doğrudan gelen kutunuzda. Spam yok."
      : "Industry trends, case studies, and software engineering insights delivered straight to your inbox. No spam.",
    placeholder: isTr ? "E-posta adresiniz..." : "Your email address...",
    btn: isTr ? "Abone Ol" : "Subscribe",
    success: isTr ? "Başarıyla abone oldunuz!" : "Successfully subscribed!",
    error: isTr ? "Bir hata oluştu. Lütfen tekrar deneyin." : "An error occurred. Please try again."
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        trackNewsletterSubscribe();
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-indigo-600 border-y border-indigo-700 py-16 px-6 lg:px-12 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-indigo-100 text-sm font-semibold mb-4 border border-white/10 backdrop-blur-sm">
            <Mail className="w-4 h-4" /> Newsletter
          </div>
          <p className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            {dict.title}
          </h2>
          <p className="text-indigo-200 text-lg max-w-xl">
            {dict.desc}
          </p>
        </div>

        <div className="w-full md:w-[400px] shrink-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                placeholder={dict.placeholder}
                required
                className="w-full bg-indigo-900/40 border border-indigo-500/50 text-white placeholder:text-indigo-300 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white transition-all"
              />
            </div>
            
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full bg-white text-indigo-600 hover:bg-indigo-50 px-5 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              ) : status === "success" ? (
                <><CheckCircle className="w-5 h-5 text-emerald-500" /> {dict.success}</>
              ) : (
                <>{dict.btn} <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
            {status === "error" && (
              <p className="text-pink-300 text-sm flex items-center gap-1.5 mt-1 justify-center md:justify-start">
                <AlertCircle className="w-4 h-4" /> {dict.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
