package com.example.exception;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Produces;
import io.micronaut.http.server.exceptions.ExceptionHandler;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.ConstraintViolationException;
import jakarta.inject.Singleton;

@Singleton
@Produces
public class GlobalExceptionHandler implements ExceptionHandler<Exception, HttpResponse<GlobalExceptionHandler.ErrorResponse>> {

    @Override
    public HttpResponse<ErrorResponse> handle(HttpRequest request, Exception exception) {
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
