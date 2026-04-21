# Project Roadmap: [Project Name]

> **Last Updated:** YYYY-MM-DD
> **Status:** Draft | Active | Completed | Archived
> **Target Launch:** YYYY-MM-DD

## Vision

[One paragraph describing the project's end state. What does success look like?]

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend Runtime | Bun | 1.2+ |
| Frontend Framework | SolidJS + SolidStart (SSG) | 1.9+ |
| Frontend Styling | TailwindCSS | 4.1+ |
| Backend Language | Java | 21 |
| Backend Framework | Micronaut | 4.7+ |
| Build Tool | Gradle (Kotlin DSL) | 8.13+ |
| Database | PostgreSQL | 16+ |
| Reverse Proxy | nginx | stable-alpine |
| Container Runtime | Docker / Podman | - |
| JVM Container | bellsoft/liberica-runtime-container | jdk-21-crac-cds-slim-musl |

---

## Milestones

### M0: Foundation

**Goal:** [One sentence]

**Timeline:** Week N — Week N

**Exit Criteria:**
- [ ] Project scaffolding complete (frontend + backend + infra)
- [ ] CI/CD pipeline operational (lint, test, build gates)
- [ ] Local development environment works with `docker compose up`
- [ ] Database migrations apply cleanly
- [ ] nginx serves frontend and proxies API
- [ ] Health check endpoints respond
- [ ] README has setup instructions

**Scope:**
| Task | Points | Depends On |
|------|--------|------------|
| TASK-001: [Description] | N | - |
| TASK-002: [Description] | N | TASK-001 |

**Total Estimate:** N points

---

### M1: Core MVP

**Goal:** [One sentence — what's the minimum end-to-end value?]

**Timeline:** Week N — Week N

**Exit Criteria:**
- [ ] Primary user workflow works end-to-end
- [ ] Authentication is functional
- [ ] Data persists to PostgreSQL
- [ ] API returns correct responses
- [ ] Basic error handling in place
- [ ] Deployable to staging environment
- [ ] Core tests passing in CI

**Scope:**
| Task | Points | Depends On |
|------|--------|------------|
| TASK-003: [Description] | N | TASK-002 |
| TASK-004: [Description] | N | TASK-003 |

**Total Estimate:** N points

---

### M2: Feature Complete

**Goal:** [One sentence]

**Timeline:** Week N — Week N

**Exit Criteria:**
- [ ] All planned features implemented
- [ ] Edge cases handled
- [ ] Comprehensive error handling
- [ ] Integration test coverage ≥ 80%
- [ ] No critical or high bugs

**Scope:**
| Task | Points | Depends On |
|------|--------|------------|
| TASK-XXX: [Description] | N | [Dependency] |

**Total Estimate:** N points

---

### M3: Hardening

**Goal:** [One sentence]

**Timeline:** Week N — Week N

**Exit Criteria:**
- [ ] Performance targets met
- [ ] Security review passed
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] Observability: metrics, logs, alerts configured
- [ ] Load test results documented

**Scope:**
| Task | Points | Depends On |
|------|--------|------------|
| TASK-XXX: [Description] | N | [Dependency] |

**Total Estimate:** N points

---

### M4: Launch Ready

**Goal:** [One sentence]

**Timeline:** Week N — Week N

**Exit Criteria:**
- [ ] Staging validation complete with production-like data
- [ ] Runbook written and reviewed
- [ ] Rollback procedure tested
- [ ] Production deployment succeeds
- [ ] Monitoring dashboards live
- [ ] Post-launch support plan documented

**Scope:**
| Task | Points | Depends On |
|------|--------|------------|
| TASK-XXX: [Description] | N | [Dependency] |

**Total Estimate:** N points

---

## Timeline Summary

| Milestone | Start | End | Points | Buffer (20%) | Total |
|-----------|-------|-----|--------|-------------|-------|
| M0: Foundation | YYYY-MM-DD | YYYY-MM-DD | N | N | N |
| M1: Core MVP | YYYY-MM-DD | YYYY-MM-DD | N | N | N |
| M2: Feature Complete | YYYY-MM-DD | YYYY-MM-DD | N | N | N |
| M3: Hardening | YYYY-MM-DD | YYYY-MM-DD | N | N | N |
| M4: Launch Ready | YYYY-MM-DD | YYYY-MM-DD | N | N | N |
| **Total** | | | **N** | **N** | **N** |

## Velocity Tracking

| Increment | Planned | Actual | Multiplier |
|-----------|---------|--------|------------|
| M0 | N | N | N× |
| M1 | N | N | N× |
| **Average** | | | **N×** |

## Key Risks

| Risk | Score | Mitigation | Owner |
|------|-------|------------|-------|
| [Top risk from risk register] | N | [Mitigation] | [Role] |
| [Second risk] | N | [Mitigation] | [Role] |
| [Third risk] | N | [Mitigation] | [Role] |

## Dependencies & Assumptions

- [External dependency 1]
- [Assumption about team availability]
- [Assumption about third-party services]

## Change Log

| Date | Change | Author |
|------|--------|--------|
| YYYY-MM-DD | Initial roadmap | [Name] |
| YYYY-MM-DD | [Change description] | [Name] |
