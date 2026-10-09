package com.nutritva.backend.controller;

import com.nutritva.backend.model.ApiResponse;
import com.nutritva.backend.model.AuthRequest;
import com.nutritva.backend.model.AuthResponse;
import com.nutritva.backend.model.User;
import com.nutritva.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody AuthRequest request) {
        AuthResponse response = authService.signup(request);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<ApiResponse<User>> getUser(@PathVariable String id) {
        return authService.getUserById(id)
                .map(u -> ResponseEntity.ok(ApiResponse.ok("User found", u)))
                .orElse(ResponseEntity.status(404).body(ApiResponse.error("User not found")));
    }

    @GetMapping("/demo")
    public ResponseEntity<AuthResponse> getDemoLogin() {
        AuthRequest req = new AuthRequest();
        req.setEmailOrPhone("mohantyashish61@gmail.com");
        req.setPassword("password123");
        return ResponseEntity.ok(authService.login(req));
    }
}
