
// apps/admin/src/pages/ProblemHeatmap.tsx
import React from "react";

type ProblemCategory =
  | "misunderstanding_hotspots"
  | "logistics_issues"
  | "safety_risks"
  | "staffing_gaps";

type HeatLevel = 0 | 1 | 2 | 3 | 4;

interface HeatmapRow {
  region: string;
  missionType: string;
  misunderstanding_hotspots: HeatLevel;
  logistics_issues: HeatLevel;
  safety_risks: HeatLevel;
  staffing_gaps: HeatLevel;
  summary: string;
}

const heatmapRows: HeatmapRow[] = [
  {
    region: "North River Belt",
    missionType: "Flood supply movement",
    misunderstanding_hotspots: 2,
    logistics_issues: 3,
    safety_risks: 2,
    staffing_gaps: 1,
    summary:
      "Route briefing drift is moderate, with the main pressure coming from loading coordination and road access timing.",
  },
  {
    region: "East Ridge",
    missionType: "Mobile medic support",
    misunderstanding_hotspots: 3,
    logistics_issues: 2,
    safety_risks: 3,
    staffing_gaps: 2,
    summary:
      "Clinical handoff misunderstandings and terrain-related safety constraints are both elevated during rotation windows.",
  },
  {
    region: "Harbor Zone",
    missionType: "Warehouse and shoreline dispatch",
    misunderstanding_hotspots: 4,
    logistics_issues: 4,
    safety_risks: 3,
    staffing_gaps: 3,
    summary:
      "This corridor shows the highest operational strain, driven by outdated route assumptions and unstable handoff timing.",
  },
  {
    region: "South Basin",
    missionType: "Shelter onboarding",
    misunderstanding_hotspots: 1,
    logistics_issues: 1,
    safety_risks: 2,
    staffing_gaps: 2,
    summary:
      "Briefing consistency remains stable, though night-shift staffing and safety supervision require closer monitoring.",
  },
  {
    region: "Central Uplands",
    missionType: "Volunteer transport relay",
    misunderstanding_hotspots: 2,
    logistics_issues: 3,
    safety_risks: 4,
    staffing_gaps: 3,
    summary:
      "Safety risk is the dominant issue due to weather exposure and inconsistent fallback-route awareness.",
  },
];

const categoryLabels: Record<ProblemCategory, string> = {
  misunderstanding_hotspots: "Misunderstanding hotspots",
  logistics_issues: "Logistics issues",
  safety_risks: "Safety risks",
  staffing_gaps: "Staffing gaps",
};

const categoryDescriptions: Record<ProblemCategory, string> = {
  misunderstanding_hotspots:
    "Role-card confusion, incorrect answers, and action-step misunderstandings.",
  logistics_issues:
    "Transport delays, handoff friction, inventory timing, and route dependency problems.",
  safety_risks:
    "Terrain, weather, unsafe route assumptions, and field operating hazards.",
  staffing_gaps:
    "Insufficient role coverage, reserve shortages, or unfilled critical positions.",
};

function getHeatCellClass(level: HeatLevel): string {
  switch (level) {
    case 0:
      return "bg-slate-100 text-slate-500 border-slate-200";
    case 1:
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case 2:
      return "bg-amber-100 text-amber-800 border-amber-200";
    case 3:
      return "bg-orange-100 text-orange-800 border-orange-200";
    case 4:
      return "bg-rose-100 text-rose-800 border-rose-200";
    default:
      return "bg-slate-100 text-slate-500 border-slate-200";
  }
}

function getHeatLabel(level: HeatLevel): string {
  switch (level) {
    case 0:
      return "None";
    case 1:
      return "Low";
    case 2:
      return "Moderate";
    case 3:
      return "High";
    case 4:
      return "Critical";
    default:
      return "Unknown";
  }
}

function HeatLegend(): React.JSX.Element {
  const legendLevels: HeatLevel[] = [0, 1, 2, 3, 4];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Heat scale
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {legendLevels.map((level) => (
          <div
            key={level}
            className={[
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
              getHeatCellClass(level),
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className="inline-flex h-2.5 w-2.5 rounded-full bg-current opacity-80"
            />
            <span>{getHeatLabel(level)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryGuide(): React.JSX.Element {
  const categories = Object.keys(categoryLabels) as ProblemCategory[];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-950">Problem categories</h2>
      <p className="mt-1 text-sm text-slate-600">
        The matrix tracks the categories most likely to degrade deployment safety,
        role clarity, or mission throughput.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <article
            key={category}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <h3 className="text-sm font-semibold text-slate-900">
              {categoryLabels[category]}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {categoryDescriptions[category]}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProblemHeatmap(): React.JSX.Element {
  const categories = Object.keys(categoryLabels) as ProblemCategory[];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
              ReadyCheck Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Problem Heatmap
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              Visualize operational problem concentration across regions and mission
              types. This heatmap highlights where misunderstanding hotspots,
              logistics friction, safety concerns, and staffing gaps are most likely
              to block safe deployment.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Current signal
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              Harbor Zone remains the highest-risk cluster
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Prioritize route clarification and logistics recovery before dispatch.
            </p>
          </div>
        </header>

        <div className="grid gap-8 xl:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">
                  Regional problem matrix
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Compare operational problem concentration by region and mission
                  type using a heat-style grid.
                </p>
              </div>
              <p className="text-sm font-medium text-slate-500">
                {heatmapRows.length} monitored operating zones
              </p>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-3">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Region
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Mission type
                    </th>
                    {categories.map((category) => (
                      <th
                        key={category}
                        className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {categoryLabels[category]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatmapRows.map((row) => (
                    <tr key={`${row.region}-${row.missionType}`}>
                      <td className="rounded-l-2xl border-y border-l border-slate-200 bg-slate-50 px-3 py-4 align-top">
                        <p className="text-sm font-semibold text-slate-900">{row.region}</p>
                      </td>
                      <td className="border-y border-slate-200 bg-slate-50 px-3 py-4 align-top">
                        <p className="text-sm text-slate-700">{row.missionType}</p>
                      </td>
                      {categories.map((category) => {
                        const level = row[category];
                        return (
                          <td
                            key={`${row.region}-${category}`}
                            className="border-y border-slate-200 bg-slate-50 px-3 py-4 align-top"
                          >
                            <div
                              className={[
                                "inline-flex min-w-[110px] items-center justify-center rounded-xl border px-3 py-2 text-sm font-semibold",
                                getHeatCellClass(level),
                              ].join(" ")}
                              title={getHeatLabel(level)}
                            >
                              {getHeatLabel(level)}
                            </div>
                          </td>
                        );
                      })}
                      <td className="rounded-r-2xl border-y border-r border-slate-200 bg-slate-50 px-3 py-4 align-top">
                        <p className="max-w-xs text-sm leading-6 text-slate-600">
                          {row.summary}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <HeatLegend />
            </div>
          </section>

          <div className="space-y-8">
            <CategoryGuide />

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">
                Triage priorities
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Recommended coordinator focus areas based on the current matrix.
              </p>

              <div className="mt-5 space-y-4">
                <article className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                  <h3 className="text-sm font-semibold text-rose-900">
                    1. Resolve Harbor Zone route and handoff drift
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-rose-800">
                    Highest combined strain across misunderstanding and logistics
                    categories. Do not release new shoreline dispatches until route
                    guidance is re-confirmed.
                  </p>
                </article>

                <article className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <h3 className="text-sm font-semibold text-amber-900">
                    2. Reassess East Ridge medic briefing quality
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-amber-800">
                    Elevated misunderstanding and safety signals indicate a need for
                    tighter clarification loops before the next mobile triage cycle.
                  </p>
                </article>

                <article className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                  <h3 className="text-sm font-semibold text-sky-900">
                    3. Stabilize Central Uplands fallback-route readiness
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-sky-800">
                    Safety risk is higher than staffing pressure. Focus on route
                    alternatives, weather exposure notes, and transport contingency.
                  </p>
                </article>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
