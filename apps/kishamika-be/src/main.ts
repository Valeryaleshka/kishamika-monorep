import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { join } from 'node:path';
import { NestExpressApplication } from '@nestjs/platform-express';
import express from "express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  // Use environment variables
  const port = configService.get<number>('PORT') || 3000;
  const frontendUrl = 'https://kiskamika.onrender.com';
  // configService.get<string>('FRONTEND_URL') ||
  // 'https://kiskamika.onrender.com';
  const nodeEnv = configService.get<string>('NODE_ENV') || 'production';


  // Security middleware for production
  if (nodeEnv === 'production') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    app.use(helmet());
  }

  // Cookie parser with secret for production
  app.use(cookieParser());

  // CORS configuration for production
  app.enableCors({
    origin: 'https://kiskamika.onrender.com',
    // nodeEnv === 'production'
    //   ? ['https://kiskamika.onrender.com']
    //   : ['http://localhost:4200', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    index: false, // Don't serve index.html automatically
    prefix: '/', // Serve files from root path
  });

  app.setGlobalPrefix('api');

    app.use(
      '/',
      (req, res, next) => {
        if (req.url.startsWith('/api')) {
          return next(); // let Nest handle /api/*
        }
        express.static(
            join(__dirname, '..', '..', '..', 'apps', 'kishamika-fe', 'dist', 'kika-project'),
        )(req, res, next);
      },
  );

  await app.listen(port);

  console.log(`Server running in ${nodeEnv} mode on port ${port}`);
  console.log(`Frontend URL: ${frontendUrl}`);
}

bootstrap().catch(console.error);
