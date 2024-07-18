/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";
import { CreateBooksDto } from "./create-books-dto";

export class GetBookDto extends PartialType(CreateBooksDto) {}