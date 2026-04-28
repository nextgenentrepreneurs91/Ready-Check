
// apps/admin/src/pages/CollaborationRequests.tsx
import React from "react";

import { StatusChip, type StatusChipValue } from "../components/StatusChip";

type CollaborationStatus = Extract<
  StatusChipValue,
  "pending" | "active" | "blocked" | "completed"
>;

type UrgencyLevel = "critical" | "high" | "medium" | "low";

interface CollaborationRequest {
  id: string;
  organization: string;
  region: string;
  capability: string;
  urgency: UrgencyLevel;
  trustSignal: string;
  status: CollaborationStatus;
  requestedSupport: string;
  submittedAt: string;
  coordinatorNote: string;
}

const collaborationRequests: CollaborationRequest[] = [
  {
    id: "CR-1042",
    organization: "Sahara Relief Network",
    region: "North River Belt",
    capability: "Boat transport coordination",
    urgency: "critical",
    trustSignal: "Trusted partner with 3 successful joint deployments",
    status: "pending",
    requestedSupport:
      "Seeking joint dispatch support for flood-isolated settlements and last-mile medicine movement.",
    submittedAt: "Today, 09:20",
    coordinatorNote:
      "Requires immediate review because bridge routes remain unstable and driver briefings need alignment.",
  },
  {
    id: "CR-1038",
    organization: "Eastern Care Collective",
    region: "East Ridge",
    capability: "Field medic augmentation",
    urgency: "high",
    trustSignal: "Strong clinical feedback score, moderate regional readiness variance",
    status: "active",
    requestedSupport:
      "Requesting two mobile medical units to reinforce an over-capacity triage line near temporary shelters.",
    submittedAt: "Today, 07:45",
    coordinatorNote:
      "Operationally viable, but team readiness check follow-up is required for one incoming unit.",
  },
  {
    id: "CR-1029",
    organization: "Harbor Aid Coalition",
    region: "Harbor Zone",
    capability: "Warehouse and supply-chain staffing",
    urgency: "medium",
    trustSignal: "Consistent delivery history but delayed reporting in the last cycle",
    status: "blocked",
    requestedSupport:
      "Needs volunteer logistics support to stabilize intake, sorting, and outbound dispatch windows.",
    submittedAt: "Yesterday, 18:10",
    coordinatorNote:
      "Blocked pending trust clarification and updated inventory handoff procedures from the requesting NGO.",
  },
  {
    id: "CR-1024",
    organization: "South Basin Community Response",
    region: "South Basin",
    capability: "Community outreach and shelter onboarding",
    urgency: "low",
    trustSignal: "High local familiarity and stable coordination history",
    status: "completed",
    requestedSupport:
      "Requested a small volunteer support team for shelter intake, registration flow, and information clarity.",
    submittedAt: "Yesterday, 10:05",
    coordinatorNote:
      "Collaboration review completed. Request converted into a scheduled support assignment for the next shift.",
  },
];

const urgencyStyles: Record<UrgencyLevel, string> = {
  critical: "bg-rose-100 text-rose-800 border border-rose-200",
  high: "bg-amber-100 text-amber-800 border border-amber-200",
  medium: "bg-sky-100 text-sky-800 border border-sky-200",
  low: "bg-slate-100 text-slate-700 border border-slate-200",
};

function formatUrgencyLabel(urgency: UrgencyLevel): string {
  switch (urgency) {
    case "critical":
      return "Critical";
    case "high":
      return "High";
    case "medium":
      return "Medium";
    case "low":
      return "Low";
    default:
      return urgency;
  }
}

function RequestActionButton(props: {
  label: string;
  variant?: "primary" | "secondary" | "neutral";
}): React.JSX.Element {
  const { label, variant = "neutral" } = props;

  const variantClassName =
    variant === "primary"
      ? "bg-slate-900 text-white hover:bg-slate-800"
      : variant === "secondary"
        ? "bg-white text-slate-900 border border-slate-300 hover:bg-slate-50"
        : "bg-slate-100 text-slate-700 hover:bg-slate-200";

  return (
    <button
      type="button"
      className={[
        "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-slate-300",
        variantClassName,
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export function CollaborationRequests(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
              ReadyCheck Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Collaboration Requests
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              Review incoming NGO and team collaboration requests across regions.
              This workspace helps coordinators validate urgency, trust posture,
              and operational fit before approving shared support.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Queue status
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {collaborationRequests.length} requests under review
            </p>
            <p className="mt-1 text-sm text-slate-600">
              1 critical request awaiting coordinator decision
            </p>
          </div>
        </header>

        <section
          aria-labelledby="collaboration-queue-heading"
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="collaboration-queue-heading"
                className="text-xl font-semibold text-slate-950"
              >
                Active request queue
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Assess organizational request details, regional need, and trust
                context before assigning or holding support.
              </p>
            </div>
            <p className="text-sm font-medium text-slate-500">
              Mock data for review workflow
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {collaborationRequests.map((request) => (
              <article
                key={request.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-base font-semibold text-slate-900">
                        {request.organization}
                      </h3>
                      <StatusChip status={request.status} />
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                          urgencyStyles[request.urgency],
                        ].join(" ")}
                      >
                        {formatUrgencyLabel(request.urgency)} urgency
                      </span>
                    </div>

                    <div className="mt-3 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 xl:grid-cols-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Request ID
                        </p>
                        <p className="mt-1 font-medium text-slate-800">
                          {request.id}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Region
                        </p>
                        <p className="mt-1 font-medium text-slate-800">
                          {request.region}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Capability
                        </p>
                        <p className="mt-1 font-medium text-slate-800">
                          {request.capability}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Submitted
                        </p>
                        <p className="mt-1 font-medium text-slate-800">
                          {request.submittedAt}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Requested support
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          {request.requestedSupport}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Trust signal
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          {request.trustSignal}
                        </p>

                        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Coordinator note
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          {request.coordinatorNote}
                        </p>
                      </div>
                    </div>
                  </div>

                  <aside className="w-full rounded-2xl border border-slate-200 bg-white p-4 xl:w-64">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Review actions
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Choose the next coordinator action for this request.
                    </p>

                    <div className="mt-4 grid gap-3">
                      <RequestActionButton label="Approve" variant="primary" />
                      <RequestActionButton label="Review" variant="secondary" />
                      <RequestActionButton label="Hold" />
                    </div>
                  </aside>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
