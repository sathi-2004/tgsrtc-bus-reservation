package com.example.busreservation.repository;

import com.example.busreservation.entity.BusType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BusTypeRepository extends JpaRepository<BusType, Long> {
    Optional<BusType> findByName(String name);
}
