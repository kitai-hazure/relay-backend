import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

import { PORT } from './constants/env';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    urlencoded({
      limit: '10mb',
      extended: true,
      parameterLimit: 50000,
    }),
  );
  app.use(json({ limit: '10mb' }));
  app.enableCors();
  app.setGlobalPrefix('api');
  app.setBaseViewsDir(join(__dirname, './', 'views'));
  app.setViewEngine('hbs');
  await app.listen(PORT || 8080, () => {
    console.log('Server is running on port: ', PORT || 8080, '🎉');
  });
}
bootstrap();
