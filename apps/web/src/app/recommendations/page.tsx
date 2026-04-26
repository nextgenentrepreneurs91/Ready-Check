// apps/web/src/app/recommendations/page.tsx
```tsx
import React from "react";
import { 
  Sparkles, 
  MapRoute, 
  Users, 
  ShieldCheck, 
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ArrowRight
} from "lucide-react";
import { RoleSidebar } from "../../components/role-sidebar";

// Mock Data targeting the "Reality Configurator" intelligence
const RECOMMENDATIONS = [
  {
    id: "rec_1",
    category: "plan_adjustment",
    title: "Route Invalidation: Assam Sector 7",
    context: "Current deployment uses Route 9. Regional telemetry reports complete washout.",
    suggestion: "Mandate the Highway 41 Bypass. Generate a new Readiness Verification specifically asking Drivers to confirm the bypass instruction.",
    criticality: "high", // Block-level issue
    icon: MapRoute,
  },
  {
    id: "rec_2",
    category: "staffing",
    title: "Reserve Medic Utilization",
    context: "Sector 4 Hub expects an influx of Level-2 trauma cases based on recent evacuation data, but only has 3 active medics.",
    suggestion: "Promote 2 qualified volunteers from Reserve Transport to Active Medic Support. Their trust scores average 95%.",
    criticality: "medium",
    icon: Users,
  },
  {
    id: "rec_3",
    category: "risk_mitigation",
    title: "Communication Blackout Protocol",
    context: "Historical patterns show complete VHF drops around 18:00 Local time during monsoon season.",
    suggestion: "Add a 'Comms Blackout' caution to all Action Cards and require personnel to acknowledge offline visual flare protocols.",
    criticality: "high",
    icon: AlertTriangle,
  },
  {
    id: "rec_4",
    category: "readiness",
    title: "Restructure Heavy Loading Instructions",
    context: "Post-mission debriefs from yesterday indicate confusion around loading zones, causing a 2-point drop in Clarity ratings.",
    suggestion: "Rewrite the Logistics Coordinator Action Card to explicitly assign staging zones A, B, and C.",
    criticality: "medium",
    icon: Lightbulb,
  }
];

const METRICS = {
  activeOptimizations: 4,
  risksAverted: 12,
  efficiencyGain: "+18%",
};

export default function RecommendationsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar Context */}
      <RoleSidebar currentRole="coordinator" userName="Alex Mercer" />

      {/* Main Content */}
      <main className="ml-64 flex-1">
        
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-indigo-600" />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">AI Reality Configuration</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 tracking-wide border border-indigo-200">
              ENGINE: ACTIVE SCAN
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">

          {/* Engine Status Hero */}
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Active Suggestions</p>
                <p className="text-3xl font-extrabold text-slate-900">{METRICS.activeOptimizations}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center">
                <Sparkles size={24} className="text-indigo-600" />
              </div>
            </div>
            
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Historical Risks Averted</p>
                <p className="text-3xl font-extrabold text-slate-900">{METRICS.risksAverted}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center">
                <ShieldCheck size={24} className="text-emerald-600" />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Execution Efficiency</p>
                <p className="text-3xl font-extrabold text-emerald-600">{METRICS.efficiencyGain}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center">
                <TrendingUp size={24} className="text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Primary Recommendations Stream */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Priority Operational Adjustments</h2>
              
              <div className="space-y-4">
                {RECOMMENDATIONS.map((rec) => {
                  const Icon = rec.icon;
                  const isHigh = rec.criticality === "high";

                  return (
                    <div key={rec.id} className={`rounded-xl border bg-white shadow-sm overflow-hidden flex flex-col ${
                      isHigh ? 'border-amber-200 shadow-amber-100/50' : 'border-slate-200'
                    }`}>
                      
                      <div className={`px-6 py-4 border-b flex items-center gap-3 ${
                        isHigh ? 'border-amber-100 bg-amber-50/50' : 'border-slate-100 bg-slate-50/50'
                      }`}>
                        <div className={`p-2 rounded-lg ${isHigh ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900">{rec.title}</h3>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                            {rec.category.replace('_', ' ')}
                          </p>
                        </div>
                        {isHigh && (
                          <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-widest">
                            <AlertTriangle size={12} /> High Priority
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="mb-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Verified Context</p>
                          <p className="text-sm font-medium text-slate-700 leading-relaxed">{rec.context}</p>
                        </div>
                        
                        <div className="mb-6 rounded-lg bg-indigo-50 border border-indigo-100 p-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1 flex items-center gap-1.5">
                            <Sparkles size={14} /> AI Suggestion
                          </p>
                          <p className="text-sm font-bold text-slate-900 leading-relaxed">{rec.suggestion}</p>
                        </div>

                        <div className="flex items-center gap-3 border-t border-slate-100 pt-5 mt-2">
                          <button className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-bold py-2.5 px-4 rounded-lg shadow-sm hover:bg-slate-800 transition-colors">
                            <CheckCircle2 size={16} /> Apply Adjustment
                          </button>
                          <button className="flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 text-sm font-bold py-2.5 px-4 rounded-lg hover:bg-slate-50 transition-colors">
                            <XCircle size={16} /> Dismiss
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Settings / Information Context */}
            <div className="space-y-6">
              
              <h2 className="text-lg font-bold text-slate-900">System Context</h2>
              
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  The ReadyCheck Reality Configurator analyzes in-bound telemetry, past mission debriefs, and real-time capability tracking to identify gaps between your master plan and field execution.
                </p>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">Automated Actions Taken</h3>
                  <ul className="space-y-2 text-sm text-slate-600 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" /> 
                      Generated contextual checks for 3 roles.
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" /> 
                      Filtered out 12 unverified driver routes.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-indigo-900">Self-Correction Loop</h3>
                  <Sparkles size={16} className="text-indigo-600" />
                </div>
                <p className="text-sm text-indigo-800 font-medium mb-4 leading-relaxed">
                  When you apply an adjustment, the system automatically retracts unverified Action Cards and issues new Readiness Checks to ensure total team alignment.
                </p>
                <button className="text-xs font-bold text-indigo-700 flex items-center gap-1 hover:text-indigo-800">
                  View correction rules <ArrowRight size={14} />
                </button>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
```
