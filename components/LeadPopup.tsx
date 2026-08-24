"use client";

import { useState, useEffect } from "react";
import { X, Mail, ArrowRight } from "lucide-react";

export default function LeadPopup({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if user has already seen it (in this session or via localstorage)
    const stored = localStorage.getItem("allmysell_popup_shown");
    if (stored) return;

    // Show after 10 seconds or on exit intent
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
        localStorage.setItem("allmysell_popup_shown", "true");
      }
    }, 10000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        localStorage.setItem("allmysell_popup_shown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  if (!isOpen) return null;

  const title = 
    lang === 'tr' ? 'Gitmeden Önce!' :
    lang === 'ru' ? 'Подождите, перед тем как уйти!' :
    lang === 'uz' ? 'Ketishdan oldin!' : 'Wait, Before You Go!';

  const desc = 
    lang === 'tr' 
      ? 'E-ticaret ve yazılım dünyasındaki en son stratejileri, gizli eBay taktiklerini ve özel indirimleri kaçırmayın. Ücretsiz bültenimize katılın.'
      : lang === 'ru'
      ? 'Не упустите последние стратегии в области электронной коммерции, секретные тактики eBay и эксклюзивные скидки. Подпишитесь на нашу бесплатную рассылку.'
      : lang === 'uz'
      ? 'Elektron tijoratdagi so\'nggi strategiyalarni, maxfiy eBay taktikalarini va eksklyuziv chegirmalarni o\'tkazib yubormang. Bepul xabarnomamizga qo\'shiling.'
      : 'Don\'t miss out on the latest e-commerce strategies, hidden eBay tactics, and exclusive discounts. Join our free newsletter.';

  const placeholder = 
    lang === 'tr' ? 'E-posta adresiniz...' :
    lang === 'ru' ? 'Ваш адрес электронной почты...' :
    lang === 'uz' ? 'Elektron pochta manzilingiz...' : 'Your email address...';

  const btn = 
    lang === 'tr' ? 'Ücretsiz Kaydol' :
    lang === 'ru' ? 'Подписаться бесплатно' :
    lang === 'uz' ? 'Bepul obuna bo\'lish' : 'Subscribe for Free';

  const footerText = 
    lang === 'tr' ? 'İstediğiniz zaman abonelikten çıkabilirsiniz.' :
    lang === 'ru' ? 'Вы можете отписаться в любое время.' :
    lang === 'uz' ? 'Istalgan vaqtda obunani bekor qilishingiz mumkin.' : 'You can unsubscribe at any time.';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div 
        className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-300"
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 rounded-full p-2"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
          <Mail className="w-8 h-8" />
        </div>
        
        <h3 className="text-2xl font-bold text-[#0A192F] mb-3">
          {title}
        </h3>
        <p className="text-slate-600 mb-6 leading-relaxed">
          {desc}
        </p>

        <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
          <input 
            type="email" 
            placeholder={placeholder} 
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
          />
          <button 
            type="submit"
            className="w-full bg-[#0A192F] hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {btn} <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        <p className="text-xs text-slate-400 mt-4 text-center">
          {footerText}
        </p>
      </div>
    </div>
  );
}
