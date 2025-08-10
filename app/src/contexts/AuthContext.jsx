import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiService.login(email, password);
      if (response.success) {
        setCurrentUser(response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true };
      }
      return response;
    } catch (error) {
      return { success: false, message: 'Giriş yapılamadı' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiService.register(userData);
      return response;
    } catch (error) {
      return { success: false, message: 'Kayıt yapılamadı' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
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
}
