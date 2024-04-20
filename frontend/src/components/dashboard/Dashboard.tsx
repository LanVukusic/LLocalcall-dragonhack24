import { Group, ScrollArea, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SideBar } from '../sidebar/SideBar';
import { useEffect, useState } from 'react';
import MeetingsList from '../meetingList/MeetingList';
import { useStore } from '@nanostores/react';
import { $currUser } from '../../global-state/user';
import Meeting from '../meeting/Meeting';

const meetings = [
  {
    id: 0,
    title: 'Client Meeting',
    startTime: new Date(2024, 2, 18, 13, 0), // April 28, 2024, 1:00 PM
    endTime: new Date(2024, 2, 18, 14, 0), // April 28, 2024, 2:00 PM
    attendees: ['Olivia Martinez', 'James Brown', 'Sophia Davis'],
  },
  {
    id: 1,
    title: 'Project Kickoff Meeting',
    startTime: new Date(2024, 4, 19, 10, 0), // April 19, 2024, 10:00 AM
    endTime: new Date(2024, 4, 19, 11, 0), // April 19, 2024, 11:00 AM
    attendees: ['John Doe', 'Jane Smith', 'Michael Lee'],
  },
  {
    id: 2,
    title: 'Brainstorming Session',
    startTime: new Date(2024, 4, 22, 14, 0), // April 22, 2024, 2:00 PM
    endTime: new Date(2024, 4, 22, 15, 0), // April 22, 2024, 3:00 PM
    attendees: ['Alice Johnson', 'Bob Williams', 'Emily Brown'],
  },
  {
    id: 3,
    title: 'Team Progress Update',
    startTime: new Date(2024, 4, 25, 9, 30), // April 25, 2024, 9:30 AM
    endTime: new Date(2024, 4, 25, 10, 30), // April 25, 2024, 10:30 AM
    attendees: ['David Chen', 'Sarah Miller', 'William Garcia'],
  },
  // live meeting
  {
    id: 4,
    title: 'Sprint Planning Meeting',
    startTime: new Date(2024, 4, 26, 13, 0), // April 26, 2024, 1:00 PM
    endTime: new Date(2024, 4, 26, 14, 0), // April 26, 2024, 2:00 PM
    attendees: ['Olivia Martinez', 'James Brown', 'Sophia Davis'],
  },
];

export const DashBoard = () => {
  const [opened, handlers] = useDisclosure(false);
  const [selectedRoom, setSelectedRoom] = useState(0);

  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(
    null,
  );

  const [page, setPage] = useState('dashboard');

  useEffect(() => {
    if (selectedMeetingId === null) {
      setPage('dashboard');
    } else {
      setPage('meeting');
    }
  }, [selectedMeetingId]);

  // const user = useStore($currUser);

  // $currUser.set('John Doe');

  return (
    <Group p="0" m="0" display="grid" style={{ gridTemplateColumns: '0.1fr 1fr' }}>
      <SideBar
        opened={opened}
        handlers={handlers}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />
      <ScrollArea h="100%">

        <Stack mr="lg" ml="lg"  align="top" h="100vh" style={{overflow: "hidden"}}>
          {page === 'dashboard' ? (
            <MeetingsList
              meetings={meetings}
              setSelectedMeetingId={setSelectedMeetingId}
              
            />
          ) : (
            <Meeting
              meetingId={selectedMeetingId}
              setSelectedMeetingId={setSelectedMeetingId}
            />
          )}
        </Stack>
      </ScrollArea>
    </Group>
  );
};
