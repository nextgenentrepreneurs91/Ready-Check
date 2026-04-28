
import React from "react";

export type StatusChipValue =
  | "verified"
  | "needs_attention"
  | "blocked"
  | "pending"
  | "active"
  | "completed";

export interface StatusChipProps {
  status: StatusChipValue;
  className?: string;
  ariaLabel?: string;
}

const statusConfig: Record<
  StatusChipValue,
  {
    label: string;
    className: string;
    dotClassName: string;
  }
> = {
  verified: {
    label: "Verified",
    className:
      "border border-emerald-200 bg-emerald-50 text-emerald-800",
    dotClassName: "bg-emerald-500",
  },
  needs_attention: {
    label: "Needs attention",
    className:
      "border border-amber-200 bg-amber-50 text-amber-800",
    dotClassName: "bg-amber-500",
  },
  blocked: {
    label: "Blocked",
    className: "border border-rose-200 bg-rose-50 text-rose-800",
    dotClassName: "bg-rose-500",
  },
  pending: {
    label: "Pending",
    className: "border border-sky-200 bg-sky-50 text-sky-800",
    dotClassName: "bg-sky-500",
  },
  active: {
    label: "Active",
    className: "border border-indigo-200 bg-indigo-50 text-indigo-800",
    dotClassName: "bg-indigo-500",
  },
  completed: {
    label: "Completed",
    className: "border border-slate-200 bg-slate-100 text-slate-800",
    dotClassName: "bg-slate-500",
  },
};

function joinClassNames(...values: Array<string | undefined>): string {
  return values.filter(Boolean).join(" ");
}

export function StatusChip({
  status,
  className,
  ariaLabel,
}: StatusChipProps): React.JSX.Element {
  const config = statusConfig[status];

  return (
    <span
      aria-label={ariaLabel ?? `Status: ${config.label}`}
      className={joinClassNames(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap",
        config.className,
        className,
      )}
      role="status"
    >
      <span
        aria-hidden="true"
        className={joinClassNames("h-2 w-2 rounded-full", config.dotClassName)}
      />
      <span>{config.label}</span>
    </span>
  );
}
