import AdmZip from "adm-zip";
import path from "path";
import { IFileRepository } from "../interfaces";
import { glob } from "glob";

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

   async createZipFile(
      sourceFolderPath: string,
      includedPaths: string[] = []
   ): Promise<string> {
      const zipOutputPath = `${sourceFolderPath}.zip`;
      const zipFile = new AdmZip();

      if (includedPaths.length > 0) {
         includedPaths.forEach((pattern) => {
            const files = glob.sync(path.join(sourceFolderPath, pattern));
            files.forEach((file) => {
               const relativePath = path.relative(sourceFolderPath, file);
               zipFile.addLocalFile(file, path.dirname(relativePath));
            });
         });
      } else {
         zipFile.addLocalFolder(sourceFolderPath);
      }

      zipFile.writeZip(zipOutputPath);

      console.log("Zipping complete!");

      return zipOutputPath;
   }
}
