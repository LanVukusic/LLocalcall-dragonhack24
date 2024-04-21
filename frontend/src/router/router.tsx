import { createBrowserRouter } from 'react-router-dom';
import App from '../views/Hello';
import { Authentication } from '../views/Login';
import { DashBoard } from '../components/dashboard/Dashboard';
import { Register } from '../views/Register';
import Room from '../views/Video';
import { TranscriptView } from '../views/TrascriptView';
import { MeetingView } from '../components/meeting/MeetingView';

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
        path: '/transcript/:transcriptId',
        element: <TranscriptView />,
      },
      {
        path: '/meeting/:meetingId',
        element: <MeetingView />,
      },
      {
        path: '/video/:meetingId',
        element: <Room />,
      },
    ],
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
