import AdmZip from "adm-zip";
import path from "path";
import { IFileRepository } from "../interfaces";

export class FileRepository implements IFileRepository {
   async extractZipFile(filePath: string): Promise<{
      originalNameWithoutExt: string;
      outputFolderPath: string;
   }> {
      const zip = new AdmZip(filePath);
      const originalNameWithoutExt = path.basename(
         filePath,
         path.extname(filePath)
      );
      const outputFolderPath = `./uploads/${originalNameWithoutExt}`;
      zip.extractAllTo(outputFolderPath, true);

      console.log("Extraction complete!");

      return {
         originalNameWithoutExt,
         outputFolderPath,
      };
   }

   async createZipFile(sourceFolderPath: string): Promise<string> {
      const zipOutputPath = `${sourceFolderPath}.zip`;
      const zipFile = new AdmZip();
      zipFile.addLocalFolder(sourceFolderPath);
      zipFile.writeZip(zipOutputPath);

      console.log("Zipping complete!");

      return zipOutputPath;
   }
}
