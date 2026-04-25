```markdown
# Contributing to ReadyCheck

Thank you for contributing to ReadyCheck. This platform supports real disaster-response operations, so code quality, clarity, and reliability directly affect people in the field. We take contributions seriously and aim to make the process straightforward for everyone.

Please read this guide before opening a pull request.

---

## Table of Contents

1. [Code of Conduct](#1-code-of-conduct)
2. [Getting Started](#2-getting-started)
3. [Repository Structure](#3-repository-structure)
4. [Local Development Setup](#4-local-development-setup)
5. [Workspace Commands](#5-workspace-commands)
6. [Branch Conventions](#6-branch-conventions)
7. [Commit Hygiene](#7-commit-hygiene)
8. [Pull Request Expectations](#8-pull-request-expectations)
9. [Lint and Type Check Requirements](#9-lint-and-type-check-requirements)
10. [Testing Requirements](#10-testing-requirements)
11. [Working on Specific Areas](#11-working-on-specific-areas)
12. [Documentation Expectations](#12-documentation-expectations)
13. [Security Handling](#13-security-handling)
14. [Release Discipline](#14-release-discipline)
15. [Getting Help](#15-getting-help)

---

## 1. Code of Conduct

All contributors are expected to engage respectfully and professionally. We do not tolerate harassment, discrimination, or dismissive behaviour in any project space including issues, pull requests, and discussions. Violations should be reported to the maintainers directly.

---

## 2. Getting Started

Before contributing, ensure you have read:

- [README.md](./README.md) — product overview and quick start
- [ARCHITECTURE.md](./ARCHITECTURE.md) — system design and package boundaries
- [docs/domain-model.md](./docs/domain-model.md) — core domain entities
- [docs/api-contracts.md](./docs/api-contracts.md) — API shape expectations

If you are unsure where to start, look for issues labelled `good first issue` or `help wanted`.

---

## 3. Repository Structure

ReadyCheck is a pnpm monorepo managed with Turborepo. The main areas are:

```
apps/admin        Coordinator and NGO ops dashboard (Vite + React)
apps/mobile       Volunteer mobile app (Expo React Native)
apps/web          Web platform for coordinators and stakeholders (Next.js)
packages/         Shared TypeScript packages used across apps and services
services/         Backend services including api-gateway, ai-orchestrator,
                  readiness-engine, trust-engine, and google-workspace
infra/            Docker, Kubernetes, and Terraform configurations
docs/             Product and engineering documentation
tests/e2e/        End-to-end test suites
scripts/          Utility and maintenance scripts
```

---

## 4. Local Development Setup

### Prerequisites

Ensure you have the following installed before proceeding:

| Tool | Minimum Version | Notes |
|---|---|---|
| Node.js | 20.18.0 | Use `.nvmrc` via `nvm use` |
| pnpm | 9.x | Install via `npm install -g pnpm` |
| Docker | 24.x | Required for local services |
| Git | 2.40+ | |

### Setup Steps

```bash
# 1. Clone the repository
git clone https://github.com/readycheck/readycheck.git
cd readycheck

# 2. Switch to the correct Node version
nvm use

# 3. Install all dependencies across the monorepo
pnpm install

# 4. Copy environment variables
cp .env.example .env
# Edit .env and fill in the required values

# 5. Start local infrastructure (PostgreSQL, Redis)
docker-compose up -d

# 6. Run database migrations
pnpm db:migrate

# 7. Seed development data
pnpm db:seed

# 8. Start all apps and services in development mode
pnpm dev
```

### Starting Individual Apps

```bash
# Web platform only
pnpm --filter @readycheck/web dev

# Admin dashboard only
pnpm --filter @readycheck/admin dev

# Mobile app only
pnpm --filter @readycheck/mobile start

# API gateway only
pnpm --filter @readycheck/api-gateway dev

# AI orchestrator only
pnpm --filter @readycheck/ai-orchestrator dev
```

---

## 5. Workspace Commands

All commands are run from the monorepo root unless otherwise noted.

### Build

```bash
# Build all packages and apps
pnpm build

# Build a specific package
pnpm --filter @readycheck/domain build

# Build only affected packages since last commit
pnpm build --filter ...[HEAD^1]
```

### Development

```bash
# Start all apps in dev mode
pnpm dev

# Start a specific app
pnpm --filter @readycheck/web dev
```

### Lint

```bash
# Lint all packages
pnpm lint

# Lint a specific package
pnpm --filter @readycheck/mobile lint

# Fix auto-fixable lint issues
pnpm lint:fix
```

### Type Check

```bash
# Type check all packages
pnpm typecheck

# Type check a specific package
pnpm --filter @readycheck/api-gateway typecheck
```

### Test

```bash
# Run all unit and integration tests
pnpm test

# Run tests for a specific package
pnpm --filter @readycheck/readiness-engine test

# Run tests in watch mode
pnpm --filter @readycheck/domain test --watch

# Run e2e tests
pnpm test:e2e
```

### Clean

```bash
# Remove all build artifacts and caches
pnpm clean
```

---

## 6. Branch Conventions

All work must happen on a feature branch. Never commit directly to `main` or `staging`.

### Branch Naming

```
<type>/<short-description>

feat/volunteer-readiness-check
fix/deployment-gate-not-blocking
chore/update-gemini-prompt-templates
docs/add-trust-score-explanation
refactor/role-card-component-cleanup
test/add-e2e-coordinator-flow
hotfix/assessment-submission-timeout
```

### Branch Types

| Type | Purpose |
|---|---|
| `feat/` | New feature or capability |
| `fix/` | Bug fix |
| `chore/` | Dependency updates, config, tooling |
| `docs/` | Documentation only changes |
| `refactor/` | Code restructure without behaviour change |
| `test/` | Adding or improving tests |
| `hotfix/` | Urgent production fix |

### Branch Lifecycle

```
main        production-ready code, protected, requires PR + approval
staging     pre-production integration branch
feature/*   all development work branches off main
hotfix/*    branches off main for urgent production fixes
```

---

## 7. Commit Hygiene

We use [Conventional Commits](https://www.conventionalcommits.org) format for all commit messages. This enables automatic changelog generation and makes history readable.

### Format

```
<type>(<scope>): <short summary>

[optional body]

[optional footer]
```

### Examples

```
feat(assessments): add retry logic for failed understanding checks

fix(mobile): resolve offline queue flush on reconnect

chore(deps): upgrade gemini sdk to 1.4.0

docs(architecture): update data flow diagrams for trust engine

refactor(readiness-engine): extract score calculation into pure functions

test(api-gateway): add integration tests for deployment gate endpoint

feat(ai-orchestrator): add news grounding to plan-draft chain

BREAKING CHANGE: plan draft response shape updated to include groundingContext
```

### Rules

- Use present tense — `add feature` not `added feature`
- Keep the summary line under 72 characters
- Reference issue numbers in the footer where applicable: `Closes #123`
- One logical change per commit — avoid mixing unrelated changes
- Do not commit commented-out code, debug logs, or console statements

---

## 8. Pull Request Expectations

### Before Opening a PR

- [ ] All lint checks pass locally with `pnpm lint`
- [ ] All type checks pass locally with `pnpm typecheck`
- [ ] All relevant tests pass locally with `pnpm test`
- [ ] New functionality has corresponding tests
- [ ] No dead imports, placeholder APIs, or pseudo-code
- [ ] `.env.example` updated if new environment variables were added
- [ ] Relevant documentation updated if behaviour changed

### PR Title

Follow the same Conventional Commits format used for commit messages:

```
feat(mobile): add knowledge check result screen with retry flow
fix(trust-engine): correct decay calculation for inactive volunteers
```

### PR Description

Every PR must include:

- **What** — what does this change do
- **Why** — why is this change needed
- **How** — any notable implementation decisions
- **Testing** — how the change was tested
- **Screenshots** — for any UI changes, include before and after screenshots

### PR Size

Keep pull requests focused and small. A PR that touches 20 files across multiple domains is hard to review thoroughly. If your change is large, break it into a stack of smaller PRs with clear dependencies.

### Review Requirements

- All PRs require at least one approved review from a CODEOWNER of the affected area
- Security-sensitive changes require review from `@readycheck/security`
- Infrastructure changes require review from `@readycheck/ops`
- PRs targeting `main` require manual approval and passing CI

### Merge Strategy

- We use **squash and merge** for feature branches to keep main history clean
- Hotfixes use **merge commit** to preserve the fix context
- Do not merge your own PR without a review unless it is a trivial documentation fix

---

## 9. Lint and Type Check Requirements

All code must pass lint and type checks before merging. These are enforced in CI and will block merge if they fail.

### TypeScript

- Strict mode is enabled across all packages — `strict: true`
- No use of `any` without explicit justification in a comment
- No unused variables or imports
- All function parameters and return types must be explicitly typed where inference is insufficient
- Domain entities must use types from `packages/domain` — do not redefine them locally

### ESLint

- Configuration extends `packages/config/eslint/base.js`
- No disabling of lint rules inline without a comment explaining why
- Import order is enforced — external packages before internal, alphabetical within groups

### Formatting

- Prettier is used for formatting
- Do not manually format files in a way that conflicts with Prettier output
- Run `pnpm lint:fix` to auto-fix formatting issues before committing

---

## 10. Testing Requirements

Testing is not optional. ReadyCheck operates in high-stakes environments and untested code creates real risk.

### Unit Tests

- All scoring logic in `services/readiness-engine` and `services/trust-engine` must have unit tests
- All utility functions in `packages/utils` must have unit tests
- Pure functions must have complete coverage
- Use Vitest for all unit and integration tests

### Integration Tests

- API gateway endpoints must have integration tests covering success, validation error, and auth failure cases
- Assessment submission and deployment gate logic must be integration tested

### End-to-End Tests

- E2E tests live in `tests/e2e` and use Playwright
- Critical flows that must have E2E coverage:
  - Volunteer qualification flow — role card, assessment, result
  - Coordinator deployment creation and gate check
  - Feedback and correction loop
  - AI-assisted plan creation
  - Google Workspace form sync

### Test Quality

- Do not write tests that only test implementation details — test behaviour
- Use realistic domain fixtures that reflect actual ReadyCheck data shapes
- Mock external APIs at the service boundary, not deep inside logic

---

## 11. Working on Specific Areas

### apps/admin

The admin dashboard is used by coordinators and NGO operators in live operations. Changes here have direct operational impact.

- Use components from `packages/ui` wherever possible — do not rebuild primitives
- Status semantics must follow the established color system: verified (green), needs attention (amber), blocked (red), pending (grey)
- Dashboard pages must handle loading, empty, and error states explicitly
- Performance matters — coordinators need fast page loads under pressure

### apps/mobile

The mobile app is used by volunteers in the field, often in low-connectivity environments.

- Every screen must work correctly in offline mode or degrade gracefully
- Keep interactions simple — volunteers may be stressed, cold, or in poor lighting
- The readiness check flow must complete in under two minutes
- Test on both iOS and Android before marking a mobile PR ready for review
- Do not add dependencies that significantly increase bundle size without discussion

### apps/web

The web platform serves coordinators and stakeholders with planning and monitoring tools.

- Use the Next.js App Router pattern consistently
- Server components by default, client components only where interactivity is required
- AI assistant integration must remain non-blocking — users can always skip or override
- Accessibility is required — all interactive elements must be keyboard navigable and screen reader compatible

### packages/domain

The domain package is the most critical shared dependency in the monorepo. Changes here affect every app and service.

- Discuss breaking changes to domain entities in an issue before implementing
- Add a migration path comment when changing an entity shape
- Never add business logic to domain entities — types and interfaces only
- All changes to domain entities require review from `@readycheck/platform`

### services/ai-orchestrator

- Prompt templates are versioned markdown files in the `prompts/` directory
- Changes to prompts must include test cases showing before and after Gemini responses
- Never expose AI service endpoints directly to client apps — route through api-gateway only
- Gemini API keys must never appear in code, logs, or commit history

---

## 12. Documentation Expectations

Good documentation is part of the definition of done at ReadyCheck.

### When Documentation is Required

- New domain entities must be added to `docs/domain-model.md`
- New API endpoints must be added to `docs/api-contracts.md`
- New environment variables must be added to `.env.example` with a comment
- New AI prompt chains must be described in `docs/ai-assistant.md`
- Architecture changes must be reflected in `ARCHITECTURE.md`
- New scripts must include a usage comment at the top of the file

### Code Comments

- Add comments only where they increase maintainability
- Explain why, not what — the code shows what, the comment should explain why a decision was made
- Do not leave TODO comments in PRs without a linked issue

---

## 13. Security Handling

Security is treated as a first-class concern across the ReadyCheck codebase.

### Reporting Vulnerabilities

Do not open a public GitHub issue for security vulnerabilities. Read [SECURITY.md](./SECURITY.md) for the responsible disclosure process and contact the security team directly.

### Development Rules

- Never commit secrets, API keys, tokens, or credentials to the repository
- Never log sensitive data including tokens, passwords, or personally identifiable volunteer information
- All user input must be validated and sanitised before use
- Deployment gate override logic must always produce an audit log entry — this cannot be bypassed
- Authentication and authorisation changes require review from `@readycheck/security`
- Dependencies with known vulnerabilities must not be merged — the security scan workflow will flag them

### Environment Variables

- Add all new environment variables to `.env.example` with a safe placeholder value
- Document the purpose of each new variable in a comment in `.env.example`
- Never hardcode environment-specific values in application code

---

## 14. Release Discipline

### Versioning

ReadyCheck follows [Semantic Versioning](https://semver.org):

```
MAJOR.MINOR.PATCH

MAJOR — breaking changes to public API contracts or domain entities
MINOR — new features, backward compatible
PATCH — bug fixes, backward compatible
```

### Release Process

1. All changes merge to `main` via PR with passing CI
2. A release branch `release/x.y.z` is created from `main`
3. CHANGELOG.md is updated from commit history
4. Version is bumped in the root `package.json`
5. The release branch is reviewed and approved by a CODEOWNER
6. The release branch merges to `main` and is tagged `vx.y.z`
7. CI deploys automatically to production on tag push

### Hotfixes

1. Branch from `main` with prefix `hotfix/`
2. Fix is implemented with a focused, minimal change
3. PR opened against `main` with the `hotfix` label
4. Requires expedited review from at least one CODEOWNER
5. Merges to `main` and a patch version tag is created

### Feature Flags

New features that are not yet ready for all users should be gated behind a feature flag defined in `.env.example`. This allows deployment without exposure and enables safe rollback without a code change.

---

## 15. Getting Help

If you are stuck or unsure about anything:

- Search existing issues and pull requests first
- Open a discussion in GitHub Discussions for questions about architecture or design
- Open an issue for bugs, feature requests, or documentation gaps
- Tag `@readycheck/platform` in your PR if you need guidance on a specific technical decision

We review all contributions and aim to respond within two business days. We appreciate your time and effort in making ReadyCheck better.
```
