import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';

const FareSummary = ({ onApplyDiscount }) => {
  const { selectedSchedule, selectedSeats, calculateTotalFare } = useBooking();
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [promoError, setPromoError] = useState('');

  const fareCalc = calculateTotalFare();
  const baseFare = fareCalc?.baseFare || (selectedSchedule?.fare || 350) * selectedSeats.length;
  const gst = fareCalc?.gst || Math.round(baseFare * 0.05);
  const reservationFee = fareCalc?.reservationFee || selectedSeats.length * 20;
  const tollFee = fareCalc?.tollFee || selectedSeats.length * 15;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoMessage('');

    const code = promoCode.trim().toUpperCase();
    if (code === 'TGSRTC50') {
      const discount = 50;
      setDiscountAmount(discount);
      setPromoMessage('Promo TGSRTC50 applied! ₹50 saved.');
      if (onApplyDiscount) onApplyDiscount(discount);
    } else if (code === 'TSGOVT10') {
      const discount = Math.round(baseFare * 0.1);
      setDiscountAmount(discount);
      setPromoMessage(`TSGOVT10 applied! 10% discount (₹${discount}) saved.`);
      if (onApplyDiscount) onApplyDiscount(discount);
    } else {
      setPromoError('Invalid or expired promotional coupon.');
    }
  };

  const finalTotal = Math.max(0, baseFare + gst + reservationFee + tollFee - discountAmount);

  return (
    <div className="card border-0 shadow-sm rounded-3">
      <div className="card-header bg-white py-3 border-bottom">
        <h5 className="fw-bold text-dark mb-0">
          <i className="bi bi-receipt-cutoff text-primary me-2"></i>
          Fare Breakdown
        </h5>
      </div>
      <div className="card-body p-4">
        {/* Route Snapshot */}
        <div className="mb-3 pb-3 border-bottom small">
          <div className="fw-semibold text-dark">{selectedSchedule?.busName}</div>
          <div className="text-muted">
            {selectedSchedule?.sourceCity} &rarr; {selectedSchedule?.destinationCity}
          </div>
          <div className="text-secondary mt-1">
            <strong>{selectedSeats.length} Seat(s):</strong> {selectedSeats.join(', ')}
          </div>
        </div>

        {/* Itemized charges */}
        <div className="d-flex justify-content-between mb-2 small text-secondary">
          <span>Base Passenger Fare ({selectedSeats.length} seats):</span>
          <span className="fw-semibold text-dark">₹{baseFare}</span>
        </div>

        <div className="d-flex justify-content-between mb-2 small text-secondary">
          <span>Reservation Charges:</span>
          <span className="fw-semibold text-dark">₹{reservationFee}</span>
        </div>

        <div className="d-flex justify-content-between mb-2 small text-secondary">
          <span>Toll & Infrastructure Cess:</span>
          <span className="fw-semibold text-dark">₹{tollFee}</span>
        </div>

        <div className="d-flex justify-content-between mb-3 small text-secondary pb-3 border-bottom">
          <span>GST (5% applicable):</span>
          <span className="fw-semibold text-dark">₹{gst}</span>
        </div>

        {discountAmount > 0 && (
          <div className="d-flex justify-content-between mb-3 text-success small pb-2 border-bottom">
            <span>Special RTC Concession:</span>
            <span className="fw-bold">- ₹{discountAmount}</span>
          </div>
        )}

        {/* Promo code box */}
        <form onSubmit={handleApplyPromo} className="mb-3">
          <label className="form-label small fw-semibold text-muted">Promo Code / Concession</label>
          <div className="input-group input-group-sm">
            <input
              type="text"
              className="form-control"
              placeholder="e.g. TGSRTC50"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="submit">
              Apply
            </button>
          </div>
          {promoMessage && <div className="text-success small mt-1">{promoMessage}</div>}
          {promoError && <div className="text-danger small mt-1">{promoError}</div>}
        </form>

        {/* Final Total */}
        <div className="d-flex justify-content-between align-items-center pt-2 border-top">
          <div>
            <div className="fw-bold fs-5 text-dark">Total Amount:</div>
            <div className="small text-muted">Inclusive of all taxes</div>
          </div>
          <div className="fs-3 fw-bold text-danger">₹{finalTotal}</div>
        </div>
      </div>
    </div>
  );
};

export default FareSummary;
