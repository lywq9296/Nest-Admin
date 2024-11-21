// import * as fs from 'fs';
import * as path from 'path';
import * as fse from 'fs-extra';

const TEMP_PATH = '.vben/tmp-book';

class EpubBook {
  private readonly filename: string;
  private readonly size: number;

  constructor(
    private readonly bookPath: string,
    private readonly file: Express.Multer.File,
  ) {
    this.filename = file.originalname;
    this.size = file.size;
  }

  parse() {
    // console.log('解析电子书', this.bookPath, this.file);

    // 1. 生成临时文件
    const tmpDir = path.resolve(process.cwd(), TEMP_PATH);
    const tmpFile = path.resolve(tmpDir, this.filename);
    fse.copySync(this.bookPath, tmpFile);

    // last. 删除临时文件
    fse.removeSync(tmpFile);
  }
}

export default EpubBook;
