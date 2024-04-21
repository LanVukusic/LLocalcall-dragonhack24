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
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useTranscriptsControllerFindOne } from '../api/transcripts/transcripts';
import { IconCornerDownRight } from '@tabler/icons-react';

export const TranscriptView = () => {
  const { transcriptId } = useParams();
  const { data, isLoading, error } = useTranscriptsControllerFindOne(
    transcriptId || '',
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
