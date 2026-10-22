import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const TicketCard = ({ booking }) => {
  const ticketRef = useRef(null);

  if (!booking) {
    return (
      <div className="alert alert-warning">
        No booking information available to render ticket.
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const verificationUrl = `${window.location.origin}/ticket/${booking.ticketNumber || booking.bookingReference}`;

  return (
    <div className="ticket-card-component">
      {/* Action buttons (hidden on print) */}
      <div className="d-flex justify-content-end gap-2 mb-3 no-print">
        <button className="btn btn-outline-primary btn-sm px-3" onClick={handlePrint}>
          <i className="bi bi-printer me-1"></i> Print Ticket
        </button>
      </div>

      {/* Main E-Ticket Container */}
      <div className="ticket-wrapper" ref={ticketRef}>
        {/* Ticket Header */}
        <div className="ticket-header">
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-danger p-2 fs-6">TGSRTC</span>
              <div>
                <h5 className="mb-0 fw-bold text-white">TELANGANA STATE ROAD TRANSPORT CORPORATION</h5>
                <span className="small opacity-75">Electronic Passenger Reservation Ticket (E-Ticket)</span>
              </div>
            </div>
            <div className="text-end mt-2 mt-md-0">
              <span className={`badge ${booking.status === 'CONFIRMED' ? 'bg-success' : 'bg-danger'} px-3 py-2 fs-6`}>
                {booking.status}
              </span>
            </div>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="p-4">
          {/* Key Reference Badges */}
          <div className="row g-3 bg-light p-3 rounded-3 mb-4 border">
            <div className="col-md-3 col-6">
              <span className="small text-muted d-block">PNR / Ticket No:</span>
              <strong className="fs-5 text-primary">{booking.ticketNumber || 'TGS88910243'}</strong>
            </div>
            <div className="col-md-3 col-6">
              <span className="small text-muted d-block">Booking Reference:</span>
              <strong className="fs-6 text-dark">{booking.bookingReference || 'TG-20261009-1234'}</strong>
            </div>
            <div className="col-md-3 col-6">
              <span className="small text-muted d-block">Journey Date:</span>
              <strong className="fs-6 text-dark">{booking.journeyDate}</strong>
            </div>
            <div className="col-md-3 col-6">
              <span className="small text-muted d-block">Bus Service:</span>
              <strong className="fs-6 text-dark">{booking.serviceType || 'GARUDA PLUS'}</strong>
            </div>
          </div>

          {/* Journey Overview and QR Code */}
          <div className="row g-4 align-items-center mb-4">
            <div className="col-lg-9 col-md-8">
              <div className="row g-3">
                <div className="col-sm-5">
                  <div className="small text-muted">From (Origin Station)</div>
                  <h5 className="fw-bold text-primary mb-1">{booking.sourceCity}</h5>
                  <div className="small text-secondary">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                    Boarding: <strong>{booking.boardingPoint || 'Main Bus Depot'}</strong>
                  </div>
                  <div className="badge bg-primary-subtle text-primary mt-1">
                    Departure: {booking.departureTime || '06:00 AM'}
                  </div>
                </div>

                <div className="col-sm-2 text-center d-flex flex-column align-items-center justify-content-center">
                  <i className="bi bi-arrow-right fs-3 text-muted d-none d-sm-block"></i>
                  <i className="bi bi-arrow-down fs-3 text-muted d-sm-none"></i>
                  <span className="badge bg-secondary small">{booking.busNumber || 'TS-09-Z-7821'}</span>
                </div>

                <div className="col-sm-5">
                  <div className="small text-muted">To (Destination Station)</div>
                  <h5 className="fw-bold text-dark mb-1">{booking.destinationCity}</h5>
                  <div className="small text-secondary">
                    <i className="bi bi-pin-map-fill text-success me-1"></i>
                    Dropping: <strong>{booking.droppingPoint || 'Central Terminal'}</strong>
                  </div>
                  <div className="badge bg-dark-subtle text-dark mt-1">
                    Arrival: {booking.arrivalTime || '10:30 AM'}
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Verification */}
            <div className="col-lg-3 col-md-4 text-center border-start-md">
              <div className="p-2 bg-white d-inline-block rounded border">
                <QRCodeSVG value={verificationUrl} size={110} level="M" />
              </div>
              <div className="small text-muted mt-1" style={{ fontSize: '0.72rem' }}>
                Scan to Verify Ticket
              </div>
            </div>
          </div>

          {/* Perforated Divider */}
          <div className="ticket-perforated"></div>

          {/* Passenger Information Table */}
          <div className="mb-4">
            <h6 className="fw-bold text-dark mb-3">
              <i className="bi bi-people-fill text-primary me-2"></i>
              Passenger Details
            </h6>
            <div className="table-responsive">
              <table className="table table-bordered table-sm align-middle">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '60px' }}>S.No</th>
                    <th>Passenger Name</th>
                    <th style={{ width: '80px' }}>Age</th>
                    <th style={{ width: '100px' }}>Gender</th>
                    <th style={{ width: '100px' }}>Seat No</th>
                    <th style={{ width: '120px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.passengers?.map((p, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td className="fw-semibold">{p.name}</td>
                      <td>{p.age}</td>
                      <td>{p.gender}</td>
                      <td>
                        <span className="badge bg-primary px-2 py-1">
                          {p.seatNumber}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-success-subtle text-success">
                          Confirmed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fare Summary & Instructions */}
          <div className="row g-3 pt-2">
            <div className="col-md-7">
              <div className="p-3 bg-light rounded-3 small">
                <strong className="text-dark d-block mb-1">
                  <i className="bi bi-info-circle-fill text-primary me-1"></i>
                  Important Passenger Instructions:
                </strong>
                <ul className="mb-0 ps-3 text-secondary" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
                  <li>Please report at the boarding point at least 15 minutes prior to scheduled departure.</li>
                  <li>Passenger must carry valid government photo ID card (Aadhaar, Voter ID, Driving License).</li>
                  <li>E-Ticket SMS or soft copy on smartphone is accepted in lieu of printed copy.</li>
                  <li>For bus tracking or assistance, call 24x7 RTC helpline: 040-69440000.</li>
                </ul>
              </div>
            </div>

            <div className="col-md-5">
              <div className="p-3 bg-light rounded-3">
                <div className="d-flex justify-content-between small text-secondary mb-1">
                  <span>Fare Paid:</span>
                  <strong>₹{booking.fare || booking.totalAmount}</strong>
                </div>
                <div className="d-flex justify-content-between small text-secondary mb-1">
                  <span>Payment Mode:</span>
                  <strong>Online / Razorpay Verified</strong>
                </div>
                <div className="d-flex justify-content-between fs-6 fw-bold text-dark pt-2 border-top">
                  <span>Total Amount:</span>
                  <span className="text-danger">₹{booking.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Footer Bar */}
        <div className="bg-dark text-white px-4 py-2 text-center small opacity-75">
          Telangana State Road Transport Corporation &bull; Safe, Punctual & Courteous Service
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
