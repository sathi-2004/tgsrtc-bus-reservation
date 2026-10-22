import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ManageBuses = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [busForm, setBusForm] = useState({
    registrationNumber: '',
    busName: '',
    serviceType: 'GARUDA PLUS',
    totalSeats: 48,
    depot: 'MGBS Hyderabad',
    status: 'ACTIVE'
  });

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    setLoading(true);
    const data = await adminService.getBuses();
    setBuses(data);
    setLoading(false);
  };

  const handleSaveBus = async (e) => {
    e.preventDefault();
    await adminService.saveBus(busForm);
    setShowModal(false);
    setBusForm({
      registrationNumber: '',
      busName: '',
      serviceType: 'GARUDA PLUS',
      totalSeats: 48,
      depot: 'MGBS Hyderabad',
      status: 'ACTIVE'
    });
    loadBuses();
  };

  const handleToggleStatus = async (bus) => {
    const updated = { ...bus, status: bus.status === 'ACTIVE' ? 'MAINTENANCE' : 'ACTIVE' };
    await adminService.saveBus(updated);
    loadBuses();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to retire this bus from service?')) {
      await adminService.deleteBus(id);
      loadBuses();
    }
  };

  if (loading) return <LoadingSpinner message="Fetching bus fleet database..." />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-0">Manage Fleet Buses</h4>
          <span className="text-secondary small">Add, inspect, configure, and maintain corporation buses</span>
        </div>
        <button className="btn btn-primary btn-sm px-3" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-lg me-1"></i> Register New Bus
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small">
              <tr>
                <th>Registration No</th>
                <th>Bus Model / Class</th>
                <th>Service Type</th>
                <th>Total Seats</th>
                <th>Home Depot</th>
                <th>Operating Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="small">
              {buses.map((bus) => (
                <tr key={bus.id}>
                  <td>
                    <strong className="text-primary font-monospace">{bus.registrationNumber}</strong>
                  </td>
                  <td className="fw-semibold">{bus.busName}</td>
                  <td>
                    <span className="badge bg-secondary-subtle text-dark">{bus.serviceType}</span>
                  </td>
                  <td>{bus.totalSeats} Berths/Seats</td>
                  <td>{bus.depot}</td>
                  <td>
                    <button
                      className={`btn btn-sm py-0 px-2 badge ${
                        bus.status === 'ACTIVE' ? 'bg-success' : 'bg-warning text-dark'
                      }`}
                      onClick={() => handleToggleStatus(bus)}
                    >
                      {bus.status}
                    </button>
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-outline-danger btn-sm py-0 px-2"
                      onClick={() => handleDelete(bus.id)}
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

      {/* Add Bus Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow rounded-4">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Register Fleet Bus</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSaveBus}>
                <div className="modal-body py-3">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Registration Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. TS-09-Z-8821"
                      value={busForm.registrationNumber}
                      onChange={(e) => setBusForm({ ...busForm, registrationNumber: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Bus Name / Coach *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Garuda Plus Multi-Axle"
                      value={busForm.busName}
                      onChange={(e) => setBusForm({ ...busForm, busName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Service Type</label>
                      <select
                        className="form-select"
                        value={busForm.serviceType}
                        onChange={(e) => setBusForm({ ...busForm, serviceType: e.target.value })}
                      >
                        <option value="GARUDA PLUS">GARUDA PLUS</option>
                        <option value="RAJADHANI">RAJADHANI</option>
                        <option value="AC SLEEPER">AC SLEEPER</option>
                        <option value="SUPER LUXURY">SUPER LUXURY</option>
                        <option value="DELUXE">DELUXE</option>
                        <option value="PALLEVELUGU">PALLEVELUGU</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Seating Capacity</label>
                      <input
                        type="number"
                        className="form-control"
                        value={busForm.totalSeats}
                        onChange={(e) => setBusForm({ ...busForm, totalSeats: Number(e.target.value) })}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Home Depot</label>
                    <input
                      type="text"
                      className="form-control"
                      value={busForm.depot}
                      onChange={(e) => setBusForm({ ...busForm, depot: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary px-4">
                    Save Bus
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

export default ManageBuses;
