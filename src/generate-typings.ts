import { join } from 'path';
import { GraphQLDefinitionsFactory } from '@nestjs/graphql';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: ['./graphql/*.graphql'],
  path: join(process.cwd(), 'src/graphql.types.ts'),
  outputAs: 'class',
  watch: true,
});
