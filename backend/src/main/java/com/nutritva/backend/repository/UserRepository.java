package com.nutritva.backend.repository;

import com.nutritva.backend.model.User;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class UserRepository {

    private final Map<String, User> usersById = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        User demoUser = new User(
                "USR-101",
                "Ashish Mohanty",
                "mohantyashish61@gmail.com",
                "9876543210",
                "password123",
                "Flat 402, Green Meadows, Indiranagar, Bengaluru - 560038",
                now
        );
        usersById.put(demoUser.getId(), demoUser);
    }

    public Optional<User> findById(String id) {
        return Optional.ofNullable(usersById.get(id));
    }

    public Optional<User> findByEmailOrPhone(String identifier) {
        if (identifier == null) return Optional.empty();
        String clean = identifier.trim().toLowerCase();
        return usersById.values().stream()
                .filter(u -> (u.getEmail() != null && u.getEmail().toLowerCase().equals(clean)) ||
                             (u.getPhone() != null && u.getPhone().replaceAll("\\D", "").equals(clean.replaceAll("\\D", ""))))
                .findFirst();
    }

    public boolean existsByEmail(String email) {
        if (email == null) return false;
        String clean = email.trim().toLowerCase();
        return usersById.values().stream()
                .anyMatch(u -> u.getEmail() != null && u.getEmail().toLowerCase().equals(clean));
    }

    public boolean existsByPhone(String phone) {
        if (phone == null) return false;
        String clean = phone.replaceAll("\\D", "");
        return usersById.values().stream()
                .anyMatch(u -> u.getPhone() != null && u.getPhone().replaceAll("\\D", "").equals(clean));
    }

    public User save(User user) {
        if (user.getId() == null || user.getId().isEmpty()) {
            user.setId("USR-" + (1000 + new Random().nextInt(9000)));
        }
        if (user.getCreatedAt() == null) {
            user.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        }
        usersById.put(user.getId(), user);
        return user;
    }

    public List<User> findAll() {
        return new ArrayList<>(usersById.values());
    }
}
