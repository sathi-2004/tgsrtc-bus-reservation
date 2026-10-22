package com.example.busreservation.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "seats")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bus_id", nullable = false)
    private Bus bus;

    @Column(name = "seat_number", nullable = false, length = 10)
    private String seatNumber;

    @Column(name = "seat_row", nullable = false)
    private int seatRow;

    @Column(name = "seat_col", nullable = false)
    private int seatCol;

    @Column(name = "seat_type", nullable = false, length = 20)
    private String seatType = "Aisle"; // Window, Aisle

    @Column(name = "berth_type", nullable = false, length = 20)
    private String berthType = "Lower"; // Lower, Upper

    @Column(name = "base_fare", precision = 10, scale = 2)
    private BigDecimal baseFare = BigDecimal.valueOf(350.00);

    @Column(name = "is_active", nullable = false)
    private boolean active = true;

    public Seat() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Bus getBus() { return bus; }
    public void setBus(Bus bus) { this.bus = bus; }

    public String getSeatNumber() { return seatNumber; }
    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }

    public int getSeatRow() { return seatRow; }
    public void setSeatRow(int seatRow) { this.seatRow = seatRow; }

    public int getSeatCol() { return seatCol; }
    public void setSeatCol(int seatCol) { this.seatCol = seatCol; }

    public String getSeatType() { return seatType; }
    public void setSeatType(String seatType) { this.seatType = seatType; }

    public String getBerthType() { return berthType; }
    public void setBerthType(String berthType) { this.berthType = berthType; }

    public BigDecimal getBaseFare() { return baseFare; }
    public void setBaseFare(BigDecimal baseFare) { this.baseFare = baseFare; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
