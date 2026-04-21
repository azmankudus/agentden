# Code Standards

## General Principles

1. **Self-documenting code**: Clear naming, small functions, single responsibility.
2. **No comments policy**: Code must speak for itself. Comments are NOT allowed unless:
   - JSDoc/Javadoc for public API documentation
   - Explaining WHY for non-obvious business decisions (not WHAT)
3. **Consistency**: Follow the existing patterns in the codebase.
4. **Strict types**: TypeScript `strict: true`, Java 21 with records and sealed interfaces.

## File Organization

### Frontend

```
src/
├── components/          # Reusable UI components
│   ├── layout/          # Header, Footer, Sidebar
│   ├── forms/           # Input, Select, DatePicker
│   ├── feedback/        # Spinner, Toast, ErrorBoundary
│   └── data/            # DataTable, Pagination
├── routes/              # File-based routing (SolidStart)
│   ├── index.tsx        # /
│   ├── about.tsx        # /about
│   └── users/
│       ├── index.tsx    # /users
│       └── [id].tsx     # /users/:id
├── lib/                 # Utilities, helpers, constants
├── types/               # Shared TypeScript types/interfaces
├── context/             # SolidJS context providers
└── hooks/               # Custom reactive hooks
```

### Backend

```
src/main/java/com/example/
├── Application.java         # Entry point
├── controller/              # HTTP endpoint handlers
├── service/                 # Business logic layer
├── repository/              # Data access layer
├── entity/                  # Database entities/records
├── dto/                     # Data Transfer Objects (request/response)
├── exception/               # Custom exceptions + handlers
├── config/                  # Configuration classes
└── util/                    # Utility classes

src/test/java/com/example/
└── (mirrors main structure)
```

## Naming Conventions

### Frontend (TypeScript/SolidJS)

| Element | Convention | Example |
|---|---|---|
| Components | PascalCase | `UserProfile.tsx` |
| Props interfaces | PascalCase + Props | `UserProfileProps` |
| Custom hooks | camelCase with use prefix | `useAuth()` |
| Signals | camelCase with get/set pair | `[count, setCount]` |
| Event handlers | handle + Event | `handleSubmit`, `handleClick` |
| Boolean signals | is/has/can prefix | `[isLoading, setIsLoading]` |
| CSS classes | TailwindCSS utilities | `class="flex items-center"` |
| Files (components) | PascalCase | `UserProfile.tsx` |
| Files (routes) | kebab-case or `[param]` | `user-profile.tsx`, `[id].tsx` |
| Files (utilities) | camelCase | `formatDate.ts` |
| Files (types) | camelCase | `user.ts` |
| Directories | kebab-case | `data-table/`, `user-profile/` |

### Backend (Java/Micronaut)

| Element | Convention | Example |
|---|---|---|
| Classes | PascalCase | `PersonService` |
| Interfaces | PascalCase | `PersonRepository` |
| Records (DTO) | PascalCase + Request/Response | `CreatePersonRequest`, `PersonResponse` |
| Records (Entity) | PascalCase (singular) | `Person` |
| Methods | camelCase | `findAll()`, `createOrder()` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_ATTEMPTS` |
| Packages | lowercase, dot-separated | `com.example.controller` |
| Fields | camelCase | `personRepository` |
| Parameters | camelCase | `personId` |
| Files | Matches enclosing class | `PersonService.java` |
| Directories | Matches package segment | `controller/`, `service/` |

## Import Order

### Frontend (TypeScript)

Separate groups with blank lines:

```typescript
// 1. SolidJS core
import { type Component, createSignal, For, Show } from "solid-js";

// 2. SolidStart / Solid ecosystem
import { Title, Meta } from "@solidjs/meta";
import { useParams, useNavigate } from "@solidjs/router";

// 3. Iconify
import { Icon } from "@iconify-icon/solid";

// 4. Local modules (use ~/ alias)
import { formatDate } from "~/lib/format";
import { type User } from "~/types/user";
import { UserCard } from "~/components/UserCard";

// 5. CSS imports (always last)
import "./styles.css";
```

### Backend (Java)

Separate groups with blank lines:

```java
// 1. Package declaration
package com.example.controller;

// 2. Java standard library
import java.time.Instant;
import java.util.List;
import java.util.UUID;

// 3. Jakarta
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

// 4. Micronaut
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;

// 5. Project imports
import com.example.dto.PersonResponse;
import com.example.service.PersonService;
```

## No-Comments Policy

### What NOT to do:

```typescript
// increment the counter
setCount(count() + 1);

// check if user is admin
if (user.role === "admin") { }

// loop through items
for (const item of items) { }
```

### What IS acceptable:

```typescript
// JSDoc for public API
/** Returns a formatted date string in the user's locale. */
export function formatDate(date: Date): string { }

// WHY comment for non-obvious decisions
// Using exponential backoff to avoid overwhelming the rate-limited API
const delay = Math.min(1000 * 2 ** retry, 30000);
```

```java
// Javadoc for public API
/** Finds a person by their unique identifier or throws if not found. */
public PersonResponse findById(UUID id) { }

// WHY comment for business logic
// CRaC checkpoint restores must happen before the request deadline
Thread.sleep(Duration.ofMillis(100));
```

## File Templates

### Frontend Component Minimum

```tsx
import { type Component } from "solid-js";

interface ComponentNameProps {}

const ComponentName: Component<ComponentNameProps> = (props) => {
  return <div></div>;
};

export { ComponentName };
```

### Frontend Route Minimum

```tsx
import { Title } from "@solidjs/meta";

export default function PageName() {
  return (
    <>
      <Title>Page Name - App</Title>
      <div></div>
    </>
  );
}
```

### Backend Controller Minimum

```java
package com.example.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.validation.Validated;

@Controller("/api/v1/resources")
@Validated
public class ResourceController {

    @Get
    public HttpResponse<Void> list() {
        return HttpResponse.ok();
    }
}
```

### Backend Service Minimum

```java
package com.example.service;

import jakarta.inject.Singleton;

@Singleton
public class ResourceService {
}
```

### Backend DTO Minimum

```java
package com.example.dto;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record ResourceResponse(String id, String name) {}
```

### Backend Entity Minimum

```java
package com.example.entity;

import io.micronaut.data.annotation.*;
import java.util.UUID;

@MappedEntity("resources")
public record Resource(
    @AutoPopulated @Id UUID id,
    String name
) {}
```

## Common Anti-Patterns

### Frontend

| Anti-pattern | Correct Pattern |
|---|---|
| `export default` in components | Named export: `export { Component }` |
| Destructured props: `const { x } = props` | Direct access: `props.x` |
| `any` type | `unknown` with type narrowing |
| Inline styles: `style={{ }}` | TailwindCSS classes |
| `@tailwind` directives | `@import "tailwindcss"` |
| `tailwind.config.js` | `@theme` in CSS |
| `class` prop as `className` | SolidJS uses `class` |
| Derived state in render body | `createMemo()` |
| Data fetching in `createEffect` | `createResource()` |

### Backend

| Anti-pattern | Correct Pattern |
|---|---|
| Lombok `@Data`, `@Getter` | Java 21 `record` |
| `@Inject` on fields | Constructor injection |
| Mutable DTOs with setters | Immutable `record` types |
| Generic `RuntimeException` | Domain-specific exceptions |
| `switch` with colons and breaks | Arrow syntax `->` |
| `if/else` chains for types | Pattern matching `switch` |
| String concatenation | Text blocks or `.formatted()` |
| Missing `@Serdeable` | Always annotate DTOs |
| Missing `@Valid` on `@Body` | Always validate input |
