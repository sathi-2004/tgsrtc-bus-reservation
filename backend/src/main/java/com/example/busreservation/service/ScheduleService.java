package com.example.busreservation.service;

import com.example.busreservation.dto.ScheduleResponseDto;
import com.example.busreservation.dto.SeatDto;
import com.example.busreservation.entity.*;
import com.example.busreservation.exception.ResourceNotFoundException;
import com.example.busreservation.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private BookingSeatRepository bookingSeatRepository;

    @Autowired
    private RouteStopRepository routeStopRepository;

    public List<ScheduleResponseDto> searchSchedules(String from, String to, String dateStr, String busType) {
        LocalDate date = null;
        if (dateStr != null && !dateStr.isBlank()) {
            try {
                date = LocalDate.parse(dateStr);
            } catch (Exception ignored) {}
        }

        String searchFrom = (from != null && !from.isBlank()) ? from.trim().split(" ")[0] : "";
        String searchTo = (to != null && !to.isBlank()) ? to.trim().split(" ")[0] : "";

        List<Schedule> schedules = scheduleRepository.searchSchedules(
                searchFrom,
                searchTo,
                date,
                (busType != null && !busType.isBlank()) ? busType.trim() : null
        );

        if (schedules.isEmpty()) {
            // Fallback to all schedules for demo flexibility
            schedules = scheduleRepository.findAll();
        }

        return schedules.stream().map(this::mapToDto).toList();
    }

    public ScheduleResponseDto getScheduleDtoById(Long id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule not found with ID: " + id));
        return mapToDto(schedule);
    }

    public Schedule getScheduleById(Long id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule not found with ID: " + id));
    }

    public List<SeatDto> getScheduleSeats(Long scheduleId) {
        Schedule schedule = getScheduleById(scheduleId);
        Long busId = schedule.getBus().getId();

        List<Seat> busSeats = seatRepository.findByBusIdOrderBySeatRowAscSeatColAsc(busId);
        List<BookingSeat> bookedSeats = bookingSeatRepository.findByScheduleId(scheduleId);
        Set<String> bookedNumbers = new HashSet<>();
        for (BookingSeat bs : bookedSeats) {
            bookedNumbers.add(bs.getSeatNumber());
        }

        List<SeatDto> dtoList = new ArrayList<>();
        for (Seat seat : busSeats) {
            String status = bookedNumbers.contains(seat.getSeatNumber()) ? "BOOKED" :
                    (!seat.isActive() ? "DISABLED" : "AVAILABLE");

            dtoList.add(new SeatDto(
                    seat.getSeatNumber(),
                    seat.getSeatRow(),
                    seat.getSeatCol(),
                    seat.getSeatType(),
                    seat.getBerthType(),
                    schedule.getFare(),
                    status
            ));
        }

        return dtoList;
    }

    public List<SeatDto> getBusSeats(Long busId) {
        List<Seat> busSeats = seatRepository.findByBusIdOrderBySeatRowAscSeatColAsc(busId);
        List<SeatDto> dtoList = new ArrayList<>();
        for (Seat seat : busSeats) {
            dtoList.add(new SeatDto(
                    seat.getSeatNumber(),
                    seat.getSeatRow(),
                    seat.getSeatCol(),
                    seat.getSeatType(),
                    seat.getBerthType(),
                    seat.getBaseFare(),
                    seat.isActive() ? "AVAILABLE" : "DISABLED"
            ));
        }
        return dtoList;
    }

    public Schedule saveSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    public void deleteSchedule(Long id) {
        if (!scheduleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Schedule not found with ID: " + id);
        }
        scheduleRepository.deleteById(id);
    }

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    private ScheduleResponseDto mapToDto(Schedule s) {
        ScheduleResponseDto dto = new ScheduleResponseDto();
        dto.setId(s.getId());
        dto.setBusNumber(s.getBus().getRegistrationNumber());
        dto.setBusName(s.getBus().getBusName());
        dto.setServiceType(s.getBus().getServiceType());
        dto.setServiceCategory(s.getBus().getServiceType().contains("AC") ? "AC Luxury" : "Express Non-AC");
        dto.setSourceCity(s.getRoute().getSourceCity());
        dto.setDestinationCity(s.getRoute().getDestinationCity());
        dto.setDepartureTime(s.getDepartureTime());
        dto.setArrivalTime(s.getArrivalTime());
        dto.setDuration(s.getRoute().getEstimatedDuration());
        dto.setJourneyDate(s.getJourneyDate());
        dto.setFare(s.getFare());
        dto.setTotalSeats(s.getBus().getTotalSeats());
        dto.setAvailableSeats(s.getAvailableSeats());
        dto.setRating(4.5);

        // Amenities
        String rawAmenities = s.getBus().getAmenities();
        if (rawAmenities != null) {
            dto.setAmenities(Arrays.stream(rawAmenities.split(",")).map(String::trim).toList());
        } else {
            dto.setAmenities(List.of("AC", "Charging Point", "Emergency Exit"));
        }

        // Boarding and Dropping Points
        List<RouteStop> stops = routeStopRepository.findByRouteIdOrderByStopOrderAsc(s.getRoute().getId());
        List<ScheduleResponseDto.PointDto> boarding = new ArrayList<>();
        List<ScheduleResponseDto.PointDto> dropping = new ArrayList<>();

        for (RouteStop stop : stops) {
            if ("BOARDING".equalsIgnoreCase(stop.getStopType()) || "BOTH".equalsIgnoreCase(stop.getStopType())) {
                boarding.add(new ScheduleResponseDto.PointDto(stop.getStopName(), stop.getEstimatedTime()));
            }
            if ("DROPPING".equalsIgnoreCase(stop.getStopType()) || "BOTH".equalsIgnoreCase(stop.getStopType())) {
                dropping.add(new ScheduleResponseDto.PointDto(stop.getStopName(), stop.getEstimatedTime()));
            }
        }

        if (boarding.isEmpty()) {
            boarding.add(new ScheduleResponseDto.PointDto(s.getRoute().getSourceCity() + " Main Bus Stand", s.getDepartureTime()));
        }
        if (dropping.isEmpty()) {
            dropping.add(new ScheduleResponseDto.PointDto(s.getRoute().getDestinationCity() + " Terminal", s.getArrivalTime()));
        }

        dto.setBoardingPoints(boarding);
        dto.setDroppingPoints(dropping);
        return dto;
    }
}
