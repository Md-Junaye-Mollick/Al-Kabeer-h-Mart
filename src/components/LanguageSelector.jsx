import React, { useState, useRef, useEffect } from 'react';
import { Globe2, Check } from 'lucide-react';
import { useLanguage, availableLanguages } from '../context/LanguageContext';

export function LanguageSelector({ variant = 'header' }) {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Globe-Only Circular Button (40-44px touch target, perfectly centered icon) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('nav.selectLanguage') || 'Select Language'}
        aria-expanded={isOpen}
        title={t('nav.selectLanguage') || 'Change Language'}
        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer select-none focus:outline-hidden focus:ring-2 focus:ring-primary/40 active:scale-95 ${
          isOpen
            ? 'bg-primary-light/80 border-primary text-primary shadow-xs'
            : variant === 'header'
            ? 'bg-surface hover:bg-surface-soft border-border text-text-primary hover:border-primary/50 hover:text-primary shadow-2xs'
            : 'bg-surface hover:bg-surface-soft border-border text-text-primary'
        }`}
      >
        <Globe2 className="w-5 h-5 transition-transform duration-200" />
      </button>

      {/* Polished Dropdown Popover */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-48 bg-surface rounded-2xl shadow-xl border border-border py-2 z-50 animate-fade-in focus:outline-hidden"
          style={{ maxWidth: 'calc(100vw - 24px)' }}
        >
          <div className="px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-text-muted border-b border-border/60 mb-1">
            {t('nav.chooseLanguage')}
          </div>

          <div className="p-1 space-y-0.5">
            {availableLanguages.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs flex items-center justify-between text-left transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-primary-light/80 text-primary font-black border border-primary/20 shadow-2xs'
                      : 'text-text-primary hover:bg-surface-soft font-semibold'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold leading-tight">{lang.native}</span>
                    <span className="text-[10px] text-text-muted mt-0.5">{lang.name}</span>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
