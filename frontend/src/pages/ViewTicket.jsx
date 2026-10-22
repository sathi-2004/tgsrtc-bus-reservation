import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bookingService from '../services/bookingService';
import TicketCard from '../components/booking/TicketCard';

const ViewTicket = () => {
  const { ticketNo } = useParams();
  const [searchReference, setSearchReference] = useState(ticketNo || '');
  const [mobileNumber, setMobileNumber] = useState('');
  const [booking, setBooking] = useState(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (ticketNo) {
      handleLookup(ticketNo);
    }
  }, [ticketNo]);

  const handleLookup = async (refToUse) => {
    setError('');
    const target = refToUse || searchReference;
    if (!target) {
      setError('Please enter a PNR or Booking Reference number');
      return;
    }

    const data = await bookingService.getBookingByReference(target.trim());
    setSearched(true);
    if (data) {
      setBooking(data);
    } else {
      setBooking(null);
      setError('No confirmed ticket found matching this reference. Please check your credentials.');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLookup();
  };

  return (
    <div className="container py-4">
      {/* Search Bar (no-print) */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white no-print">
        <h4 className="fw-bold text-dark mb-1">
          <i className="bi bi-printer-fill text-primary me-2"></i>
          Print E-Ticket / Check PNR Status
        </h4>
        <p className="text-secondary small mb-4">
          Retrieve your official Telangana State RTC electronic reservation ticket using your PNR or Booking Reference.
        </p>

        <form onSubmit={handleFormSubmit} className="row g-3">
          <div className="col-md-5">
            <label className="form-label small fw-semibold text-secondary">PNR / Booking Reference *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. TGS98234120 or TG-20261009-4821"
              value={searchReference}
              onChange={(e) => setSearchReference(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-semibold text-secondary">Registered Mobile (Optional)</label>
            <input
              type="tel"
              className="form-control"
              placeholder="10-digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button type="submit" className="btn btn-tgsrtc-primary w-100 py-2">
              <i className="bi bi-search me-1"></i> Retrieve Ticket
            </button>
          </div>
        </form>

        {error && (
          <div className="alert alert-danger py-2 small mt-3 mb-0">
            <i className="bi bi-exclamation-triangle me-2"></i> {error}
          </div>
        )}
      </div>

      {/* Ticket Rendering */}
      {searched && booking && (
        <div>
          <TicketCard booking={booking} />
        </div>
      )}
    </div>
  );
};

export default ViewTicket;
