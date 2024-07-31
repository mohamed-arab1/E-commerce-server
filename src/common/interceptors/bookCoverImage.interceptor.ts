import {
  NotAcceptableException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const bookCoverImgInterceptor = FileInterceptor('cover_image', {
  storage: diskStorage({
    destination: './uploads/imgs', // Directory to save files
    filename: (_req, file, callback) => {
      const name =
        'book_cover_img-' +
        Date.now() +
        '-' +
        uuidv4() +
        extname(file.originalname);
      callback(null, name);
    },
  }),
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype.includes('image')) {
      return callback(
        new UnsupportedMediaTypeException('Only image files are allowed!'),
        false,
      );
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      return callback(
        new NotAcceptableException('File size is too large!'),
        false,
      );
    }
    callback(null, true);
  },
});
