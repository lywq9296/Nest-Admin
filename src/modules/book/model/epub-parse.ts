import * as path from 'path';
import * as fs from 'fs';
import * as AdmZip from 'adm-zip';
import * as XmlJs from 'xml2js';

export function unzip(bookPath: string, unzipPath: string) {
  const zip = new AdmZip(bookPath);

  zip.extractAllTo(unzipPath, true);
}

export async function parseRootFile(unzipPath) {
  const containerFilePath = path.resolve(unzipPath, 'META-INF/container.xml');
  const containerXml = fs.readFileSync(containerFilePath, 'utf-8');
  console.log(containerXml);

  const { parseStringPromise } = XmlJs;
  console.log(await parseStringPromise(containerXml, {}));

  const data = await parseStringPromise(containerXml, { explicitArray: false });
  const rootFile = data.container.rootfiles.rootfile['$']['full-path'];
  return rootFile;
}
