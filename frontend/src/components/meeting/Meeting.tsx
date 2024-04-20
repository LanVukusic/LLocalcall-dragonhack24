import React, { useState } from 'react';
import {
  Card,
  Grid,
  Group,
  
  Stack,
  Title,
  Text,
  Avatar,
  Badge,
  Button,
} from '@mantine/core';

import { IconDoorExit, IconMaximize, IconMinimize } from '@tabler/icons-react';

interface MeetingProps {
    meetingId: number;
    setSelectedMeetingId: React.Dispatch<React.SetStateAction<number | null>>
}

const Meeting = ({ meetingId, setSelectedMeetingId }: MeetingProps ) => {
  const [gridSize, setGridSize] = useState(2); // Initial grid size (2x2)
    console.log(meetingId);
  const toggleGridSize = () => {
    setGridSize((prevSize) => (prevSize === 2 ? 1 : 2));
  };

  const attendees = [
    {
      id: 1,
      name: 'Alice Johnson',
      muted: false,
    },
    {
      id: 2,
      name: 'Bob Williams',
      muted: true,
    },
    {
      id: 3,
      name: 'Emily Brown',
      muted: false,
    },
    {
      id: 4,
      name: 'David Chen',
      muted: false,
    },
    {
      id: 5,
      name: 'Sarah Miller',
      muted: true,
    },
    
  ];

  return (
    <Stack mt="60">
      <Group p="10">
        <Title order={2}>Meeting Title</Title>
        <Button onClick={toggleGridSize}>
          {gridSize === 2 ? <IconMinimize size={20} /> : <IconMaximize size={20} />}
        </Button>
        <Button><IconDoorExit onClick={() => {
            setSelectedMeetingId(null);
        }} /></Button>
      </Group>
      <Grid grow pb="md">
        {attendees.map((attendee) => (
          <Grid.Col key={attendee.id} span={gridSize === 2 ? 1 : 2}>
            <Card shadow="md" radius="md" withBorder p={10}>
              <Stack>
                <Avatar src={`https://avatars.dicebear.com/api/adventurer/${attendee.name}.svg`} size={60} />
                <Stack>
                  <Text>{attendee.name}</Text>
                  {attendee.muted && (
                    <Badge color="gray" variant="light">
                      Muted
                    </Badge>
                  )}
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};

export default Meeting;
