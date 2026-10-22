import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import routeService, { DEFAULT_CITIES } from '../../services/routeService';

const BusSearchForm = ({ compact = false, onSearchComplete }) => {
  const { searchParams, setSearchParams } = useBooking();
  const navigate = useNavigate();

  const [cities, setCities] = useState(DEFAULT_CITIES);
  const [fromCity, setFromCity] = useState(searchParams.from || 'Hyderabad (MGBS)');
  const [toCity, setToCity] = useState(searchParams.to || 'Vijayawada');
  const [journeyDate, setJourneyDate] = useState(
    searchParams.date || new Date().toISOString().split('T')[0]
  );
  const [returnDate, setReturnDate] = useState(searchParams.returnDate || '');
  const [passengers, setPassengers] = useState(searchParams.passengers || 1);
  const [errorMessage, setErrorMessage] = useState('');

  // Get today and tomorrow dates formatted as YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    const fetchCities = async () => {
      const data = await routeService.getCities();
      if (data && data.length > 0) {
        setCities(data);
      }
    };
    fetchCities();
  }, []);

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleQuickDate = (dateVal) => {
    setJourneyDate(dateVal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fromCity || !toCity) {
      setErrorMessage('Please select both Origin and Destination cities.');
      return;
    }

    if (fromCity.toLowerCase() === toCity.toLowerCase()) {
      setErrorMessage('Origin and Destination cannot be the same city.');
      return;
    }

    if (!journeyDate) {
      setErrorMessage('Please choose a valid journey date.');
      return;
    }

    const updatedParams = {
      from: fromCity,
      to: toCity,
      date: journeyDate,
      returnDate,
      passengers: parseInt(passengers)
    };

    setSearchParams(updatedParams);

    if (onSearchComplete) {
      onSearchComplete(updatedParams);
    } else {
      navigate(
        `/bus-results?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${journeyDate}&passengers=${passengers}`
      );
    }
  };

  return (
    <div className={`bus-search-form-container ${compact ? 'compact-mode' : ''}`}>
      {errorMessage && (
        <div className="alert alert-danger py-2 px-3 small d-flex align-items-center mb-3">
          <i className="bi bi-exclamation-circle-fill me-2"></i>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-3 align-items-end">
          {/* From City */}
          <div className="col-lg-3 col-md-6">
            <label className="form-label fw-semibold small text-secondary mb-1">
              <i className="bi bi-geo-alt-fill text-danger me-1"></i> Leaving From (Source)
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-bus-front text-primary"></i>
              </span>
              <input
                list="fromCityList"
                className="form-control border-start-0 ps-0"
                placeholder="Enter Origin City"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                required
              />
              <datalist id="fromCityList">
                {cities.map((city, idx) => (
                  <option key={`from-${idx}`} value={city} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Swap Button for Desktop */}
          <div className="col-auto d-none d-lg-flex align-items-center justify-content-center p-0 mb-1">
            <button
              type="button"
              className="city-swap-btn"
              onClick={handleSwapCities}
              title="Swap Origin and Destination"
              aria-label="Swap Origin and Destination"
            >
              <i className="bi bi-arrow-left-right"></i>
            </button>
          </div>

          {/* To City */}
          <div className="col-lg-3 col-md-6">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label fw-semibold small text-secondary mb-0">
                <i className="bi bi-pin-map-fill text-success me-1"></i> Going To (Destination)
              </label>
              <button
                type="button"
                className="btn btn-link btn-sm p-0 text-decoration-none d-lg-none"
                onClick={handleSwapCities}
              >
                <i className="bi bi-arrow-left-right me-1"></i> Swap
              </button>
            </div>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-geo text-danger"></i>
              </span>
              <input
                list="toCityList"
                className="form-control border-start-0 ps-0"
                placeholder="Enter Destination City"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                required
              />
              <datalist id="toCityList">
                {cities.map((city, idx) => (
                  <option key={`to-${idx}`} value={city} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Journey Date */}
          <div className="col-lg-3 col-md-6">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label fw-semibold small text-secondary mb-0">
                <i className="bi bi-calendar-event text-primary me-1"></i> Journey Date
              </label>
              <div className="d-flex gap-1">
                <button
                  type="button"
                  className={`quick-date-btn ${journeyDate === todayStr ? 'active' : ''}`}
                  onClick={() => handleQuickDate(todayStr)}
                >
                  Today
                </button>
                <button
                  type="button"
                  className={`quick-date-btn ${journeyDate === tomorrowStr ? 'active' : ''}`}
                  onClick={() => handleQuickDate(tomorrowStr)}
                >
                  Tomorrow
                </button>
              </div>
            </div>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-calendar2-check text-muted"></i>
              </span>
              <input
                type="date"
                className="form-control border-start-0 ps-0"
                min={todayStr}
                value={journeyDate}
                onChange={(e) => setJourneyDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="col-lg-2 col-md-6">
            <button type="submit" className="btn btn-tgsrtc-accent w-100 py-2 d-flex align-items-center justify-content-center gap-2">
              <i className="bi bi-search"></i>
              <span>SEARCH BUSES</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BusSearchForm;
