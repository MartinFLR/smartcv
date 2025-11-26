/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

// Load .env FIRST, before any other imports
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
  override: true,
});

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with proper configuration matching Express backend
  app.enableCors({
    exposedHeaders: ['X-Ai-Provider', 'X-Ai-Model'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Ai-Provider', 'X-Ai-Model'],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
