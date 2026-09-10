import React from 'react';
import { Inbox } from 'lucide-react';

export function AdminTable({
  columns = [],
  children,
  emptyMessage = 'No records found',
  emptySubtext,
  isEmpty = false,
  totalCount,
  currentCount,
}) {
  return (
    <div className="w-full rounded-2xl bg-surface border border-border overflow-hidden shadow-subtle flex flex-col">
      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse min-w-[680px]">
          <thead>
            <tr className="border-b border-border bg-surface-soft/60">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-text-secondary whitespace-nowrap ${
                    col.align === 'right'
                      ? 'text-right'
                      : col.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  } ${col.className || ''}`}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {children}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-surface-soft flex items-center justify-center text-text-muted mb-3">
            <Inbox className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-text-primary">{emptyMessage}</p>
          {emptySubtext && (
            <p className="text-xs text-text-secondary mt-1 max-w-sm">
              {emptySubtext}
            </p>
          )}
        </div>
      )}

      {/* Footer / Count Info */}
      {typeof totalCount === 'number' && !isEmpty && (
        <div className="px-4 py-3 border-t border-border bg-surface-soft/30 flex items-center justify-between text-xs text-text-secondary">
          <span>
            Showing <strong className="text-text-primary font-bold">{currentCount ?? totalCount}</strong> of{' '}
            <strong className="text-text-primary font-bold">{totalCount}</strong> entries
          </span>
        </div>
      )}
    </div>
  );
}
