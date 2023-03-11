import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsResolver } from './settings.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [SettingsResolver, SettingsService, PrismaService],
})
export class SettingsModule {}
