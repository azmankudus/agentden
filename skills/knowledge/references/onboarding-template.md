# Onboarding Guide Template

Full template for developer onboarding. Used by `/docs onboarding`.

---

## Template

```markdown
# Developer Onboarding Guide: [Project Name]

[![Audience](https://img.shields.io/badge/audience-new_developer-green)]()
[![Estimated Time](https://img.shields.io/badge/setup_time-30_minutes-orange)]()
[![Updated](https://img.shields.io/badge/updated-YYYY--MM--DD-blue)]()

## Welcome

Welcome to [Project Name]! This guide will get you from zero to contributing in
under 30 minutes.

## Prerequisites

### Required Software

| Software | Version | Install | Verify |
|----------|---------|---------|--------|
| Bun | 1.2+ | `curl -fsSL https://bun.sh/install \| bash` | `bun --version` |
| Java (JDK) | 21 (LTS) | [Liberica JDK 21](https://bell-sw.com/pages/downloads/) | `java --version` |
| Docker | Latest | [Docker Desktop](https://docker.com/products/docker-desktop) | `docker --version` |
| Git | 2.40+ | System package manager | `git --version` |

### Recommended Editor Extensions

| Extension | Purpose |
|-----------|---------|
| Solid (solidjs) | SolidJS syntax highlighting |
| Tailwind CSS IntelliSense | Class autocomplete |
| ESLint | Linting |
| Prettier | Formatting |
| Java Extension Pack | Java development |
| Gradle for Java | Gradle support |

### Environment Variables

```bash
# Frontend
cp app/.env.example app/.env

# Backend
cp server/.env.example server/.env
```

| Variable | Description | Default |
|----------|-------------|---------|
| API_URL | Backend API URL | http://localhost:8080 |
| DATABASE_URL | PostgreSQL connection | jdbc:postgresql://localhost:5432/app_dev |

## Tech Stack Reference

### Frontend

| Component | Version | Purpose |
|-----------|---------|---------|
| Bun | 1.2+ | Runtime, package manager, bundler |
| TypeScript | 5.8 (strict) | Type-safe JavaScript |
| SolidJS | 1.9+ | UI framework (fine-grained reactivity) |
| SolidStart | Latest | Meta-framework (SSG mode) |
| TailwindCSS | 4.1+ | Utility-first CSS |
| Iconify-Solid | 2.x | Icon components |
| Vitest | Latest | Unit testing |
| Playwright | Latest | E2E testing |

### Backend

| Component | Version | Purpose |
|-----------|---------|---------|
| Java | 21 (LTS) | Backend language |
| Micronaut | 4.7+ | Backend framework |
| Gradle | 8.13+ | Build tool (Kotlin DSL) |
| PostgreSQL | 16+ | Database |
| Flyway | — | Database migrations |

### Infrastructure

| Component | Image | Purpose |
|-----------|-------|---------|
| Frontend | nginx:stable-alpine | Static assets |
| Backend | bellsoft/liberica-runtime-container:jdk-21-crac-cds-slim-musl | JVM runtime |

## Quick Start (5 minutes)

```bash
# 1. Clone
git clone <repo-url> && cd <project>

# 2. Infrastructure
docker compose up -d

# 3. Frontend
cd app && bun install && bun run dev
# → http://localhost:3000

# 4. Backend (new terminal)
cd server && ./gradlew run
# → http://localhost:8080

# 5. Verify
curl http://localhost:8080/api/v1/health
# → {"status":"UP"}
```

## Project Structure

```
project-root/
├── app/                    # Frontend (SolidJS + SolidStart)
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── routes/         # File-based routing
│   │   ├── lib/            # Shared utilities
│   │   └── stores/         # Signal-based state
│   └── package.json
├── server/                 # Backend (Micronaut)
│   ├── src/main/java/      # Java source
│   ├── src/main/resources/ # Config and migrations
│   └── build.gradle.kts
├── infra/                  # Infrastructure
│   ├── docker/             # Dockerfiles
│   └── nginx/              # nginx config
├── docs/                   # Documentation
└── README.md
```

## Daily Workflow

### Starting Work

```bash
git checkout main && git pull
git checkout -b feature/TASK-XXX-description
docker compose up -d
cd app && bun run dev       # Terminal 1
cd server && ./gradlew run  # Terminal 2
```

### Development Cycle

1. Pick task from milestone
2. Create branch: `feature/TASK-XXX-description`
3. Implement + write tests
4. Run quality checks
5. Commit with conventional message
6. Push + create PR
7. Address review
8. Squash merge

### Common Commands

| Command | Context | Purpose |
|---------|---------|---------|
| `bun run dev` | app/ | Dev server |
| `bun run build` | app/ | Production build |
| `bun run lint` | app/ | ESLint |
| `bun run format` | app/ | Prettier |
| `bun run test` | app/ | Vitest |
| `bun run typecheck` | app/ | TypeScript check |
| `./gradlew run` | server/ | Start backend |
| `./gradlew build` | server/ | Build |
| `./gradlew test` | server/ | Run tests |
| `./gradlew check` | server/ | All checks |

### Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | feature/TASK-XXX-desc | feature/TASK-042-add-search |
| Fix | fix/TASK-XXX-desc | fix/TASK-089-fix-login |
| Docs | docs/TASK-XXX-desc | docs/TASK-012-update-guide |

### Commit Convention

```
type(scope): description
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`, `ci`

## Code Conventions

### Frontend
- TypeScript strict — no `any`
- Named exports — no default exports
- SolidJS patterns — `createSignal`, `createStore`, `createResource`
- TailwindCSS — utility classes only
- File naming — `PascalCase.tsx` components, `camelCase.ts` utilities
- Max 150 lines per component

### Backend
- Java 21 features — records, sealed interfaces, pattern matching
- No Lombok — plain Java records
- Constructor injection only
- Jakarta validation annotations
- RFC 7807 error format

## Where to Find Things

| What | Where |
|------|-------|
| API endpoints | server/**/controller/ |
| Business logic | server/**/service/ |
| Database queries | server/**/repository/ |
| Migrations | server/src/main/resources/db/migration/ |
| UI components | app/src/components/ |
| Page routes | app/src/routes/ |
| Utilities | app/src/lib/ |
| State stores | app/src/stores/ |
| Types | app/src/types/ |
| API client | app/src/lib/api/ |
| Config | server/src/main/resources/application.yml |

## Troubleshooting

| Problem | Solution |
|---------|----------|
| bun install fails | Delete node_modules + bun.lockb, retry |
| Backend won't start | Check PostgreSQL: `docker compose ps` |
| Port in use | `lsof -i :3000` or `lsof -i :8080` |
| Migration error | Check naming: `V001__description.sql` |
| TypeScript errors | `bun run typecheck` for full list |
| Test failures | `bun run test -- --reporter=verbose` |

## Getting Help

- Documentation: `docs/`
- Architecture: `docs/01-architecture/system-overview.md`
- API: `docs/04-api/`
- Issues: Team channel or PR comments

---

_Welcome aboard! Update this guide if anything is unclear._
```
