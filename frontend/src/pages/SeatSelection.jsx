import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import scheduleService from '../services/scheduleService';
import SeatLayout from '../components/booking/SeatLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SeatSelection = () => {
  const { scheduleId } = useParams();
  const { selectedSchedule, setSelectedSchedule } = useBooking();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(selectedSchedule);
  const [loading, setLoading] = useState(!selectedSchedule);

  useEffect(() => {
    const fetchScheduleIfNeeded = async () => {
      if (!schedule && scheduleId) {
        setLoading(true);
        const data = await scheduleService.getScheduleById(scheduleId);
        setSchedule(data);
        setSelectedSchedule(data);
        setLoading(false);
      }
    };
    fetchScheduleIfNeeded();
  }, [scheduleId, schedule, setSelectedSchedule]);

  if (loading) return <LoadingSpinner message="Configuring real-time bus seating matrix..." />;

  return (
    <div className="container py-4">
      {/* Schedule Banner */}
      <div className="bg-white p-3 rounded-3 shadow-sm border mb-4 d-flex flex-wrap justify-content-between align-items-center">
        <div>
          <span className="badge bg-danger me-2">{schedule?.serviceType || 'GARUDA PLUS'}</span>
          <strong className="fs-5 text-dark">{schedule?.busName}</strong>
          <span className="text-muted ms-2 small">({schedule?.busNumber})</span>
          <div className="text-secondary small mt-1">
            <strong>{schedule?.sourceCity}</strong> ({schedule?.departureTime}) &rarr;{' '}
            <strong>{schedule?.destinationCity}</strong> ({schedule?.arrivalTime}) &bull;{' '}
            <span>Duration: {schedule?.duration}</span>
          </div>
        </div>

        <button className="btn btn-outline-secondary btn-sm mt-2 mt-md-0" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left me-1"></i> Back to Results
        </button>
      </div>

      <SeatLayout schedule={schedule} onProceed={() => navigate('/passenger-details')} />
    </div>
  );
};

export default SeatSelection;
