import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PrismaService } from 'prisma/prisma.service';
import { Server, Socket } from 'socket.io';
import { TranslateService } from 'src/translate/translate.service';
import { verifyJWT } from 'src/utils/jwt.utils';
import { ChatInput, JoinRoomInput } from './dto/room';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TranslateGateway {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translateService: TranslateService,
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('joinRoom')
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinRoomInput,
  ) {
    const { expired } = verifyJWT(data.token);
    if (expired) return;
    console.log('joining room: ', data.room);
    client.join(data.room);
    client.emit('joinedRoom', data.room);
  }

  @SubscribeMessage('chat')
  async chat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: ChatInput,
  ) {
    if (!client.rooms.has(data.room)) return;
    const { payload } = verifyJWT(data.token);
    const userId = payload.id;
    const from = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    const sockets = await this.server.in(data.room).fetchSockets();
    for (const socket of sockets) {
      if (socket.id !== client.id) {
        const to = await this.prisma.chatUser.findUnique({
          where: { socketId: socket.id },
          select: {
            user: {
              select: {
                language: true,
              },
            },
          },
        });
        const translatedMessage = await this.translateService.translate({
          text: data.msg,
          source: from.language,
          target: to.user.language,
        });
        socket.emit('chat', { data: translatedMessage, from: client.id });
      }
    }
  }

  @SubscribeMessage('request-call')
  async requestCall(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { toId: string; fromId: string },
  ) {
    const connectToUser = await this.prisma.chatUser.findUnique({
      where: {
        userId: data.toId,
      },
    });
    const socket = this.server.sockets.sockets.get(connectToUser.socketId);
    socket.emit('request-call', {
      fromId: data.fromId,
      toId: data.toId,
      name: connectToUser.name,
      msg: 'Please connect with me',
    });
  }

  async handleConnection(client: Socket, ...args: any[]) {
    if (
      client.handshake.query.token &&
      client.handshake.query.latitute &&
      client.handshake.query.longitude
    ) {
      const get = (str: string | string[]): string => {
        if (Array.isArray(str)) return str[0];
        return str;
      };
      const lat = get(client.handshake.query.latitute);
      const lng = get(client.handshake.query.longitude);
      const { payload, expired } = verifyJWT(get(client.handshake.query.token));
      if (!payload || expired) return;
      const user = await this.prisma.chatUser.findUnique({
        where: {
          userId: payload.id,
        },
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      });
      if (user) {
        await this.prisma.chatUser.update({
          where: {
            userId: payload.id,
          },
          data: {
            socketId: client.id,
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
          },
        });
      } else {
        await this.prisma.chatUser.create({
          data: {
            socketId: client.id,
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            name: user.user.name,
            user: {
              connect: {
                id: payload.id,
              },
            },
          },
        });
      }
    }
    console.log('client connected', client.id);
  }

  async handleDisconnect(client: Socket, reason: string, ...args: any[]) {
    await this.prisma.chatUser.deleteMany({
      where: {
        socketId: client.id,
      },
    });
    console.log('client disconnected', client.id, reason);
  }
}
