import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';
import { parseStringPromise } from 'xml2js';

@Injectable()
export class XmlImportService {  
    async processXmlFolder(dirPath: string) {
    const files = await fs.promises.readdir(dirPath);

    for (const fileName of files) {
      if (!fileName.endsWith('.xml')) continue;
      const fullPath = path.join(dirPath, fileName);

      try {
        const content = await fs.promises.readFile(fullPath, 'utf8');
        const xml = await parseStringPromise(content, { explicitArray: false });

        const macskcb = xml?.ROOT?.THONGTINDONVI?.MACSKCB?.trim();
        const ma_lk = xml?.ROOT?.MA_LK?.trim();

        if (!macskcb || !ma_lk) {
          console.warn(`File ${fileName} thiếu MACSKCB hoặc MA_LK`);
          continue;
        }

        await fs.promises.rename(fullPath, `/data/import/qd3176_done/${macskcb}_${fileName}`);
      } catch (e) {
        console.error(`Lỗi xử lý file ${fileName}:`, e.message);
        await fs.promises.rename(fullPath, `/data/import/qd3176_error/${fileName}`);
      }
    }
  }
}