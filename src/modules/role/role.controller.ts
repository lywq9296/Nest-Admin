import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { wrapperResponse } from 'src/utils/response';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('role_menu')
  createRoleMenu(@Body() body) {
    return wrapperResponse(
      this.roleService.createRoleMenu(body),
      '新增角色和菜单绑定关系成功',
    );
  }

  @Get('role_menu/:roleId')
  getRoleMenu(@Param('roleId', ParseIntPipe) roleId: number) {
    return wrapperResponse(
      this.roleService.getRoleMenu(roleId),
      '获取角色和菜单绑定关系成功',
    );
  }

  @Get('auth')
  getAuthList(@Query() query) {
    return wrapperResponse(
      this.roleService.getAuthList(query),
      '获取权限数据成功',
    );
  }

  @Post('auth')
  createAuth(@Body() body) {
    return wrapperResponse(
      this.roleService.createAuth(body),
      '获取权限数据成功',
    );
  }

  @Delete('role_menu')
  deleteRoleMenu(@Body() body) {
    return wrapperResponse(
      this.roleService.deleteRoleMenu(body.roleId),
      '删除角色和菜单绑定关系成功',
    );
  }

  @Get(':id')
  getRole(@Param('id', ParseIntPipe) roleId) {
    console.log(roleId);
  }

  @Get()
  getAllRoles() {
    return wrapperResponse(this.roleService.getAllRoles(), '获取角色列表成功');
  }

  @Post()
  createRole(@Body() body) {
    return wrapperResponse(this.roleService.createRole(body), '新增角色成功');
  }

  @Patch()
  updateRole(@Body() body) {
    return wrapperResponse(this.roleService.updateRole(body), '更新角色成功');
  }
}
