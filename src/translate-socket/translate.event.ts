import { Module } from '@nestjs/common';
import { TranslateGateway } from './translate.gateway';

@Module({
  providers: [TranslateGateway],
})
export class TranslateSocketModule {}
