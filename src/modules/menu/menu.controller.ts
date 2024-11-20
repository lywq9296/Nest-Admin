import { Body, Controller, Get, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { wrapperResponse } from 'src/utils/response';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getAllMenu() {
    return wrapperResponse(await this.menuService.findAll(), '获取菜单成功');
  }

  @Post()
  createMenu(@Body() body) {
    return this.menuService.create(body);
  }
}
