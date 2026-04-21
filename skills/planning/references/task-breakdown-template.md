# Task Breakdown: [Epic Name]

> **Status:** Draft | In Progress | Complete
> **Created:** YYYY-MM-DD
> **Updated:** YYYY-MM-DD
> **Target Milestone:** Mn
> **Total Estimate:** N story points

## Epic Description

**User Story:** As a [user], I want [outcome] so that [benefit].

**Business Value:** [Why this matters. What metric improves?]

**Technical Context:** [Key architectural decisions, constraints, dependencies on other epics.]

---

## Feature 1: [Feature Name]

**User Story:** As a [user], I want [action] so that [benefit].

**Acceptance Criteria:**
- [ ] Given [context], When [action], Then [result]
- [ ] Given [context], When [action], Then [result]
- [ ] Given [context], When [action], Then [result]

**Dependencies:** [What must be done first]

**Risk:** [What could go wrong]

### Tasks

#### TASK-001: [Imperative task description]

- **Files:**
  - Create: `path/to/new-file.ts`
  - Modify: `path/to/existing-file.ts:123-145`
  - Test: `path/to/test-file.ts`
- **Estimate:** [Story points: 1, 2, 3, 5, 8, 13]
- **Depends On:** [TASK-XXX or "None"]
- **Test:** [How to verify completion]
- **Commit Message:** `feat(scope): <description>`

- [ ] **Step 1:** [Specific action with expected outcome]
- [ ] **Step 2:** [Specific action with expected outcome]
- [ ] **Step 3:** Commit

```
git add <files>
git commit -m "feat(scope): <description>"
```

---

#### TASK-002: [Imperative task description]

- **Files:**
  - Create: `server/src/main/java/com/org/project/module/controller/XxxController.java`
  - Create: `server/src/main/java/com/org/project/module/service/XxxService.java`
  - Create: `server/src/main/resources/db/migration/V{N}__create_xxx_table.sql`
  - Test: `server/src/test/java/com/org/project/module/controller/XxxControllerTest.java`
- **Estimate:** [Story points]
- **Depends On:** TASK-001
- **Test:** [How to verify]
- **Commit Message:** `feat(scope): <description>`

- [ ] **Step 1:** Write Flyway migration for [table]
- [ ] **Step 2:** Write repository layer
- [ ] **Step 3:** Write service layer with business logic
- [ ] **Step 4:** Write controller with API endpoints
- [ ] **Step 5:** Write integration tests
- [ ] **Step 6:** Run `./gradlew check` and verify all tests pass
- [ ] **Step 7:** Commit

---

#### TASK-003: [Imperative task description]

- **Files:**
  - Create: `app/src/lib/api/xxxApi.ts`
  - Create: `app/src/components/organisms/XxxComponent.tsx`
  - Modify: `app/src/routes/xxx.tsx`
  - Test: `app/src/components/organisms/XxxComponent.test.ts`
- **Estimate:** [Story points]
- **Depends On:** TASK-002
- **Test:** [How to verify]
- **Commit Message:** `feat(scope): <description>`

- [ ] **Step 1:** Create typed API client functions
- [ ] **Step 2:** Create UI component with SolidJS signals
- [ ] **Step 3:** Wire component into route with `routeData`
- [ ] **Step 4:** Write component tests
- [ ] **Step 5:** Run `bun run test` and verify all tests pass
- [ ] **Step 6:** Commit

---

## Feature 2: [Feature Name]

[Same structure as Feature 1]

---

## Dependency Graph

```
TASK-001 (database migration)
  └── TASK-002 (backend API)
       ├── TASK-003 (frontend integration)
       │    └── TASK-004 (E2E test)
       └── TASK-005 (backend unit tests)

TASK-006 (independent utility) ← no dependency, parallelizable
```

**Critical Path:** TASK-001 → TASK-002 → TASK-003 → TASK-004
**Parallelizable:** TASK-005, TASK-006 can run alongside the critical path.

---

## Estimate Summary

| Feature | Tasks | Total Points |
|---------|-------|-------------|
| Feature 1: [Name] | TASK-001, TASK-002, TASK-003 | N |
| Feature 2: [Name] | TASK-004, TASK-005 | N |
| **Total** | | **N** |

## Parallelization Plan

**Wave 1 (No dependencies):**
- TASK-001, TASK-006

**Wave 2 (After TASK-001):**
- TASK-002, TASK-005

**Wave 3 (After TASK-002):**
- TASK-003, TASK-004

## Checklist Before Starting Implementation

- [ ] All tasks have exact file paths
- [ ] All tasks have story point estimates
- [ ] All dependencies are mapped
- [ ] No task exceeds 13 story points
- [ ] Acceptance criteria are testable
- [ ] Migration files are planned for database changes
- [ ] Test files are identified for each task
- [ ] Commit messages follow conventional format
