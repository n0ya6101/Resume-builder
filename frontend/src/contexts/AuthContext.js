import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      const { token, ...userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log('🔧 register() called with:', userData);
      const response = await authAPI.register(userData);
      console.log('✅ register() response:', response);

      const { token, ...rest } = response.data;

      // Create user object from response (rest contains id, firstName, lastName, email, maybe type)
      const userObj = rest;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userObj));
      setUser(userObj);

      return { success: true };
    } catch (error) {
      // Normalize the error message: backend sometimes returns a plain string body
      console.error('❌ register() error:', error);
      const data = error.response?.data;
      let message = 'Registration failed';

      if (data) {
        if (typeof data === 'string') {
          message = data;
        } else if (data.message) {
          message = data.message;
        } else if (data.errors) {
          // Spring validation errors might be in a map/object
          try {
            message = JSON.stringify(data.errors);
          } catch (e) {
            message = String(data);
          }
        } else {
          // fallback to stringifying the response body
          try { message = JSON.stringify(data); } catch (e) { message = String(data); }
        }
      } else if (error.message) {
        message = error.message;
      }

      return {
        success: false,
        message
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};