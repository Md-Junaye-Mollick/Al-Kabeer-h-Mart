import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage, availableLanguages } from '../../context/LanguageContext';

export function LanguageTab() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="bg-surface rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-border shadow-subtle space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h3 className="text-xl font-black text-text-primary">
            {t('account.language')}
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Select your preferred interface language
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {availableLanguages.map((lang) => {
          const isSelected = lang.code === language;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                isSelected
                  ? 'border-primary bg-primary-light/40 shadow-xs'
                  : 'border-border hover:border-primary/40 bg-surface'
              }`}
            >
              <div>
                <div className="font-black text-sm text-text-primary">{lang.native}</div>
                <div className="text-xs text-text-secondary mt-0.5">{lang.name}</div>
              </div>
              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
