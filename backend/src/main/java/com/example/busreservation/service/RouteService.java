package com.example.busreservation.service;

import com.example.busreservation.entity.Route;
import com.example.busreservation.exception.ResourceNotFoundException;
import com.example.busreservation.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    public List<String> getAllCities() {
        Set<String> citySet = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);
        citySet.addAll(routeRepository.findDistinctSourceCities());
        citySet.addAll(routeRepository.findDistinctDestinationCities());

        if (citySet.isEmpty()) {
            return Arrays.asList(
                    "Hyderabad (MGBS)", "Hyderabad (JBS)", "Warangal", "Karimnagar",
                    "Khammam", "Nizamabad", "Vijayawada", "Bengaluru", "Chennai",
                    "Tirupati", "Bhadrachalam", "Srisailam", "Mahabubnagar", "Nalgonda"
            );
        }
        return new ArrayList<>(citySet);
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Route getRouteById(Long id) {
        return routeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found with ID: " + id));
    }

    public Route saveRoute(Route route) {
        return routeRepository.save(route);
    }

    public void deleteRoute(Long id) {
        if (!routeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Route not found with ID: " + id);
        }
        routeRepository.deleteById(id);
    }

    public List<Map<String, Object>> getPopularRoutes() {
        List<Route> routes = routeRepository.findByActiveTrue();
        List<Map<String, Object>> popular = new ArrayList<>();

        for (Route r : routes) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", r.getId());
            map.put("source", r.getSourceCity());
            map.put("destination", r.getDestinationCity());
            map.put("distanceKm", r.getDistanceKm());
            map.put("duration", r.getEstimatedDuration());
            map.put("startingFare", r.getBaseFare());
            map.put("frequency", r.getDistanceKm() > 400 ? "Hourly" : "Every 20 mins");
            popular.add(map);
            if (popular.size() >= 8) break;
        }
        return popular;
    }
}
