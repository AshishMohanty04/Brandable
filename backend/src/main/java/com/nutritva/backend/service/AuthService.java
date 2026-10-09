package com.nutritva.backend.service;

import com.nutritva.backend.model.AuthRequest;
import com.nutritva.backend.model.AuthResponse;
import com.nutritva.backend.model.User;
import com.nutritva.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse login(AuthRequest request) {
        if (request.getEmailOrPhone() == null || request.getEmailOrPhone().trim().isEmpty()) {
            return AuthResponse.error("Please enter your registered mobile number or email address");
        }

        Optional<User> userOpt = userRepository.findByEmailOrPhone(request.getEmailOrPhone());
        if (userOpt.isEmpty()) {
            return AuthResponse.error("No account found with this mobile or email. Please sign up.");
        }

        User user = userOpt.get();

        // Check password (or allow demo passwords / any OTP for smooth experience)
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            boolean valid = request.getPassword().equals(user.getPassword()) || 
                            request.getPassword().equals("password123") || 
                            request.getPassword().equals("1234") ||
                            request.getPassword().equals("123456");
            if (!valid) {
                return AuthResponse.error("Incorrect password or OTP. Please check and try again.");
            }
        }

        String token = "nutritva_tok_" + UUID.randomUUID().toString();
        User safeUser = sanitizeUser(user);
        return AuthResponse.ok("Welcome back, " + user.getName() + "!", token, safeUser);
    }

    public AuthResponse signup(AuthRequest request) {
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            return AuthResponse.error("Please provide your full name");
        }

        String phone = request.getPhone() != null ? request.getPhone().trim() : "";
        String email = request.getEmail() != null ? request.getEmail().trim() : "";

        if (phone.isEmpty() && email.isEmpty()) {
            return AuthResponse.error("Please provide either mobile number or email address");
        }

        if (!email.isEmpty() && userRepository.existsByEmail(email)) {
            return AuthResponse.error("An account with this email already exists. Please log in.");
        }

        if (!phone.isEmpty() && userRepository.existsByPhone(phone)) {
            return AuthResponse.error("An account with this mobile number already exists. Please log in.");
        }

        String address = (request.getAddress() != null && !request.getAddress().trim().isEmpty())
                ? request.getAddress().trim()
                : "Bengaluru, Karnataka (Express 10-Min Delivery)";

        User newUser = new User(
                null,
                request.getName().trim(),
                email,
                phone,
                request.getPassword() != null ? request.getPassword() : "password123",
                address,
                null
        );

        User saved = userRepository.save(newUser);
        String token = "nutritva_tok_" + UUID.randomUUID().toString();
        return AuthResponse.ok("Account created successfully! Welcome to Nutritva.", token, sanitizeUser(saved));
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id).map(this::sanitizeUser);
    }

    private User sanitizeUser(User u) {
        return new User(
                u.getId(),
                u.getName(),
                u.getEmail(),
                u.getPhone(),
                null, // hide password
                u.getAddress(),
                u.getCreatedAt()
        );
    }
}
