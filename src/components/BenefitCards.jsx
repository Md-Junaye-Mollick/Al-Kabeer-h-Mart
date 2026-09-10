import React from 'react';
import { ShieldCheck, Tag, Headphones, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function BenefitCards() {
  const { t } = useLanguage();

  const trustCards = [
    {
      id: 1,
      icon: ShieldCheck,
      title: t('trust.bestQuality'),
      desc: t('trust.bestQualitySub'),
      accentBg: 'bg-primary-light',
      accentColor: 'text-primary',
    },
    {
      id: 2,
      icon: Tag,
      title: t('trust.lowestPrice'),
      desc: t('trust.lowestPriceSub'),
      accentBg: 'bg-amber-50',
      accentColor: 'text-amber-600',
    },
    {
      id: 3,
      icon: Headphones,
      title: t('trust.greatService'),
      desc: t('trust.greatServiceSub'),
      accentBg: 'bg-blue-50',
      accentColor: 'text-blue-600',
    },
    {
      id: 4,
      icon: HeartHandshake,
      title: t('trust.ourMission'),
      desc: t('trust.ourMissionSub'),
      accentBg: 'bg-rose-50',
      accentColor: 'text-danger',
    }
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {trustCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-surface p-4 sm:p-5 rounded-2xl border border-border/80 shadow-subtle hover:shadow-card hover:border-primary/40 interactive-lift flex items-center gap-3.5 group transition-all"
            >
              <div
                className={`w-11 h-11 rounded-xl ${card.accentBg} ${card.accentColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="font-black text-text-primary text-sm sm:text-base leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs text-text-secondary mt-0.5 font-medium leading-tight">
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
