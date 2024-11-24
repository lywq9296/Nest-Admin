import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('contents')
export class ContentsEntity {
  @PrimaryColumn()
  fileName: string;

  @Column()
  // @Unique(['id'])
  id: string;

  @Column()
  href: string;

  @Column()
  order: number;

  @Column()
  level: number;

  @Column()
  text: string;

  @Column()
  label: string;

  @Column()
  pid: string;

  @PrimaryColumn()
  navId: string;
}
