-- ============================================================
-- TGSRTC ONLINE RESERVATION - SAMPLE DATA SEED SCRIPT
-- ============================================================

USE bus_reservation_db;

-- 1. Roles
INSERT INTO roles (id, name) VALUES 
(1, 'ROLE_ADMIN'),
(2, 'ROLE_PASSENGER')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 2. Users (BCrypt hashes for 'Admin@123' and 'Pass@123')
INSERT INTO users (id, name, email, password, mobile, role, is_active) VALUES
(1, 'TGSRTC Chief Administrator', 'admin@tgsrtc.gov.in', '$2a$10$wTqS8eC0qJ1jL8YvWk0Z1O0b1wJ1qS8eC0qJ1jL8YvWk0Z1O0b1wJ', '04069440000', 'ROLE_ADMIN', TRUE),
(2, 'K. Rajesh Kumar', 'passenger@example.com', '$2a$10$wTqS8eC0qJ1jL8YvWk0Z1O0b1wJ1qS8eC0qJ1jL8YvWk0Z1O0b1wJ', '9876543210', 'ROLE_PASSENGER', TRUE)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 3. Bus Types
INSERT INTO bus_types (id, name, category, total_seats, has_ac, has_sleeper) VALUES
(1, 'GARUDA PLUS', 'Multi-Axle AC Semi-Sleeper', 48, TRUE, FALSE),
(2, 'RAJADHANI', 'AC Semi-Sleeper', 44, TRUE, FALSE),
(3, 'SUPER LUXURY', '2+2 Non-AC Pushback', 40, FALSE, FALSE),
(4, 'AC SLEEPER', 'Premium 2+1 Berth', 36, TRUE, TRUE),
(5, 'DELUXE', '2+2 Non-AC Standard', 44, FALSE, FALSE),
(6, 'EXPRESS', '3+2 Standard Express', 52, FALSE, FALSE),
(7, 'PALLEVELUGU', 'Rural Village Lifeline', 52, FALSE, FALSE)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 4. Buses
INSERT INTO buses (id, registration_number, bus_name, service_type, total_seats, depot_name, amenities, is_active) VALUES
(1, 'TS-09-Z-7821', 'GARUDA PLUS (Multi-Axle AC)', 'GARUDA PLUS', 48, 'MGBS Depot Hyderabad', 'AC, WiFi, Charging Point, Water Bottle, Blanket', TRUE),
(2, 'TS-10-UB-4512', 'RAJADHANI (AC Semi-Sleeper)', 'RAJADHANI', 44, 'Hanamkonda Bus Depot', 'AC, Charging Point, Pushback Seats, Water Bottle', TRUE),
(3, 'TS-08-VA-9901', 'SUPER LUXURY (2+2 Non-AC Pushback)', 'SUPER LUXURY', 40, 'Karimnagar-1 Depot', 'Pushback Seats, Reading Light, First Aid Box', TRUE),
(4, 'TS-11-SA-2234', 'AC SLEEPER (Premium 2+1 Berth)', 'AC SLEEPER', 36, 'BHEL Depot Hyderabad', 'AC, WiFi, Blanket & Pillow, Charging Point, GPS', TRUE),
(5, 'TS-03-EX-1029', 'DELUXE (Express 2+2)', 'DELUXE', 44, 'Khammam Central Depot', 'Cushioned Seats, Luggage Compartment', TRUE),
(6, 'TS-05-PL-8890', 'PALLEVELUGU (Rural District Express)', 'PALLEVELUGU', 52, 'Nizamabad Central Depot', 'General Seating, Standard Luggage Space', TRUE)
ON DUPLICATE KEY UPDATE bus_name=VALUES(bus_name);

-- 5. Routes (All 10 sample Telangana routes)
INSERT INTO routes (id, source_city, destination_city, distance_km, estimated_duration, base_fare, is_active) VALUES
(1, 'Hyderabad (MGBS)', 'Vijayawada', 275, '4h 30m', 380.00, TRUE),
(2, 'Hyderabad (MGBS)', 'Warangal', 148, '2h 45m', 220.00, TRUE),
(3, 'Hyderabad (MGBS)', 'Karimnagar', 164, '3h 15m', 260.00, TRUE),
(4, 'Hyderabad (MGBS)', 'Khammam', 198, '3h 45m', 275.00, TRUE),
(5, 'Hyderabad (MGBS)', 'Bengaluru', 570, '9h 00m', 890.00, TRUE),
(6, 'Hyderabad (MGBS)', 'Chennai', 630, '10h 30m', 950.00, TRUE),
(7, 'Hyderabad (MGBS)', 'Tirupati', 555, '10h 00m', 820.00, TRUE),
(8, 'Hyderabad (MGBS)', 'Bhadrachalam', 310, '6h 30m', 490.00, TRUE),
(9, 'Hyderabad (MGBS)', 'Srisailam', 215, '5h 00m', 340.00, TRUE),
(10, 'Hyderabad (MGBS)', 'Nizamabad', 175, '3h 30m', 270.00, TRUE),
-- Return Routes
(11, 'Vijayawada', 'Hyderabad (MGBS)', 275, '4h 30m', 380.00, TRUE),
(12, 'Warangal', 'Hyderabad (MGBS)', 148, '2h 45m', 220.00, TRUE)
ON DUPLICATE KEY UPDATE source_city=VALUES(source_city);

-- 6. Route Stops (Boarding & Dropping Points)
INSERT INTO route_stops (id, route_id, stop_name, stop_type, stop_order, estimated_time) VALUES
-- Route 1: Hyderabad -> Vijayawada
(1, 1, 'MGBS Platform 12', 'BOARDING', 1, '06:00 AM'),
(2, 1, 'Dilsukhnagar Bus Stop', 'BOARDING', 2, '06:20 AM'),
(3, 1, 'LB Nagar Ring Road', 'BOARDING', 3, '06:40 AM'),
(4, 1, 'Hayathnagar Bus Depot', 'BOARDING', 4, '07:00 AM'),
(5, 1, 'Suryapet Bypass', 'INTERMEDIATE', 5, '08:30 AM'),
(6, 1, 'Ibrahimpatnam Ring', 'DROPPING', 6, '09:45 AM'),
(7, 1, 'Vijayawada PNBS Central Bus Stand', 'DROPPING', 7, '10:30 AM'),

-- Route 2: Hyderabad -> Warangal
(8, 2, 'MGBS Platform 6', 'BOARDING', 1, '07:30 AM'),
(9, 2, 'Uppal Bus Stop', 'BOARDING', 2, '08:05 AM'),
(10, 2, 'Ghatkesar Bypass', 'BOARDING', 3, '08:25 AM'),
(11, 2, 'Jangaon Bus Depot', 'INTERMEDIATE', 4, '09:15 AM'),
(12, 2, 'Kazipet Railway Station', 'DROPPING', 5, '09:50 AM'),
(13, 2, 'Hanamkonda Central Bus Station', 'DROPPING', 6, '10:05 AM'),
(14, 2, 'Warangal Main Bus Station', 'DROPPING', 7, '10:15 AM')
ON DUPLICATE KEY UPDATE stop_name=VALUES(stop_name);

-- 7. Schedules (Multiple daily departures)
INSERT INTO schedules (id, bus_id, route_id, departure_time, arrival_time, journey_date, fare, available_seats, status) VALUES
(101, 1, 1, '06:00 AM', '10:30 AM', CURDATE(), 680.00, 32, 'SCHEDULED'),
(102, 2, 2, '07:30 AM', '10:15 AM', CURDATE(), 340.00, 26, 'SCHEDULED'),
(103, 3, 3, '08:15 AM', '11:30 AM', CURDATE(), 290.00, 22, 'SCHEDULED'),
(104, 4, 5, '09:00 PM', '06:00 AM', CURDATE(), 1150.00, 18, 'SCHEDULED'),
(105, 5, 4, '10:00 AM', '02:30 PM', CURDATE(), 275.00, 28, 'SCHEDULED'),
(106, 6, 10, '01:00 PM', '05:30 PM', CURDATE(), 195.00, 38, 'SCHEDULED'),
-- Schedules for Tomorrow
(107, 1, 1, '06:00 AM', '10:30 AM', DATE_ADD(CURDATE(), INTERVAL 1 DAY), 680.00, 48, 'SCHEDULED'),
(108, 2, 2, '07:30 AM', '10:15 AM', DATE_ADD(CURDATE(), INTERVAL 1 DAY), 340.00, 44, 'SCHEDULED')
ON DUPLICATE KEY UPDATE departure_time=VALUES(departure_time);

-- 8. Seats Layout for Bus 1 (Garuda Plus 48 seats)
INSERT INTO seats (bus_id, seat_number, seat_row, seat_col, seat_type, berth_type, base_fare, is_active)
SELECT 1, CONCAT('', n), CEIL(n/4), MOD(n-1, 4), IF(MOD(n,4)=0 OR MOD(n-1,4)=0, 'Window', 'Aisle'), 'Lower', 1.00, TRUE
FROM (
  SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8
  UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16
  UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24
  UNION SELECT 25 UNION SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29 UNION SELECT 30 UNION SELECT 31 UNION SELECT 32
  UNION SELECT 33 UNION SELECT 34 UNION SELECT 35 UNION SELECT 36 UNION SELECT 37 UNION SELECT 38 UNION SELECT 39 UNION SELECT 40
) AS num_gen
ON DUPLICATE KEY UPDATE seat_number=VALUES(seat_number);

-- 9. Sample Confirmed Booking
INSERT INTO bookings (id, booking_reference, ticket_number, user_id, schedule_id, source_city, destination_city, journey_date, departure_time, arrival_time, bus_name, bus_number, service_type, boarding_point, dropping_point, total_amount, gst_amount, discount_amount, contact_email, contact_mobile, status, payment_status) VALUES
(1001, 'TG-20261009-4821', 'TGS98234120', 2, 102, 'Hyderabad (MGBS)', 'Warangal', CURDATE(), '07:30 AM', '10:15 AM', 'RAJADHANI (AC Semi-Sleeper)', 'TS-10-UB-4512', 'RAJADHANI', 'MGBS Platform 6', 'Warangal Main Bus Station', 340.00, 17.00, 0.00, 'passenger@example.com', '9876543210', 'CONFIRMED', 'PAID')
ON DUPLICATE KEY UPDATE booking_reference=VALUES(booking_reference);

-- 10. Sample Booking Passenger & Reserved Seat
INSERT INTO booking_passengers (id, booking_id, passenger_name, age, gender, seat_number) VALUES
(1, 1001, 'K. Rajesh Kumar', 29, 'MALE', '14')
ON DUPLICATE KEY UPDATE passenger_name=VALUES(passenger_name);

INSERT INTO booking_seats (schedule_id, seat_number, booking_id, status) VALUES
(102, '14', 1001, 'RESERVED')
ON DUPLICATE KEY UPDATE status=VALUES(status);

-- 11. Sample Payment
INSERT INTO payments (id, booking_id, transaction_id, order_id, payment_method, amount, status) VALUES
(1, 1001, 'TXN_17284712001', 'order_demo12345', 'UPI (Google Pay)', 340.00, 'SUCCESS')
ON DUPLICATE KEY UPDATE transaction_id=VALUES(transaction_id);

-- 12. Offers
INSERT INTO offers (id, code, title, discount_amount, discount_type, min_amount, is_active) VALUES
(1, 'TGSRTC50', 'Flat ₹50 Off on AC & Express Services', 50.00, 'FLAT', 500.00, TRUE),
(2, 'TSGOVT10', '10% RTC Return Journey Concession', 10.00, 'PERCENTAGE', 200.00, TRUE)
ON DUPLICATE KEY UPDATE code=VALUES(code);
