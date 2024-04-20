import {
  Box,
  Button,
  Center,
  Container,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCircleKey } from '@tabler/icons-react';
import { useAuthControllerSignIn } from '../api/default/default';

export function Authentication() {
  const { mutateAsync, isPending } = useAuthControllerSignIn();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Box h="100vh" w="100vw">
      <Center h="100vh" w="100%">
        <Container size={620} miw={440}>
          <Group align="baseline">
            <Text c="dimmed">
              <IconCircleKey></IconCircleKey>
            </Text>
            <Title>Login</Title>
          </Group>

          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="md"
            pos="relative"
          >
            <LoadingOverlay visible={isPending} />
            <form
              onSubmit={form.onSubmit(async (values) => {
                console.log(values);
                mutateAsync({
                  data: {
                    username: values.username,
                    password: values.password,
                  },
                });
              })}
            >
              <TextInput
                label="Email"
                placeholder="you@name.com"
                required
                {...form.getInputProps('username')}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                {...form.getInputProps('password')}
              />

              <Button fullWidth mt="xl" type="submit">
                Sign in
              </Button>
            </form>
          </Paper>
        </Container>
      </Center>
    </Box>
  );
}
