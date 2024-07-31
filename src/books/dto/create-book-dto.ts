/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class CreateBooksDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  description: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  author: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  @Expose()
  rate: number;

  @IsArray()
  @IsNotEmpty()
  @Transform(
    ({ value }) => (typeof value === 'string' ? value.split(',') : value),
    { toClassOnly: true },
  )
  @Expose()
  genre: string[];

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @Expose()
  publication_year: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @Expose()
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(
    ({ value }) => (typeof value === 'string' ? value === 'true' : value),
    { toClassOnly: true },
  )
  @Expose()
  most_popular: boolean;
}
