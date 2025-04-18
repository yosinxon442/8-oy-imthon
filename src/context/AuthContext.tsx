import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  phone: string;
  access: string;
  refresh: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'https://s-libraries.uz/api/v1/auth/';
const LOCAL_STORAGE_KEY = 'user';

// Helper: Get user from localStorage
const getUserFromStorage = (): User | null => {
  const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

// Helper: Save user to localStorage
const saveUserToStorage = (user: User) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
};

// Helper: Clear user from localStorage
const clearUserFromStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getUserFromStorage());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (user) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.access}`;
        const refreshSuccess = await refreshToken();
        if (!refreshSuccess) logout();
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const refreshToken = async (): Promise<boolean> => {
    try {
      if (!user) throw new Error('No user to refresh token');
      const response = await axios.post(`${API_URL}token/refresh/`, {
        refresh: user.refresh,
      });
      const updatedUser = { ...user, access: response.data.access };
      saveUserToStorage(updatedUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Token refresh failed', error);
      logout();
      return false;
    }
  };

  const login = async (phone: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}login/`, { phone, password });
      const userData: User = {
        phone,
        access: response.data.access,
        refresh: response.data.refresh,
      };
      saveUserToStorage(userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      setUser(userData);
      return true;
    } catch (error: any) {
      console.error('Login failed', error.response || error.message);
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    clearUserFromStorage();
    delete axios.defaults.headers.common['Authorization'];
  };

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshSuccess = await refreshToken();
          if (refreshSuccess) {
            originalRequest.headers['Authorization'] = `Bearer ${user?.access}`;
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};
