# ARCHITECTURE.md — ReadyCheck

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [High-Level Architecture](#2-high-level-architecture)
3. [Monorepo Structure](#3-monorepo-structure)
4. [Applications](#4-applications)
5. [Shared Packages](#5-shared-packages)
6. [Backend Services](#6-backend-services)
7. [AI Orchestration](#7-ai-orchestration)
8. [Readiness Engine](#8-readiness-engine)
9. [Trust Engine](#9-trust-engine)
10. [Google Workspace Integration](#10-google-workspace-integration)
11. [Domain Concepts](#11-domain-concepts)
12. [Data Flow](#12-data-flow)
13. [Package Boundaries](#13-package-boundaries)
14. [Deployment Model](#14-deployment-model)
15. [CI/CD Pipeline](#15-cicd-pipeline)
16. [Non-Functional Requirements](#16-non-functional-requirements)

---

## 1. Product Overview

ReadyCheck is a disaster-response readiness platform whose core purpose is to verify that every volunteer actually understands their role before a deployment begins — not just that they received instructions.

Most coordination tools stop at task delivery. ReadyCheck goes further by breaking deployment plans into role-specific action cards, asking practical action-based questions, verifying understanding before the deployment gate opens, and giving coordinators a live readiness dashboard to act on failures fast. An AI assistant powered by Gemini helps coordinators plan missions, detect risks, and guide correction loops.

The platform serves three primary user groups:

| User | Interface | Primary Need |
|---|---|---|
| Volunteer | Mobile app | Receive role card, pass readiness check |
| Coordinator / NGO operator | Web + admin dashboard | Plan deployment, monitor readiness, fix misunderstandings |
| Stakeholder / Executive | Web dashboard | Regional history, trust signals, deployment outcomes |

---

## 2. High-Level Architecture

```mermaid
graph TD
    subgraph Client Layer
        MOB[apps/mobile\nExpo React Native]
        WEB[apps/web\nNext.js]
        ADM[apps/admin\nVite React]
    end

    subgraph API Layer
        GW[api-gateway\nNestJS REST + WS]
    end

    subgraph Service Layer
        AI[ai-orchestrator\nGemini chains]
        RE[readiness-engine\nscoring]
        TE[trust-engine\nscoring]
        GWS[google-workspace\nForms · Maps · Meet · Drive]
    end

    subgraph Data Layer
        PG[(PostgreSQL)]
        RD[(Redis)]
        GCS[(Google Cloud Storage)]
    end

    MOB -->|HTTPS / WS| GW
    WEB -->|HTTPS / WS| GW
    ADM -->|HTTPS| GW
    GW --> AI
    GW --> RE
    GW --> TE
    GW --> GWS
    GW --> PG
    GW --> RD
    AI --> GWS
    GWS --> GCS
