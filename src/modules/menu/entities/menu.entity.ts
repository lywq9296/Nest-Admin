import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('menu')
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // @Unique(['path'])
  path: string;

  @Column()
  @Unique(['name'])
  name: string;

  @Column()
  redirect: string;

  @Column()
  meta: string;

  @Column()
  pid: number;

  // 1-可用, 0-不可用
  @Column()
  active: number;
}
