/* eslint-disable prettier/prettier */
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

export function registerGlobals(app: INestApplication) {
  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'exposeAll',
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    }),
  );
}

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  registerGlobals(app);
  await app.listen(process.env.APP_PORT || 3030);
})();
