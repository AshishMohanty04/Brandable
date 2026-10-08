package com.nutritva.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/hello")
    public ResponseEntity<Map<String, Object>> getHello() {
        return ResponseEntity.ok(Map.of(
                "message", "Hello from Spring Boot Backend!",
                "status", "UP",
                "timestamp", LocalDateTime.now()
        ));
    }
}
