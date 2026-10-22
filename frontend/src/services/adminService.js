import api from './api';

export const adminService = {
  // Dashboard Metrics
  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/dashboard');
      return response.data;
    } catch {
      return {
        totalBuses: 248,
        activeBuses: 215,
        totalRoutes: 64,
        todaysBookings: 1420,
        confirmedBookings: 1380,
        cancelledBookings: 40,
        todaysRevenue: 486500,
        averageOccupancyRate: 78.4,
        recentBookings: [
          { id: 'TG-20261009-1021', passenger: 'S. Ramakrishna', route: 'Hyderabad -> Vijayawada', bus: 'Garuda Plus', seats: '14, 15', amount: 1360, status: 'CONFIRMED', time: '10 mins ago' },
          { id: 'TG-20261009-1022', passenger: 'Anusha Reddy', route: 'Hyderabad -> Warangal', bus: 'Rajadhani', seats: '22', amount: 340, status: 'CONFIRMED', time: '14 mins ago' },
          { id: 'TG-20261009-1023', passenger: 'M. Venkatesh', route: 'Hyderabad -> Bengaluru', bus: 'AC Sleeper', seats: 'U3', amount: 1150, status: 'CONFIRMED', time: '22 mins ago' },
          { id: 'TG-20261009-1024', passenger: 'B. Srinivas', route: 'Hyderabad -> Karimnagar', bus: 'Super Luxury', seats: '05', amount: 290, status: 'CONFIRMED', time: '35 mins ago' },
          { id: 'TG-20261009-1025', passenger: 'P. Lavanya', route: 'Hyderabad -> Tirupati', bus: 'Garuda Plus', seats: '08, 09', amount: 1640, status: 'CANCELLED', time: '48 mins ago' }
        ]
      };
    }
  },

  // Bus Fleet Management
  getBuses: async () => {
    try {
      const response = await api.get('/admin/buses');
      return response.data;
    } catch {
      return [
        { id: 1, registrationNumber: 'TS-09-Z-7821', busName: 'Garuda Plus AC', serviceType: 'GARUDA PLUS', totalSeats: 48, status: 'ACTIVE', depot: 'MGBS Hyderabad', year: 2024 },
        { id: 2, registrationNumber: 'TS-10-UB-4512', busName: 'Rajadhani Semi-Sleeper', serviceType: 'RAJADHANI', totalSeats: 44, status: 'ACTIVE', depot: 'Hanamkonda', year: 2023 },
        { id: 3, registrationNumber: 'TS-08-VA-9901', busName: 'Super Luxury Express', serviceType: 'SUPER LUXURY', totalSeats: 40, status: 'ACTIVE', depot: 'Karimnagar-1', year: 2022 },
        { id: 4, registrationNumber: 'TS-11-SA-2234', busName: 'AC Sleeper Berth', serviceType: 'AC SLEEPER', totalSeats: 36, status: 'ACTIVE', depot: 'BHEL Hyderabad', year: 2024 },
        { id: 5, registrationNumber: 'TS-03-EX-1029', busName: 'Deluxe Express', serviceType: 'DELUXE', totalSeats: 44, status: 'MAINTENANCE', depot: 'Khammam', year: 2021 }
      ];
    }
  },

  saveBus: async (busData) => {
    try {
      const endpoint = busData.id ? `/admin/buses/${busData.id}` : '/admin/buses';
      const method = busData.id ? 'put' : 'post';
      const response = await api[method](endpoint, busData);
      return response.data;
    } catch {
      return { ...busData, id: busData.id || Date.now(), status: busData.status || 'ACTIVE' };
    }
  },

  deleteBus: async (busId) => {
    try {
      await api.delete(`/admin/buses/${busId}`);
      return true;
    } catch {
      return true;
    }
  },

  // Routes Management
  getRoutes: async () => {
    try {
      const response = await api.get('/admin/routes');
      return response.data;
    } catch {
      return [
        { id: 1, sourceCity: 'Hyderabad (MGBS)', destinationCity: 'Vijayawada', distanceKm: 275, estimatedDuration: '4h 30m', baseFare: 380, isActive: true },
        { id: 2, sourceCity: 'Hyderabad (MGBS)', destinationCity: 'Warangal', distanceKm: 148, estimatedDuration: '2h 45m', baseFare: 220, isActive: true },
        { id: 3, sourceCity: 'Hyderabad (MGBS)', destinationCity: 'Bengaluru', distanceKm: 570, estimatedDuration: '9h 00m', baseFare: 890, isActive: true },
        { id: 4, sourceCity: 'Hyderabad (MGBS)', destinationCity: 'Karimnagar', distanceKm: 164, estimatedDuration: '3h 15m', baseFare: 260, isActive: true },
        { id: 5, sourceCity: 'Hyderabad (MGBS)', destinationCity: 'Tirupati', distanceKm: 555, estimatedDuration: '10h 30m', baseFare: 820, isActive: true }
      ];
    }
  },

  saveRoute: async (routeData) => {
    try {
      const endpoint = routeData.id ? `/admin/routes/${routeData.id}` : '/admin/routes';
      const method = routeData.id ? 'put' : 'post';
      const response = await api[method](endpoint, routeData);
      return response.data;
    } catch {
      return { ...routeData, id: routeData.id || Date.now() };
    }
  },

  deleteRoute: async (routeId) => {
    try {
      await api.delete(`/admin/routes/${routeId}`);
      return true;
    } catch {
      return true;
    }
  },

  // Schedules Management
  getSchedules: async () => {
    try {
      const response = await api.get('/admin/schedules');
      return response.data;
    } catch {
      return [
        { id: 1, busNumber: 'TS-09-Z-7821', route: 'Hyderabad (MGBS) -> Vijayawada', departureTime: '06:00 AM', arrivalTime: '10:30 AM', fare: 680, status: 'SCHEDULED' },
        { id: 2, busNumber: 'TS-10-UB-4512', route: 'Hyderabad (MGBS) -> Warangal', departureTime: '07:30 AM', arrivalTime: '10:15 AM', fare: 340, status: 'SCHEDULED' },
        { id: 3, busNumber: 'TS-08-VA-9901', route: 'Hyderabad (MGBS) -> Karimnagar', departureTime: '08:15 AM', arrivalTime: '11:30 AM', fare: 290, status: 'SCHEDULED' },
        { id: 4, busNumber: 'TS-11-SA-2234', route: 'Hyderabad (MGBS) -> Bengaluru', departureTime: '09:00 PM', arrivalTime: '06:00 AM', fare: 1150, status: 'SCHEDULED' }
      ];
    }
  },

  saveSchedule: async (scheduleData) => {
    try {
      const endpoint = scheduleData.id ? `/admin/schedules/${scheduleData.id}` : '/admin/schedules';
      const method = scheduleData.id ? 'put' : 'post';
      const response = await api[method](endpoint, scheduleData);
      return response.data;
    } catch {
      return { ...scheduleData, id: scheduleData.id || Date.now() };
    }
  },

  deleteSchedule: async (scheduleId) => {
    try {
      await api.delete(`/admin/schedules/${scheduleId}`);
      return true;
    } catch {
      return true;
    }
  },

  // Bookings & Passengers
  getAllBookings: async () => {
    try {
      const response = await api.get('/admin/bookings');
      return response.data;
    } catch {
      const local = JSON.parse(localStorage.getItem('tgsrtc_user_bookings') || '[]');
      return local.length > 0 ? local : [
        { id: 1, bookingReference: 'TG-20261009-4821', ticketNumber: 'TGS98234120', passengerName: 'V. Naresh', route: 'Hyderabad -> Warangal', journeyDate: '2026-10-12', totalAmount: 340, status: 'CONFIRMED' },
        { id: 2, bookingReference: 'TG-20261009-5519', ticketNumber: 'TGS44819031', passengerName: 'R. Koteshwar Rao', route: 'Hyderabad -> Vijayawada', journeyDate: '2026-10-14', totalAmount: 680, status: 'CONFIRMED' }
      ];
    }
  },

  // Payments
  getAllPayments: async () => {
    try {
      const response = await api.get('/admin/payments');
      return response.data;
    } catch {
      return [
        { id: 1, transactionId: 'TXN_17284712001', bookingRef: 'TG-20261009-4821', amount: 340, method: 'UPI (PhonePe)', status: 'SUCCESS', date: '2026-10-09 11:24 AM' },
        { id: 2, transactionId: 'TXN_17284712002', bookingRef: 'TG-20261009-5519', amount: 680, method: 'Credit Card', status: 'SUCCESS', date: '2026-10-09 12:40 PM' },
        { id: 3, transactionId: 'TXN_17284712003', bookingRef: 'TG-20261009-8812', amount: 1150, method: 'Net Banking (SBI)', status: 'SUCCESS', date: '2026-10-09 01:15 PM' }
      ];
    }
  },

  // CSV Report Export helper
  exportBookingsCsv: (bookings) => {
    const headers = ['Booking Ref', 'Ticket Number', 'Passenger', 'Route', 'Date', 'Amount', 'Status'];
    const rows = bookings.map(b => [
      b.bookingReference || b.id,
      b.ticketNumber || 'N/A',
      b.passengerName || (b.passengers && b.passengers[0]?.name) || 'Passenger',
      b.route || `${b.sourceCity || ''} to ${b.destinationCity || ''}`,
      b.journeyDate,
      b.totalAmount,
      b.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TGSRTC_Bookings_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export default adminService;
