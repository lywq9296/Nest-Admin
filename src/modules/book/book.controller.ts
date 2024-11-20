import { Controller, Get, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { wrapperCountResponse } from 'src/utils/response';

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
}
