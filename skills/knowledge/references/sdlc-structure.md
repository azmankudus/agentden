# SDLC Documentation Structure Reference

Complete folder structure for the knowledge management skill. Used by `/docs scaffold`.

## Directory Tree

```
docs/
├── README.md
├── health-report.md
│
├── 00-product/
│   ├── README.md
│   ├── product-specification.md
│   ├── roadmap.md
│   ├── personas.md
│   └── glossary.md
│
├── 01-architecture/
│   ├── README.md
│   ├── system-overview.md
│   ├── adr/
│   │   ├── README.md
│   │   └── 0001-record-architecture-decisions.md
│   ├── data-model.md
│   ├── api-contracts.md
│   ├── security-design.md
│   └── diagrams/
│       ├── system-context.md
│       ├── container-diagram.md
│       └── sequence-flows.md
│
├── 02-development/
│   ├── README.md
│   ├── onboarding-guide.md
│   ├── tech-stack.md
│   ├── conventions.md
│   ├── testing-guide.md
│   ├── ci-cd.md
│   └── troubleshooting.md
│
├── 03-deployment/
│   ├── README.md
│   ├── deployment-guide.md
│   ├── environment-plan.md
│   ├── monitoring.md
│   ├── incident-response.md
│   └── database-operations.md
│
├── 04-api/
│   ├── README.md
│   ├── openapi.yaml
│   ├── authentication.md
│   ├── error-codes.md
│   ├── rate-limiting.md
│   └── changelog.md
│
└── 05-support/
    ├── README.md
    ├── faq.md
    ├── triage-guide.md
    ├── sla.md
    ├── post-mortem-template.md
    └── known-issues.md
```

## File Sizes (Expected Ranges)

| File | Min | Typical | Max |
|------|-----|---------|-----|
| README.md (root) | 50 lines | 80 lines | 120 lines |
| README.md (section) | 15 lines | 25 lines | 40 lines |
| product-specification.md | 200 lines | 400 lines | 800 lines |
| roadmap.md | 150 lines | 300 lines | 600 lines |
| onboarding-guide.md | 200 lines | 400 lines | 700 lines |
| system-overview.md | 100 lines | 200 lines | 400 lines |
| runbook-*.md | 150 lines | 300 lines | 500 lines |
| faq.md | 50 lines | 150 lines | 300 lines |

## Required vs Optional Files

### Required (must exist for health score)

| File | Section | Required For |
|------|---------|-------------|
| README.md | Root | Navigation |
| product-specification.md | 00-product | `/docs health` |
| roadmap.md | 00-product | `/docs health` |
| system-overview.md | 01-architecture | `/docs health` |
| adr/README.md | 01-architecture | `/docs health` |
| onboarding-guide.md | 02-development | `/docs health` |
| tech-stack.md | 02-development | `/docs health` |
| deployment-guide.md | 03-deployment | `/docs health` |
| openapi.yaml | 04-api | `/docs health` |
| faq.md | 05-support | `/docs health` |

### Optional (enhances health score but not required)

| File | Section |
|------|---------|
| personas.md | 00-product |
| glossary.md | 00-product |
| diagrams/*.md | 01-architecture |
| conventions.md | 02-development |
| testing-guide.md | 02-development |
| ci-cd.md | 02-development |
| environment-plan.md | 03-deployment |
| monitoring.md | 03-deployment |
| incident-response.md | 03-deployment |
| authentication.md | 04-api |
| error-codes.md | 04-api |
| rate-limiting.md | 04-api |
| triage-guide.md | 05-support |
| sla.md | 05-support |
| known-issues.md | 05-support |
