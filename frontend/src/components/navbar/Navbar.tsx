import { Group, Title, Text, Avatar, Button } from '@mantine/core';
import { useStore } from '@nanostores/react';
// import classes from './Navbar.module.css';
import { $currUser } from '../../global-state/user';

export const Navbar = () => {
  // const [opened, { toggle }] = useDisclosure();

  const user = useStore($currUser);

  return (
    <Group
      justify="space-between"
      m="l"
      p="sm"
      bg="#F5F5F5"
      style={{ width: '100%' }}
    >
      <Title order={1} size="xl" c="orange">
        ČinčilaAI
      </Title>
      <Button
        variant="subtle"
        leftSection={<Avatar size={30}>{user?.name[0]}</Avatar>}
      >
        {user?.name}
      </Button>
    </Group>
  );
};
