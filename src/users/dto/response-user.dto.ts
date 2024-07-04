import { Exclude, Expose, Transform } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

export class ResponseUserDto extends CreateUserDto {
  // write another constructor to convert some obj to this class
  constructor() {
    super();
  }

  @Expose()
  @Transform((params) => params.obj._id.toString())
  _id: string;

  @Exclude()
  password: string;
}
