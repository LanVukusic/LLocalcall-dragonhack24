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
  Tabs,
  Button,
  // Button,
} from '@mantine/core';

import { Transcript } from '../api/model';
import { Link, useParams } from 'react-router-dom';
import { useMeetingsControllerGetOne } from '../api/meetings/meetings';
import { IconCornerDownRight } from '@tabler/icons-react';
import { isValidHttpUrl } from '../utils';

export const TranscriptView = () => {
  const { meetingId } = useParams();
  console.log('mmeet id ' + meetingId);

  const { data, isLoading, error } = useMeetingsControllerGetOne(
    meetingId || '',
  );

  console.log(data, error, isLoading);
  // console.log('transcript data: ' + data);

  return (
    <Tabs defaultValue="transcripts" h="100%">
      <Container py="xl">
        <Tabs.List>
          <Tabs.Tab value="transcripts">
            <Title mt="xl" mx="lg" size={18}>
              {'Transcripts'}
            </Title>
          </Tabs.Tab>
          <Tabs.Tab value="summary">
            <Title mt="xl" mx="lg" size={18}>
              {'Summary'}
            </Title>
          </Tabs.Tab>
        </Tabs.List>
      </Container>

      <Tabs.Panel value="transcripts" h="100%">
        <Container pos="relative" h="100%">
          <LoadingOverlay visible={isLoading} />
          <Stack gap="xl" h="100%">
            {error && (
              <Alert title={error.message}>
                {error?.response?.data?.message}
              </Alert>
            )}
            <ScrollArea h="100%" p="xl" style={{ overflowY: 'auto' }}>
              <Stack gap="3rem" mb="xl">
                {data?.transcripts?.map((transcript: Transcript) => (
                  <Stack gap="xs" key={transcript.id}>
                    <Group w="100%" justify="space-between">
                      <Badge variant="light" radius="xs">
                        {transcript?.createdBy?.username}
                      </Badge>
                      <Group>
                        <Text size="xs" opacity={0.5}>
                          {new Date(transcript.start).toLocaleTimeString()}
                        </Text>

                        <Text size="xs" opacity={0.5}>
                          {new Date(transcript.end).toLocaleTimeString()}
                        </Text>
                      </Group>
                    </Group>
                    <Text
                      style={{
                        lineHeight: '120%',
                      }}
                    >
                      {transcript.text}
                    </Text>
                    {transcript.gitlabData && (
                      <>
                        <Group wrap="nowrap" align="self-start">
                          <IconCornerDownRight size="2rem" opacity={0.5} />
                          <Alert
                            variant="light"
                            title="Gitlab integration"
                            py="sm"
                            color="dark"
                          >
                            {isValidHttpUrl(transcript.gitlabData) ? (
                              <Button
                                size="xs"
                                variant="subtle"
                                component={Link}
                                to={transcript.gitlabData}
                              >
                                Follow link
                              </Button>
                            ) : (
                              <strong>{transcript.gitlabData}</strong>
                            )}
                          </Alert>
                        </Group>
                      </>
                    )}
                  </Stack>
                ))}
              </Stack>
            </ScrollArea>
          </Stack>
        </Container>
      </Tabs.Panel>

      <Tabs.Panel value="summary">
        <Stack align="center" justify="center">
          <Container h="100%" m="lg" w="100%">
            <Text>{data?.summary}</Text>
          </Container>
        </Stack>
      </Tabs.Panel>
    </Tabs>
  );
};
