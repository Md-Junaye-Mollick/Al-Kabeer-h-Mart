import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Crown,
  Sparkles,
  Clock,
  ArrowRight,
  Zap,
  Tag,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { heroSlides } from '../data/heroSlides';
import { useLanguage } from '../context/LanguageContext';

export function HeroSlider({ onOpenVip, onScrollToSection }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const navigate = useNavigate();
  const { t } = useLanguage();

  // 4.5-second auto-play timer with auto-reset on slide change
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev();
    }
  };

  const handleAction = (action) => {
    if (action === 'open_vip') {
      onOpenVip();
    } else if (action === 'scroll_products') {
      if (onScrollToSection) onScrollToSection('quick-delivery');
    } else if (action === 'scroll_under99') {
      if (onScrollToSection) onScrollToSection('under-99');
    } else if (action === 'route_dairy') {
      navigate('/category/dairy-eggs');
    } else if (action === 'route_snacks') {
      navigate('/category/snacks');
    }
  };

  return (
    <section
      className="relative w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Promotional Carousel"
    >
      {/* Outer Shell with Rounded Corners & Deep Shadow */}
      <div className="relative overflow-hidden rounded-3xl shadow-xl border border-white/10 select-none">
        
        {/* Continuous Horizontal Sliding Track */}
        <div
          className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] will-change-transform"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {heroSlides.map((slide, idx) => {
            const slideKey = slide.slideKey;
            const campaign = t(`hero.slides.${slideKey}.campaign`);
            const badge = t(`hero.slides.${slideKey}.badge`);
            const badgeSub = t(`hero.slides.${slideKey}.badgeSub`);
            const heading = t(`hero.slides.${slideKey}.heading`);
            const description = t(`hero.slides.${slideKey}.description`);
            const ctaPrimary = t(`hero.slides.${slideKey}.ctaPrimary`);
            const ctaSecondary = t(`hero.slides.${slideKey}.ctaSecondary`);

            return (
              <div
                key={slide.id}
                className={`w-full shrink-0 flex-none relative overflow-hidden bg-gradient-to-r ${slide.bgGradient} text-white min-h-[380px] sm:min-h-[420px] md:min-h-[450px] flex items-center`}
              >
                {/* Ambient Decorative Glows */}
                <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-white/10 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
                <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-black/25 rounded-full blur-2xl pointer-events-none" />
                
                {/* Modern Geometric Mesh Accent */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />

                {/* Content Container */}
                <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
                  
                  {/* Left Hero Text Column */}
                  <div className="lg:col-span-7 flex flex-col items-start justify-center">
                    
                    {/* Top Dispatch Badge */}
                    <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 bg-black/30 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-full border border-white/20 mb-3 sm:mb-4 shadow-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
                      </span>
                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-secondary">
                        {badge}
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="text-[10px] sm:text-xs font-bold text-white/90">
                        {badgeSub}
                      </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-[1.15] tracking-tight mb-3 drop-shadow-sm">
                      {heading}
                    </h1>

                    {/* Subtitle / Description */}
                    <p className="text-xs sm:text-sm md:text-base text-white/90 font-medium leading-relaxed max-w-xl mb-5 sm:mb-6">
                      {description}
                    </p>

                    {/* Feature Tag Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
                      {slide.featureTags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="bg-white/15 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold px-3 py-1 rounded-xl border border-white/15 shadow-2xs flex items-center gap-1.5"
                        >
                          <Check className="w-3 h-3 text-secondary stroke-[3]" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>

                    {/* Call to Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleAction(slide.primaryAction)}
                        className="w-full sm:w-auto bg-secondary hover:bg-secondary-dark text-gray-950 font-black px-6 sm:px-8 py-3.5 rounded-2xl text-xs sm:text-sm shadow-md shadow-secondary/20 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-secondary/40"
                      >
                        <span>{ctaPrimary}</span>
                        <ArrowRight className="w-4 h-4 text-gray-950" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAction(slide.secondaryAction)}
                        className="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm border border-white/25 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Crown className="w-4 h-4 text-secondary" />
                        <span>{ctaSecondary}</span>
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Layered Visual Floating Products */}
                  <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center">
                    
                    {/* Main Floating Card 1 */}
                    <div className="relative z-20 bg-white text-gray-900 rounded-3xl p-4 shadow-2xl w-64 transform -rotate-3 hover:rotate-0 transition-all duration-300 border border-white/40 group/card">
                      <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 mb-3 flex items-center justify-center p-2 border border-gray-100">
                        <img
                          src={slide.floatingCard1.image}
                          alt={slide.floatingCard1.name}
                          className="w-full h-full object-contain group-hover/card:scale-105 transition-transform duration-300 drop-shadow-xs"
                          loading="lazy"
                        />
                        <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                          {slide.floatingCard1.badge}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm truncate">
                        {slide.floatingCard1.name}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[11px] text-gray-500 font-semibold">
                          {slide.floatingCard1.weight}
                        </span>
                        <span className="font-black text-primary text-sm">
                          {slide.floatingCard1.price}
                        </span>
                      </div>
                    </div>

                    {/* Secondary Floating Card 2 */}
                    <div className="absolute z-10 -right-2 -bottom-4 bg-white/95 backdrop-blur-md text-gray-900 rounded-2xl p-3.5 shadow-xl w-52 transform rotate-6 hover:rotate-0 transition-all duration-300 border border-white/40 group/card2">
                      <div className="w-full h-24 rounded-xl overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 mb-2 flex items-center justify-center p-1.5 border border-gray-100">
                        <img
                          src={slide.floatingCard2.image}
                          alt={slide.floatingCard2.name}
                          className="w-full h-full object-contain group-hover/card2:scale-105 transition-transform duration-300 drop-shadow-xs"
                          loading="lazy"
                        />
                      </div>
                      <h5 className="font-bold text-xs truncate">
                        {slide.floatingCard2.name}
                      </h5>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-[10px] text-gray-500 font-semibold">
                          {slide.floatingCard2.weight}
                        </span>
                        <span className="font-black text-primary text-xs">
                          {slide.floatingCard2.price}
                        </span>
                      </div>
                    </div>

                    {/* Hub Fast Dispatch Stamp */}
                    <div className="absolute top-2 right-4 z-30 bg-black/65 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20 shadow-xs">
                      <Clock className="w-3 h-3 text-secondary" />
                      <span>{slide.hubBadge || '10-15 Min Hub'}</span>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Arrow Controls (Overlay) */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 active:scale-95 z-30 cursor-pointer shadow-lg group"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 active:scale-95 z-30 cursor-pointer shadow-lg group"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Slide Indicator Dots / Pills */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30 bg-black/25 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'w-7 bg-secondary shadow-xs'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
