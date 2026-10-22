package com.example.busreservation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping
public class HealthController {

    @GetMapping({"/health", "/api/health"})
    public ResponseEntity<Map<String, Object>> checkHealth() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", "TGSRTC Online Bus Reservation System API");
        health.put("version", "1.0.0");
        health.put("database", "MySQL 8.0 Connected");
        health.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(health);
    }
}
