import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fse from 'fs-extra';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { GetBookDto } from './dto/get-book.dto';
import EpubBook from './model/epub-book.model';
import { CreateBookDto } from './dto/create-book.dto';

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

    const sql = `select * from books ${where} limit ${pageSize} offset ${(page - 1) * pageSize} `;

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

    const sql = `select count(*) as count from books ${where}`;

    return this.bookRepository.query(sql);
  }

  async getBook(id) {
    const sql = `SELECT * FROM books WHERE id = ${id}`;

    return this.bookRepository.query(sql);
  }

  async insertBook(createBookDto: CreateBookDto) {
    const {
      title,
      author,
      fileName,
      categoryText,
      cover,
      language,
      publisher,
      rootFile,
      category,
    } = createBookDto;

    const sql = `INSERT INTO books(
      fileName,
      cover,
      title,
      author,
      publisher,
      bookId,
      categoryText,
      language,
      rootFile,
      category
    ) VALUES(
      '${fileName}',
      '${cover}',
      '${title}',
      '${author}',
      '${publisher}',
      '${fileName}',
      '${categoryText}',
      '${language}',
      '${rootFile}',
      '${category}'
    )`;
    return this.bookRepository.query(sql);
  }

  async updateBook(id) {
    // console.log('updateBook', id);
    const sql = `UPDATE books SET isDeleted = ${1} WHERE id = ${id}`;
    return this.bookRepository.query(sql);
  }

  async deleteBook(id) {
    // console.log('deleteBook', id);
    const sql = `DELETE from books WHERE id = ${id}`;
    return this.bookRepository.query(sql);
  }

  async uploadBook(file) {
    const desDir = path.resolve(process.cwd(), process.env.UPLOAD_FILE_PATH); // 接收路径, 存储文件的地址
    const destPath = path.resolve(desDir, file.originalname);
    fse.mkdirpSync(desDir);
    fs.writeFileSync(destPath, file.buffer);

    // 电子书解析
    const bookData = await this.parseBook(destPath, file);

    return Promise.resolve().then(() => ({
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: destPath,
      dir: desDir,
      data: bookData,
    }));
  }

  async parseBook(bookPath, file) {
    const epub = new EpubBook(bookPath, file);

    return await epub.parse();
  }
}
