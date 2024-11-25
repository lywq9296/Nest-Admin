import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
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
}
