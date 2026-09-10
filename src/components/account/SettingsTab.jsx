import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export function SettingsTab() {
  const { t } = useLanguage();

  return (
    <div className="bg-surface rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-border shadow-subtle space-y-6">
      <div className="pb-4 border-b border-border">
        <h3 className="text-xl font-black text-text-primary">
          {t('account.settings')}
        </h3>
        <p className="text-xs text-text-secondary mt-0.5">
          Notification preferences and store support lines
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-surface-soft rounded-2xl flex items-center justify-between">
          <div>
            <div className="font-bold text-xs sm:text-sm text-text-primary">WhatsApp Order Updates</div>
            <div className="text-[11px] text-text-muted">Receive live dispatch tracking on WhatsApp</div>
          </div>
          <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full">
            Enabled
          </span>
        </div>

        <div className="p-4 bg-surface-soft rounded-2xl flex items-center justify-between">
          <div>
            <div className="font-bold text-xs sm:text-sm text-text-primary">Bhagabatipur Store Helpline</div>
            <div className="text-[11px] text-text-muted">Direct operator line: 03212-2224080 / 9002461519</div>
          </div>
          <a
            href="tel:9002461519"
            className="text-xs font-bold text-primary hover:underline"
          >
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
