// apps/web/src/app/plan/page.tsx
```tsx
"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Target, 
  Users, 
  ShieldAlert, 
  Package, 
  Sparkles, 
  CheckCircle2,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { RoleSidebar } from "../../components/role-sidebar";
import { AIFab } from "../../components/ai-fab";

// Initial mock state simulating an AI-assisted draft
const INITIAL_DRAFT = {
  objective: "Distribute emergency rationing and establish structural triage points in isolated sectors.",
  location: "Sector 7 (North River Belt)",
  risks: [
    { severity: "high", desc: "Route 9 is compromised due to heavy waterlogging. Bypassing via Highway 41 is mandatory." },
    { severity: "medium", desc: "Expected communication blackouts post 18:00 Local time." }
  ],
  roles: [
    { name: "Convoy Driver", count: 6, verified: 0 },
    { name: "Mobile Medic", count: 4, verified: 0 },
    { name: "Logistics Coordinator", count: 2, verified: 0 }
  ],
  resources: ["500x Emergency Rations", "Level-2 Trauma Kits", "VHF Radios"]
};

export default function PlanningPage() {
  const [objective, setObjective] = useState(INITIAL_DRAFT.objective);
  const [location, setLocation] = useState(INITIAL_DRAFT.location);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar Context */}
      <RoleSidebar currentRole="coordinator" userName="Alex Mercer" />

      {/* AI Assistant Overlay */}
      <AIFab 
        isExpanded={aiPanelOpen} 
        onToggle={setAiPanelOpen} 
        label="AI Reality Check" 
      />

      {/* Main Content */}
      <main className="ml-64 flex-1">
        
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-800 text-[10px] font-bold text-white">
              NEW
            </span>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Deployment Planner</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-sm font-bold text-slate-500 hover:text-slate-800">
              Save Draft
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors">
              <CheckCircle2 size={16} /> Sub-divide & Generate Readiness Checks
            </button>
          </div>
        </header>

        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
          
          {/* Editor Canvas */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="mx-auto max-w-4xl space-y-8">
              
              {/* Mission Core */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Target size={18} className="text-indigo-600" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Mission Parameters</h2>
                </div>
                
                <div className="grid gap-6">
                  <div>
                    <label className="mb-1 block text-sm font-bold text-slate-700">Primary Objective</label>
                    <textarea 
                      value={objective}
                      onChange={(e) => setObjective(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-bold text-slate-700">Target Location</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Composition Matrix */}
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-indigo-600" />
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Personnel Matrix</h2>
                  </div>
                  <button className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800">
                    + Add Role
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {INITIAL_DRAFT.roles.map((role, idx) => (
                    <div key={idx} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between">
                      <h3 className="text-sm font-bold text-slate-900 mb-4">{role.name}</h3>
                      <div className="flex justify-between items-end border-t border-slate-100 pt-3 mt-auto">
                        <span className="text-xs font-semibold text-slate-500">Required: <span className="text-slate-900 font-bold">{role.count}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Risk Engine Overlay */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                  <ShieldAlert size={18} className="text-amber-600" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900">Verified Reality Intelligence</h2>
                </div>
                
                <div className="space-y-3">
                  {INITIAL_DRAFT.risks.map((risk, idx) => (
                    <div key={idx} className={`rounded-xl border p-4 flex gap-3 ${
                      risk.severity === 'high' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
                    }`}>
                      <div className="mt-0.5 shrink-0">
                        <Sparkles size={16} className={risk.severity === 'high' ? 'text-red-500' : 'text-amber-500'} />
                      </div>
                      <p className={`text-sm leading-relaxed font-medium ${
                        risk.severity === 'high' ? 'text-red-900' : 'text-amber-900'
                      }`}>
                        {risk.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Readiness Trigger Notice */}
              <div className="mt-8 rounded-xl bg-slate-900 p-6 flex items-start gap-4 shadow-lg shrink-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800">
                  <CheckCircle2 size={20} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">ReadyCheck Deployment Engine</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    Upon submission, this plan will be automatically subdivided into distinct Action Cards for Drivers, Medics, and Logistics. 
                    Wheels will not roll until understanding is verified via field prompts.
                  </p>
                  <button className="flex items-center gap-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition-colors">
                    Preview Generated Prompts <ArrowRight size={16} />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* AI Interactive Panel (Slide in from right) */}
          <div className={`border-l border-slate-200 bg-white transition-all duration-300 ease-in-out flex flex-col ${
            aiPanelOpen ? "w-96" : "w-0 overflow-hidden border-l-0"
          }`}>
            <div className="border-b border-slate-200 p-4 bg-indigo-50 flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-600" />
              <span className="font-bold text-slate-900">Reality Correction Engine</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              <div className="bg-slate-100 rounded-lg p-3 text-slate-700 font-medium">
                I'm cross-referencing your plan with real-time regional logs.
              </div>
              
              <div className="bg-white border text-slate-900 border-indigo-200 rounded-lg p-4 shadow-sm border-l-4 border-l-indigo-600">
                <p className="font-bold mb-2">Risk Detected: Highway 41 Bypass</p>
                <p className="text-slate-600 mb-3">You specified bypassing via Route 9. History shows Route 9 washes out during current weather patterns.</p>
                <button className="w-full text-center text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 py-2 rounded hover:bg-indigo-200">
                  Update Plan & Enforce Check
                </button>
              </div>
            </div>
            
            <div className="border-t border-slate-200 p-4">
              <input 
                type="text" 
                placeholder="Ask about risks, roles..." 
                className="w-full rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
```
