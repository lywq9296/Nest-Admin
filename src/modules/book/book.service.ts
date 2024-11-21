import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { GetBookDto } from './dto/get-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async getBookList(getBookDto: GetBookDto) {
    let page = +getBookDto.page || 1;
    const pageSize = +getBookDto.pageSize || 20;
    const title = getBookDto.title;
    const author = getBookDto.author;

    if (page <= 0) page = 1;
    if (pageSize <= 0) page = 20;

    let where = 'where 1=1';
    if (title) {
      where += ` AND title LIKE '%${title}%'`;
    }

    if (author) {
      where += ` AND author LIKE '%${author}%'`;
    }

    const sql = `select * from book ${where} limit ${pageSize} offset ${(page - 1) * pageSize} `;

    return this.bookRepository.query(sql);
  }

  async countBookList(getBookDto: GetBookDto) {
    const title = getBookDto.title;
    const author = getBookDto.author;

    let where = 'where 1=1';
    if (title) {
      where += ` AND title LIKE '%${title}%'`;
    }

    if (author) {
      where += ` AND author LIKE '%${author}%'`;
    }

    const sql = `select count(*) as count from book ${where}`;

    return this.bookRepository.query(sql);
  }

  async uploadBook(file) {
    const desDir = path.resolve(process.cwd(), process.env.UPLOAD_FILE_PATH); // 接收路径, 存储文件的地址
    const desPath = path.resolve(desDir, file.originalname);
    fs.writeFileSync(desPath, file.buffer);

    return Promise.resolve().then(() => ({
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: desPath,
      dir: desDir,
    }));
  }
}
