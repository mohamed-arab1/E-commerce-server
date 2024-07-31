/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateBooksDto } from './create-book-dto';

export class UpdateBookDto extends PartialType(CreateBooksDto) {}
