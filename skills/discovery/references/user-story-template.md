# User Story Template

## Story Format

### US-[NNN]: [Title]

**As a** [persona]
**I want** [action]
**So that** [outcome/value]

**Priority:** Must / Should / Could / Won't
**Epic:** EPIC-[NNN]
**Estimate:** [points / S/M/L/XL]
**Sprint/Phase:** [target]
**Status:** Draft / Ready / In Progress / Done

---

## Acceptance Criteria

### AC-1: [Scenario Name — Happy Path]
- **Given** [precondition]
- **And** [additional context]
- **When** [user action / system event]
- **Then** [expected result]
- **And** [additional result]

### AC-2: [Scenario Name — Error/Edge Case]
- **Given** [precondition]
- **When** [action with invalid input / edge condition]
- **Then** [error message / expected fallback behavior]

### AC-3: [Scenario Name — Boundary/Permission]
- **Given** [user has specific role / data is in specific state]
- **When** [action attempted]
- **Then** [permission outcome / boundary behavior]

---

## Edge Cases
- [Edge case]: [expected behavior]
- [Edge case]: [expected behavior]

## Dependencies
- [US-XXX must complete first]
- [External system must be available]

## Blockers
- [Current blocker and resolution path]

## Design References
- [Link to wireframe/mockup]
- [Link to interaction specification]

## Questions / Open Items
- [ ] [Unresolved question]
- [ ] [Unresolved question]

---

## Acceptance Criteria Patterns

### Pattern: CRUD Operation
```
Given a [entity] exists with [attributes]
When the user [creates/reads/updates/deletes] the [entity]
Then the [entity] is [created/returned/updated/removed]
And the user sees [confirmation/feedback]
```

### Pattern: Validation
```
Given the user is on the [form] page
When the user submits with [invalid input]
Then the [field] shows error "[message]"
And the form is not submitted
```

### Pattern: Authentication/Authorization
```
Given the user is [authenticated/unauthenticated] with role [role]
When the user attempts to [action]
Then the user [sees/is redirected to] [result]
```

### Pattern: Search/Filter
```
Given [N] items exist matching [criteria]
When the user searches for "[query]" / applies filter [filter]
Then [matching] items are displayed
And [non-matching] items are hidden
And results are sorted by [sort order]
```

### Pattern: Async Operation
```
Given the user initiates [long-running action]
When the action is processing
Then the user sees [progress indicator/loading state]
When the action completes
Then the user sees [success/failure notification]
```

### Pattern: List/Pagination
```
Given [N] items exist
When the user views the [list] page
Then [page_size] items are displayed
And pagination controls show [total pages]
When the user clicks page [N]
Then items for page [N] are displayed
```

---

## Story Writing Checklist

Before marking a story as "Ready":

- [ ] Uses defined persona (not "user" generically)
- [ ] "So that" clause expresses clear business value
- [ ] Acceptance criteria cover happy path + error cases
- [ ] Edge cases identified
- [ ] Dependencies listed
- [ ] No implementation details in the story
- [ ] Story is independently deliverable (or dependencies explicit)
- [ ] Acceptance criteria are testable (clear pass/fail)
- [ ] Story can be estimated by the team
- [ ] Story is small enough for a single sprint
