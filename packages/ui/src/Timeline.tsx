### packages/ui/src/Timeline.tsx
```tsx
/**
 * ============================================================
 * FILE: packages/ui/src/Timeline.tsx
 * ============================================================
 */

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TimelineEvent {
  timestamp: string;
  title: string;
  description?: string;
  status?: 'pending' | 'active' | 'completed' | 'failed';
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

/**
 * Vertical mission timeline illustrating operational milestones 
 * and reality-check history.
 */
export const Timeline: React.FC<TimelineProps> = ({ events, className }) => {
  return (
    <div className={cn('flex flex-col space-y-0', className)}>
      {events.map((event, idx) => (
        <div key={idx} className="group relative flex gap-6 pb-8 last:pb-0">
          
          {/* Connecting Line */}
          {idx !== events.length - 1 && (
            <div 
              className="absolute left-[7px] top-[24px] h-full w-[2px] bg-slate-100 group-last:hidden" 
              aria-hidden="true" 
            />
          )}

          {/* Activity Dot */}
          <div className="relative mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center">
            <div className={cn(
              'h-3.5 w-3.5 rounded-full border-2 bg-white transition-colors duration-300',
              event.status === 'completed' && 'border-status-verified-icon bg-status-verified-icon',
              event.status === 'active' && 'border-brand animate-pulse',
              event.status === 'failed' && 'border-status-blocked-icon',
              (!event.status || event.status === 'pending') && 'border-slate-300'
            )} />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold tabular-nums text-slate-400 uppercase tracking-wider">
                {event.timestamp}
              </span>
              <h5 className="text-sm font-bold text-slate-900">{event.title}</h5>
            </div>
            {event.description && (
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                {event.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
```
