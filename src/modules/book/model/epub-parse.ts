import * as path from 'path';
import * as fs from 'fs';
import * as AdmZip from 'adm-zip';
import * as XmlJs from 'xml2js';

const { parseStringPromise } = XmlJs;

export function unzip(bookPath: string, unzipPath: string) {
  const zip = new AdmZip(bookPath);

  zip.extractAllTo(unzipPath, true);
}

export async function parseRootFile(unzipPath) {
  const containerFilePath = path.resolve(unzipPath, 'META-INF/container.xml');
  const containerXml = fs.readFileSync(containerFilePath, 'utf-8');
  // console.log(containerXml);

  /* const { parseStringPromise } = XmlJs; */
  // console.log(await parseStringPromise(containerXml, {}));

  const data = await parseStringPromise(containerXml, { explicitArray: false });
  const rootFile = data.container.rootfiles.rootfile['$']['full-path'];
  return rootFile;
}

export async function parseContentOpf(unzipPath: string, filePath: string) {
  // 获取 content.opf 路径
  const fullPath = path.resolve(unzipPath, filePath);
  const contentOpf = fs.readFileSync(fullPath, 'utf-8');
  // console.log(contentOpf);

  const data = await parseStringPromise(contentOpf, { explicitArray: false });
  const { metadata } = data.package;
  // console.log(metadata);

  const title = metadata['dc:title']; // 书名
  const creator = metadata['dc:creator']; // 作者
  const language = metadata['dc:language']; // 语种
  const publisher = metadata['dc:publisher']; // 出版社
  const coverMeta = metadata.meta.find((m) => m['$'].name === 'cover');
  // console.log(coverMeta);
  const coverId = coverMeta['$'].content;
  const manifest = data.package.manifest.item;
  const coverRes = manifest.find((m) => m['$'].id === coverId);

  const dir = path.dirname(fullPath);
  const cover = path.resolve(dir, coverRes['$'].href);

  console.log(`电子书信息: 
		书名: ${title}
		作者: ${creator}
		语种: ${language}
		出版社: ${publisher}
		封面: ${cover}
		`);

  // 解析目录
  await parseContent(dir, 'toc.ncx');
}

async function parseContent(contentDir: string, contentFilePath: string) {
  const contentPath = path.resolve(contentDir, contentFilePath);
  const contentXml = fs.readFileSync(contentPath, 'utf-8');
  const data = await parseStringPromise(contentXml, { explicitArray: false });
  const navMap = data.ncx.navMap.navPoint;
  console.log(navMap);
}
