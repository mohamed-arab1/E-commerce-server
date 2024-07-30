/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Books, BooksSchema } from './schema/books.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Books.name, schema: BooksSchema, collection: 'books' },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
