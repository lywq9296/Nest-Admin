import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('contents')
export class ContentsEntity {
  @PrimaryColumn()
  fileName: string;

  @Column({ nullable: true })
  // @Unique(['id'])
  id: string | null;

  @Column({ nullable: true })
  href: string;

  @Column({ nullable: true })
  order: number;

  @Column({ nullable: true })
  level: number;

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: true })
  label: string;

  @Column({ nullable: true })
  pid: string;

  @PrimaryColumn()
  navId: string;
}
