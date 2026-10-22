package com.example.busreservation.controller;

import com.example.busreservation.dto.SeatDto;
import com.example.busreservation.entity.Bus;
import com.example.busreservation.service.AdminService;
import com.example.busreservation.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buses")
public class BusController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<List<Bus>> getAllBuses() {
        return ResponseEntity.ok(adminService.getAllBuses());
    }

    @GetMapping("/{id}/seats")
    public ResponseEntity<List<SeatDto>> getBusSeats(@PathVariable Long id) {
        return ResponseEntity.ok(scheduleService.getBusSeats(id));
    }
}
