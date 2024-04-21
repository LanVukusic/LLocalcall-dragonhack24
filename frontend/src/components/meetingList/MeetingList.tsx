import {
  Card,
  Text,
  Stack,
  Badge,
  Group,
  Alert,
  LoadingOverlay,
  Container,
  Button,
} from '@mantine/core'; // Assuming you're using Mantine
import classes from './MeetingList.module.css';
import { Meeting, Room } from '../../api/model';
import { IconPlus } from '@tabler/icons-react';
import { openTypedModal } from '../../mantine/modals/modals-utils';
import { useNavigate } from 'react-router-dom';
import { useRoomsControllerGetMeetings } from '../../api/rooms/rooms';

type MeetingProps = {
  meeting: Meeting;
};

const MeetingCard = ({ meeting }: MeetingProps) => {
  const meetingStatus = meeting.status || 'live'; // Check if meeting is live
  // const isLive = true;
  const redirect = useNavigate();

  let status;
  if (meetingStatus == 'live') {
    status = <Badge color="red">Live</Badge>;
  } else if (meetingStatus == 'finished') {
    status = <Badge color="gray">Past</Badge>;
  } else {
    status = <Badge color="green">Scheduled</Badge>;
  }

  return (
    <Card
      shadow="md"
      radius="md"
      withBorder
      p={20}
      style={{ width: '100%' }}
      className={classes.meetingCard}
      onClick={() => {
        meetingStatus === 'live'
          ? redirect(`/meeting/${meeting.id}`)
          : redirect(`/transcript/${meeting.id}`);
      }}
    >
      <Stack>
        <Group>
          <Text style={{ fontWeight: 'bold' }}>{meeting.name} </Text>
          {status}
        </Group>
        <Group gap="xs">
          <Text opacity={0.5}>
            {new Date(meeting.startTime).toLocaleDateString()}
          </Text>
          <Text fw="bold">
            {new Date(meeting.startTime).toLocaleTimeString()}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
};

export const MeetingsList = ({ room }: { room: Room }) => {
  const {
    data: meetings,
    isLoading,
    refetch,
  } = useRoomsControllerGetMeetings(room.id.toString());
  const redirect = useNavigate();

  if (meetings) {
    // order meetings by start time in descending order
    meetings.sort((a, b) => {
      return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
    });
  }

  return (
    <Container>
      <Stack mt="40" pb="lg" pos="relative" gap="xl">
        <LoadingOverlay visible={isLoading} />
        <Group w="100%" justify="space-between">
          <Stack gap="xs" pb="xl">
            <Stack>
              <Text size="2rem" fw="bold">
                {room.name}
              </Text>
              <Text size="md" c="teal.7" fw="lighter" opacity={0.8}>
                {room.description}
              </Text>
            </Stack>
          </Stack>
          <Button
            justify="space-between"
            onClick={() => {
              openTypedModal({
                modal: 'createMeeting',
                title: 'Create Meeting',
                body: {
                  refetch: refetch,
                  roomId: room.id,
                  redirect: redirect,
                },
              });
            }}
          >
            <Text mr="sm">Create meeting</Text>
            <IconPlus size={20} />
          </Button>
        </Group>

        {meetings &&
          meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        {meetings && meetings.length == 0 && (
          <Alert title="No meetings here">
            There are no meetings organized in this room. Try to create some
          </Alert>
        )}
      </Stack>
    </Container>
  );
};
