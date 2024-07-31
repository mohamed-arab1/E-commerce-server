import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('files')
export class FilesController {
  @Public()
  @Get('imgs/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const file = createReadStream(
      join(process.cwd(), 'uploads', 'imgs', filename),
    );
    file.on('error', () => {
      res.status(404).json({ message: 'File not found', statusCode: 404 });
    });
    file.pipe(res);
  }
}
