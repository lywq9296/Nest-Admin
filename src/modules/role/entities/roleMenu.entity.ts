import { Entity, PrimaryColumn } from 'typeorm';

@Entity('roles_menu')
export class RoleMenuEntity {
  @PrimaryColumn()
  roleId: number;

  @PrimaryColumn()
  menuId: number;
}
