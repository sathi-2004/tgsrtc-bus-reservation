import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';

const PassengerForm = ({ onProceed }) => {
  const { selectedSeats, passengerDetails, setPassengerDetails } = useBooking();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Primary contact
  const [contactMobile, setContactMobile] = useState(currentUser?.mobile || '9876543210');
  const [contactEmail, setContactEmail] = useState(currentUser?.email || 'passenger@example.com');

  // Passenger list mapped to selected seats
  const [passengers, setPassengers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Initialize passenger rows for each seat
    const initialList = selectedSeats.map((seatNo, index) => {
      const existing = passengerDetails[index];
      return {
        seatNumber: seatNo,
        name: existing?.name || (index === 0 ? currentUser?.name || '' : ''),
        age: existing?.age || '',
        gender: existing?.gender || 'MALE'
      };
    });
    setPassengers(initialList);
  }, [selectedSeats, currentUser]);

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!contactMobile || !/^\d{10}$/.test(contactMobile.replace(/\D/g, ''))) {
      newErrors.contactMobile = 'Enter a valid 10-digit mobile number';
    }

    if (!contactEmail || !/\S+@\S+\.\S+/.test(contactEmail)) {
      newErrors.contactEmail = 'Enter a valid email address for e-ticket delivery';
    }

    passengers.forEach((p, idx) => {
      if (!p.name || p.name.trim().length < 2) {
        newErrors[`passenger_${idx}_name`] = `Passenger ${idx + 1}: Name is required`;
      }
      if (!p.age || isNaN(p.age) || p.age < 1 || p.age > 120) {
        newErrors[`passenger_${idx}_age`] = `Passenger ${idx + 1}: Valid age is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Attach contact info to passenger state
    const completePassengerData = {
      contactMobile,
      contactEmail,
      passengers
    };

    setPassengerDetails(passengers);

    if (onProceed) {
      onProceed(completePassengerData);
    } else {
      navigate('/payment');
    }
  };

  return (
    <div className="passenger-form-container">
      <form onSubmit={handleSubmit}>
        {/* Contact Information Card */}
        <div className="card border-0 shadow-sm rounded-3 mb-4">
          <div className="card-header bg-white py-3 border-bottom">
            <h5 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
              <i className="bi bi-person-lines-fill text-primary"></i>
              Contact Details (For E-Ticket & SMS Alerts)
            </h5>
          </div>
          <div className="card-body p-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-semibold text-secondary">
                  Mobile Number (10 Digits) *
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted">+91</span>
                  <input
                    type="tel"
                    className={`form-control ${errors.contactMobile ? 'is-invalid' : ''}`}
                    placeholder="9876543210"
                    maxLength="10"
                    value={contactMobile}
                    onChange={(e) => setContactMobile(e.target.value)}
                    required
                  />
                  {errors.contactMobile && (
                    <div className="invalid-feedback">{errors.contactMobile}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold text-secondary">
                  Email Address *
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className={`form-control ${errors.contactEmail ? 'is-invalid' : ''}`}
                    placeholder="yourname@domain.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                  />
                  {errors.contactEmail && (
                    <div className="invalid-feedback">{errors.contactEmail}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Passenger Information by Seat */}
        <div className="card border-0 shadow-sm rounded-3 mb-4">
          <div className="card-header bg-white py-3 border-bottom">
            <h5 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
              <i className="bi bi-people-fill text-primary"></i>
              Passenger Information
            </h5>
          </div>
          <div className="card-body p-4">
            {passengers.map((passenger, index) => (
              <div
                key={`p-${passenger.seatNumber}`}
                className={`p-3 rounded-3 mb-3 border ${
                  index % 2 === 0 ? 'bg-light bg-opacity-50' : 'bg-white'
                }`}
              >
                <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                  <span className="badge bg-primary px-3 py-2 fs-6">
                    Passenger {index + 1} &bull; Seat {passenger.seatNumber}
                  </span>
                  <span className="text-muted small">Standard Berth / Seat</span>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">
                      Full Name (as per Govt ID) *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors[`passenger_${index}_name`] ? 'is-invalid' : ''
                      }`}
                      placeholder="Enter Full Name"
                      value={passenger.name}
                      onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                      required
                    />
                    {errors[`passenger_${index}_name`] && (
                      <div className="invalid-feedback">
                        {errors[`passenger_${index}_name`]}
                      </div>
                    )}
                  </div>

                  <div className="col-md-3 col-6">
                    <label className="form-label small fw-semibold text-secondary">
                      Age (Years) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      className={`form-control ${
                        errors[`passenger_${index}_age`] ? 'is-invalid' : ''
                      }`}
                      placeholder="Age"
                      value={passenger.age}
                      onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                      required
                    />
                    {errors[`passenger_${index}_age`] && (
                      <div className="invalid-feedback">
                        {errors[`passenger_${index}_age`]}
                      </div>
                    )}
                  </div>

                  <div className="col-md-3 col-6">
                    <label className="form-label small fw-semibold text-secondary">
                      Gender *
                    </label>
                    <select
                      className="form-select"
                      value={passenger.gender}
                      onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn btn-outline-secondary px-4 py-2"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left me-1"></i> Back to Seats
          </button>
          <button type="submit" className="btn btn-tgsrtc-accent px-5 py-2 fw-bold shadow">
            <span>PROCEED TO PAYMENT</span>
            <i className="bi bi-shield-check ms-2"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PassengerForm;
