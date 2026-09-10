import React from 'react';
import { Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function AddressesTab({ phone }) {
  const { t } = useLanguage();

  return (
    <div className="bg-surface rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-border shadow-subtle space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h3 className="text-xl font-black text-text-primary">
            {t('account.savedAddresses')}
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Your delivery addresses in Bhagabatipur and nearby areas
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-4 rounded-2xl border-2 border-primary bg-primary-light/30 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-text-primary">Home (Default)</span>
                <span className="text-[10px] bg-primary text-white font-bold px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                  10–15 Mins Hub
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                Mollar Chawk, Sarkarpara More, Bhagabatipur Rajar Road, Nawabpur, Chanditala - 712701, Hooghly, West Bengal.
              </p>
              <div className="text-xs font-bold text-text-primary mt-2">
                Contact: {phone || '+91 9002461519'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
