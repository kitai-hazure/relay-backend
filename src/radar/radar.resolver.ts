import { UnauthorizedException } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';
import { Person } from 'src/graphql.types';
import { verifyJWT } from 'src/utils/jwt.utils';
import { RadarService } from './radar.service';

@Resolver()
export class RadarResolver {
  constructor(private readonly radarService: RadarService) {}

  @Query('findPeople')
  async findPeople(@Context() context): Promise<Person[]> {
    const { expired, payload } = verifyJWT(context.req.headers.authorization.split(' ')[1]);
    if (expired) throw new UnauthorizedException('Please login to continue.');
    return await this.radarService.findPeople(payload.id);
  }
}
