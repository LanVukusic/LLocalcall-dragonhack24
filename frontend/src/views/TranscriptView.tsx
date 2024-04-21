import {
  Alert,
  Badge,
  Text,
  Container,
  Group,
  LoadingOverlay,
  Stack,
  Title,
  ScrollArea,
  // Button,
} from '@mantine/core';

import { Transcript } from '../api/model';
import { useParams } from 'react-router-dom';
import { useMeetingsControllerGetTranscripts } from '../api/meetings/meetings';

export const TranscriptView = () => {
  const { meetingId } = useParams();

  const { data, isLoading, error } = useMeetingsControllerGetTranscripts(
    meetingId || '', // meetingId
  );

  // console.log(data, error, isLoading);
  // console.log('transcript data: ' + data);

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
        {error && (
          <Alert title={error.message}>{error.response?.data.message}</Alert>
        )}
        <Title mt="xl">{'Transcripts'}</Title>
        <ScrollArea h="100%" p="xl">
          <Stack gap="3rem">
            {data?.map((transcript: Transcript) => (
              <Stack gap="xs" key={transcript.id}>
                <Badge variant="light" radius="xs">
                  {transcript.createdBy.username}
                </Badge>
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
      </Stack>
    </Container>
  );
};
