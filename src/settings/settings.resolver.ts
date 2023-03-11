import { BadRequestException } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateLanguageInput } from 'src/graphql.types';
import { verifyJWT } from 'src/utils/jwt.utils';
import { SettingsService } from './settings.service';

@Resolver()
export class SettingsResolver {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly prismaService: PrismaService,
  ) {}
  @Mutation('updateLanguage')
  async updateLanguage(
    @Args('input') input: UpdateLanguageInput,
    @Context() ctx,
  ) {
    const { payload, expired } = verifyJWT(
      ctx.req.headers.authorization?.split(' ')[1],
    );
    if (expired) throw new BadRequestException('Token expired');
    return await this.settingsService.updateLanguage(payload.id, input.lang);
  }
}
