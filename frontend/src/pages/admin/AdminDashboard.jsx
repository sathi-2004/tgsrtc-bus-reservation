import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import DashboardStatCard from '../../components/admin/DashboardStatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const data = await adminService.getDashboardStats();
      setStats(data);
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner message="Calculating real-time fleet analytics..." />;

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-0">Transport Operations Center</h3>
          <span className="text-secondary small">Real-time telemetry, fleet tracking, and passenger reservation ledger</span>
        </div>
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => adminService.exportBookingsCsv(stats.recentBookings || [])}
          >
            <i className="bi bi-file-earmark-spreadsheet me-1"></i> Export Daily CSV
          </button>
          <Link to="/admin/schedules" className="btn btn-primary btn-sm">
            <i className="bi bi-plus-lg me-1"></i> Add Bus Schedule
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="row g-3 mb-4">
        <div className="col-xl-3 col-md-6">
          <DashboardStatCard
            title="Total Fleet Buses"
            value={stats.totalBuses}
            icon="bi-bus-front-fill"
            color="primary"
            subtext={`${stats.activeBuses} buses active on route today`}
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <DashboardStatCard
            title="Today's Reservations"
            value={stats.todaysBookings}
            icon="bi-ticket-detailed-fill"
            color="success"
            subtext={`${stats.confirmedBookings} confirmed &bull; ${stats.cancelledBookings} cancelled`}
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <DashboardStatCard
            title="Verified Revenue"
            value={`₹${stats.todaysRevenue.toLocaleString('en-IN')}`}
            icon="bi-currency-rupee"
            color="danger"
            subtext="Payment gateway settled"
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <DashboardStatCard
            title="Fleet Occupancy"
            value={`${stats.averageOccupancyRate}%`}
            icon="bi-pie-chart-fill"
            color="warning"
            subtext="Above corporate target (75%)"
          />
        </div>
      </div>

      {/* Recent Bookings Ledger */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center border-bottom">
          <h5 className="fw-bold text-dark mb-0">
            <i className="bi bi-journal-check text-primary me-2"></i>
            Live Booking Feed
          </h5>
          <Link to="/admin/bookings" className="btn btn-link btn-sm text-decoration-none">
            View All Bookings <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small">
              <tr>
                <th>Booking Ref</th>
                <th>Passenger</th>
                <th>Route & Bus Class</th>
                <th>Seat(s)</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody className="small">
              {stats.recentBookings?.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <strong className="text-primary">{item.id}</strong>
                  </td>
                  <td className="fw-semibold">{item.passenger}</td>
                  <td>
                    <div>{item.route}</div>
                    <span className="badge bg-light text-muted border">{item.bus}</span>
                  </td>
                  <td>
                    <span className="badge bg-primary px-2 py-1">{item.seats}</span>
                  </td>
                  <td className="fw-bold text-danger">₹{item.amount}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === 'CONFIRMED' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="text-muted">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
