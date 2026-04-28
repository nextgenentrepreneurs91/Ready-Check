
import React from "react";

import { KpiCard } from "../components/KpiCard";
import { StatusChip, type StatusChipValue } from "../components/StatusChip";

type OperationStatus = Extract<StatusChipValue, "active" | "pending" | "blocked" | "completed">;
type AlertStatus = Extract<StatusChipValue, "needs_attention" | "blocked" | "pending" | "verified">;

interface OperationItem {
  id: string;
  missionName: string;
  region: string;
  lead: string;
  volunteersAssigned: number;
  readinessRate: number;
  status: OperationStatus;
  nextCheckpoint: string;
}

interface AlertItem {
  id: string;
  title: string;
  description: string;
  affectedRegion: string;
  status: AlertStatus;
}

interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  emphasis: "primary" | "secondary";
}

const operations: OperationItem[] = [
  {
    id: "op-001",
    missionName: "Flood Corridor Supply Run",
    region: "North River Belt",
    lead: "Asha Menon",
    volunteersAssigned: 18,
    readinessRate: 92,
    status: "active",
    nextCheckpoint: "Vehicle loading review at 14:30",
  },
  {
    id: "op-002",
    missionName: "Hill District Medical Dispatch",
    region: "East Ridge",
    lead: "Kabir Nair",
    volunteersAssigned: 11,
    readinessRate: 78,
    status: "pending",
    nextCheckpoint: "Medic briefing confirmation at 15:10",
  },
  {
    id: "op-003",
    missionName: "Shelter Capacity Support",
    region: "Harbor Zone",
    lead: "Riya Sen",
    volunteersAssigned: 24,
    readinessRate: 64,
    status: "blocked",
    nextCheckpoint: "Blocked until transport coverage is restored",
  },
  {
    id: "op-004",
    missionName: "Food Pack Distribution",
    region: "South Basin",
    lead: "Dev Malhotra",
    volunteersAssigned: 15,
    readinessRate: 96,
    status: "completed",
    nextCheckpoint: "Closed with post-run debrief logged",
  },
];

const alerts: AlertItem[] = [
  {
    id: "alert-001",
    title: "Driver route understanding mismatch",
    description:
      "Two assigned drivers selected the outdated bridge approach during the readiness check. Route clarification is required before deployment release.",
    affectedRegion: "Harbor Zone",
    status: "blocked",
  },
  {
    id: "alert-002",
    title: "Medic role-card acknowledgment missing",
    description:
      "One mobile team has not completed the revised trauma triage confirmation after updated field guidance was issued.",
    affectedRegion: "East Ridge",
    status: "needs_attention",
  },
  {
    id: "alert-003",
    title: "Volunteer roster nearing coverage threshold",
    description:
      "Night-shift coverage for the North River Belt is below the preferred reserve margin for sustained operations.",
    affectedRegion: "North River Belt",
    status: "pending",
  },
  {
    id: "alert-004",
    title: "Regional checklist sync stable",
    description:
      "The latest operations checklist sync completed without drift across mobile and admin surfaces.",
    affectedRegion: "South Basin",
    status: "verified",
  },
];

const quickActions: QuickActionItem[] = [
  {
    id: "qa-001",
    title: "Review blocked deployments",
    description:
      "Open the incident queue and resolve issues preventing mission release.",
    emphasis: "primary",
  },
  {
    id: "qa-002",
    title: "Re-run readiness verification",
    description:
      "Trigger follow-up checks for teams with flagged misunderstandings or incomplete role confirmations.",
    emphasis: "primary",
  },
  {
    id: "qa-003",
    title: "Inspect volunteer coverage",
    description:
      "Review regional staffing gaps and rebalance roles before the next dispatch window.",
    emphasis: "secondary",
  },
  {
    id: "qa-004",
    title: "Open collaboration requests",
    description:
      "Review partner support requests for logistics, transport, and regional reinforcement.",
    emphasis: "secondary",
  },
];

function formatPercentage(value: number): string {
  return `${value}%`;
}

function formatStatusLabel(status: OperationStatus): string {
  switch (status) {
    case "active":
      return "Active";
    case "pending":
      return "Pending";
    case "blocked":
      return "Blocked";
    case "completed":
      return "Completed";
    default:
      return status;
  }
}

function QuickActionCard({ action }: { action: QuickActionItem }): React.JSX.Element {
  const isPrimary = action.emphasis === "primary";

  return (
    <button
      type="button"
      className={[
        "rounded-2xl border p-4 text-left shadow-sm transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300",
        isPrimary
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-900",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">{action.title}</h3>
          <p
            className={[
              "mt-2 text-sm leading-6",
              isPrimary ? "text-slate-200" : "text-slate-600",
            ].join(" ")}
          >
            {action.description}
          </p>
        </div>
        <span
          aria-hidden="true"
          className={[
            "text-lg font-semibold",
            isPrimary ? "text-slate-200" : "text-slate-400",
          ].join(" ")}
        >
          →
        </span>
      </div>
    </button>
  );
}

export function OpsDashboard(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
              ReadyCheck Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Operations Dashboard
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              Monitor team readiness, deployment blockers, and mission flow across
              active regions. This view is designed for coordinators making fast,
              safe operational decisions.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Current posture
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              Controlled operations with 1 blocked deployment
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Next coordinator review window: 15:30 local
            </p>
          </div>
        </header>

        <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <KpiCard
            label="Readiness rate"
            value="84%"
            delta="+6% since last dispatch cycle"
            trendDirection="up"
            statusTone="verified"
            helperText="Teams with completed action-card understanding checks."
          />
          <KpiCard
            label="Blocked deployments"
            value="1"
            delta="-1 from previous review"
            trendDirection="down"
            statusTone="attention"
            helperText="Missions currently prevented from release due to unresolved risks."
          />
          <KpiCard
            label="Unresolved incidents"
            value="4"
            delta="+1 in the last 2 hours"
            trendDirection="up"
            statusTone="blocked"
            helperText="Operational issues still awaiting coordinator action."
          />
          <KpiCard
            label="Volunteer coverage"
            value="88%"
            delta="+9% after regional reassignment"
            trendDirection="up"
            statusTone="pending"
            helperText="Coverage across required mission roles and reserve capacity."
          />
          <KpiCard
            label="Mission throughput"
            value="12"
            delta="2 completed in current shift"
            trendDirection="neutral"
            statusTone="default"
            helperText="Total missions processed through verification and dispatch today."
          />
        </section>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.35fr_0.95fr]">
          <section
            aria-labelledby="current-operations-heading"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id="current-operations-heading"
                  className="text-xl font-semibold text-slate-950"
                >
                  Current operations
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Live mission readiness and dispatch posture across active regions.
                </p>
              </div>
              <p className="text-sm font-medium text-slate-500">
                {operations.length} tracked missions
              </p>
            </div>

            <div className="mt-5 space-y-4">
              {operations.map((operation) => (
                <article
                  key={operation.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-semibold text-slate-900">
                          {operation.missionName}
                        </h3>
                        <StatusChip status={operation.status} />
                      </div>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
                        <span>
                          <span className="font-medium text-slate-700">Region:</span>{" "}
                          {operation.region}
                        </span>
                        <span>
                          <span className="font-medium text-slate-700">Lead:</span>{" "}
                          {operation.lead}
                        </span>
                        <span>
                          <span className="font-medium text-slate-700">
                            Assigned:
                          </span>{" "}
                          {operation.volunteersAssigned} volunteers
                        </span>
                      </div>
                    </div>

                    <div className="grid min-w-[220px] grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Readiness
                        </p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">
                          {formatPercentage(operation.readinessRate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Status
                        </p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">
                          {formatStatusLabel(operation.status)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-white px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Next checkpoint
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      {operation.nextCheckpoint}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="space-y-8">
            <section
              aria-labelledby="readiness-alerts-heading"
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="border-b border-slate-100 pb-4">
                <h2
                  id="readiness-alerts-heading"
                  className="text-xl font-semibold text-slate-950"
                >
                  Readiness alerts
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Signals that need coordinator review before deployment or reassignment.
                </p>
              </div>

              <div className="mt-5 space-y-4">
                {alerts.map((alert) => (
                  <article
                    key={alert.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {alert.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {alert.description}
                        </p>
                      </div>
                      <StatusChip status={alert.status} />
                    </div>
                    <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                      Affected region: {alert.affectedRegion}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="quick-actions-heading"
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="border-b border-slate-100 pb-4">
                <h2
                  id="quick-actions-heading"
                  className="text-xl font-semibold text-slate-950"
                >
                  Quick actions
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Common coordinator actions for recovery, verification, and dispatch flow.
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                {quickActions.map((action) => (
                  <QuickActionCard key={action.id} action={action} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
