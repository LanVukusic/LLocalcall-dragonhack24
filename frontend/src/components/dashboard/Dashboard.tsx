import { Flex, LoadingOverlay, ScrollArea, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SideBar } from '../sidebar/SideBar';
import { useEffect, useState } from 'react';
import { MeetingsList } from '../meetingList/MeetingList';

// import { useMeetingsControllerUpdate } from '../../api/meetings/meetings';
import {
  useRoomsControllerFindAll,
  useRoomsControllerGetMeetings,
} from '../../api/rooms/rooms';
import type { Meeting } from '../../api/model';

const meetings_dummy: Meeting[] = [
  {
    id: 1,
    name: 'Meeting 1',
    startTime: new Date().toISOString(),
    transcripts: [],
    duration: 0,
    room: {
      createdBy: {
        id: 1,
        password: 'string;',
        transcripts: [],
        username: 'testuser',
      },
      description: 'string',
      id: 2,
      meetings: [],
      name: '2112',
    },
  },
];

export const DashBoard = () => {
  const [opened, handlers] = useDisclosure(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(
    null,
  );
  const [page, setPage] = useState('dashboard');
  const { data: rooms, isLoading: loadingRooms } = useRoomsControllerFindAll();

  const [selectedRoomId, setSelectedRoom] = useState<number | null>(
    rooms && rooms[0].id ? rooms[0].id : null,
  );

  const { data, isLoading } = useRoomsControllerGetMeetings(
    selectedRoomId?.toString() || '',
  );

  useEffect(() => {
    if (selectedMeetingId === -1 || selectedMeetingId === null) {
      setPage('dashboard');
    } else {
      setPage('meeting');
    }
  }, [selectedMeetingId]);

  return (
    <Flex
      h="100%"
      style={{
        overflow: 'hidden',
      }}
    >
      <SideBar
        opened={opened}
        handlers={handlers}
        selectedRoom={selectedRoomId || -1}
        setSelectedRoom={setSelectedRoom}
        loadingRooms={loadingRooms}
        rooms={rooms}
      />

      <Stack w="100%" py="md">
        <ScrollArea h="100%" type="always" w="100%">
          <Stack>
            {page === 'dashboard' ? (
              <>
                <LoadingOverlay visible={isLoading} />
                <MeetingsList
                  meetings={data || meetings_dummy}
                  setSelectedMeetingId={setSelectedMeetingId}
                />
              </>
            ) : (
              <MeetingView
                meetingId={selectedMeetingId || -1}
                setSelectedMeetingId={setSelectedMeetingId}
              />
            )}
          </Stack>
        </ScrollArea>
      </Stack>
    </Flex>
  );
};
