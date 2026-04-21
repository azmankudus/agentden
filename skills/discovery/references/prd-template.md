# Product Requirements Document: [Product Name]

## Document Control

| Field | Value |
|-------|-------|
| Version | 1.0 |
| Status | Draft |
| Author | |
| Reviewers | |
| Stakeholders | |
| Created | [YYYY-MM-DD] |
| Last Updated | [YYYY-MM-DD] |

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [YYYY-MM-DD] | [Author] | Initial draft |

---

## 1. Executive Summary

[2-3 paragraphs answering: What are we building? Why are we building it? Who is it for? What outcome do we expect?]

## 2. Problem Statement

### Current Situation
[Describe how things work today and what's wrong with it]

### Pain Points
| Pain Point | Affected Users | Severity | Evidence |
|-----------|---------------|----------|----------|
| | | High/Medium/Low | |

### Opportunity
[What opportunity does solving this create]

## 3. Product Vision & Goals

### Vision Statement
[1-2 sentences: For [target user], who [has this need], [product name] is a [category] that [key benefit]. Unlike [competitor/alternative], our product [differentiation].]

### Strategic Goals

| ID | Goal | Success Metric | Target | Timeline |
|----|------|---------------|--------|----------|
| G-001 | | | | |
| G-002 | | | | |
| G-003 | | | | |

## 4. Target Users & Personas

### Primary Persona: [Name]
- **Role:**
- **Demographics:**
- **Technical proficiency:** Low / Medium / High
- **Primary goals:**
- **Current pain points:**
- **Usage context:** [device, frequency, environment]

### Secondary Persona: [Name]
- **Role:**
- **Demographics:**
- **Technical proficiency:** Low / Medium / High
- **Primary goals:**
- **Current pain points:**
- **Usage context:** [device, frequency, environment]

## 5. Scope

### In Scope — Release 1 (MVP)

| ID | Feature | MoSCoW | Rationale |
|----|---------|--------|-----------|
| F-001 | | Must | |

### In Scope — Release 2

| ID | Feature | MoSCoW | Rationale |
|----|---------|--------|-----------|
| F-002 | | Should | |

### Out of Scope (Future)
- [Feature explicitly deferred]
- [Feature explicitly deferred]

### Non-Goals
- [Things this product will never do]

## 6. Functional Requirements

### 6.1 [Epic / Feature Area]

| ID | Requirement | MoSCoW | Source | User Stories |
|----|------------|--------|--------|-------------|
| REQ-001 | | Must | [Stakeholder/Doc] | US-XXX |

### 6.2 [Epic / Feature Area]

| ID | Requirement | MoSCoW | Source | User Stories |
|----|------------|--------|--------|-------------|
| REQ-002 | | Must | [Stakeholder/Doc] | US-XXX |

## 7. Non-Functional Requirements

| ID | Category | Requirement | Target | Measurement Method |
|----|----------|-------------|--------|-------------------|
| NFR-001 | Performance | API response time | < 200ms p95 | APM (Micronaut metrics) |
| NFR-002 | Performance | Page load time (SSG) | < 1s FCP | Lighthouse |
| NFR-003 | Availability | Uptime SLA | 99.9% | Uptime monitoring |
| NFR-004 | Security | Authentication | JWT + refresh tokens | Security audit |
| NFR-005 | Security | Data encryption | TLS 1.3 in transit, AES-256 at rest | Infrastructure audit |
| NFR-006 | Accessibility | WCAG compliance | 2.2 AA | axe + manual audit |
| NFR-007 | Scalability | Concurrent users | [N] concurrent | Load testing |
| NFR-008 | Compatibility | Browser support | Last 2 versions (Chrome, Firefox, Safari, Edge) | BrowserStack |
| NFR-009 | Internationalization | Multi-language | English first, i18n-ready architecture | Code review |

## 8. User Stories

> See [User Stories Document](../stories/<project>-stories.md) for complete details.

| Story ID | Title | Epic | MoSCoW | Status |
|----------|-------|------|--------|--------|
| US-001 | | EPIC-001 | Must | Draft |

## 9. Domain Model

> See [Domain Model Document](../domain/<project>-domain.md) for complete details.

### Key Entities
[List entities with brief descriptions]

### Entity Relationships
[Textual ER diagram]

### Domain Glossary
[Key terms and definitions]

## 10. Business Rules

| Rule ID | Name | Description | Enforced In |
|---------|------|-------------|-------------|
| BR-001 | | | |

## 11. Technical Constraints

| Constraint | Value | Rationale |
|-----------|-------|-----------|
| Frontend framework | SolidJS 1.9 + SolidStart (SSG) | Project standard |
| Backend framework | Java 21 + Micronaut 4.7 | Project standard |
| Build tool (frontend) | Bun 1.2+ | Project standard |
| Build tool (backend) | Gradle 8.13 (Kotlin DSL) | Project standard |
| Container runtime | Docker/Podman | Project standard |
| Frontend container | nginx:stable-alpine | Static serving, reverse proxy |
| Backend container | bellsoft/liberica-runtime-container:jdk-21-crac-cds-slim-musl | CRaC + CDS optimization |

## 12. Assumptions & Dependencies

### Assumptions
- [Assumption 1]
- [Assumption 2]

### Dependencies
| Dependency | Type | Risk if Unavailable | Mitigation |
|-----------|------|-------------------|------------|
| | Third-party API / Library / Service | | |

## 13. Risks & Mitigations

| Risk ID | Description | Probability | Impact | Mitigation | Status |
|---------|-------------|-------------|--------|------------|--------|
| RISK-001 | | Low/Med/High | Low/Med/High | | Open/Mitigated/Closed |

## 14. Competitive Landscape

| Competitor | Key Differentiator | Our Advantage |
|-----------|-------------------|---------------|
| | | |

## 15. Open Questions

| ID | Question | Owner | Due Date | Status |
|----|----------|-------|----------|--------|
| OQ-001 | | | | Open |

## 16. Approval

| Role | Name | Date | Approved |
|------|------|------|----------|
| Product Owner | | | |
| Tech Lead | | | |
| Design Lead | | | |
| Stakeholder | | | |
