# Backend Review Checklist — Extended

## Annotation Compliance

### @Serdeable on DTOs

```java
// ❌ FAIL: missing @Serdeable — will fail at compile time with micronaut-serde
public record PersonResponse(UUID id, String name) {}

// ✅ PASS: @Serdeable present
@Serdeable
public record PersonResponse(UUID id, String name, String email, Instant createdAt) {}
```

### @Validated on Controllers

```java
// ❌ FAIL: no @Validated — validation annotations ignored
@Controller("/api/v1/persons")
public class PersonController {
    @Post
    public HttpResponse<PersonResponse> create(@Body @Valid CreatePersonRequest request) {
        // @Valid won't trigger without @Validated on the class
    }
}

// ✅ PASS: @Validated on controller class
@Controller("/api/v1/persons")
@Validated
public class PersonController {
    @Post
    public HttpResponse<PersonResponse> create(@Body @Valid CreatePersonRequest request) {
        // Validation triggers correctly
    }
}
```

### @Valid on Request Bodies

```java
// ❌ FAIL: missing @Valid — request body not validated
@Post
public HttpResponse<PersonResponse> create(@Body CreatePersonRequest request) {
    return HttpResponse.ok(personService.create(request));
}

// ✅ PASS: @Valid triggers Jakarta Bean Validation
@Post
public HttpResponse<PersonResponse> create(@Body @Valid CreatePersonRequest request) {
    return HttpResponse.ok(personService.create(request));
}
```

## Dependency Injection

### Constructor Injection Only

```java
// ❌ FAIL: field injection — hidden dependencies, harder to test
@Singleton
public class PersonService {
    @Inject
    private PersonRepository personRepository;
    @Inject
    private EmailService emailService;
}

// ✅ PASS: constructor injection — explicit, testable, final fields
@Singleton
public class PersonService {
    private final PersonRepository personRepository;
    private final EmailService emailService;

    public PersonService(PersonRepository personRepository, EmailService emailService) {
        this.personRepository = personRepository;
        this.emailService = emailService;
    }
}
```

## Layer Separation

### No Business Logic in Controllers

```java
// ❌ FAIL: business logic in controller
@Controller("/api/v1/orders")
@Validated
public class OrderController {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Post
    public HttpResponse<OrderResponse> create(@Body @Valid CreateOrderRequest request) {
        var product = productRepository.findById(request.productId())
            .orElseThrow(() -> new ResourceNotFoundException("Product", request.productId()));

        if (product.stock() < request.quantity()) {
            throw new ValidationException("Insufficient stock");
        }

        var total = product.price().multiply(BigDecimal.valueOf(request.quantity()));
        var order = new Order(null, request.productId(), request.quantity(), total);
        var saved = orderRepository.save(order);
        return HttpResponse.created(toResponse(saved));
    }
}

// ✅ PASS: controller delegates to service
@Controller("/api/v1/orders")
@Validated
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @Post
    public HttpResponse<OrderResponse> create(@Body @Valid CreateOrderRequest request) {
        var order = orderService.createOrder(request);
        var location = UriBuilder.of("/api/v1/orders")
            .path(order.id().toString())
            .build();
        return HttpResponse.created(order, location);
    }
}
```

## HTTP Status Codes

### Correct Status Code Usage

```java
// ❌ FAIL: wrong status code
@Post
public HttpResponse<PersonResponse> create(@Body @Valid CreatePersonRequest request) {
    return HttpResponse.ok(personService.create(request)); // Should be 201, not 200
}

// ❌ FAIL: wrong status code
@Delete("/{id}")
public HttpResponse<Void> delete(@NotNull UUID id) {
    personService.delete(id);
    return HttpResponse.ok(); // Should be 204, not 200
}

// ✅ PASS: correct status codes
@Post
public HttpResponse<PersonResponse> create(@Body @Valid CreatePersonRequest request) {
    var person = personService.create(request);
    var location = UriBuilder.of("/api/v1/persons")
        .path(person.id().toString())
        .build();
    return HttpResponse.created(person, location); // 201 Created with Location
}

@Delete("/{id}")
public HttpResponse<Void> delete(@NotNull UUID id) {
    personService.delete(id);
    return HttpResponse.noContent(); // 204 No Content
}
```

## Error Response Format (RFC 7807)

```java
// ❌ FAIL: inconsistent error format
return HttpResponse.badRequest("Name is required");

// ❌ FAIL: stack trace in error
return HttpResponse.status(500, exception.getStackTrace().toString());

// ✅ PASS: RFC 7807 error format
@Serdeable
public record ErrorResponse(
    int status,
    String title,
    String detail,
    String instance
) {}

var error = new ErrorResponse(
    400,
    "Bad Request",
    "Name must not be blank",
    request.getPath()
);
return HttpResponse.badRequest(error);
```

## Transaction Boundaries

```java
// ❌ FAIL: no transaction on multi-step operation
public OrderResponse createOrder(CreateOrderRequest request) {
    var order = toEntity(request);
    var saved = orderRepository.save(order);
    inventoryRepository.decrementStock(request.productId(), request.quantity());
    return toResponse(saved);
    // If decrementStock fails, order is saved but stock not updated — data inconsistency
}

// ✅ PASS: @Transactional ensures atomicity
@Transactional
public OrderResponse createOrder(CreateOrderRequest request) {
    var product = productRepository.findById(request.productId())
        .orElseThrow(() -> new ResourceNotFoundException("Product", request.productId()));

    if (product.stock() < request.quantity()) {
        throw new ValidationException("Insufficient stock");
    }

    var order = toEntity(request, product);
    var saved = orderRepository.save(order);
    inventoryRepository.decrementStock(request.productId(), request.quantity());
    return toResponse(saved);
}
```

## Java 21 Feature Usage

### Records (No Lombok)

```java
// ❌ FAIL: Lombok used
@Data
@AllArgsConstructor
public class PersonResponse {
    private UUID id;
    private String name;
}

// ✅ PASS: Java 21 record
@Serdeable
public record PersonResponse(UUID id, String name, String email, Instant createdAt) {}
```

### Pattern Matching Switch

```java
// ❌ FAIL: old-style switch with break
switch (status) {
    case 200:
        result = "OK";
        break;
    case 404:
        result = "Not Found";
        break;
    default:
        result = "Unknown";
}

// ✅ PASS: arrow syntax switch expression
var result = switch (status) {
    case 200 -> "OK";
    case 404 -> "Not Found";
    default -> "Unknown";
};
```

### Type Pattern Matching

```java
// ❌ FAIL: instanceof + cast
if (exception instanceof ValidationException) {
    var ve = (ValidationException) exception;
    return ve.getMessage();
}

// ✅ PASS: pattern matching instanceof
if (exception instanceof ValidationException ve) {
    return ve.getMessage();
}
```

## Import Order

Verify imports follow this order with blank lines between groups:

```java
package com.example.controller;

// 1. Java standard library
import java.time.Instant;
import java.util.List;
import java.util.UUID;

// 2. Jakarta
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

// 3. Micronaut
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import io.micronaut.serde.annotation.Serdeable;

// 4. Project
import com.example.dto.PersonResponse;
import com.example.service.PersonService;
```

## Query Safety

### Parameterized Queries Only

```java
// ❌ FAIL: string concatenation — SQL injection risk
@Query("SELECT * FROM persons WHERE name = '" + name + "'")
List<Person> findByName(String name);

// ❌ FAIL: string format — SQL injection risk
@Query("SELECT * FROM persons WHERE email = '%s'".formatted(email))
List<Person> findByEmail(String email);

// ✅ PASS: parameterized query
@Query("SELECT * FROM persons WHERE name = :name")
List<Person> findByName(String name);

// ✅ PASS: named parameters
@Query(value = "SELECT * FROM persons WHERE role = :role ORDER BY name",
       countQuery = "SELECT COUNT(*) FROM persons WHERE role = :role")
Page<Person> findByRole(String role, Pageable pageable);
```
