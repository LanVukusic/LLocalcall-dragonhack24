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
  // Button,
} from '@mantine/core';

import { Transcript } from '../api/model';
import { useParams } from 'react-router-dom';
import { useMeetingsControllerGetOne } from '../api/meetings/meetings';


export const TranscriptView = () => {
  const { meetingId } = useParams();
  console.log('mmeet id ' + meetingId);

  // const { data, isLoading, error} = useRoomsControllerGetMeetings(meetingId || '');

  // get the meeting data from api
  const { data, isLoading, error } = useMeetingsControllerGetOne(
    meetingId || '',
  );

  
  console.log(data, error, isLoading);
  // console.log('transcript data: ' + data);

  return (
    <Tabs defaultValue="transcripts">
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

      <Tabs.Panel value="transcripts">
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
              <Alert title={error.message}>
                {error?.response?.data?.message}
              </Alert>
            )}

            <ScrollArea h="100%" p="xl">
              <Stack gap="3rem">
                {data?.transcripts?.map((transcript: Transcript) => (
                  <Stack gap="xs" key={transcript.id}>
                    <Badge variant="light" radius="xs">
                      {transcript?.createdBy?.username}
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
      </Tabs.Panel>

      <Tabs.Panel value="summary">
        <Container
          pos="relative"
          h="100%"
         
          m="lg"
        >
          <Text>{data?.summary}</Text>
        </Container>
      </Tabs.Panel>
    </Tabs>
  );
};
