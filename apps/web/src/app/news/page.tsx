// apps/web/src/app/news/page.tsx
```tsx
import React from "react";
import { 
  Globe2, 
  Map, 
  AlertTriangle, 
  Wind, 
  ThermometerSun,
  BrainCircuit,
  Filter,
  CheckCircle2,
  Radio
} from "lucide-react";
import { RoleSidebar } from "../../components/role-sidebar";

// Mock Data
const ENVIRONMENTAL_CONTEXT = {
  region: "North River Belt",
  temperature: "32°C / 90°F",
  weather: "Heavy Monsoon Warning",
  visibility: "Severely Reduced (< 1km)",
  lastUpdated: "10 mins ago"
};

const HAZARD_FEED = [
  {
    id: "haz_1",
    severity: "critical",
    category: "Infrastructure",
    location: "Route 9 Junction (Sector 4)",
    timestamp: "2 hours ago",
    content: "Route completely washed out due to excessive river swelling. Impassable for all standard logistics vehicles. Utilize Highway 41 Bypass.",
    source: "Field Report via 'Red Cross Transport'"
  },
  {
    id: "haz_2",
    severity: "warning",
    category: "Communications",
    location: "Sector 7 Ridge",
    timestamp: "5 hours ago",
    content: "Intermittent VHF radio signal degradation caused by atmospheric interference. Brief field personnel on absolute drop-dead coordination timings.",
    source: "Telecom Telemetry Node 4"
  },
  {
    id: "haz_3",
    severity: "info",
    category: "Logistics",
    location: "Harbor Hub Alpha",
    timestamp: "12 hours ago",
    content: "Congestion clearing. Unloading times have returning to the nominal rate of 15 vehicles per hour. Cold-chain storage is currently at 88% capacity.",
    source: "Automated Hub Scanner"
  }
];

export default function RegionalNewsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar Context */}
      <RoleSidebar currentRole="coordinator" userName="Alex Mercer" />

      {/* Main Content */}
      <main className="ml-64 flex-1">
        
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <Globe2 size={20} className="text-indigo-600" />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Regional Data Feed</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Sync
            </span>
            <button className="flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <Filter size={16} /> Filter by Region
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">

          {/* Top Info Strip */}
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Environment Overview */}
            <div className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                   <Map size={24} className="text-slate-600" />
                 </div>
                 <div>
                   <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">Active Theater</h2>
                   <p className="text-xl font-extrabold text-slate-900">{ENVIRONMENTAL_CONTEXT.region}</p>
                 </div>
               </div>
               
               <div className="flex gap-8">
                 <div>
                   <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                     <ThermometerSun size={14} /> Temp
                   </div>
                   <p className="text-base font-bold text-slate-900">{ENVIRONMENTAL_CONTEXT.temperature}</p>
                 </div>
                 <div>
                   <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                     <Wind size={14} /> Conditions
                   </div>
                   <p className="text-base font-bold text-slate-900">{ENVIRONMENTAL_CONTEXT.weather}</p>
                 </div>
               </div>
            </div>

            {/* AI Grounding Context */}
            <div className="w-80 rounded-xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <BrainCircuit size={18} className="text-indigo-600" />
                <h3 className="text-sm font-bold text-indigo-900">AI Grounding Engine</h3>
              </div>
              <p className="text-xs text-indigo-800 font-medium leading-relaxed">
                The ReadyCheck AI uses this exact telemetry feed as grounding context to correct your deployment drafts and prevent contradictory routing checks.
              </p>
            </div>

          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Primary Hazard Feed */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Radio size={18} className="text-slate-400" /> Latest Field Bulletins
              </h2>
              
              <div className="space-y-4">
                {HAZARD_FEED.map((item) => {
                  const isCritical = item.severity === "critical";
                  const isWarn = item.severity === "warning";
                  
                  return (
                    <div key={item.id} className={`rounded-xl border bg-white shadow-sm overflow-hidden flex flex-col transition-colors hover:bg-slate-50 ${
                      isCritical ? 'border-red-200' : isWarn ? 'border-amber-200' : 'border-slate-200'
                    }`}>
                      
                      <div className={`px-6 py-3 border-b flex justify-between items-center ${
                         isCritical ? 'bg-red-50/50 border-red-100' : isWarn ? 'bg-amber-50/50 border-amber-100' : 'bg-slate-50/80 border-slate-100'
                      }`}>
                         <span className={`text-xs font-bold uppercase tracking-wider ${
                           isCritical ? 'text-red-700' : isWarn ? 'text-amber-700' : 'text-slate-600'
                         }`}>
                           {item.category} Note
                         </span>
                         <span className="text-[11px] font-semibold text-slate-400">
                           {item.timestamp}
                         </span>
                      </div>

                      <div className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`mt-0.5 shrink-0 ${isCritical ? 'text-red-600' : isWarn ? 'text-amber-600' : 'text-indigo-600'}`}>
                            {isCritical || isWarn ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-1.5">
                              <Map size={14} /> {item.location}
                            </p>
                            <p className="text-base font-bold text-slate-900 leading-relaxed">
                              "{item.content}"
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                          <p className="text-xs font-semibold text-slate-400">
                            Source: <span className="font-bold text-slate-500">{item.source}</span>
                          </p>
                          
                          {/* Integration Hook */}
                          {(isCritical || isWarn) && (
                            <button className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded hover:bg-indigo-100 transition-colors">
                              Update Active Deployments
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inferred Context Widget */}
            <div className="space-y-6">
              
              <h2 className="text-lg font-bold text-slate-900">System Activity</h2>
              
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                 <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 border-b border-slate-100 pb-2">
                   Live Deductions
                 </h3>
                 
                 <div className="space-y-5">
                   <div className="relative pl-6 before:absolute before:left-[11px] before:top-2 before:-bottom-7 before:w-[2px] before:bg-slate-100 last:before:hidden">
                     <span className="absolute left-1 top-1.5 h-3 w-3 rounded-full bg-slate-300 ring-4 ring-white" />
                     <p className="text-sm font-semibold text-slate-900 mb-1">Route 9 Invalidation</p>
                     <p className="text-xs text-slate-500 leading-relaxed">System marked Route 9 as impassable in global routing checks based on Field Report #haz_1.</p>
                   </div>
                   
                   <div className="relative pl-6 before:absolute before:left-[11px] before:top-2 before:-bottom-7 before:w-[2px] before:bg-slate-100 last:before:hidden">
                     <span className="absolute left-1 top-1.5 h-3 w-3 rounded-full bg-indigo-500 ring-4 ring-white" />
                     <p className="text-sm font-semibold text-slate-900 mb-1">Cold-Chain Status Verified</p>
                     <p className="text-xs text-slate-500 leading-relaxed">Harbor storage has ample room for medical influx. Coordinator prompts updated to reflect availability.</p>
                   </div>
                   
                   <div className="relative pl-6 before:absolute before:left-[11px] before:top-2 before:-bottom-7 before:w-[2px] before:bg-slate-100 last:before:hidden">
                     <span className="absolute left-1 top-1.5 h-3 w-3 rounded-full bg-slate-300 ring-4 ring-white" />
                     <p className="text-sm font-semibold text-slate-900 mb-1">New Baseline Scan</p>
                     <p className="text-xs text-slate-500 leading-relaxed">Ingesting regional traffic data from Partner API stream.</p>
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
