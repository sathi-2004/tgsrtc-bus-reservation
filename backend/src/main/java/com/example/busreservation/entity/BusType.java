package com.example.busreservation.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bus_types")
public class BusType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(name = "total_seats", nullable = false)
    private int totalSeats;

    @Column(name = "has_ac", nullable = false)
    private boolean ac;

    @Column(name = "has_sleeper", nullable = false)
    private boolean sleeper;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public BusType() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getTotalSeats() { return totalSeats; }
    public void setTotalSeats(int totalSeats) { this.totalSeats = totalSeats; }

    public boolean isAc() { return ac; }
    public void setAc(boolean ac) { this.ac = ac; }

    public boolean isSleeper() { return sleeper; }
    public void setSleeper(boolean sleeper) { this.sleeper = sleeper; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
