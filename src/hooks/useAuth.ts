import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export const useLogin = () => {
  const { login } = useAuthContext();
  return login;
};

export const useLogout = () => {
  const { logout } = useAuthContext();
  return logout;
};

export const useAuthStatus = () => {
  const { user, isAuthenticated, isLoading } = useAuthContext();
  return { user, isAuthenticated, isLoading };
};

export const useProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStatus();
  const navigate = useNavigate();

  return useCallback(
    (redirectPath = '/login') => {
      if (!isLoading && !isAuthenticated) navigate(redirectPath);
      return isAuthenticated;
    },
    [isAuthenticated, isLoading, navigate]
  );
};
