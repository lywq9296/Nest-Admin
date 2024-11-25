import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { wrapperResponse } from 'src/utils/response';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getAllRoles() {
    return wrapperResponse(this.roleService.getAllRoles(), '获取角色列表成功');
  }
}
