// import * as fs from 'fs';
// import * as path from 'path';

class EpubBook {
  constructor(
    private readonly bookPath: string,
    private readonly file: Express.Multer.File,
  ) {}

  parse() {
    console.log('解析电子书', this.bookPath, this.file);
  }
}

export default EpubBook;
