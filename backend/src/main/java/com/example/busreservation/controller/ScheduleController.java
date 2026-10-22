package com.example.busreservation.controller;

import com.example.busreservation.dto.ScheduleResponseDto;
import com.example.busreservation.dto.SeatDto;
import com.example.busreservation.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @GetMapping("/search")
    public ResponseEntity<List<ScheduleResponseDto>> searchSchedules(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String busType) {
        List<ScheduleResponseDto> results = scheduleService.searchSchedules(from, to, date, busType);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScheduleResponseDto> getScheduleById(@PathVariable Long id) {
        return ResponseEntity.ok(scheduleService.getScheduleDtoById(id));
    }

    @GetMapping("/{id}/seats")
    public ResponseEntity<List<SeatDto>> getScheduleSeats(@PathVariable Long id) {
        return ResponseEntity.ok(scheduleService.getScheduleSeats(id));
    }
}
