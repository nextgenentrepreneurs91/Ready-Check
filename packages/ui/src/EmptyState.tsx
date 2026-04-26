### packages/ui/src/EmptyState.tsx
```tsx
/**
 * ============================================================
 * FILE: packages/ui/src/EmptyState.tsx
 * ============================================================
 */

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

/**
 * Clean, calm empty state for dashboard views without active data or telemetry.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex min-h-[300px] flex-col items-center justify-center rounded-rc-lg border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center',
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-400 shadow-rc-soft border border-slate-100">
          {icon}
        </div>
      )}
      
      <h3 className="mb-2 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mx-auto mb-8 max-w-[320px] text-sm font-medium text-slate-500 leading-relaxed">
        {description}
      </p>

      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
};
```
