package com.example.busreservation.repository;

import com.example.busreservation.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {

    List<Route> findByActiveTrue();

    Optional<Route> findBySourceCityIgnoreCaseAndDestinationCityIgnoreCaseAndActiveTrue(String sourceCity, String destinationCity);

    @Query("SELECT DISTINCT r.sourceCity FROM Route r WHERE r.active = true")
    List<String> findDistinctSourceCities();

    @Query("SELECT DISTINCT r.destinationCity FROM Route r WHERE r.active = true")
    List<String> findDistinctDestinationCities();
}
