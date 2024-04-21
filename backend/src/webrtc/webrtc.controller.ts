import { Logger, Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as net from 'net';

import * as fs from 'fs';

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

  private socket: net.Socket;

  // Write data to a file
  private;

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);

    try {
      // 142.93.161.127:43001
      this.socket = net.createConnection(
        {
          host: '142.93.161.127',
          port: 43001,
        },
        () => {
          this.logger.log('Connected');
        },
      );

      this.socket.on('data', (data) => {
        console.log(`Received: ${data}`);
      });
    } catch (e: any) {
      // this.logger.error(e);
    }
  }

  handleDisconnect(client: Socket) {
    const roomID = this.socketToRoom[client.id];
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
    // this.logger.log(`Client sending audio: ${data}`);
    //
    this.socket.write(data);
    // fs.appendFile('audio.pcm', data, (err) => {
    //   if (err) {
    //     console.log(err);
    //   }
    // });
  }
}
