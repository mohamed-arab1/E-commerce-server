import { Module } from '@nestjs/common';
import { url } from 'db/data-source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AccessJwtGuard } from './common/guards/accessJwt.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AppModule, MongooseModule.forRoot(url), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessJwtGuard,
    },
  ],
})
export class AppModule {}
