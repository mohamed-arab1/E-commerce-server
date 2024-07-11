import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './strategies/local.strategy';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from '../common/guards/localAuth.guard';
import { jwtStrategy } from './strategies/accessJwt.strategy';
import { RefreshJwtStrategy } from './strategies/refreshJwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { googleStrategy } from './strategies/googleAuth.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({}),
    PassportModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    googleStrategy,
    jwtStrategy,
    RefreshJwtStrategy,
    LocalAuthGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
