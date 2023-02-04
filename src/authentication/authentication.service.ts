import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SignupInput } from 'src/graphql.types';
import { IPayload } from 'src/types/payload.type';
import { signJWT, verifyJWT } from 'src/utils/jwt.utils';

@Injectable()
export class AuthenticationService {
  constructor(private prismaService: PrismaService) {}
  async signup(input: SignupInput) {
    // create a mongodb use
    let existingUser = await this.prismaService.user.findUnique({
      where: {
        email: input.email,
      },
    });
    if (!existingUser) {
      existingUser = await this.prismaService.user.create({
        data: {
          email: input.email,
          name: input.name,
          language: input.language,
          profilePicture: input.profilePicture,
        },
      });
    }
    const payload: IPayload = {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
    };
    const token = signJWT(payload);
    return token;
  }

  async getUser(token: string) {
    const response = verifyJWT(token);
    if (!response || response.expired) {
      return {
        success: false,
        message: 'Token is expired',
      };
    }

    const payload = response.payload as IPayload;
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    return user;
  }
}
