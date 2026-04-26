// apps/web/src/app/collaboration/page.tsx
```tsx
import React from "react";
import { 
  Handshake, 
  Map, 
  ShieldCheck, 
  ArrowUpRight, 
  ChevronRight,
  Building2,
  AlertCircle,
  Radio,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { RoleSidebar } from "../../components/role-sidebar";

// Mock Data
const INBOUND_REQUESTS = [
  {
    id: "req_1",
    partner: "GlobalMedic Rapid Response",
    region: "Assam Flood Sector 7",
    requestType: "Shared Medical Supply Line",
    readinessTrust: 96,
    description: "Requesting to utilize your verified convoy routes for transporting level-2 trauma kits. They will provide 4x medics.",
  },
  {
    id: "req_2",
    partner: "Local Transport Union",
    region: "East Ridge Highway bypass",
    requestType: "Asset Contribution",
    readinessTrust: 65, // Lower trust implies need for stronger verification
    description: "Offering 10 heavy transport vehicles. Note: Their drivers have not yet passed the ReadyCheck routing verification.",
  }
];

const ACTIVE_PARTNERS = [
  {
    id: "part_1",
    name: "Red Cross (Regional Chapter)",
    overlap: "North River Belt",
    capabilities: ["Water Purification", "Temporary Shelters"],
    status: "Active Sync",
    sharedDeployments: 3,
    trustIndex: 98,
  },
  {
    id: "part_2",
    name: "AeroLift Logistics",
    overlap: "Sector 4 Harbor",
    capabilities: ["Drone Recon", "Airdrops"],
    status: "Standby",
    sharedDeployments: 1,
    trustIndex: 88,
  }
];

export default function CollaborationPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar Context */}
      <RoleSidebar currentRole="executive" userName="Elena Vance" />

      {/* Main Content */}
      <main className="ml-64 flex-1">
        
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <Handshake size={20} className="text-indigo-600" />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Cross-Agency Sync</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700">
              <Radio size={14} className="text-emerald-500" />
              Broadcasting Capabilities
            </div>
            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors">
              Initiate Joint Operation
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row gap-8">
            
            {/* Left Column: Inbound Requests */}
            <div className="flex-1 space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Inbound Coordination Requests</h2>
                  <p className="text-sm text-slate-500 font-medium mt-1">Agencies requesting shared resources or routing.</p>
                </div>
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm">
                  {INBOUND_REQUESTS.length}
                </div>
              </div>

              <div className="space-y-4">
                {INBOUND_REQUESTS.map((req) => (
                  <div key={req.id} className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 size={14} className="text-slate-400" />
                          <span className="text-sm font-bold text-slate-900">{req.partner}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                          <Map size={12} /> {req.region}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-sm">
                        <ShieldCheck size={14} className={req.readinessTrust > 80 ? 'text-emerald-500' : 'text-amber-500'} />
                        <span className="text-xs font-bold text-slate-700">Trust: {req.readinessTrust}</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 mb-2">{req.requestType}</p>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">"{req.description}"</p>
                      
                      {req.readinessTrust < 80 && (
                        <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-3 flex gap-3 items-start">
                          <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                          <p className="text-xs font-medium text-amber-800 leading-relaxed">
                            Warning: Partner's historical execution trust is below operational threshold. Enforce strict ReadyCheck verification for their personnel before granting route access.
                          </p>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-bold py-2.5 px-4 rounded-lg hover:bg-slate-800 transition-colors">
                          <CheckCircle2 size={16} /> Accept & Require Verification
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 text-sm font-bold py-2.5 px-4 rounded-lg hover:bg-slate-50 transition-colors">
                          <XCircle size={16} /> Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Active Partners & Overlap */}
            <div className="flex-1 space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Active Network & Integrity</h2>
                  <p className="text-sm text-slate-500 font-medium mt-1">Verified partner organizations deployed in shared sectors.</p>
                </div>
              </div>

              <div className="grid gap-4">
                {ACTIVE_PARTNERS.map((partner) => (
                  <div key={partner.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{partner.name}</h3>
                        <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-1">
                          <Map size={14} className="text-slate-400" /> Overlap: {partner.overlap}
                        </p>
                      </div>
                      <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {partner.capabilities.map((cap, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-600 border border-slate-200 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                          {cap}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${partner.status === 'Active Sync' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span className="text-sm font-bold text-slate-700">{partner.status}</span>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Joint Ops</p>
                          <p className="text-sm font-extrabold text-slate-900">{partner.sharedDeployments}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Trust</p>
                          <div className="flex items-center gap-1">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            <p className="text-sm font-extrabold text-slate-900">{partner.trustIndex}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 hover:text-slate-700 transition-colors">
                <ArrowUpRight size={16} /> Explore Regional Directory
              </button>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
```
