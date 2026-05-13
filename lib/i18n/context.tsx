'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, SupportedLang } from './translations';

interface I18nContextType {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<SupportedLang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('preferred_lang') as SupportedLang;
    if (saved && translations[saved]) setLangState(saved);
  }, []);

  const setLang = (newLang: SupportedLang) => {
    setLangState(newLang);
    localStorage.setItem('preferred_lang', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const t = (key: string): string => {
    const dict = translations[lang] || translations['en'];
    return (dict as any)[key] || (translations['en'] as any)[key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
