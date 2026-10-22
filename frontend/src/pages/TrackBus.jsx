import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import trackingService from '../services/trackingService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const TrackBus = () => {
  const { scheduleId } = useParams();
  const [targetId, setTargetId] = useState(scheduleId || '101');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracking = async () => {
      setLoading(true);
      const data = await trackingService.getTrackingData(targetId);
      setTrackingData(data);
      setLoading(false);
    };
    fetchTracking();
  }, [targetId]);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    trackingService.getTrackingData(targetId).then((res) => {
      setTrackingData(res);
      setLoading(false);
    });
  };

  return (
    <div className="container py-4">
      {/* Notice Banner */}
      <div className="alert alert-info py-2 px-3 small d-flex align-items-center justify-content-between mb-4">
        <div>
          <i className="bi bi-info-circle-fill me-2"></i>
          <strong>Simulated Live GPS Mode:</strong> Displaying simulated telemetry for educational demonstration.
        </div>
        <span className="badge bg-primary">DEMO TRACKER</span>
      </div>

      {/* Tracker Search Header */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
        <h4 className="fw-bold text-dark mb-1">
          <i className="bi bi-compass-fill text-primary me-2"></i>
          Live Bus GPS Tracker
        </h4>
        <p className="text-secondary small mb-3">
          Track scheduled bus arrival, current location, speed, and upcoming bus depot halts.
        </p>

        <form onSubmit={handleTrackSubmit} className="row g-3">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Bus Registration Number or Service ID (e.g. 101, TS-09-Z-7821)"
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-tgsrtc-primary w-100">
              <i className="bi bi-geo-alt me-1"></i> Track Bus Location
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <LoadingSpinner message="Connecting to simulated bus telemetry..." />
      ) : trackingData ? (
        <div className="row g-4">
          {/* Left Column: Live Status & Driver Telemetry */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
              <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                <div>
                  <span className="badge bg-danger mb-1">{trackingData.serviceType}</span>
                  <h5 className="fw-bold text-dark mb-0">{trackingData.busName}</h5>
                  <span className="small text-muted">{trackingData.busNumber}</span>
                </div>
                <div className="text-end">
                  <span className="badge bg-success-subtle text-success border border-success px-2 py-1">
                    <i className="bi bi-broadcast me-1"></i> Transmitting
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <span className="text-muted small d-block">Current Location:</span>
                <strong className="text-primary fs-6">{trackingData.currentLocationName}</strong>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <div className="p-2 border rounded bg-light">
                    <span className="text-muted small d-block">Current Speed</span>
                    <strong className="fs-5 text-dark">{trackingData.speedKmH} km/h</strong>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 border rounded bg-light">
                    <span className="text-muted small d-block">Schedule Delay</span>
                    <strong className="fs-5 text-warning">+{trackingData.delayMinutes} mins</strong>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-light rounded-3 small">
                <div className="d-flex justify-content-between mb-1">
                  <span>Driver in Charge:</span>
                  <strong>{trackingData.driverName}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Duty Phone:</span>
                  <strong className="text-primary">{trackingData.driverMobile}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Route Stop Timeline */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <h5 className="fw-bold text-dark border-bottom pb-3 mb-4">
                <i className="bi bi-signpost-2-fill text-primary me-2"></i>
                Stops & Timetable Progression
              </h5>

              <div className="tracking-stepper">
                {trackingData.stops?.map((stop, idx) => (
                  <div
                    key={idx}
                    className={`tracking-step-node ${
                      stop.passed ? 'completed' : stop.status === 'CURRENT' ? 'current' : ''
                    }`}
                  >
                    <div className="node-indicator"></div>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <strong className="text-dark d-block">{stop.name}</strong>
                        <span className="small text-muted">
                          Sched: {stop.scheduledTime} &bull; Actual: {stop.actualTime}
                        </span>
                      </div>
                      <span
                        className={`badge ${
                          stop.passed
                            ? 'bg-success-subtle text-success'
                            : stop.status === 'CURRENT'
                            ? 'bg-primary'
                            : 'bg-light text-muted border'
                        }`}
                      >
                        {stop.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TrackBus;
