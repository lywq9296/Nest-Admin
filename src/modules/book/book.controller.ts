import { Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';
import { wrapperResponse } from 'src/utils/response';
import { Public } from 'src/decorators/public.decorator';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @Public()
  async getBookList() {
    return wrapperResponse(this.bookService.getBookList(), '获取图书列表成功');
  }
}
