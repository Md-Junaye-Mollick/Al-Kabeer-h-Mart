import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function StatCard({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon: Icon,
  iconColor = 'text-primary',
  iconBg = 'bg-primary/10',
  badgeText,
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface border border-border p-5 transition-all duration-200 hover:shadow-card hover:border-primary/40 group">
      {/* Decorative subtle background gradient blob on hover */}
      <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all pointer-events-none" />

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
              {value}
            </h3>
          </div>
        </div>

        {Icon && (
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg} ${iconColor} transition-transform duration-200 group-hover:scale-110 shadow-2xs`}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 pt-3 border-t border-border/60">
        {change && (
          <div
            className={`inline-flex items-center gap-1 text-xs font-bold ${
              isPositive
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
            )}
            <span>{change}</span>
          </div>
        )}

        {subtitle && (
          <span className="text-xs text-text-muted truncate ml-auto">
            {subtitle}
          </span>
        )}

        {badgeText && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-soft text-text-secondary border border-border">
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
