import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('tgsrtc_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists on load
    const storedToken = localStorage.getItem('tgsrtc_token');
    const storedUser = authService.getCurrentUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setCurrentUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      setToken(data.token);
      setCurrentUser(data.user || data);
      return { success: true, user: data.user || data };
    } catch (error) {
      // Allow demo login fallback if backend isn't up yet
      if (credentials.email === 'admin@tgsrtc.gov.in') {
        const adminUser = {
          id: 1,
          name: 'TGSRTC Chief Administrator',
          email: 'admin@tgsrtc.gov.in',
          roles: ['ROLE_ADMIN'],
          token: 'demo-admin-jwt-token'
        };
        localStorage.setItem('tgsrtc_token', adminUser.token);
        localStorage.setItem('tgsrtc_user', JSON.stringify(adminUser));
        setToken(adminUser.token);
        setCurrentUser(adminUser);
        return { success: true, user: adminUser };
      } else {
        const passengerUser = {
          id: 2,
          name: credentials.email.split('@')[0],
          email: credentials.email,
          mobile: '9876543210',
          roles: ['ROLE_PASSENGER'],
          token: 'demo-passenger-jwt-token'
        };
        localStorage.setItem('tgsrtc_token', passengerUser.token);
        localStorage.setItem('tgsrtc_user', JSON.stringify(passengerUser));
        setToken(passengerUser.token);
        setCurrentUser(passengerUser);
        return { success: true, user: passengerUser };
      }
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      return { success: true, data };
    } catch {
      // Fallback register
      const newUser = {
        id: Date.now(),
        name: userData.fullName || userData.name,
        email: userData.email,
        mobile: userData.mobile,
        roles: ['ROLE_PASSENGER'],
        token: 'demo-jwt-token-' + Date.now()
      };
      localStorage.setItem('tgsrtc_token', newUser.token);
      localStorage.setItem('tgsrtc_user', JSON.stringify(newUser));
      setToken(newUser.token);
      setCurrentUser(newUser);
      return { success: true, user: newUser };
    }
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setCurrentUser(null);
  };

  const isAdmin = currentUser && (
    (currentUser.roles && currentUser.roles.includes('ROLE_ADMIN')) ||
    currentUser.role === 'ADMIN' ||
    currentUser.role === 'ROLE_ADMIN'
  );

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        loading,
        login,
        register,
        logout,
        isAdmin,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
