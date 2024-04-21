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
  const isPast = new Date(meeting.startTime) < new Date(); // Check if meeting has already started
  const isLive = true;
  const redirect = useNavigate();

  let status;
  if (isLive) {
    status = <Badge color="teal">Live</Badge>;
  } else if (isPast) {
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
        redirect(`/meeting/${meeting.id}`);
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
  const { data: meetings, isLoading } = useRoomsControllerGetMeetings(
    room.id.toString(),
  );

  const AddBtn = (
    <Button
      justify="space-between"
      onClick={() => {
        openTypedModal({
          modal: 'createMeeting',
          title: 'Create Meeting',
          body: {
            refetch: refetch,

            roomId: room.id,
          },
        });
      }}
    >
      <Text mr="sm">Create meeting</Text>
      <IconPlus size={20} />
    </Button>
  );

  const { refetch } = useRoomsControllerGetMeetings(room.id.toString());
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
          {AddBtn}
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
