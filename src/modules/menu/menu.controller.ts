import { Body, Controller, Get, Post, Put } from '@nestjs/common';
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
  async createMenu(@Body() body) {
    return wrapperResponse(await this.menuService.create(body), '菜单创建成功');
  }

  @Put()
  async updateMenu(@Body() body) {
    return wrapperResponse(await this.menuService.update(body), '菜单更新成功');
  }
}
