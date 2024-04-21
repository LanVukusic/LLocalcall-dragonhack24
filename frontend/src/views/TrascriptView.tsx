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
  Button,
} from '@mantine/core';

import { Meeting, Transcript } from '../api/model';
import { IconCornerDownRight, IconExternalLink } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export const TranscriptView = () => {
  // const { transcriptId } = useParams();
  // const { data, isLoading, error } = useTranscriptsControllerFindOne(
  //   transcriptId || '',
  // );

  // const { transcripts, isLoading, error } = useTranscriptsControllerFindAll();

  const meet: Meeting = {
    id: 1,
    name: 'Meeting 1',
    startTime: new Date().toLocaleDateString(),
    duration: 60,
    room: {
      id: 1,
      name: 'Room 1',

      meetings: [],
      createdBy: {
        id: 1,
        username: 'Jan Govoriljevič',
        password: '',
        transcripts: [],
      },
      description: '',
    },

    transcripts: [],
  };

  const transcripts: Transcript[] = [
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, dolor dolore eum est blanditiis illo p',
      createdBy: {
        id: 1,
        username: 'Jan Govoriljevič',
        password: '',
        transcripts: [],
      },
      meeting: meet,
      end: '',
      start: '',
    },
    {
      id: 2,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, dolor dolore eum est blanditiis illo p quia iure qui ipsam quae laudantium quas.',
      createdBy: {
        id: 2,
        username: 'Kljakob Mrljak',
        password: '',
        transcripts: [],
      },
      meeting: meet,
      end: '',
      start: '',
    },
    {
      id: 3,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, dolor dolore eum est blanditiis illo p',
      createdBy: {
        id: 3,
        username: 'Nla Vukushich',
        password: '',
        transcripts: [],
      },
      meeting: meet,
      end: '',
      start: '',
    },
  ];

  return (
    <Container
      pos="relative"
      h="100%"
      style={{
        overflow: 'hidden',
      }}
    >
      {/* <LoadingOverlay visible={isLoading} /> */}
      <Stack gap="xl" h="100%">
        {/* {error && (
          <Alert title={error.message}>{error.response?.data.message}</Alert>
        )} */}
        <Title mt="xl">{'Transcripts'}</Title>
        <ScrollArea h="100%" p="xl">
          <Stack gap="3rem">
            {transcripts.map((transcript: Transcript) => (
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
        <Title mt="xl">{JSON.stringify(data, null, 2)}</Title>
        <ScrollArea h="100%" p="xl">
          <Stack gap="3rem">
            <Stack gap="xs">
              <Badge variant="light" radius="xs">
                Jan Govoriljevič
              </Badge>
              <Text
                style={{
                  lineHeight: '120%',
                }}
              >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero,
                dolor dolore eum est blanditiis illo p
              </Text>
              <Text>
                dicta reprehenderit ullam eveniet beatae fuga maxime corrupti?
                Sunt quia iure qui ipsam quae laudantium quas.
              </Text>
            </Stack>
            <Stack gap="xs">
              <Badge variant="light" radius="xs" color="orange">
                Kljakob Mrljak
              </Badge>
              <Text>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero,
                dolor dolore eum est blanditiis illo p quia iure qui ipsam quae
                laudantium quas.
              </Text>
            </Stack>
            <Stack gap="xs">
              <Badge variant="light" radius="xs" color="grape">
                Nla Vukushich
              </Badge>
              <Text>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero,
                dolor dolore eum est blanditiis illo p
              </Text>
              <Group wrap="nowrap" align="self-start">
                <IconCornerDownRight size="2rem" />
                <Alert variant="light" title="Gitlab issue #17" py="sm">
                  <Stack align="flex-start">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                    nam repellendus commodi ut expedita quo architecto!
                    <Group w="100%" justify="space-between">
                      <Group>
                        <Badge size="xs" color="orange">
                          Frontend
                        </Badge>
                        <Badge size="xs" color="grape">
                          Bug
                        </Badge>
                      </Group>

                      <Button
                        component={Link}
                        to="https://gitlab.com/ul-fri-lpt/ul/on/on-stream/-/issues/14"
                        variant="subtle"
                        rightSection={<IconExternalLink size="20px" />}
                      >
                        view issue
                      </Button>
                    </Group>
                  </Stack>
                </Alert>
              </Group>
            </Stack>
            <Stack gap="xs">
              <Badge variant="light" radius="xs">
                Jan Govoriljevič
              </Badge>
              <Text>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero,
                dolor dolore eum est blanditiis illo p
              </Text>
              <Text>
                dicta reprehenderit ullam eveniet beatae fuga maxime corrupti?
                Sunt quia iure qui ipsam quae laudantium quas.
              </Text>
            </Stack>
            <Stack gap="xs">
              <Badge variant="light" radius="xs" color="orange">
                Kljakob Mrljak
              </Badge>
              <Text>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero,
                dolor dolore eum est blanditiis illo p quia iure qui ipsam quae
                laudantium quas.
              </Text>
            </Stack>
            <Stack gap="xs">
              <Badge variant="light" radius="xs" color="grape">
                Nla Vukushich
              </Badge>
              <Text>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero,
                dolor dolore eum est blanditiis illo p
              </Text>
              <Group wrap="nowrap" align="self-start">
                <IconCornerDownRight size="2rem" />
                <Alert variant="light" title="Gitlab issue #17" py="sm">
                  <Stack align="flex-start">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    <Group>
                      <Badge size="xs" color="orange">
                        Frontend
                      </Badge>
                      <Badge size="xs" color="grape">
                        Bug
                      </Badge>
                    </Group>
                  </Stack>
                </Alert>
              </Group>
            </Stack>
          </Stack>
        </ScrollArea>
      </Stack>
    </Container>
  );
};
