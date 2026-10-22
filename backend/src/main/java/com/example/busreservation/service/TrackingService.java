package com.example.busreservation.service;

import com.example.busreservation.entity.Schedule;
import com.example.busreservation.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TrackingService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public Map<String, Object> getTrackingData(Long scheduleId) {
        Optional<Schedule> schedOpt = scheduleRepository.findById(scheduleId);
        Schedule s = schedOpt.orElse(null);

        Map<String, Object> data = new HashMap<>();
        data.put("scheduleId", scheduleId);
        data.put("busNumber", s != null ? s.getBus().getRegistrationNumber() : "TS-09-Z-7821");
        data.put("busName", s != null ? s.getBus().getBusName() : "GARUDA PLUS (Multi-Axle AC)");
        data.put("route", s != null ? s.getRoute().getSourceCity() + " -> " + s.getRoute().getDestinationCity() : "Hyderabad (MGBS) -> Vijayawada");
        data.put("serviceType", s != null ? s.getBus().getServiceType() : "GARUDA PLUS");
        data.put("driverName", "K. Ramana Rao");
        data.put("driverMobile", "+91 94401 23456");
        data.put("speedKmH", 68);
        data.put("status", "ON_ROUTE");
        data.put("delayMinutes", 5);
        data.put("currentLocationName", "Near Suryapet Bypass (NH 65)");
        data.put("estimatedArrival", s != null ? s.getArrivalTime() : "10:35 AM");
        data.put("totalDistanceKm", s != null ? s.getRoute().getDistanceKm() : 275);
        data.put("coveredDistanceKm", 142);

        List<Map<String, Object>> stops = new ArrayList<>();
        stops.add(createStop("MGBS Hyderabad (Platform 12)", "06:00 AM", "06:02 AM", "DEPARTED", true));
        stops.add(createStop("LB Nagar Ring Road", "06:40 AM", "06:45 AM", "DEPARTED", true));
        stops.add(createStop("Choutuppal Toll Plaza", "07:20 AM", "07:22 AM", "DEPARTED", true));
        stops.add(createStop("Suryapet Bypass (Food Court)", "08:30 AM", "08:35 AM", "CURRENT", false));
        stops.add(createStop("Kodad Bus Stop", "09:15 AM", "09:20 AM (Est)", "UPCOMING", false));
        stops.add(createStop("Nandigama Toll Gate", "09:50 AM", "09:55 AM (Est)", "UPCOMING", false));
        stops.add(createStop("Vijayawada PNBS Central", "10:30 AM", "10:35 AM (Est)", "UPCOMING", false));

        data.put("stops", stops);
        return data;
    }

    private Map<String, Object> createStop(String name, String schedTime, String actTime, String status, boolean passed) {
        Map<String, Object> m = new HashMap<>();
        m.put("name", name);
        m.put("scheduledTime", schedTime);
        m.put("actualTime", actTime);
        m.put("status", status);
        m.put("passed", passed);
        return m;
    }
}
