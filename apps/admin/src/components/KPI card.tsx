
import React from "react";

type TrendDirection = "up" | "down" | "neutral";
type StatusTone = "default" | "verified" | "attention" | "blocked" | "pending";

export interface KpiCardProps {
  label: string;
  value: string | number;
  delta?: string;
  trendDirection?: TrendDirection;
  statusTone?: StatusTone;
  helperText?: string;
  ariaLabel?: string;
}

const toneStyles: Record<StatusTone, { border: string; badge: string }> = {
  default: {
    border: "border-slate-200",
    badge: "bg-slate-100 text-slate-700",
  },
  verified: {
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
  },
  attention: {
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
  },
  blocked: {
    border: "border-rose-200",
    badge: "bg-rose-100 text-rose-700",
  },
  pending: {
    border: "border-sky-200",
    badge: "bg-sky-100 text-sky-700",
  },
};

const trendStyles: Record<TrendDirection, string> = {
  up: "text-emerald-700",
  down: "text-rose-700",
  neutral: "text-slate-600",
};

const trendSymbols: Record<TrendDirection, string> = {
  up: "↑",
  down: "↓",
  neutral: "•",
};

function formatToneLabel(statusTone: StatusTone): string {
  switch (statusTone) {
    case "verified":
      return "Verified";
    case "attention":
      return "Needs attention";
    case "blocked":
      return "Blocked";
    case "pending":
      return "Pending";
    default:
      return "Operational";
  }
}

export function KpiCard({
  label,
  value,
  delta,
  trendDirection = "neutral",
  statusTone = "default",
  helperText,
  ariaLabel,
}: KpiCardProps): React.JSX.Element {
  const tone = toneStyles[statusTone];
  const trendClassName = trendStyles[trendDirection];
  const trendSymbol = trendSymbols[trendDirection];

  return (
    <section
      aria-label={ariaLabel ?? label}
      className={[
        "rounded-2xl border bg-white p-5 shadow-sm",
        "transition-shadow duration-200 hover:shadow-md",
        tone.border,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-600">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <span
          className={[
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
            tone.badge,
          ].join(" ")}
        >
          {formatToneLabel(statusTone)}
        </span>
      </div>

      {(delta || helperText) && (
        <div className="mt-4 flex flex-col gap-2">
          {delta ? (
            <p className={`text-sm font-medium ${trendClassName}`}>
              <span aria-hidden="true" className="mr-1">
                {trendSymbol}
              </span>
              <span>{delta}</span>
            </p>
          ) : null}

          {helperText ? (
            <p className="text-sm leading-5 text-slate-500">{helperText}</p>
          ) : null}
        </div>
      )}
    </section>
  );
}
