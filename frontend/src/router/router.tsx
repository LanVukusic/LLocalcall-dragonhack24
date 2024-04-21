import { createBrowserRouter } from 'react-router-dom';
import App from '../views/Hello';
import { Authentication } from '../views/Login';
import { DashBoard } from '../components/dashboard/Dashboard';
import { Register } from '../views/Register';
import Room from '../views/Video';
import { TranscriptView } from '../views/TranscriptView';
import { SummaryView } from '../views/SummaryView';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // <ProtectedPath redirectUrl="/auth">
      <App />
      // </ProtectedPath>
    ),
    children: [
      {
        path: '/',
        element: <DashBoard />,
      },
      {
        path: '/meeting/:meetingId/transcript',
        element: <TranscriptView />,
      },
      {
        path: '/meeting/:meetingId/summary',
        element: <SummaryView />,
      },
    ],
  },
  {
    path: '/video',
    element: <Room />,
  },
  {
    path: '/login',
    element: <Authentication />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);
