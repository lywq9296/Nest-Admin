import { Entity, PrimaryColumn } from 'typeorm';

@Entity('auth_role')
export class RoleAuthEntity {
  @PrimaryColumn()
  roleId: number;

  @PrimaryColumn()
  authId: number;
}
