import api from './api';

export const authService = {
  // Login passenger or admin
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data && response.data.token) {
      localStorage.setItem('tgsrtc_token', response.data.token);
      localStorage.setItem('tgsrtc_user', JSON.stringify(response.data.user || response.data));
    }
    return response.data;
  },

  // Register new passenger
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('tgsrtc_token');
    localStorage.removeItem('tgsrtc_user');
  },

  // Request password reset token
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset password using token
  resetPassword: async (resetData) => {
    const response = await api.post('/auth/reset-password', resetData);
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Update profile
  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },

  // Get stored user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('tgsrtc_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  // Check if token exists
  isAuthenticated: () => {
    return !!localStorage.getItem('tgsrtc_token');
  }
};

export default authService;
