# agentden

Agentic skills for the complete software development lifecycle — from discovery to production operations. Each skill is self-contained with instructions, templates, scaffolds, and reference files. Mirrors how humans build, ship, and maintain software.

## Tech Stack

### Frontend
| Layer | Technology | Version |
|-------|-----------|---------|
| Runtime | [Bun](https://bun.sh) | 1.2+ |
| Language | TypeScript | 5.8+ (strict) |
| Framework | [SolidJS](https://solidjs.com) + [SolidStart](https://start.solidjs.com) (SSG) | 1.9+ |
| Styling | [TailwindCSS](https://tailwindcss.com) | 4.1+ (CSS-first `@theme`) |
| Icons | [Iconify-Solid](https://iconify.design/docs/icon-components/solid/) | 2.x |
| Testing | Vitest + Playwright | Latest |
| Container | nginx:stable-alpine | — |

### Backend
| Layer | Technology | Version |
|-------|-----------|---------|
| Language | Java | 21 (LTS, virtual threads, records, sealed types) |
| Framework | [Micronaut](https://micronaut.io) | 4.7+ |
| Build | Gradle (Kotlin DSL) | 8.13+ |
| Serialization | micronaut-serde-jackson | — |
| Testing | JUnit 5 + Micronaut Test | — |
| Container | bellsoft/liberica-runtime-container:jdk-21-crac-cds-slim-musl | — |

### Architecture

```
┌─────────────────────────┐       ┌──────────────────────────┐
│       Frontend          │       │        Backend           │
│   SolidJS SSG (Bun)     │──────▶│   Micronaut 4 (Java 21)  │
│   nginx:stable-alpine   │ REST  │   Liberica CRaC + CDS    │
│   Port: 80              │ JSON  │   Port: 8080             │
└─────────────────────────┘       └──────────────────────────┘
                                           │
                                           ▼
                                   ┌──────────────┐
                                   │   Database   │
                                   │  PostgreSQL  │
                                   └──────────────┘
```

## Skills Directory

Each skill is a self-contained directory following the [Agent Skills](https://agentskills.io) standard:

```
skills/<skill-name>/
├── SKILL.md              # YAML frontmatter + instructions + commands
└── references/           # Templates, scaffolds, patterns, checklists
```

### Development Lifecycle

| # | Skill | Description | Commands |
|---|-------|-------------|----------|
| 1 | [discovery](skills/discovery/) | Requirements gathering, stakeholder interviews, PRD generation, feasibility analysis | `/discovery spec`, `/discovery stories`, `/discovery feasibility`, `/discovery check` |
| 2 | [planning](skills/planning/) | Architecture design, ADRs, task decomposition, milestone roadmap, CI/CD design | `/plan spec`, `/plan adr`, `/plan decompose`, `/plan roadmap`, `/plan env`, `/plan check` |
| 3 | [design](skills/design/) | UI/UX with TailwindCSS v4, component architecture, data models, API contracts (OpenAPI 3.1), security | `/design ui`, `/design api`, `/design data`, `/design components`, `/design security`, `/design check` |
| 4 | [implementation](skills/implementation/) | Full project scaffolds (frontend + backend), code generation, convention enforcement | `/impl scaffold-frontend`, `/impl scaffold-backend`, `/impl component`, `/impl route`, `/impl controller`, `/impl service`, `/impl repository`, `/impl dto`, `/impl check` |
| 5 | [testing](skills/testing/) | Unit (Vitest + JUnit 5), integration, E2E (Playwright), performance (k6), security, accessibility | `/test unit`, `/test integration`, `/test e2e`, `/test performance`, `/test security`, `/test a11y`, `/test coverage`, `/test check` |
| 6 | [review](skills/review/) | PR review checklists, linting, conventional commits, tech debt management, convention audit | `/review pr`, `/review frontend`, `/review backend`, `/review lint`, `/review debt`, `/review check` |
| 7 | [build-release](skills/build-release/) | Container builds (Docker/Podman), CI/CD pipelines (GitHub Actions), deployment, rollback | `/build frontend`, `/build backend`, `/build pipeline`, `/build release`, `/build deploy`, `/build rollback` |
| 8 | [monitoring](skills/monitoring/) | Logs, metrics (Prometheus), traces (OpenTelemetry), alerting, dashboards, incident response | `/monitor setup`, `/monitor dashboard`, `/monitor alerts`, `/monitor runbook`, `/monitor incident`, `/monitor health` |
| 9 | [maintenance](skills/maintenance/) | Dependency updates, database migrations (Flyway), tech debt reduction, security patches, deprecation | `/maintain deps`, `/maintain migrate`, `/maintain debt`, `/maintain optimize`, `/maintain security`, `/maintain deprecate`, `/maintain check` |
| 10 | [knowledge](skills/knowledge/) | Full SDLC documentation toolchain, onboarding guides, ADRs, health reports, support clusters | `/docs scaffold`, `/docs spec`, `/docs roadmap`, `/docs onboarding`, `/docs validate`, `/docs health`, `/docs runbook`, `/docs support` |

### Reference Files Per Skill

| Skill | Reference Files |
|-------|----------------|
| **discovery** | `prd-template.md`, `user-story-template.md`, `feasibility-checklist.md`, `domain-glossary-template.md` |
| **planning** | `technical-spec-template.md`, `adr-template.md`, `roadmap-template.md`, `risk-register-template.md`, `task-breakdown-template.md` |
| **design** | `api-spec-template.md`, `data-model-template.md`, `component-architecture-template.md`, `security-design-template.md`, `design-system-template.md` |
| **implementation** | `frontend-scaffold/` (18 files), `backend-scaffold/` (12 files), `frontend-conventions.md`, `backend-conventions.md`, `code-standards.md` |
| **testing** | (patterns and checklists embedded in SKILL.md) |
| **review** | `frontend-review-checklist.md`, `backend-review-checklist.md`, `tech-debt-register-template.md`, `conventional-commits-guide.md` |
| **build-release** | (Dockerfiles, nginx.conf, CI/CD workflows embedded in SKILL.md) |
| **monitoring** | (configurations and templates embedded in SKILL.md) |
| **maintenance** | (templates and checklists embedded in SKILL.md) |
| **knowledge** | `sdlc-structure.md`, `sdlc-templates.md`, `onboarding-template.md`, `badges.md`, `documentation-lint-rules.md` |

## Project Scaffolds

### Frontend (`skills/implementation/references/frontend-scaffold/`)

Production-ready SolidJS SSG project with Bun + TailwindCSS v4 + Iconify-Solid:

```
frontend-scaffold/
├── app.config.ts           # SolidStart SSG + TailwindCSS v4 plugin
├── package.json             # Bun dependencies (solid-js 1.9, @tailwindcss/vite 4.1, vitest 3.1)
├── tsconfig.json            # TypeScript strict, jsxImportSource: solid-js
├── vitest.config.ts         # Vitest + vite-plugin-solid + jsdom
├── eslint.config.js         # ESLint flat config + solid plugin
├── .prettierrc              # Prettier + tailwindcss plugin
├── Dockerfile               # oven/bun:1 → nginx:stable-alpine
├── nginx.conf               # gzip, caching, SPA fallback, security headers, /health
├── .dockerignore, .gitignore, env.d.ts
├── public/robots.txt, test/setup.ts
└── src/
    ├── entry-client.tsx     # Client hydration
    ├── entry-server.tsx     # SSR HTML shell
    ├── app.tsx              # Router + Suspense + nav + footer
    ├── app.css              # @import "tailwindcss" + @theme (oklch colors, Inter font)
    └── routes/index.tsx     # Home page with Iconify icons
```

### Backend (`skills/implementation/references/backend-scaffold/`)

Production-ready Micronaut 4 project with Java 21 + Liberica CRaC:

```
backend-scaffold/
├── build.gradle.kts         # Micronaut 4.5.2 + Shadow 8.3.6 + AOT
├── settings.gradle.kts
├── gradle.properties         # micronautVersion=4.7.6
├── micronaut-cli.yml
├── Dockerfile                # Liberica CRaC multi-stage (Gradle → runtime)
├── .dockerignore, .gitignore
├── gradle/wrapper/gradle-wrapper.properties (Gradle 8.13)
└── src/
    ├── main/java/com/example/
    │   ├── Application.java
    │   ├── controller/HealthController.java    # @Serdeable record, /api/v1/health
    │   └── exception/GlobalExceptionHandler.java  # RFC 7807 ErrorResponse
    ├── main/resources/
    │   ├── application.yml    # CORS, health, Jackson, logging
    │   └── logback.xml
    └── test/java/com/example/controller/
        └── HealthControllerTest.java  # @MicronautTest + JUnit 5
```

## Quick Start

### Scaffold a New Project

```
# Frontend
/impl scaffold-frontend

# Backend
/impl scaffold-backend
```

### Container Build & Run

```bash
# Frontend
docker build -t frontend:latest ./frontend
docker run -p 3000:80 frontend:latest

# Backend
docker build -t backend:latest ./backend
docker run -p 8080:8080 backend:latest
```

## SDLC Documentation Structure

The `knowledge` skill scaffolds documentation following this structure:

```
docs/
├── 00-product/          # Pre: spec, PRD, roadmap, SRS, user stories
├── 01-architecture/     # Pre/During: overview, patterns, ADRs
├── 02-development/      # During: getting started, workflows, testing
├── 03-deployment/       # Post: overview, runbook, CI/CD
├── 04-api/              # During/Post: contracts, endpoints
└── 05-support/          # Post: FAQ, triage, SLA, post-mortem
```

Generate with: `/docs scaffold --phase all`

## SKILL.md Format

Each skill follows the [Agent Skills](https://agentskills.io) standard:

```yaml
---
name: skill-name
metadata:
  compatible_agents: [claude-code]
  tags: [tag1, tag2]
description: >
  Multi-line description with trigger phrases...
---
```

The markdown body contains instructions, commands, code examples, and reference file tables that the agent follows when the skill is active.

## Statistics

- **10 skills** covering the full SDLC
- **68 files** total (SKILL.md + references + scaffolds)
- **15,300+ lines** of comprehensive agent instructions
- **30 files** of templates, scaffolds, and checklists

## License

See [LICENSE](LICENSE).
