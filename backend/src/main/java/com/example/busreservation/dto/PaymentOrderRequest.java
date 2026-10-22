package com.example.busreservation.dto;

import java.math.BigDecimal;

public class PaymentOrderRequest {
    private BigDecimal amount;
    private String currency = "INR";
    private Long scheduleId;
    private Long bookingId;

    public PaymentOrderRequest() {}

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public Long getScheduleId() { return scheduleId; }
    public void setScheduleId(Long scheduleId) { this.scheduleId = scheduleId; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }
}
