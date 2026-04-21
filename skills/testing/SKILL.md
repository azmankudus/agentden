---
name: "testing"
tags: [testing, vitest, junit5, playwright, tdd, bdd, quality, coverage]
triggers:
  - "write tests"
  - "test this"
  - "run tests"
  - "coverage report"
  - "performance test"
  - "security test"
  - "accessibility test"
---

# Testing & QA Skill

Comprehensive testing skill covering all layers of the test pyramid for the agentden tech stack (SolidJS frontend + Micronaut backend). Produces high-quality, maintainable test suites with actionable coverage reports.

## Commands

| Command | Description |
|---|---|
| `/test unit` | Generate unit tests (Vitest frontend / JUnit 5 backend) |
| `/test integration` | Generate integration tests |
| `/test e2e` | Generate Playwright E2E test suite |
| `/test performance` | Generate performance test plan (k6/Gatling) |
| `/test security` | Run security audit checklist |
| `/test a11y` | Generate accessibility test suite |
| `/test coverage` | Generate coverage report with recommendations |
| `/test check` | Validate test quality and coverage |

## Test Pyramid

```
                    ╱╲
                   ╱  ╲
                  ╱ E2E╲                     ← Playwright (slow, brittle, few)
                 ╱──────╲                       Target: ~10% of tests
                ╱        ╲
               ╱Integration╲                  ← @MicronautTest + API tests
              ╱──────────────╲                  Target: ~20% of tests
             ╱                ╲
            ╱    Unit Tests    ╲               ← Vitest + JUnit 5 (fast, isolated, many)
           ╱────────────────────╲                Target: ~70% of tests
          ╱______________________╲

    Fast ◄──────────────────────────► Thorough
    Cheap                           Expensive
    Many                            Few
```

**Coverage targets:**
| Layer | Target Coverage | Max Duration |
|-------|----------------|--------------|
| Unit | 80%+ line coverage | < 5s per test |
| Integration | 70%+ branch coverage on APIs | < 30s per test |
| E2E | All critical user journeys | < 60s per test |
| Overall | 75%+ combined | Full suite < 5 min |

---

## Frontend Testing

### Stack

| Tool | Purpose |
|------|---------|
| [Vitest](https://vitest.dev) | Test runner, assertions, mocking |
| `@solidjs/testing-library` | SolidJS component rendering & queries |
| `jsdom` | DOM environment for unit tests |
| `@testing-library/jest-dom` | DOM matchers (`toBeVisible`, `toHaveTextContent`) |
| `@testing-library/user-event` | Realistic user interaction simulation |
| `msw` (Mock Service Worker) | HTTP API mocking |
| Playwright | E2E browser automation |

### Configuration

`vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true,
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/entry-client.tsx',
        'src/entry-server.tsx',
        'src/app.tsx',
        '**/*.d.ts',
        '**/routes/**', // route files tested via E2E
      ],
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
  },
});
```

`test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock SolidStart router if needed
vi.mock('@solidjs/router', () => ({
  A: (props: any) => props.children,
  useNavigate: () => vi.fn(),
  useParams: () => ({}),
  useSearchParams: () => [{}],
}));
```

### Unit Test Pattern — Vitest + Solid Testing Library

Test a SolidJS component in isolation. Focus on behavior, not implementation details.

**File convention:** `src/components/__tests__/Button.test.tsx`

```tsx
import { render, screen } from '@solidjs/testing-library';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from '../Button';

describe('Button', () => {
  it('renders with text', () => {
    render(() => <Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(() => <Button onClick={handleClick}>Submit</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('shows loading state', () => {
    render(() => <Button loading>Save</Button>);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('applies variant styles', () => {
    render(() => <Button variant="danger">Delete</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-red-600');
  });

  it('is accessible', () => {
    render(() => <Button aria-label="Close dialog">×</Button>);
    expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
  });
});
```

**Testing a reactive store / signal:**

```ts
import { describe, it, expect } from 'vitest';
import { createRoot } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useCart } from '../useCart';

describe('useCart store', () => {
  it('adds an item', () => {
    createRoot((dispose) => {
      const [cart, addItem] = useCart();

      addItem({ id: '1', name: 'Widget', price: 9.99, qty: 1 });

      expect(cart.items).toHaveLength(1);
      expect(cart.total).toBe(9.99);

      dispose();
    });
  });

  it('removes an item', () => {
    createRoot((dispose) => {
      const [cart, { addItem, removeItem }] = useCart();

      addItem({ id: '1', name: 'Widget', price: 9.99, qty: 1 });
      removeItem('1');

      expect(cart.items).toHaveLength(0);
      expect(cart.total).toBe(0);

      dispose();
    });
  });
});
```

**Testing API calls with MSW:**

```ts
import { render, screen, waitFor } from '@solidjs/testing-library';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import UserList from '../UserList';

const handlers = [
  http.get('/api/v1/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserList', () => {
  it('displays users from API', async () => {
    render(() => <UserList />);

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('shows error state on API failure', async () => {
    server.use(
      http.get('/api/v1/users', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(() => <UserList />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
    });
  });
});
```

### E2E Test Pattern — Playwright

E2E tests validate full user journeys through the browser. Place in `e2e/` directory at project root.

**File convention:** `e2e/auth.spec.ts`

```ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can sign in', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[data-testid="email-input"]', 'user@example.com');
    await page.fill('[data-testid="password-input"]', 'securepassword');
    await page.click('[data-testid="login-button"]');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-name"]')).toHaveText('Test User');
  });

  test('shows error on invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[data-testid="email-input"]', 'user@example.com');
    await page.fill('[data-testid="password-input"]', 'wrong');
    await page.click('[data-testid="login-button"]');

    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toHaveText(/invalid/i);
  });

  test('user can sign out', async ({ page }) => {
    // Login via API to set session
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'user@example.com');
    await page.fill('[data-testid="password-input"]', 'securepassword');
    await page.click('[data-testid="login-button"]');
    await expect(page).toHaveURL('/dashboard');

    // Logout
    await page.click('[data-testid="logout-button"]');
    await expect(page).toHaveURL('/login');
  });
});
```

**Visual regression with Playwright:**

```ts
import { test, expect } from '@playwright/test';

test.describe('Homepage visual', () => {
  test('matches screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage.png', {
      maxDiffPixelRatio: 0.01,
    });
  });
});
```

**E2E API validation:**

```ts
import { test, expect } from '@playwright/test';

test.describe('Health API', () => {
  test('returns healthy status', async ({ request }) => {
    const response = await request.get('/api/v1/health');

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.status).toBe('UP');
  });
});
```

---

## Backend Testing

### Stack

| Tool | Purpose |
|------|---------|
| JUnit 5 | Test framework, assertions, lifecycle |
| `@MicronautTest` | Micronaut context bootstrap for integration tests |
| Mockito | Mocking collaborators in unit tests |
| `micronaut-http-client` | Low-level HTTP client for API testing |
| `micronaut-test-utils` | Test utilities and assertions |

### Unit Test Pattern — JUnit 5

Test a single class in isolation with mocked dependencies. Fast, no Spring/Micronaut context.

**File convention:** `src/test/java/com/example/service/UserServiceTest.java`

```java
package com.example.service;

import com.example.controller.dto.UserResponse;
import com.example.domain.User;
import com.example.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Nested
    @DisplayName("findById")
    class FindById {

        @Test
        @DisplayName("returns user when found")
        void returnsUserWhenFound() {
            User user = new User("1", "Alice", "alice@example.com");
            when(userRepository.findById("1")).thenReturn(Optional.of(user));

            UserResponse result = userService.findById("1");

            assertThat(result.name()).isEqualTo("Alice");
            assertThat(result.email()).isEqualTo("alice@example.com");
            verify(userRepository).findById("1");
        }

        @Test
        @DisplayName("throws when user not found")
        void throwsWhenNotFound() {
            when(userRepository.findById(anyString())).thenReturn(Optional.empty());

            assertThatThrownBy(() -> userService.findById("999"))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessageContaining("999");
        }
    }

    @Nested
    @DisplayName("create")
    class Create {

        @Test
        @DisplayName("creates user with valid data")
        void createsUserWithValidData() {
            User saved = new User("1", "Alice", "alice@example.com");
            when(userRepository.existsByEmail("alice@example.com")).thenReturn(false);
            when(userRepository.save(org.mockito.ArgumentMatchers.any(User.class))).thenReturn(saved);

            UserResponse result = userService.create("Alice", "alice@example.com");

            assertThat(result.id()).isEqualTo("1");
            verify(userRepository).save(org.mockito.ArgumentMatchers.any(User.class));
        }

        @Test
        @DisplayName("rejects duplicate email")
        void rejectsDuplicateEmail() {
            when(userRepository.existsByEmail("alice@example.com")).thenReturn(true);

            assertThatThrownBy(() -> userService.create("Alice", "alice@example.com"))
                .isInstanceOf(DuplicateEmailException.class);
        }
    }
}
```

### Integration Test Pattern — @MicronautTest

Boot a full Micronaut application context. Test HTTP endpoints end-to-end through the embedded server.

**File convention:** `src/test/java/com/example/controller/UserControllerIntegrationTest.java`

```java
package com.example.controller;

import com.example.repository.UserRepository;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.client.HttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.http.client.exceptions.HttpClientResponseException;
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@MicronautTest
class UserControllerIntegrationTest {

    @Inject
    @Client("/")
    HttpClient client;

    @Inject
    UserRepository userRepository;

    @BeforeEach
    void cleanUp() {
        userRepository.deleteAll();
    }

    @Nested
    @DisplayName("GET /api/v1/users/{id}")
    class GetUser {

        @Test
        @DisplayName("returns 200 with user")
        void returns200WithUser() {
            var created = userRepository.save(new User(null, "Alice", "alice@example.com"));

            var response = client.toBlocking().exchange(
                HttpRequest.GET("/api/v1/users/" + created.getId()),
                UserResponse.class
            );

            assertThat(response.getStatus()).isEqualTo(HttpStatus.OK);
            assertThat(response.getBody().get().name()).isEqualTo("Alice");
        }

        @Test
        @DisplayName("returns 404 when not found")
        void returns404WhenNotFound() {
            assertThatThrownBy(() ->
                client.toBlocking().exchange(
                    HttpRequest.GET("/api/v1/users/nonexistent"),
                    UserResponse.class
                )
            ).isInstanceOf(HttpClientResponseException.class)
             .satisfies(ex ->
                assertThat(((HttpClientResponseException) ex).getStatus()).isEqualTo(HttpStatus.NOT_FOUND)
             );
        }
    }

    @Nested
    @DisplayName("POST /api/v1/users")
    class CreateUser {

        @Test
        @DisplayName("returns 201 with created user")
        void returns201WithCreatedUser() {
            var request = new CreateUserRequest("Alice", "alice@example.com");

            var response = client.toBlocking().exchange(
                HttpRequest.POST("/api/v1/users", request),
                UserResponse.class
            );

            assertThat(response.getStatus()).isEqualTo(HttpStatus.CREATED);
            assertThat(response.getBody().get().name()).isEqualTo("Alice");
            assertThat(response.getHeader("Location")).contains("/api/v1/users/");
        }

        @Test
        @DisplayName("returns 400 for invalid input")
        void returns400ForInvalidInput() {
            var request = new CreateUserRequest("", "not-an-email");

            assertThatThrownBy(() ->
                client.toBlocking().exchange(
                    HttpRequest.POST("/api/v1/users", request),
                    UserResponse.class
                )
            ).isInstanceOf(HttpClientResponseException.class)
             .satisfies(ex ->
                assertThat(((HttpClientResponseException) ex).getStatus()).isEqualTo(HttpStatus.BAD_REQUEST)
             );
        }
    }
}
```

**Integration test with test containers (PostgreSQL):**

```java
import io.micronaut.test.support.TestPropertyProvider;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@MicronautTest
@Testcontainers
class UserRepositoryIntegrationTest implements TestPropertyProvider {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @Override
    public Map<String, String> getProperties() {
        return Map.of(
            "datasources.default.url", postgres.getJdbcUrl(),
            "datasources.default.username", postgres.getUsername(),
            "datasources.default.password", postgres.getPassword(),
            "datasources.default.driver-class-name", postgres.getDriverClassName()
        );
    }

    // ... tests using real database
}
```

---

## Performance Testing

### Tools

| Tool | Best For |
|------|----------|
| [k6](https://k6.io) | HTTP load testing, scripted scenarios |
| [Gatling](https://gatling.io) | JVM-based load testing, complex scenarios |
| `wrk` / `wrk2` | Quick HTTP benchmarking |
| Lighthouse | Frontend performance auditing |

### Key Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| p50 (median) | 50th percentile response time | < 100ms |
| p95 | 95th percentile response time | < 500ms |
| p99 | 99th percentile response time | < 1000ms |
| Throughput | Requests per second | > 1000 RPS |
| Error rate | % of failed requests | < 0.1% |
| P99 latency under load | Tail latency at peak load | < 2s |

### k6 Load Test Pattern

`performance/load-test.js`:

```js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const apiLatency = new Trend('api_latency');

export const options = {
  stages: [
    { duration: '30s', target: 20 },   // ramp up
    { duration: '1m',  target: 20 },   // sustain
    { duration: '30s', target: 100 },  // spike
    { duration: '1m',  target: 100 },  // sustain peak
    { duration: '30s', target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    errors: ['rate<0.01'],
    api_latency: ['p(95)<300', 'p(99)<800'],
  },
};

const BASE_URL = __ENV.API_URL || 'http://localhost:8080';

export default function () {
  // Health check
  const healthRes = http.get(`${BASE_URL}/api/v1/health`);
  check(healthRes, {
    'health is 200': (r) => r.status === 200,
  });

  // List users
  const usersRes = http.get(`${BASE_URL}/api/v1/users`, {
    headers: { Accept: 'application/json' },
  });
  apiLatency.add(usersRes.timings.duration);
  check(usersRes, {
    'users is 200': (r) => r.status === 200,
    'users is JSON': (r) => r.headers['Content-Type'].includes('application/json'),
  }) || errorRate.add(1);

  sleep(1);
}
```

**Run:**
```bash
k6 run -e API_URL=http://localhost:8080 performance/load-test.js
k6 run --out json=results.json performance/load-test.js  # with output
```

### Frontend Performance (Lighthouse)

```bash
# Using PageSpeed Insights API
npx lighthouse http://localhost:3000 --output html --output-path ./reports/lighthouse.html

# CI-friendly JSON output
npx lighthouse http://localhost:3000 --output json --chrome-flags="--headless" \
  --only-categories=performance --budget-path=budget.json
```

**Lighthouse budget (`budget.json`):**

```json
{
  "budget": [
    {
      "resourceSizes": [
        { "resourceType": "script", "budget": 150 },
        { "resourceType": "stylesheet", "budget": 50 },
        { "resourceType": "image", "budget": 200 },
        { "resourceType": "total", "budget": 500 }
      ],
      "timings": [
        { "metric": "interactive", "budget": 3000 },
        { "metric": "first-contentful-paint", "budget": 1500 },
        { "metric": "largest-contentful-paint", "budget": 2500 },
        { "metric": "cumulative-layout-shift", "budget": 0.1 }
      ]
    }
  ]
}
```

---

## Security Testing

### OWASP Top 10 Checklist

Use this checklist when running `/test security`:

```
OWASP Top 10 (2021) — Security Audit Checklist
════════════════════════════════════════════════

[ ] A01: Broken Access Control
    ├── Verify role-based authorization on all endpoints
    ├── Test IDOR (Insecure Direct Object References)
    ├── Confirm principle of least privilege
    └── Verify CORS configuration restricts origins

[ ] A02: Cryptographic Failures
    ├── Enforce HTTPS on all endpoints
    ├── Verify sensitive data encrypted at rest
    ├── Confirm passwords hashed with bcrypt/argon2
    └── Check TLS version (1.2+ only)

[ ] A03: Injection
    ├── Test SQL injection on all input fields
    ├── Test NoSQL injection if applicable
    ├── Verify parameterized queries / prepared statements
    └── Test command injection in shell/exec calls

[ ] A04: Insecure Design
    ├── Verify rate limiting on auth endpoints
    ├── Test account lockout after failed attempts
    ├── Confirm secure password reset flow
    └── Verify CSRF protection on state-changing requests

[ ] A05: Security Misconfiguration
    ├── Verify no default credentials
    ├── Check error messages don't leak stack traces
    ├── Confirm security headers present:
    │   ├── Content-Security-Policy
    │   ├── X-Content-Type-Options: nosniff
    │   ├── X-Frame-Options: DENY
    │   ├── Strict-Transport-Security
    │   └── Referrer-Policy: strict-origin-when-cross-origin
    └── Verify DEBUG mode disabled in production

[ ] A06: Vulnerable Components
    ├── Run dependency audit (bun audit / gradle dependencyCheck)
    ├── Check for known CVEs in dependencies
    └── Verify all dependencies up to date

[ ] A07: Authentication Failures
    ├── Test brute-force protection
    ├── Verify session management
    ├── Test JWT token validation (if applicable)
    └── Confirm multi-factor on sensitive operations

[ ] A08: Software & Data Integrity
    ├── Verify CI/CD pipeline integrity
    ├── Check signed dependencies
    └── Verify deserialization safety

[ ] A09: Logging & Monitoring Failures
    ├── Confirm security events logged
    ├── Verify PII not logged in plaintext
    ├── Test log injection resistance
    └── Confirm alerting on anomalous activity

[ ] A10: Server-Side Request Forgery
    ├── Test URL validation on user-supplied URLs
    ├── Verify allowlist for outbound requests
    └── Test metadata endpoint access (169.254.169.254)
```

### SQL Injection Testing

```bash
# Test common injection patterns against API endpoints
# Run from project root

# String-based injection
curl -s -X POST http://localhost:8080/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name": "'' OR ''1''=''1", "email": "test@test.com"}' | jq .

# Numeric injection
curl -s "http://localhost:8080/api/v1/users/1%20OR%201=1" | jq .

# Union-based
curl -s "http://localhost:8080/api/v1/users?sort=name%3B%20SELECT%20*%20FROM%20credentials" | jq .
```

### XSS Testing

```bash
# Reflected XSS
curl -s "http://localhost:8080/api/v1/search?q=%3Cscript%3Ealert(1)%3C/script%3E" | jq .

# Stored XSS via API
curl -s -X POST http://localhost:8080/api/v1/comments \
  -H "Content-Type: application/json" \
  -d '{"body": "<img src=x onerror=alert(1)>"}' | jq .

# Verify Content-Security-Policy header blocks inline scripts
curl -sI http://localhost:3000 | grep -i content-security-policy
```

### CORS Verification

```bash
# Test allowed origins
curl -sI -H "Origin: https://evil.com" http://localhost:8080/api/v1/health
# Expected: No Access-Control-Allow-Origin header (or explicit allowed origin only)

curl -sI -H "Origin: https://yourdomain.com" http://localhost:8080/api/v1/health
# Expected: Access-Control-Allow-Origin: https://yourdomain.com

# Verify credentials not exposed to wildcard
curl -sI -H "Origin: https://evil.com" -H "Access-Control-Request-Credentials: true" \
  http://localhost:8080/api/v1/health
# Expected: No Access-Control-Allow-Credentials: true
```

### Dependency Audit Commands

```bash
# Frontend
bun audit
bunx npm-check-updates -f security

# Backend
./gradlew dependencyCheckAnalyze
./gradlew dependencies | grep -i vulnerable
```

---

## Accessibility Testing

### Standards

| Standard | Level | Requirement |
|----------|-------|-------------|
| WCAG 2.2 | AA | Minimum compliance target |
| Section 508 | — | US federal requirement |
| EN 301 549 | — | EU accessibility requirement |

### Key Requirements (WCAG 2.2 AA)

```
Perceivable:
  ├── Color contrast ratio ≥ 4.5:1 (normal text), ≥ 3:1 (large text)
  ├── Non-text contrast ≥ 3:1 (UI components, graphics)
  ├── Text resizable to 200% without loss of content
  ├── Images have alt text
  └── Content adapts to different screen sizes

Operable:
  ├── All functionality available via keyboard
  ├── Visible focus indicators (≥ 2px solid, 3:1 contrast)
  ├── Skip navigation link
  ├── No time limits without user control
  └── Motion can be disabled (prefers-reduced-motion)

Understandable:
  ├── Language declared (lang attribute)
  ├── Form labels associated with inputs
  ├── Error messages descriptive and associated with fields
  └── Consistent navigation across pages

Robust:
  ├── Valid HTML (no duplicate IDs, proper nesting)
  ├── ARIA roles correct and not redundant
  └── Compatible with screen readers (NVDA, VoiceOver)
```

### Automated a11y Testing with axe-core + Vitest

```ts
import { render } from '@solidjs/testing-library';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import LoginPage from '../LoginPage';

expect.extend(toHaveNoViolations);

describe('LoginPage accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(() => <LoginPage />);
    const results = await axe(container, {
      rules: {
        // Disable rules that require full page context
        'html-has-lang': { enabled: false },
        region: { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
```

### Playwright a11y Testing

```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('homepage passes axe audit', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .exclude('[data-testid="third-party-widget"]') // known a11y issues
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('login page keyboard navigation', async ({ page }) => {
    await page.goto('/login');

    // Tab to email field
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="email-input"]')).toBeFocused();

    // Tab to password field
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="password-input"]')).toBeFocused();

    // Tab to submit button
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="login-button"]')).toBeFocused();

    // Submit with Enter
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/dashboard|login/);
  });

  test('color contrast meets 4.5:1', async ({ page }) => {
    await page.goto('/');
    const contrastViolations = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();

    expect(contrastViolations.violations).toEqual([]);
  });
});
```

---

## Coverage Reporting

### Generate Coverage Report (`/test coverage`)

**Frontend:**
```bash
bun run test -- --coverage
# Output: coverage/index.html (open in browser)
# Output: coverage/lcov.info (for CI integration)
```

**Backend:**
```bash
./gradlew test jacocoTestReport
# Output: build/reports/jacoco/test/html/index.html
# Output: build/reports/jacoco/test/jacocoTestReport.xml
```

### Coverage Quality Checklist

When running `/test coverage`, evaluate against these criteria:

```
Coverage Quality Assessment
════════════════════════════

Statement Coverage:    [____%]  Target: ≥ 80%
Branch Coverage:       [____%]  Target: ≥ 75%
Function Coverage:     [____%]  Target: ≥ 80%
Line Coverage:         [____%]  Target: ≥ 80%

Module Breakdown:
┌────────────────────────┬──────────┬──────────┬──────────┬──────────┐
│ Module                 │ Lines    │ Branches │ Functions│ Status   │
├────────────────────────┼──────────┼──────────┼──────────┼──────────┤
│ src/components/        │ ___%     │ ___%     │ ___%     │ PASS/FAIL│
│ src/services/          │ ___%     │ ___%     │ ___%     │ PASS/FAIL│
│ src/utils/             │ ___%     │ ___%     │ ___%     │ PASS/FAIL│
│ controller/            │ ___%     │ ___%     │ ___%     │ PASS/FAIL│
│ service/               │ ___%     │ ___%     │ ___%     │ PASS/FAIL│
│ repository/            │ ___%     │ ___%     │ ___%     │ PASS/FAIL│
└────────────────────────┴──────────┴──────────┴──────────┴──────────┘

Uncovered Critical Paths:
  - [ ] Error handling branches
  - [ ] Edge cases (empty, null, boundary)
  - [ ] Authorization checks
  - [ ] Input validation failure paths

Recommendations:
  1. ___
  2. ___
  3. ___
```

---

## Test Quality Validation (`/test check`)

Run this checklist to validate overall test suite quality:

```
Test Quality Checklist
═══════════════════════

Structure:
  [ ] Tests follow AAA pattern (Arrange, Act, Assert)
  [ ] Each test has a single assertion or closely related assertions
  [ ] Test names are descriptive (should/when/then pattern)
  [ ] Tests are independent (no execution order dependency)
  [ ] No test interdependence (each test can run alone)

Coverage:
  [ ] Happy path covered
  [ ] Error paths covered
  [ ] Edge cases covered (empty, null, boundary, overflow)
  [ ] Authorization boundaries tested
  [ ] Input validation tested

Maintainability:
  [ ] No hardcoded test data (use factories/builders)
  [ ] Shared setup in beforeEach / @BeforeEach
  [ ] No sleeping / waiting (use waitFor / async assertions)
  [ ] Mocks verified (no over-mocking)
  [ ] Test utilities extracted for reuse

Performance:
  [ ] Unit tests run < 5s each
  [ ] Integration tests run < 30s each
  [ ] E2E tests run < 60s each
  [ ] Full suite completes < 5 min
  [ ] No flaky tests (run 3x to verify)

CI/CD:
  [ ] Tests run in CI pipeline
  [ ] Coverage gates enforced
  [ ] Test reports published
  [ ] Failed tests block merge
  [ ] E2E tests run against staging
```

---

## Workflow

When invoked, follow this decision tree:

```
/test [command]
       │
       ├── unit ──────────► Identify untested source files
       │                     │
       │                     ├── Frontend (.tsx/.ts)?
       │                     │   └── Generate Vitest + solid-testing-library tests
       │                     │       ├── Component → render + screen + userEvent
       │                     │       ├── Store/hook → createRoot + signal assertions
       │                     │       └── Utility → pure function assertions
       │                     │
       │                     └── Backend (.java)?
       │                         └── Generate JUnit 5 tests
       │                             ├── Service → @ExtendWith(MockitoExtension)
       │                             ├── Controller → mock service layer
       │                             └── Utility → static method tests
       │
       ├── integration ───► Generate @MicronautTest integration tests
       │                     ├── Test HTTP endpoints via embedded client
       │                     ├── Use TestPropertyProvider for test config
       │                     └── Use Testcontainers for real DB
       │
       ├── e2e ──────────► Generate Playwright test specs
       │                     ├── Identify critical user journeys
       │                     ├── Use data-testid selectors
       │                     ├── Test happy + error paths
       │                     └── Include visual regression if applicable
       │
       ├── performance ──► Generate k6 load test script
       │                     ├── Define stages (ramp-up, sustain, spike)
       │                     ├── Set thresholds (p95, p99, error rate)
       │                     └── Generate Lighthouse budget config
       │
       ├── security ─────► Run security audit checklist
       │                     ├── OWASP Top 10 scan
       │                     ├── SQL injection tests
       │                     ├── XSS tests
       │                     ├── CORS verification
       │                     └── Dependency audit
       │
       ├── a11y ──────────► Generate accessibility tests
       │                     ├── axe-core automated scan
       │                     ├── Keyboard navigation tests
       │                     ├── Color contrast validation
       │                     └── Screen reader compatibility
       │
       ├── coverage ──────► Run all test suites + generate reports
       │                     ├── Frontend: vitest --coverage
       │                     ├── Backend: gradle test jacocoTestReport
       │                     └── Produce quality assessment
       │
       └── check ─────────► Validate test suite quality
                             ├── Run full test suite
                             ├── Check for flaky tests (3 runs)
                             ├── Assess coverage thresholds
                             ├── Review test quality checklist
                             └── Generate recommendations
```

---

## Reference Files

Reference files contain extended patterns and examples for each test type. When generating tests, consult these references for the most current patterns:

| Reference | Content |
|-----------|---------|
| `references/frontend-test-patterns.md` | Vitest + Solid testing library patterns, mocking, MSW setup |
| `references/backend-test-patterns.md` | JUnit 5 + Mockito patterns, @MicronautTest, Testcontainers |
| `references/e2e-test-patterns.md` | Playwright page objects, visual regression, API testing |
| `references/performance-test-plan.md` | k6 scripts, Gatling simulations, Lighthouse budgets |
| `references/security-checklist.md` | OWASP Top 10 audit checklist, injection test payloads |

---

## Rules

1. **Never test implementation details** — test behavior, not how it's built
2. **Use `data-testid` attributes** — for E2E selectors, not CSS classes
3. **Follow naming conventions** — `*.test.ts(x)` frontend, `*Test.java` backend
4. **Keep tests fast** — unit < 5s, integration < 30s, E2E < 60s
5. **No flaky tests** — use deterministic data, avoid timers, mock external services
6. **Test the happy path first** — then error paths, then edge cases
7. **Coverage is a minimum, not a goal** — 80%+ is required but meaningful coverage matters more
8. **Run locally before push** — all tests must pass before committing
9. **Isolate tests** — each test must be independent and runnable alone
10. **Clean up after yourself** — reset mocks, clear DB state, close resources
