import React from 'react';
import { Crown } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export function VipTab({ onOpenVip, userName = 'Tariq Ahmed' }) {
  const { vipMember } = useCart();

  return (
    <div className="bg-surface rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-border shadow-subtle space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h3 className="text-xl font-black text-text-primary">
            999 VIP Membership Status
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Your exclusive privileges, free delivery, and cashback perks
          </p>
        </div>
      </div>

      {/* Digital Card Preview */}
      <div className="relative rounded-2xl bg-gradient-to-tr from-[#D99B00] via-[#FFB800] to-[#FFE28A] text-gray-950 p-6 shadow-xl border border-amber-300 max-w-md select-none overflow-hidden">
        <Crown className="absolute -right-6 -bottom-6 w-36 h-36 text-black/10 pointer-events-none" />

        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <div className="font-black text-base">AL KABEER <span className="text-danger">h</span> MART</div>
            <span className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">
              Privilege Club Card
            </span>
          </div>
          <span className="bg-gray-950 text-secondary text-xs font-black px-2.5 py-0.5 rounded-full">
            999 VIP
          </span>
        </div>

        <div className="text-xl font-black tracking-widest mb-4 font-mono relative z-10">
          {vipMember?.cardNumber || 'AKM-999-8472'}
        </div>

        <div className="flex justify-between items-end text-xs relative z-10">
          <div>
            <div className="text-[9px] uppercase font-bold text-gray-800">Member</div>
            <div className="font-black text-sm">{userName}</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] uppercase font-bold text-gray-800">Valid Thru</div>
            <div className="font-black">12/2027</div>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onOpenVip}
          className="bg-primary hover:bg-primary-dark text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
        >
          View Membership Details
        </button>
      </div>
    </div>
  );
}
