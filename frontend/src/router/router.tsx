import { createBrowserRouter } from 'react-router-dom';
import App from '../views/Hello';
import { Authentication } from '../views/Auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // <ProtectedPath redirectUrl="/auth">
      <App />
      // </ProtectedPath>
    ),
  },
  {
    path: '/auth',
    element: <Authentication />,
  },
]);
