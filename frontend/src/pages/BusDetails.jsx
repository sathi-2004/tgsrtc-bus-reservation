import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import scheduleService from '../services/scheduleService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BusDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      const data = await scheduleService.getScheduleById(id);
      setSchedule(data);
      setLoading(false);
    };
    fetchSchedule();
  }, [id]);

  if (loading) return <LoadingSpinner message="Fetching bus specifications..." />;
  if (!schedule) {
    return (
      <div className="container py-5 text-center">
        <h4>Bus service not found</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/search')}>
          Search Available Buses
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
        <div className="bg-primary text-white p-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="badge bg-danger mb-2">{schedule.serviceType}</span>
              <h3 className="fw-bold mb-1">{schedule.busName}</h3>
              <span className="opacity-75">{schedule.busNumber} &bull; Telangana State RTC</span>
            </div>
            <div className="text-end">
              <div className="fs-3 fw-bold text-warning">₹{schedule.fare}</div>
              <span className="small opacity-75">per seat</span>
            </div>
          </div>
        </div>

        <div className="card-body p-4">
          <div className="row g-4">
            <div className="col-md-6">
              <h5 className="fw-bold text-dark mb-3">Journey Overview</h5>
              <div className="p-3 bg-light rounded-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Origin Station:</span>
                  <strong>{schedule.sourceCity}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Destination Station:</span>
                  <strong>{schedule.destinationCity}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Departure Time:</span>
                  <strong className="text-primary">{schedule.departureTime}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Arrival Time:</span>
                  <strong className="text-success">{schedule.arrivalTime}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Estimated Duration:</span>
                  <strong>{schedule.duration}</strong>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <h5 className="fw-bold text-dark mb-3">On-Board Amenities</h5>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {schedule.amenities?.map((amenity, idx) => (
                  <span key={idx} className="badge bg-secondary-subtle text-dark p-2 fs-6">
                    <i className="bi bi-check2-circle text-success me-1"></i> {amenity}
                  </span>
                ))}
              </div>

              <button
                className="btn btn-tgsrtc-accent w-100 py-3 fw-bold"
                onClick={() => navigate(`/seat-selection/${schedule.id}`)}
              >
                SELECT SEATS & BOOK NOW <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetails;
