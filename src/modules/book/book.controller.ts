import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
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

  @Post()
  async insertBook(@Body() body) {
    return wrapperResponse(this.bookService.insertBook(body), '新增电子书成功');
  }

  @Patch(':id')
  async updateBook(@Param('id', ParseIntPipe) id) {
    return wrapperResponse(
      this.bookService.updateBook(id),
      '删除电子书成功(软删除)',
    );
  }

  @Delete(':id')
  async deleteBook(@Param('id', ParseIntPipe) id) {
    return wrapperResponse(this.bookService.deleteBook(id), '删除电子书成功');
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 接收参数为 file
  uploadBook(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /epub/ }) // 限制上传文件格式
        .build(),
    )
    file: Express.Multer.File,
  ) {
    // console.log(file);

    return wrapperResponse(this.bookService.uploadBook(file), '文件上传成功');
  }
}
