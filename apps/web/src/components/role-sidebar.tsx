// apps/web/src/components/role-sidebar.tsx
```tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  Map, 
  Users, 
  Star, 
  Handshake, 
  Globe2,
  ShieldCheck
} from "lucide-react";

export type UserRole = "coordinator" | "executive" | "government" | "volunteer" | "driver" | "medic" | "individual";

export interface RoleSidebarProps {
  currentRole: UserRole;
  userName: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  allowedRoles: UserRole[] | "all";
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    allowedRoles: "all",
  },
  {
    id: "planning",
    label: "Deployment Planning",
    href: "/planning",
    icon: Map,
    allowedRoles: ["coordinator", "executive", "government"],
  },
  {
    id: "assessments",
    label: "Verifications Hub",
    href: "/assessments",
    icon: ClipboardCheck,
    allowedRoles: ["coordinator", "executive"],
  },
  {
    id: "teams",
    label: "Team Intelligence",
    href: "/teams",
    icon: Users,
    allowedRoles: ["coordinator", "executive", "government"],
  },
  {
    id: "collaboration",
    label: "Cross-Agency Sync",
    href: "/collaboration",
    icon: Handshake,
    allowedRoles: ["executive", "government"], // Inter-agency coordination
  },
  {
    id: "ratings",
    label: "Unit Debriefs",
    href: "/ratings",
    icon: Star,
    allowedRoles: ["coordinator", "executive", "government"],
  },
  {
    id: "news",
    label: "Regional Data Feed",
    href: "/news",
    icon: Globe2,
    allowedRoles: "all",
  },
];

export function RoleSidebar({ currentRole, userName }: RoleSidebarProps): React.JSX.Element {
  const pathname = usePathname() || "";

  // Filter navigation items securely based on role to reduce interface clutter
  const visibleNavItems = NAV_ITEMS.filter((item) => {
    if (item.allowedRoles === "all") return true;
    return item.allowedRoles.includes(currentRole);
  });

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-slate-50 transition-transform">
      
      {/* App Branding */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 border border-indigo-100">
          <ShieldCheck size={20} className="text-indigo-600" />
        </div>
        <span className="text-[17px] font-bold tracking-tight text-slate-900">
          ReadyCheck
        </span>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-6" aria-label="Sidebar">
        <ul className="space-y-1.5">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            
            // Simple string matching for active states
            // Ensures nested routes (e.g. /teams/123) keep the parent active
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-slate-200/60 text-indigo-700 font-semibold" 
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon 
                    size={18} 
                    className={isActive ? "text-indigo-600" : "text-slate-400"} 
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Profile / Context Info */}
      <div className="shrink-0 border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm border border-slate-100">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col truncate">
            <span className="truncate text-sm font-bold text-slate-900">
              {userName}
            </span>
            <span className="truncate text-xs font-semibold uppercase tracking-wider text-slate-500">
              {currentRole}
            </span>
          </div>
        </div>
      </div>

    </aside>
  );
}
```
