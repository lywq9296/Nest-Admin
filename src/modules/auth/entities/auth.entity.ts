import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('auth')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  @Unique(['key'])
  @Column({ length: 50, nullable: false })
  key: string;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 255 })
  remark: string;
}
