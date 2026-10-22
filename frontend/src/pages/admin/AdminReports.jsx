import React from 'react';
import adminService from '../../services/adminService';

const AdminReports = () => {
  const handleExportDaily = async () => {
    const bookings = await adminService.getAllBookings();
    adminService.exportBookingsCsv(bookings);
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-0">Analytics & Periodic Reports</h4>
        <span className="text-secondary small">Generate statutory transport department revenue sheets and fleet occupancy logs</span>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <i className="bi bi-file-earmark-spreadsheet-fill fs-2 text-success mb-3"></i>
            <h5 className="fw-bold text-dark">Daily Passenger Revenue</h5>
            <p className="text-secondary small mb-3">
              Export comprehensive line-by-line ticket sales, concession deductions, and payment gateway transaction receipts.
            </p>
            <button className="btn btn-outline-success btn-sm mt-auto" onClick={handleExportDaily}>
              Download CSV Report
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <i className="bi bi-pie-chart-fill fs-2 text-primary mb-3"></i>
            <h5 className="fw-bold text-dark">Route Occupancy Ratio</h5>
            <p className="text-secondary small mb-3">
              Corridor performance analytics identifying high-demand routes, peak hour loads, and under-utilized rural trips.
            </p>
            <button className="btn btn-outline-primary btn-sm mt-auto" onClick={handleExportDaily}>
              Download Occupancy CSV
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <i className="bi bi-arrow-counterclockwise fs-2 text-danger mb-3"></i>
            <h5 className="fw-bold text-dark">Cancellation & Refund Audit</h5>
            <p className="text-secondary small mb-3">
              Audit log of customer cancellations, clerk deductions, refund bank processing statuses, and net refund disbursement.
            </p>
            <button className="btn btn-outline-danger btn-sm mt-auto" onClick={handleExportDaily}>
              Download Refund CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
