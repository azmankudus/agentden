# Technical Specification: [Feature Name]

> **Status:** Draft | In Review | Approved
> **Author:** [Name]
> **Created:** YYYY-MM-DD
> **Updated:** YYYY-MM-DD
> **Target Milestone:** Mn

## 1. Overview

### 1.1 Problem Statement

[What problem does this feature solve? Why is it needed now?]

### 1.2 Goals

- [Goal 1]
- [Goal 2]
- [Goal 3]

### 1.3 Non-Goals (Explicitly Out of Scope)

- [Non-goal 1]
- [Non-goal 2]

## 2. Requirements

### 2.1 Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|-------------------|
| FR-001 | [Description] | Must | [Given/When/Then] |
| FR-002 | [Description] | Must | [Given/When/Then] |
| FR-003 | [Description] | Should | [Given/When/Then] |
| FR-004 | [Description] | Nice | [Given/When/Then] |

### 2.2 Non-Functional Requirements

| ID | Category | Requirement | Target |
|----|----------|-------------|--------|
| NFR-001 | Performance | [Description] | [Quantified target] |
| NFR-002 | Security | [Description] | [Standard/measure] |
| NFR-003 | Availability | [Description] | [SLA target] |
| NFR-004 | Accessibility | [Description] | [WCAG level] |

## 3. Architecture

### 3.1 System Context

[How does this feature fit into the overall system? Diagram or description.]

### 3.2 Module Design

[Which modules are affected? New modules needed? Module boundaries.]

### 3.3 Data Model

[Database schema changes. New tables, columns, indexes.]

```sql
-- Migration: V{version}__{description}.sql
-- Tables, columns, constraints, indexes
```

### 3.4 API Contract

[New or modified API endpoints.]

| Method | Path | Request | Response | Auth |
|--------|------|---------|----------|------|
| GET | /api/v1/resource | - | `{ data }` | Required |
| POST | /api/v1/resource | `{ body }` | `{ created }` | Required |
| PUT | /api/v1/resource/:id | `{ body }` | `{ updated }` | Required |
| DELETE | /api/v1/resource/:id | - | 204 | Required |

### 3.5 Frontend Design

[Component hierarchy. Route changes. State management approach.]

### 3.6 Error Handling

[Error scenarios and responses.]

| Scenario | HTTP Status | Error Code | User Message |
|----------|-------------|------------|-------------|
| [Scenario] | [Code] | [Code] | [Message] |

## 4. Implementation Plan

### 4.1 Task Breakdown

| Task | Description | Points | Depends On |
|------|-------------|--------|------------|
| TASK-001 | [Description] | [N] | - |
| TASK-002 | [Description] | [N] | TASK-001 |

### 4.2 Dependency Graph

[Text-based or mermaid diagram of task dependencies.]

### 4.3 Critical Path

[Which tasks are on the critical path? What's the estimated timeline?]

## 5. Testing Strategy

### 5.1 Unit Tests

[What to unit test. Coverage targets.]

### 5.2 Integration Tests

[What integration scenarios to cover.]

### 5.3 End-to-End Tests

[Critical user flows to test end-to-end.]

### 5.4 Performance Tests

[Load testing plan, if applicable.]

## 6. Security Considerations

- [Authentication/authorization requirements]
- [Input validation strategy]
- [Data protection requirements]
- [Known security risks and mitigations]

## 7. Migration Plan

[How to roll this out. Feature flags? Phased rollout? Data migration?]

## 8. Monitoring & Observability

- **Metrics:** [What to measure]
- **Logs:** [What to log, at what level]
- **Alerts:** [What conditions trigger alerts]
- **Dashboards:** [What to visualize]

## 9. Open Questions

- [ ] [Question 1]
- [ ] [Question 2]

## 10. References

- [ADR-XXXX: Relevant architecture decision]
- [Related spec or document]
- [External reference]
