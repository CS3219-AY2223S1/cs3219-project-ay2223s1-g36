import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children, redirectPath = '/login' }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate replace to={redirectPath} />;
  }
  return children;
};
