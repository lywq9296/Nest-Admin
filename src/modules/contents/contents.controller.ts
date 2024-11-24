import { Controller, Get } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { wrapperResponse } from 'src/utils/response';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get()
  getContentsList() {
    return wrapperResponse(
      this.contentsService.getContentsList(),
      '获取目录成功',
    );
  }
}
