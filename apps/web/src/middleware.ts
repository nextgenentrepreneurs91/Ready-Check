// apps/web/src/middleware.ts
```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // In a production ReadyCheck deployment, this token would be a signed JWT
  const sessionToken = request.cookies.get("rc_session")?.value;
  const userRole = request.cookies.get("rc_role")?.value; // e.g., 'coordinator' | 'volunteer' | 'admin'

  const isAuthPage = pathname.startsWith("/login");
  const isProtectedPath = pathname.startsWith("/dashboard") || pathname.startsWith("/coordinator");
  const isCoordinatorPath = pathname.startsWith("/coordinator");

  // 1. Unauthenticated users cannot access protected operational views
  if (isProtectedPath && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Authenticated users should not see the login page
  if (isAuthPage && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 3. Role-based access control (RBAC) guard
  // Prevent field volunteers from accessing sensitive coordinator planning routes
  if (isCoordinatorPath && userRole !== "coordinator" && userRole !== "admin") {
    // Redirect unauthorized personnel to the generic dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware only to specific paths to preserve fast static rendering for other routes
  matcher: ["/dashboard/:path*", "/coordinator/:path*", "/login"],
};
```
