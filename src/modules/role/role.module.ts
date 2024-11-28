import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenuEntity } from './entities/role-menu.entity';
import { RoleEntity } from './entities/role.entity';
import { MenuModule } from '../menu/menu.module';
import { RoleAuthEntity } from './entities/role-auth.entity';
import { AuthEntity } from '../auth/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleEntity,
      RoleMenuEntity,
      RoleAuthEntity,
      AuthEntity,
    ]),
    MenuModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
