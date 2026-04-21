# Backend Conventions

## Micronaut Patterns

### Core Principles

1. **Compile-time DI**: Micronaut uses annotation processing — no runtime reflection.
2. **Constructor injection**: Always use constructor injection. Never use `@Inject` on fields.
3. **`@Singleton` by default**: Services are singletons unless scoped otherwise.
4. **`@Serdeable` on DTOs**: Required for compile-time JSON serialization via micronaut-serde.
5. **`@Validated` on controllers**: Enables method-level validation on controller classes.
6. **`@Valid` on `@Body` params**: Triggers Jakarta Bean Validation on request bodies.

### Dependency Injection

```java
// Correct: Constructor injection
@Singleton
public class PersonService {
    private final PersonRepository personRepository;
    private final EmailService emailService;

    public PersonService(PersonRepository personRepository, EmailService emailService) {
        this.personRepository = personRepository;
        this.emailService = emailService;
    }
}

// Wrong: Field injection — DO NOT USE
@Singleton
public class PersonService {
    @Inject
    private PersonRepository personRepository;
}
```

### Controller Pattern

```java
@Controller("/api/v1/persons")
@Validated
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @Get
    public HttpResponse<List<PersonResponse>> list() {
        return HttpResponse.ok(personService.findAll());
    }

    @Get("/{id}")
    public HttpResponse<PersonResponse> get(@NotNull UUID id) {
        return HttpResponse.ok(personService.findById(id));
    }

    @Post
    @Status(CREATED)
    public HttpResponse<PersonResponse> create(@Body @Valid CreatePersonRequest request) {
        var person = personService.create(request);
        var location = UriBuilder.of("/api/v1/persons")
            .path(person.id().toString())
            .build();
        return HttpResponse.created(person, location);
    }

    @Put("/{id}")
    public HttpResponse<PersonResponse> update(
            @NotNull UUID id,
            @Body @Valid UpdatePersonRequest request) {
        return HttpResponse.ok(personService.update(id, request));
    }

    @Delete("/{id}")
    @Status(NO_CONTENT)
    public HttpResponse<Void> delete(@NotNull UUID id) {
        personService.delete(id);
        return HttpResponse.noContent();
    }
}
```

## Java 21 Feature Requirements

### Records (Required for DTOs)

```java
@Serdeable
public record PersonResponse(
    UUID id,
    String name,
    String email,
    Instant createdAt
) {}
```

No Lombok. No mutable DTOs. Records only.

### Sealed Interfaces (For Domain Modeling)

```java
public sealed interface PaymentResult {
    record Success(String transactionId, BigDecimal amount) implements PaymentResult {}
    record Failed(String errorCode, String message) implements PaymentResult {}
    record Pending(String transactionId, Instant estimatedCompletion) implements PaymentResult {}
}
```

### Pattern Matching for Switch

```java
// Arrow syntax with pattern matching
String formatted = switch (status) {
    case 200 -> "OK";
    case 404 -> "Not Found";
    case 500 -> "Server Error";
    default -> "Unknown";
};

// Type pattern matching
if (response instanceof ErrorResponse(var message, var code)) {
    log.error("Error {} - {}", code, message);
}

// Pattern matching in switch (Java 21)
String describe(Object obj) {
    return switch (obj) {
        case Integer i -> "Integer: " + i;
        case String s -> "String: " + s;
        case null -> "null";
        default -> "Unknown";
    };
}
```

### Virtual Threads

Enabled via JVM flags in Dockerfile:
```
--enable-preview
-XX:+UseCompactObjectHeaders
```

Configure in `application.yml`:
```yaml
micronaut:
  server:
    thread-selection:
      enabled: true
```

### Compact Constructor Validation

```java
@Serdeable
public record CreatePersonRequest(
    @NotBlank String name,
    @Email String email,
    @NotNull @Past LocalDate birthDate
) {
    public CreatePersonRequest {
        if (name != null) {
            name = name.trim();
        }
    }
}
```

## Error Handling

### Exception Hierarchy

```
RuntimeException
├── ResourceNotFoundException     → 404 Not Found
├── ValidationException           → 400 Bad Request
├── ConflictException             → 409 Conflict
├── UnauthorizedException         → 401 Unauthorized
├── ForbiddenException            → 403 Forbidden
└── Exception                     → 500 Internal Server Error (GlobalExceptionHandler)
```

### Exception Classes

```java
package com.example.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resource, Object id) {
        super("%s not found with id: %s".formatted(resource, id));
    }
}

public class ValidationException extends RuntimeException {
    public ValidationException(String message) {
        super(message);
    }
}

public class ConflictException extends RuntimeException {
    public ConflictException(String message) {
        super(message);
    }
}
```

### Exception Handler Pattern

```java
@Singleton
@Produces
public class ResourceNotFoundExceptionHandler
        implements ExceptionHandler<ResourceNotFoundException, HttpResponse<ErrorResponse>> {

    @Override
    public HttpResponse<ErrorResponse> handle(
            HttpRequest request,
            ResourceNotFoundException exception) {
        var error = new ErrorResponse(
            404,
            "Not Found",
            exception.getMessage(),
            request.getPath()
        );
        return HttpResponse.notFound(error);
    }
}
```

### Global Exception Handler

```java
@Singleton
@Produces
public class GlobalExceptionHandler implements ExceptionHandler<Exception, HttpResponse<ErrorResponse>> {

    private static final Logger LOG = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @Override
    public HttpResponse<ErrorResponse> handle(HttpRequest request, Exception exception) {
        LOG.error("Unhandled exception for request {}: {}", request.getPath(), exception.getMessage(), exception);

        var status = determineStatus(exception);
        var error = new ErrorResponse(
            status.getCode(),
            status.getReason(),
            exception.getMessage(),
            request.getPath()
        );
        return HttpResponse.<ErrorResponse>status(status).body(error);
    }

    private HttpStatus determineStatus(Exception exception) {
        return switch (exception) {
            case IllegalArgumentException e -> HttpStatus.BAD_REQUEST;
            case ConstraintViolationException e -> HttpStatus.BAD_REQUEST;
            case ResourceNotFoundException e -> HttpStatus.NOT_FOUND;
            case ConflictException e -> HttpStatus.CONFLICT;
            default -> HttpStatus.INTERNAL_SERVER_ERROR;
        };
    }

    @Serdeable
    public record ErrorResponse(
        int status,
        String title,
        String detail,
        String instance
    ) {}
}
```

## API Response Format

### Error Response (RFC 7807 inspired)

```json
{
  "status": 404,
  "title": "Not Found",
  "detail": "Person not found with id: 550e8400-e29b-41d4-a716-446655440000",
  "instance": "/api/v1/persons/550e8400-e29b-41d4-a716-446655440000"
}
```

### Success Response

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-01-15T10:30:00Z"
}
```

### Paginated Response

```json
{
  "items": [...],
  "page": 0,
  "size": 20,
  "totalItems": 150,
  "totalPages": 8
}
```

## Build Configuration

### Gradle Kotlin DSL (`build.gradle.kts`)

Key plugins:
- `io.micronaut.application` 4.5.2
- `io.micronaut.aot` 4.5.2
- `com.gradleup.shadow` 8.3.6

Required JVM args:
```
--enable-preview
```

AOT configuration:
```kotlin
micronaut {
    aot {
        optimizeServiceLoading = true
        convertYamlToJava = true
        precomputeOperations = true
        cacheEnvironment = true
        deduceEnvironment = true
    }
}
```

### Docker Configuration

Base image: `bellsoft/liberica-runtime-container:jdk-21-crac-cds-slim-musl`

JVM flags:
```
--enable-preview
-XX:+UseCompactObjectHeaders
```

Health check:
```
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost:8080/api/v1/health || exit 1
```

## Import Order

1. Package declaration
2. Java standard library (`java.*`)
3. Jakarta (`jakarta.*`)
4. Micronaut (`io.micronaut.*`)
5. Project imports (`com.example.*`)

```java
package com.example.controller;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import io.micronaut.serde.annotation.Serdeable;

import com.example.dto.PersonResponse;
import com.example.service.PersonService;
```
