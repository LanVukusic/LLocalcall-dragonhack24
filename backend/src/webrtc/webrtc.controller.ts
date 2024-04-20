import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust according to your CORS policy
  },
})
export class WebrtcGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('subscribe')
  handleSubscribe(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ): void {
    socket.join(data.room);
    socket.join(data.socketId);

    // console.log(this.server);

    // console.log(this.server.of('/webrtc').sockets.size);

    const isRoomPresent = this.server.sockets.adapter.rooms.has(data.room);

    if (isRoomPresent) {
      socket.to(data.room).emit('new user', { socketId: data.socketId });
    }
  }

  @SubscribeMessage('newUserStart')
  handleNewUserStart(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ): void {
    socket.to(data.to).emit('newUserStart', { sender: data.sender });
  }

  @SubscribeMessage('sdp')
  handleSdp(@ConnectedSocket() socket: Socket, @MessageBody() data: any): void {
    socket
      .to(data.to)
      .emit('sdp', { description: data.description, sender: data.sender });
  }

  @SubscribeMessage('ice candidates')
  handleIceCandidates(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ): void {
    socket.to(data.to).emit('ice candidates', {
      candidate: data.candidate,
      sender: data.sender,
    });
  }

  @SubscribeMessage('chat')
  handleChat(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ): void {
    socket.to(data.room).emit('chat', { sender: data.sender, msg: data.msg });
  }
}
