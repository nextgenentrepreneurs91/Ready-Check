
```tsx
// apps/admin/src/pages/ProposalReview.tsx
import React from "react";

type RiskLevel = "low" | "medium" | "high" | "critical";
type ProposalStatus = "pending_review" | "approved" | "changes_requested" | "rejected";

interface TeamRole {
  id: string;
  title: string;
  headcount: number;
  isCritical: boolean;
  verificationFocus: string;
}

interface RiskNote {
  id: string;
  level: RiskLevel;
  description: string;
  mitigation: string;
}

interface Proposal {
  id: string;
  title: string;
  coordinator: string;
  submittedAt: string;
  status: ProposalStatus;
  objective: string;
  location: string;
  timeline: string;
  roles: TeamRole[];
  risks: RiskNote[];
  readinessImplications: string[];
  systemRecommendation: {
    decision: "Proceed with Verification" | "Adjust Plan" | "Block";
    confidence: number;
    reasoning: string;
  };
}

const mockProposal: Proposal = {
  id: "DEP-8092",
  title: "Assam Flood: Emergency Food & Medical Distribution",
  coordinator: "Sarah Jenkins (Regional Lead)",
  submittedAt: "2026-04-16T08:14:00Z",
  status: "pending_review",
  objective:
    "Distribute 500 emergency rationing kits and conduct structural triage in isolated villages along the North River Belt. Requires both heavy convoy access and specialized medical offloading.",
  location: "North River Belt (Sectors 4 through 9), Assam",
  timeline: "Commencing exactly 06:00 Local, Est. Duration 48h",
  roles: [
    {
      id: "r1",
      title: "Convoy Driver",
      headcount: 4,
      isCritical: true,
      verificationFocus: "Must verify understanding of alternate highway route and bypass protocols if primary roads remain flooded.",
    },
    {
      id: "r2",
      title: "Mobile Medic",
      headcount: 2,
      isCritical: true,
      verificationFocus: "Must verify cold-chain storage procedures for incoming field vaccines.",
    },
    {
      id: "r3",
      title: "Distribution Volunteer",
      headcount: 8,
      isCritical: false,
      verificationFocus: "Needs clarity on package sorting and crowd separation areas.",
    },
  ],
  risks: [
    {
      id: "rk1",
      level: "critical",
      description: "Local route 9 is unconfirmed. Reports indicate heavy waterlogging.",
      mitigation: "Force drivers to pass routing-readiness checks on the highway bypass plan.",
    },
    {
      id: "rk2",
      level: "medium",
      description: "Handoff delays due to limited medical staff bridging.",
      mitigation: "Assign strict timeboxing in the role-cards for medics.",
    },
  ],
  readinessImplications: [
    "Volunteers will be heavily subjected to route-change questions.",
    "Medic role cards require mandatory acknowledgment of supply inventory.",
    "If any Convoy Driver fails the verification gate twice, deployment will be hard-blocked.",
  ],
  systemRecommendation: {
    decision: "Adjust Plan",
    confidence: 88,
    reasoning:
      "The primary route assumption is highly risky. Data suggests rerouting via the highway bypass. Adjusting the route instructions before sending ReadyCheck verification to volunteers will prevent early-morning deployment failure.",
  },
};

function getRiskTagStyles(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "bg-slate-100 text-slate-700 border-slate-200";
    case "medium":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "critical":
      return "bg-rose-100 text-rose-800 border-rose-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export function ProposalReview(): React.JSX.Element {
  const proposal = mockProposal;

  return (
    <main className="min-h-screen bg-slate-50 pb-16 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <header className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
                Deployment Proposal
              </p>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                Review Pending
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {proposal.title}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Submitted by <span className="font-medium text-slate-900">{proposal.coordinator}</span> • ID: {proposal.id}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              Request Changes
            </button>
            <button
              type="button"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-500"
            >
              Approve & Setup ReadyCheck
            </button>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Main Detail Column */}
          <div className="space-y-8">
            
            {/* Overview Card */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">Mission Overview</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Objective</p>
                  <p className="mt-1 text-base leading-relaxed text-slate-800">
                    {proposal.objective}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Location</p>
                    <p className="mt-1 text-sm font-medium text-slate-900">{proposal.location}</p>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Timeline</p>
                    <p className="mt-1 text-sm font-medium text-slate-900">{proposal.timeline}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Team Roles & Verification */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                <h2 className="text-lg font-semibold text-slate-950">Role Composition</h2>
                <span className="text-sm text-slate-500">
                  {proposal.roles.reduce((acc, r) => acc + r.headcount, 0)} Total Personnel
                </span>
              </div>
              <ul className="mt-4 divide-y divide-slate-100">
                {proposal.roles.map((role) => (
                  <li key={role.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-slate-900">{role.title}</p>
                          {role.isCritical && (
                            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                              Critical
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-slate-600">
                          <span className="font-medium">Verification Focus:</span> {role.verificationFocus}
                        </p>
                      </div>
                      <span className="ml-4 inline-flex items-center justify-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                        {role.headcount} req
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Risks & Implications */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">Risk Assessment</h2>
              <ul className="mt-4 space-y-3">
                {proposal.risks.map((risk) => (
                  <li key={risk.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{risk.description}</p>
                        <p className="mt-1 text-sm text-slate-600">
                          <span className="font-medium text-slate-700">Mitigation:</span> {risk.mitigation}
                        </p>
                      </div>
                      <span
                        className={`inline-flex shrink-0 items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${getRiskTagStyles(
                          risk.level
                        )}`}
                      >
                        {risk.level}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* AI Recommendation Panel */}
            <div className="overflow-hidden rounded-2xl border border-indigo-200 bg-indigo-50 shadow-sm">
              <div className="bg-indigo-600 px-4 py-3">
                <div className="flex items-center gap-2">
                  {/* Minimal spark icon replacement */}
                  <svg className="h-4 w-4 text-indigo-100" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                  </svg>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                    AI Analysis
                  </h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold text-indigo-950">
                  Recommendation: {proposal.systemRecommendation.decision}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-indigo-900">
                  {proposal.systemRecommendation.reasoning}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-indigo-200/50 pt-4">
                  <span className="text-xs font-medium text-indigo-800">Confidence Score</span>
                  <span className="text-lg font-bold tracking-tight text-indigo-950">
                    {proposal.systemRecommendation.confidence}%
                  </span>
                </div>
              </div>
            </div>

            {/* Readiness Implications Summary */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                ReadyCheck Impact
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                If approved, the system will apply the following constraints to the verification layer:
              </p>
              <ul className="mt-4 space-y-3">
                {proposal.readinessImplications.map((imp, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-slate-700">
                    <svg className="h-5 w-5 shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
```
