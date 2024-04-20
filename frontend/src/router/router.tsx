import { createBrowserRouter } from 'react-router-dom';
import App from '../views/Hello';
import { Authentication } from '../views/Auth';
import { DashBoard } from '../components/dashboard/Dashboard';
import Room from '../views/Video';

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
        path: '/video',
        element: <Room match={{ params: { roomID: 'dsa' } }} />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Authentication />,
  },
]);
