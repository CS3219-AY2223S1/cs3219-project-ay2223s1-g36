import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children, redirectPath = '/welcome/login' }) => {
  const { user, checkAuth } = useAuth();
  useEffect(() => {
    if (!user || !checkAuth(user.username)) {
      return <Navigate replace to={redirectPath} />;
    }
  }, []);
  return children;
};
