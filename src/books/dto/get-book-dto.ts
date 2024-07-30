/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateBooksDto } from './create-book-dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class GetBookDto extends PartialType(CreateBooksDto) {
  @Expose()
  @Transform((params) => params.obj._id.toString())
  _id: string;

  @IsString()
  @Expose()
  @IsNotEmpty()
  cover_image: string;
}
