import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    from: 'Hyderabad (MGBS)',
    to: 'Vijayawada',
    date: new Date().toISOString().split('T')[0],
    returnDate: '',
    passengers: 1
  });

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [bookingSummary, setBookingSummary] = useState(null);
  const [boardingPoint, setBoardingPoint] = useState('');
  const [droppingPoint, setDroppingPoint] = useState('');

  const calculateTotalFare = () => {
    if (!selectedSchedule || selectedSeats.length === 0) return 0;
    const baseFarePerSeat = selectedSchedule.fare || 350;
    const baseTotal = baseFarePerSeat * selectedSeats.length;
    const gst = Math.round(baseTotal * 0.05); // 5% GST on passenger transport
    const reservationFee = selectedSeats.length * 20; // 20 Rs reservation fee
    const tollFee = selectedSeats.length * 15;
    return {
      baseFare: baseTotal,
      gst,
      reservationFee,
      tollFee,
      totalAmount: baseTotal + gst + reservationFee + tollFee
    };
  };

  const resetBookingState = () => {
    setSelectedSchedule(null);
    setSelectedSeats([]);
    setPassengerDetails([]);
    setBookingSummary(null);
    setBoardingPoint('');
    setDroppingPoint('');
  };

  return (
    <BookingContext.Provider
      value={{
        searchParams,
        setSearchParams,
        selectedSchedule,
        setSelectedSchedule,
        selectedSeats,
        setSelectedSeats,
        passengerDetails,
        setPassengerDetails,
        boardingPoint,
        setBoardingPoint,
        droppingPoint,
        setDroppingPoint,
        bookingSummary,
        setBookingSummary,
        calculateTotalFare,
        resetBookingState
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export default BookingContext;
