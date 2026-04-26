### packages/ui/src/SlotLegend.tsx
```tsx
/**
 * ============================================================
 * FILE: packages/ui/src/SlotLegend.tsx
 * ============================================================
 */

import React from 'react';

interface SlotItem {
  label: string;
  dotClass: string;
}

const SLOT_ITEMS: SlotItem[] = [
  { label: 'Role Filled', dotClass: 'bg-slate-900' },
  { label: 'Partially Staffed', dotClass: 'bg-slate-400' },
  { label: 'Gap / Unfilled', dotClass: 'border-2 border-slate-300 bg-transparent' },
  { label: 'Blocked Deployment', dotClass: 'bg-status-blocked-icon' },
  { label: 'Standby / Reserve', dotClass: 'bg-slate-100 border border-slate-300' },
];

/**
 * Legend specializing in staffing and team composition status levels.
 */
export const SlotLegend: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {SLOT_ITEMS.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <div className={`h-3 w-3 shrink-0 rounded-sm shadow-inner ${item.dotClass}`} />
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
```
