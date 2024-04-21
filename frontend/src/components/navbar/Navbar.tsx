import {
  Group,
  Title,
  Avatar,
  Button,
  Paper,
  Box,
  Popover,
  Stack,
} from '@mantine/core';
import { useStore } from '@nanostores/react';
// import classes from './Navbar.module.css';
import { $currUser } from '../../global-state/user';
import { Navigate, useNavigate } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';

export const Navbar = () => {
  const user = useStore($currUser);
  const redirect = useNavigate();

  if (user == null) {
    return <Navigate to="/login" />;
  }

  return (
    <Box w="100%" p="sm">
      <Paper w="100%" withBorder shadow="sm">
        <Group justify="space-between" m="0" p="sm" w="100%">
          <Group
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              redirect('/');
            }}
          >
            <img src="/Icon.svg" width="40px"></img>
            <Title order={1} size="1.5rem" fw="black">
              LLocalCaLL
            </Title>
          </Group>
          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button
                variant="subtle"
                leftSection={
                  <Avatar size={30} radius="sm">
                    {user?.name[0]}
                  </Avatar>
                }
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
