import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children, redirectPath = '/welcome/login' }) => {
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      return <Navigate replace to={redirectPath} />;
    }
  }, [user]);
  return children;
};
