# API Specification Template

> Use this template when running `/design api` to produce a complete OpenAPI 3.1 specification.

## Step-by-Step Instructions

1. **Identify resources** from discovery user stories. Each noun = potential resource.
2. **Define CRUD operations** per resource using the HTTP method mapping table.
3. **Draft request/response schemas** using the entity definitions from `/design data`.
4. **Add pagination** to all list (`GET /resources`) endpoints.
5. **Define error responses** using the RFC 7807 ProblemDetail schema.
6. **Document authentication** requirements per endpoint.
7. **Validate** against the consistency checklist in the main SKILL.md.

## OpenAPI 3.1 Scaffold

```yaml
openapi: "3.1.0"
info:
  title: "{{SERVICE_NAME}} API"
  version: "1.0.0"
  description: |
    {{SERVICE_DESCRIPTION}}

    ## Authentication
    All endpoints require a Bearer JWT token unless marked as public.
    Tokens are obtained via the `/auth/token` endpoint.

    ## Pagination
    All list endpoints support `page`, `pageSize`, `sortBy`, and `sortOrder` query parameters.

    ## Errors
    All errors follow RFC 7807 Problem Details format with `application/problem+json` content type.
  contact:
    name: "{{TEAM_NAME}}"
    email: "{{TEAM_EMAIL}}"

servers:
  - url: "http://localhost:8080/api/v1"
    description: Local development
  - url: "https://api.staging.example.com/api/v1"
    description: Staging
  - url: "https://api.example.com/api/v1"
    description: Production

security:
  - BearerAuth: []

tags:
  - name: {{TAG_NAME}}
    description: {{TAG_DESCRIPTION}}

paths:
  # Add paths here following the pattern in SKILL.md section 5.5

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: jwt

  parameters:
    PageParam:
      name: page
      in: query
      schema: { type: integer, minimum: 1, default: 1 }
    PageSizeParam:
      name: pageSize
      in: query
      schema: { type: integer, minimum: 1, maximum: 100, default: 20 }
    SortByParam:
      name: sortBy
      in: query
      schema: { type: string, default: createdAt }
    SortOrderParam:
      name: sortOrder
      in: query
      schema: { type: string, enum: [asc, desc], default: desc }
    IdParam:
      name: id
      in: path
      required: true
      schema: { type: string, format: uuid }

  schemas:
    Pagination:
      type: object
      required: [page, pageSize, totalItems, totalPages, hasNext, hasPrev]
      properties:
        page: { type: integer }
        pageSize: { type: integer }
        totalItems: { type: integer }
        totalPages: { type: integer }
        hasNext: { type: boolean }
        hasPrev: { type: boolean }

    ProblemDetail:
      type: object
      required: [type, title, status, detail, traceId, timestamp]
      properties:
        type: { type: string, format: uri }
        title: { type: string }
        status: { type: integer }
        detail: { type: string }
        instance: { type: string, format: uri }
        traceId: { type: string, format: uuid }
        timestamp: { type: string, format: date-time }
        errors:
          type: array
          items: { $ref: "#/components/schemas/FieldError" }

    FieldError:
      type: object
      required: [field, message]
      properties:
        field: { type: string }
        message: { type: string }
        rejectedValue: {}

  responses:
    BadRequest:
      description: Validation error
      content:
        application/problem+json:
          schema: { $ref: "#/components/schemas/ProblemDetail" }
    Unauthorized:
      description: Authentication required
    Forbidden:
      description: Insufficient permissions
    NotFound:
      description: Resource not found
    Conflict:
      description: Resource already exists
```

## Resource Checklist

For each resource, fill in:

- [ ] Entity name and table name from data model
- [ ] CRUD endpoints (GET list, GET single, POST, PUT/PATCH, DELETE)
- [ ] Request body schema with validation rules
- [ ] Response schema matching Java record
- [ ] Pagination on list endpoint
- [ ] Authorization rules (which roles can access)
- [ ] Error cases and their ProblemDetail responses
- [ ] Query parameters for filtering and sorting

## Endpoint Documentation Template

For each endpoint, document:

```
### POST /api/v1/{{resources}}

Purpose: {{What this endpoint does}}

Authorization: {{roles/permissions required}}

Request Body:
  {{JSON schema or example}}

Success Response (201):
  {{JSON example}}

Error Responses:
  - 400: {{validation error case}}
  - 401: {{unauthenticated case}}
  - 403: {{unauthorized case}}
  - 409: {{conflict case}}

Notes:
  - {{any special behavior}}
  - {{side effects}}
  - {{rate limiting if applicable}}
```
