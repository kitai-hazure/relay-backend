import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { TranslateResolver } from './translate.resolver';

@Module({
  providers: [TranslateResolver, TranslateService],
})
export class TranslateModule {}
