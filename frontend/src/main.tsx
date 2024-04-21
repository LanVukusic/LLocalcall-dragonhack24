import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { mantineModals } from './mantine/modals/modals.tsx';
import { mantineTheme } from './mantine/theme.ts';
import { router } from './router/router.tsx';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import { CustomSpotlight } from './mantine/spotlight.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider theme={mantineTheme}>
      <Notifications />
      <CustomSpotlight />
      <ModalsProvider modals={mantineModals}>
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  </QueryClientProvider>,
);
