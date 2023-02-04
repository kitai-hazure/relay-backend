import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TranslateGateway {
  @WebSocketServer()
  server: Server;

  // @SubscribeMessage('events')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(
  //     map((item) => ({ event: 'events', data: item })),
  //   );
  // }
  // @SubscribeMessage('identity')
  // async identity(@MessageBody() data: number) {
  //   // console.log('CLIENT: ', client);
  //   console.log('DATA: ', data);
  // }

  // a socket so that a client can join a room
  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, @MessageBody() data: any) {
    console.log('CLIENT: ', client);
    console.log('DATA: ', data);
    client.join(data.room);
    client.emit('joinedRoom', data.room);
  }

  // a socket so that a client can chat with people only in that room
  @SubscribeMessage('chat')
  async chat(client: Socket, @MessageBody() data: any) {
    console.log('CLIENT: ', client);
    console.log('DATA: ', data);
    client.to(data.room).emit('chat', data);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('client connected', client.id);
  }
}
