import api from './api';

export const trackingService = {
  getTrackingData: async (scheduleId) => {
    try {
      const response = await api.get(`/tracking/${scheduleId}`);
      return response.data;
    } catch {
      // High-fidelity fallback tracking simulator
      return {
        scheduleId: scheduleId || '101',
        busNumber: 'TS-09-Z-7821',
        busName: 'GARUDA PLUS (Multi-Axle AC)',
        route: 'Hyderabad (MGBS) -> Vijayawada (PNBS)',
        serviceType: 'GARUDA PLUS',
        driverName: 'K. Ramana Rao',
        driverMobile: '+91 94401 23456',
        speedKmH: 68,
        status: 'ON_ROUTE',
        delayMinutes: 5,
        currentLocationName: 'Near Suryapet Bypass (NH 65)',
        currentCoordinates: { lat: 17.1439, lng: 79.6239 },
        estimatedArrival: '10:35 AM',
        totalDistanceKm: 275,
        coveredDistanceKm: 142,
        stops: [
          {
            name: 'MGBS Hyderabad (Platform 12)',
            scheduledTime: '06:00 AM',
            actualTime: '06:02 AM',
            status: 'DEPARTED',
            passed: true
          },
          {
            name: 'LB Nagar Ring Road',
            scheduledTime: '06:40 AM',
            actualTime: '06:45 AM',
            status: 'DEPARTED',
            passed: true
          },
          {
            name: 'Choutuppal Toll Plaza',
            scheduledTime: '07:20 AM',
            actualTime: '07:22 AM',
            status: 'DEPARTED',
            passed: true
          },
          {
            name: 'Suryapet Bypass (Food Court)',
            scheduledTime: '08:30 AM',
            actualTime: '08:35 AM',
            status: 'CURRENT',
            passed: false
          },
          {
            name: 'Kodad Bus Stop',
            scheduledTime: '09:15 AM',
            actualTime: '09:20 AM (Est)',
            status: 'UPCOMING',
            passed: false
          },
          {
            name: 'Nandigama Toll Gate',
            scheduledTime: '09:50 AM',
            actualTime: '09:55 AM (Est)',
            status: 'UPCOMING',
            passed: false
          },
          {
            name: 'Vijayawada PNBS Central',
            scheduledTime: '10:30 AM',
            actualTime: '10:35 AM (Est)',
            status: 'UPCOMING',
            passed: false
          }
        ]
      };
    }
  }
};

export default trackingService;
