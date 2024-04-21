import { useState } from 'react';
import {
  Card,
  Grid,
  Group,
  Stack,
  Text,
  Avatar,
  Badge,
  Button,
} from '@mantine/core';

import {
  IconMicrophone,
  IconMicrophoneOff,
  IconVideo,
  IconVideoOff,
} from '@tabler/icons-react';

const attendees = [
  {
    id: 1,
    name: 'Alice Johnson',
    muted: false,
    cameraOn: true,
  },
  {
    id: 2,
    name: 'Bob Williams',
    muted: true,
    cameraOn: true,
  },
  {
    id: 3,
    name: 'Emily Brown',
    muted: false,
    cameraOn: true,
  },
  {
    id: 4,
    name: 'David Chen',
    muted: false,
    cameraOn: false,
  },
  {
    id: 5,
    name: 'Sarah Miller',
    muted: true,
    cameraOn: false,
  },
  {
    id: 6,
    name: 'William Garcia',
    muted: false,
    cameraOn: false,
  },
  {
    id: 7,
    name: 'Olivia Martinez',
    muted: false,
    cameraOn: true,
  },
  {
    id: 8,
    name: 'James Brown',
    muted: true,
    cameraOn: true,
  },
  {
    id: 9,
    name: 'Sophia Davis',
    muted: false,
    cameraOn: true,
  },
];

interface MeetingProps {
  meetingId: number;
  setSelectedMeetingId: (meetingId: number) => void;
}

export const MeetingView = ({ meetingId, setSelectedMeetingId }: MeetingProps) => {
  // const [gridSize, setGridSize] = useState(2); // Initial grid size (2x2)
  console.log(meetingId);

  

  const [cameraStatus, setCameraStatus] = useState(true); // Camera on by default
  const [microphoneStatus, setMicrophoneStatus] = useState(true); // Microphone on by default
  const onCameraToggle = () => {
    setCameraStatus((prevStatus) => !prevStatus);
  };

  const onMicrophoneToggle = () => {
    setMicrophoneStatus((prevStatus) => !prevStatus);
  };

  return (
    <Stack mt="40" pb="lg" mx="lg">
      <Grid grow pb="md" gutter="xs">
        {attendees.map((attendee) => (
          <Grid.Col key={attendee.id} span={4}>
            <Card shadow="md" radius="md" withBorder p={10} h="200px">
              <Stack justify="center" align="center" h="100%">
                <Avatar
                  src={`https://avatars.dicebear.com/api/adventurer/${attendee.name}.svg`}
                  size={60}
                />
                <Stack align="center">
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
      <Group mt="auto" p="10" justify="left">
        <Button onClick={() => onMicrophoneToggle()}>
          {microphoneStatus ? (
            <IconMicrophone size={20} />
          ) : (
            <IconMicrophoneOff size={20} />
          )}
        </Button>
        <Button onClick={() => onCameraToggle()}>
          {cameraStatus ? <IconVideo size={20} /> : <IconVideoOff size={20} />}
        </Button>

        <Button
          variant="light"
          onClick={() => {
            setSelectedMeetingId(-1);
          }}
        >
          Leave Meeting
        </Button>
      </Group>
    </Stack>
  );
};


