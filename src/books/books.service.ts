/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Books } from './schema/books.schema';
import { Model } from 'mongoose';
import { CreateBooksDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book-dto';
import { Request } from 'express';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Books.name) private readonly booksModel: Model<Books>,
  ) {}

  async createBook(
    req: Request,
    createBookDto: CreateBooksDto,
    coverImgFile: Express.Multer.File,
  ): Promise<Books> {
    const { title } = createBookDto;
    try {
      const findBook = await this.booksModel.findOne({
        title,
      });
      if (findBook) {
        throw new HttpException('Book already exists', HttpStatus.CONFLICT);
      }
      // Construct the URL for the cover image
      const { protocol } = req;
      const host = req.get('host');
      const cover_image = `${protocol}://${host}/api/files/imgs/${coverImgFile.filename}`;

      const newBook = new this.booksModel({ ...createBookDto, cover_image });
      return await newBook.save();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create book!',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllBooks(): Promise<Books[]> {
    try {
      const allBooks = await this.booksModel.find().exec();
      return allBooks;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get All Books!',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getBook(id: string): Promise<Books> {
    try {
      const findBook = await this.booksModel.findById(id);
      if (!findBook) {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }
      return findBook;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get Book!',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Books> {
    try {
      const findAndUpdate = await this.booksModel.findOneAndUpdate(
        { _id: id },
        updateBookDto,
        {
          new: true,
        },
      );

      if (!findAndUpdate) {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }
      return findAndUpdate;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update Book!',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAndDelete(id: string): Promise<Books> {
    try {
      const findAndDelete = await this.booksModel.findByIdAndDelete(id);
      if (!findAndDelete) {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }
      return findAndDelete;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update Book!',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
