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
  LoadingOverlay,
} from '@mantine/core';

import {
  IconMicrophone,
  IconMicrophoneOff,
  IconPlayerStop,
  IconVideo,
  IconVideoOff,
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { $currUser } from '../../global-state/user';
import { useMeetingsControllerUpdate } from '../../api/meetings/meetings';
import { UpdateMeetingDtoStatus } from '../../api/model';

const attendees = [
  {
    id: 1,
    name: 'jakob@mrak.si',
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
];

export const MeetingView = () => {
  const { meetingId } = useParams();
  const redirect = useNavigate();

  // const { mutateAsync, isPending } = useMeetingControllerUpdate(meetingId);
  const {mutateAsync, isPending} = useMeetingsControllerUpdate();
  const currentUsername = $currUser.value?.name;
  // console.log(currentUsername);

  const [cameraStatus, setCameraStatus] = useState(true); // Camera on by default
  const [microphoneStatus, setMicrophoneStatus] = useState(true); // Microphone on by default
  const onCameraToggle = () => {
    setCameraStatus((prevStatus) => !prevStatus);
  };

  const onMicrophoneToggle = () => {
    setMicrophoneStatus((prevStatus) => !prevStatus);
  };

  const endMeeting = async () => {
    confirm('Sure want to end the meeting?') &&
      (await mutateAsync( {
        id: meetingId || '',
        data: {
          status : UpdateMeetingDtoStatus.finished,
        },
      })) 
      redirect('/');
  };

  return (
    <Stack mt="40" pb="lg" mx="lg">
      <LoadingOverlay visible={isPending} />
      <Grid grow pb="md" gutter="xs">
        {attendees.map((attendee) => (
          <Grid.Col key={attendee.id} span={4}>
            <Card
              shadow="md"
              radius="md"
              withBorder
              p={10}
              h="200px"
              style={{
                borderColor:
                  currentUsername === attendee.name ? 'violet' : 'transparent',
              }}
            >
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
      <Group mt="auto" p="10" justify="space-between">
        <Group justify="left">
          <Button onClick={() => onMicrophoneToggle()}>
            {microphoneStatus ? (
              <IconMicrophone size={20} />
            ) : (
              <IconMicrophoneOff size={20} />
            )}
          </Button>
          <Button onClick={() => onCameraToggle()}>
            {cameraStatus ? (
              <IconVideo size={20} />
            ) : (
              <IconVideoOff size={20} />
            )}
          </Button>

          <Button
            variant="light"
            onClick={() => {
              confirm('Sure want to leave the meeting?') && redirect('/');
            }}
          >
            Leave Meeting
          </Button>
        </Group>
        <Button
          onClick={() => {
            endMeeting();
          }}
        >
          <Group>
            <Text>End Meeting</Text>
            <IconPlayerStop size={20} />
          </Group>
        </Button>
      </Group>
    </Stack>
  );
};
