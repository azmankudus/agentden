package com.example.controller;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.serde.annotation.Serdeable;

@Controller("/api/v1")
public class HealthController {

    @Get("/health")
    public HealthResponse health() {
        return new HealthResponse("UP");
    }

    @Serdeable
    public record HealthResponse(String status) {}
}
