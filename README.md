# Ready-Check
AI-powered Deployment Intelligence for NGOs
“Prepared teams save lives. ReadyCheck ensures they are.”
ReadyCheck is an AI-powered platform that ensures NGOs are fully prepared before deployment in disaster and high-impact areas by transforming unstructured plans into clear, role-specific execution workflows. Through its intelligent assistant, ReadyCheck breaks down deployment strategies, forms teams via shareable links, and evaluates volunteer readiness using adaptive assessments, ensuring that only qualified individuals take on critical tasks. By combining real-time guidance, structured task visibility, and feedback-driven learning, the platform reduces on-ground confusion, improves coordination, and enables efficient, high-impact execution. Built with scalable technologies and integrated with tools like Google Gemini and Maps, ReadyCheck introduces a readiness-first approach to humanitarian operations, creating a smarter, more reliable system for future deployments.
# CODEOWNERS — ReadyCheck
# Defines required reviewers for each area of the monorepo.
# The last matching pattern takes precedence.
# https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners

# ─── Global Fallback ──────────────────────────────────────────────────────────
*                                               @readycheck/platform

# ─── Repo Root Config ─────────────────────────────────────────────────────────
/.editorconfig                                  @readycheck/platform
/.env.example                                   @readycheck/platform @readycheck/security
/.nvmrc                                         @readycheck/platform
/package.json                                   @readycheck/platform
/pnpm-workspace.yaml                            @readycheck/platform
/turbo.json                                     @readycheck/platform
/tsconfig.base.json                             @readycheck/platform
/Makefile                                       @readycheck/platform @readycheck/ops
/docker-compose.yml                             @readycheck/ops

# ─── Documentation ────────────────────────────────────────────────────────────
/README.md                                      @readycheck/platform
/ARCHITECTURE.md                                @readycheck/platform
/CONTRIBUTING.md                                @readycheck/platform
/SECURITY.md                                    @readycheck/security
/LICENSE                                        @readycheck/platform
/CODEOWNERS                                     @readycheck/platform
/docs/                                          @readycheck/platform
/docs/api-contracts.md                          @readycheck/platform @readycheck/web
/docs/domain-model.md                           @readycheck/platform
/docs/ai-assistant.md                           @readycheck/platform
/docs/assessment-engine.md                      @readycheck/platform
/docs/data-privacy.md                           @readycheck/security
/docs/incident-response.md                      @readycheck/ops @readycheck/security
/docs/role-based-access.md                      @readycheck/security
/docs/google-integrations.md                    @readycheck/platform

# ─── GitHub Config & Workflows ────────────────────────────────────────────────
/.github/                                       @readycheck/platform @readycheck/ops
/.github/workflows/ci.yml                       @readycheck/platform @readycheck/ops
/.github/workflows/deploy-web.yml               @readycheck/web @readycheck/ops
/.github/workflows/deploy-mobile.yml            @readycheck/mobile @readycheck/ops
/.github/workflows/lint.yml                     @readycheck/platform
/.github/workflows/test.yml                     @readycheck/platform
/.github/workflows/security-scan.yml            @readycheck/security @readycheck/ops
/.github/ISSUE_TEMPLATE/                        @readycheck/platform
/.github/PULL_REQUEST_TEMPLATE.md               @readycheck/platform

# ─── apps/web ─────────────────────────────────────────────────────────────────
/apps/web/                                      @readycheck/web
/apps/web/src/app/                              @readycheck/web
/apps/web/src/components/                       @readycheck/web
/apps/web/src/middleware.ts                     @readycheck/web @readycheck/security
/apps/web/src/app/api/                          @readycheck/web @readycheck/platform
/apps/web/next.config.mjs                       @readycheck/web @readycheck/platform
/apps/web/package.json                          @readycheck/web @readycheck/platform
/apps/web/tsconfig.json                         @readycheck/web @readycheck/platform

# ─── apps/admin ───────────────────────────────────────────────────────────────
/apps/admin/                                    @readycheck/web
/apps/admin/src/pages/                          @readycheck/web
/apps/admin/src/components/                     @readycheck/web
/apps/admin/package.json                        @readycheck/web @readycheck/platform
/apps/admin/tsconfig.json                       @readycheck/web @readycheck/platform

# ─── apps/mobile ──────────────────────────────────────────────────────────────
/apps/mobile/                                   @readycheck/mobile
/apps/mobile/src/screens/                       @readycheck/mobile
/apps/mobile/src/components/                    @readycheck/mobile
/apps/mobile/src/hooks/                         @readycheck/mobile
/apps/mobile/src/navigation/                    @readycheck/mobile
/apps/mobile/src/services/offlineSync.ts        @readycheck/mobile @readycheck/platform
/apps/mobile/app.json                           @readycheck/mobile @readycheck/ops
/apps/mobile/package.json                       @readycheck/mobile @readycheck/platform
/apps/mobile/tsconfig.json                      @readycheck/mobile @readycheck/platform

# ─── packages/domain ──────────────────────────────────────────────────────────
/packages/domain/                               @readycheck/platform
/packages/domain/src/entities/                  @readycheck/platform

# ─── packages/ui ──────────────────────────────────────────────────────────────
/packages/ui/                                   @readycheck/web @readycheck/mobile
/packages/ui/src/                               @readycheck/web @readycheck/mobile

# ─── packages/api-client ──────────────────────────────────────────────────────
/packages/api-client/                           @readycheck/platform
/packages/api-client/src/                       @readycheck/platform

# ─── packages/utils ───────────────────────────────────────────────────────────
/packages/utils/                                @readycheck/platform
/packages/utils/src/scoring.ts                  @readycheck/platform
/packages/utils/src/validation.ts               @readycheck/platform @readycheck/security

# ─── packages/config ──────────────────────────────────────────────────────────
/packages/config/                               @readycheck/platform
/packages/config/eslint/                        @readycheck/platform
/packages/config/tsconfig/                      @readycheck/platform
/packages/config/tailwind/                      @readycheck/web

# ─── services/api-gateway ─────────────────────────────────────────────────────
/services/api-gateway/                          @readycheck/platform
/services/api-gateway/src/auth/                 @readycheck/platform @readycheck/security
/services/api-gateway/src/assessments/          @readycheck/platform
/services/api-gateway/src/deployments/          @readycheck/platform
/services/api-gateway/src/plans/                @readycheck/platform
/services/api-gateway/src/ratings/              @readycheck/platform
/services/api-gateway/src/team-links/           @readycheck/platform
/services/api-gateway/tsconfig.json             @readycheck/platform

# ─── services/ai-orchestrator ─────────────────────────────────────────────────
/services/ai-orchestrator/                      @readycheck/platform
/services/ai-orchestrator/src/chains/           @readycheck/platform
/services/ai-orchestrator/src/providers/        @readycheck/platform @readycheck/security
/services/ai-orchestrator/prompts/              @readycheck/platform

# ─── services/readiness-engine ────────────────────────────────────────────────
/services/readiness-engine/                     @readycheck/platform
/services/readiness-engine/src/scoring/         @readycheck/platform

# ─── services/trust-engine ────────────────────────────────────────────────────
/services/trust-engine/                         @readycheck/platform
/services/trust-engine/src/scoring/             @readycheck/platform

# ─── services/google-workspace ────────────────────────────────────────────────
/services/google-workspace/                     @readycheck/platform
/services/google-workspace/src/gemini/          @readycheck/platform @readycheck/security
/services/google-workspace/src/maps/            @readycheck/platform
/services/google-workspace/src/forms/           @readycheck/platform
/services/google-workspace/src/meet/            @readycheck/platform
/services/google-workspace/src/whiteboard/      @readycheck/platform

# ─── infra ────────────────────────────────────────────────────────────────────
/infra/                                         @readycheck/ops
/infra/docker/                                  @readycheck/ops
/infra/k8s/                                     @readycheck/ops
/infra/terraform/                               @readycheck/ops @readycheck/security
/infra/terraform/main.tf                        @readycheck/ops @readycheck/security
/infra/terraform/variables.tf                   @readycheck/ops @readycheck/security
/infra/terraform/outputs.tf                     @readycheck/ops

# ─── scripts ──────────────────────────────────────────────────────────────────
/scripts/                                       @readycheck/platform @readycheck/ops
/scripts/seed-demo-data.ts                      @readycheck/platform
/scripts/backfill-trust-scores.ts               @readycheck/platform
/scripts/sync-google-forms.ts                   @readycheck/platform
/scripts/generate-openapi.ts                    @readycheck/platform
/scripts/bootstrap.sh                           @readycheck/ops
/scripts/verify-repo-structure.ts               @readycheck/platform

# ─── tests ────────────────────────────────────────────────────────────────────
/tests/                                         @readycheck/platform
/tests/e2e/executive-flow.spec.ts               @readycheck/web @readycheck/platform
/tests/e2e/volunteer-qualification.spec.ts      @readycheck/mobile @readycheck/platform
/tests/e2e/feedback-loop.spec.ts                @readycheck/platform
/tests/e2e/role-scoped-plan.spec.ts             @readycheck/platform
/tests/e2e/google-integration.spec.ts           @readycheck/platform @readycheck/ops
