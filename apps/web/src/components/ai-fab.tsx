// apps/web/src/components/ai-fab.tsx
```tsx
"use client";

import React, { useState } from "react";
import { Sparkles, X } from "lucide-react";

export interface AIFabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Controlled state boolean to override internal expanded logic
   */
  isExpanded?: boolean;
  /**
   * Callback fired when the AI FAB is toggled. 
   * Used to trigger external drawer or chat overlay UI.
   */
  onToggle?: (newState: boolean) => void;
  /**
   * Text label to show next to the icon.
   */
  label?: string;
}

/**
 * Operational AI Floating Action Button (FAB).
 * Keeps the interface calm and utilitarian while providing an 
 * explicit escape hatch to AI guidance and operational insights.
 */
export function AIFab({
  isExpanded: controlledIsExpanded,
  onToggle,
  label = "AI Assist",
  className = "",
  ...props
}: AIFabProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);

  // Derive state to allow this component to be fully controlled or uncontrolled
  const isExpanded = controlledIsExpanded !== undefined ? controlledIsExpanded : internalExpanded;

  const handleToggle = () => {
    const newState = !isExpanded;
    if (controlledIsExpanded === undefined) {
      setInternalExpanded(newState);
    }
    onToggle?.(newState);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-expanded={isExpanded}
      aria-label={isExpanded ? "Close AI Assistant" : "Open AI Assistant"}
      className={`
        fixed bottom-6 right-6 z-50 flex items-center justify-center
        overflow-hidden rounded-full shadow-lg transition-all duration-300 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
        ${
          isExpanded 
            ? "bg-slate-900 text-white hover:bg-slate-800" 
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }
        ${className}
      `}
      {...props}
    >
      <div 
        className={`
          flex items-center justify-center gap-2 whitespace-nowrap px-4 py-3
          transition-transform duration-300 ease-in-out
        `}
      >
        {isExpanded ? (
          <X 
            size={20} 
            strokeWidth={2.5} 
            className="shrink-0 animate-in fade-in zoom-in spin-in-12 duration-200" 
            aria-hidden="true" 
          />
        ) : (
          <Sparkles 
            size={20} 
            className="shrink-0" 
            aria-hidden="true" 
          />
        )}
        
        <span 
          className={`
            text-sm font-semibold tracking-wide transition-all duration-300
            ${isExpanded ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100 pl-1"}
          `}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
```
