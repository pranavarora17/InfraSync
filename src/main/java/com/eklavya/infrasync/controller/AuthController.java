package com.eklavya.infrasync.controller;

import com.eklavya.infrasync.model.User;
import com.eklavya.infrasync.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.PostConstruct;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // LOGIN ENDPOINT
    @PostMapping("/login")
    public User login(@RequestBody User loginData) {
        Optional<User> user = userRepository.findByUsername(loginData.getUsername());
        if (user.isPresent() && user.get().getPassword().equals(loginData.getPassword())) {
            return user.get(); // Login Success
        }
        throw new RuntimeException("Invalid Credentials");
    }

    // --- IMPROVED SIGNUP ENDPOINT ---
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        // 1. Check if username exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists!");
        }
        // 2. Save new user
        return userRepository.save(user);
    }

    // CREATE DEFAULT USERS ON STARTUP (For easy testing)
    @PostConstruct
    public void init() {
        if (userRepository.count() == 0) {
            // Admin / Water
            createUser("admin", "admin123", "OFFICIAL", "Water Dept");
            createUser("water", "water123", "OFFICIAL", "Water Dept");

            // Other Depts
            createUser("roads", "roads123", "OFFICIAL", "Roads Dept");
            createUser("gas", "gas123", "OFFICIAL", "Gas Dept");
            createUser("elec", "elec123", "OFFICIAL", "Electricity Dept");
            createUser("telecom", "telecom123", "OFFICIAL", "Telecom Dept");

            // Citizen
            createUser("citizen", "citizen123", "CITIZEN", null);
        }
    }

    private void createUser(String u, String p, String r, String d) {
        User user = new User();
        user.setUsername(u);
        user.setPassword(p);
        user.setRole(r);
        user.setDepartment(d);
        userRepository.save(user);
    }
}