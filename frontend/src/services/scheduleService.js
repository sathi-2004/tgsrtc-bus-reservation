import api from './api';

// Sample schedules fallback to maintain smooth UX even before backend initialization
export const SAMPLE_SCHEDULES = [
  {
    id: 101,
    busNumber: 'TS-09-Z-7821',
    busName: 'GARUDA PLUS (Multi-Axle AC)',
    serviceType: 'GARUDA PLUS',
    serviceCategory: 'AC Sleeper / Seater',
    sourceCity: 'Hyderabad (MGBS)',
    destinationCity: 'Vijayawada',
    departureTime: '06:00 AM',
    arrivalTime: '10:30 AM',
    duration: '4h 30m',
    journeyDate: new Date().toISOString().split('T')[0],
    fare: 680,
    totalSeats: 48,
    availableSeats: 26,
    rating: 4.6,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Water Bottle', 'Blanket', 'Reading Light', 'Emergency Exit'],
    boardingPoints: [
      { name: 'MGBS Platform 12', time: '06:00 AM' },
      { name: 'Dilsukhnagar Bus Stop', time: '06:20 AM' },
      { name: 'LB Nagar Ring Road', time: '06:40 AM' },
      { name: 'Hayathnagar Bus Depot', time: '07:00 AM' }
    ],
    droppingPoints: [
      { name: 'Ibrahimpatnam Ring', time: '09:45 AM' },
      { name: 'Bhavanipuram', time: '10:15 AM' },
      { name: 'Vijayawada PNBS Bus Stand', time: '10:30 AM' }
    ]
  },
  {
    id: 102,
    busNumber: 'TS-10-UB-4512',
    busName: 'RAJADHANI (AC Semi-Sleeper)',
    serviceType: 'RAJADHANI',
    serviceCategory: 'AC',
    sourceCity: 'Hyderabad (MGBS)',
    destinationCity: 'Warangal',
    departureTime: '07:30 AM',
    arrivalTime: '10:15 AM',
    duration: '2h 45m',
    journeyDate: new Date().toISOString().split('T')[0],
    fare: 340,
    totalSeats: 44,
    availableSeats: 19,
    rating: 4.4,
    amenities: ['AC', 'Charging Point', 'Pushback Seats', 'Water Bottle', 'Live Tracking'],
    boardingPoints: [
      { name: 'MGBS Platform 6', time: '07:30 AM' },
      { name: 'Uppal Bus Stop', time: '08:05 AM' },
      { name: 'Ghatkesar Bypass', time: '08:25 AM' }
    ],
    droppingPoints: [
      { name: 'Kazipet Railway Station', time: '09:50 AM' },
      { name: 'Hanamkonda Bus Station', time: '10:05 AM' },
      { name: 'Warangal Bus Stand', time: '10:15 AM' }
    ]
  },
  {
    id: 103,
    busNumber: 'TS-08-VA-9901',
    busName: 'SUPER LUXURY (2+2 Non-AC Pushback)',
    serviceType: 'SUPER LUXURY',
    serviceCategory: 'Non-AC',
    sourceCity: 'Hyderabad (MGBS)',
    destinationCity: 'Karimnagar',
    departureTime: '08:15 AM',
    arrivalTime: '11:30 AM',
    duration: '3h 15m',
    journeyDate: new Date().toISOString().split('T')[0],
    fare: 290,
    totalSeats: 40,
    availableSeats: 14,
    rating: 4.2,
    amenities: ['Pushback Seats', 'Reading Light', 'First Aid Box', 'Emergency Exit'],
    boardingPoints: [
      { name: 'Jubilee Bus Station (JBS)', time: '08:15 AM' },
      { name: 'Alwal Bus Stop', time: '08:40 AM' },
      { name: 'Medchal Toll Plaza', time: '09:05 AM' }
    ],
    droppingPoints: [
      { name: 'Siddipet Bypass', time: '10:10 AM' },
      { name: 'Karimnagar Bus Station', time: '11:30 AM' }
    ]
  },
  {
    id: 104,
    busNumber: 'TS-11-SA-2234',
    busName: 'AC SLEEPER (Premium 2+1 Berth)',
    serviceType: 'AC SLEEPER',
    serviceCategory: 'AC Sleeper',
    sourceCity: 'Hyderabad (MGBS)',
    destinationCity: 'Bengaluru',
    departureTime: '09:00 PM',
    arrivalTime: '06:00 AM',
    duration: '9h 00m',
    journeyDate: new Date().toISOString().split('T')[0],
    fare: 1150,
    totalSeats: 36,
    availableSeats: 11,
    rating: 4.8,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket & Pillow', 'Water Bottle', 'CCTV', 'GPS Tracking'],
    boardingPoints: [
      { name: 'MGBS Platform 24', time: '09:00 PM' },
      { name: 'Ameerpet Bus Stop', time: '09:30 PM' },
      { name: 'Gachibowli ORR Junction', time: '10:15 PM' },
      { name: 'Shamshabad Airport Exit', time: '10:45 PM' }
    ],
    droppingPoints: [
      { name: 'Hebbal Flyover', time: '05:00 AM' },
      { name: 'Majestic Bus Stand', time: '05:30 AM' },
      { name: 'Shantinagar Bus Station', time: '06:00 AM' }
    ]
  },
  {
    id: 105,
    busNumber: 'TS-03-EX-1029',
    busName: 'DELUXE (Express 2+2)',
    serviceType: 'DELUXE',
    serviceCategory: 'Non-AC',
    sourceCity: 'Hyderabad (MGBS)',
    destinationCity: 'Khammam',
    departureTime: '10:00 AM',
    arrivalTime: '02:30 PM',
    duration: '4h 30m',
    journeyDate: new Date().toISOString().split('T')[0],
    fare: 275,
    totalSeats: 44,
    availableSeats: 22,
    rating: 4.1,
    amenities: ['Cushioned Seats', 'Luggage Compartment', 'First Aid'],
    boardingPoints: [
      { name: 'MGBS Platform 8', time: '10:00 AM' },
      { name: 'LB Nagar Ring Road', time: '10:35 AM' },
      { name: 'Choutuppal', time: '11:15 AM' }
    ],
    droppingPoints: [
      { name: 'Suryapet Bus Stand', time: '12:45 PM' },
      { name: 'Khammam Old Bus Depot', time: '02:15 PM' },
      { name: 'Khammam Main Bus Station', time: '02:30 PM' }
    ]
  },
  {
    id: 106,
    busNumber: 'TS-05-PL-8890',
    busName: 'PALLEVELUGU (Rural District Express)',
    serviceType: 'PALLEVELUGU',
    serviceCategory: 'Ordinary',
    sourceCity: 'Hyderabad (MGBS)',
    destinationCity: 'Nizamabad',
    departureTime: '01:00 PM',
    arrivalTime: '05:30 PM',
    duration: '4h 30m',
    journeyDate: new Date().toISOString().split('T')[0],
    fare: 195,
    totalSeats: 52,
    availableSeats: 30,
    rating: 3.9,
    amenities: ['General Seating', 'Standard Luggage Rack'],
    boardingPoints: [
      { name: 'Jubilee Bus Station (JBS)', time: '01:00 PM' },
      { name: 'Bowenpally Check Post', time: '01:25 PM' }
    ],
    droppingPoints: [
      { name: 'Kamareddy Bus Station', time: '03:45 PM' },
      { name: 'Nizamabad Central Bus Stand', time: '05:30 PM' }
    ]
  }
];

export const scheduleService = {
  // Search schedules with filters
  searchSchedules: async (searchParams) => {
    try {
      const { from, to, date, busType } = searchParams;
      const response = await api.get('/schedules/search', {
        params: { from, to, date, busType }
      });
      if (response.data && response.data.length > 0) {
        return response.data;
      }
      return filterLocalSchedules(searchParams);
    } catch {
      return filterLocalSchedules(searchParams);
    }
  },

  // Get specific schedule by ID
  getScheduleById: async (id) => {
    try {
      const response = await api.get(`/schedules/${id}`);
      return response.data;
    } catch {
      const found = SAMPLE_SCHEDULES.find((s) => s.id === parseInt(id));
      return found || SAMPLE_SCHEDULES[0];
    }
  },

  // Get seat layout and live occupancy status
  getScheduleSeats: async (scheduleId) => {
    try {
      const response = await api.get(`/schedules/${scheduleId}/seats`);
      return response.data;
    } catch {
      return generateMockSeats(scheduleId);
    }
  }
};

function filterLocalSchedules({ from, to }) {
  if (!from && !to) return SAMPLE_SCHEDULES;
  const filtered = SAMPLE_SCHEDULES.filter((s) => {
    const matchFrom = !from || s.sourceCity.toLowerCase().includes(from.toLowerCase().split(' ')[0]);
    const matchTo = !to || s.destinationCity.toLowerCase().includes(to.toLowerCase().split(' ')[0]);
    return matchFrom && matchTo;
  });
  // If no strict match on cities, return sample data with substituted cities for smooth demonstration
  if (filtered.length === 0) {
    return SAMPLE_SCHEDULES.map((s, index) => ({
      ...s,
      id: 200 + index,
      sourceCity: from || s.sourceCity,
      destinationCity: to || s.destinationCity
    }));
  }
  return filtered;
}

function generateMockSeats(scheduleId) {
  const seats = [];
  const bookedSeatNumbers = [3, 4, 11, 12, 19, 20, 27, 33];
  const disabledSeatNumbers = [1]; // Driver or conductor quota

  for (let i = 1; i <= 40; i++) {
    const isBooked = bookedSeatNumbers.includes(i);
    const isDisabled = disabledSeatNumbers.includes(i);
    const row = Math.ceil(i / 4);
    const colIndex = (i - 1) % 4; // 0, 1 = Left, 2, 3 = Right (2+2 layout)
    const position = colIndex < 2 ? 'L' : 'R';

    seats.push({
      seatNumber: `${i}`,
      row,
      col: colIndex,
      type: i % 4 === 0 || (i - 1) % 4 === 0 ? 'Window' : 'Aisle',
      berth: 'Lower',
      fare: 350 + (i % 4 === 0 ? 50 : 0),
      status: isBooked ? 'BOOKED' : isDisabled ? 'DISABLED' : 'AVAILABLE'
    });
  }
  return seats;
}

export default scheduleService;
