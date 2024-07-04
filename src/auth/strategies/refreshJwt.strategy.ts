import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { JwtPayloadWithRt } from '../types/tokens.type';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.JWT_SECRET}`,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayloadWithRt): Promise<any> {
    const header = req.get('authorization') || req.get('Authorization');
    const refreshToken = header.split(' ')[1];
    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    const isValid = await this.authService.validateRT(
      payload.sub,
      refreshToken,
    );

    if (!isValid) throw new ForbiddenException('Refresh token malformed');

    return {
      ...payload,
      refreshToken,
    };
  }
}
