import api from './api';

// Fallback cities for resilient UX
export const DEFAULT_CITIES = [
  'Hyderabad (MGBS)',
  'Hyderabad (JBS)',
  'Warangal',
  'Karimnagar',
  'Khammam',
  'Nizamabad',
  'Vijayawada',
  'Bengaluru',
  'Chennai',
  'Tirupati',
  'Bhadrachalam',
  'Srisailam',
  'Mahabubnagar',
  'Nalgonda',
  'Adilabad',
  'Mancherial',
  'Ramagundam',
  'Suryapet',
  'Siddipet',
  'Miryalaguda'
];

export const routeService = {
  // Get all unique cities for From/To dropdowns
  getCities: async () => {
    try {
      const response = await api.get('/routes/cities');
      if (response.data && response.data.length > 0) {
        return response.data;
      }
      return DEFAULT_CITIES;
    } catch {
      return DEFAULT_CITIES;
    }
  },

  // Get all routes
  getRoutes: async () => {
    try {
      const response = await api.get('/routes');
      return response.data;
    } catch {
      return [];
    }
  },

  // Get popular routes with starting fares
  getPopularRoutes: async () => {
    try {
      const response = await api.get('/routes/popular');
      return response.data;
    } catch {
      return [
        { id: 1, source: 'Hyderabad (MGBS)', destination: 'Vijayawada', distanceKm: 275, duration: '4h 30m', startingFare: 380, frequency: 'Every 20 mins' },
        { id: 2, source: 'Hyderabad (MGBS)', destination: 'Warangal', distanceKm: 148, duration: '2h 45m', startingFare: 220, frequency: 'Every 15 mins' },
        { id: 3, source: 'Hyderabad (MGBS)', destination: 'Bengaluru', distanceKm: 570, duration: '9h 00m', startingFare: 890, frequency: 'Every 30 mins' },
        { id: 4, source: 'Hyderabad (MGBS)', destination: 'Karimnagar', distanceKm: 164, duration: '3h 15m', startingFare: 260, frequency: 'Every 20 mins' },
        { id: 5, source: 'Hyderabad (MGBS)', destination: 'Tirupati', distanceKm: 555, duration: '10h 30m', startingFare: 820, frequency: 'Hourly' },
        { id: 6, source: 'Hyderabad (MGBS)', destination: 'Bhadrachalam', distanceKm: 310, duration: '6h 30m', startingFare: 490, frequency: 'Frequent' },
        { id: 7, source: 'Hyderabad (MGBS)', destination: 'Nizamabad', distanceKm: 175, duration: '3h 30m', startingFare: 270, frequency: 'Every 30 mins' },
        { id: 8, source: 'Hyderabad (MGBS)', destination: 'Srisailam', distanceKm: 215, duration: '5h 00m', startingFare: 340, frequency: 'Regular' }
      ];
    }
  }
};

export default routeService;
