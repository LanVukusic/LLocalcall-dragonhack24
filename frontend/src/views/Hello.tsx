import { Box, Stack } from '@mantine/core';
import { Navbar } from '../components/navbar/Navbar';

import { Outlet } from 'react-router-dom';
// import { openTypedModal } from '../mantine/modals/modals-utils';
// import { notifications } from '@mantine/notifications';
// import { spotlight } from '@mantine/spotlight';

function App() {
  return (
    <Stack style={{ height: '100vh', overflow: 'hidden' }} gap="0">
      <Navbar />
      <Box h="100%" style={{ overflow: 'hidden' }}>
        <Outlet />
      </Box>
      {/* <Footer/> */}
    </Stack>
  );
}

export default App;
