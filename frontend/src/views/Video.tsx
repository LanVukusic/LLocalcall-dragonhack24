import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { SignalData } from 'simple-peer';

import Peer from 'simple-peer/simplepeer.min.js';
import { Streamer } from './audioStreamRecorder';
import { Card, Flex, ScrollArea, Stack } from '@mantine/core';
import { useStore } from '@nanostores/react';
import { $currUser } from '../global-state/user';

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

  // const params = useParams();

  // const roomID = (params.meetingId || '0').toString();

  const roomID = 'dsa';

  const user = useStore($currUser);

  const [transcripts, setTranscripts] = useState<Transcript[]>([]);

  useEffect(() => {
    // socketRef.current = io('http://142.93.161.127:3000');
    socketRef.current = io('http://localhost:3000');

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

        console.log('Joining room', roomID);

        socketRef.current.emit('join room', roomID);

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

  return (
    <Flex direction="column" gap="md" w="100%">
      <Stack maw="300px">
        <video muted ref={userVideo} autoPlay playsInline />
        {peers.map((peer, index) => (
          <Video key={index} peer={peer} />
        ))}
      </Stack>

      <ScrollArea h="500px">
        <Stack>
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
    </Flex>
  );
};

export default Room;
