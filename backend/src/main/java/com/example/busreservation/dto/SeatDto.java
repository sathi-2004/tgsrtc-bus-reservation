package com.example.busreservation.dto;

import java.math.BigDecimal;

public class SeatDto {
    private String seatNumber;
    private int row;
    private int col;
    private String type; // Window, Aisle
    private String berth; // Lower, Upper
    private BigDecimal fare;
    private String status; // AVAILABLE, BOOKED, DISABLED

    public SeatDto() {}

    public SeatDto(String seatNumber, int row, int col, String type, String berth, BigDecimal fare, String status) {
        this.seatNumber = seatNumber;
        this.row = row;
        this.col = col;
        this.type = type;
        this.berth = berth;
        this.fare = fare;
        this.status = status;
    }

    public String getSeatNumber() { return seatNumber; }
    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }

    public int getRow() { return row; }
    public void setRow(int row) { this.row = row; }

    public int getCol() { return col; }
    public void setCol(int col) { this.col = col; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getBerth() { return berth; }
    public void setBerth(String berth) { this.berth = berth; }

    public BigDecimal getFare() { return fare; }
    public void setFare(BigDecimal fare) { this.fare = fare; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
