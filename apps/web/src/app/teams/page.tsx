// apps/web/src/app/teams/page.tsx
```tsx
import React from "react";
import { 
  Users, 
  Search, 
  Filter,
  ShieldCheck,
  AlertTriangle,
  UserPlus,
  CheckCircle2,
  Phone,
  Radio
} from "lucide-react";
import { RoleSidebar } from "../../components/role-sidebar";

// Mock Data
const OVERVIEW_METRICS = {
  totalRoster: 142,
  activelyDeployed: 34,
  availableReserves: 88,
  criticalGaps: 2, // e.g. "Missing Heavy Transport Drivers"
};

const ROLE_COVERAGE = [
  { role: "Convoy Driver", available: 18, deployed: 12, required: 20, status: "healthy" },
  { role: "Mobile Medic", available: 4, deployed: 6, required: 15, status: "critical_gap" },
  { role: "Logistics Coordinator", available: 8, deployed: 2, required: 5, status: "healthy" },
  { role: "Comms Operator", available: 2, deployed: 1, required: 4, status: "warning" },
];

const SUGGESTED_BUMPS = [
  {
    id: "bump_1",
    name: "Elena Rostova",
    currentRole: "Convoy Driver",
    suggestedRole: "Mobile Medic Trainee",
    reason: "Historical data shows she has basic EMS certs. We have a critical medic gap.",
    trustScore: 98,
  },
  {
    id: "bump_2",
    name: "Marcus Reynolds",
    currentRole: "Reserve Transport",
    suggestedRole: "Lead Convoy Driver",
    reason: "Perfect 100% routing verification on last 4 deployments.",
    trustScore: 100,
  }
];

const ROSTER = [
  { id: "usr_1", name: "Sarah Jenkins", role: "Mobile Medic", status: "Available", trust: 92, lastDeployed: "Oct 1" },
  { id: "usr_2", name: "David Kim", role: "Comms Operator", status: "Deployed (Sector 7)", trust: 88, lastDeployed: "Currently" },
  { id: "usr_3", name: "Anjali Patel", role: "Coordination", status: "Offline", trust: 95, lastDeployed: "Sep 15" },
  { id: "usr_4", name: "John Chen", role: "Convoy Driver", status: "Available", trust: 82, lastDeployed: "Oct 12" },
];

export default function TeamsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar Context */}
      <RoleSidebar currentRole="coordinator" userName="Alex Mercer" />

      {/* Main Content */}
      <main className="ml-64 flex-1">
        
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-indigo-600" />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Team Intelligence</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search roster..." 
                className="h-9 w-64 rounded-md border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <button className="flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <Filter size={16} /> Filter
            </button>
            <button className="flex h-9 items-center gap-2 rounded-md bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
              <UserPlus size={16} /> Add Personnel
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">

          {/* Quick Metrics */}
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Total Roster</p>
              <p className="text-3xl font-extrabold text-slate-900">{OVERVIEW_METRICS.totalRoster}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Actively Deployed</p>
              <p className="text-3xl font-extrabold text-indigo-600">{OVERVIEW_METRICS.activelyDeployed}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Available Reserves</p>
              <p className="text-3xl font-extrabold text-emerald-600">{OVERVIEW_METRICS.availableReserves}</p>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-red-800 mb-2">Critical Role Gaps</p>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={20} className="text-red-600" />
                  <p className="text-3xl font-extrabold text-red-700">{OVERVIEW_METRICS.criticalGaps}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Left: Role Coverage & Roster Table */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Coverage Progress Bars */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-bold text-slate-900 mb-6">Regional Role Coverage</h2>
                <div className="space-y-5">
                  {ROLE_COVERAGE.map((role, idx) => {
                    const total = role.available + role.deployed;
                    const percentFilled = Math.min((total / role.required) * 100, 100);
                    return (
                      <div key={idx}>
                        <div className="flex justify-between items-end mb-1">
                          <span className="text-sm font-bold text-slate-800">{role.role}</span>
                          <span className="text-xs font-semibold text-slate-500">
                            {total} / {role.required}
                          </span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                          <div 
                            className={`h-full ${role.status === 'critical_gap' ? 'bg-red-500' : role.status === 'warning' ? 'bg-amber-400' : 'bg-emerald-500'}`} 
                            style={{ width: `${percentFilled}%` }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Roster Table */}
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-900">Personnel Roster</h2>
                </div>
                
                <div className="grid grid-cols-12 gap-4 bg-white px-6 py-3 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <div className="col-span-4">Operator</div>
                  <div className="col-span-3">Primary Role</div>
                  <div className="col-span-3">Status</div>
                  <div className="col-span-2 text-right">Trust Index</div>
                </div>

                <div className="divide-y divide-slate-100">
                  {ROSTER.map((person) => (
                    <div key={person.id} className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-slate-50 transition-colors">
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
                          {person.name.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-900">{person.name}</span>
                      </div>
                      <div className="col-span-3 text-sm font-medium text-slate-600">
                        {person.role}
                      </div>
                      <div className="col-span-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${
                          person.status.includes('Available') ? 'bg-emerald-100 text-emerald-700' :
                          person.status.includes('Offline') ? 'bg-slate-100 text-slate-600' :
                          'bg-indigo-100 text-indigo-700'
                        }`}>
                          {person.status}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center justify-end gap-1">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        <span className="text-sm font-bold text-slate-900">{person.trust}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: AI Suggestions / Actions */}
            <div className="space-y-6">
              
              {/* AI Reassignments */}
              <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Radio size={18} className="text-indigo-600" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-900">AI Reassignment Logic</h2>
                </div>
                
                <p className="text-sm text-indigo-800 font-medium mb-6">
                  Based on current capability gaps and historical trust indexes, consider these optimal role adjustments to balance the grid.
                </p>

                <div className="space-y-4">
                  {SUGGESTED_BUMPS.map((bump) => (
                    <div key={bump.id} className="bg-white rounded-lg border border-indigo-100 p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-bold text-slate-900">{bump.name}</h3>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded text-[10px] font-bold">
                          Trust: {bump.trustScore}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
                        <span className="line-through">{bump.currentRole}</span>
                        <div className="h-[1px] w-4 bg-slate-300" />
                        <span className="text-indigo-600 font-bold">{bump.suggestedRole}</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-4 bg-slate-50 p-2 rounded border border-slate-100">{bump.reason}</p>
                      
                      <div className="flex gap-2">
                        <button className="flex-1 bg-indigo-600 text-white text-xs font-bold py-2 rounded shadow-sm hover:bg-indigo-700">
                          Approve
                        </button>
                        <button className="w-8 flex items-center justify-center border border-slate-200 bg-white text-slate-400 rounded hover:bg-slate-50">
                          &times;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">Broadcast Comm</h2>
                
                <button className="w-full mb-3 flex items-center gap-3 bg-slate-900 text-white p-3 rounded-lg hover:bg-slate-800 transition-colors">
                  <Phone size={16} />
                  <div className="text-left">
                    <p className="text-sm font-bold">Ping All Available Reserves</p>
                    <p className="text-xs text-slate-400">Push notification for standby status</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 border border-slate-200 bg-white p-3 rounded-lg hover:bg-slate-50 transition-colors text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <div className="text-left">
                    <p className="text-sm font-bold">Trigger Trust Recalculation</p>
                    <p className="text-xs text-slate-500">Update scores from latest debriefs</p>
                  </div>
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
