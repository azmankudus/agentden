# Technical Debt Register Template

Copy this template into your project's documentation directory (e.g., `docs/tech-debt-register.md`).

---

# Technical Debt Register

**Last Updated:** YYYY-MM-DD
**Sprint:** Sprint N
**Team:** [Team Name]

## Summary

| Priority | Count | Est. Effort | Allocation |
|----------|-------|-------------|------------|
| CRITICAL | 0 | 0 days | Fix immediately |
| HIGH | 0 | 0 days | Next sprint (from 20% allocation) |
| MEDIUM | 0 | 0 days | Within 2 sprints |
| LOW | 0 | 0 days | Opportunistic |
| **Total** | **0** | **0 days** | |

## Sprint Capacity

```
Total Sprint Capacity:    N story points (or N developer-days)
Feature Work (80%):       N story points
Tech Debt (20%):          N story points ← allocated for debt resolution
```

## Priority Definitions

| Priority | SLA | Example |
|----------|-----|---------|
| CRITICAL | Fix in current sprint, hotfix if needed | Security vulnerability, data loss, production outage |
| HIGH | Fix in next sprint | Missing error handling, no tests on critical path, broken CI |
| MEDIUM | Fix within 2 sprints | Code complexity, missing tests for non-critical path, TODO items |
| LOW | Backlog / opportunistic | Naming improvements, minor refactoring, documentation gaps |

## Category Tags

| Tag | Category | Description |
|-----|----------|-------------|
| `arch` | Architecture | Layer violations, circular dependencies, wrong abstractions |
| `quality` | Code Quality | Complexity, duplication, dead code, naming |
| `test` | Testing | Missing tests, low coverage, flaky tests |
| `security` | Security | Vulnerabilities, missing validation, exposed data |
| `perf` | Performance | N+1 queries, missing indexes, unnecessary renders |
| `deps` | Dependencies | Outdated, vulnerable, unused dependencies |
| `docs` | Documentation | Missing or outdated docs, comments |
| `config` | Configuration | Hard-coded values, missing feature flags |

## Active Debt

| ID | Priority | Category | Description | Location | Effort | Target Sprint | Status | Assignee |
|----|----------|----------|-------------|----------|--------|---------------|--------|----------|
| TD-001 | | | | | | | Open | |
| TD-002 | | | | | | | Open | |
| TD-003 | | | | | | | Open | |

## Resolved Debt

| ID | Priority | Category | Description | Resolution | Resolved Date | Sprint |
|----|----------|----------|-------------|------------|---------------|--------|
| TD-000 | | | | | YYYY-MM-DD | Sprint N |

## Recurring Patterns

Track repeated debt patterns that indicate systemic issues:

| Pattern | Occurrences | Root Cause | Proposed Systemic Fix | Effort |
|---------|-------------|------------|----------------------|--------|
| | N | | | N days |

## Sprint Review Notes

### Sprint N

- **Debt resolved this sprint:** N items, N days effort
- **New debt discovered:** N items
- **Net change:** +/- N items
- **Observations:** 
- **Action items:**

---

## Instructions for Use

### Adding a New Debt Item

1. Assign the next sequential ID (TD-NNN)
2. Set priority using the Priority Definitions table
3. Add category tag from the Category Tags table
4. Write a clear description that includes:
   - What the issue is
   - Why it's debt (what shortcut was taken)
   - What the proper solution would be
5. Reference the exact file and line number in Location
6. Estimate effort in developer-days
7. Set target sprint based on priority SLA

### Resolving a Debt Item

1. Move the row from "Active Debt" to "Resolved Debt"
2. Update Status to "Resolved"
3. Add the resolution description (what was done)
4. Record the resolved date and sprint number
5. Update the Summary counts

### Sprint Planning

1. Review all CRITICAL items — must be addressed this sprint
2. Review all HIGH items — select those fitting within 20% allocation
3. Review MEDIUM items — select if capacity remains
4. Update Target Sprint for selected items
5. Record capacity allocation in Sprint Capacity section

### Retrospective

1. Update Sprint Review Notes
2. Count items resolved vs. new items discovered
3. Identify recurring patterns
4. Propose systemic fixes for patterns with 3+ occurrences
5. Update Summary counts
