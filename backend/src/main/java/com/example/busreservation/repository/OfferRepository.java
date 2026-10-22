package com.example.busreservation.repository;

import com.example.busreservation.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    Optional<Offer> findByCodeIgnoreCaseAndActiveTrue(String code);
}
