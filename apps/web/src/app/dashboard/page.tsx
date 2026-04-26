// apps/web/src/app/dashboard/page.tsx
```tsx
import React from "react";
import Link from "next/link";
import { 
  ShieldAlert, 
  ActivitySquare, 
  CheckCircle2, 
  AlertTriangle, 
  MapRoute,
  Users,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  MapPin
} from "lucide-react";
import { RoleSidebar } from "../../components/role-sidebar";

// Mock Data Models
const STATS = {
  activeDeployments: 4,
  readinessRate: 84, // Overall verification percentage
  blockedRoles: 3, // Number of critical roles that have failed understanding checks
  trustIndex: 92, // Rolling trust/reliability score
};

const CRITICAL_ALERTS = [
  {
    id: "al_1",
    severity: "critical", // blocked deployment
    title: "Deployment Blocked: Assam Food Supply",
    description: "4/6 Convoy Drivers repeatedly failed the routing check. The highway bypass instruction may be confusing.",
    actionRequested: "Review Action Card",
  },
  {
    id: "al_2",
    severity: "warning",
    title: "Regional Hazard Detected",
    description: "Route 9 washout reported by incoming units. System recommends updating active Medevac routes.",
    actionRequested: "Update Reality Config",
  }
];

const ACTIVE_MISSIONS = [
  {
    id: "dep_8092",
    name: "Assam Flood: Emergency Food",
    region: "North River Belt",
    status: "blocked",
    readiness: 65,
    teamSize: 24,
  },
  {
    id: "dep_8093",
    name: "Ridge Medical Relay",
    region: "East Ridge",
    status: "active",
    readiness: 100,
    teamSize: 12,
  },
  {
    id: "dep_8094",
    name: "Harbor Logistics Hub Setup",
    region: "Sector 4",
    status: "pending_verification",
    readiness: 88,
    teamSize: 40,
  }
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Role Sidebar Injection */}
      {/* Assuming the wrapper component handles layout passing, but explicitly included here for context integration */}
      <RoleSidebar currentRole="coordinator" userName="Alex Mercer" />

      {/* Main Content Area */}
      <main className="ml-64 flex-1">
        
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <ActivitySquare size={20} className="text-indigo-600" />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Command Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 tracking-wide border border-emerald-200">
              API STATUS: ONLINE
            </div>
            <Link 
              href="/planning"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              + New Deployment
            </Link>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">

          {/* Quick Metrics */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <TextLabel>Active Operations</TextLabel>
                <MapRoute size={16} className="text-indigo-600" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{STATS.activeDeployments}</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <TextLabel>Global Readiness</TextLabel>
                <ShieldCheck size={16} className="text-emerald-600" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{STATS.readinessRate}%</span>
                <span className="text-sm font-medium text-slate-500">verified</span>
              </div>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <TextLabel className="text-red-800">Critical Blocks</TextLabel>
                <AlertTriangle size={16} className="text-red-600 border-red-200" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-red-700">{STATS.blockedRoles}</span>
                <span className="text-sm font-medium text-red-600">roles pending</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <TextLabel>Trust Index</TextLabel>
                <TrendingUp size={16} className="text-indigo-600" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{STATS.trustIndex}</span>
                <span className="text-sm font-medium text-emerald-600">+2% 30d</span>
              </div>
            </div>

          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Main Deployments Panel */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Current Deployments</h2>
                <Link href="/deployments" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                  View all
                </Link>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col">
                <div className="grid grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-4">Operation Name</div>
                  <div className="col-span-2 text-right">Team</div>
                  <div className="col-span-3 text-right">Readiness</div>
                  <div className="col-span-2 text-right">Status</div>
                </div>
                
                <div className="divide-y divide-slate-100">
                  {ACTIVE_MISSIONS.map((mission) => (
                    <div key={mission.id} className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer block">
                      
                      <div className="col-span-1 text-xs font-medium text-slate-500">
                        {mission.id.split('_')[1]}
                      </div>
                      
                      <div className="col-span-4">
                        <p className="text-sm font-bold text-slate-900 truncate">{mission.name}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                          <MapPin size={10} />
                          <span className="truncate">{mission.region}</span>
                        </div>
                      </div>

                      <div className="col-span-2 text-right flex items-center justify-end gap-1.5 text-sm font-medium text-slate-600">
                        <Users size={14} className="text-slate-400" />
                        {mission.teamSize}
                      </div>

                      <div className="col-span-3 text-right">
                        <div className="flex items-center justify-end gap-2 text-sm font-medium text-slate-900 mb-1">
                          {mission.readiness}%
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex justify-end">
                          <div 
                            className={`h-full rounded-full ${mission.readiness === 100 ? 'bg-emerald-500' : mission.readiness < 70 ? 'bg-amber-500' : 'bg-indigo-500'}`} 
                            style={{ width: `${mission.readiness}%` }}
                          />
                        </div>
                      </div>

                      <div className="col-span-2 flex justify-end">
                         {mission.status === 'blocked' && <StatusBadge type="blocked">BLOCKED</StatusBadge>}
                         {mission.status === 'active' && <StatusBadge type="active">ACTIVE</StatusBadge>}
                         {mission.status === 'pending_verification' && <StatusBadge type="pending">PENDING</StatusBadge>}
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar / Alerts */}
            <div className="space-y-6">
              
              <h2 className="text-lg font-bold text-slate-900">Priority Grid</h2>
              
              <div className="space-y-4">
                {CRITICAL_ALERTS.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`rounded-xl border p-5 shadow-sm flex flex-col gap-3 ${
                      alert.severity

// apps/web/src/app/dashboard/page.tsx
```tsx
import React from "react";
import Link from "next/link";
import { 
  ShieldAlert, 
  ActivitySquare, 
  CheckCircle2, 
  AlertTriangle, 
  MapRoute,
  Users,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  MapPin
} from "lucide-react";
import { RoleSidebar } from "../../components/role-sidebar";

// Mock Data Models
const STATS = {
  activeDeployments: 4,
  readinessRate: 84, // Overall verification percentage
  blockedRoles: 3, // Number of critical roles that have failed understanding checks
  trustIndex: 92, // Rolling trust/reliability score
};

const CRITICAL_ALERTS = [
  {
    id: "al_1",
    severity: "critical", // blocked deployment
    title: "Deployment Blocked: Assam Food Supply",
    description: "4/6 Convoy Drivers repeatedly failed the routing check. The highway bypass instruction may be confusing.",
    actionRequested: "Review Action Card",
  },
  {
    id: "al_2",
    severity: "warning",
    title: "Regional Hazard Detected",
    description: "Route 9 washout reported by incoming units. System recommends updating active Medevac routes.",
    actionRequested: "Update Reality Config",
  }
];

const ACTIVE_MISSIONS = [
  {
    id: "dep_8092",
    name: "Assam Flood: Emergency Food",
    region: "North River Belt",
    status: "blocked",
    readiness: 65,
    teamSize: 24,
  },
  {
    id: "dep_8093",
    name: "Ridge Medical Relay",
    region: "East Ridge",
    status: "active",
    readiness: 100,
    teamSize: 12,
  },
  {
    id: "dep_8094",
    name: "Harbor Logistics Hub Setup",
    region: "Sector 4",
    status: "pending_verification",
    readiness: 88,
    teamSize: 40,
  }
];

// Inline Helper Components
function TextLabel({ children, className = "text-slate-600" }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`text-xs font-bold uppercase tracking-wider ${className}`}>
      {children}
    </span>
  );
}

function StatusBadge({ type, children }: { type: "blocked" | "active" | "pending", children: React.ReactNode }) {
  const styles = {
    blocked: "bg-red-50 text-red-700 border-red-200",
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest border ${styles[type]}`}>
      {children}
    </span>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Role Sidebar Injection */}
      <RoleSidebar currentRole="coordinator" userName="Alex Mercer" />

      {/* Main Content Area */}
      <main className="ml-64 flex-1">
        
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <ActivitySquare size={20} className="text-indigo-600" />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Command Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 tracking-wide border border-emerald-200">
              API STATUS: ONLINE
            </div>
            <Link 
              href="/planning"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              + New Deployment
            </Link>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">

          {/* Quick Metrics */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <TextLabel>Active Operations</TextLabel>
                <MapRoute size={16} className="text-indigo-600" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{STATS.activeDeployments}</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <TextLabel>Global Readiness</TextLabel>
                <ShieldCheck size={16} className="text-emerald-600" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{STATS.readinessRate}%</span>
                <span className="text-sm font-medium text-slate-500">verified</span>
              </div>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <TextLabel className="text-red-800">Critical Blocks</TextLabel>
                <AlertTriangle size={16} className="text-red-600 border-red-200" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-red-700">{STATS.blockedRoles}</span>
                <span className="text-sm font-medium text-red-600">roles pending</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <TextLabel>Trust Index</TextLabel>
                <TrendingUp size={16} className="text-indigo-600" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{STATS.trustIndex}</span>
                <span className="text-sm font-medium text-emerald-600">+2% 30d</span>
              </div>
            </div>

          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Main Deployments Panel */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Current Deployments</h2>
                <Link href="/deployments" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                  View all
                </Link>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col">
                <div className="grid grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-4">Operation Name</div>
                  <div className="col-span-2 text-right">Team</div>
                  <div className="col-span-3 text-right">Readiness</div>
                  <div className="col-span-2 text-right">Status</div>
                </div>
                
                <div className="divide-y divide-slate-100">
                  {ACTIVE_MISSIONS.map((mission) => (
                    <div key={mission.id} className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                      
                      <div className="col-span-1 text-xs font-medium text-slate-400 group-hover:text-slate-600">
                        {mission.id.split('_')[1]}
                      </div>
                      
                      <div className="col-span-4">
                        <p className="text-sm font-bold text-slate-900 truncate">{mission.name}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                          <MapPin size={10} />
                          <span className="truncate">{mission.region}</span>
                        </div>
                      </div>

                      <div className="col-span-2 text-right flex items-center justify-end gap-1.5 text-sm font-medium text-slate-600">
                        <Users size={14} className="text-slate-400" />
                        {mission.teamSize}
                      </div>

                      <div className="col-span-3 text-right pr-2">
                        <div className="flex items-center justify-end gap-2 text-sm font-bold text-slate-900 mb-1.5">
                          {mission.readiness}%
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex justify-end">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              mission.readiness === 100 
                                ? 'bg-emerald-500' 
                                : mission.readiness < 70 
                                  ? 'bg-amber-500' 
                                  : 'bg-indigo-500'
                            }`} 
                            style={{ width: `${mission.readiness}%` }}
                          />
                        </div>
                      </div>

                      <div className="col-span-2 flex justify-end">
                         {mission.status === 'blocked' && <StatusBadge type="blocked">BLOCKED</StatusBadge>}
                         {mission.status === 'active' && <StatusBadge type="active">ACTIVE</StatusBadge>}
                         {mission.status === 'pending_verification' && <StatusBadge type="pending">PENDING</StatusBadge>}
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar / Priority Grid */}
            <div className="space-y-6">
              
              <h2 className="text-lg font-bold text-slate-900">Priority Grid</h2>
              
              <div className="space-y-4">
                {CRITICAL_ALERTS.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`rounded-xl border p-5 shadow-sm flex flex-col gap-3 ${
                      alert.severity === 'critical' 
                        ? 'bg-red-50 border-red-200' 
                        : 'bg-amber-50 border-amber-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {alert.severity === 'critical' 
                           ? <ShieldAlert size={18} className="text-red-600" /> 
                           : <AlertTriangle size={18} className="text-amber-600" />
                        }
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-sm font-bold ${
                          alert.severity === 'critical' ? 'text-red-900' : 'text-amber-900'
                        }`}>
                          {alert.title}
                        </h3>
                        <p className={`mt-1 text-sm leading-relaxed ${
                          alert.severity === 'critical' ? 'text-red-800/80' : 'text-amber-800/80'
                        }`}>
                          {alert.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex justify-end">
                      <button className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-colors ${
                        alert.severity === 'critical' 
                          ? 'bg-red-100 text-red-800 hover:bg-red-200'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}>
                        {alert.actionRequested}
                        <ArrowRight size={14} />
                      </button>
                    </div>

                  </div>
                ))}

                {CRITICAL_ALERTS.length === 0 && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 flex flex-col items-center justify-center text-center shadow-sm">
                    <CheckCircle2 size={32} className="text-emerald-500 mb-3" />
                    <p className="text-emerald-900 font-bold text-sm">All operations stable.</p>
                    <p className="text-emerald-700 text-sm mt-1">No critical blocks detected.</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
```
