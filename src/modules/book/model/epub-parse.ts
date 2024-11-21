import * as AdmZip from 'adm-zip';

export function unzip(bookPath: string, unzipPath: string) {
  const zip = new AdmZip(bookPath);

  zip.extractAllTo(unzipPath, true);
}
