// apps/web/src/app/assessments/page.tsx
```tsx
import React from "react";
import { 
  ClipboardCheck, 
  Search, 
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  ShieldAlert,
  Users
} from "lucide-react";
import { RoleSidebar } from "../../components/role-sidebar";

// Mock Data
const SUMMARY_STATS = {
  totalPending: 42,
  verifiedToday: 128,
  clarificationsNeeded: 7,
};

const ASSESSMENT_SETS = [
  {
    id: "set_01",
    mission: "Assam Flood Supply Operations",
    role: "Convoy Driver",
    totalAssigned: 12,
    completed: 8,
    failed: 4, // "Needs Clarification"
    status: "BLOCKED", // Blocked because of the failures
    criticalQuestion: "If Route 9 is heavily flooded during your transit, what is your mandatory fallback protocol?",
  },
  {
    id: "set_02",
    mission: "Assam Flood Supply Operations",
    role: "Mobile Medic",
    totalAssigned: 6,
    completed: 6,
    failed: 0,
    status: "VERIFIED",
    criticalQuestion: "What is your primary responsibility upon reaching the shelter hub?",
  },
  {
    id: "set_03",
    mission: "Harbor Evacuation Setup",
    role: "Logistics Coordinator",
    totalAssigned: 4,
    completed: 1,
    failed: 0,
    status: "PENDING",
    criticalQuestion: "Which zone is exclusively reserved for Level 1 trauma inbound?",
  }
];

const RECENT_SUBMISSIONS = [
  { id: "sub_1", name: "Marcus Reynolds", role: "Convoy Driver", status: "needs_clarification", time: "2m ago" },
  { id: "sub_2", name: "Sarah Jenkins", role: "Convoy Driver", status: "verified", time: "5m ago" },
  { id: "sub_3", name: "Dr. Aris Thorne", role: "Mobile Medic", status: "verified", time: "14m ago" },
  { id: "sub_4", name: "John Chen", role: "Convoy Driver", status: "needs_clarification", time: "18m ago" },
];

export default function AssessmentsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar Context */}
      <RoleSidebar currentRole="coordinator" userName="Alex Mercer" />

      {/* Main Content */}
      <main className="ml-64 flex-1">
        
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <ClipboardCheck size={20} className="text-indigo-600" />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Live Readiness Grid</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search assessments..." 
                className="h-9 w-64 rounded-md border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <button className="flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">

          {/* Top KPI row */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
                <Clock size={24} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Pending Verification</p>
                <p className="text-2xl font-extrabold text-slate-900">{SUMMARY_STATS.totalPending}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2 size={24} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Verified Today</p>
                <p className="text-2xl font-extrabold text-slate-900">{SUMMARY_STATS.verifiedToday}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-red-200 bg-red-50 p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertCircle size={24} className="text-red-700" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-red-800">Review Required</p>
                <p className="text-2xl font-extrabold text-red-700">{SUMMARY_STATS.clarificationsNeeded}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Mission Roles Verification Matrix */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Role Verification Status</h2>
              
              <div className="space-y-4">
                {ASSESSMENT_SETS.map((set) => {
                  const percentComplete = Math.round(((set.completed + set.failed) / set.totalAssigned) * 100);
                  const isBlocked = set.status === "BLOCKED";
                  const isVerified = set.status === "VERIFIED";
                  const isPending = set.status === "PENDING";
                  
                  return (
                    <div key={set.id} className={`rounded-xl border bg-white p-6 shadow-sm ${isBlocked ? 'border-red-200 shadow-red-100/50' : 'border-slate-200'}`}>
                      
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{set.mission}</span>
                            {isBlocked && <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold tracking-widest text-red-700 uppercase">Blocked</span>}
                            {isVerified && <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold tracking-widest text-emerald-700 uppercase">Cleared</span>}
                            {isPending && <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold tracking-widest text-amber-700 uppercase">In Progress</span>}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900">{set.role}</h3>
                        </div>
                        <button className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                          View set <ChevronRight size={16} />
                        </button>
                      </div>

                      <div className="mb-5 rounded-lg bg-slate-50 p-4 border border-slate-100">
                        <div className="flex items-start gap-3">
                          <AlertCircle size={16} className="mt-0.5 text-indigo-500" />
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Primary Verification Question</p>
                            <p className="text-sm font-medium text-slate-900">"{set.criticalQuestion}"</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-end justify-between">
                        <div className="flex gap-6">
                          <div>
                            <p className="text-xs font-bold uppercase text-slate-500 mb-1">Total Assigned</p>
                            <div className="flex items-center gap-1.5 font-bold text-slate-900">
                              <Users size={14} className="text-slate-400" /> {set.totalAssigned}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase text-emerald-600 mb-1">Verified</p>
                            <p className="font-bold text-emerald-700">{set.completed}</p>
                          </div>
                          <div>
                            <p className={`text-xs font-bold uppercase mb-1 ${set.failed > 0 ? 'text-red-600' : 'text-slate-500'}`}>Flagged</p>
                            <p className={`font-bold ${set.failed > 0 ? 'text-red-700' : 'text-slate-900'}`}>{set.failed}</p>
                          </div>
                        </div>

                        <div className="w-1/3">
                          <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                            <span>Progress</span>
                            <span>{percentComplete}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 flex">
                            <div className="h-full bg-emerald-500" style={{ width: `${(set.completed / set.totalAssigned) * 100}%` }} />
                            <div className="h-full bg-red-500" style={{ width: `${(set.failed / set.totalAssigned) * 100}%` }} />
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Incoming Feed */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                Live Submissions
              </h2>

              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
                <div className="divide-y divide-slate-100">
                  {RECENT_SUBMISSIONS.map((sub) => (
                    <div key={sub.id} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {sub.status === "verified" 
                            ? <CheckCircle2 size={16} className="text-emerald-500" />
                            : <ShieldAlert size={16} className="text-red-500" />
                          }
                          <span className="text-sm font-bold text-slate-900">{sub.name}</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-400">{sub.time}</span>
                      </div>
                      <div className="pl-6 flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-500">{sub.role}</span>
                        {sub.status === "needs_clarification" && (
                          <button className="text-[10px] font-bold tracking-wider uppercase text-indigo-600 hover:text-indigo-800">
                            Review Answer
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 bg-slate-50 p-3 text-center">
                  <button className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-700">
                    Load All Activity
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
```
