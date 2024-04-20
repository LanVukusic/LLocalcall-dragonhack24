import { Card, Text, Stack, Badge } from '@mantine/core'; // Assuming you're using Mantine
import classes from './MeetingList.module.css';

type MeetingProps = {
  meeting: {
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    attendees: string[];
  };
};

const MeetingCard = ({ meeting }: MeetingProps) => {
  const isPast = meeting.startTime < new Date(); // Check if meeting has already started
  const isLive = meeting.startTime <= new Date() && meeting.endTime >= new Date();

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
    <Card shadow="md" radius="md" withBorder p={4} style={{width: '100%'}} p="20" className={classes.meetingCard}>
      <Stack>
        <Text style={{ fontWeight: 'bold' }}>{meeting.title} {status}</Text>
        <Text>
          {meeting.startTime.toLocaleString()} - {meeting.endTime.toLocaleString()}
        </Text>
        <Text>Attendees: {meeting.attendees.join(', ')}</Text>

      </Stack>
    </Card>
  );
};

const MeetingsList = ({
  meetings,
}: {
  meetings: MeetingProps['meeting'][];
}) => {
  return (
    <Stack>
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} meeting={meeting} />
      ))}
    </Stack>
  );
};

export default MeetingsList;
