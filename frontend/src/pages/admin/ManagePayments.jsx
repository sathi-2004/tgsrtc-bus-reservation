import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    setLoading(true);
    const data = await adminService.getAllPayments();
    setPayments(data);
    setLoading(false);
  };

  if (loading) return <LoadingSpinner message="Reconciling payment gateway records..." />;

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-0">Payment Transactions Ledger</h4>
        <span className="text-secondary small">Gateway settlements, UPI references, and transaction verification audit</span>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light small">
              <tr>
                <th>Transaction ID</th>
                <th>Booking Reference</th>
                <th>Amount (₹)</th>
                <th>Payment Mode</th>
                <th>Settlement Status</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody className="small">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>
                    <strong className="text-primary font-monospace">{p.transactionId}</strong>
                  </td>
                  <td>{p.bookingRef}</td>
                  <td className="fw-bold text-danger">₹{p.amount}</td>
                  <td>
                    <span className="badge bg-light text-dark border">{p.method}</span>
                  </td>
                  <td>
                    <span className="badge bg-success-subtle text-success">{p.status}</span>
                  </td>
                  <td className="text-muted">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagePayments;
