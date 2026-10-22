import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import SeatLayout from './SeatLayout';

const BusCard = ({ schedule, onSelectSeats }) => {
  const [showSeats, setShowSeats] = useState(false);
  const [showBoardingPoints, setShowBoardingPoints] = useState(false);
  const { setSelectedSchedule } = useBooking();
  const navigate = useNavigate();

  const getServiceBadgeColor = (serviceType) => {
    switch (serviceType?.toUpperCase()) {
      case 'GARUDA PLUS':
        return 'bg-primary text-white';
      case 'RAJADHANI':
        return 'bg-info text-dark';
      case 'AC SLEEPER':
        return 'bg-purple text-white';
      case 'SUPER LUXURY':
        return 'bg-success text-white';
      case 'DELUXE':
        return 'bg-warning text-dark';
      case 'PALLEVELUGU':
        return 'bg-secondary text-white';
      default:
        return 'bg-dark text-white';
    }
  };

  const handleSeatToggle = () => {
    setSelectedSchedule(schedule);
    setShowSeats(!showSeats);
  };

  const handleBookNowDirect = () => {
    setSelectedSchedule(schedule);
    navigate(`/seat-selection/${schedule.id}`);
  };

  return (
    <div className="bus-item-card mb-3">
      {/* Top Banner with Service Type & Amenities */}
      <div className="d-flex flex-wrap justify-content-between align-items-center bg-light px-3 py-2 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <span className={`badge ${getServiceBadgeColor(schedule.serviceType)} px-2 py-1`}>
            {schedule.serviceType}
          </span>
          <span className="fw-bold text-dark fs-6">{schedule.busName}</span>
          <span className="badge bg-white text-muted border small">{schedule.busNumber}</span>
        </div>
        <div className="d-flex align-items-center gap-2 small text-muted">
          {schedule.rating && (
            <span className="badge bg-success-subtle text-success border border-success-subtle">
              <i className="bi bi-star-fill text-warning me-1"></i>
              {schedule.rating} / 5
            </span>
          )}
          <span>{schedule.serviceCategory || 'Express Class'}</span>
        </div>
      </div>

      {/* Main Bus Schedule Details */}
      <div className="p-3">
        <div className="row align-items-center g-3">
          {/* Departure */}
          <div className="col-md-3 col-6 text-start">
            <div className="bus-time-display text-primary">{schedule.departureTime}</div>
            <div className="fw-semibold text-dark">{schedule.sourceCity}</div>
            <div className="small text-muted text-truncate">
              {schedule.boardingPoints?.[0]?.name || 'Origin Bus Station'}
            </div>
          </div>

          {/* Duration Indicator */}
          <div className="col-md-2 col-12 order-md-2 order-3 text-center my-2 my-md-0">
            <div className="small text-muted fw-semibold">{schedule.duration}</div>
            <div className="duration-line"></div>
            <div className="small text-secondary" style={{ fontSize: '0.75rem' }}>
              Direct Express
            </div>
          </div>

          {/* Arrival */}
          <div className="col-md-3 col-6 order-md-3 order-2 text-md-start text-end">
            <div className="bus-time-display text-dark">{schedule.arrivalTime}</div>
            <div className="fw-semibold text-dark">{schedule.destinationCity}</div>
            <div className="small text-muted text-truncate">
              {schedule.droppingPoints?.[schedule.droppingPoints.length - 1]?.name || 'Destination Terminal'}
            </div>
          </div>

          {/* Fare and Action */}
          <div className="col-md-4 col-12 order-md-4 order-4 text-md-end text-center border-start-md">
            <div className="d-flex flex-md-column justify-content-between align-items-md-end align-items-center">
              <div>
                <span className="text-muted small">Starts from </span>
                <span className="fs-4 fw-bold text-danger">₹{schedule.fare}</span>
              </div>
              <div className="my-1">
                <span className={`badge ${schedule.availableSeats > 5 ? 'bg-success' : 'bg-danger'} px-2 py-1`}>
                  <i className="bi bi-check2-circle me-1"></i>
                  {schedule.availableSeats} Seats Available
                </span>
              </div>
              <div className="d-flex gap-2 mt-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setShowBoardingPoints(!showBoardingPoints)}
                >
                  <i className="bi bi-geo-alt me-1"></i> Stops
                </button>
                <button
                  className={`btn ${showSeats ? 'btn-secondary' : 'btn-tgsrtc-accent'} btn-sm px-3`}
                  onClick={handleSeatToggle}
                >
                  {showSeats ? 'Hide Seats' : 'Select Seats'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities Bar */}
        <div className="d-flex flex-wrap align-items-center justify-content-between pt-3 mt-3 border-top small text-muted">
          <div className="d-flex flex-wrap gap-3">
            {schedule.amenities?.map((amenity, idx) => (
              <span key={idx} className="d-flex align-items-center gap-1">
                <i className="bi bi-check text-success"></i>
                {amenity}
              </span>
            ))}
          </div>
          <button
            className="btn btn-link btn-sm p-0 text-decoration-none text-primary"
            onClick={handleBookNowDirect}
          >
            Full Seat View <i className="bi bi-arrow-right"></i>
          </button>
        </div>

        {/* Boarding Points Dropdown Section */}
        {showBoardingPoints && (
          <div className="mt-3 p-3 bg-light rounded-3 border">
            <div className="row g-3">
              <div className="col-md-6">
                <h6 className="fw-bold text-primary small mb-2">
                  <i className="bi bi-box-arrow-in-right me-1"></i> Boarding Points & Timings
                </h6>
                <ul className="list-group list-group-flush small">
                  {schedule.boardingPoints?.map((bp, i) => (
                    <li key={i} className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                      <span>{bp.name}</span>
                      <strong className="text-dark">{bp.time}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md-6">
                <h6 className="fw-bold text-success small mb-2">
                  <i className="bi bi-box-arrow-right me-1"></i> Dropping Points & Timings
                </h6>
                <ul className="list-group list-group-flush small">
                  {schedule.droppingPoints?.map((dp, i) => (
                    <li key={i} className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                      <span>{dp.name}</span>
                      <strong className="text-dark">{dp.time}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Inline Seat Layout Section */}
        {showSeats && (
          <div className="mt-4 pt-3 border-top">
            <SeatLayout schedule={schedule} onProceed={() => navigate('/passenger-details')} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BusCard;
