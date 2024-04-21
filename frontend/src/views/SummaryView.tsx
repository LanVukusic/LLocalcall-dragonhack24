import {
  Alert,
  Text,
  Container,
  Group,
  LoadingOverlay,
  Stack,
  Title,
  ScrollArea,
  Button,
  Badge,
  // Button,
} from '@mantine/core';

import { Transcript } from '../api/model';
import { Link, useParams } from 'react-router-dom';
import { useMeetingsControllerGetTranscripts } from '../api/meetings/meetings';
import { IconNotes } from '@tabler/icons-react';

export const SummaryView = () => {
  const { meetingId } = useParams();

  const { data, isLoading, error } = useMeetingsControllerGetTranscripts(
    meetingId || '',
  );

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
          <Title mt="xl">Transcripts</Title>
          <Button
            rightSection={<IconNotes />}
            variant="light"
            component={Link}
            to={`/meeting/${meetingId}/summary`}
          >
            View summary
          </Button>
        </Group>
        {error && (
          <Alert title={error.message} color="red">
            {error.response?.data.message}
          </Alert>
        )}
        {!error && (
          <ScrollArea h="100%" p="xl">
            <Stack gap="3rem">
              {data?.map((transcript: Transcript) => (
                <Stack gap="xs" key={transcript.id}>
                  <Group>
                    <Badge variant="light" radius="xs">
                      {transcript.createdBy.username}
                    </Badge>
                    <Text size="xs" opacity={0.5}>
                      {new Date(transcript.start).toLocaleTimeString()}
                    </Text>

                    <Text size="xs" opacity={0.5}>
                      {new Date(transcript.end).toLocaleTimeString()}
                    </Text>
                  </Group>
                  <Text
                    style={{
                      lineHeight: '120%',
                    }}
                  >
                    {transcript.text}
                  </Text>
                  <Group wrap="nowrap" align="self-start">
                    {/*<IconCornerDownRight size="2rem" />
                   <Alert variant="light" title="Gitlab issue #17" py="sm">
                    <Stack align="flex-start">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                      nam repellendus commodi ut expedita quo architecto!
                      <Group>
                        <Badge size="xs" color="orange">
                          Frontend
                        </Badge>
                        <Badge size="xs" color="grape">
                          Bug
                        </Badge>
                      </Group>
                    </Stack>
                  </Alert> */}
                  </Group>
                </Stack>
              ))}
            </Stack>
          </ScrollArea>
        )}
      </Stack>
    </Container>
  );
};
