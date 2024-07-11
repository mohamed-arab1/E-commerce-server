import { Exclude, Expose, Transform } from 'class-transformer';
import { CreateLocalUserDto } from './create-local-user.dto';

export class ResponseUserDto extends CreateLocalUserDto {
  constructor() {
    super();
  }

  @Expose()
  @Transform((params) => params.obj._id.toString())
  _id: string;

  @Exclude()
  password: string;
}
