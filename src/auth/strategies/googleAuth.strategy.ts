import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class googleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3030/auth/google/redirect',
      scope: ['profile'],
      prompt: 'none',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { sub, name, picture } = profile._json;

    const newUser = await this.usersService.createOAuthUser({
      id: sub,
      name,
      avatar: picture,
      identityProvider: 'google',
    });

    return newUser;
  }
}
