### scripts/backfill-trust-scores.ts
```typescript
/**
 * ============================================================
 * FILE: scripts/backfill-trust-scores.ts
 * ============================================================
 */

import { createLogger } from '../packages/utils/src/logger';
import { TrustSubjectType } from '../packages/core-types/index';

const logger = createLogger('Scripts:BackfillTrust');

interface BackfillOptions {
  dryRun: boolean;
  batchSize: number;
  subjectType?: TrustSubjectType;
}

/**
 * MOCK REPOSITORY ABSTRACTION
 * In a real environment, this would interface with Prisma, TypeORM, or raw SQL.
 */
const TrustRepo = {
  async fetchSubjects(type: TrustSubjectType, offset: number, limit: number) {
    // Simulating database fetch
    logger.debug(`Fetching ${type} batch: offset ${offset}, limit ${limit}`);
    return Array.from({ length: limit }).map((_, i) => ({
      id: `${type.toLowerCase()}_${offset + i}`,
      type,
    }));
  },
  async updateTrustScore(id: string, score: number, dryRun: boolean) {
    if (dryRun) {
      logger.info(`[DRY-RUN] Would update ${id} with score: ${score}`);
      return;
    }
    logger.info(`Updated ${id} with score: ${score}`);
  }
};

/**
 * CORE LOGIC
 * Recalculates trust based on historical mission outcomes and peer reviews.
 */
async function backfillTrustScores(options: BackfillOptions) {
  const { dryRun, batchSize, subjectType } = options;
  const types: TrustSubjectType[] = subjectType ? [subjectType] : ['USER', 'NGO', 'TEAM'];

  logger.info(`Starting trust score backfill. Mode: ${dryRun ? 'DRY-RUN' : 'LIVE'}`);

  for (const type of types) {
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      try {
        const subjects = await TrustRepo.fetchSubjects(type, offset, 4); // Small batch for demo
        
        if (subjects.length === 0) {
          hasMore = false;
          continue;
        }

        for (const subject of subjects) {
          // Simulate complex calculation: Sum of historical success / total missions
          const simulatedScore = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
          await TrustRepo.updateTrustScore(subject.id, simulatedScore, dryRun);
        }

        offset += subjects.length;
        
        // Simulating end of table for mock purposes
        if (offset >= 12) hasMore = false; 

      } catch (error) {
        logger.error(`Failed to process batch for ${type} at offset ${offset}`, error);
        hasMore = false; // Halt on critical error
      }
    }
  }

  logger.info('Trust score backfill completed successfully.');
}

// Execution Entry Point
const args = process.argv.slice(2);
const isDryRun = !args.includes('--confirm');

if (isDryRun) {
  logger.warn('Running in DRY-RUN mode. Use --confirm to write changes to the database.');
}

backfillTrustScores({
  dryRun: isDryRun,
  batchSize: 50,
}).catch((err) => {
  logger.error('Fatal script error', err);
  process.exit(1);
});
```
