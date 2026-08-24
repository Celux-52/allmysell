"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { trackCTAClick } from "@/lib/gtag";

export default function FloatingCTA({ lang }: { lang: string }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const text = 
    lang === "tr" ? "Ücretsiz Teklif Al" :
    lang === "ru" ? "Получить Предложение" :
    lang === "uz" ? "Bepul Taklif Olish" : "Get a Free Quote";

  const bannerText = 
    lang === "tr" ? "Projenizi birlikte planlayalım. İlk görüşme ücretsiz." :
    lang === "ru" ? "Давайте спланируем ваш проект вместе. Первая консультация бесплатна." :
    lang === "uz" ? "Loyihangizni birgalikda rejalashtiramiz. Birinchi uchrashuv bepul." :
    "Let's plan your project together. First consultation is free.";

  const href = 
    lang === "tr" ? "/tr/iletisim" :
    lang === "ru" ? "/ru/kontakty" :
    lang === "uz" ? "/uz/aloqa" : "/en/contact";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollY / (docHeight - winHeight);

      // Show after scrolling 25%, hide near bottom (last 10%)
      if (scrollPercent > 0.25 && scrollPercent < 0.90) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[#0A192F]/95 md:backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-6">
          {/* Text - hidden on very small screens */}
          <p className="hidden sm:block text-white/70 text-sm font-medium truncate">
            {bannerText}
          </p>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <Link
              href={href}
              onClick={() => trackCTAClick("floating_bar", text)}
              className="flex items-center gap-2 bg-white hover:bg-blue-50 text-[#0A192F] px-5 sm:px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all hover:scale-105 hover:shadow-lg shadow-md whitespace-nowrap"
            >
              {text}
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setDismissed(true)}
              className="p-2 text-white/40 hover:text-white/80 transition-colors rounded-full hover:bg-white/10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
