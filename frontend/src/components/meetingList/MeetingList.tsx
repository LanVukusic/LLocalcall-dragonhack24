import { Card, Text, Stack, Badge, Group, Title, Button } from '@mantine/core'; // Assuming you're using Mantine
import classes from './MeetingList.module.css';
import { Meeting } from '../../api/model';

type MeetingProps = {
  meeting: Meeting;
  setSelectedMeetingId: (num: number) => void;
};

const MeetingCard = ({ meeting, setSelectedMeetingId }: MeetingProps) => {
  const isPast = new Date(meeting.startTime) < new Date(); // Check if meeting has already started
  const isLive = true;

  // const { hovered, ref } = useHover();

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
        setSelectedMeetingId(meeting.id);
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

export const MeetingsList = ({
  meetings,
  setSelectedMeetingId,
}: {
  meetings: Meeting[];
  setSelectedMeetingId: (num: number) => void;
}) => {
  return (
    <Stack mt="40" pb="lg" mx="lg">
      <Group>
        <Title order={1} px="xl" c="teal.6">
          Meetings
        </Title>
        <Button></Button>
      </Group>

      {meetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
          setSelectedMeetingId={setSelectedMeetingId}
        />
      ))}
    </Stack>
  );
};


