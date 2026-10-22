import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import PassengerForm from '../components/booking/PassengerForm';
import FareSummary from '../components/booking/FareSummary';

const PassengerDetails = () => {
  const { selectedSchedule, selectedSeats } = useBooking();
  const navigate = useNavigate();

  if (!selectedSchedule || selectedSeats.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning d-inline-block p-4">
          <h5>No active seat selection found</h5>
          <p className="mb-3 text-secondary">
            Please search for a bus and select seats before proceeding to passenger registration.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/search')}>
            Find Buses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Step Indicator */}
      <div className="d-flex justify-content-center align-items-center gap-3 mb-4 small fw-semibold">
        <span className="text-muted"><i className="bi bi-check-circle-fill text-success me-1"></i> 1. Select Bus</span>
        <span className="text-muted">&rarr;</span>
        <span className="text-muted"><i className="bi bi-check-circle-fill text-success me-1"></i> 2. Select Seats</span>
        <span className="text-muted">&rarr;</span>
        <span className="text-primary fw-bold"><i className="bi bi-circle-fill text-primary me-1"></i> 3. Passenger Details</span>
        <span className="text-muted">&rarr;</span>
        <span className="text-muted">4. Payment & E-Ticket</span>
      </div>

      <div className="row g-4">
        {/* Main Passenger Form */}
        <div className="col-lg-8">
          <PassengerForm onProceed={() => navigate('/payment')} />
        </div>

        {/* Fare Summary Sidebar */}
        <div className="col-lg-4">
          <div className="sticky-top" style={{ top: '80px' }}>
            <FareSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetails;
