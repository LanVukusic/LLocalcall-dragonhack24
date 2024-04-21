import {
  Card,
  Text,
  Stack,
  Badge,
  Group,
  Alert,
  LoadingOverlay,
  Container,
} from '@mantine/core'; // Assuming you're using Mantine
import classes from './MeetingList.module.css';
import { Meeting, Room } from '../../api/model';
import { useNavigate } from 'react-router-dom';
import { useRoomsControllerGetMeetings } from '../../api/rooms/rooms';

// const meetings_dummy: Meeting[] = [
//   {
//     id: 1,
//     name: 'Meeting 1',
//     startTime: new Date().toISOString(),
//     transcripts: [],
//     duration: 0,
//     room: {
//       createdBy: {
//         id: 1,
//         password: 'string;',
//         transcripts: [],
//         username: 'testuser',
//       },
//       description: 'string',
//       id: 2,
//       meetings: [],
//       name: '2112',
//     },
//   },
// ];

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
  // console.log(meeting);
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
        <Group>
          <Text>{meeting.startTime.toLocaleString()} - </Text>
        </Group>
      </Stack>
    </Card>
  );
};

export const MeetingsList = ({ room }: { room: Room }) => {
  const { data: meetings, isLoading } = useRoomsControllerGetMeetings(
    room.id.toString(),
  );
  return (
    <Container>
      <Stack mt="40" pb="lg" pos="relative" gap="xl">
        <LoadingOverlay visible={isLoading} />

        <Stack gap="xs" pb="xl">
          <Text size="md" opacity={0.7}>
            Meetings in
          </Text>
          <Text size="2rem" fw="bold">
            {room.name}
          </Text>
        </Stack>

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
