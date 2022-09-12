import { useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';

import Dashboard from './pages/Dashboard';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [{ path: 'dashboard', element: <Dashboard /> }]
    },
    {
      path: '/signup',
      element: <SignupPage />,
      children: [{ path: '*', element: <SignupPage /> }]
    },
    {
      path: '/login',
      element: <LoginPage />,
      children: [{ path: '*', element: <LoginPage /> }]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [{ path: 'profile', element: <ProfilePage /> }]
    }
  ]);
}
