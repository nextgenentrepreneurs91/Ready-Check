### packages/ui/src/ProgressRing.tsx
```tsx
/**
 * ============================================================
 * FILE: packages/ui/src/ProgressRing.tsx
 * ============================================================
 */

import React from 'react';

interface ProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  colorClass?: string;
  showLabel?: boolean;
}

/**
 * Accessible SVG Progress Ring used for readiness percentages.
 * Avoids heavy charting libraries for performance in low-power mobile or complex web grids.
 */
export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  size = 60,
  strokeWidth = 6,
  colorClass = 'text-brand',
  showLabel = true,
  className,
  ...props
}) => {
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (normalizedValue / 100) * circumference;

  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      role="progressbar"
      aria-valuenow={normalizedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90 transform"
      >
        {/* Background Track */}
        <circle
          className="text-slate-100"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Active Progress */}
        <circle
          className={`${colorClass} transition-all duration-700 ease-out`}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      
      {showLabel && (
        <span className="absolute text-[11px] font-extrabold text-slate-900 tracking-tighter">
          {Math.round(normalizedValue)}%
        </span>
      )}
    </div>
  );
};
```
