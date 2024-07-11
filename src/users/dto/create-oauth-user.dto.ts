import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateOAuthUserDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  avatar: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  id: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['google', 'facebook', 'x'])
  @Expose()
  identityProvider: 'google' | 'facebook' | 'x';
}
