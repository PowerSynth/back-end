import AdmZip from "adm-zip";
import path from "path";
import { IFileRepository } from "../interfaces";
import { glob } from "glob";
import fs from "fs";

export class FileRepository implements IFileRepository {
   async extractZipFile(filePath: string): Promise<string> {
      // Log where the file is being extracted
      console.log(`Extracting file ${filePath}...`);
      const zip = new AdmZip(filePath);
      // Extract file to its current directory
      zip.extractAllTo(path.dirname(filePath), true);
      console.log("Extraction complete!");

      // Log deleting the zip file
      console.log(`Deleting file ${filePath}...`);

      // Delete the zip file
      fs.unlinkSync(filePath);

      // return path to the extracted folder
      return path.join(path.dirname(filePath), path.basename(filePath, ".zip"));
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
