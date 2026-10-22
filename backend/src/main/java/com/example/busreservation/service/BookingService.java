package com.example.busreservation.service;

import com.example.busreservation.dto.BookingRequestDto;
import com.example.busreservation.dto.PassengerDto;
import com.example.busreservation.entity.*;
import com.example.busreservation.exception.BadRequestException;
import com.example.busreservation.exception.ResourceNotFoundException;
import com.example.busreservation.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BookingSeatRepository bookingSeatRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CancellationRepository cancellationRepository;

    @Autowired
    private RefundRepository refundRepository;

    @Autowired
    private AuthService authService;

    private final Random random = new Random();

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Booking createBooking(BookingRequestDto request) {
        Schedule schedule = scheduleRepository.findById(request.getScheduleId())
                .orElseThrow(() -> new ResourceNotFoundException("Schedule not found with ID: " + request.getScheduleId()));

        // Double Booking Prevention: Verify all selected seats are free
        for (PassengerDto p : request.getPassengers()) {
            if (bookingSeatRepository.existsByScheduleIdAndSeatNumber(schedule.getId(), p.getSeatNumber())) {
                throw new BadRequestException("Seat " + p.getSeatNumber() + " was just reserved by another passenger. Please select another seat.");
            }
        }

        User currentUser = authService.getCurrentUser();

        // Generate PNR and Reference
        String datePrefix = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String bookingRef = "TG-" + datePrefix + "-" + (1000 + random.nextInt(9000));
        String ticketNumber = "TGS" + (10000000 + random.nextInt(90000000));

        Booking booking = new Booking();
        booking.setBookingReference(bookingRef);
        booking.setTicketNumber(ticketNumber);
        booking.setUser(currentUser);
        booking.setSchedule(schedule);
        booking.setSourceCity(request.getSourceCity() != null ? request.getSourceCity() : schedule.getRoute().getSourceCity());
        booking.setDestinationCity(request.getDestinationCity() != null ? request.getDestinationCity() : schedule.getRoute().getDestinationCity());
        booking.setJourneyDate(request.getJourneyDate() != null ? request.getJourneyDate() : schedule.getJourneyDate());
        booking.setDepartureTime(request.getDepartureTime() != null ? request.getDepartureTime() : schedule.getDepartureTime());
        booking.setArrivalTime(request.getArrivalTime() != null ? request.getArrivalTime() : schedule.getArrivalTime());
        booking.setBusName(request.getBusName() != null ? request.getBusName() : schedule.getBus().getBusName());
        booking.setBusNumber(request.getBusNumber() != null ? request.getBusNumber() : schedule.getBus().getRegistrationNumber());
        booking.setServiceType(request.getServiceType() != null ? request.getServiceType() : schedule.getBus().getServiceType());
        booking.setBoardingPoint(request.getBoardingPoint() != null ? request.getBoardingPoint() : "Main Bus Station");
        booking.setDroppingPoint(request.getDroppingPoint() != null ? request.getDroppingPoint() : "Central Depot");
        booking.setTotalAmount(request.getTotalAmount());
        booking.setGstAmount(request.getGst() != null ? request.getGst() : BigDecimal.ZERO);
        booking.setDiscountAmount(BigDecimal.ZERO);
        booking.setContactEmail(request.getContactEmail() != null ? request.getContactEmail() : (currentUser != null ? currentUser.getEmail() : "passenger@example.com"));
        booking.setContactMobile(request.getContactMobile() != null ? request.getContactMobile() : (currentUser != null ? currentUser.getMobile() : "9876543210"));
        booking.setStatus("CONFIRMED");
        booking.setPaymentStatus("PAID");

        // Save Booking
        Booking savedBooking = bookingRepository.save(booking);

        // Save Passengers & Reserve Seats
        for (PassengerDto p : request.getPassengers()) {
            BookingPassenger bp = new BookingPassenger(savedBooking, p.getName(), p.getAge(), p.getGender(), p.getSeatNumber());
            savedBooking.getPassengers().add(bp);

            BookingSeat bs = new BookingSeat(schedule.getId(), p.getSeatNumber(), savedBooking.getId(), "RESERVED");
            bookingSeatRepository.save(bs);
        }

        // Decrement available seats count
        int remaining = Math.max(0, schedule.getAvailableSeats() - request.getPassengers().size());
        schedule.setAvailableSeats(remaining);
        scheduleRepository.save(schedule);

        // Record Payment
        Payment payment = new Payment();
        payment.setBooking(savedBooking);
        payment.setTransactionId(request.getPaymentTransactionId() != null ? request.getPaymentTransactionId() : "TXN_" + System.currentTimeMillis() + "_" + (1000 + random.nextInt(9000)));
        payment.setOrderId("ORDER_" + System.currentTimeMillis());
        payment.setPaymentMethod("ONLINE / UPI");
        payment.setAmount(request.getTotalAmount());
        payment.setStatus("SUCCESS");
        paymentRepository.save(payment);

        return savedBooking;
    }

    public List<Booking> getMyBookings() {
        User currentUser = authService.getCurrentUser();
        if (currentUser != null) {
            return bookingRepository.findByUserIdOrderByCreatedAtDesc(currentUser.getId());
        }
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));

        User currentUser = authService.getCurrentUser();
        if (currentUser != null && !"ADMIN".equalsIgnoreCase(currentUser.getRole())
                && booking.getUser() != null && !booking.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You do not have permission to access this booking record.");
        }
        return booking;
    }

    public Booking getBookingByReference(String reference) {
        return bookingRepository.findByBookingReferenceOrTicketNumber(reference, reference)
                .orElseThrow(() -> new ResourceNotFoundException("No confirmed booking found for reference: " + reference));
    }

    @Transactional
    public Booking cancelBooking(Long id, String reason) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));

        if ("CANCELLED".equalsIgnoreCase(booking.getStatus())) {
            throw new BadRequestException("Ticket is already cancelled.");
        }

        User currentUser = authService.getCurrentUser();
        if (currentUser != null && !"ADMIN".equalsIgnoreCase(currentUser.getRole())
                && booking.getUser() != null && !booking.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You do not have authorization to cancel this booking.");
        }

        booking.setStatus("CANCELLED");
        booking.setPaymentStatus("REFUNDED");
        Booking updated = bookingRepository.save(booking);

        // Release reserved seats so they become available again
        List<BookingSeat> seats = bookingSeatRepository.findByScheduleId(booking.getSchedule().getId());
        for (BookingSeat s : seats) {
            if (s.getBookingId().equals(booking.getId())) {
                bookingSeatRepository.delete(s);
            }
        }

        // Increment available seats
        Schedule schedule = booking.getSchedule();
        schedule.setAvailableSeats(schedule.getAvailableSeats() + booking.getPassengers().size());
        scheduleRepository.save(schedule);

        // Record cancellation & refund
        BigDecimal refundAmount = booking.getTotalAmount().multiply(new BigDecimal("0.80"));
        BigDecimal cancelFee = booking.getTotalAmount().subtract(refundAmount);

        Cancellation cancellation = new Cancellation();
        cancellation.setBooking(booking);
        cancellation.setReason(reason != null ? reason : "Passenger cancellation");
        cancellation.setRefundAmount(refundAmount);
        cancellation.setCancellationFee(cancelFee);
        cancellationRepository.save(cancellation);

        Refund refund = new Refund();
        refund.setCancellation(cancellation);
        refund.setRefundReference("REF-" + System.currentTimeMillis() + "-" + (1000 + random.nextInt(9000)));
        refund.setAmount(refundAmount);
        refund.setStatus("PROCESSED");
        refundRepository.save(refund);

        return updated;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
