// apps/web/src/app/executive/page.tsx
```tsx
import React from "react";
import { 
  Briefcase, 
  Globe2, 
  ShieldCheck, 
  ActivitySquare, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Building2,
  Users
} from "lucide-react";
import { RoleSidebar } from "../../components/role-sidebar";

// Mock Executive Data
const PORTFOLIO_METRICS = {
  activeOperations: 14,
  personnelDeployed: 842,
  globalReadinessRate: 94,
  partnerTrustIndex: 88,
  readinessDelta: "+4.2%", // WoW change
  incidentMissions: 2, // Operations currently blocked by critical incidents
};

const REGIONAL_HEALTH = [
  { region: "North River Belt", operations: 6, readiness: 92, trust: 85, status: "stable" },
  { region: "Sector 4 Harbor", operations: 3, readiness: 98, trust: 94, status: "optimal" },
  { region: "East Ridge Pipeline", operations: 5, readiness: 74, trust: 70, status: "attention" },
];

const STRATEGIC_CONCERNS = [
  {
    id: "sc_1",
    severity: "high",
    title: "Systemic Routing Confusion in East Ridge",
    context: "Cross-partner telemetry indicates a recurring route verification failure (38% fail rate on first attempt) among outsourced logistics partners in the East Ridge sector.",
    recommendation: "Deploy Reality Configurator to mandate explicit visual maps for all East Ridge Action Cards. Temporarily restrict tier-2 partner access to this zone.",
  },
  {
    id: "sc_2",
    severity: "medium",
    title: "Medic Capacity Baseline Drop",
    context: "Available mobile medics across all active theaters have dropped to 15% reserve capacity due to an unseasonal spike in Level-1 trauma incidents.",
    recommendation: "Initiate emergency cross-training module via ReadyCheck for inactive Reserve Transport personnel with baseline EMS certs.",
  }
];

export default function ExecutiveDashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar Context */}
      <RoleSidebar currentRole="executive" userName="Elena Vance" />

      {/* Main Content */}
      <main className="ml-64 flex-1">
        
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <Briefcase size={20} className="text-slate-900" />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Executive Portfolio</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
              Last Synced: 2 Mins Ago
            </div>
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors">
              Export Briefing PDF
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">

          {/* KPI Row */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Ops</p>
                <Globe2 size={16} className="text-indigo-600" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 mb-1">{PORTFOLIO_METRICS.activeOperations}</p>
              <p className="text-sm font-semibold text-slate-500 flex items-center gap-1.5">
                <Users size={14} /> {PORTFOLIO_METRICS.personnelDeployed} field personnel
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Global Readiness</p>
                <ShieldCheck size={16} className="text-emerald-600" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 mb-1">{PORTFOLIO_METRICS.globalReadinessRate}%</p>
              <div className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                <TrendingUp size={14} /> {PORTFOLIO_METRICS.readinessDelta} vs last week
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Partner Trust</p>
                <Building2 size={16} className="text-indigo-600" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 mb-1">{PORTFOLIO_METRICS.partnerTrustIndex}</p>
              <p className="text-sm font-semibold text-slate-500">Average cross-agency score</p>
            </div>

            <div className={`rounded-xl border p-6 shadow-sm ${PORTFOLIO_METRICS.incidentMissions > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'}`}>
              <div className="flex justify-between items-start mb-4">
                <p className={`text-xs font-bold uppercase tracking-wider ${PORTFOLIO_METRICS.incidentMissions > 0 ? 'text-red-800' : 'text-slate-500'}`}>Critical Blocks</p>
                <ActivitySquare size={16} className={PORTFOLIO_METRICS.incidentMissions > 0 ? 'text-red-600' : 'text-slate-400'} />
              </div>
              <p className={`text-3xl font-extrabold mb-1 ${PORTFOLIO_METRICS.incidentMissions > 0 ? 'text-red-700' : 'text-slate-900'}`}>{PORTFOLIO_METRICS.incidentMissions}</p>
              <p className={`text-sm font-semibold ${PORTFOLIO_METRICS.incidentMissions > 0 ? 'text-red-600' : 'text-slate-500'}`}>Operations currently halted</p>
            </div>

          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            
            {/* Regional Health Table */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Regional Health Overview</h2>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">Readiness capability segmented by operational theater.</p>
                </div>
              </div>
              
              <div className="divide-y divide-slate-100">
                {REGIONAL_HEALTH.map((region, idx) => (
                  <div key={idx} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold text-slate-900">{region.region}</h3>
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded border ${
                        region.status === 'optimal' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        region.status === 'attention' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {region.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Ops</p>
                        <p className="text-lg font-bold text-slate-900">{region.operations}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Readiness</p>
                        <div className="flex items-center gap-2">
                          <p className={`text-lg font-bold ${region.readiness < 80 ? 'text-amber-600' : 'text-slate-900'}`}>{region.readiness}%</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Partner Trust</p>
                        <p className={`text-lg font-bold ${region.trust < 80 ? 'text-amber-600' : 'text-slate-900'}`}>{region.trust}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Concerns */}
            <div className="space-y-6">
              
              <h2 className="text-xl font-bold text-slate-900">Strategic Intelligence</h2>

              <div className="space-y-4">
                {STRATEGIC_CONCERNS.map((concern) => (
                  <div key={concern.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm relative overflow-hidden">
                    <div className={`absolute left-0 top-0 w-1 h-full ${concern.severity === 'high' ? 'bg-red-500' : 'bg-amber-400'}`} />
                    
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`mt-0.5 shrink-0 ${concern.severity === 'high' ? 'text-red-500' : 'text-amber-500'}`}>
                        <AlertTriangle size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-1">{concern.title}</h3>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed">{concern.context}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 ml-[34px]">
                      <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-1">System Recommendation</p>
                      <p className="text-sm font-bold text-slate-800 leading-relaxed">{concern.recommendation}</p>
                    </div>

                    <div className="mt-4 ml-[34px] flex gap-3">
                      <button className="text-xs font-bold uppercase tracking-wider text-slate-100 bg-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                        Authorize Action
                      </button>
                      <button className="text-xs font-bold uppercase tracking-wider text-slate-600 border border-slate-200 bg-white px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                        Request Staff Analysis
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
```
