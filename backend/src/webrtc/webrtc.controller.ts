import { Injectable, Logger } from '@nestjs/common';
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

const host = '142.93.161.127';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust according to your CORS policy
  },
})
@Injectable()
export class WebrtcGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  private users: { [key: string]: string[] } = {};
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

  private sockets = new Map<string, net.Socket>();

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);

    if (this.index >= this.freeConfigs.length) {
      client.emit('room full');
      return;
    }

    const socket: net.Socket = net.createConnection(
      this.freeConfigs[this.index],
      () => {
        this.logger.log(
          `Connected to server: ${this.freeConfigs[this.index].port}`,
        );
      },
    );

    socket.on('data', (data) => {
      if (data.length < 2) {
        return;
      }

      const splitted = data.toString().split(' ');

      const start = parseInt(splitted[0]);
      const end = parseInt(splitted[1]);

      const allElse = splitted.slice(2).join(' ');

      console.log('start', start, 'end', end, 'allElse', allElse);
    });

    this.sockets.set(client.id, socket);
    this.index++;
  }

  handleDisconnect(client: Socket) {
    const roomID = this.socketToRoom[client.id];

    if (this.sockets.has(client.id)) {
      this.sockets.get(client.id).destroy();
      this.sockets.delete(client.id);

      this.index--;
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

    const socket = this.sockets.get(clientId);

    if (!socket) {
      return;
    }

    socket.write(data);
  }
}
