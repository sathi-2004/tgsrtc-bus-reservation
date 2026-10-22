package com.example.busreservation.repository;

import com.example.busreservation.entity.Refund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefundRepository extends JpaRepository<Refund, Long> {
    Optional<Refund> findByCancellationId(Long cancellationId);
    Optional<Refund> findByRefundReference(String refundReference);
}
