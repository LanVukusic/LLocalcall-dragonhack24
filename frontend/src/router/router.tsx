import { createBrowserRouter } from 'react-router-dom';
import App from '../views/Hello';
import { Authentication } from '../views/Auth';
import { DashBoard } from '../components/dashboard/Dashboard';

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
    ],
  },
  {
    path: '/auth',
    element: <Authentication />,
  },
]);
