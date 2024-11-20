import { Controller, Get, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { wrapperResponse } from 'src/utils/response';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBookList(@Query() params) {
    return wrapperResponse(
      this.bookService.getBookList(params),
      '获取图书列表成功',
    );
  }
}
