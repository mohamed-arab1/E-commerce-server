/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBooksDto } from './dto/create-book-dto';
import { plainToInstance } from 'class-transformer';
import { UpdateBookDto } from './dto/update-book-dto';
import { GetBookDto } from './dto/get-book-dto';
import { Request } from 'express';
import { bookCoverImgInterceptor } from 'src/common/interceptors/bookCoverImage.interceptor';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(bookCoverImgInterceptor)
  async createBook(
    @Body() createBooksDto: CreateBooksDto,
    @Req() req: Request,
    @UploadedFile() coverImgFile: Express.Multer.File,
  ) {
    if (!coverImgFile) {
      return { message: 'Cover image is required', statusCode: 400 };
    }
    const book = await this.booksService.createBook(
      req,
      createBooksDto,
      coverImgFile,
    );
    const bookResponse = plainToInstance(GetBookDto, book);
    return bookResponse;
  }

  @Get()
  async getBooks(): Promise<GetBookDto[]> {
    const books = await this.booksService.getAllBooks();
    const booksResponse = plainToInstance(GetBookDto, books);
    return booksResponse;
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<GetBookDto> {
    const book = await this.booksService.getBook(id);
    const bookResponse = plainToInstance(GetBookDto, book);
    return bookResponse;
  }

  @Put(':id')
  async updateBook(
    @Body() updateBookDto: UpdateBookDto,
    @Param('id') id: string,
  ): Promise<UpdateBookDto> {
    const book = await this.booksService.updateBook(id, updateBookDto);
    const bookResponse = plainToInstance(UpdateBookDto, book);

    return bookResponse;
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<GetBookDto> {
    const book = await this.booksService.findAndDelete(id);
    const bookResponse = plainToInstance(GetBookDto, book);

    return bookResponse;
  }
}
