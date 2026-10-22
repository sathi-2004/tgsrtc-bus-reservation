import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import paymentService from '../services/paymentService';
import bookingService from '../services/bookingService';

const PaymentPage = () => {
  const {
    selectedSchedule,
    selectedSeats,
    passengerDetails,
    boardingPoint,
    droppingPoint,
    calculateTotalFare,
    searchParams,
    setCurrentBooking
  } = useBooking();

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI', 'CARD', 'NETBANKING'
  const [upiId, setUpiId] = useState('user@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 8920 1204 8821');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('321');
  const [cardName, setCardName] = useState('K. RAJESH KUMAR');
  const [selectedBank, setSelectedBank] = useState('SBI');

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const fareCalc = calculateTotalFare();
  const totalAmount = fareCalc?.totalAmount || 680;

  const handlePayNow = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError('');

    try {
      // 1. Create Payment Order on Backend
      const order = await paymentService.createOrder({
        amount: totalAmount,
        currency: 'INR',
        scheduleId: selectedSchedule?.id
      });

      // 2. Verify Payment (simulated sandbox verification or gateway response)
      const verification = await paymentService.verifyPayment({
        orderId: order.orderId,
        paymentId: `pay_${Date.now()}`,
        signature: 'simulated_hmac_sha256_sig',
        method: paymentMethod
      });

      if (!verification.success) {
        throw new Error(verification.message || 'Payment verification failed.');
      }

      // 3. Create Confirmed Booking on Backend
      const bookingPayload = {
        scheduleId: selectedSchedule?.id,
        busName: selectedSchedule?.busName,
        busNumber: selectedSchedule?.busNumber,
        serviceType: selectedSchedule?.serviceType,
        sourceCity: selectedSchedule?.sourceCity,
        destinationCity: selectedSchedule?.destinationCity,
        departureTime: selectedSchedule?.departureTime,
        arrivalTime: selectedSchedule?.arrivalTime,
        journeyDate: searchParams?.date,
        boardingPoint,
        droppingPoint,
        passengers: passengerDetails.length > 0 ? passengerDetails : [
          { name: currentUser?.name || 'Passenger', age: 28, gender: 'MALE', seatNumber: selectedSeats[0] || '12' }
        ],
        totalAmount,
        contactEmail: currentUser?.email || 'passenger@example.com',
        contactMobile: currentUser?.mobile || '9876543210',
        paymentTransactionId: verification.transactionId
      };

      const booking = await bookingService.createBooking(bookingPayload);
      if (setCurrentBooking) {
        setCurrentBooking(booking);
      }

      // Redirect to confirmation screen
      navigate(`/booking-confirmation/${booking.bookingReference || booking.id}`);
    } catch (err) {
      setPaymentError(err.message || 'An error occurred during payment processing.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="container py-4">
      {/* Step Indicator */}
      <div className="d-flex justify-content-center align-items-center gap-3 mb-4 small fw-semibold">
        <span className="text-muted"><i className="bi bi-check-circle-fill text-success me-1"></i> 1. Select Bus</span>
        <span className="text-muted">&rarr;</span>
        <span className="text-muted"><i className="bi bi-check-circle-fill text-success me-1"></i> 2. Select Seats</span>
        <span className="text-muted">&rarr;</span>
        <span className="text-muted"><i className="bi bi-check-circle-fill text-success me-1"></i> 3. Passenger Details</span>
        <span className="text-muted">&rarr;</span>
        <span className="text-primary fw-bold"><i className="bi bi-circle-fill text-primary me-1"></i> 4. Payment Gateway</span>
      </div>

      <div className="row g-4 justify-content-center">
        <div className="col-lg-7 col-md-10">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            {/* Header */}
            <div className="bg-primary text-white p-4" style={{ backgroundColor: '#003366' }}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="fw-bold mb-1">State Transport Payment Gateway</h5>
                  <span className="small opacity-75">
                    <i className="bi bi-shield-lock-fill me-1"></i> 256-Bit SSL Encrypted Sandbox
                  </span>
                </div>
                <div className="text-end">
                  <div className="small opacity-75">Total Payable</div>
                  <div className="fs-3 fw-bold text-warning">₹{totalAmount}</div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="card-body p-4">
              {paymentError && (
                <div className="alert alert-danger py-2 small mb-3">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i> {paymentError}
                </div>
              )}

              {/* Payment Methods Nav */}
              <label className="form-label small fw-bold text-secondary text-uppercase mb-2">
                Choose Payment Option
              </label>
              <div className="row g-2 mb-4">
                <div className="col-4">
                  <button
                    type="button"
                    className={`btn w-100 py-3 border text-start d-flex flex-column align-items-center justify-content-center gap-1 ${
                      paymentMethod === 'UPI' ? 'btn-primary text-white border-primary shadow-sm' : 'btn-light'
                    }`}
                    onClick={() => setPaymentMethod('UPI')}
                  >
                    <i className="bi bi-qr-code-scan fs-4"></i>
                    <span className="small fw-bold">UPI / QR</span>
                  </button>
                </div>
                <div className="col-4">
                  <button
                    type="button"
                    className={`btn w-100 py-3 border text-start d-flex flex-column align-items-center justify-content-center gap-1 ${
                      paymentMethod === 'CARD' ? 'btn-primary text-white border-primary shadow-sm' : 'btn-light'
                    }`}
                    onClick={() => setPaymentMethod('CARD')}
                  >
                    <i className="bi bi-credit-card-2-front fs-4"></i>
                    <span className="small fw-bold">Cards</span>
                  </button>
                </div>
                <div className="col-4">
                  <button
                    type="button"
                    className={`btn w-100 py-3 border text-start d-flex flex-column align-items-center justify-content-center gap-1 ${
                      paymentMethod === 'NETBANKING' ? 'btn-primary text-white border-primary shadow-sm' : 'btn-light'
                    }`}
                    onClick={() => setPaymentMethod('NETBANKING')}
                  >
                    <i className="bi bi-bank fs-4"></i>
                    <span className="small fw-bold">Net Banking</span>
                  </button>
                </div>
              </div>

              {/* Form by Method */}
              <form onSubmit={handlePayNow}>
                {paymentMethod === 'UPI' && (
                  <div className="p-3 bg-light rounded-3 border mb-4">
                    <label className="form-label small fw-semibold text-secondary">
                      Enter UPI ID / VPA
                    </label>
                    <div className="input-group mb-2">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-phone"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="yourname@okhdfcbank"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        required
                      />
                    </div>
                    <div className="d-flex gap-2 flex-wrap text-muted small mt-2">
                      <span className="badge bg-white text-dark border">Google Pay</span>
                      <span className="badge bg-white text-dark border">PhonePe</span>
                      <span className="badge bg-white text-dark border">Paytm UPI</span>
                      <span className="badge bg-white text-dark border">BHIM</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'CARD' && (
                  <div className="p-3 bg-light rounded-3 border mb-4">
                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-secondary">Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="form-label small fw-semibold text-secondary">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label small fw-semibold text-secondary">CVV</label>
                        <input
                          type="password"
                          maxLength="4"
                          className="form-control"
                          placeholder="123"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label small fw-semibold text-secondary">Cardholder Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'NETBANKING' && (
                  <div className="p-3 bg-light rounded-3 border mb-4">
                    <label className="form-label small fw-semibold text-secondary">Select Bank</label>
                    <select
                      className="form-select"
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                    >
                      <option value="SBI">State Bank of India (SBI)</option>
                      <option value="HDFC">HDFC Bank</option>
                      <option value="ICICI">ICICI Bank</option>
                      <option value="AXIS">Axis Bank</option>
                      <option value="CANARA">Canara Bank</option>
                      <option value="UNION">Union Bank of India</option>
                    </select>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-tgsrtc-accent w-100 py-3 fw-bold shadow d-flex align-items-center justify-content-center gap-2"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner-border spinner-border-sm text-light" role="status"></div>
                      <span>Verifying & Generating Ticket...</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-lock-fill"></i>
                      <span>PAY ₹{totalAmount} & CONFIRM BOOKING</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="card-footer bg-light p-3 text-center small text-muted border-top">
              <i className="bi bi-patch-check-fill text-success me-1"></i>
              Verified Payment Gateway &bull; Official Ticket Delivered via SMS & Email
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
