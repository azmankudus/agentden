# Conventional Commits Guide

## Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

## Rules

1. Subject line (first line) max 72 characters
2. Use imperative mood: "add", "fix", "update" — not "added", "fixed", "updated"
3. No period at the end of the subject line
4. Body is separated from subject by a blank line
5. Body explains **why** the change was made, not **what** was changed
6. Footer references issues, breaking changes, or co-authors

## Types

| Type | Usage | Example |
|------|-------|---------|
| `feat` | New feature for the user | `feat(frontend): add user profile page` |
| `fix` | Bug fix for the user | `fix(backend): return 404 for missing person` |
| `refactor` | Code restructuring, no behavior change | `refactor(api): extract shared validation logic` |
| `test` | Adding or updating tests | `test(frontend): add UserList component tests` |
| `docs` | Documentation only | `docs(api): update OpenAPI spec for persons` |
| `chore` | Build, tooling, maintenance | `chore(deps): update SolidJS to 1.9.5` |
| `ci` | CI/CD pipeline changes | `ci: add Detekt step to GitHub Actions` |
| `style` | Formatting, whitespace (no logic change) | `style(frontend): sort TailwindCSS classes` |
| `perf` | Performance improvement | `perf(backend): add index on persons.email` |
| `build` | Build system changes | `build(backend): upgrade Shadow plugin to 8.3.6` |

## Scopes

| Scope | Used For | Files Affected |
|-------|----------|----------------|
| `frontend` | SolidJS / TypeScript / CSS changes | `src/**/*.{ts,tsx,css}` |
| `backend` | Micronaut / Java changes | `src/**/*.java`, `build.gradle.kts` |
| `api` | API contract changes (endpoints, DTOs) | Controllers, DTOs, OpenAPI specs |
| `infra` | Docker, nginx, CI/CD, deployment | `Dockerfile`, `nginx.conf`, `.github/` |
| `deps` | Dependency updates | `package.json`, `build.gradle.kts` |

## Examples

### Simple Feature

```
feat(frontend): add search bar to product list

Users can now search products by name. Uses createMemo for
filtered results with debounced input.

Closes #42
```

### Bug Fix

```
fix(backend): handle null email in PersonService

PersonService.update() threw NPE when email was null in the
update request. Added null-safe handling with Optional.

Fixes #87
```

### Breaking Change

```
feat(api)!: change person response to include full address

BREAKING CHANGE: PersonResponse.address is now an object instead
of a string. Clients must update their address handling.

Migration: Replace `response.address` with `response.address.full`
```

### Refactor

```
refactor(backend): extract validation to shared utility

Duplicated validation logic across PersonController and
OrderController extracted to ValidationUtils. No behavior change.

Refs #45
```

### Test Addition

```
test(frontend): add UserList component tests

Added tests for:
- Rendering user cards
- Loading state
- Error state
- Empty state

Covers #42 acceptance criteria
```

### Dependency Update

```
chore(deps): update SolidJS to 1.9.5

- solid-js: 1.9.4 → 1.9.5
- @solidjs/router: 0.15.2 → 0.15.3

No breaking changes per changelog.
```

### CI/CD Change

```
ci: add Detekt lint step to backend workflow

Adds Detekt static analysis to the backend CI pipeline.
Failures on MAJOR severity or higher will block merge.
```

## PR Title Convention

When squashing a PR, the PR title becomes the commit message:

```
PR Title: feat(frontend): add user profile page
```

This becomes the squash commit on `main`:

```
feat(frontend): add user profile page (#42)
```

## Anti-Patterns

```
# ❌ WRONG: too vague
fix: fixed stuff

# ❌ WRONG: past tense
fixed(backend): handled null pointer

# ❌ WRONG: no scope
feat: added new page

# ❌ WRONG: period at end
feat(frontend): add user profile page.

# ❌ WRONG: too long (> 72 chars)
feat(frontend): add a new user profile page with avatar upload and edit functionality

# ✅ CORRECT: concise, imperative, scoped
feat(frontend): add user profile page with avatar upload
```
