import {
  Box,
  Button,
  Center,
  Container,
  Group,
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
  const {mutateAsync} = useAuthControllerSignIn();
  
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  // redirect if logged in
  // return <Navigate to="/"></Navigate>;

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

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form
              onSubmit={form.onSubmit(async (values) => {
                console.log(values);
                mutateAsync({
                  data:{
                    username: values.email,
                    password: values.password
                  }
                })
              })}
            >
              <TextInput
                label="Email"
                placeholder="you@mantine.dev"
                required
                {...form.getInputProps('email')}
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
