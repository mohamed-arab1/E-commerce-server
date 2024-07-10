/* eslint-disable prettier/prettier */
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsArray,
    IsBoolean

  } from 'class-validator';
  import { Expose, Transform } from 'class-transformer';

export class CreateBooksDto {

    @Expose()
    @Transform((params) => params.obj._id.toString())
    _id: string

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
    cover_image: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    author: string;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    rate: number;

    @IsArray()
    @IsNotEmpty()
    @Expose()
    genre: string[];

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    publication_year: number;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    price: number;

    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    most_popular: boolean;

}
