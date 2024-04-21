import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { SignalData } from 'simple-peer';

import Peer from 'simple-peer/simplepeer.min.js';
import { Streamer } from './audioStreamRecorder';

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

  return <video playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

interface PeerData {
  peerID: string;
  peer: Peer.Instance;
}

interface RoomProps {
  match: {
    params: {
      roomID: string;
    };
  };
}

const Room: React.FC<RoomProps> = ({ match }) => {
  const [peers, setPeers] = useState<Peer.Instance[]>([]);
  const socketRef = useRef<Socket>();
  const userVideo = useRef<HTMLVideoElement>(null);
  const peersRef = useRef<PeerData[]>([]);
  const roomID = match.params.roomID;
  // const {} = useAudioStreamer();

  useEffect(() => {
    // socketRef.current = io('http://142.93.161.127:3000');
    socketRef.current = io('http://localhost:3000');

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

          console.log(stream.getAudioTracks()[0].getSettings());

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
            console.log('User joined', payload.signal);

            console.log(
              `My id: ${socketRef.current?.id}, Caller id: ${payload.callerID}`,
            );

            // Show current state
            console.log(peersRef.current);

            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });

            setPeers((prevPeers) => [...prevPeers, peer]);
          },
        );

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
  }, [roomID]);

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
      console.log('Signal', signal);

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
    <div>
      <video muted ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => (
        <Video key={index} peer={peer} />
      ))}
    </div>
  );
};

export default Room;
