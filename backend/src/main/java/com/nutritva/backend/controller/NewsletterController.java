package com.nutritva.backend.controller;

import com.nutritva.backend.model.ApiResponse;
import com.nutritva.backend.model.NewsletterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class NewsletterController {

    @PostMapping("/newsletter")
    public ResponseEntity<ApiResponse<String>> subscribeNewsletter(@RequestBody NewsletterRequest request) {
        if (request.getEmail() == null || !request.getEmail().contains("@")) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Please provide a valid email address"));
        }
        return ResponseEntity.ok(ApiResponse.ok(
                "Thank you for subscribing to Nutritva Farm News! Use coupon BLINK15 for 15% off.",
                request.getEmail()
        ));
    }

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse<String>> submitContact(@RequestBody Map<String, String> payload) {
        String name = payload.getOrDefault("name", "Customer");
        return ResponseEntity.ok(ApiResponse.ok(
                "Message received! Our team will contact you within 2 business hours.",
                name
        ));
    }
}
