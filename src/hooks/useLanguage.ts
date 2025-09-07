import { useState, useEffect } from 'react';
import type { Language } from '../types';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const saved = localStorage.getItem('fv-language') as Language;
    if (saved && ['es', 'en', 'zh'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('fv-language', lang);
  };

  return { language, changeLanguage };
};