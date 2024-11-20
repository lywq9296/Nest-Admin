import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('book')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(['fileName'])
  fileName: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column()
  bookId: string;

  @Column()
  category: number;

  @Column()
  categoryText: string;

  @Column()
  language: string;

  @Column()
  rootFile: string;

  @Column()
  originalName: string;

  @Column()
  filePath: string;

  @Column()
  unzipPath: string;

  @Column()
  coverPath: string;

  @Column()
  createUser: string;

  @Column()
  createDt: number;

  @Column()
  updateDt: number;
}
