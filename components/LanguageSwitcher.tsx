"use client";

import { useEffect, useState, useRef } from 'react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Add the Google Translate script dynamically
    const script = document.createElement('script');
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // 2. Define the init callback globally
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'tr', autoDisplay: false },
        'google_translate_element'
      );
    };

    // Close dropdown on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setCurrentLang(lang);
    setIsOpen(false);
    
    // Find the hidden Google Translate dropdown and trigger a change
    const gtCombo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (gtCombo) {
      gtCombo.value = lang.code;
      gtCombo.dispatchEvent(new Event('change'));
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Hidden element for Google Translate script to hook into */}
      <div id="google_translate_element" className="hidden"></div>
      
      {/* Custom Dropdown Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all font-medium text-sm border border-transparent hover:border-white/10"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLang.flag} {currentLang.name}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 glass-card rounded-xl opacity-100 visible transition-all duration-300 transform translate-y-0 z-50 overflow-hidden border border-white/10 shadow-2xl shadow-black">
          <div className="py-2 bg-[#080c16]/90 backdrop-blur-xl">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                  currentLang.code === lang.code 
                    ? 'bg-orange-500/10 text-orange-400' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
