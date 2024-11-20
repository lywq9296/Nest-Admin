import * as fs from 'fs';
import * as path from 'path';
import {
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { wrapperCountResponse, wrapperResponse } from 'src/utils/response';
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
  updateBook(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /epub/ }) // 限制上传文件格式
        .build(),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);

    const desDir = path.resolve(process.cwd(), process.env.UPLOAD_FILE_PATH); // 接收路径, 存储文件的地址
    const desPath = path.resolve(desDir, file.originalname);
    fs.writeFileSync(desPath, file.buffer);

    return wrapperResponse(
      Promise.resolve().then(() => ({
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: desPath,
        dir: desDir,
      })),
      '文件上传成功',
    );
  }
}
