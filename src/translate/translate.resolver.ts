import { Args, Query, Resolver } from '@nestjs/graphql';
import { TranslateInput } from 'src/graphql.types';
import { TranslateService } from './translate.service';

@Resolver()
export class TranslateResolver {
  constructor(private readonly translateService: TranslateService) {}

  @Query('translate')
  async translate(@Args('input') input: TranslateInput) {
    return await this.translateService.translate(input);
  }
}
