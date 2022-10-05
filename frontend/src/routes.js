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
import PageNotFound from './pages/PageNotFound';

import { ProtectedRoute } from './components/ProtectedRoute';

export default function Router() {
  return useRoutes([
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
      children: [
        {
          path: '',
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          )
        },
        {
          path: 'profile',
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          )
        }
      ]
    },
    {
      path: '/match',
      element: <MatchLayout />,
      children: [
        {
          path: '',
          element: (
            <ProtectedRoute>
              <Match />
            </ProtectedRoute>
          )
        }
      ]
    },
    {
      path: '/room',
      element: <RoomLayout />,
      children: [
        {
          path: '',
          element: (
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          )
        }
      ]
    },
    {
      path: '*',
      element: <PageNotFound />,
      children: [{ path: '*', element: <PageNotFound /> }]
    }
  ]);
}
