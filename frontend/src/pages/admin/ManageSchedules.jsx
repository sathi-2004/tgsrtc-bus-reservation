import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ManageSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    busNumber: 'TS-09-Z-7821',
    route: 'Hyderabad (MGBS) -> Vijayawada',
    departureTime: '06:00 AM',
    arrivalTime: '10:30 AM',
    fare: 680,
    status: 'SCHEDULED'
  });

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    setLoading(true);
    const data = await adminService.getSchedules();
    setSchedules(data);
    setLoading(false);
  };

  const handleSaveSchedule = async (e) => {
    e.preventDefault();
    await adminService.saveSchedule(scheduleForm);
    setShowModal(false);
    loadSchedules();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Cancel this departure schedule?')) {
      await adminService.deleteSchedule(id);
      loadSchedules();
    }
  };

  if (loading) return <LoadingSpinner message="Fetching daily departure rosters..." />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-0">Manage Departure Schedules</h4>
          <span className="text-secondary small">Dispatch timetables, bus allocation, tariffs, and route assignments</span>
        </div>
        <button className="btn btn-primary btn-sm px-3" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-lg me-1"></i> Add Trip Schedule
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small">
              <tr>
                <th>Schedule ID</th>
                <th>Bus Number</th>
                <th>Route</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Ticket Fare</th>
                <th>Dispatch Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="small">
              {schedules.map((s) => (
                <tr key={s.id}>
                  <td>
                    <strong className="text-muted">SCH-{s.id}</strong>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark border font-monospace">{s.busNumber}</span>
                  </td>
                  <td className="fw-semibold text-primary">{s.route}</td>
                  <td className="fw-semibold">{s.departureTime}</td>
                  <td>{s.arrivalTime}</td>
                  <td className="fw-bold text-danger">₹{s.fare}</td>
                  <td>
                    <span className="badge bg-success-subtle text-success">{s.status}</span>
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-outline-danger btn-sm py-0 px-2"
                      onClick={() => handleDelete(s.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Schedule Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow rounded-4">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Create Dispatch Schedule</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSaveSchedule}>
                <div className="modal-body py-3">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Allocated Bus Registration</label>
                    <input
                      type="text"
                      className="form-control"
                      value={scheduleForm.busNumber}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, busNumber: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Route (Origin &rarr; Destination)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={scheduleForm.route}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, route: e.target.value })}
                      required
                    />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Departure Time</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. 06:00 AM"
                        value={scheduleForm.departureTime}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, departureTime: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Arrival Time</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. 10:30 AM"
                        value={scheduleForm.arrivalTime}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, arrivalTime: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Seat Fare (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={scheduleForm.fare}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, fare: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary px-4">
                    Save Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSchedules;
