### packages/ui/src/AiAssistantDock.tsx
```tsx
/**
 * ============================================================
 * FILE: packages/ui/src/AiAssistantDock.tsx
 * ============================================================
 */

import React from 'react';
import { Sparkles, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { Button } from './Button';

interface AiSuggestion {
  id: string;
  label: string;
  action?: () => void;
}

interface AiAssistantDockProps {
  title?: string;
  summary: string;
  suggestions?: AiSuggestion[];
  onDismiss?: () => void;
  isLoading?: boolean;
}

/**
 * Bounded AI Reality Configurator interface.
 * Provides grounded, non-hallucinatory guidance based on current regional context.
 */
export const AiAssistantDock: React.FC<AiAssistantDockProps> = ({
  title = "AI Reality Guard",
  summary,
  suggestions = [],
  isLoading = false
}) => {
  return (
    <div className="flex flex-col gap-5 rounded-rc-lg border-2 border-indigo-100 bg-white p-6 shadow-rc-soft ring-4 ring-indigo-50/50">
      
      {/* Header Info */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-indigo-600 p-2 text-white">
            <Sparkles size={18} className={isLoading ? "animate-pulse" : ""} />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">{title}</h3>
            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
              Grounded Guidance
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase">
          <ShieldCheck size={12} /> Live Integrity
        </div>
      </div>

      {/* Main Insight Body */}
      <div className="rounded-lg bg-indigo-50/50 p-4 border border-indigo-100/50">
        <p className="text-sm font-semibold text-slate-700 leading-relaxed italic">
          "{summary}"
        </p>
      </div>

      {/* Actionable Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
            Recommended Adjustments
          </p>
          {suggestions.map((s) => (
            <button
              key={s.id}
              onClick={s.action}
              className="flex w-full items-center justify-between rounded-rc-md border border-slate-200 bg-white px-4 py-3 text-left transition-all hover:border-brand hover:bg-indigo-50 group"
            >
              <div className="flex items-center gap-3">
                <MessageSquare size={14} className="text-slate-400 group-hover:text-brand" />
                <span className="text-sm font-bold text-slate-700 group-hover:text-brand-dark">
                  {s.label}
                </span>
              </div>
              <ArrowRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      )}

      {/* Decision Footer */}
      <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-4">
        <p className="text-[11px] font-medium text-slate-500 max-w-[200px]">
          ReadyCheck AI is a decision guide. Strategic control remains with the human coordinator.
        </p>
        <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-brand-dark">
          History
        </Button>
      </div>

    </div>
  );
};
```
