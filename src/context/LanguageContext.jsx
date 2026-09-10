import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../translations/en';
import { bn } from '../translations/bn';
import { hi } from '../translations/hi';

const translations = { en, bn, hi };

export const availableLanguages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'bn', name: 'Bangla', native: 'বাংলা' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
];

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('alkabeer_lang');
      return saved && translations[saved] ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
      try {
        localStorage.setItem('alkabeer_lang', lang);
      } catch {
        // ignore
      }
    }
  };

  const t = (path) => {
    const keys = path.split('.');
    let current = translations[language];
    let fallback = translations['en'];

    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        current = undefined;
      }

      if (fallback && fallback[k] !== undefined) {
        fallback = fallback[k];
      } else {
        fallback = undefined;
      }
    }

    return current !== undefined ? current : fallback !== undefined ? fallback : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
