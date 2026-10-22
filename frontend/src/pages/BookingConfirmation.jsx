import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import bookingService from '../services/bookingService';
import TicketCard from '../components/booking/TicketCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BookingConfirmation = () => {
  const { bookingRef } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      const data = await bookingService.getBookingByReference(bookingRef);
      setBooking(data);
      setLoading(false);
    };
    fetchBooking();
  }, [bookingRef]);

  if (loading) return <LoadingSpinner message="Fetching confirmed e-ticket..." />;

  return (
    <div className="container py-4">
      {/* Success Notification Bar (no-print) */}
      <div className="card border-0 shadow-sm rounded-4 p-4 text-center mb-4 bg-white no-print">
        <div className="d-inline-flex align-items-center justify-content-center bg-success-subtle text-success rounded-circle p-3 mx-auto mb-3" style={{ width: '70px', height: '70px' }}>
          <i className="bi bi-check-lg display-5 fw-bold"></i>
        </div>
        <h3 className="fw-bold text-dark mb-1">Reservation Confirmed Successfully!</h3>
        <p className="text-secondary small mb-3">
          Your payment has been verified. Confirmation SMS and electronic ticket sent to your registered contact.
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Link to="/my-bookings" className="btn btn-outline-primary btn-sm px-4">
            <i className="bi bi-journal-bookmark me-1"></i> My Bookings
          </Link>
          <Link to={`/track-bus/${booking?.scheduleId || '101'}`} className="btn btn-outline-success btn-sm px-4">
            <i className="bi bi-compass me-1"></i> Track This Bus
          </Link>
          <button className="btn btn-primary btn-sm px-4" onClick={() => window.print()}>
            <i className="bi bi-printer me-1"></i> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Render Official Ticket */}
      {booking ? (
        <TicketCard booking={booking} />
      ) : (
        <div className="alert alert-info text-center">
          Loading ticket credentials...
        </div>
      )}
    </div>
  );
};

export default BookingConfirmation;
