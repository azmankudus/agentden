# Risk Register: [Project Name]

> **Last Updated:** YYYY-MM-DD
> **Status:** Active
> **Next Review:** YYYY-MM-DD

## Risk Assessment Scale

| Score | Likelihood | Impact |
|-------|-----------|--------|
| 1 | Rare | Trivial — negligible effect |
| 2 | Unlikely | Minor — small delay or cost increase |
| 3 | Possible | Moderate — milestone delay, workaround needed |
| 4 | Likely | Major — milestone missed, significant rework |
| 5 | Almost certain | Critical — project failure, data loss, security breach |

**Risk Score = Likelihood × Impact**

| Score Range | Priority | Response |
|-------------|----------|----------|
| 1-4 | Low | Accept and monitor |
| 5-9 | Medium | Mitigate proactively |
| 10-15 | High | Active mitigation, contingency plan required |
| 16-25 | Critical | Escalate immediately, avoid or transfer |

---

## Active Risks

### RISK-001: [Title]

- **Category:** Technical | Architectural | Infrastructure | Security | Schedule | Team | External
- **Likelihood:** [1-5]
- **Impact:** [1-5]
- **Risk Score:** [L × I]
- **Priority:** Low | Medium | High | Critical
- **Status:** Open | Mitigating | Accepted
- **Trigger:** [What indicates this risk is materializing]
- **Mitigation:** [Proactive action to reduce likelihood or impact]
- **Contingency:** [Reactive action if risk materializes]
- **Owner:** [Role]
- **Review Date:** YYYY-MM-DD
- **Related ADR:** [ADR-NNNN, if applicable]

---

### RISK-002: [Title]

[Same structure as RISK-001]

---

## Risk Summary Matrix

```
Impact →     1        2        3        4        5
Likelihood ↓
     5                R-003    R-001
     4       R-004                      R-002
     3                         R-005
     2                                  R-006
     1
```

## Risk Summary by Category

| Category | Count | Avg Score | Highest Risk |
|----------|-------|-----------|-------------|
| Technical | N | N | RISK-XXX |
| Architectural | N | N | RISK-XXX |
| Infrastructure | N | N | RISK-XXX |
| Security | N | N | RISK-XXX |
| Schedule | N | N | RISK-XXX |
| Team | N | N | RISK-XXX |
| External | N | N | RISK-XXX |

## Mitigation Tracking

| Risk ID | Mitigation Action | Due Date | Status | Owner |
|---------|------------------|----------|--------|-------|
| RISK-001 | [Action] | YYYY-MM-DD | Not Started | [Role] |
| RISK-002 | [Action] | YYYY-MM-DD | In Progress | [Role] |

## Closed Risks

### RISK-NNN: [Title] (Closed)

- **Closed Date:** YYYY-MM-DD
- **Resolution:** Avoided | Mitigated | Accepted | Transferred | No longer applicable
- **Outcome:** [What happened]
- **Lessons Learned:** [What we learned for future projects]

## Review History

| Date | Attendees | Key Decisions | Actions |
|------|-----------|--------------|---------|
| YYYY-MM-DD | [Names] | [Decisions] | [Actions] |
