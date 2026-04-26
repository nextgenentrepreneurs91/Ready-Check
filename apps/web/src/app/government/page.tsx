// apps/web/src/app/government/page.tsx
```tsx
import React from "react";
import { 
  Landmark, 
  Map, 
  ShieldCheck, 
  Building2, 
  AlertCircle,
  FileText,
  Activity,
  ChevronRight
} from "lucide-react";
import { RoleSidebar } from "../../components/role-sidebar";

// Mock Data targeting Government/Stakeholder reporting
const OVERVIEW_METADATA = {
  jurisdiction: "Assam & Northern Territories",
  activeAgencies: 14,
  civiliansAssisted: "42,000+",
  overallVerifiedReadiness: 91,
};

const REGIONAL_COVERAGE = [
  {
    region: "North River Belt",
    status: "Active Deployment",
    readiness: 94,
    agencies: ["GlobalMedic", "Red Cross Regional", "FEMA Ops"],
    criticalGaps: "None",
  },
  {
    region: "East Ridge",
    status: "Stabilizing",
    readiness: 82,
    agencies: ["Local Transport Union", "State Medevac"],
    criticalGaps: "Logistics Routing Confidence",
  },
  {
    region: "Sector 4 Harbor",
    status: "Preparation Phase",
    readiness: 76,
    agencies: ["AeroLift Logistics"],
    criticalGaps: "Heavy Machinery Operators",
  }
];

const RESOURCE_GAPS = [
  {
    id: "gap_1",
    severity: "critical",
    domain: "Aviation/Transport",
    description: "Sector 4 Harbor operations are constrained by a lack of heavy-lift drone operators. Current deployment timelines are delayed by 18 hours.",
    requestedAction: "State-level authorization for National Guard aviation support.",
  },
  {
    id: "gap_2",
    severity: "warning",
    domain: "Infrastructure Integration",
    description: "East Ridge bypass routes lack active structural telemetry. Operational risk prevents automated ReadyCheck clearing for heavy convoys.",
    requestedAction: "Expedite sharing of state structural engineering reports for Highway 41.",
  }
];

export default function GovernmentDashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar Context */}
      <RoleSidebar currentRole="government" userName="Director Hastings" />

      {/* Main Content */}
      <main className="ml-64 flex-1">
        
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <Landmark size={20} className="text-slate-800" />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Inter-Agency Oversight</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
              Jurisdiction: {OVERVIEW_METADATA.jurisdiction}
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">

          {/* Formal Hero Summary */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              
              <div className="p-8 col-span-2">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Theater Status</p>
                <h2 className="text-3xl font-extrabold text-white mb-4">Operations are Stabilizing</h2>
                <p className="text-slate-300 font-medium leading-relaxed max-w-md">
                  Cross-agency coordination remains active. Through the ReadyCheck protocol, field execution has achieved an unprecedented compliance verification rate, eliminating unforced logistical errors.
                </p>
              </div>

              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck size={20} className="text-emerald-400" />
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Verified Readiness</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-white">{OVERVIEW_METADATA.overallVerifiedReadiness}%</span>
                </div>
              </div>

              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <Activity size={20} className="text-indigo-400" />
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Civilians Reached</p>
                </div>
                <span className="text-4xl font-extrabold text-white">{OVERVIEW_METADATA.civiliansAssisted}</span>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-2">Across {OVERVIEW_METADATA.activeAgencies} Agencies</p>
              </div>

            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Regional Coverage List */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Map size={20} className="text-indigo-600" /> Regional Coverage & Agencies
              </h2>

              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden divide-y divide-slate-100">
                {REGIONAL_COVERAGE.map((region, idx) => (
                  <div key={idx} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{region.region}</h3>
                        <p className={`text-xs font-bold uppercase tracking-wider mt-1 ${
                          region.status === 'Active Deployment' ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          {region.status}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Execution Confidence</p>
                        <div className="flex items-center justify-end gap-2">
                          <div className={`h-2 w-16 rounded-full bg-slate-100 overflow-hidden`}>
                            <div className="h-full bg-indigo-600" style={{ width: `${region.readiness}%` }} />
                          </div>
                          <span className="text-sm font-bold text-slate-900">{region.readiness}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 mt-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                          <Building2 size={14} /> Active NGOs
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {region.agencies.map((agency, agencyIdx) => (
                            <span key={agencyIdx} className="bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-bold px-2 py-1 rounded">
                              {agency}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                          <AlertCircle size={14} /> Identified Gaps
                        </p>
                        <p className={`text-sm font-semibold ${region.criticalGaps === 'None' ? 'text-slate-500' : 'text-amber-700'}`}>
                          {region.criticalGaps}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Intervention Requests */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle size={20} className="text-slate-400" /> State Interventions
              </h2>

              <div className="space-y-4">
                {RESOURCE_GAPS.map((gap) => (
                  <div key={gap.id} className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-1 ${gap.severity === 'critical' ? 'bg-red-500' : 'bg-amber-400'}`} />
                    
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 mt-1">Domain: {gap.domain}</h3>
                    <p className="text-sm font-medium text-slate-700 leading-relaxed mb-4">
                      {gap.description}
                    </p>

                    <div className="border border-indigo-100 bg-indigo-50/50 rounded-lg p-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-1">Required Authorization</p>
                      <p className="text-sm font-bold text-slate-900">{gap.requestedAction}</p>
                    </div>

                    <button className="mt-4 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg transition-colors">
                      <FileText size={14} /> Draft Executive Order
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-center justify-between group cursor-pointer hover:bg-white transition-colors">
                <div>
                  <p className="text-sm font-bold text-slate-900">Historical Archive</p>
                  <p className="text-xs font-semibold text-slate-500">Access past disaster post-mortems</p>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
```
