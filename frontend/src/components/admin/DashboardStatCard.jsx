import React from 'react';

const DashboardStatCard = ({ title, value, icon, color = 'primary', subtext, trend }) => {
  return (
    <div className="card border-0 shadow-sm rounded-3 h-100">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-secondary small fw-bold text-uppercase">{title}</span>
          <div className={`p-2 rounded-3 bg-${color}-subtle text-${color}`}>
            <i className={`bi ${icon} fs-4`}></i>
          </div>
        </div>
        <div className="d-flex align-items-baseline gap-2">
          <h3 className="fw-bold text-dark mb-0">{value}</h3>
          {trend && (
            <span className={`small fw-semibold ${trend > 0 ? 'text-success' : 'text-danger'}`}>
              <i className={`bi ${trend > 0 ? 'bi-arrow-up-short' : 'bi-arrow-down-short'}`}></i>
              {Math.abs(trend)}%
            </span>
          )}
        </div>
        {subtext && <div className="text-muted small mt-2">{subtext}</div>}
      </div>
    </div>
  );
};

export default DashboardStatCard;
