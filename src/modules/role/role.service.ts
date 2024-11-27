import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleMenuEntity } from './entities/role-menu.entity';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(RoleMenuEntity)
    private readonly roleMenuRepository: Repository<RoleMenuEntity>,
    @Inject()
    private readonly menuService: MenuService,
  ) {}

  async getAllRoles() {
    return this.roleRepository.find();
  }

  async getRole(roleId: number) {
    return this.roleRepository.findBy({ id: roleId });
  }

  async createRole(createRoleDto: CreateRoleDto) {
    const role = new CreateRoleDto();

    role.name = createRoleDto.name;
    role.remark = createRoleDto.remark;

    return this.roleRepository.save(role);
  }

  async updateRole(data: CreateRoleDto) {
    return this.roleRepository.update(data.id, {
      remark: data.remark,
      name: data.name,
    });
  }

  async createRoleMenu({ roleId, menuId }) {
    //  const sql = `INSERT INTO roles_menu(roleId,menuId) VALUES(${roleId},${menuId})`;
    // return this.roleMenuRepository.query(sql)

    // 建立 roleId 和 menuId 的绑定关系
    const ret = await this.roleMenuRepository.insert({ roleId, menuId });

    // 查询 menu 信息
    const [menu] = await this.menuService.findMenus(menuId);

    // 查询角色信息
    const [roleInfo] = await this.getRole(roleId);

    // 更新 menu 中的 roles 字段
    let meta: any;
    if (menu) {
      meta = menu.meta;
      meta = JSON.parse(meta) || {};
      if (!meta.roles) {
        meta.roles = [];
      } else {
        meta.roles = JSON.parse(meta.roles);
      }
      if (!meta.roles.includes(roleInfo.name)) {
        meta.roles.push(roleInfo.name);
      }
      meta.roles = JSON.stringify(meta.roles);
    }

    await this.menuService.update({
      id: menu.id.toString(),
      data: { meta: JSON.stringify(meta) },
    });

    return ret;
  }

  async getRoleMenu(roleId: number) {
    /* const sql = `SELECT roleId,menuId FROM role_menu WHERE roleId = ${roleId}`;
    return this.roleMenuRepository.query(sql); */

    return this.roleMenuRepository.findBy({ roleId });
  }

  async deleteRoleMenu(roleId: string) {
    const sql = `DELETE FROM roles_menu WHERE roleId = '${roleId}'`;
    return this.roleMenuRepository.query(sql);

    // return this.roleMenuRepository.delete(roleId);
  }
}
