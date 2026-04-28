
// apps/admin/src/pages/NgoTrustMonitor.tsx
import React from "react";

import { KpiCard } from "../components/KpiCard";
import { StatusChip, type StatusChipValue } from "../components/StatusChip";

type PartnershipStatus = Extract<
  StatusChipValue,
  "verified" | "needs_attention" | "blocked" | "active"
>;

interface NgoTrustSnapshot {
  id: string;
  organization: string;
  region: string;
  trustScore: number;
  trendDelta: number;
  partnershipHealth: PartnershipStatus;
  recentFlag: string;
}

interface RegionalPerformanceRow {
  region: string;
  averageTrust: number;
  readinessAlignment: number;
  flaggedPartners: number;
}

interface FeedbackFlag {
  id: string;
  organization: string;
  category: string;
  severity: "high" | "medium" | "low";
  note: string;
  status: PartnershipStatus;
}

const ngoSnapshots: NgoTrustSnapshot[] = [
  {
    id: "ngo-001",
    organization: "Sahara Relief Network",
    region: "North River Belt",
    trustScore: 91,
    trendDelta: 6,
    partnershipHealth: "verified",
    recentFlag: "Strong cross-team coordination after flood corridor dispatch.",
  },
  {
    id: "ngo-002",
    organization: "Eastern Care Collective",
    region: "East Ridge",
    trustScore: 78,
    trendDelta: -4,
    partnershipHealth: "needs_attention",
    recentFlag: "Medic roster handoff quality dipped during the last mobile triage rotation.",
  },
  {
    id: "ngo-003",
    organization: "Harbor Aid Coalition",
    region: "Harbor Zone",
    trustScore: 62,
    trendDelta: -9,
    partnershipHealth: "blocked",
    recentFlag: "Reporting lag and route-brief mismatch require temporary trust hold.",
  },
  {
    id: "ngo-004",
    organization: "South Basin Community Response",
    region: "South Basin",
    trustScore: 85,
    trendDelta: 3,
    partnershipHealth: "active",
    recentFlag: "Stable partner health with strong local onboarding support.",
  },
];

const regionalPerformance: RegionalPerformanceRow[] = [
  {
    region: "North River Belt",
    averageTrust: 88,
    readinessAlignment: 90,
    flaggedPartners: 1,
  },
  {
    region: "East Ridge",
    averageTrust: 76,
    readinessAlignment: 73,
    flaggedPartners: 2,
  },
  {
    region: "Harbor Zone",
    averageTrust: 64,
    readinessAlignment: 61,
    flaggedPartners: 3,
  },
  {
    region: "South Basin",
    averageTrust: 84,
    readinessAlignment: 87,
    flaggedPartners: 1,
  },
];

const feedbackFlags: FeedbackFlag[] = [
  {
    id: "flag-001",
    organization: "Eastern Care Collective",
    category: "Clinical handoff consistency",
    severity: "high",
    note: "Two recent feedback entries reported incomplete task-context transfer during medic rotation.",
    status: "needs_attention",
  },
  {
    id: "flag-002",
    organization: "Harbor Aid Coalition",
    category: "Operational reporting delay",
    severity: "high",
    note: "Critical logistics updates were submitted after the coordinator decision window.",
    status: "blocked",
  },
  {
    id: "flag-003",
    organization: "Sahara Relief Network",
    category: "Positive route adaptation signal",
    severity: "low",
    note: "Partner team adapted safely after revised water-level guidance without readiness drift.",
    status: "verified",
  },
  {
    id: "flag-004",
    organization: "South Basin Community Response",
    category: "Volunteer onboarding consistency",
    severity: "medium",
    note: "Minor briefing variance detected, but corrected in the same operational cycle.",
    status: "active",
  },
];

function formatSignedDelta(delta: number): string {
  return `${delta > 0 ? "+" : ""}${delta}%`;
}

function getTrendDirection(delta: number): "up" | "down" | "neutral" {
  if (delta > 0) {
    return "up";
  }

  if (delta < 0) {
    return "down";
  }

  return "neutral";
}

function getKpiTone(
  score: number,
): "verified" | "attention" | "blocked" | "pending" | "default" {
  if (score >= 85) {
    return "verified";
  }

  if (score >= 70) {
    return "pending";
  }

  if (score >= 60) {
    return "attention";
  }

  return "blocked";
}

function getBarColor(score: number): string {
  if (score >= 85) {
    return "bg-emerald-500";
  }

  if (score >= 70) {
    return "bg-sky-500";
  }

  if (score >= 60) {
    return "bg-amber-500";
  }

  return "bg-rose-500";
}

function getSeverityClassName(severity: FeedbackFlag["severity"]): string {
  switch (severity) {
    case "high":
      return "border-rose-200 bg-rose-100 text-rose-800";
    case "medium":
      return "border-amber-200 bg-amber-100 text-amber-800";
    case "low":
      return "border-slate-200 bg-slate-100 text-slate-700";
    default:
      return "border-slate-200 bg-slate-100 text-slate-700";
  }
}

function formatSeverityLabel(severity: FeedbackFlag["severity"]): string {
  switch (severity) {
    case "high":
      return "High";
    case "medium":
      return "Medium";
    case "low":
      return "Low";
    default:
      return severity;
  }
}

function TrustTrendCard({
  snapshot,
}: {
  snapshot: NgoTrustSnapshot;
}): React.JSX.Element {
  const trendDirection = getTrendDirection(snapshot.trendDelta);

  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            {snapshot.organization}
          </h3>
          <p className="mt-1 text-sm text-slate-500">{snapshot.region}</p>
        </div>
        <StatusChip status={snapshot.partnershipHealth} />
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Trust score
          </p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
            {snapshot.trustScore}
          </p>
        </div>

        <div className="min-w-[120px]">
          <p
            className={[
              "text-sm font-medium",
              trendDirection === "up"
                ? "text-emerald-700"
                : trendDirection === "down"
                  ? "text-rose-700"
                  : "text-slate-600",
            ].join(" ")}
          >
            {trendDirection === "up"
              ? "↑"
              : trendDirection === "down"
                ? "↓"
                : "•"}{" "}
            {formatSignedDelta(snapshot.trendDelta)}
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              aria-hidden="true"
              className={["h-full rounded-full", getBarColor(snapshot.trustScore)].join(
                " ",
              )}
              style={{ width: `${snapshot.trustScore}%` }}
            />
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{snapshot.recentFlag}</p>
    </article>
  );
}

export function NgoTrustMonitor(): React.JSX.Element {
  const averageTrustScore = Math.round(
    ngoSnapshots.reduce((sum, item) => sum + item.trustScore, 0) /
      ngoSnapshots.length,
  );

  const needsAttentionCount = ngoSnapshots.filter(
    (item) => item.partnershipHealth === "needs_attention",
  ).length;

  const blockedCount = ngoSnapshots.filter(
    (item) => item.partnershipHealth === "blocked",
  ).length;

  const positiveTrendCount = ngoSnapshots.filter((item) => item.trendDelta > 0).length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
              ReadyCheck Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              NGO Trust Monitor
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              Monitor partner trust posture across regions, track recent feedback
              signals, and surface coordination health before assigning shared
              operational responsibility.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Partnership posture
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {blockedCount} blocked partner{blockedCount === 1 ? "" : "s"},{" "}
              {needsAttentionCount} under review
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Trust signals updated for the current dispatch cycle
            </p>
          </div>
        </header>

        <section
          aria-label="Trust overview metrics"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <KpiCard
            label="Average trust score"
            value={averageTrustScore}
            delta="+2% from previous review window"
            trendDirection="up"
            statusTone={getKpiTone(averageTrustScore)}
            helperText="Combined NGO trust posture across monitored regional partners."
          />
          <KpiCard
            label="Partners needing review"
            value={needsAttentionCount}
            delta="1 elevated from field feedback"
            trendDirection="up"
            statusTone="attention"
            helperText="Partnerships with coordination or quality drift requiring follow-up."
          />
          <KpiCard
            label="Blocked partnerships"
            value={blockedCount}
            delta="No change in current cycle"
            trendDirection="neutral"
            statusTone="blocked"
            helperText="Partners temporarily restricted from new shared deployment assignments."
          />
          <KpiCard
            label="Positive trend signals"
            value={positiveTrendCount}
            delta="+1 since last operations review"
            trendDirection="up"
            statusTone="verified"
            helperText="Partners showing measurable trust improvement in recent activity."
          />
        </section>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <section
            aria-labelledby="trust-trends-heading"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id="trust-trends-heading"
                  className="text-xl font-semibold text-slate-950"
                >
                  Trust score trends
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Regional partner trust summaries shaped by readiness alignment,
                  coordination quality, and recent feedback.
                </p>
              </div>
              <p className="text-sm font-medium text-slate-500">
                {ngoSnapshots.length} NGO profiles tracked
              </p>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {ngoSnapshots.map((snapshot) => (
                <TrustTrendCard key={snapshot.id} snapshot={snapshot} />
              ))}
            </div>
          </section>

          <div className="space-y-8">
            <section
              aria-labelledby="regional-performance-heading"
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="border-b border-slate-100 pb-4">
                <h2
                  id="regional-performance-heading"
                  className="text-xl font-semibold text-slate-950"
                >
                  Regional performance
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Compare trust, readiness alignment, and flagged partner pressure by
                  region.
                </p>
              </div>

              <div className="mt-5 space-y-4">
                {regionalPerformance.map((row) => (
                  <article
                    key={row.region}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {row.region}
                      </h3>
                      <span className="text-sm font-medium text-slate-500">
                        {row.flaggedPartners} flagged
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Average trust</span>
                          <span className="font-medium text-slate-900">
                            {row.averageTrust}%
                          </span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                          <div
                            aria-hidden="true"
                            className={["h-full rounded-full", getBarColor(row.averageTrust)].join(
                              " ",
                            )}
                            style={{ width: `${row.averageTrust}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Readiness alignment</span>
                          <span className="font-medium text-slate-900">
                            {row.readinessAlignment}%
                          </span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                          <div
                            aria-hidden="true"
                            className={[
                              "h-full rounded-full",
                              getBarColor(row.readinessAlignment),
                            ].join(" ")}
                            style={{ width: `${row.readinessAlignment}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="feedback-flags-heading"
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="border-b border-slate-100 pb-4">
                <h2
                  id="feedback-flags-heading"
                  className="text-xl font-semibold text-slate-950"
                >
                  Recent feedback flags
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  High-signal partnership notes affecting trust and operational fit.
                </p>
              </div>

              <div className="mt-5 space-y-4">
                {feedbackFlags.map((flag) => (
                  <article
                    key={flag.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {flag.organization}
                      </h3>
                      <StatusChip status={flag.status} />
                      <span
                        className={[
                          "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                          getSeverityClassName(flag.severity),
                        ].join(" ")}
                      >
                        {formatSeverityLabel(flag.severity)}
                      </span>
                    </div>

                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {flag.category}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {flag.note}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
