### scripts/verify-repo-structure.ts
```typescript
/**
 * ============================================================
 * FILE: scripts/verify-repo-structure.ts
 * ============================================================
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * DEFINITION: The mandatory architectural skeleton of ReadyCheck.
 */
const MANDATORY_STRUCTURE = [
  // Governance & Workspace
  'package.json',
  'pnpm-workspace.yaml',
  'turbo.json',
  '.gitignore',
  
  // Infrastructure & Docs
  'infra/docker',
  'infra/k8s',
  'infra/terraform',
  'docs/api-contracts.md',
  'docs/repository-map.md',
  
  // Core Codebase
  'apps/web',
  'apps/mobile',
  'backend/api',
  'packages/core-types',
  'packages/domain',
  'packages/ui',
  'packages/utils',
  'packages/config',
  
  // DevOps
  'docker-compose.yml',
  'scripts/bootstrap.sh'
];

async function verify() {
  console.log('--- ReadyCheck Integrity Verification ---');
  
  const rootDir = path.resolve(__dirname, '..');
  const missing: string[] = [];

  for (const relativePath of MANDATORY_STRUCTURE) {
    const fullPath = path.join(rootDir, relativePath);
    
    if (!fs.existsSync(fullPath)) {
      missing.push(relativePath);
      console.warn(`❌ Missing: ${relativePath}`);
    } else {
      console.log(`✓ Verified: ${relativePath}`);
    }
  }

  if (missing.length > 0) {
    console.error('\n--- INTEGRITY CHECK FAILED ---');
    console.error(`Status: ${missing.length} mandatory paths are missing from the monorepo.`);
    console.error('Please ensure the repository setup matches the architectural map.');
    process.exit(1);
  }

  console.log('\n--- INTEGRITY CHECK PASSED ---');
}

verify().catch((err) => {
  console.error('Verify script failed with an unexpected error:', err);
  process.exit(1);
});
```
