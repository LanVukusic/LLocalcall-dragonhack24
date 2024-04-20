import { Group, Title, Text } from '@mantine/core';
// import classes from './Navbar.module.css';
import { IconUserCircle } from '@tabler/icons-react';

export const Navbar = () => {
  // const [opened, { toggle }] = useDisclosure();

  return (
    <Group
      justify="space-between"
      m="l"
      p="sm"
      bg="#F5F5F5"
      style={{ width: '100%', height: '100%' }}
    >
      <Title order={2} size={20}>
        ČinčilaAI
      </Title>
      <Group align="center">
        <IconUserCircle size={30} opacity={0.4} />
        <Text size="md">Jakob Mrak</Text>
      </Group>
    </Group>
  );
};
