import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenuEntity } from './entities/role-menu.entity';
import { RoleEntity } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, RoleMenuEntity])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
