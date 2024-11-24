import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
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

  @Post()
  insertContent(@Body() body) {
    return wrapperResponse(
      this.contentsService.insertContent(body),
      '新增目录成功',
    );
  }

  @Delete()
  deleteContent(@Body() { fileName }) {
    return wrapperResponse(
      this.contentsService.delete(fileName),
      '删除电子书目录成功',
    );
  }

  @Patch()
  updateContent(@Body() body) {
    return wrapperResponse(
      this.contentsService.deleteSoft(body),
      '删除电子书目录成功(软删除)',
    );
  }
}
