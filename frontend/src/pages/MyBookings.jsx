import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bookingService from '../services/bookingService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ConfirmationModal from '../components/common/ConfirmationModal';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState('ALL'); // 'ALL', 'CONFIRMED', 'CANCELLED'
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      const data = await bookingService.getMyBookings();
      setBookings(data);
      setLoading(false);
    };
    loadBookings();
  }, []);

  const handleOpenCancel = (booking) => {
    setBookingToCancel(booking);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = async () => {
    if (!bookingToCancel) return;
    await bookingService.cancelBooking(bookingToCancel.id, 'Passenger voluntary cancellation');
    setShowCancelModal(false);
    // Reload bookings
    const refreshed = await bookingService.getMyBookings();
    setBookings(refreshed);
  };

  const filtered = bookings.filter((b) => {
    if (filterTab === 'ALL') return true;
    return b.status === filterTab;
  });

  if (loading) return <LoadingSpinner message="Fetching your reservation history..." />;

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1">
            <i className="bi bi-journal-bookmark-fill text-primary me-2"></i>
            My Journeys & Bookings
          </h3>
          <p className="text-secondary small mb-0">
            View tickets, initiate cancellations, or track upcoming journeys.
          </p>
        </div>
        <Link to="/search" className="btn btn-tgsrtc-accent btn-sm px-3 mt-2 mt-sm-0">
          <i className="bi bi-plus-lg me-1"></i> Book New Ticket
        </Link>
      </div>

      {/* Tabs */}
      <div className="d-flex gap-2 border-bottom pb-2 mb-4">
        <button
          className={`btn btn-sm ${filterTab === 'ALL' ? 'btn-primary' : 'btn-light'}`}
          onClick={() => setFilterTab('ALL')}
        >
          All Bookings ({bookings.length})
        </button>
        <button
          className={`btn btn-sm ${filterTab === 'CONFIRMED' ? 'btn-primary' : 'btn-light'}`}
          onClick={() => setFilterTab('CONFIRMED')}
        >
          Confirmed ({bookings.filter((b) => b.status === 'CONFIRMED').length})
        </button>
        <button
          className={`btn btn-sm ${filterTab === 'CANCELLED' ? 'btn-primary' : 'btn-light'}`}
          onClick={() => setFilterTab('CANCELLED')}
        >
          Cancelled ({bookings.filter((b) => b.status === 'CANCELLED').length})
        </button>
      </div>

      {/* Booking Cards List */}
      {filtered.length > 0 ? (
        <div className="row g-3">
          {filtered.map((b) => (
            <div key={b.id} className="col-12">
              <div className="card border-0 shadow-sm rounded-3 p-3">
                <div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-2 mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-primary px-2 py-1">{b.serviceType || 'EXPRESS'}</span>
                    <strong className="text-dark">{b.busName}</strong>
                    <span className="badge bg-light text-muted border">{b.busNumber}</span>
                  </div>
                  <div>
                    <span className={`badge ${b.status === 'CONFIRMED' ? 'bg-success' : 'bg-danger'} px-3 py-2`}>
                      {b.status}
                    </span>
                  </div>
                </div>

                <div className="row align-items-center g-3">
                  <div className="col-md-3 col-6">
                    <span className="small text-muted d-block">PNR / Ticket Number</span>
                    <strong className="text-primary fs-6">{b.ticketNumber}</strong>
                    <div className="small text-secondary" style={{ fontSize: '0.72rem' }}>
                      Ref: {b.bookingReference}
                    </div>
                  </div>

                  <div className="col-md-4 col-6">
                    <span className="small text-muted d-block">Route & Date</span>
                    <strong className="text-dark">
                      {b.sourceCity} &rarr; {b.destinationCity}
                    </strong>
                    <div className="small text-muted">
                      <i className="bi bi-calendar-event me-1"></i> {b.journeyDate} &bull; {b.departureTime}
                    </div>
                  </div>

                  <div className="col-md-2 col-6">
                    <span className="small text-muted d-block">Passengers / Amount</span>
                    <span className="text-dark fw-semibold">
                      {b.passengers?.length || 1} Seat ({b.passengers?.map((p) => p.seatNumber).join(', ')})
                    </span>
                    <div className="text-danger fw-bold">₹{b.totalAmount}</div>
                  </div>

                  <div className="col-md-3 col-6 text-md-end text-start">
                    <div className="d-flex flex-wrap justify-content-md-end gap-2">
                      <Link to={`/booking-confirmation/${b.bookingReference}`} className="btn btn-outline-primary btn-sm">
                        <i className="bi bi-ticket-detailed me-1"></i> View Ticket
                      </Link>
                      {b.status === 'CONFIRMED' && (
                        <>
                          <Link to={`/track-bus/${b.scheduleId || '101'}`} className="btn btn-outline-success btn-sm">
                            <i className="bi bi-geo-alt"></i> Track
                          </Link>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleOpenCancel(b)}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-white rounded-3 border">
          <i className="bi bi-ticket-perforated display-4 text-muted mb-3 d-block"></i>
          <h5>No Reservations Found</h5>
          <p className="text-secondary small mb-3">You have not reserved any tickets in this category yet.</p>
          <Link to="/search" className="btn btn-primary btn-sm">
            Search Buses & Book
          </Link>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showCancelModal}
        title="Cancel Ticket Reservation"
        message={`Are you sure you want to cancel ticket ${bookingToCancel?.ticketNumber}? An automated refund of approx 80% will be initiated to your payment method.`}
        confirmText="Confirm Cancellation"
        confirmVariant="danger"
        onConfirm={handleConfirmCancel}
        onCancel={() => setShowCancelModal(false)}
      />
    </div>
  );
};

export default MyBookings;
