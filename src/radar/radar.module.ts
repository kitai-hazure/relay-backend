import { Module } from '@nestjs/common';
import { RadarService } from './radar.service';
import { RadarResolver } from './radar.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [RadarResolver, RadarService, PrismaService],
})
export class RadarModule {}
