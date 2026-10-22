import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar p-3 d-flex flex-column" style={{ minWidth: '240px' }}>
      <div className="text-secondary small fw-bold text-uppercase px-3 mb-2">
        Core Operations
      </div>
      <nav className="nav flex-column mb-4">
        <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <i className="bi bi-speedometer2"></i> Dashboard Overview
        </NavLink>
        <NavLink to="/admin/buses" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <i className="bi bi-bus-front"></i> Bus Fleet ({248})
        </NavLink>
        <NavLink to="/admin/routes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <i className="bi bi-signpost-split"></i> Routes & Stops
        </NavLink>
        <NavLink to="/admin/schedules" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <i className="bi bi-clock-history"></i> Trip Schedules
        </NavLink>
      </nav>

      <div className="text-secondary small fw-bold text-uppercase px-3 mb-2">
        Bookings & Financials
      </div>
      <nav className="nav flex-column mb-4">
        <NavLink to="/admin/bookings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <i className="bi bi-ticket-perforated"></i> Passenger Bookings
        </NavLink>
        <NavLink to="/admin/passengers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <i className="bi bi-people"></i> Travellers Directory
        </NavLink>
        <NavLink to="/admin/payments" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <i className="bi bi-credit-card"></i> Payment Transactions
        </NavLink>
        <NavLink to="/admin/reports" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <i className="bi bi-bar-chart-line"></i> Analytics & CSV Reports
        </NavLink>
      </nav>

      <div className="mt-auto px-3 py-2 bg-dark rounded-3 small text-secondary">
        <div className="text-white fw-semibold">TGSRTC SuperAdmin</div>
        <div style={{ fontSize: '0.72rem' }}>Production Node &bull; v2.4.0</div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
