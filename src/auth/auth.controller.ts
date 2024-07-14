import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../common/guards/localAuth.guard';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from '../common/guards/refreshJwt.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { GetCurrentUser } from 'src/common/decorators/getCurrentUser.decorator';
import { User } from 'src/users/schema/user.schema';
import { GetCurrentUserId } from 'src/common/decorators/getCurrentUserId.decorator';
import { JwtPayloadWithRt, Tokens } from './types/tokens.type';
import { GetCurrentTokenPayload } from 'src/common/decorators/getCurrentTokenPayload.decorator';
import { SignupDto } from './dto/signup.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { GoogleAuthGuard } from 'src/common/guards/googleAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@GetCurrentUser() user: User) {
    return await this.authService.signin(user);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(
    @Body() signupDto: SignupDto,
  ): Promise<{ user: ResponseUserDto; tokens: Tokens }> {
    return await this.authService.signup(signupDto);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Get('google/redirect')
  async googleLoginRedirect(@GetCurrentUser() user: User) {
    return await this.authService.signin(user);
  }

  @Public()
  @UseGuards(RefreshJwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@GetCurrentUserId() id: string) {
    return await this.authService.logout(id);
  }

  @Public()
  @UseGuards(RefreshJwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshToken(@GetCurrentTokenPayload() payload: JwtPayloadWithRt) {
    return await this.authService.refreshTokens(payload);
  }
}
