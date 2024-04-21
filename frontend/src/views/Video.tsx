import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { SignalData } from 'simple-peer';

import {
  Badge,
  Button,
  Card,
  Flex,
  Group,
  LoadingOverlay,
  Paper,
  ScrollArea,
  SimpleGrid,
  Skeleton,
  Stack,
  Title,
} from '@mantine/core';
import { useStore } from '@nanostores/react';
import { IconCalendarCheck, IconNotebook } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import Peer from 'simple-peer/simplepeer.min.js';
import { $currUser } from '../global-state/user';
import { Streamer } from './audioStreamRecorder';
import { $activeMeet } from '../global-state/activeRoom';
import { useMeetingsControllerUpdate } from '../api/meetings/meetings';
import { UpdateMeetingDtoStatus } from '../api/model';

interface VideoProps {
  peer: Peer.Instance;
}

const Video: React.FC<VideoProps> = ({ peer }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    peer.on('stream', (stream: MediaStream) => {
      if (ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, [peer]);

  return <video style={{ maxWidth: '300px' }} playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

interface PeerData {
  peerID: string;
  peer: Peer.Instance;
}

interface Transcript {
  start: number;
  end: number;
  content: string;
  username: string;
}

const Room = () => {
  const [peers, setPeers] = useState<Peer.Instance[]>([]);
  const socketRef = useRef<Socket>();
  const userVideo = useRef<HTMLVideoElement>(null);
  const peersRef = useRef<PeerData[]>([]);
  const redirect = useNavigate();

  // const params = useParams();

  // const roomID = (params.meetingId || '0').toString();
  const selectedMeet = useStore($activeMeet);

  const user = useStore($currUser);

  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const { mutateAsync, isPending } = useMeetingsControllerUpdate();

  const endMeeting = async () => {
    confirm('Sure want to end the meeting?') &&
      (await mutateAsync({
        id: selectedMeet?.id.toString() || '',
        data: {
          status: UpdateMeetingDtoStatus.finished,
        },
      }),
      socketRef.current?.close(),
      redirect('/'));
  };

  useEffect(() => {
    if (!selectedMeet) {
      return;
    }
    socketRef.current = io('http://142.93.161.127:3000');
    // socketRef.current = io('http://localhost:3000');

    socketRef.current.emit('join audio', user?.sub);

    socketRef.current.on('transcript', (data: Transcript) => {
      setTranscripts((prev) => [...prev, data]);
    });

    navigator.mediaDevices
      .getUserMedia({
        video: videoConstraints,
        audio: {
          channelCount: 1,
          echoCancellation: true,
        },
      })
      .then((stream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream;

          new Streamer(
            stream,
            new AudioContext({ sampleRate: 16000 }),
            (data) => {
              if (!socketRef.current) {
                console.error('Socket not connected');
                return;
              }
              socketRef.current.emit('audio', data);
            },
          );
        }

        if (!socketRef.current) {
          console.error('Socket not connected');
          return;
        }

        console.log('Joining room', selectedMeet.id);

        socketRef.current.emit('join room', selectedMeet.id);

        socketRef.current.on('all users', (users: string[]) => {
          const peers: Peer.Instance[] = [];
          users.forEach((userID) => {
            if (!socketRef.current) {
              console.error('No stream');
              return;
            }

            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });

            console.log(peersRef.current.length);

            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on(
          'user joined',
          (payload: { signal: SignalData; callerID: string }) => {
            console.log(
              `My id: ${socketRef.current?.id}, Caller id: ${payload.callerID}`,
            );

            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });

            setPeers((prevPeers) => [...prevPeers, peer]);
          },
        );

        console.log('Listening for signals');

        socketRef.current.on(
          'receiving returned signal',
          (payload: { id: string; signal: SignalData }) => {
            const item = peersRef.current.find((p) => p.peerID === payload.id);
            if (item) {
              item.peer.signal(payload.signal);
            }
          },
        );
      });

    return () => {
      socketRef.current?.close();
    };
  }, []);

  function createPeer(
    userToSignal: string,
    callerID: string | undefined,
    stream: MediaStream,
  ) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal: SignalData) => {
      // if (signal.renegotiate || signal.transceiverRequest) return;

      socketRef.current?.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(
    incomingSignal: SignalData,
    callerID: string,
    stream: MediaStream,
  ) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal: SignalData) => {
      socketRef.current?.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  if (selectedMeet == null) {
    return <LoadingOverlay visible={true}></LoadingOverlay>;
  }

  return (
    <SimpleGrid w="100%" h="100%" cols={3} p="sm" bg="gray.1">
      <Paper
        h="100%"
        withBorder
        shadow="xl"
        p="md"
        style={{ overflow: 'hidden' }}
      >
        <Group>
          <IconNotebook opacity={0.5} size="1.8rem" />
          <Title> Transcriptions </Title>
        </Group>

        <ScrollArea h="100%" type="always" pt="sm">
          <Stack>
            {/* <Stack>
              {Array(20)
                .fill(0)
                .map((i, j) => (
                  <Card key={i}>
                    <Stack gap="xs">
                      <Badge radius="sm" variant="light">
                        Lan Vukusic
                      </Badge>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora optio doloremque est eius pariatur deserunt
                      quisquam sunt provident debitis voluptatem vitae omnis
                      molestias sed cumque dolorum ab laudantium, exercitationem
                      excepturi?
                    </Stack>
                  </Card>
                ))}
            </Stack> */}
            {transcripts && transcripts.length == 0 && (
              <Stack>
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
                <Skeleton height={8} mt={6} width="90%" radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </Stack>
            )}
            {transcripts.map((transcript, index) => (
              <Card key={index}>
                <div>
                  <strong>{transcript.username}</strong>
                  <br />
                  {transcript.content}
                </div>
              </Card>
            ))}
          </Stack>
        </ScrollArea>
      </Paper>

      <Flex
        justify="center"
        align="center"
        wrap="wrap"
        style={{
          gridColumnStart: 2,
          gridColumnEnd: 4,
        }}
      >
        <div>
          <video
            muted
            ref={userVideo}
            autoPlay
            playsInline
            style={{
              borderRadius: '5px',
              border: '1px solid --mantine-color-gray-1',
            }}
          />
          <Badge size="lg" ml="-50%" color="gray" variant="white">
            You
          </Badge>
        </div>

        {peers.map((peer, index) => (
          <div>
            <Video key={index} peer={peer} />
            <Badge size="lg" ml="-50%" color="gray" variant="white">
              {peer}
            </Badge>
          </div>
        ))}
        <Group w="100%" mt="auto" mb="xl">
          <Button
            variant="subtle"
            color="red"
            onClick={() => {
              redirect('/');
            }}
          >
            Leave
          </Button>
          <Button
            variant="light"
            rightSection={<IconCalendarCheck />}
            onClick={() => {
              endMeeting();
            }}
          >
            Finish meet
          </Button>
        </Group>
      </Flex>
    </SimpleGrid>
  );
};

export default Room;
