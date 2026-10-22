import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    const data = await adminService.getAllBookings();
    setBookings(data);
    setFiltered(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!searchTerm) {
      setFiltered(bookings);
    } else {
      const term = searchTerm.toLowerCase();
      setFiltered(
        bookings.filter(
          (b) =>
            (b.bookingReference && b.bookingReference.toLowerCase().includes(term)) ||
            (b.ticketNumber && b.ticketNumber.toLowerCase().includes(term)) ||
            (b.passengerName && b.passengerName.toLowerCase().includes(term)) ||
            (b.passengers && b.passengers[0]?.name.toLowerCase().includes(term))
        )
      );
    }
  }, [searchTerm, bookings]);

  if (loading) return <LoadingSpinner message="Querying master passenger reservation records..." />;

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-0">Manage Passenger Bookings</h4>
          <span className="text-secondary small">Comprehensive audit log of issued electronic tickets and cancellations</span>
        </div>
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <button className="btn btn-outline-success btn-sm" onClick={() => adminService.exportBookingsCsv(filtered)}>
            <i className="bi bi-file-earmark-spreadsheet me-1"></i> Export to CSV
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
        <div className="input-group">
          <span className="input-group-text bg-light">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by PNR, Booking Ref, or Passenger Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small">
              <tr>
                <th>Booking Ref</th>
                <th>PNR / Ticket No</th>
                <th>Passenger</th>
                <th>Route</th>
                <th>Journey Date</th>
                <th>Total Fare</th>
                <th>Reservation Status</th>
              </tr>
            </thead>
            <tbody className="small">
              {filtered.map((b, idx) => (
                <tr key={idx}>
                  <td>
                    <strong className="text-primary">{b.bookingReference || `TG-${b.id}`}</strong>
                  </td>
                  <td className="font-monospace text-dark">{b.ticketNumber || 'TGS4892019'}</td>
                  <td className="fw-semibold">
                    {b.passengerName || (b.passengers && b.passengers[0]?.name) || 'Passenger'}
                  </td>
                  <td>{b.route || `${b.sourceCity} to ${b.destinationCity}`}</td>
                  <td>{b.journeyDate}</td>
                  <td className="fw-bold text-danger">₹{b.totalAmount}</td>
                  <td>
                    <span
                      className={`badge ${
                        b.status === 'CONFIRMED' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
