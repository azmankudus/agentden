# SDLC Documentation Templates

All templates for the knowledge management skill. Used by `/docs spec`, `/docs roadmap`, `/docs runbook`, `/docs support`.

---

## Template: Product Specification

Used by `/docs spec` after the 3-block interview.

```markdown
# Product Specification: [Product Name]

[![Status](https://img.shields.io/badge/status-draft-yellow)]()
[![Version](https://img.shields.io/badge/version-1.0-blue)]()
[![Phase](https://img.shields.io/badge/phase-pre_development-purple)]()

## Document Control

| Field | Value |
|-------|-------|
| Version | 1.0 |
| Status | Draft |
| Author | [Author] |
| Created | YYYY-MM-DD |
| Last Updated | YYYY-MM-DD |
| Review Cycle | Bi-weekly until approved |

---

## 1. Executive Summary

[2-3 paragraphs synthesized from Block 1]

## 2. Problem Statement

[Detailed problem description from Block 1, Q2]

## 3. Product Vision

**Vision:** [One sentence]

### Goals & Success Metrics

| Goal | Metric | Target | Measurement |
|------|--------|--------|-------------|

## 4. Target Users & Personas

| Persona | Role | Technical Level | Primary Goal | Key Frustration |
|---------|------|-----------------|--------------|-----------------|

## 5. Scope

### In Scope (This Release)

| ID | Feature | MoSCoW | User Stories |
|----|---------|--------|-------------|

### Out of Scope (Future Releases)

-

### Non-Goals

-

## 6. Functional Requirements

### 6.1 [Epic Name]

| ID | Requirement | MoSCoW | Acceptance Criteria |
|----|------------|--------|-------------------|

## 7. Non-Functional Requirements

| ID | Category | Requirement | Target | Measurement |
|----|----------|-------------|--------|-------------|
| NFR-001 | Performance | API response time | < 200ms p95 | APM |
| NFR-002 | Availability | Uptime | 99.9% | Monitoring |
| NFR-003 | Security | Authentication | JWT + OAuth2 | Audit |
| NFR-004 | Accessibility | WCAG compliance | 2.2 AA | Automated + Manual |

## 8. Data Model

[Entity descriptions and relationships]

## 9. Key Workflows

### Workflow 1: [Name]

1. [Step]
2. [Step]

## 10. Technical Constraints

| Type | Constraint | Impact |
|------|-----------|--------|

## 11. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|

## 12. Launch Criteria

- [ ] [criterion]

## 13. Stakeholder Approval

| Role | Name | Date | Status |
|------|------|------|--------|
| Product Owner | | | Pending |
| Tech Lead | | | Pending |
| Design Lead | | | Pending |
```

---

## Template: Versioned Roadmap

Used by `/docs roadmap`. Contains all 4 formats.

```markdown
# Product Roadmap: [Product Name]

[![Phase](https://img.shields.io/badge/phase-foundation-blue)]()

## Overview

[One paragraph]

## Current Status

| Milestone | Status | Progress |
|-----------|--------|----------|
| M0: Foundation | ![Planned](https://img.shields.io/badge/status-planned-blue) | 0% |
| M1: Core MVP | ![Planned](https://img.shields.io/badge/status-planned-blue) | 0% |
| M2: Feature Complete | ![Planned](https://img.shields.io/badge/status-planned-blue) | 0% |
| M3: Hardening | ![Planned](https://img.shields.io/badge/status-planned-blue) | 0% |
| M4: Launch Ready | ![Planned](https://img.shields.io/badge/status-planned-blue) | 0% |

---

## Format 1: Roadmap Table

| Version | Phase | Key Features | Target Date | Status |
|---------|-------|-------------|-------------|--------|
| v0.1.0 | M0: Foundation | Scaffold, CI/CD, dev env | YYYY-WXX | ![Planned](https://img.shields.io/badge/status-planned-blue) |
| v0.2.0 | M1: Core MVP | Auth, CRUD, basic UI | YYYY-WXX | ![Planned](https://img.shields.io/badge/status-planned-blue) |
| v0.3.0 | M2: Feature Complete | All features, edge cases | YYYY-WXX | ![Planned](https://img.shields.io/badge/status-planned-blue) |
| v0.4.0 | M3: Hardening | Perf, security, a11y | YYYY-WXX | ![Planned](https://img.shields.io/badge/status-planned-blue) |
| v1.0.0 | M4: Launch Ready | Validation, load test, docs | YYYY-WXX | ![Planned](https://img.shields.io/badge/status-planned-blue) |

---

## Format 2: Timeline (Mermaid Gantt)

​```mermaid
gantt
    title Product Roadmap
    dateFormat YYYY-MM-DD
    axisFormat %b %d

    section Foundation (M0)
    Project scaffold           :m0a, YYYY-MM-DD, 7d
    CI/CD pipeline             :m0b, after m0a, 5d

    section Core MVP (M1)
    Authentication             :m1a, after m0, 7d
    Core CRUD                  :m1b, after m1a, 10d

    section Feature Complete (M2)
    Search & filters           :m2a, after m1, 7d
    Edge cases                 :m2b, after m2a, 7d

    section Hardening (M3)
    Performance                :m3a, after m2, 7d
    Security audit             :m3b, after m2, 5d

    section Launch Ready (M4)
    Staging validation         :m4a, after m3, 5d
    Production launch          :milestone, after m4a, 0d
​```

---

## Format 3: GitHub Milestones JSON

​```json
[
  {
    "title": "M0: Foundation",
    "description": "Project scaffolding, CI/CD pipeline, development environment",
    "due_on": "YYYY-MM-DDT00:00:00Z"
  },
  {
    "title": "M1: Core MVP",
    "description": "Authentication, CRUD, basic UI, first deployment",
    "due_on": "YYYY-MM-DDT00:00:00Z"
  },
  {
    "title": "M2: Feature Complete",
    "description": "All planned features, edge cases, error handling",
    "due_on": "YYYY-MM-DDT00:00:00Z"
  },
  {
    "title": "M3: Hardening",
    "description": "Performance, security, accessibility, observability",
    "due_on": "YYYY-MM-DDT00:00:00Z"
  },
  {
    "title": "M4: Launch Ready",
    "description": "Staging validation, load testing, documentation, launch",
    "due_on": "YYYY-MM-DDT00:00:00Z"
  }
]
​```

---

## Format 4: Phase Summary

### M0: Foundation
**Goal:** [one sentence]
**Exit Criteria:**
- [ ] [criterion]

### M1: Core MVP
**Goal:** [one sentence]
**Exit Criteria:**
- [ ] [criterion]

### M2: Feature Complete
**Goal:** [one sentence]
**Exit Criteria:**
- [ ] [criterion]

### M3: Hardening
**Goal:** [one sentence]
**Exit Criteria:**
- [ ] [criterion]

### M4: Launch Ready
**Goal:** [one sentence]
**Exit Criteria:**
- [ ] [criterion]

---

## Versioning Convention

| Pattern | Meaning |
|---------|---------|
| v0.x.0 | Pre-release milestones |
| v1.0.0 | First production release |
| v1.x.0 | Feature releases |
| v1.x.y | Patch releases |

## Review Cadence

- Reviewed at start of each milestone
- Updated weekly with progress
```

---

## Template: Operational Runbook

Used by `/docs runbook`.

```markdown
# Runbook: [Service Name]

[![Status](https://img.shields.io/badge/status-active-brightgreen)]()
[![Owner](https://img.shields.io/badge/team-platform-blue)]()
[![Last Tested](https://img.shields.io/badge/last_tested-YYYY--MM--DD-green)]()

## Service Overview

| Field | Value |
|-------|-------|
| Service name | |
| Team | |
| Repository | |
| Language | Java 21 |
| Framework | Micronaut 4.7 |
| Container | bellsoft/liberica-runtime-container:jdk-21-crac-cds-slim-musl |
| Port | 8080 |
| Health | GET /api/v1/health |

## Architecture

[Mermaid diagram or ASCII art]

## Service Level Objectives

| SLO | Target | Measurement |
|-----|--------|-------------|
| Availability | 99.9% | Uptime monitoring |
| Latency p50 | < 50ms | APM |
| Latency p99 | < 500ms | APM |
| Error rate | < 0.1% | Logs |

## Health Checks

### Application
```bash
curl -s http://localhost:8080/api/v1/health | jq .
```

### Database
```bash
docker exec -it <db-container> pg_isready -U <user>
```

## Common Operations

### Deploy
```bash
docker compose up -d --no-deps --build <service>
curl -sf http://localhost:8080/api/v1/health | jq .status
```

### Rollback
```bash
docker compose down <service>
docker tag <service>:<prev> <service>:latest
docker compose up -d <service>
```

### Database Migration
```bash
docker exec <service> java -jar app.jar --flyway.migrate
```

## Alert Response

### High Error Rate
1. Check recent deployments
2. Check logs: `docker logs <container> --tail 100`
3. Rollback if caused by deployment

### High Latency
1. Check resources: `docker stats <container>`
2. Check DB queries: `SELECT * FROM pg_stat_activity WHERE state = 'active'`
3. Scale if resource-constrained

### Out of Memory
1. Check JVM heap: `docker exec <container> jcmd 1 GC.heap_info`
2. Increase memory or scale horizontally

## Disaster Recovery

### Database Restore
```bash
pg_restore -h <host> -U <user> -d <db> /backups/latest.dump
```

## On-Call Contacts

| Role | Name | Contact |
|------|------|---------|
| Primary | | |
| Secondary | | |

## Maintenance

- Review after every incident
- Test procedures quarterly
- Last reviewed: YYYY-MM-DD
```

---

## Template: Support Cluster

Used by `/docs support`. Generates 5 files.

### faq.md

```markdown
# Frequently Asked Questions

[![Audience](https://img.shields.io/badge/audience-all-green)]()

## General

### What is [Product Name]?
[Answer]

### Who is [Product Name] for?
[Answer]

## Getting Started

### How do I create an account?
[Step-by-step]

## Troubleshooting

### Why is [problem] happening?
**Cause:** [explanation]
**Solution:** [steps]
```

### triage-guide.md

```markdown
# Issue Triage Guide

[![Audience](https://img.shields.io/badge/audience-support-yellow)]()

## Severity Levels

| Severity | Definition | Response Time |
|----------|-----------|---------------|
| SEV-1 (Critical) | Service down, data loss | 15 minutes |
| SEV-2 (High) | Major feature broken | 1 hour |
| SEV-3 (Medium) | Partial break, workaround exists | 4 hours |
| SEV-4 (Low) | Minor, cosmetic | 24 hours |

## Triage Decision Tree

[Triage flow]

## Labels

| Label | Meaning |
|-------|---------|
| bug | Confirmed defect |
| not-a-bug | Working as intended |
| duplicate | Already reported |
| needs-info | Need more information |

## Escalation Path

Support Agent → Senior Support → Engineering Lead → VP Engineering
```

### sla.md

```markdown
# Service Level Agreements

[![Audience](https://img.shields.io/badge/audience-operators-orange)]()

## Availability SLA

| Tier | Target | Measurement |
|------|--------|-------------|
| Production | 99.9% | 30-day rolling |

## Response Time SLA

| Severity | First Response | Update Frequency | Resolution |
|----------|---------------|-----------------|------------|
| SEV-1 | 15 min | 30 min | 4 hours |
| SEV-2 | 1 hour | 2 hours | 24 hours |
| SEV-3 | 4 hours | Daily | 5 biz days |
| SEV-4 | 24 hours | Weekly | Next release |

## Maintenance Windows

| Day | Time | Duration | Notice |
|-----|------|----------|--------|
| Sunday | 02:00-06:00 UTC | 4 hours | 72 hours |
```

### post-mortem-template.md

```markdown
# Post-Mortem: [Title]

[![Status](https://img.shields.io/badge/status-draft-yellow)]()

## Incident Summary

| Field | Value |
|-------|-------|
| Date | YYYY-MM-DD |
| Duration | X hours Y minutes |
| Severity | SEV-X |
| Impact | [affected] |
| Resolution | [fix] |

## Timeline (UTC)

| Time | Event |
|------|-------|
| HH:MM | [event] |

## Root Cause

[Explanation]

## Contributing Factors

1. [Factor]

## What Went Well

- [Positive]

## What Could Be Improved

- [Improvement]

## Action Items

| Action | Owner | Priority | Due Date | Status |
|--------|-------|----------|----------|--------|
```

### known-issues.md

```markdown
# Known Issues

[![Audience](https://img.shields.io/badge/audience-all-green)]()
[![Updated](https://img.shields.io/badge/updated-YYYY--MM--DD-blue)]()

## Active Issues

| ID | Issue | Workaround | Severity | Status |
|----|-------|-----------|----------|--------|

## Resolved Issues

| ID | Issue | Resolution | Version |
|----|-------|-----------|---------|
```
