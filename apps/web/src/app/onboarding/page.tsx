// apps/web/src/app/onboarding/page.tsx
```tsx
import React from "react";
import Link from "next/link";
import { 
  FileText, 
  Users, 
  HelpCircle, 
  ActivitySquare, 
  ShieldCheck, 
  ArrowRight,
  ArrowDown
} from "lucide-react";

const ONBOARDING_STEPS = [
  {
    id: "step_1",
    title: "1. Input the Master Plan",
    description: "The Coordinator inputs the raw deployment instructions or collaborates with ReadyCheck AI to map out the operation safely.",
    icon: FileText,
  },
  {
    id: "step_2",
    title: "2. Automatic Role Extraction",
    description: "The AI instantly breaks the massive plan down into concise, practical Action Cards tailored to specific roles (e.g., Drivers only see routes; Medics only see clinic details).",
    icon: Users,
  },
  {
    id: "step_3",
    title: "3. The Understanding Check",
    description: "Instead of clicking 'I read this,' field volunteers are asked 2-3 simple, practical questions about their specific Action Card on their mobile device.",
    icon: HelpCircle,
  },
  {
    id: "step_4",
    title: "4. Live Verification Dashboard",
    description: "The Coordinator monitors incoming checks in real-time. The system automatically highlights misunderstandings and flags personnel who need clarification.",
    icon: ActivitySquare,
  },
  {
    id: "step_5",
    title: "5. Safe Deployment Decision",
    description: "Execution is blocked until all critical roles are fully verified. Once the grid is green, the deployment proceeds with 100% confidence.",
    icon: ShieldCheck,
  },
];

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 items-center justify-center p-6 lg:p-12">
      
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Header Ribbon */}
        <div className="bg-slate-900 px-8 py-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20 shadow-inner border border-indigo-400/30">
            <ShieldCheck size={32} className="text-indigo-400" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-3">
            Welcome to ReadyCheck
          </h1>
          <p className="text-slate-300 text-lg font-medium max-w-xl mx-auto">
            The operational standard for disastrous environments. Verification over confirmation.
          </p>
        </div>

        {/* Protocol Steps Section */}
        <div className="px-8 py-10 sm:px-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8 border-b border-slate-100 pb-4">
            Standard Verification Protocol
          </h2>

          <div className="flex flex-col">
            {ONBOARDING_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === ONBOARDING_STEPS.length - 1;

              return (
                <div key={step.id} className="relative flex items-start gap-6">
                  {/* Timeline connectors */}
                  {!isLast && (
                    <div className="absolute left-[20px] top-12 h-full w-[2px] bg-slate-100" />
                  )}
                  
                  {/* Icon Node */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 border-2 border-white shadow-sm mt-1">
                    <Icon size={18} className="text-indigo-600" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-10">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-8 py-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 font-medium">
            Setup requires Coordinator privileges.
          </p>
          <Link
            href="/dashboard"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            Access Dashboard <ArrowRight size={16} />
          </Link>
        </div>

      </div>
      
    </div>
  );
}
```
