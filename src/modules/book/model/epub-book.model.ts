// import * as fs from 'fs';
import * as path from 'path';
import * as fse from 'fs-extra';
import {
  copyCoverImage,
  copyUnzipBook,
  parseContentOpf,
  parseRootFile,
  unzip,
} from './epub-parse';

const VBEN_PATH = '.vben';
const TEMP_PATH = `${VBEN_PATH}/tmp-book`;

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
    const bookData = await parseContentOpf(tmpUnzipDir, rootFile);

    // 5. 拷贝电子书封面图片
    const cover = await copyCoverImage(bookData, tmpDir);
    bookData.cover = cover;

    // 6.拷贝解压后电子书
    await copyUnzipBook(tmpUnzipDir, tmpUnzipDirName);

    // last. 删除临时文件
    // fse.removeSync(tmpFile);
    // fse.removeSync(tmpUnzipDir);
    fse.removeSync(VBEN_PATH);

    return bookData;
  }
}

export default EpubBook;
