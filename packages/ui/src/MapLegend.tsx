### packages/ui/src/MapLegend.tsx
```tsx
/**
 * ============================================================
 * FILE: packages/ui/src/MapLegend.tsx
 * ============================================================
 */

import React from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  Users 
} from 'lucide-react';

interface MapLegendItem {
  label: string;
  icon: React.ReactNode;
  color: string;
}

const MAP_LEGEND_ITEMS: MapLegendItem[] = [
  { label: 'Primary Route', icon: <Navigation size={12} />, color: 'text-brand' },
  { label: 'Mandatory Checkpoint', icon: <MapPin size={12} />, color: 'text-slate-900' },
  { label: 'Identified Hazard', icon: <AlertTriangle size={12} />, color: 'text-status-blocked-icon' },
  { label: 'Safe / Staging Zone', icon: <ShieldCheck size={12} />, color: 'text-status-verified-icon' },
  { label: 'Active Team (Live)', icon: <Users size={12} />, color: 'text-indigo-400' },
];

/**
 * Visual key for spatial/map-based telemetry views.
 */
export const MapLegend: React.FC = () => {
  return (
    <div className="flex flex-col gap-2.5 p-3 rounded-lg border border-slate-100 bg-white/80 backdrop-blur-sm shadow-rc-soft">
      <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1 px-1">
        Map Key
      </p>
      
      {MAP_LEGEND_ITEMS.map((item, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded bg-slate-50 ${item.color}`}>
            {item.icon}
          </div>
          <span className="text-[11px] font-bold text-slate-700">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
```
