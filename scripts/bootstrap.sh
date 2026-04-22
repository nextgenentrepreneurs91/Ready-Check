### scripts/bootstrap.sh
```bash
#!/bin/bash

# ============================================================
# FILE: scripts/bootstrap.sh
# ReadyCheck Monorepo Bootstrapper
# ============================================================

set -e # Exit on error

# Terminal Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}ReadyCheck: Initializing local development environment...${NC}\n"

# 1. Dependency Checks
command -v node >/dev/null 2>&1 || { echo -e "${RED}Error: node is not installed. Required >=20.0.0${NC}" >&2; exit 1; }
command -v pnpm >/dev/null 2>&1 || { echo -e "${BLUE}pnpm not found. Installing via npm...${NC}"; npm i -g pnpm; }

echo -e "${GREEN}✓ Environment checks passed.${NC}"

# 2. Environment Configuration
if [ ! -f .env ]; then
  echo -e "${BLUE}Copying .env.example to .env...${NC}"
  cp .env.example .env
fi

# 3. Dependency Installation
echo -e "${BLUE}Installing monorepo dependencies...${NC}"
pnpm install

# 4. Optional Infrastructure Check
if command -v docker >/dev/null 2>&1; then
  echo -e "${GREEN}✓ Docker detected. You can run 'pnpm infra:up' to start local databases.${NC}"
else
  echo -e "${RED}Warning: Docker not found. Local infrastructure will be unavailable.${NC}"
fi

# 5. Success
echo -e "\n${GREEN}====================================================${NC}"
echo -e "${GREEN}ReadyCheck Bootstrapped Successfully!${NC}"
echo -e "${BLUE}Next Steps:${NC}"
echo -e "  1. pnpm run dev       - Start web and api in development mode"
echo -e "  2. pnpm test          - Verify consistency across packages"
echo -e "  3. Open http://localhost:3000 to view the Dashboard"
echo -e "${GREEN}====================================================${NC}"
```
