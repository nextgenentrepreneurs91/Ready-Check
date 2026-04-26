### packages/ui/src/ReadinessBanner.tsx
```tsx
/**
 * ============================================================
 * FILE: packages/ui/src/ReadinessBanner.tsx
 * ============================================================
 */

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ShieldAlert, 
  Clock,
  LucideIcon 
} from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ReadinessState = 'verified' | 'attention' | 'blocked' | 'pending';

interface ReadinessBannerProps {
  state: ReadinessState;
  title: string;
  message: string;
  actions?: React.ReactNode;
  className?: string;
}

const STATE_CONFIG: Record<ReadinessState, { icon: LucideIcon; styles: string; iconStyles: string }> = {
  verified: {
    icon: ShieldCheck,
    styles: 'bg-status-verified-bg border-status-verified-border text-status-verified-text',
    iconStyles: 'text-status-verified-icon',
  },
  attention: {
    icon: AlertTriangle,
    styles: 'bg-status-warning-bg border-status-warning-border text-status-warning-text',
    iconStyles: 'text-status-warning-icon',
  },
  blocked: {
    icon: ShieldAlert,
    styles: 'bg-status-blocked-bg border-status-blocked-border text-status-blocked-text',
    iconStyles: 'text-status-blocked-icon',
  },
  pending: {
    icon: Clock,
    styles: 'bg-status-pending-bg border-status-pending-border text-status-pending-text',
    iconStyles: 'text-status-pending-icon',
  },
};

/**
 * Global operational banner used to communicate the gated or cleared status 
 * of a deployment or role-assignment.
 */
export const ReadinessBanner: React.FC<ReadinessBannerProps> = ({
  state,
  title,
  message,
  actions,
  className,
}) => {
  const config = STATE_CONFIG[state];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-rc-md border p-4 shadow-sm transition-colors',
        config.styles,
        className
      )}
    >
      <div className={cn('rounded-full p-2 bg-white/50 backdrop-blur-sm', config.iconStyles)}>
        <Icon size={24} />
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-extrabold uppercase tracking-tight mb-0.5">{title}</h4>
        <p className="text-sm font-semibold opacity-90 leading-relaxed">{message}</p>
      </div>

      {actions && (
        <div className="flex shrink-0 gap-2 mt-2 sm:mt-0">
          {actions}
        </div>
      )}
    </div>
  );
};
```
