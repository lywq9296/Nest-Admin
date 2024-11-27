import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenuEntity } from './entities/role-menu.entity';
import { RoleEntity } from './entities/role.entity';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, RoleMenuEntity]), MenuModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
