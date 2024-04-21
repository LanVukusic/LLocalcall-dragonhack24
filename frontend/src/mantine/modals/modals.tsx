import { Button, LoadingOverlay, Stack, TextInput } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import {
  useRoomsControllerCreate,
  useRoomsControllerCreateMeeting,
} from '../../api/rooms/rooms';
import { useForm } from '@mantine/form';
import { NavigateFunction } from 'react-router-dom';

const CreateMeeting = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  roomId: number;
  refetch: () => void;
  redirect: NavigateFunction;
}>) => {
  const { mutateAsync, isPending } = useRoomsControllerCreateMeeting();

  const form = useForm({
    initialValues: {
      name: '',
      startTime: '',
      duration: 0,
    },
  });

  function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    // const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} `;
  }

  return (
    <Stack>
      <LoadingOverlay visible={isPending} />
      <form
        onSubmit={form.onSubmit(async (values) => {
          await mutateAsync({
            data: {
              name: values.name.toString(),
              startTime: formatDate(Date.now()),
              duration: values.duration,
            },
            id: innerProps.roomId.toString(),
          })
            .then((data) => {
              // innerProps.redirect(`/video/${data.id}`);
              innerProps.refetch();
            })
            .finally(() => {
              context.closeModal(id);
            });
        })}
      >
        <TextInput
          label="Name"
          placeholder="Meeting name"
          required
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Meeting duration (minutes)"
          placeholder="Meeting duration"
          required
          mt="md"
          {...form.getInputProps('duration')}
        />
        <Button fullWidth mt="xl" type="submit">
          Create meeting
        </Button>
      </form>
    </Stack>
  );
};

const CreateRoom = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ refetch: () => void }>) => {
  const { mutateAsync, isPending } = useRoomsControllerCreate();

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
    },
  });

  return (
    <Stack>
      <Stack>
        <LoadingOverlay visible={isPending} />
        <form
          onSubmit={form.onSubmit(async (values) => {
            await mutateAsync({
              data: {
                name: values.name,
                description: values.description,
              },
            }).then(() => {
              innerProps.refetch();
            });
            context.closeModal(id);
          })}
        >
          <TextInput
            label="Name"
            placeholder="Room name"
            required
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Description"
            placeholder="Room description"
            required
            mt="md"
            {...form.getInputProps('description')}
          />
          <Button fullWidth mt="xl" type="submit">
            Create room
          </Button>
        </form>
      </Stack>
    </Stack>
  );
};

export const mantineModals = {
  createRoom: CreateRoom,
  createMeeting: CreateMeeting,
} as const;
