import {
  Inject,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/auth/dto/signin.dto';
import { JwtPayloadWithRt, Tokens } from './types/tokens.type';
import { SignupDto } from './dto/signup.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { plainToClass as plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(user: User) {
    const tokens = await this.generateTokens(user._id as string);

    const userResponse = plainToInstance(ResponseUserDto, user.toObject());
    return {
      user: userResponse,
      tokens,
    };
  }

  async signup(signupDto: SignupDto) {
    const emailExist = await this.userService.findUserByEmail(signupDto.email);
    if (emailExist) {
      throw new NotAcceptableException('Email already exists');
    }

    signupDto = {
      ...signupDto,
    };
    const newUser = await this.userService.createLocalUser(signupDto);

    const tokens = await this.generateTokens(newUser._id as string);

    const userResponse = plainToInstance(ResponseUserDto, newUser.toObject());

    return {
      user: userResponse,
      tokens,
    };
  }

  async logout(userId: string) {
    await this.updateRT(userId);

    return {
      message: 'Logout successfully',
    };
  }

  async refreshTokens(payload: JwtPayloadWithRt) {
    const tokens = await this.generateTokens(payload.sub);
    return { tokens };
  }

  async generateTokens(id: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
        },
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
          secret: process.env.JWT_SECRET,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
        },
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
          secret: process.env.JWT_SECRET,
        },
      ),
    ]);

    await this.updateRT(id, rt);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async updateRT(userId: string, newRT: string | null = null) {
    const hashedRT = newRT ? await this.hashData(newRT) : null;

    await this.userService.findOneAndUpdate(userId, {
      hashedRT,
    });
  }

  async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }

  async validateUser(singInDto: SignInDto) {
    const userExist = await this.userService.findUserByEmail(singInDto.email);

    if (!userExist) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordMatch = await bcrypt.compare(
      singInDto.password,
      userExist.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return userExist;
  }

  async validateRT(userID: string, rt: string) {
    const user = await this.userService.findById(userID);
    if (!user.hashedRT) return false;

    const isRTMatch = await bcrypt.compare(rt, user.hashedRT);
    if (!isRTMatch) return false;
    return true;
  }
}
