import React from 'react';

const statusConfig = {
  // Order statuses
  'Delivered': {
    bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-500',
  },
  'Out for Delivery': {
    bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    dot: 'bg-blue-500 animate-pulse',
  },
  'Processing': {
    bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    dot: 'bg-amber-500',
  },
  'Pending': {
    bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    dot: 'bg-purple-500',
  },
  'Cancelled': {
    bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    dot: 'bg-rose-500',
  },

  // Stock statuses
  'In Stock': {
    bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-500',
  },
  'Low Stock': {
    bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    dot: 'bg-amber-500 animate-ping',
  },
  'Out of Stock': {
    bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    dot: 'bg-rose-500',
  },

  // General / Promo statuses
  'Active': {
    bg: 'bg-primary/10 text-primary border-primary/25',
    dot: 'bg-primary',
  },
  'Expired': {
    bg: 'bg-gray-500/10 text-gray-500 dark:text-gray-400 border-gray-500/20',
    dot: 'bg-gray-400',
  },
  'VIP': {
    bg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    dot: 'bg-amber-500',
  },
  'Regular': {
    bg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    dot: 'bg-slate-400',
  },
};

export function StatusBadge({ status, label, size = 'md' }) {
  const config = statusConfig[status] || {
    bg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    dot: 'bg-slate-400',
  };

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-[11px]' 
    : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold border transition-colors ${config.bg} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      <span className="truncate">{label || status}</span>
    </span>
  );
}
