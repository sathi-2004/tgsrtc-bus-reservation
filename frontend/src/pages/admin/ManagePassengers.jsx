import React, { useState } from 'react';

const ManagePassengers = () => {
  const [passengers] = useState([
    { id: 1, name: 'K. Rajesh Kumar', email: 'passenger@example.com', mobile: '9876543210', totalTrips: 12, status: 'VERIFIED' },
    { id: 2, name: 'Anusha Reddy', email: 'anusha.reddy@gmail.com', mobile: '9848012345', totalTrips: 8, status: 'VERIFIED' },
    { id: 3, name: 'V. Naresh', email: 'v.naresh@yahoo.com', mobile: '9988776655', totalTrips: 5, status: 'VERIFIED' },
    { id: 4, name: 'B. Srinivas Rao', email: 'srinivas.rao@gmail.com', mobile: '9123456780', totalTrips: 19, status: 'PREMIUM COMMUTER' }
  ]);

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-0">Travellers Directory</h4>
        <span className="text-secondary small">Registered passenger accounts and commuter loyalty profiles</span>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small">
              <tr>
                <th>Passenger Name</th>
                <th>Email Address</th>
                <th>Mobile Number</th>
                <th>Completed Journeys</th>
                <th>Commuter Status</th>
              </tr>
            </thead>
            <tbody className="small">
              {passengers.map((p) => (
                <tr key={p.id}>
                  <td className="fw-semibold text-primary">{p.name}</td>
                  <td>{p.email}</td>
                  <td className="font-monospace">{p.mobile}</td>
                  <td>
                    <span className="badge bg-light text-dark border">{p.totalTrips} Journeys</span>
                  </td>
                  <td>
                    <span className="badge bg-success-subtle text-success">{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagePassengers;
