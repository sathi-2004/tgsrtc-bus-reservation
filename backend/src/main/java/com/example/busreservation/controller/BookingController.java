package com.example.busreservation.controller;

import com.example.busreservation.dto.BookingRequestDto;
import com.example.busreservation.dto.CancelBookingRequest;
import com.example.busreservation.entity.Booking;
import com.example.busreservation.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody BookingRequestDto request) {
        Booking booking = bookingService.createBooking(request);
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Booking>> getMyBookings() {
        return ResponseEntity.ok(bookingService.getMyBookings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @GetMapping("/reference/{reference}")
    public ResponseEntity<Booking> getBookingByReference(@PathVariable String reference) {
        return ResponseEntity.ok(bookingService.getBookingByReference(reference));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id, @RequestBody(required = false) CancelBookingRequest request) {
        String reason = (request != null && request.getReason() != null) ? request.getReason() : "Voluntary cancellation";
        Booking cancelled = bookingService.cancelBooking(id, reason);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Ticket cancelled successfully. Refund initiated to original payment source.",
                "bookingReference", cancelled.getBookingReference(),
                "status", cancelled.getStatus()
        ));
    }
}
