// apps/mobile/src/hooks/useMissionPlan.ts
```typescript
import { useState, useCallback, useMemo } from "react";

export type MissionType = "medical" | "food_distribution" | "rescue_logistics" | "shelter" | "other";
export type RiskLevel = "low" | "medium" | "high" | "critical";
export type VerificationStatus = "verified" | "needs_attention" | "blocked" | "pending";

export interface MissionRisk {
  id: string;
  description: string;
  level: RiskLevel;
}

export interface MissionTask {
  id: string;
  description: string;
  assignedRoleId?: string;
  isCompleted: boolean;
}

export interface RoleReadiness {
  roleId: string;
  title: string;
  status: VerificationStatus;
}

export interface MissionPlanState {
  id: string;
  missionType: MissionType | null;
  location: string;
  objective: string;
  teamSize: number;
  transportAvailable: boolean;
  risks: MissionRisk[];
  tasks: MissionTask[];
  roleReadiness: RoleReadiness[];
}

const DEFAULT_PLAN_STATE: MissionPlanState = {
  id: "",
  missionType: null,
  location: "",
  objective: "",
  teamSize: 0,
  transportAvailable: false,
  risks: [],
  tasks: [],
  roleReadiness: [],
};

export function useMissionPlan(initialPlan?: Partial<MissionPlanState>) {
  const [plan, setPlan] = useState<MissionPlanState>({
    ...DEFAULT_PLAN_STATE,
    ...initialPlan,
  });

  // Basic field updaters
  const updateField = useCallback(<K extends keyof MissionPlanState>(
    field: K,
    value: MissionPlanState[K]
  ) => {
    setPlan((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Task management
  const toggleTask = useCallback((taskId: string) => {
    setPlan((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      ),
    }));
  }, []);

  const addTask = useCallback((task: Omit<MissionTask, "id" | "isCompleted">) => {
    const newTask: MissionTask = {
      ...task,
      id: Math.random().toString(36).substring(2, 9),
      isCompleted: false,
    };
    setPlan((prev) => ({ ...prev, tasks: [...prev.tasks, newTask] }));
  }, []);

  // Readiness updaters
  const updateRoleReadiness = useCallback((roleId: string, status: VerificationStatus) => {
    setPlan((prev) => ({
      ...prev,
      roleReadiness: prev.roleReadiness.map((role) =>
        role.roleId === roleId ? { ...role, status } : role
      ),
    }));
  }, []);

  // Derived Indicators
  const readinessSummary = useMemo(() => {
    const totalRoles = plan.roleReadiness.length;
    if (totalRoles === 0) return { percent: 0, blockedCount: 0, verifiedCount: 0, isDeployable: false };

    const verifiedCount = plan.roleReadiness.filter((r) => r.status === "verified").length;
    const blockedCount = plan.roleReadiness.filter((r) => r.status === "blocked").length;
    const percent = Math.round((verifiedCount / totalRoles) * 100);
    
    // Core ReadyCheck logic: ALL roles must be verified to deploy
    const isDeployable = totalRoles > 0 && verifiedCount === totalRoles && blockedCount === 0;

    return {
      percent,
      blockedCount,
      verifiedCount,
      isDeployable,
    };
  }, [plan.roleReadiness]);

  const taskCompletion = useMemo(() => {
    const total = plan.tasks.length;
    if (total === 0) return { percent: 0, completed: 0, total: 0 };
    
    const completed = plan.tasks.filter((t) => t.isCompleted).length;
    return {
      percent: Math.round((completed / total) * 100),
      completed,
      total,
    };
  }, [plan.tasks]);

  return {
    plan,
    updateField,
    toggleTask,
    addTask,
    updateRoleReadiness,
    indicators: {
      readiness: readinessSummary,
      tasks: taskCompletion,
    },
  };
}
```
