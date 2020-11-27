import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import { RedisIoAdapter } from './adapters/redis.adapter';


const logger: Logger = new Logger('AppGateway');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  app.useStaticAssets(join(__dirname, '..', 'static'));
  const port = parseInt(process.env.SERVER_PORT);
  await app.listen(port);
 }
 bootstrap();
