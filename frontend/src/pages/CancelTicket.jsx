import React, { useState } from 'react';
import bookingService from '../services/bookingService';

const CancelTicket = () => {
  const [ticketNo, setTicketNo] = useState('');
  const [mobile, setMobile] = useState('');
  const [booking, setBooking] = useState(null);
  const [cancelReason, setCancelReason] = useState('Change of travel plan');
  const [cancellationResult, setCancellationResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setCancellationResult(null);

    const found = await bookingService.getBookingByReference(ticketNo.trim());
    if (found) {
      if (found.status === 'CANCELLED') {
        setError('This ticket has already been cancelled.');
        setBooking(null);
      } else {
        setBooking(found);
      }
    } else {
      setError('No active booking found for this PNR.');
      setBooking(null);
    }
  };

  const handleExecuteCancel = async () => {
    if (!booking) return;
    setLoading(true);
    const res = await bookingService.cancelBooking(booking.id, cancelReason);
    setLoading(false);
    setCancellationResult(res);
    setBooking(null);
  };

  return (
    <div className="container py-4">
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
        <h4 className="fw-bold text-dark mb-1">
          <i className="bi bi-x-circle-fill text-danger me-2"></i>
          Online Ticket Cancellation & Refund
        </h4>
        <p className="text-secondary small mb-4">
          Cancel reserved tickets as per Telangana State RTC online cancellation guidelines.
        </p>

        {/* Cancellation Guidelines Callout */}
        <div className="row g-3 mb-4">
          <div className="col-md-3 col-6">
            <div className="p-2 border rounded bg-light small text-center">
              <span className="text-muted d-block">&gt; 48 Hours</span>
              <strong className="text-success">90% Refund</strong>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="p-2 border rounded bg-light small text-center">
              <span className="text-muted d-block">24 to 48 Hours</span>
              <strong className="text-primary">80% Refund</strong>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="p-2 border rounded bg-light small text-center">
              <span className="text-muted d-block">12 to 24 Hours</span>
              <strong className="text-warning">70% Refund</strong>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="p-2 border rounded bg-light small text-center">
              <span className="text-muted d-block">&lt; 2 Hours</span>
              <strong className="text-danger">No Refund</strong>
            </div>
          </div>
        </div>

        {/* Lookup form */}
        <form onSubmit={handleSearch} className="row g-3">
          <div className="col-md-5">
            <label className="form-label small fw-semibold text-secondary">PNR / Ticket Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. TGS98234120"
              value={ticketNo}
              onChange={(e) => setTicketNo(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-semibold text-secondary">Registered Mobile Number *</label>
            <input
              type="tel"
              className="form-control"
              placeholder="10-digit mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button type="submit" className="btn btn-danger w-100 py-2">
              <i className="bi bi-search me-1"></i> Check Eligibility
            </button>
          </div>
        </form>

        {error && (
          <div className="alert alert-danger py-2 small mt-3 mb-0">
            <i className="bi bi-exclamation-triangle me-2"></i> {error}
          </div>
        )}
      </div>

      {/* Ticket Details & Cancellation Action */}
      {booking && (
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border-top border-4 border-danger">
          <h5 className="fw-bold text-dark mb-3">Ticket Cancellation Summary</h5>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <span className="text-muted small d-block">PNR / Route:</span>
              <strong>{booking.ticketNumber}</strong> &bull; {booking.sourceCity} &rarr; {booking.destinationCity}
            </div>
            <div className="col-md-3">
              <span className="text-muted small d-block">Journey Date:</span>
              <strong>{booking.journeyDate}</strong> ({booking.departureTime})
            </div>
            <div className="col-md-3">
              <span className="text-muted small d-block">Total Paid:</span>
              <strong className="text-danger">₹{booking.totalAmount}</strong>
            </div>
            <div className="col-md-2">
              <span className="text-muted small d-block">Estimated Refund:</span>
              <strong className="text-success">₹{Math.round(booking.totalAmount * 0.8)}</strong>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold text-secondary">Reason for Cancellation</label>
            <select
              className="form-select"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            >
              <option value="Change of travel plan">Change of travel plan</option>
              <option value="Booked alternate transport">Booked alternate transport</option>
              <option value="Medical / Personal emergency">Medical / Personal emergency</option>
              <option value="Date / Route mistake">Date / Route mistake</option>
            </select>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-light" onClick={() => setBooking(null)}>
              Abort
            </button>
            <button
              className="btn btn-danger px-4"
              disabled={loading}
              onClick={handleExecuteCancel}
            >
              {loading ? 'Processing Refund...' : 'Confirm Ticket Cancellation'}
            </button>
          </div>
        </div>
      )}

      {/* Cancellation Success */}
      {cancellationResult && (
        <div className="alert alert-success p-4 rounded-4 shadow-sm text-center">
          <i className="bi bi-check-circle-fill display-4 text-success d-block mb-2"></i>
          <h4 className="fw-bold">Ticket Successfully Cancelled</h4>
          <p className="mb-2">{cancellationResult.message}</p>
          <div className="badge bg-success fs-6 px-3 py-2">
            Refund Amount: ₹{cancellationResult.refundAmount}
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelTicket;
