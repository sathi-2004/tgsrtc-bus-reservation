package com.example.busreservation.config;

import com.example.busreservation.entity.*;
import com.example.busreservation.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Override
    public void run(String... args) throws Exception {
        logger.info("Checking database seed data...");

        // 1. Roles
        if (roleRepository.findByName("ROLE_ADMIN").isEmpty()) {
            roleRepository.save(new Role("ROLE_ADMIN"));
        }
        if (roleRepository.findByName("ROLE_PASSENGER").isEmpty()) {
            roleRepository.save(new Role("ROLE_PASSENGER"));
        }

        // 2. Admin User
        Optional<User> adminOpt = userRepository.findByEmail("admin@tgsrtc.gov.in");
        User admin = adminOpt.orElseGet(() -> new User(
                "TGSRTC Chief Administrator",
                "admin@tgsrtc.gov.in",
                "",
                "04069440000",
                "ADMIN"
        ));
        admin.setPassword(passwordEncoder.encode("Admin@123"));
        userRepository.save(admin);
        logger.info("Synchronized administrator: admin@tgsrtc.gov.in");

        // 3. Demo Passenger
        Optional<User> passengerOpt = userRepository.findByEmail("passenger@example.com");
        User passenger = passengerOpt.orElseGet(() -> new User(
                "K. Rajesh Kumar",
                "passenger@example.com",
                "",
                "9876543210",
                "PASSENGER"
        ));
        passenger.setPassword(passwordEncoder.encode("Pass@123"));
        userRepository.save(passenger);
        logger.info("Synchronized passenger: passenger@example.com");

        // 4. Check Seats for existing buses to ensure seat layout is always populated
        for (Bus bus : busRepository.findAll()) {
            if (seatRepository.findByBusIdOrderBySeatRowAscSeatColAsc(bus.getId()).isEmpty()) {
                int total = bus.getTotalSeats() > 0 ? bus.getTotalSeats() : 40;
                for (int i = 1; i <= total; i++) {
                    Seat seat = new Seat();
                    seat.setBus(bus);
                    seat.setSeatNumber(String.valueOf(i));
                    seat.setSeatRow((int) Math.ceil(i / 4.0));
                    seat.setSeatCol((i - 1) % 4);
                    seat.setSeatType((i % 4 == 0 || (i - 1) % 4 == 0) ? "Window" : "Aisle");
                    seat.setBerthType("Lower");
                    seat.setBaseFare(BigDecimal.valueOf(350.00));
                    seat.setActive(true);
                    seatRepository.save(seat);
                }
            }
        }

        logger.info("Database verification and seed check completed successfully.");
    }
}
