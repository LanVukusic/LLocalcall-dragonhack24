import { Badge, Button, LoadingOverlay, Stack, TextInput } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useRoomsControllerCreate } from '../../api/rooms/rooms';
import { useForm } from '@mantine/form';

const Test = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => {
  return (
    <Stack>
      {innerProps.modalBody}
      <Badge>{id}</Badge>
      <Button
        onClick={() => {
          context.closeModal(id);
        }}
      >
        close
      </Button>
    </Stack>
  );
};

const Test2 = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalPrice: number }>) => {
  return (
    <Stack>
      {innerProps.modalPrice}
      {id}
      <Button
        onClick={() => {
          context.closeModal(id);
        }}
      >
        close
      </Button>
    </Stack>
  );
};

const CreateRoom = ({
  context,
  id,
}: ContextModalProps<{ modalPrice: number }>) => {
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
            }).then((data) => {
              console.log(data);
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
  testName: Test,
  test2name: Test2,
  createRoom: CreateRoom,
} as const;
