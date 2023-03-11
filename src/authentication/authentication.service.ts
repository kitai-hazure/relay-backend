import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID } from 'src/constants/env';
import { PrismaService } from 'prisma/prisma.service';
import { SignupInput } from 'src/graphql.types';
import { IPayload } from 'src/types/payload.type';
import { signJWT, verifyJWT } from 'src/utils/jwt.utils';

const client = new OAuth2Client(GOOGLE_CLIENT_ID);
@Injectable()
export class AuthenticationService {
  constructor(private prismaService: PrismaService) {}

  async login(input: SignupInput) {
    const { serverAuthCode } = input;
    const { tokens } = await client.getToken(serverAuthCode);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const { email, name, picture, locale } = payload;
    let existingUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) {
      existingUser = await this.prismaService.user.create({
        data: {
          email,
          name,
          // TODO -> Update this locale according to the users language
          language: locale,
          profilePicture: picture,
        },
      });
    }
    const jwtPayload: IPayload = {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
    };
    const token = signJWT(jwtPayload);
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
