import * as fs from 'fs';
import * as path from 'path';
import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { wrapperCountResponse } from 'src/utils/response';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBookList(@Query() params) {
    return wrapperCountResponse(
      this.bookService.getBookList(params),
      this.bookService.countBookList(params),
      '获取图书列表成功',
    );
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 接收参数为 file
  updateBook(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    const desPath = path.resolve(process.cwd(), 'var/www/upload'); // 接收路径, 存储文件的地址

    fs.writeFileSync(path.resolve(desPath, file.originalname), file.buffer);
  }
}
