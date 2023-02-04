import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { TranslateService } from 'src/translate/translate.service';
import { TranslateGateway } from './translate.gateway';

@Module({
  providers: [TranslateGateway, PrismaService, TranslateService],
})
export class TranslateSocketModule {}
