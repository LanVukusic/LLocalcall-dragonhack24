import { Card, Text, Stack, Badge, Group, Title } from '@mantine/core'; // Assuming you're using Mantine
import classes from './MeetingList.module.css';

type MeetingProps = {
  meeting: {
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    attendees: string[];
  };
  setSelectedMeetingId: (num: number) => void;
};

const MeetingCard = ({ meeting, setSelectedMeetingId }: MeetingProps) => {
  const isPast = meeting.startTime < new Date(); // Check if meeting has already started
  const isLive =
    meeting.startTime <= new Date() && meeting.endTime >= new Date();

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
        setSelectedMeetingId(parseInt(meeting.id));
      }}
    >
      <Stack>
        <Group>
          <Text style={{ fontWeight: 'bold' }}>{meeting.title} </Text>
          {status}
        </Group>
        <Group>
          <Text>
            {meeting.startTime.toLocaleString()} -{' '}
            {meeting.endTime.toLocaleString()}
          </Text>
        </Group>

        <Text>Attendees: {meeting.attendees.join(', ')}</Text>
      </Stack>
    </Card>
  );
};

const MeetingsList = ({
  meetings,
  setSelectedMeetingId,
}: {
  meetings: {
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    attendees: string[];
  }[];
  setSelectedMeetingId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  return (
    <Stack mt="60" pb="lg">
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

export default MeetingsList;
