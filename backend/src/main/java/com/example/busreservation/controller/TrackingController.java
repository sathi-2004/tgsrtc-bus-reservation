package com.example.busreservation.controller;

import com.example.busreservation.service.TrackingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/tracking")
public class TrackingController {

    @Autowired
    private TrackingService trackingService;

    @GetMapping("/{scheduleId}")
    public ResponseEntity<Map<String, Object>> getTrackingData(@PathVariable Long scheduleId) {
        return ResponseEntity.ok(trackingService.getTrackingData(scheduleId));
    }
}
