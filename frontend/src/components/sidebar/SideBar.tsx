import {
  ActionIcon,
  Alert,
  Button,
  Group,
  LoadingOverlay,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconMenu } from '@tabler/icons-react';
import { openTypedModal } from '../../mantine/modals/modals-utils';
import { useRoomsControllerFindAll } from '../../api/rooms/rooms';

type SideBarProps = {
  opened: boolean;
  handlers: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
  selectedRoom: number;
  setSelectedRoom: (room: number) => void;
};

export const SideBar = ({
  opened,
  handlers,
  selectedRoom,
  setSelectedRoom,
}: SideBarProps) => {
  const setRoom = (room: number) => {
    setSelectedRoom(room);
  };

  const { data: rooms, isLoading: loadingRooms } = useRoomsControllerFindAll();

  return (
    <Stack
      h="100%"
      p="md"
      style={{
        overflow: 'auto',
        width: opened ? '300px' : '100px',
        backgroundColor: opened ? '#F5F5F5' : 'white',
        transition: 'width 0.3s',
      }}
      pos="relative"
      align="left"
    >
      <LoadingOverlay visible={loadingRooms} />
      {opened ? (
        <Stack justify="space-between" h="100%">
          <Group justify="space-between" w="100%" h="100%">
            <Stack w="100%" h="100%">
              <Group align="center" justify="space-between" w="100%">
                {/* <IconDoor size={20} style={{ textAlign: 'center' }} /> */}
                <Title order={2} c="teal.6">
                  Rooms
                </Title>
                <ActionIcon onClick={handlers.close} variant="subtle">
                  <IconMenu size={30} />
                </ActionIcon>
              </Group>
              {rooms &&
                rooms.map((room) => {
                  return (
                    <Text
                      key={room.id}
                      ml="20"
                      m="5"
                      onClick={() => setRoom(0)}
                      style={{
                        fontWeight: selectedRoom === 0 ? 'bold' : 'normal',
                      }}
                    >
                      Room 1
                    </Text>
                  );
                })}

              {rooms && rooms.length == 0 && (
                <Alert mt="auto" title="Its empty here" w="100%">
                  <Stack>Add new room</Stack>
                </Alert>
              )}
            </Stack>
          </Group>
          <Button
            onClick={() => {
              openTypedModal({
                modal: 'testName',
                title: 'Create Room',
                body: {
                  modalBody: 'Create Room Body',
                },
              });
            }}
          >
            Create Room
          </Button>
        </Stack>
      ) : (
        <ActionIcon onClick={handlers.open} variant="subtle" size="lg">
          <IconMenu size={30} onClick={handlers.open} />
        </ActionIcon>
      )}
    </Stack>
  );
};
