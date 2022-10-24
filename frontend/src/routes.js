import { Navigate, useRoutes } from 'react-router-dom';
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
import History from './pages/History';
import PastAttempt from './pages/PastAttempt';
import PageNotFound from './pages/PageNotFound';

import { ProtectedRoute } from './components/ProtectedRoute';

export default function Router() {
  return useRoutes([
    {
      path: '/welcome',
      element: <WelcomeLayout />,
      children: [
        {
          path: '/welcome',
          element: <Navigate replace to={'/welcome/login'} />
        },
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
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'history',
          element: <History />
        },
        {
          path: 'profile',
          element: <ProfilePage />
        }
      ]
    },
    {
      path: '/match',
      element: (
        <ProtectedRoute>
          <MatchLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '',
          element: <Match />
        }
      ]
    },
    {
      path: '/room',
      element: (
        <ProtectedRoute>
          <RoomLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '',
          element: <Room />
        }
      ]
    },
    {
      path: '/attempt',
      element: (
        <ProtectedRoute>
          <AttemptLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '',
          element: <PastAttempt />
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
