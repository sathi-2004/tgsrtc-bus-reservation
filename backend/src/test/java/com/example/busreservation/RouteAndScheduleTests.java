package com.example.busreservation;

import com.example.busreservation.dto.ScheduleResponseDto;
import com.example.busreservation.entity.Route;
import com.example.busreservation.service.RouteService;
import com.example.busreservation.service.ScheduleService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RouteAndScheduleTests {

    @Autowired
    private RouteService routeService;

    @Autowired
    private ScheduleService scheduleService;

    @Test
    void testGetCities() {
        List<String> cities = routeService.getAllCities();
        assertNotNull(cities);
        assertFalse(cities.isEmpty());
        assertTrue(cities.stream().anyMatch(c -> c.contains("Hyderabad")));
    }

    @Test
    void testSearchSchedules() {
        List<ScheduleResponseDto> schedules = scheduleService.searchSchedules("Hyderabad", "Warangal", null, null);
        assertNotNull(schedules);
        assertFalse(schedules.isEmpty());
        assertEquals("Hyderabad (MGBS)", schedules.get(0).getSourceCity());
    }

    @Test
    void testRoutesExist() {
        List<Route> routes = routeService.getAllRoutes();
        assertNotNull(routes);
        assertFalse(routes.isEmpty());
    }
}
