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
import { useStore } from '@nanostores/react';
import { Navigate } from 'react-router-dom';
import { $currUser } from '../global-state/user';
import { useAuthControllerSignIn } from '../api/auth/auth';

export function Authentication() {
  const { mutateAsync, isPending, error } = useAuthControllerSignIn();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const user = useStore($currUser);

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
                }).then((data) => {
                  const token = data.access_token;
                  $currUser.set({
                    name: values.username,
                    token: token,
                    transcripts: [],
                  });
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
                  Sign in
                </Button>

                <Group>
                  <Text></Text>
                </Group>
              </Stack>
            </form>
          </Paper>
        </Container>
      </Center>
    </Box>
  );
}
