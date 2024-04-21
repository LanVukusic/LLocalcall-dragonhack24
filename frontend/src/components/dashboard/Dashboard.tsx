import { Flex, ScrollArea, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SideBar } from '../sidebar/SideBar';
import { useState } from 'react';
import { MeetingsList } from '../meetingList/MeetingList';

import { useRoomsControllerFindAll } from '../../api/rooms/rooms';

export const DashBoard = () => {
  const [opened, handlers] = useDisclosure(false);
  const {
    data: rooms,
    isLoading: loadingRooms,
    refetch,
  } = useRoomsControllerFindAll();

  const [selectedRoomId, setSelectedRoom] = useState<number | null>(
    rooms && rooms[0].id ? rooms[0].id : null,
  );

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
        refetch={refetch}
      />

      <Stack w="100%" py="md">
        <ScrollArea h="100%" type="always" w="100%">
          <MeetingsList roomId={selectedRoomId || 0} />
          {/*                 
              // <MeetingView
              //   meetingId={selectedMeetingId || -1}
              //   setSelectedMeetingId={setSelectedMeetingId}
              // /> */}
        </ScrollArea>
      </Stack>
    </Flex>
  );
};
