import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BusCard from '../components/booking/BusCard';
import scheduleService from '../services/scheduleService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BusSearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const fromCity = searchParams.get('from') || 'Hyderabad (MGBS)';
  const toCity = searchParams.get('to') || 'Vijayawada';
  const journeyDate = searchParams.get('date') || new Date().toISOString().split('T')[0];

  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedServiceTypes, setSelectedServiceTypes] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [maxFare, setMaxFare] = useState(1500);
  const [sortBy, setSortBy] = useState('departure'); // 'departure', 'fareAsc', 'fareDesc', 'duration'

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      const results = await scheduleService.searchSchedules({
        from: fromCity,
        to: toCity,
        date: journeyDate
      });
      setSchedules(results);
      setFilteredSchedules(results);
      setLoading(false);
    };

    fetchSchedules();
  }, [fromCity, toCity, journeyDate]);

  // Apply Filters and Sorting
  useEffect(() => {
    let result = [...schedules];

    // Filter by Service Type
    if (selectedServiceTypes.length > 0) {
      result = result.filter((s) => selectedServiceTypes.includes(s.serviceType));
    }

    // Filter by Max Fare
    result = result.filter((s) => (s.fare || 0) <= maxFare);

    // Filter by Amenities
    if (selectedAmenities.length > 0) {
      result = result.filter((s) =>
        selectedAmenities.every((amenity) => s.amenities?.includes(amenity))
      );
    }

    // Filter by Departure Time Slots
    if (selectedTimeSlots.length > 0) {
      result = result.filter((s) => {
        // Parse "06:00 AM" into 24-hour hour number
        const timeParts = s.departureTime.split(' ');
        let [hours] = timeParts[0].split(':').map(Number);
        const modifier = timeParts[1];
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;

        return selectedTimeSlots.some((slot) => {
          if (slot === 'earlyMorning' && hours < 6) return true;
          if (slot === 'morning' && hours >= 6 && hours < 12) return true;
          if (slot === 'afternoon' && hours >= 12 && hours < 18) return true;
          if (slot === 'night' && hours >= 18) return true;
          return false;
        });
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'fareAsc') return a.fare - b.fare;
      if (sortBy === 'fareDesc') return b.fare - a.fare;
      if (sortBy === 'departure') return a.departureTime.localeCompare(b.departureTime);
      return 0;
    });

    setFilteredSchedules(result);
  }, [selectedServiceTypes, selectedTimeSlots, selectedAmenities, maxFare, sortBy, schedules]);

  const toggleServiceType = (type) => {
    setSelectedServiceTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleTimeSlot = (slot) => {
    setSelectedTimeSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const clearAllFilters = () => {
    setSelectedServiceTypes([]);
    setSelectedTimeSlots([]);
    setSelectedAmenities([]);
    setMaxFare(1500);
    setSortBy('departure');
  };

  return (
    <div className="container py-4">
      {/* Top Search Parameter Bar */}
      <div className="bg-white p-3 rounded-3 shadow-sm border mb-4 d-flex flex-wrap justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <div className="p-2 rounded bg-primary-subtle text-primary">
            <i className="bi bi-bus-front fs-4"></i>
          </div>
          <div>
            <h5 className="fw-bold text-dark mb-0">
              {fromCity} &rarr; {toCity}
            </h5>
            <div className="small text-muted">
              <i className="bi bi-calendar3 me-1"></i> {journeyDate} &bull;{' '}
              <span className="text-success fw-semibold">{filteredSchedules.length} Buses Available</span>
            </div>
          </div>
        </div>

        <button
          className="btn btn-outline-primary btn-sm px-3 mt-2 mt-md-0"
          onClick={() => navigate('/search')}
        >
          <i className="bi bi-pencil-square me-1"></i> Modify Search
        </button>
      </div>

      <div className="row g-4">
        {/* Left Filter Sidebar */}
        <div className="col-lg-3">
          <div className="bg-white p-3 rounded-3 shadow-sm border sticky-top" style={{ top: '80px' }}>
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
              <h6 className="fw-bold text-dark mb-0">
                <i className="bi bi-funnel text-primary me-1"></i> Filters
              </h6>
              <button className="btn btn-link btn-sm text-danger p-0 text-decoration-none" onClick={clearAllFilters}>
                Reset
              </button>
            </div>

            {/* Service Type Filter */}
            <div className="mb-4">
              <label className="form-label small fw-bold text-secondary text-uppercase">Bus Class</label>
              {['GARUDA PLUS', 'RAJADHANI', 'AC SLEEPER', 'SUPER LUXURY', 'DELUXE', 'PALLEVELUGU'].map((type) => (
                <div key={type} className="form-check small mb-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`type-${type}`}
                    checked={selectedServiceTypes.includes(type)}
                    onChange={() => toggleServiceType(type)}
                  />
                  <label className="form-check-label text-dark" htmlFor={`type-${type}`}>
                    {type}
                  </label>
                </div>
              ))}
            </div>

            {/* Departure Time Slots */}
            <div className="mb-4">
              <label className="form-label small fw-bold text-secondary text-uppercase">Departure Time</label>
              <div className="form-check small mb-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="slot-early"
                  checked={selectedTimeSlots.includes('earlyMorning')}
                  onChange={() => toggleTimeSlot('earlyMorning')}
                />
                <label className="form-check-label text-dark" htmlFor="slot-early">
                  Before 06:00 AM
                </label>
              </div>
              <div className="form-check small mb-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="slot-morning"
                  checked={selectedTimeSlots.includes('morning')}
                  onChange={() => toggleTimeSlot('morning')}
                />
                <label className="form-check-label text-dark" htmlFor="slot-morning">
                  06:00 AM - 12:00 PM
                </label>
              </div>
              <div className="form-check small mb-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="slot-afternoon"
                  checked={selectedTimeSlots.includes('afternoon')}
                  onChange={() => toggleTimeSlot('afternoon')}
                />
                <label className="form-check-label text-dark" htmlFor="slot-afternoon">
                  12:00 PM - 06:00 PM
                </label>
              </div>
              <div className="form-check small mb-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="slot-night"
                  checked={selectedTimeSlots.includes('night')}
                  onChange={() => toggleTimeSlot('night')}
                />
                <label className="form-check-label text-dark" htmlFor="slot-night">
                  After 06:00 PM
                </label>
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label small fw-bold text-secondary text-uppercase mb-0">Max Fare</label>
                <span className="small fw-bold text-danger">₹{maxFare}</span>
              </div>
              <input
                type="range"
                className="form-range"
                min="200"
                max="1500"
                step="50"
                value={maxFare}
                onChange={(e) => setMaxFare(Number(e.target.value))}
              />
            </div>

            {/* Amenities Checkbox */}
            <div>
              <label className="form-label small fw-bold text-secondary text-uppercase">Amenities</label>
              {['AC', 'WiFi', 'Charging Point', 'Water Bottle', 'Blanket'].map((amenity) => (
                <div key={amenity} className="form-check small mb-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`amenity-${amenity}`}
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                  />
                  <label className="form-check-label text-dark" htmlFor={`amenity-${amenity}`}>
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Bus Results List */}
        <div className="col-lg-9">
          {/* Sorting Bar */}
          <div className="d-flex flex-wrap justify-content-between align-items-center bg-white p-2 px-3 rounded-3 border mb-3">
            <span className="small text-muted">
              Showing <strong>{filteredSchedules.length}</strong> matching bus services
            </span>
            <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
              <span className="small text-secondary fw-semibold">Sort By:</span>
              <div className="btn-group btn-group-sm">
                <button
                  className={`btn ${sortBy === 'departure' ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setSortBy('departure')}
                >
                  Departure Time
                </button>
                <button
                  className={`btn ${sortBy === 'fareAsc' ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setSortBy('fareAsc')}
                >
                  Fare: Low to High
                </button>
                <button
                  className={`btn ${sortBy === 'fareDesc' ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setSortBy('fareDesc')}
                >
                  Fare: High to Low
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner message="Searching real-time Telangana State RTC schedules..." />
          ) : filteredSchedules.length > 0 ? (
            <div>
              {filteredSchedules.map((schedule) => (
                <BusCard key={schedule.id} schedule={schedule} />
              ))}
            </div>
          ) : (
            <div className="text-center py-5 bg-white rounded-3 border p-4">
              <i className="bi bi-bus-front-fill display-4 text-muted mb-3 d-block"></i>
              <h5 className="fw-bold text-dark">No Buses Found For Selected Criteria</h5>
              <p className="text-secondary small mb-3">
                Try widening your fare range, unchecking active filters, or selecting alternative departure time slots.
              </p>
              <button className="btn btn-outline-primary btn-sm" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusSearchResults;
