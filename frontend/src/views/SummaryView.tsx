import {
  Alert,
  Container,
  Group,
  LoadingOverlay,
  Stack,
  Title,
  ScrollArea,
  Button,
} from '@mantine/core';

import { Link, useParams } from 'react-router-dom';
import { IconPencil } from '@tabler/icons-react';
import { useRoomsControllerGetMeetings } from '../api/rooms/rooms';

export const SummaryView = () => {
  const { meetingId } = useParams();

  const { data, isLoading, error } = useRoomsControllerGetMeetings(
    meetingId || '',
  );
  console.log(meetingId, { data });

  return (
    <Container
      pos="relative"
      h="100%"
      style={{
        overflow: 'hidden',
      }}
    >
      <LoadingOverlay visible={isLoading} />
      <Stack gap="xl" h="100%">
        <Group w="100%" align="baseline" justify="space-between">
          <Title mt="xl">Summary</Title>
          <Button
            rightSection={<IconPencil />}
            variant="light"
            component={Link}
            to={`/meeting/${meetingId}/transcript`}
          >
            View transcriptions
          </Button>
        </Group>
        {error && (
          <Alert title={error.message} color="red">
            {error.response?.data.message}
          </Alert>
        )}
        {!error && (
          <ScrollArea h="100%" p="xl">
            <Stack gap="3rem">{/* {data.} */}</Stack>
          </ScrollArea>
        )}
      </Stack>
    </Container>
  );
};
