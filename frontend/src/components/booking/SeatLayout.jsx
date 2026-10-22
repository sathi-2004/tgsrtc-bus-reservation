import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import scheduleService from '../../services/scheduleService';

const SeatLayout = ({ schedule, onProceed }) => {
  const {
    selectedSeats,
    setSelectedSeats,
    setSelectedSchedule,
    boardingPoint,
    setBoardingPoint,
    droppingPoint,
    setDroppingPoint
  } = useBooking();

  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seatLimitError, setSeatLimitError] = useState('');

  const currentSchedule = schedule;

  useEffect(() => {
    if (currentSchedule) {
      setSelectedSchedule(currentSchedule);
      if (currentSchedule.boardingPoints?.length && !boardingPoint) {
        setBoardingPoint(currentSchedule.boardingPoints[0].name);
      }
      if (currentSchedule.droppingPoints?.length && !droppingPoint) {
        setDroppingPoint(currentSchedule.droppingPoints[0].name);
      }
    }

    const loadSeats = async () => {
      setLoading(true);
      const seatData = await scheduleService.getScheduleSeats(currentSchedule?.id || 101);
      setSeats(seatData);
      setLoading(false);
    };

    loadSeats();
  }, [currentSchedule]);

  const handleSeatClick = (seat) => {
    setSeatLimitError('');
    if (seat.status === 'BOOKED' || seat.status === 'DISABLED') {
      return;
    }

    const seatNumber = seat.seatNumber;
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      if (selectedSeats.length >= 6) {
        setSeatLimitError('You can reserve a maximum of 6 seats per transaction.');
        return;
      }
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const calculateSubtotal = () => {
    const baseFare = currentSchedule?.fare || 350;
    return selectedSeats.length * baseFare;
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      setSeatLimitError('Please select at least 1 seat to proceed.');
      return;
    }
    if (!boardingPoint || !droppingPoint) {
      setSeatLimitError('Please select both boarding and dropping points.');
      return;
    }
    if (onProceed) {
      onProceed();
    } else {
      navigate('/passenger-details');
    }
  };

  // Group seats by rows for 2+2 layout
  const rows = [];
  const maxRow = Math.max(...seats.map((s) => s.row || 1), 10);
  for (let r = 1; r <= maxRow; r++) {
    const rowSeats = seats.filter((s) => s.row === r);
    if (rowSeats.length > 0) {
      rows.push({
        rowNum: r,
        leftSeats: rowSeats.filter((s) => s.col < 2),
        rightSeats: rowSeats.filter((s) => s.col >= 2)
      });
    }
  }

  return (
    <div className="seat-selection-wrapper py-3">
      {/* Legend & Instructions */}
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 p-3 bg-white rounded-3 border mb-4 shadow-sm">
        <div className="d-flex align-items-center">
          <span className="seat-legend-dot border" style={{ backgroundColor: '#ffffff', borderColor: '#10b981' }}></span>
          <span className="small text-secondary fw-semibold">Available</span>
        </div>
        <div className="d-flex align-items-center">
          <span className="seat-legend-dot" style={{ backgroundColor: '#2563eb' }}></span>
          <span className="small text-secondary fw-semibold">Selected</span>
        </div>
        <div className="d-flex align-items-center">
          <span className="seat-legend-dot" style={{ backgroundColor: '#fee2e2', border: '1px solid #ef4444' }}></span>
          <span className="small text-secondary fw-semibold">Already Booked</span>
        </div>
        <div className="d-flex align-items-center">
          <span className="seat-legend-dot" style={{ backgroundColor: '#f1f5f9', border: '1px solid #94a3b8' }}></span>
          <span className="small text-secondary fw-semibold">Unavailable</span>
        </div>
      </div>

      {seatLimitError && (
        <div className="alert alert-danger py-2 px-3 small text-center mb-3">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {seatLimitError}
        </div>
      )}

      <div className="row g-4 align-items-start">
        {/* Left Column: Interactive Bus Chassis */}
        <div className="col-lg-6 col-md-12">
          <div className="bus-chassis">
            {/* Bus Cabin Header with Steering Wheel */}
            <div className="bus-driver-cabin">
              <div className="d-flex flex-column align-items-center" title="Driver Cabin">
                <i className="bi bi-fan driver-wheel" style={{ transform: 'rotate(45deg)' }}></i>
                <span className="small text-muted" style={{ fontSize: '0.65rem' }}>DRIVER</span>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                <span className="ms-2 small text-muted">Rendering Seat Layout...</span>
              </div>
            ) : (
              <div className="seats-matrix d-flex flex-column gap-3">
                {rows.map((rowObj) => (
                  <div key={`row-${rowObj.rowNum}`} className="d-flex justify-content-between align-items-center px-2">
                    {/* Left Pair */}
                    <div className="d-flex gap-2">
                      {rowObj.leftSeats.map((seat) => {
                        const isSelected = selectedSeats.includes(seat.seatNumber);
                        const statusClass = isSelected
                          ? 'selected'
                          : seat.status === 'BOOKED'
                          ? 'booked'
                          : seat.status === 'DISABLED'
                          ? 'disabled'
                          : 'available';

                        return (
                          <div
                            key={seat.seatNumber}
                            className={`seat-item ${statusClass}`}
                            onClick={() => handleSeatClick(seat)}
                            title={`Seat ${seat.seatNumber} - ₹${seat.fare || currentSchedule?.fare} (${seat.type})`}
                          >
                            <i className="bi bi-node-plus-fill opacity-25" style={{ fontSize: '0.6rem' }}></i>
                            <span>{seat.seatNumber}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bus Central Aisle */}
                    <div className="text-muted small fw-light px-2" style={{ fontSize: '0.65rem' }}>
                      AISLE
                    </div>

                    {/* Right Pair */}
                    <div className="d-flex gap-2">
                      {rowObj.rightSeats.map((seat) => {
                        const isSelected = selectedSeats.includes(seat.seatNumber);
                        const statusClass = isSelected
                          ? 'selected'
                          : seat.status === 'BOOKED'
                          ? 'booked'
                          : seat.status === 'DISABLED'
                          ? 'disabled'
                          : 'available';

                        return (
                          <div
                            key={seat.seatNumber}
                            className={`seat-item ${statusClass}`}
                            onClick={() => handleSeatClick(seat)}
                            title={`Seat ${seat.seatNumber} - ₹${seat.fare || currentSchedule?.fare} (${seat.type})`}
                          >
                            <i className="bi bi-node-plus-fill opacity-25" style={{ fontSize: '0.6rem' }}></i>
                            <span>{seat.seatNumber}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Boarding/Dropping Points and Selected Seats Summary */}
        <div className="col-lg-6 col-md-12">
          <div className="bg-white p-4 rounded-3 border shadow-sm">
            <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">
              <i className="bi bi-ticket-perforated text-primary me-2"></i>
              Reservation Selection
            </h5>

            {/* Boarding Point Dropdown */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary">
                <i className="bi bi-geo-alt-fill text-danger me-1"></i> Select Boarding Point
              </label>
              <select
                className="form-select"
                value={boardingPoint}
                onChange={(e) => setBoardingPoint(e.target.value)}
              >
                {currentSchedule?.boardingPoints?.map((bp, i) => (
                  <option key={`bp-${i}`} value={bp.name}>
                    {bp.name} ({bp.time})
                  </option>
                ))}
              </select>
            </div>

            {/* Dropping Point Dropdown */}
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary">
                <i className="bi bi-pin-map-fill text-success me-1"></i> Select Dropping Point
              </label>
              <select
                className="form-select"
                value={droppingPoint}
                onChange={(e) => setDroppingPoint(e.target.value)}
              >
                {currentSchedule?.droppingPoints?.map((dp, i) => (
                  <option key={`dp-${i}`} value={dp.name}>
                    {dp.name} ({dp.time})
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Seats Chips */}
            <div className="p-3 bg-light rounded-3 mb-3 border">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="small text-secondary fw-semibold">Chosen Seat(s):</span>
                <span className="badge bg-primary px-2 py-1">{selectedSeats.length} Seat(s)</span>
              </div>
              {selectedSeats.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {selectedSeats.map((s) => (
                    <span key={s} className="badge bg-blue text-white p-2 d-flex align-items-center gap-1" style={{ backgroundColor: '#2563eb' }}>
                      <i className="bi bi-check-circle-fill"></i> Seat {s}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-muted small fst-italic">
                  Click on any available green seat in the layout to reserve.
                </div>
              )}
            </div>

            {/* Subtotal Calculation */}
            <div className="d-flex justify-content-between align-items-center mb-4 pt-2 border-top">
              <div>
                <div className="fw-bold fs-5 text-dark">Estimated Fare</div>
                <div className="small text-muted">Excluding taxes & reservation fee</div>
              </div>
              <div className="fs-3 fw-bold text-danger">₹{calculateSubtotal()}</div>
            </div>

            {/* Proceed Button */}
            <button
              className="btn btn-tgsrtc-accent w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
              disabled={selectedSeats.length === 0}
              onClick={handleContinue}
            >
              <span>PROCEED TO PASSENGER DETAILS</span>
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;
