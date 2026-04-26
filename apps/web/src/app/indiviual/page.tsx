// apps/web/src/app/individual/page.tsx
```tsx
import React from "react";
import { 
  UserCircle, 
  MapPin, 
  ShieldCheck, 
  HeartPulse, 
  GraduationCap, 
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Clock
} from "lucide-react";
import { RoleSidebar } from "../../components/role-sidebar";

// Mock Data
const NEARBY_INITIATIVES = [
  {
    id: "init_1",
    title: "Sandbagging & Flood Barrier Setup",
    agency: "Red Cross Regional",
    location: "Sector 4 Banks (2.4 miles away)",
    urgency: "High",
    rolesNeeded: ["General Labor", "Traffic Marshall"],
    status: "Accepting Volunteers",
  },
  {
    id: "init_2",
    title: "Emergency Shelter Provisions Intake",
    agency: "GlobalMedic",
    location: "City Ridge High School (4.1 miles away)",
    urgency: "Medium",
    rolesNeeded: ["Inventory Sorting", "Basic First Aid"],
    status: "Accepting Volunteers",
  }
];

const ONBOARDING_PROGRESS = {
  profileComplete: true,
  backgroundVerify: "Pending", // Pending | Cleared
  trainingScore: 0, // e.g., ReadyCheck basic training
};

export default function IndividualDashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar Context */}
      <RoleSidebar currentRole="individual" userName="John Citizen" />

      {/* Main Content */}
      <main className="ml-64 flex-1">
        
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <UserCircle size={20} className="text-slate-800" />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Citizen Volunteer Portal</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
              Status: <span className="text-amber-600">Pending Background Check</span>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto space-y-8">

          {/* Welcome & Trust Framing */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 md:w-3/5">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Ready to contribute?</h2>
              <p className="text-slate-600 font-medium leading-relaxed mb-6">
                In disaster environments, good intentions aren't enough. We operate on a strict framework of verifiable readiness to ensure everyone's safety. Complete your basic training modules to unlock active deployment opportunities.
              </p>

              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors">
                  <GraduationCap size={18} /> Start Basic Training
                </button>
              </div>
            </div>

            {/* Checklist / Onboarding Progress */}
            <div className="bg-slate-50 p-8 md:w-2/5 border-t md:border-t-0 md:border-l border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Clearance Status</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                     <ShieldCheck size={14} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Profile Complete</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                   <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200">
                     <Clock size={14} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Background Verification</p>
                    <p className="text-xs font-semibold text-slate-500">Processing...</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 opacity-60">
                   <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center border-2 border-slate-300">
                     <span className="w-2 h-2 rounded-full bg-slate-300" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">ReadyCheck Safety Protocol</p>
                    <p className="text-xs font-semibold text-slate-500">Requires background clearance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Nearby Opportunities */}
            <div className="lg:w-2/3 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <HeartPulse size={20} className="text-indigo-600" /> Nearby Active Operations
                </h2>
              </div>

              <div className="space-y-4">
                {NEARBY_INITIATIVES.map((init) => (
                  <div key={init.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{init.agency}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            init.urgency === 'High' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}>
                            {init.urgency} Priority
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase">{init.title}</h3>
                      </div>
                      <button className="shrink-0 text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-1">
                        View Details <ChevronRight size={16} />
                      </button>
                    </div>

                    <div className="flexflex-col sm:flex-row gap-4 border-t border-slate-100 pt-4 mt-2">
                       <p className="text-sm font-semibold text-slate-600 flex items-center gap-1.5 mb-2 sm:mb-0">
                         <MapPin size={16} className="text-slate-400" /> {init.location}
                       </p>
                       <div className="flex items-center gap-2">
                         <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Needed Roles:</span>
                         {init.rolesNeeded.map((role, idx) => (
                           <span key={idx} className="bg-slate-100 text-slate-600 px-2 py-1 border border-slate-200 rounded text-[11px] font-bold">
                             {role}
                           </span>
                         ))}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Information */}
            <div className="lg:w-1/3 space-y-6">
              
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl flex items-start gap-3 shadow-sm">
                <AlertTriangle size={20} className="text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-amber-900 mb-1">Safety First</h3>
                  <p className="text-sm text-amber-800 font-medium leading-relaxed">
                    Never self-deploy to a disaster zone without verification through the ReadyCheck platform. Uncoordinated arrivals severely impact professional rescue logistics.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 border-b border-slate-100 pb-2">Community Impact</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-emerald-500" />
                    <span className="text-sm font-bold text-slate-700">Civilians Helping</span>
                  </div>
                  <span className="text-sm font-extrabold text-slate-900">4,281</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-indigo-500" />
                    <span className="text-sm font-bold text-slate-700">Verified Cleared</span>
                  </div>
                  <span className="text-sm font-extrabold text-slate-900">3,904</span>
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
