import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useLanguage } from '../context/LanguageContext';

export function ProductSection({
  id,
  title,
  subtitle,
  icon: Icon,
  products = [],
  isWarmSection = false,
  onViewAll,
}) {
  const { t } = useLanguage();
  const sliderRef = useRef(null);

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (products.length === 0) return null;

  return (
    <section
      id={id}
      className={`py-8 transition-colors overflow-hidden ${
        isWarmSection
          ? 'bg-[#FFFBEB] border-y border-amber-200/60 my-6'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            {Icon && (
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                  isWarmSection
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-primary-light text-primary'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-text-primary tracking-tight flex items-center gap-2 truncate">
                <span>{title}</span>
              </h2>
              {subtitle && (
                <p className="text-xs text-text-secondary font-medium mt-0.5 truncate sm:whitespace-normal">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Controls: Scroll Buttons & View All */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop scroll arrows */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                className="w-8 h-8 rounded-xl bg-surface border border-border/80 hover:border-primary text-text-secondary hover:text-primary flex items-center justify-center shadow-xs transition-all cursor-pointer"
                aria-label={`Scroll ${title} left`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                className="w-8 h-8 rounded-xl bg-surface border border-border/80 hover:border-primary text-text-secondary hover:text-primary flex items-center justify-center shadow-xs transition-all cursor-pointer"
                aria-label={`Scroll ${title} right`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* View All Button — Guaranteed No Line Break */}
            {onViewAll && (
              <button
                type="button"
                onClick={onViewAll}
                className="text-xs font-bold text-primary hover:text-primary-dark inline-flex items-center gap-1 hover:underline cursor-pointer ml-1 shrink-0 whitespace-nowrap"
              >
                <span className="whitespace-nowrap">{t('sections.viewAll')}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            )}
          </div>
        </div>

        {/* Product Carousel / Horizontal Scrolling Row on Mobile & Grid on Desktop */}
        <div
          ref={sliderRef}
          className="flex lg:grid lg:grid-cols-6 gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[170px] sm:w-[200px] lg:w-auto shrink-0 flex-grow-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
