import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleMenuEntity } from './entities/role-menu.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(RoleMenuEntity)
    private readonly roleMenuRepository: Repository<RoleMenuEntity>,
  ) {}

  async getAllRoles() {
    return this.roleRepository.find();
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

    return this.roleMenuRepository.insert({ roleId, menuId });
  }

  async getRoleMenu(roleId: number) {
    /* const sql = `SELECT roleId,menuId from role_menu WHERE roleId = ${roleId}`;
    return this.roleMenuRepository.query(sql); */

    return this.roleMenuRepository.findBy({ roleId });
  }

  async deleteRoleMenu(body) {
    console.log(body);
  }
}
