/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBooksDto } from './dto/create-books-dto';
import { Public } from 'src/common/decorators/public.decorator';
import { plainToInstance } from 'class-transformer';
import { UpdateBookDto } from './dto/update-book-dto';

@Controller('api/books')
export class BooksController {
    constructor(private readonly booksService: BooksService){}
    
    @Public()
    @Post()
    async createBook(@Body() createBooksDto: CreateBooksDto){
        const book = await this.booksService.createBook(createBooksDto);
        const bookResponse = plainToInstance(CreateBooksDto, book)
        return bookResponse;
    }

    @Public()
    @Get()
    async getBooks(): Promise< CreateBooksDto[]> {
        const books = await this.booksService.getAllBooks();
        const booksResponse = plainToInstance(CreateBooksDto, books);

        return booksResponse
    };

    @Public()
    @Get(":id")
    async getBookById(@Param("id") id: string): Promise<CreateBooksDto> {
        const book = await this.booksService.getBook(id);
        const bookResponse = plainToInstance(CreateBooksDto, book);
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
    async deleteBook(@Param("id") id: string): Promise<CreateBooksDto>{
        const book = await this.booksService.findAndDelete(id);
        const bookResponse = plainToInstance(CreateBooksDto, book);

        return bookResponse
    }
}
