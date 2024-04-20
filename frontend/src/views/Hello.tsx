import { Button, Group, Paper, Stack } from '@mantine/core';
import { openTypedModal } from '../mantine/modals/modals-utils';
import { notifications } from '@mantine/notifications';
import { spotlight } from '@mantine/spotlight';

function App() {
  return (
    <Stack>
      <Paper p="xl">
        <Group>
          <Button
            onClick={() => {
              spotlight.open();
            }}
          >
            Open spotlight
          </Button>
          <Button
            onClick={() => {
              notifications.show({
                message: 'im a notif',
              });
            }}
          >
            Push notification
          </Button>
          <Button
            onClick={() => {
              openTypedModal({
                modal: 'testName',
                title: 'test name modal',
                body: {
                  modalBody: 'ojla',
                },
              });
            }}
          >
            Open modal
          </Button>
        </Group>
      </Paper>
    </Stack>
  );
}

export default App;
