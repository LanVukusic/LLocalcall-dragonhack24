import {
  Alert,
  Box,
  Button,
  Center,
  Container,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCircleKey } from '@tabler/icons-react';

import { $currUser } from '../global-state/user';
import { useStore } from '@nanostores/react';
import { Navigate, redirect } from 'react-router-dom';
import { useAuthControllerSignUp } from '../api/auth/auth';

export function Register() {
  const { mutateAsync, isPending, error } = useAuthControllerSignUp();
  const user = useStore($currUser);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  if (user != null) {
    return <Navigate to="/" />;
  }

  return (
    <Box h="100vh" w="100vw">
      <Center h="100vh" w="100%">
        <Container size={620} miw={440}>
          <Group align="baseline">
            <Text c="dimmed">
              <IconCircleKey />
            </Text>
            <Stack gap={'xs'}>
              <Title>SignUp</Title>
              <Text c="dimmed" py="md" maw="40ch">
                Create username and password for your new account
              </Text>
            </Stack>
          </Group>

          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={10}
            radius="md"
            pos="relative"
          >
            <LoadingOverlay visible={isPending} />

            <form
              onSubmit={form.onSubmit((values) => {
                return mutateAsync({
                  data: {
                    username: values.username,
                    password: values.password,
                  },
                }).then(() => {
                  redirect('/login');
                  // $currUser.set({
                  //   name: user.username,
                  //   transcripts: user.transcripts,
                  //   token: user.token || '',
                  // });
                });
              })}
            >
              <Stack>
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
                {error && (
                  <Alert title={error.message} color="red">
                    {error.response?.data.message}
                  </Alert>
                )}
                <Button fullWidth mt="xl" type="submit">
                  Register
                </Button>
              </Stack>
            </form>
          </Paper>
        </Container>
      </Center>
    </Box>
  );
}