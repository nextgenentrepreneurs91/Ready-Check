// apps/web/src/app/driver/page.tsx
```tsx
import React from "react";
import { 
  MapRoute, 
  MapPin, 
  PackageOpen, 
  AlertTriangle, 
  ArrowRight,
  ShieldAlert,
  ListChecks,
  Truck,
  CheckCircle2,
  Clock
} from "lucide-react";
import { RoleSidebar } from "../../components/role-sidebar";

// Mock Data
const DRIVER_ASSIGNMENT = {
  missionId: "dep_8092",
  missionName: "Assam Flood: Emergency Food Distribution",
  roleName: "Lead Convoy Driver",
  status: "verification_required", // blocked, verification_required, cleared
  vehicleId: "HV-7A",
  commander: "Alex Mercer",
};

const ROUTE_DATA = {
  origin: "Sector 2 Logistics Hub",
  destination: "Sector 7 Shelter Point Alpha",
  estTime: "1h 45m",
  distance: "68 km",
  primaryHazard: "Route 9 completely flooded. Massive washout at junction point.",
  mandatoryDirective: "You MUST bypass via Elevated Highway 41. Do not attempt Route 9 under any circumstances.",
};

const CARGO_MANIFEST = [
  { id: "cm_1", item: "50x Level-2 Trauma Kits", verified: true },
  { id: "cm_2", item: "200x Emergency Ration Crates", verified: true },
  { id: "cm_3", item: "Portable VHF Repeaters", verified: false },
];

export default function DriverDashboardPage() {
  const isPending = DRIVER_ASSIGNMENT.status === "verification_required";
  const manifestReadyCount = CARGO_MANIFEST.filter(i => i.verified).length;

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar Context */}
      <RoleSidebar currentRole="driver" userName="Marcus Reynolds" />

      {/* Main Content */}
      <main className="ml-64 flex-1">
        
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <Truck size={20} className="text-slate-800" />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Transport Console</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-200 bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider">
              Vehicle: {DRIVER_ASSIGNMENT.vehicleId}
            </span>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">

          {/* Alert Hero Banner */}
          <div className="rounded-2xl border-2 border-red-600 bg-red-900 p-8 shadow-lg relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
            <ShieldAlert size={180} className="absolute -left-10 -bottom-10 text-red-500/10 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-100 border border-red-500/30 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <AlertTriangle size={14} /> Mandatory Dispatch Hold
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                Routing Verification Required
              </h2>
              <p className="text-red-100 font-medium text-lg leading-relaxed max-w-2xl">
                Recent weather data has invalidated standard transport paths. You must complete a routing understanding check before dispatch coordinates are unlocked.
              </p>
            </div>

            <button className="relative z-10 shrink-0 w-full md:w-auto bg-white hover:bg-red-50 text-red-900 font-extrabold px-6 py-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors text-base border border-red-200">
              Start Verification <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Left Column: Route & Hazards */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-200 px-6 py-4 bg-slate-50">
                  <MapRoute size={18} className="text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">Active Routing Directive</h3>
                </div>
                
                <div className="p-6">
                  {/* Visual Route Indicator */}
                  <div className="flex flex-col gap-1 mb-8 pl-2 relative before:absolute before:border-l-2 before:border-dashed before:border-slate-300 before:top-3 before:-bottom-3 before:left-3.5">
                    <div className="flex items-start gap-4 mb-6 relative bg-white">
                      <div className="h-4 w-4 rounded-full border-4 border-slate-300 bg-white shadow-sm mt-0.5 z-10" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">Origin</p>
                        <p className="text-base font-bold text-slate-900">{ROUTE_DATA.origin}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 relative bg-white">
                      <div className="h-4 w-4 rounded-full border-4 border-indigo-600 bg-white shadow-sm mt-0.5 z-10" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-0.5">Destination Target</p>
                        <p className="text-base font-bold text-slate-900">{ROUTE_DATA.destination}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 mb-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Total Distance</p>
                      <p className="text-lg font-extrabold text-slate-900">{ROUTE_DATA.distance}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Est Execution Time</p>
                      <p className="text-lg font-extrabold text-slate-900">{ROUTE_DATA.estTime}</p>
                    </div>
                  </div>

                  {/* Hazard Context block mapping to the Reality Check Idea */}
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
                    <h4 className="flex items-center gap-2 text-sm font-bold text-amber-900 mb-2 uppercase tracking-wider">
                      <AlertTriangle size={16} /> Imperative Hazard Warning
                    </h4>
                    <p className="text-sm font-medium text-amber-800 leading-relaxed mb-3">
                      {ROUTE_DATA.primaryHazard}
                    </p>
                    <div className="bg-white/60 rounded-lg p-3 text-sm font-bold text-slate-900 border border-amber-200/50">
                      {ROUTE_DATA.mandatoryDirective}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Column: Mission Meta & Cargo */}
            <div className="space-y-6">
              
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 border-b border-slate-100 pb-2">Mission Authority</h3>
                
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-1">Current Assignment</p>
                    <p className="text-sm font-bold text-slate-900">{DRIVER_ASSIGNMENT.missionName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-1">Coordinator Context</p>
                    <div className="flex items-center gap-2">
                       <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                         {DRIVER_ASSIGNMENT.commander.charAt(0)}
                       </span>
                       <span className="text-sm font-bold text-slate-800">{DRIVER_ASSIGNMENT.commander}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cargo Transport Checklist */}
              <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col">
                 <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                     <PackageOpen size={16} className="text-slate-600" />
                     <h3 className="text-sm font-bold text-slate-900">Cargo Manifest</h3>
                   </div>
                   <span className="text-xs font-bold text-slate-500 tracking-wider">
                     {manifestReadyCount}/{CARGO_MANIFEST.length}
                   </span>
                 </div>
                 
                 <div className="p-2">
                   {CARGO_MANIFEST.map((item) => (
                     <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg group cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                       <div className={`h-5 w-5 rounded shrink-0 border-2 flex items-center justify-center transition-colors ${
                         item.verified ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 bg-white'
                       }`}>
                         {item.verified && <CheckCircle2 size={14} className="text-white" />}
                       </div>
                       <span className={`text-sm font-semibold leading-snug ${item.verified ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                         {item.item}
                       </span>
                     </div>
                   ))}
                 </div>
                 
                 {manifestReadyCount !== CARGO_MANIFEST.length && (
                   <div className="bg-slate-50 px-6 py-3 border-t border-slate-100">
                     <p className="text-[11px] font-medium text-slate-500 leading-relaxed text-center">
                       Verify physical payload before requesting dispatch clearance.
                     </p>
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
