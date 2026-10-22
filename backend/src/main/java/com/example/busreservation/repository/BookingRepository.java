package com.example.busreservation.repository;

import com.example.busreservation.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<Booking> findByBookingReference(String bookingReference);
    Optional<Booking> findByTicketNumber(String ticketNumber);
    Optional<Booking> findByBookingReferenceOrTicketNumber(String bookingReference, String ticketNumber);
}
