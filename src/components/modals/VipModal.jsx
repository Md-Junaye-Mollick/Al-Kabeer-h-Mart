import React, { useState, useEffect } from 'react';
import {
  X,
  Crown,
  CheckCircle2,
  Sparkles,
  Zap,
  Percent,
  MessageCircle,
  ShieldCheck,
  Check,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

export function VipModal({ isOpen, onClose }) {
  const { isVip, setIsVip, vipMember, setVipMember } = useCart();
  const { t } = useLanguage();
  const [name, setName] = useState(vipMember?.name || '');
  const [phone, setPhone] = useState('9002461519');
  const [address, setAddress] = useState('Bhagabatipur, Hooghly');
  const [isActivated, setIsActivated] = useState(isVip);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleActivate = (e) => {
    e.preventDefault();
    const newMember = {
      name: name.trim() || 'Valued Member',
      cardNumber: 'AKM-999-' + Math.floor(1000 + Math.random() * 9000),
      validTill: '12/2027',
    };
    setVipMember(newMember);
    setIsVip(true);
    setIsActivated(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-hidden animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Modal Container: Max-height based on viewport, internal scroll, matching luxury emerald border */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-[#052610] text-white rounded-3xl shadow-2xl border border-emerald-500/40 ring-1 ring-emerald-500/20 overflow-hidden"
      >
        
        {/* Sticky Header with Accessible Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-5 bg-[#052610]/95 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/logo.png"
              alt="AL KABEER H MART"
              className="w-9 h-9 object-contain rounded-xl bg-white/10 p-0.5 shrink-0"
            />
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-secondary block">
                AL KABEER H MART
              </span>
              <h3 className="text-sm sm:text-base font-black text-white leading-tight">
                999 VIP Privilege Club
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close VIP modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 no-scrollbar">
          
          {/* Header Title Area */}
          <div className="text-center">
            <h4 className="text-xl sm:text-2xl font-black text-white">
              {isActivated ? 'VIP Card Activated!' : t('vip.modalTitle')}
            </h4>
            <p className="text-xs text-emerald-200 mt-1 max-w-sm mx-auto">
              {t('vip.modalSubtitle')}
            </p>
          </div>

          {/* Premium Metallic VIP Card Visual Preview */}
          <div className="relative rounded-2xl bg-gradient-to-tr from-[#D99B00] via-[#FFB800] to-[#FFE28A] text-gray-950 p-5 shadow-xl border border-amber-300 overflow-hidden select-none">
            {/* Background Watermark */}
            <Crown className="absolute -right-6 -bottom-6 w-36 h-36 text-black/10 pointer-events-none" />

            <div className="flex justify-between items-start mb-3 relative z-10">
              <div>
                <div className="font-black text-sm tracking-tight flex items-baseline">
                  <span>AL KABEER</span>
                  <span className="text-danger mx-0.5">h</span>
                  <span>MART</span>
                </div>
                <span className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">
                  VIP Club Card
                </span>
              </div>
              <span className="bg-gray-950 text-secondary text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                999 VIP
              </span>
            </div>

            <div className="text-lg sm:text-xl font-black tracking-widest mb-3 font-mono relative z-10 text-gray-950">
              {vipMember?.cardNumber || 'AKM-999-8472'}
            </div>

            <div className="flex justify-between items-end text-xs relative z-10">
              <div>
                <div className="text-[9px] uppercase font-bold text-gray-800">
                  {t('vip.cardHolder')}
                </div>
                <div className="font-black text-sm text-gray-950 truncate max-w-[180px]">
                  {name || vipMember?.name || 'Valued Member'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] uppercase font-bold text-gray-800">
                  {t('vip.validThru')}
                </div>
                <div className="font-black">12/2027</div>
              </div>
            </div>
          </div>

          {/* 4 Clear Benefit Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-black/30 border border-white/10 p-3 rounded-xl flex items-start gap-2.5">
              <Zap className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-black text-white">₹0 Delivery Fee</div>
                <div className="text-[10px] text-emerald-200">Unlimited orders all year</div>
              </div>
            </div>

            <div className="bg-black/30 border border-white/10 p-3 rounded-xl flex items-start gap-2.5">
              <Percent className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-black text-white">Extra 5% Off</div>
                <div className="text-[10px] text-emerald-200">On groceries & staples</div>
              </div>
            </div>

            <div className="bg-black/30 border border-white/10 p-3 rounded-xl flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-black text-white">Priority Dispatch</div>
                <div className="text-[10px] text-emerald-200">Skip the Bhagabatipur queue</div>
              </div>
            </div>

            <div className="bg-black/30 border border-white/10 p-3 rounded-xl flex items-start gap-2.5">
              <MessageCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-black text-white">WhatsApp Concierge</div>
                <div className="text-[10px] text-emerald-200">Direct priority support</div>
              </div>
            </div>
          </div>

          {/* Enrollment Form or Active Status */}
          {!isActivated ? (
            <form onSubmit={handleActivate} className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-secondary mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariq Ahmed"
                  className="w-full bg-black/40 border border-emerald-500/40 focus:border-secondary rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white placeholder:text-gray-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary mb-1">
                  Mobile (WhatsApp Number)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-300">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit number"
                    className="w-full bg-black/40 border border-emerald-500/40 focus:border-secondary rounded-xl py-2.5 pl-11 pr-3 text-xs sm:text-sm text-white placeholder:text-gray-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary mb-1">
                  Delivery Locality
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-black/40 border border-emerald-500/40 focus:border-secondary rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white outline-none"
                />
              </div>

              <div className="bg-black/30 rounded-xl p-3 border border-white/10 flex justify-between items-center text-xs">
                <span className="text-gray-300">Annual Membership Fee</span>
                <span className="text-base font-black text-secondary">₹999 / year</span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-secondary via-secondary to-secondary-dark hover:brightness-105 text-gray-950 font-black py-3 rounded-xl shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('vip.activateCta')}</span>
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4 pt-2">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-2.5 rounded-xl text-xs font-bold border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t('vip.activeStatus')}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-full bg-white/20 hover:bg-white/30 text-white font-black py-3 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          )}

        </div>

        {/* Footer info note */}
        <div className="p-3 bg-black/40 border-t border-white/10 text-center text-[10px] text-emerald-300">
          Valid for all Bhagabatipur, Sarkarpara More, and Chanditala addresses.
        </div>

      </div>
    </div>
  );
}
