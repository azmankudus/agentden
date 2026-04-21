# Badge Standards Reference

Complete catalog of Shields.io badges for project documentation.

---

## Badge Format

All badges use [Shields.io](https://shields.io) with this format:

```
[![Alt Text](https://img.shields.io/badge/LABEL-VALUE-COLOR)](URL)
```

## Status Badges

| Badge | Markdown |
|-------|----------|
| Draft | `[![Status](https://img.shields.io/badge/status-draft-yellow)]()` |
| In Review | `[![Status](https://img.shields.io/badge/status-in_review-orange)]()` |
| Approved | `[![Status](https://img.shields.io/badge/status-approved-green)]()` |
| Published | `[![Status](https://img.shields.io/badge/status-published-brightgreen)]()` |
| Deprecated | `[![Status](https://img.shields.io/badge/status-deprecated-lightgray)]()` |
| Active | `[![Status](https://img.shields.io/badge/status-active-brightgreen)]()` |

## Phase Badges

| Badge | Markdown |
|-------|----------|
| Pre-development | `[![Phase](https://img.shields.io/badge/phase-pre_development-purple)]()` |
| During development | `[![Phase](https://img.shields.io/badge/phase-development-blue)]()` |
| Post-development | `[![Phase](https://img.shields.io/badge/phase-post_development-teal)]()` |

## Audience Badges

| Badge | Markdown |
|-------|----------|
| All | `[![Audience](https://img.shields.io/badge/audience-all-green)]()` |
| Developers | `[![Audience](https://img.shields.io/badge/audience-developers-green)]()` |
| Operators | `[![Audience](https://img.shields.io/badge/audience-operators-orange)]()` |
| Product | `[![Audience](https://img.shields.io/badge/audience-product-blue)]()` |
| Support | `[![Audience](https://img.shields.io/badge/audience-support-yellow)]()` |

## Roadmap / Milestone Badges

| Badge | Markdown |
|-------|----------|
| Planned | `[![Planned](https://img.shields.io/badge/status-planned-blue)]()` |
| In Progress | `[![In Progress](https://img.shields.io/badge/status-in_progress-yellow)]()` |
| Complete | `[![Complete](https://img.shields.io/badge/status-complete-brightgreen)]()` |
| Blocked | `[![Blocked](https://img.shields.io/badge/status-blocked-red)]()` |

## ADR Status Badges

| Badge | Markdown |
|-------|----------|
| Proposed | `[![Status](https://img.shields.io/badge/status-proposed-orange)]()` |
| Accepted | `[![Status](https://img.shields.io/badge/status-accepted-green)]()` |
| Rejected | `[![Status](https://img.shields.io/badge/status-rejected-red)]()` |
| Superseded | `[![Status](https://img.shields.io/badge/status-superseded-blue)]()` |

## Project Badges

| Badge | Markdown |
|-------|----------|
| License | `[![License](https://img.shields.io/badge/license-MIT-blue)]()` |
| Build | `[![Build](https://img.shields.io/github/actions/workflow/status/ORG/REPO/ci.yml?branch=main)]()` |
| Coverage | `[![Coverage](https://img.shields.io/codecov/c/github/ORG/REPO)]()` |
| Version | `[![Version](https://img.shields.io/badge/version-X.X.X-blue)]()` |
| Docs | `[![Docs](https://img.shields.io/badge/docs-latest-green)]()` |

## Metadata Badges

| Badge | Markdown |
|-------|----------|
| Owner | `[![Owner](https://img.shields.io/badge/team-TEAM-blue)]()` |
| Generated | `[![Generated](https://img.shields.io/badge/generated-YYYY--MM--DD-blue)]()` |
| Updated | `[![Updated](https://img.shields.io/badge/updated-YYYY--MM--DD-blue)]()` |
| Last Tested | `[![Last Tested](https://img.shields.io/badge/last_tested-YYYY--MM--DD-green)]()` |
| Estimated Time | `[![Estimated Time](https://img.shields.io/badge/setup_time-30_minutes-orange)]()` |

## Score Badges

| Badge | Markdown |
|-------|----------|
| Score (Excellent) | `[![Score](https://img.shields.io/badge/score-XX%2F100-brightgreen)]()` |
| Score (Good) | `[![Score](https://img.shields.io/badge/score-XX%2F100-green)]()` |
| Score (Adequate) | `[![Score](https://img.shields.io/badge/score-XX%2F100-yellow)]()` |
| Score (Below) | `[![Score](https://img.shields.io/badge/score-XX%2F100-orange)]()` |
| Score (Critical) | `[![Score](https://img.shields.io/badge/score-XX%2F100-red)]()` |

## Severity Badges

| Badge | Markdown |
|-------|----------|
| SEV-1 | `[![SEV](https://img.shields.io/badge/severity-SEV_1-critical)]()` |
| SEV-2 | `[![SEV](https://img.shields.io/badge/severity-SEV_2-red)]()` |
| SEV-3 | `[![SEV](https://img.shields.io/badge/severity-SEV_3-orange)]()` |
| SEV-4 | `[![SEV](https://img.shields.io/badge/severity-SEV_4-yellow)]()` |

## Color Reference

| Color | Hex | Use For |
|-------|-----|---------|
| brightgreen | 44CC11 | Active, complete, passing |
| green | 97CA00 | Accepted, good |
| yellow | DFBA00 | Draft, in progress, warning |
| orange | FE7D37 | In review, proposed, needs attention |
| red | E05D44 | Blocked, rejected, critical |
| blue | 007EC6 | Info, planned, version |
| purple | 8957E5 | Phase, category |
| teal | 17BEBB | Post-development, specialty |
| lightgray | 9F9F9F | Deprecated, inactive |

## Placement Rules

1. First badge after H1 — always status badge
2. Second badge — version or phase
3. Third badge (optional) — audience
4. Maximum 3 badges per document header
5. Tables may use single-badge format inline
