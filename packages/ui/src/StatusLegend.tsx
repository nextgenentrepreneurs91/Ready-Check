### packages/ui/src/StatusLegend.tsx
```tsx
/**
 * ============================================================
 * FILE: packages/ui/src/StatusLegend.tsx
 * ============================================================
 */

import React from 'react';

interface LegendItem {
  label: string;
  colorClass: string;
}

const DEFAULT_ITEMS: LegendItem[] = [
  { label: 'Verified Cleared', colorClass: 'bg-status-verified-icon' },
  { label: 'Blocked / Hazard', colorClass: 'bg-status-blocked-icon' },
  { label: 'Needs Attention', colorClass: 'bg-status-warning-icon' },
  { label: 'In Progress', colorClass: 'bg-status-active-icon' },
  { label: 'Pending', colorClass: 'bg-status-pending-icon' },
];

/**
 * Compact footer helper to decoding operational status colors used 
 * in complex readiness grids.
 */
export const StatusLegend: React.FC<{ items?: LegendItem[] }> = ({ 
  items = DEFAULT_ITEMS 
}) => {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <div className={`h-2.5 w-2.5 shrink-0 rounded-full shadow-sm ${item.colorClass}`} />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
```
