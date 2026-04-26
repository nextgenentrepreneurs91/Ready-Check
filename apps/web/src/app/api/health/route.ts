// apps/web/src/app/api/health/route.ts
```typescript
import { NextResponse } from "next/server";

/**
 * Basic health check endpoint for deployment orchestration.
 * Used by load balancers and container orchestrators to verify
 * that the ReadyCheck web service router is operational.
 */
export async function GET() {
  return NextResponse.json(
    {
      service: "readycheck-web",
      status: "operational",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    },
    {
      status: 200,
      headers: {
        // Prevent aggressive caching of the health status
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}
```
