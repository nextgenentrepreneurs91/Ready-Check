### scripts/seed-demo-data.ts
```typescript
/**
 * ============================================================
 * FILE: scripts/seed-demo-data.ts
 * ============================================================
 */

import { createLogger } from '../packages/utils/src/logger';
import { 
  User, 
  Ngo, 
  DeploymentPlan, 
  Task, 
  Assessment 
} from '../packages/core-types/index';

const logger = createLogger('Scripts:Seeder');

// --- Mock Data Definitions ---

const NGO_DATA: Partial<Ngo>[] = [
  { id: 'ngo_1', name: 'GlobalMedic Relief', capabilities: ['Triage', 'Logistics'], trustIndex: 98 },
  { id: 'ngo_2', name: 'River Belt Rescue (Local)', capabilities: ['Evacuation', 'Marine'], trustIndex: 84 },
];

const USER_DATA: Partial<User>[] = [
  { id: 'usr_1', ngoId: 'ngo_1', name: 'Alex Mercer', role: 'coordinator', trustIndex: 99 },
  { id: 'usr_2', ngoId: 'ngo_1', name: 'Sara Chen', role: 'medic', trustIndex: 94 },
  { id: 'usr_3', ngoId: 'ngo_2', name: 'Marcus Reynolds', role: 'driver', trustIndex: 88 }
];

const MISSION_DATA: Partial<DeploymentPlan>[] = [
  {
    id: 'dep_8092',
    ngoId: 'ngo_1',
    title: 'Assam Flood: Emergency Food Distribution',
    objective: 'Deliver 50,000 rations to Sector 7 while bypassing Route 9 flooding.',
    status: 'PENDING_VERIFICATION',
    regionName: 'North River Belt'
  }
];

const TASK_DATA: Partial<Task>[] = [
  {
    id: 'tsk_1',
    deploymentPlanId: 'dep_8092',
    role: 'driver',
    title: 'Flood Bypass Transport',
    instructions: 'Navigate via Elevated Highway 41. Do NOT use Route 9 due to washout.',
    hazards: ['Highway waterlogging', 'Severe traffic congestion'],
  }
];

const ASSESSMENT_DATA: Partial<Assessment>[] = [
  {
    id: 'as_1',
    taskId: 'tsk_1',
    questions: [
      {
        id: 'q1',
        text: 'What is the mandatory route for the Sector 7 delivery?',
        options: ['Direct via Route 9', 'Elevated Highway 41 Bypass', 'Old Forest Path'],
        correctOptionIndex: 1
      },
      {
        id: 'q2',
        text: 'What should you do if traffic stalls on the bypass?',
        options: ['Wait for convoy lead instructions', 'Take the nearest off-ramp back to Route 9', 'Abort mission immediately'],
        correctOptionIndex: 0
      }
    ]
  }
];

/**
 * MOCK DATABASE ADAPTER
 */
const DB = {
  async save(table: string, data: any) {
    logger.info(`Seeding ${table}: [${data.id}] ${data.name || data.title || ''}`);
  }
};

async function seed() {
  logger.info('--- Beginning Demo Data Seed ---');

  for (const ngo of NGO_DATA) await DB.save('NGOs', ngo);
  for (const user of USER_DATA) await DB.save('Users', user);
  for (const mission of MISSION_DATA) await DB.save('Deployments', mission);
  for (const task of TASK_DATA) await DB.save('Tasks', task);
  for (const assessment of ASSESSMENT_DATA) await DB.save('Assessments', assessment);

  logger.info('--- Seeding Completed Successfully ---');
}

seed().catch(err => {
  logger.error('Seeding failed', err);
  process.exit(1);
});
```
