import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { wrapperResponse } from 'src/utils/response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  getUserByToken(@Req() request) {
    const user = request.user; // 在 auth.guard 中添加的 user 属性
    return wrapperResponse(
      this.userService.findByUsername(user.username),
      '获取用户信息成功',
    );
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  getAllUser(@Query() query) {
    return wrapperResponse(this.userService.findAll(query), '获取用户列表成功');
  }

  @Post()
  create(@Body() body) {
    return this.userService.create(body);
  }

  @Delete()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
