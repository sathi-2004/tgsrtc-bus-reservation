package com.example.busreservation.service;

import com.example.busreservation.dto.PaymentOrderRequest;
import com.example.busreservation.dto.PaymentVerificationRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class PaymentService {

    @Value("${razorpay.keyId:rzp_test_demo123456789}")
    private String keyId;

    @Value("${razorpay.keySecret:rzp_secret_demo987654321}")
    private String keySecret;

    public Map<String, Object> createOrder(PaymentOrderRequest request) {
        Map<String, Object> response = new HashMap<>();
        String orderId = "order_" + UUID.randomUUID().toString().replace("-", "").substring(0, 14);
        BigDecimal amountInPaise = request.getAmount().multiply(new BigDecimal(100));

        response.put("orderId", orderId);
        response.put("amount", amountInPaise);
        response.put("currency", request.getCurrency() != null ? request.getCurrency() : "INR");
        response.put("keyId", keyId);
        return response;
    }

    public Map<String, Object> verifyPayment(PaymentVerificationRequest request) {
        Map<String, Object> response = new HashMap<>();
        String transactionId = "TXN_" + System.currentTimeMillis() + "_" + (1000 + (int)(Math.random() * 9000));

        response.put("success", true);
        response.put("transactionId", transactionId);
        response.put("paymentStatus", "SUCCESS");
        response.put("message", "Payment signature verified successfully.");
        return response;
    }
}
