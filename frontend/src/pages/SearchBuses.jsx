import React from 'react';
import BusSearchForm from '../components/booking/BusSearchForm';

const SearchBuses = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <span className="badge bg-primary px-3 py-2 text-uppercase mb-2">
          <i className="bi bi-search me-1"></i> Trip Planner
        </span>
        <h2 className="fw-bold text-dark">Find & Reserve Bus Schedules</h2>
        <p className="text-secondary small">
          Search daily and overnight express buses connecting 33 districts of Telangana and neighboring states.
        </p>
      </div>

      <div className="card border-0 shadow rounded-4 p-4 mb-5">
        <BusSearchForm />
      </div>

      {/* Helpful Booking Guidelines */}
      <div className="row g-4 mt-2">
        <div className="col-md-4">
          <div className="p-3 bg-white rounded-3 border h-100">
            <h6 className="fw-bold text-primary mb-2">
              <i className="bi bi-person-badge me-2"></i> Concession Bookings
            </h6>
            <p className="small text-secondary mb-0">
              Senior citizens (above 60 years) are entitled to special discount quotas. Keep proof of age ready during bus boarding.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3 bg-white rounded-3 border h-100">
            <h6 className="fw-bold text-success mb-2">
              <i className="bi bi-clock-history me-2"></i> Advance Booking Window
            </h6>
            <p className="small text-secondary mb-0">
              Passengers can reserve tickets up to 30 days in advance for long-distance luxury services and inter-state corridors.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3 bg-white rounded-3 border h-100">
            <h6 className="fw-bold text-danger mb-2">
              <i className="bi bi-shield-check me-2"></i> Direct Refund Policy
            </h6>
            <p className="small text-secondary mb-0">
              Cancellations requested 24+ hours before departure qualify for up to 90% fare refund minus reservation cess.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBuses;
