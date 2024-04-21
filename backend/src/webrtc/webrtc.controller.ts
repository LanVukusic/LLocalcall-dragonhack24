import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as net from 'net';
import { Server, Socket } from 'socket.io';
import { Meeting } from 'src/meetings/entities/meeting.entity';
import { Transcript } from 'src/transcripts/entities/transcript.entity';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';

const host = '142.93.161.127';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust according to your CORS policy
  },
})
@Injectable()
export class WebrtcGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,

    @InjectRepository(Transcript)
    private transcriptRepository: Repository<Transcript>,

    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  private users: { [key: string]: string[] } = {};

  // Is actually socket to meeting
  private socketToRoom: { [key: string]: string } = {};

  private freeConfigs = [
    {
      host,
      port: 43001,
    },
    {
      host,
      port: 43002,
    },
    {
      host,
      port: 43003,
    },
    {
      host,
      port: 43004,
    },
  ];

  private index = 0;

  // maps user id -> socket
  private sockets = new Map<number, net.Socket>();

  // maps session id -> user id
  private socketIdToUser = new Map<string, number>();

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);

    if (this.index >= this.freeConfigs.length) {
      client.emit('room full');
    }
  }

  handleDisconnect(client: Socket) {
    const roomID = this.socketToRoom[client.id];

    if (this.socketIdToUser.has(client.id)) {
      const userId = this.socketIdToUser.get(client.id);

      if (this.sockets.has(userId)) {
        this.sockets.get(userId).end();
        this.sockets.delete(userId);
      }
      this.socketIdToUser.delete(client.id);
    }

    if (roomID) {
      this.users[roomID] = this.users[roomID].filter((id) => id !== client.id);
      if (this.users[roomID].length === 0) {
        delete this.users[roomID];
      }
      delete this.socketToRoom[client.id];
      this.logger.log(`Client disconnected: ${client.id}`);
    }
  }

  @SubscribeMessage('join audio')
  async handleJoinAudio(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: string,
  ) {
    console.log(this.index);

    const recastedUserId = parseInt(userId);

    const user = await this.userRepository.findOneOrFail({
      where: { id: recastedUserId },
    });

    this.logger.log(`User joined audio: ${user.username}`);
    this.socketIdToUser.set(client.id, recastedUserId);

    const socket: net.Socket = net.createConnection(
      this.freeConfigs[this.index],
      () => {
        this.logger.log(
          `Connected to server: ${this.freeConfigs[this.index].port}`,
        );
      },
    );

    this.logger.log(`Index increased to ${this.index}`);

    const startTime = new Date();

    socket.on('data', async (data) => {
      const c = data.toString().trim();

      if (c.length < 2) {
        return;
      }

      const splitted = c
        .toString()
        .replace(/[\u0000-\u001F]/g, '')
        .split(' ');

      const start = parseInt(splitted[0]);
      const end = parseInt(splitted[1]);

      const content = splitted.slice(2).join(' ');

      if (isNaN(start) || isNaN(end)) {
        return;
      }

      this.logger.log(
        `User: ${user.username}: ${start} <-> ${end} : ${content}`,
      );

      const newStart = new Date(startTime.getTime() + start * 1000);
      const newEnd = new Date(startTime.getTime() + end * 1000);

      // get curremt roomId based on the socket
      const roomId = this.socketToRoom[client.id];

      let meeting: Meeting;

      if (roomId) {
        meeting = await this.meetingRepository.findOneOrFail({
          where: { id: parseInt(roomId) },
        });
      }

      const trancript = await this.transcriptRepository.save({
        start: newStart,
        end: newEnd,
        text: content,
        createdBy: user,
        meeting: meeting,
      });

      this.logger.log(
        `Transcript saved: text=${trancript.text}, meeting=${meeting?.id || 'NONE'}, user=${user.id}`,
      );

      client.emit('transcript', {
        start,
        end,
        content,
        username: user.username,
      });
    });
    this.sockets.set(recastedUserId, socket);
    this.index++;
  }

  @SubscribeMessage('join room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomID: string,
  ) {
    this.logger.log(`Client joining room: ${roomID}`);

    if (!this.users[roomID]) {
      this.users[roomID] = [];
    }

    if (this.users[roomID].length >= 4) {
      client.emit('room full');
      return;
    }

    this.users[roomID].push(client.id);
    this.socketToRoom[client.id] = roomID;

    const usersInThisRoom = this.users[roomID].filter((id) => id !== client.id);

    this.logger.log(
      `Client joined room: ${roomID}. Users in room: ${this.users[roomID]}`,
    );
    client.emit('all users', usersInThisRoom);
  }

  @SubscribeMessage('sending signal')
  handleSendingSignal(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: { userToSignal: string; callerID: string; signal: any },
  ) {
    this.logger.log(`Client sending signal: ${payload.userToSignal}`);

    this.server.to(payload.userToSignal).emit('user joined', {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  }

  @SubscribeMessage('returning signal')
  handleReturningSignal(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { signal: any; callerID: string },
  ) {
    this.logger.log(`Client returning signal: ${payload.callerID}`);

    this.server.to(payload.callerID).emit('receiving returned signal', {
      signal: payload.signal,
      id: client.id,
    });
  }

  @SubscribeMessage('audio')
  handleAudio(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const clientId = client.id;

    if (!this.socketIdToUser.has(clientId)) {
      return;
    }

    const userId = this.socketIdToUser.get(clientId);

    const socket = this.sockets.get(userId);

    if (!socket) {
      return;
    }

    socket.write(data);
  }
}
