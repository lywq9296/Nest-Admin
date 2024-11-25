import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { wrapperResponse } from 'src/utils/response';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getAllRoles() {
    return wrapperResponse(this.roleService.getAllRoles(), '获取角色列表成功');
  }

  @Post()
  createRole(@Body() body) {
    return wrapperResponse(this.roleService.createRole(body), '新增角色成功');
  }
}
