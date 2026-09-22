import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { en } from '../i18n/en';
import { ko } from '../i18n/ko';
import type { Language, Localized } from '../data/types';
import { readPreference, writePreference } from '../lib/storage';

function useLanguageState() {
  const [language, setLanguage] = useState<Language>(() =>
    readPreference('hk-language') === 'ko' ? 'ko' : 'en',
  );
  const t = language === 'ko' ? ko : en;
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t.meta.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', t.meta.description);
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute('content', language === 'ko' ? 'ko_KR' : 'en_US');
  }, [language, t]);
  return {
    language,
    t,
    localized: (value: Localized) => value[language] || value.en,
    setLanguage: (value: Language) => {
      writePreference('hk-language', value);
      setLanguage(value);
    },
  };
}
const LanguageContext = createContext<ReturnType<typeof useLanguageState> | null>(null);
export function LanguageProvider({ children }: { children: ReactNode }) {
  return <LanguageContext.Provider value={useLanguageState()}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage requires LanguageProvider');
  return context;
}
