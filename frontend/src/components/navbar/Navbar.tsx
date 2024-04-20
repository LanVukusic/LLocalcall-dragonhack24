import {
  Group,
  Title,
  Avatar,
  Button,
  Paper,
  Box,
  Popover,
  Text,
  Stack,
} from '@mantine/core';
import { useStore } from '@nanostores/react';
// import classes from './Navbar.module.css';
import { $currUser } from '../../global-state/user';
import { Navigate } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';

export const Navbar = () => {
  // const [opened, { toggle }] = useDisclosure();

  const user = useStore($currUser);

  if (user == null) {
    return <Navigate to="/login" />;
  }

  return (
    <Box w="100%" p="sm">
      <Paper w="100%" withBorder shadow="sm">
        <Group justify="space-between" m="0" p="sm" w="100%">
          <Title
            order={1}
            size="1.5rem"
            fw="bold"
            style={{
              fontFamily: 'monospace',
            }}
          >
            LLocal - Call
          </Title>
          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button
                variant="subtle"
                leftSection={<Avatar size={30}>{user?.name[0]}</Avatar>}
              >
                {user?.name}
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Stack>
                <Button
                  onClick={() => {
                    $currUser.set(null);
                  }}
                  size="xs"
                  color="black"
                  variant="subtle"
                  rightSection={<IconLogout size="15" />}
                >
                  Logout
                </Button>
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Paper>
    </Box>
  );
};
