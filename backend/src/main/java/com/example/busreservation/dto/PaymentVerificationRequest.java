package com.example.busreservation.dto;

public class PaymentVerificationRequest {
    private String orderId;
    private String paymentId;
    private String signature;
    private String method = "UPI";

    public PaymentVerificationRequest() {}

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }

    public String getSignature() { return signature; }
    public void setSignature(String signature) { this.signature = signature; }

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }
}
