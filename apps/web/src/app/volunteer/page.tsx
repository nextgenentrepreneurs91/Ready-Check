// apps/web/src/app/volunteer/page.tsx
```tsx
import React from "react";
import { 
  ShieldCheck, 
  MapPin, 
  Target, 
  ClipboardCheck, 
  ArrowRight,
  AlertCircle,
  PackageOpen,
  CheckCircle2,
  Clock
} from "lucide-react";
import { RoleSidebar } from "../../components/role-sidebar";

// Mock Data
const ASSIGNMENT = {
  missionId: "dep_8092",
  missionName: "Assam Flood: Emergency Food Distribution",
  region: "North River Belt (Sector 7)",
  roleName: "Mobile Medic",
  status: "pending_verification", // pending_verification, ready, active
  reportTime: "14:00 Local",
  commander: "Alex Mercer",
};

const ACTION_CARD_SUMMARY = {
  objective: "Distribute emergency rationing kits and conduct structural triage in isolated villages.",
  responsibilities: [
    "Manage cold-chain storage for incoming field vaccines.",
    "Triage level-1 injuries at the central shelter hub.",
    "Do not separate from convoy transport."
  ],
  hazards: "Highway bypass route must be used. Heavy waterlogging on Route 9."
};

const PHYSICAL_CHECKLIST = [
  { id: "c_1", label: "Medical Jump Bag (Sealed)", checked: true },
  { id: "c_2", label: "VHF Radio (Charged)", checked: true },
  { id: "c_3", label: "High-visibility Operations Vest", checked: false },
];

export default function VolunteerDashboardPage() {
  const isPending = ASSIGNMENT.status === "pending_verification";
  const checklistCheckedCount = PHYSICAL_CHECKLIST.filter(i => i.checked).length;
  
  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar Context */}
      <RoleSidebar currentRole="volunteer" userName="Sarah Jenkins" />

      {/* Main Content */}
      <main className="ml-64 flex-1">
        
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-emerald-600" />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Operator Console</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
              <Clock size={14} /> Report by {ASSIGNMENT.reportTime}
            </span>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">

          {/* Hero Banner / Status */}
          <div className={`rounded-2xl border p-8 shadow-sm relative overflow-hidden ${
             isPending ? 'bg-indigo-900 border-indigo-800' : 'bg-emerald-900 border-emerald-800'
          }`}>
             {/* Decorative Background Icon */}
             <ShieldCheck size={200} className="absolute -right-8 -top-12 text-white/5" />
             
             <div className="relative z-10 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
               <div>
                 <p className="text-sm font-bold uppercase tracking-widest text-indigo-300 mb-2">Current Assignment</p>
                 <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                   {ASSIGNMENT.missionName}
                 </h2>
                 <p className="text-base text-indigo-100 font-medium flex items-center gap-2">
                   <MapPin size={16} /> {ASSIGNMENT.region}
                 </p>
               </div>
               
               <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center min-w-[200px]">
                 <p className="text-xs font-bold uppercase tracking-wider text-indigo-200 mb-1">Your Role</p>
                 <p className="text-xl font-bold text-white">{ASSIGNMENT.roleName}</p>
                 <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500 text-amber-950 text-xs font-bold uppercase tracking-wider">
                   <AlertCircle size={14} /> Verification Required
                 </div>
               </div>
             </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Left Column: Briefing & Checklists */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-4">
                  <Target size={18} className="text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">Mission Specifics</h3>
                </div>
                
                <p className="text-sm font-medium text-slate-700 leading-relaxed mb-6">
                  {ACTION_CARD_SUMMARY.objective}
                </p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Key Responsibilities</h4>
                <ul className="space-y-2 mb-6">
                  {ACTION_CARD_SUMMARY.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-slate-700">
                      <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-lg bg-red-50 border border-red-200 p-4 flex gap-3 items-start">
                  <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-red-900 mb-1">Critical Hazard Warning</h4>
                    <p className="text-sm text-red-800 font-medium leading-relaxed">{ACTION_CARD_SUMMARY.hazards}</p>
                  </div>
                </div>
              </div>

              {/* Physical Checklist Box */}
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
                 <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                     <PackageOpen size={18} className="text-slate-600" />
                     <h3 className="text-sm font-bold text-slate-900">Required Gear Manifest</h3>
                   </div>
                   <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                     {checklistCheckedCount} / {PHYSICAL_CHECKLIST.length} Secured
                   </span>
                 </div>
                 <div className="p-2">
                   {PHYSICAL_CHECKLIST.map((item) => (
                     <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg group cursor-pointer">
                       <div className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                         item.checked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 bg-white'
                       }`}>
                         {item.checked && <CheckCircle2 size={14} className="text-white" />}
                       </div>
                       <span className={`text-sm font-semibold transition-colors ${item.checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                         {item.label}
                       </span>
                     </div>
                   ))}
                 </div>
              </div>

            </div>

            {/* Right Column: Next Action */}
            <div className="space-y-6">
              
              <div className="rounded-xl border-2 border-indigo-600 bg-white p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600" />
                
                <h3 className="text-base font-bold text-slate-900 mb-2">Next Step: Verification</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
                  You are required to verify your understanding of this Action Card before your operational status can be cleared for dispatch.
                </p>

                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
                  Start Readiness Verification <ArrowRight size={16} />
                </button>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 border-b border-slate-100 pb-2">Command Chain</h3>
                
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
                    {ASSIGNMENT.commander.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{ASSIGNMENT.commander}</p>
                    <p className="text-xs font-medium text-slate-500">Operation Coordinator</p>
                  </div>
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
