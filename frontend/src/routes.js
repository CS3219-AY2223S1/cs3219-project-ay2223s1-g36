import { useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import RoomLayout from './layouts/room';

import Dashboard from './pages/Dashboard';
import Room from './pages/Room';
import SignupPage from './pages/Signup';

export default function Router() {
  return useRoutes([
    {
      path: '/room',
      element: <RoomLayout />,
      children: [{ path: '', element: <Room /> }]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [{ path: '', element: <Dashboard /> }]
    },
    {
      path: '/signup',
      element: <SignupPage />,
      children: [{ path: '*', element: <SignupPage /> }]
    }
  ]);
}
