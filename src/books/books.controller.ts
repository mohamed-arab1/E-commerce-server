/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBooksDto } from './dto/create-books-dto';
import { Public } from 'src/common/decorators/public.decorator';
import { plainToInstance } from 'class-transformer';
import { UpdateBookDto } from './dto/update-book-dto';
import { GetBookDto } from './dto/get-books-dto';

@Controller('api/books')
export class BooksController {
    constructor(private readonly booksService: BooksService){}
    
    @Public()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createBook(@Body() createBooksDto: CreateBooksDto){
        const book = await this.booksService.createBook(createBooksDto);
        const bookResponse = plainToInstance(CreateBooksDto, book)
        return bookResponse;
    }

    @Public()
    @Get()
    async getBooks(): Promise<GetBookDto[]> {
        const books = await this.booksService.getAllBooks();
        const booksResponse = plainToInstance(GetBookDto, books);

        return booksResponse
    };

    @Public()
    @Get(":id")
    async getBookById(@Param("id") id: string): Promise<GetBookDto> {
        const book = await this.booksService.getBook(id);
        const bookResponse = plainToInstance(GetBookDto, book);
        return bookResponse;
    }

    @Public()
    @Put(":id")
    async updateBook(@Body() updateBookDto: UpdateBookDto, @Param("id") id: string): Promise<UpdateBookDto>{
        const book = await this.booksService.updateBook(id, updateBookDto);
        const bookResponse = plainToInstance(UpdateBookDto, book);

        return bookResponse;
    }

    @Public()
    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteBook(@Param("id") id: string): Promise<void>{
         await this.booksService.findAndDelete(id);
    }
}
