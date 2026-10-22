package com.example.busreservation.controller;

import com.example.busreservation.dto.*;
import com.example.busreservation.entity.User;
import com.example.busreservation.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse response = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        AuthResponse response = authService.registerUser(signUpRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        String token = authService.generatePasswordResetToken(request.getEmail());
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Password reset instructions dispatched.",
                "token", token
        ));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok(new ApiResponse(true, "Password has been successfully updated."));
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        User user = authService.getCurrentUser();
        if (user == null) {
            return ResponseEntity.ok(Map.of("name", "Guest Passenger", "email", "guest@example.com"));
        }
        return ResponseEntity.ok(new AuthResponse(
                null,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getMobile(),
                Collections.singletonList("ROLE_" + user.getRole())
        ));
    }
}
