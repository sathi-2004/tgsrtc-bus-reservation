package com.example.busreservation;

import com.example.busreservation.dto.BookingRequestDto;
import com.example.busreservation.dto.LoginRequest;
import com.example.busreservation.dto.PassengerDto;
import com.example.busreservation.entity.Booking;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import com.example.busreservation.repository.BookingRepository;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ApiControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private BookingRepository bookingRepository;

    @Test
    void testHealthEndpoint() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.service").exists());
    }

    @Test
    void testGetCitiesEndpoint() throws Exception {
        mockMvc.perform(get("/api/routes/cities"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void testGetRoutesEndpoint() throws Exception {
        mockMvc.perform(get("/api/routes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void testSearchSchedulesEndpoint() throws Exception {
        mockMvc.perform(get("/api/schedules/search")
                        .param("from", "Hyderabad")
                        .param("to", "Warangal"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].sourceCity").value("Hyderabad (MGBS)"));
    }

    @Test
    void testGetScheduleSeatsEndpoint() throws Exception {
        mockMvc.perform(get("/api/schedules/101/seats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void testAuthLoginSuccess() throws Exception {
        LoginRequest loginRequest = new LoginRequest("admin@tgsrtc.gov.in", "Admin@123");
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.email").value("admin@tgsrtc.gov.in"));
    }

    @Test
    void testAuthLoginBadCredentials() throws Exception {
        LoginRequest loginRequest = new LoginRequest("admin@tgsrtc.gov.in", "WrongPassword999");
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void testBookingCreationAndLookup() throws Exception {
        String testSeat = "T" + (10 + (int) (System.currentTimeMillis() % 80));
        BookingRequestDto bookingReq = new BookingRequestDto();
        bookingReq.setScheduleId(101L);
        bookingReq.setSourceCity("Hyderabad (MGBS)");
        bookingReq.setDestinationCity("Vijayawada");
        bookingReq.setJourneyDate(LocalDate.now());
        bookingReq.setDepartureTime("06:00 AM");
        bookingReq.setArrivalTime("10:30 AM");
        bookingReq.setTotalAmount(BigDecimal.valueOf(680.00));
        bookingReq.setContactEmail("test.passenger@example.com");
        bookingReq.setContactMobile("9988776655");
        bookingReq.setPassengers(Collections.singletonList(
                new PassengerDto("R. Sitaram", 35, "MALE", testSeat)
        ));

        String responseJson = mockMvc.perform(post("/api/bookings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(bookingReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.bookingReference").exists())
                .andExpect(jsonPath("$.ticketNumber").exists())
                .andReturn().getResponse().getContentAsString();

        Booking created = objectMapper.readValue(responseJson, Booking.class);

        try {
            // Verify retrieval by reference
            mockMvc.perform(get("/api/bookings/reference/" + created.getBookingReference()))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.bookingReference").value(created.getBookingReference()));
        } finally {
            if (created != null && created.getId() != null) {
                bookingRepository.deleteById(created.getId());
            }
        }
    }
}
