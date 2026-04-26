### packages/ui/src/RoleBadge.tsx
```tsx
/**
 * ============================================================
 * FILE: packages/ui/src/RoleBadge.tsx
 * ============================================================
 */

import React from 'react';
import { UserRole } from '@readycheck/core-types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface RoleBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  role: UserRole;
  showIcon?: boolean;
}

const ROLE_STYLES: Record<UserRole, string> = {
  volunteer: 'bg-slate-100 text-slate-700 border-slate-200',
  driver: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  medic: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  coordinator: 'bg-brand-light/10 text-brand border-brand/20',
  executive: 'bg-purple-100 text-purple-700 border-purple-200',
  government_viewer: 'bg-amber-100 text-amber-700 border-amber-200',
  admin: 'bg-slate-900 text-white border-slate-900',
};

/**
 * Compact, role-aware badge for display in tables, headers, and personnel roster lists.
 */
export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, className, ...props }) => {
  // Normalize label
  const label = role.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm',
        ROLE_STYLES[role] || ROLE_STYLES.volunteer,
        className
      )}
      {...props}
    >
      {label}
    </span>
  );
};
```
