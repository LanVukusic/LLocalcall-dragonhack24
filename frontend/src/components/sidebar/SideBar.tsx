import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { openTypedModal } from '../../mantine/modals/modals-utils';

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

  return (
    <Stack
      p="20"
      style={{
        height: '100vh',
        overflow: 'auto',
        width: opened ? '300px' : '100px',
        backgroundColor: opened ? '#F5F5F5' : 'white',
        transition: 'width 0.3s',
      }}
      align="left"
    >
      {opened ? (
        <Stack justify="space-between" h="100%">
          <Group justify="space-between">
            <Stack ml="20" st>
              <Group align="center">
                {/* <IconDoor size={20} style={{ textAlign: 'center' }} /> */}
                <Title size={20} mb="20">
                  Rooms
                </Title>
              </Group>

              <Text
                ml="20"
                m="5"
                onClick={() => setRoom(0)}
                style={{ fontWeight: selectedRoom === 0 ? 'bold' : 'normal' }}
              >
                Room 1
              </Text>
              <Text
                ml="20"
                m="5"
                onClick={() => setRoom(1)}
                style={{ fontWeight: selectedRoom === 1 ? 'bold' : 'normal' }}
              >
                Room 2
              </Text>

              <Text
                ml="20"
                m="5"
                onClick={() => setRoom(2)}
                style={{ fontWeight: selectedRoom === 2 ? 'bold' : 'normal' }}
              >
                Room 3
              </Text>
            </Stack>
            <Button onClick={handlers.close} color="#F5F5F5">
              <IconArrowLeft size={30} color="gray" />
            </Button>
          </Group>
          <Button
            onClick={() => {
              openTypedModal({
                modal: 'testName',
                title: 'Create Room',
                body: {
                  modalBody: 'Create Room Body'
                },
              });
            }}
          >
            Create Room
          </Button>
        </Stack>
      ) : (
        <Button onClick={handlers.open} variant="white" color="gray">
          <IconArrowRight size={30} onClick={handlers.open} />
        </Button>
      )}
    </Stack>
  );
};
