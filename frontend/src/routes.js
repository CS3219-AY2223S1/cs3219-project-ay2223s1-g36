import { useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import MatchLayout from './layouts/match';
import RoomLayout from './layouts/room';

import Dashboard from './pages/Dashboard';
import Match from './pages/Match';
import Room from './pages/Room';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';

export default function Router() {
  return useRoutes([
    {
      path: '/match',
      element: <MatchLayout />,
      children: [{ path: '', element: <Match /> }]
    },
    {
      path: '/room',
      element: <RoomLayout />,
      children: [{ path: '', element: <Room /> }]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [{ path: '', element: <Dashboard /> }]
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
