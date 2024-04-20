import { Stack } from '@mantine/core';
import { Navbar } from '../components/navbar/Navbar';

import { Outlet } from 'react-router-dom';
// import { openTypedModal } from '../mantine/modals/modals-utils';
// import { notifications } from '@mantine/notifications';
// import { spotlight } from '@mantine/spotlight';

function App() {
  return (
    <Stack h="100%" gap="0">
      <Navbar />
      <Outlet />
      {/* <Footer/> */}
    </Stack>
  );
}

export default App;
