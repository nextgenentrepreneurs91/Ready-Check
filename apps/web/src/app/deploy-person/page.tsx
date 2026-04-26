// apps/web/src/app/deploy-person/page.tsx
```tsx
import React from "react";
import { 
  UserPlus, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  ActivitySquare,
  Crosshair,
  CalendarClock,
  ArrowRight
} from "lucide-react";
import { RoleSidebar } from "../../components/role-sidebar";

// Mock Data
const CANDIDATE_PROFILE = {
  id: "usr_91",
  name: "Marcus Reynolds",
  primaryDesignation: "Lead Convoy Driver",
  trustIndex: 98,
  status: "Available",
  lastDeployment: "Oct 12, 2026",
  completedTrainings: ["Heavy Transport", "Level-1 First Aid", "Crisis Communications"],
  flags: []
};

const TARGET_ASSIGNMENT = {
  missionId: "dep_8092",
  missionName: "Assam Flood: Emergency Food Distribution",
  targetRole: "Mobile Medic Trainee", // Edge case: Cross-deploying a driver as a medic due to shortage
  region: "North River Belt",
  coordinator: "Alex Mercer",
};

const READINESS_GATING = {
  roleFitScore: 65, // Low because his primary is Driver, not Medic
  constraints: [
    { id: "c1", label: "Baseline Background Check", passed: true },
    { id: "c2", label: "Prior experience in active theater", passed: true },
    { id: "c3", label: "Level-2 Trauma Certification", passed: false }, // Fails
  ],
  systemRecommendation: "RESTRICT_DEPLOYMENT" // Due to missing trauma cert
};

export default function DeployPersonPage() {
  const isBlocked = READINESS_GATING.systemRecommendation === "RESTRICT_DEPLOYMENT";

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar Context */}
      <RoleSidebar currentRole="coordinator" userName="Alex Mercer" />

      {/* Main Content */}
      <main className="ml-64 flex-1">
        
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <UserPlus size={20} className="text-indigo-600" />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Personnel Dispatch Matrix</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
              Cancel
            </button>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">

          {/* Top Banner mapping candidate to target */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between p-6">
            
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-slate-900 flex items-center justify-center text-xl font-bold text-white shadow-sm">
                {CANDIDATE_PROFILE.name.charAt(0)}
              </div>
              <div>
                 <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Candidate Profile</p>
                 <h2 className="text-xl font-bold text-slate-900">{CANDIDATE_PROFILE.name}</h2>
                 <p className="text-sm font-semibold text-slate-600 border border-slate-200 bg-slate-50 px-2 py-0.5 rounded mt-1 inline-block">
                   Primary: {CANDIDATE_PROFILE.primaryDesignation}
                 </p>
              </div>
            </div>

            <div className="px-6 flex shrink-0">
               <ArrowRight size={24} className="text-slate-300 hidden md:block" />
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                 <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">Target Mission & Role</p>
                 <h2 className="text-xl font-bold text-slate-900">{TARGET_ASSIGNMENT.targetRole}</h2>
                 <p className="text-sm font-semibold text-slate-600 border border-indigo-100 bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded mt-1 inline-block">
                   {TARGET_ASSIGNMENT.missionName}
                 </p>
              </div>
              <div className="h-14 w-14 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                <Crosshair size={24} />
              </div>
            </div>
            
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            
            {/* Left Column: Candidate Context */}
            <div className="space-y-6">
              
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 border-b border-slate-100 pb-2">Operational Context</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Status</p>
                    <p className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 size={14} /> {CANDIDATE_PROFILE.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Trust Index</p>
                    <p className="text-sm font-extrabold text-slate-900 flex items-center gap-1">
                      <ShieldCheck size={14} className="text-emerald-500" /> {CANDIDATE_PROFILE.trustIndex}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Last Deployment</p>
                    <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <CalendarClock size={14} className="text-slate-400" /> {CANDIDATE_PROFILE.lastDeployment}
                    </p>
                  </div>
                </div>

                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Verified Capabilities</p>
                <div className="flex flex-wrap gap-2">
                  {CANDIDATE_PROFILE.completedTrainings.map((t, idx) => (
                    <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-600 px-2 py-1 rounded text-xs font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Role Fit Analysis */}
              <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm relative overflow-hidden">
                <ActivitySquare size={120} className="absolute -right-6 -bottom-6 text-indigo-500/10" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-900 mb-4 relative z-10">AI Role Fit Analysis</h3>
                
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="text-4xl font-extrabold text-indigo-700">{READINESS_GATING.roleFitScore}</div>
                  <p className="text-sm font-medium text-indigo-800 leading-snug">
                    Moderate fit. Candidate has high generic operational trust but lacks the specific primary designation matching the target role (Medic).
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Readiness Gating & Dispatch */}
            <div className="space-y-6 flex flex-col h-full">
              
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex-1 flex flex-col">
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900">Pre-Deployment Gating Rules</h3>
                </div>

                <div className="p-6 flex-1 space-y-4">
                  {READINESS_GATING.constraints.map((constraint) => (
                    <div key={constraint.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                      <div className="mt-0.5 shrink-0">
                        {constraint.passed 
                          ? <CheckCircle2 size={18} className="text-emerald-500" />
                          : <XCircle size={18} className="text-red-500" />
                        }
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${constraint.passed ? 'text-slate-700' : 'text-red-900'}`}>
                          {constraint.label}
                        </p>
                        {!constraint.passed && (
                          <p className="text-xs font-semibold text-red-600 mt-1">Constraint mandatory for {TARGET_ASSIGNMENT.targetRole}.</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {isBlocked ? (
                  <div className="p-6 bg-red-50 border-t border-red-200">
                    <div className="flex items-center gap-2 text-red-800 font-bold mb-3 uppercase tracking-wider text-sm">
                      <AlertTriangle size={18} /> Protocol Block Active
                    </div>
                    <p className="text-sm font-medium text-red-700 leading-relaxed mb-6">
                      Candidate lacks mandatory active certifications for the target role. Submitting this deployment request is disabled by standard safety protocols.
                    </p>
                    <button disabled className="w-full bg-slate-200 text-slate-400 font-bold text-sm py-3.5 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed border border-slate-300">
                      Issue Deployment Order <ArrowRight size={16} />
                    </button>
                    
                    <button className="w-full mt-3 text-red-700 font-bold text-[11px] uppercase tracking-wider hover:underline text-center">
                      Request Executive Override
                    </button>
                  </div>
                ) : (
                  <div className="p-6 bg-emerald-50 border-t border-emerald-200">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold mb-3 uppercase tracking-wider text-sm">
                      <CheckCircle2 size={18} /> Candidate Cleared
                    </div>
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm">
                      Issue Deployment Order & Request Readiness Verification <ArrowRight size={16} />
                    </button>
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
