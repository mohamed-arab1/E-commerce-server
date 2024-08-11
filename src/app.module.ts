/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { url } from 'db/data-source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AccessJwtGuard } from './common/guards/accessJwt.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { FilesController } from './files/files.controller';
import { FilesModule } from './files/files.module';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    AppModule,
    MongooseModule.forRoot(url),
    UsersModule,
    AuthModule,
    BooksModule,
    FilesModule,
  ],
  controllers: [AppController, FilesController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessJwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
