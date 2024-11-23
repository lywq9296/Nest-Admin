// import * as fs from 'fs';
import * as path from 'path';
import * as fse from 'fs-extra';
import { parseContentOpf, parseRootFile, unzip } from './epub-parse';

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

  async parse() {
    // console.log('解析电子书', this.bookPath, this.file);

    // 1. 生成临时文件
    const tmpDir = path.resolve(process.cwd(), TEMP_PATH);
    const tmpFile = path.resolve(tmpDir, this.filename);
    fse.copySync(this.bookPath, tmpFile);

    // 2. epub 电子书解压
    const tmpUnzipDirName = this.filename.replace('.epub', '');
    const tmpUnzipDir = path.resolve(tmpDir, tmpUnzipDirName);
    fse.mkdirpSync(tmpUnzipDir);
    unzip(this.bookPath, tmpUnzipDir);

    // 3. epub 电子书解析 -- root file 解析
    const rootFile = await parseRootFile(tmpUnzipDir);
    // console.log(rootFile);

    // 4. epub 电子书 content opf 解析
    await parseContentOpf(tmpUnzipDir, rootFile);

    // last. 删除临时文件
    // fse.removeSync(tmpFile);
    // fse.removeSync(tmpUnzipDirName);
  }
}

export default EpubBook;
