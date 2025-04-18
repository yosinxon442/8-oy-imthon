import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

// API base URL
const API_URL = 'https://e-libraries.uz/api/v1';

interface User {
  id: string;
  phone: string;
  name: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (phone: string, password: string) => Promise<void>;
  logout: () => void;
  register: (phone: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (phone: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login/`, {
        phone,
        password
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      // API dan kelgan access va refresh tokenlarni olish
      const { access, refresh } = response.data;

      const userData = {
        id: '1', // Backenddan kelgan user ID
        phone,
        name: 'User', // Backenddan kelgan user name
        token: access
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('refresh_token', refresh);
      
      // Set default Authorization header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      }
      throw new Error('Network error occurred');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const register = async (phone: string, password: string, name: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register/`, {
        phone,
        password,
        name
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const { access, refresh } = response.data;

      const userData = {
        id: '1', // Backenddan kelgan user ID
        phone,
        name,
        token: access
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('refresh_token', refresh);
      
      // Set default Authorization header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Registration failed');
      }
      throw new Error('Network error occurred');
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 