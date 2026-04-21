package com.example.controller;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.client.HttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@MicronautTest
class HealthControllerTest {

    @Test
    void testHealthEndpoint(@Client("/") HttpClient client) {
        var request = HttpRequest.GET("/api/v1/health");
        var response = client.toBlocking().exchange(request, HealthController.HealthResponse.class);

        assertEquals(HttpStatus.OK, response.getStatus());
        assertNotNull(response.body());
        assertEquals("UP", response.body().status());
    }
}
