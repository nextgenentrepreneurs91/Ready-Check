// apps/mobile/src/services/offlineSync.ts
```typescript
/**
 * Lightweight Offline Sync Manager for ReadyCheck Mobile.
 * 
 * Ensures that critical readiness verifications, checklist updates, 
 * and operational changes made in connectivity dead-zones are reliably 
 * transmitted back to the coordinator dashboard once signal is restored.
 */

export type SyncOperationType = 
  | "SUBMIT_READYCHECK_ASSESSMENT" 
  | "UPDATE_CHECKLIST_STATUS" 
  | "UPDATE_LOCATION_PIN" 
  | "LOG_HAZARD_REPORT"
  | "SUBMIT_DEBRIEF_RATING";

export interface SyncOperation<T = unknown> {
  /** Unique ID for the operation (UUID/CUID) */
  id: string;
  /** Domain identifier for the handler to route the request */
  type: SyncOperationType;
  /** Actual data to be transmitted */
  payload: T;
  /** Timestamp of when the operation occurred offline */
  timestamp: number;
  /** Number of times this operation has failed to sync */
  retryCount: number;
}

export interface SyncAdapter {
  /** Abstract method to persist the queue locally (e.g., AsyncStorage/MMKV) */
  saveQueue: (queue: SyncOperation[]) => Promise<void>;
  /** Abstract method to load the queue from local storage */
  loadQueue: () => Promise<SyncOperation[]>;
}

export interface SyncStatus {
  isProcessing: boolean;
  pendingCount: number;
  lastSyncTime: number | null;
  errorCountThisRun: number;
}

// Default in-memory adapter if no persistent storage is injected
const InMemoryAdapter: SyncAdapter = {
  saveQueue: async () => {},
  loadQueue: async () => [],
};

export class OfflineSyncManager {
  private queue: SyncOperation[] = [];
  private adapter: SyncAdapter;
  private isProcessing: boolean = false;
  private lastSyncTime: number | null = null;
  
  /** 
   * External handler provided by the application. 
   * Returns true if successfully synced, false to keep in queue.
   */
  public syncHandler?: (op: SyncOperation) => Promise<boolean>;

  constructor(adapter: SyncAdapter = InMemoryAdapter) {
    this.adapter = adapter;
  }

  /**
   * Initializes the queue from local storage. 
   * Should be called on app boot.
   */
  public async initialize(): Promise<void> {
    try {
      this.queue = await this.adapter.loadQueue();
    } catch (error) {
      console.error("[OfflineSync] Failed to load queue:", error);
      this.queue = [];
    }
  }

  /**
   * Enqueues a new operation to be synced.
   * If the app is online, you should generally call `triggerSync()` right after.
   */
  public async enqueue<T>(type: SyncOperationType, payload: T): Promise<string> {
    const operation: SyncOperation = {
      id: Math.random().toString(36).substring(2, 15),
      type,
      payload,
      timestamp: Date.now(),
      retryCount: 0,
    };

    this.queue.push(operation);
    await this.adapter.saveQueue(this.queue);
    
    return operation.id;
  }

  /**
   * Attempts to drain all pending operations in the queue.
   * Resolves when the queue is processed (or stops at the first failure).
   */
  public async triggerSync(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0 || !this.syncHandler) {
      return;
    }

    this.isProcessing = true;
    let errorOccurred = false;

    // Process oldest first
    this.queue.sort((a, b) => a.timestamp - b.timestamp);

    // Drain process: iterate backwards to safely splice while iterating, 
    // or just use a while loop to pull from the front.
    while (this.queue.length > 0) {
      const currentOp = this.queue[0];

      try {
        const success = await this.syncHandler(currentOp);

        if (success) {
          // Remove successful item
          this.queue.shift();
          await this.adapter.saveQueue(this.queue);
        } else {
          // Handler returned false, meaning soft failure (e.g., temporary API error)
          currentOp.retryCount++;
          await this.adapter.saveQueue(this.queue);
          errorOccurred = true;
          break; // Stop draining
        }
      } catch (err) {
        // Hard failure (network down, timeout, etc.)
        currentOp.retryCount++;
        await this.adapter.saveQueue(this.queue);
        errorOccurred = true;
        break; // Stop draining to preserve order and avoid spamming network
      }
    }

    if (!errorOccurred) {
      this.lastSyncTime = Date.now();
    }

    this.isProcessing = false;
  }

  /**
   * Retrieves current stats for UI display (e.g. "3 items pending sync")
   */
  public getStatus(): SyncStatus {
    return {
      isProcessing: this.isProcessing,
      pendingCount: this.queue.length,
      lastSyncTime: this.lastSyncTime,
      errorCountThisRun: this.queue.reduce((acc, op) => acc + (op.retryCount > 0 ? 1 : 0), 0)
    };
  }

  /**
   * Discards operations that have failed too many times to prevent infinite blockers.
   */
  public async purgeStaleItems(maxRetries: number = 10): Promise<void> {
    const originalLength = this.queue.length;
    this.queue = this.queue.filter(op => op.retryCount < maxRetries);
    
    if (this.queue.length !== originalLength) {
      await this.adapter.saveQueue(this.queue);
    }
  }
}

// Export a singleton instance for standard app-wide usage
export const offlineSyncManager = new OfflineSyncManager();
```
