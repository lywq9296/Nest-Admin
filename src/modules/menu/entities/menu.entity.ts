import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(['username'])
  username: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  role: string;

  @Column()
  nickname: string;

  @Column()
  active: number;
}
