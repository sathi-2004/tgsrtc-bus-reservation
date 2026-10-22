package com.example.busreservation.repository;

import com.example.busreservation.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findByJourneyDate(LocalDate journeyDate);

    @Query("SELECT s FROM Schedule s " +
           "WHERE LOWER(s.route.sourceCity) LIKE LOWER(CONCAT('%', :from, '%')) " +
           "AND LOWER(s.route.destinationCity) LIKE LOWER(CONCAT('%', :to, '%')) " +
           "AND (:date IS NULL OR s.journeyDate = :date) " +
           "AND (:busType IS NULL OR LOWER(s.bus.serviceType) = LOWER(:busType))")
    List<Schedule> searchSchedules(
            @Param("from") String from,
            @Param("to") String to,
            @Param("date") LocalDate date,
            @Param("busType") String busType
    );
}
