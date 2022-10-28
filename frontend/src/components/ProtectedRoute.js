import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children, redirectPath = '/welcome/login' }) => {
  const { user, checkAuth } = useAuth();
  if (!user || !checkAuth(user)) {
    return <Navigate replace to={redirectPath} />;
  }
  return children;
};
