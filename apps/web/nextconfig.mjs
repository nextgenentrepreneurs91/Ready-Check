
// apps/web/next.config.mjs
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure shared code packages in the monorepo are properly transpiled by Next.js
  transpilePackages: ["@readycheck/ui", "@readycheck/core-domain", "@readycheck/config"],
  experimental: {
    // Enable typed routes for stronger compile-time guarantees in App Router
    typedRoutes: true,
  },
  eslint: {
    // In a monorepo, linting is often enforced at the workspace level in CI
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Enforcing strict type checks during build is standard for operational tools
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
```
