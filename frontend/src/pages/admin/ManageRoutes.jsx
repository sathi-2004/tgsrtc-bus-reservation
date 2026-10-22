import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ManageRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [routeForm, setRouteForm] = useState({
    sourceCity: '',
    destinationCity: '',
    distanceKm: 200,
    estimatedDuration: '3h 30m',
    baseFare: 300
  });

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    setLoading(true);
    const data = await adminService.getRoutes();
    setRoutes(data);
    setLoading(false);
  };

  const handleSaveRoute = async (e) => {
    e.preventDefault();
    await adminService.saveRoute(routeForm);
    setShowModal(false);
    setRouteForm({
      sourceCity: '',
      destinationCity: '',
      distanceKm: 200,
      estimatedDuration: '3h 30m',
      baseFare: 300
    });
    loadRoutes();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this corridor route?')) {
      await adminService.deleteRoute(id);
      loadRoutes();
    }
  };

  if (loading) return <LoadingSpinner message="Fetching state transit corridors..." />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-0">Manage Routes & Corridors</h4>
          <span className="text-secondary small">Intercity corridors, intermediate stops, distance and base tariffs</span>
        </div>
        <button className="btn btn-primary btn-sm px-3" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-lg me-1"></i> Add New Route
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small">
              <tr>
                <th>Route ID</th>
                <th>Origin (From)</th>
                <th>Destination (To)</th>
                <th>Distance</th>
                <th>Avg. Duration</th>
                <th>Base Fare</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="small">
              {routes.map((r) => (
                <tr key={r.id}>
                  <td>
                    <strong className="text-muted">RT-{r.id}</strong>
                  </td>
                  <td className="fw-semibold text-primary">{r.sourceCity}</td>
                  <td className="fw-semibold text-dark">{r.destinationCity}</td>
                  <td>{r.distanceKm} km</td>
                  <td>{r.estimatedDuration}</td>
                  <td className="fw-bold text-danger">₹{r.baseFare}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-outline-danger btn-sm py-0 px-2"
                      onClick={() => handleDelete(r.id)}
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

      {/* Add Route Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow rounded-4">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Create Transit Route</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSaveRoute}>
                <div className="modal-body py-3">
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Origin City *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Hyderabad (MGBS)"
                        value={routeForm.sourceCity}
                        onChange={(e) => setRouteForm({ ...routeForm, sourceCity: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Destination City *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Vijayawada"
                        value={routeForm.destinationCity}
                        onChange={(e) => setRouteForm({ ...routeForm, destinationCity: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Distance (km)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={routeForm.distanceKm}
                        onChange={(e) => setRouteForm({ ...routeForm, distanceKm: Number(e.target.value) })}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Duration (e.g. 4h 30m)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={routeForm.estimatedDuration}
                        onChange={(e) => setRouteForm({ ...routeForm, estimatedDuration: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Base Fare (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={routeForm.baseFare}
                      onChange={(e) => setRouteForm({ ...routeForm, baseFare: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary px-4">
                    Save Route
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

export default ManageRoutes;
