import { useRoutes } from 'react-router-dom';
import WelcomeLayout from './layouts/welcome';
import DashboardLayout from './layouts/dashboard';
import MatchLayout from './layouts/match';
import RoomLayout from './layouts/room';
import AttemptLayout from './layouts/history';

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
      path: '/welcome',
      element: <WelcomeLayout />,
      children: [
        {
          path: '/welcome/signup',
          element: <SignupPage />
        },
        {
          path: '/welcome/login',
          element: <LoginPage />
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'dashboard',
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
