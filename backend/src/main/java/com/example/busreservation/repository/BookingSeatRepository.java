package com.example.busreservation.repository;

import com.example.busreservation.entity.BookingSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingSeatRepository extends JpaRepository<BookingSeat, Long> {
    List<BookingSeat> findByScheduleId(Long scheduleId);
    boolean existsByScheduleIdAndSeatNumber(Long scheduleId, String seatNumber);
}
