import {  Group, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SideBar } from '../sidebar/SideBar';
import { useState } from 'react';
import MeetingsList from '../meeting/MeetingList';
import { useStore } from '@nanostores/react';
import { $currUser } from '../../global-state/user';


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

  const user = useStore($currUser);

  $currUser.set('John Doe');

  return (
    <Group
      style={{
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '0.1fr auto',
      }}
    >
      <SideBar
        span={1}
        opened={opened}
        handlers={handlers}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />
      <Stack m="40" ml="80" mr="80">
        <Title order={1}>Dashboard</Title>
        <MeetingsList meetings={meetings} />
      </Stack>
    </Group>
  );
};
