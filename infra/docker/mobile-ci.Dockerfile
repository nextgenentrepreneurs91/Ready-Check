# CI Dockerfile for Mobile (Expo)
# Optimized for Lint, Typecheck, Test, and Asset Bundling

FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm

WORKDIR /app

# Enable corepack for pnpm if needed, or stick to global install
# Copy workspace configuration and lockfile for dependency caching
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
# Copy package.json files for all workspace members to facilitate pnpm install caching
COPY apps/mobile/package.json ./apps/mobile/
COPY packages/core-types/package.json ./packages/core-types/
COPY packages/utils/package.json ./packages/utils/
COPY packages/tsconfig/package.json ./packages/tsconfig/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
# We need internal packages as mobile depends on them
COPY packages ./packages
COPY apps/mobile ./apps/mobile

# Metadata / Environment
ENV CI=true
ENV NODE_ENV=production

# The following operations are typically run as separate steps in CI, 
# but are defined here as the default "reproducibility" suite.
WORKDIR /app/apps/mobile

# Default command runs the primary CI quality checks
CMD ["sh", "-c", "pnpm lint && pnpm typecheck && pnpm test"]

# Notes for Engineering:
# To run a specific check: 
# docker build -t mobile-ci -f infra/docker/mobile-ci.Dockerfile .
# docker run mobile-ci pnpm typecheck
#
# To build a production JS bundle for troubleshooting:
# docker run mobile-ci npx expo export --platform web_or_relevant_target
